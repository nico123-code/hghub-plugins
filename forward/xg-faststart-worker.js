/**
 * 热门短剧播放加速 · Cloudflare Worker（hghub-xgv）
 *
 * 西瓜短剧的 mp4（s3.656932.com）把 moov 索引放在文件末尾，
 * 播放器要么先把整集下载完、要么得先跳到末尾取索引，Rex 里会一直转圈。
 * 这个 Worker 把 moov 挪到文件开头（faststart），并改写 stco/co64 偏移，
 * 视频数据本身按 Range 原样从源站转发，不落地、不转码。
 *
 * 用法：https://hghub-xgv.hghub-zhang.workers.dev/?url=<s3.656932.com 的 mp4 地址>
 * 只允许 *.656932.com。
 */
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function u32(b, o) { return ((b[o] << 24) >>> 0) + (b[o + 1] << 16) + (b[o + 2] << 8) + b[o + 3]; }
function boxes(b, start, end) {
  const out = [];
  let i = start;
  while (i + 8 <= end) {
    let size = u32(b, i);
    const type = String.fromCharCode(b[i + 4], b[i + 5], b[i + 6], b[i + 7]);
    let hdr = 8;
    if (size === 1) { size = u32(b, i + 8) * 4294967296 + u32(b, i + 12); hdr = 16; }
    else if (size === 0) size = end - i;
    if (size < hdr) break;
    out.push({ type, off: i, size, hdr });
    i += size;
  }
  return out;
}

async function rangeGet(url, a, b) {
  const r = await fetch(url, { headers: { "User-Agent": UA, Range: "bytes=" + a + "-" + (b === undefined ? "" : b) } });
  if (r.status !== 206 && r.status !== 200) throw new Error("upstream " + r.status);
  return r;
}

// 把 moov 里所有 stco/co64 偏移加 delta
function patchMoov(m, delta) {
  const walk = (s, e) => {
    for (const bx of boxes(m, s, e)) {
      const cs = bx.off + bx.hdr;
      if (["trak", "mdia", "minf", "stbl", "edts", "dinf"].includes(bx.type)) walk(cs, bx.off + bx.size);
      else if (bx.type === "stco") {
        const n = u32(m, cs + 4);
        for (let k = 0; k < n; k++) {
          const p = cs + 8 + k * 4;
          const v = u32(m, p) + delta;
          if (v > 0xffffffff) throw new Error("stco overflow");
          m[p] = (v >>> 24) & 255; m[p + 1] = (v >>> 16) & 255; m[p + 2] = (v >>> 8) & 255; m[p + 3] = v & 255;
        }
      } else if (bx.type === "co64") {
        const n = u32(m, cs + 4);
        for (let k = 0; k < n; k++) {
          const p = cs + 8 + k * 8;
          let v = u32(m, p) * 4294967296 + u32(m, p + 4) + delta;
          const hi = Math.floor(v / 4294967296), lo = v % 4294967296;
          m[p] = (hi >>> 24) & 255; m[p + 1] = (hi >>> 16) & 255; m[p + 2] = (hi >>> 8) & 255; m[p + 3] = hi & 255;
          m[p + 4] = (lo >>> 24) & 255; m[p + 5] = (lo >>> 16) & 255; m[p + 6] = (lo >>> 8) & 255; m[p + 7] = lo & 255;
        }
      }
    }
  };
  walk(8, m.length);
}

// 解析出 { pre: 开头字节(ftyp+moov改), mdatOff, mdatLen, total, passthrough }
async function plan(url) {
  const r0 = await rangeGet(url, 0, 65535);
  const cr = r0.headers.get("Content-Range") || "";
  const head = new Uint8Array(await r0.arrayBuffer());
  const total = Number((cr.match(/\/(\d+)/) || [])[1]) || head.length;
  const top = boxes(head, 0, head.length);
  const moovFirst = top.find((x) => x.type === "moov");
  const mdat = top.find((x) => x.type === "mdat");
  if (moovFirst || !mdat) return { passthrough: true, total };
  const mdatEnd = mdat.off + mdat.size;
  const tail = new Uint8Array(await (await rangeGet(url, mdatEnd, total - 1)).arrayBuffer());
  const mv = boxes(tail, 0, tail.length).find((x) => x.type === "moov");
  if (!mv) return { passthrough: true, total };
  const moov = tail.slice(mv.off, mv.off + mv.size);
  const preHead = head.slice(0, mdat.off); // ftyp/free 等
  // 新布局：preHead + moov + mdat；mdat 往后挪了 moov.length
  patchMoov(moov, moov.length);
  const pre = new Uint8Array(preHead.length + moov.length);
  pre.set(preHead, 0); pre.set(moov, preHead.length);
  return { passthrough: false, pre: Array.from(pre), mdatOff: mdat.off, mdatLen: mdat.size, total: pre.length + mdat.size };
}

async function getPlan(url) {
  const cache = caches.default;
  const key = new Request("https://plan.hghub-xgv.local/" + encodeURIComponent(url));
  const hit = await cache.match(key);
  if (hit) {
    const j = await hit.json();
    j.pre = j.pre ? new Uint8Array(j.pre) : null;
    return j;
  }
  const p = await plan(url);
  try {
    await cache.put(key, new Response(JSON.stringify(p), { headers: { "Cache-Control": "public, max-age=86400", "Content-Type": "application/json" } }));
  } catch (_) {}
  p.pre = p.pre ? new Uint8Array(p.pre) : null;
  return p;
}

export default {
  async fetch(request) {
    const u = new URL(request.url);
    const target = u.searchParams.get("url");
    if (!target) return new Response("missing url", { status: 400 });
    let t;
    try { t = new URL(target); } catch (_) { return new Response("bad url", { status: 400 }); }
    if (t.protocol !== "https:" || !/(^|\.)656932\.com$/i.test(t.hostname)) return new Response("host not allowed", { status: 403 });
    const url = t.toString();
    const rangeH = request.headers.get("Range");
    let p;
    try { p = await getPlan(url); } catch (e) { return new Response("plan failed: " + e.message, { status: 502 }); }

    if (p.passthrough) {
      const h = { "User-Agent": UA };
      if (rangeH) h.Range = rangeH;
      const r = await fetch(url, { headers: h, method: request.method });
      const oh = new Headers();
      for (const k of ["Content-Type", "Content-Length", "Content-Range", "Accept-Ranges", "ETag", "Last-Modified"]) if (r.headers.get(k)) oh.set(k, r.headers.get(k));
      oh.set("Access-Control-Allow-Origin", "*");
      return new Response(r.body, { status: r.status, headers: oh });
    }

    const total = p.total, preLen = p.pre.length;
    let a = 0, b = total - 1, partial = false;
    if (rangeH) {
      const m = rangeH.match(/bytes=(\d*)-(\d*)/);
      if (m) {
        if (m[1] === "" && m[2] !== "") { a = Math.max(0, total - Number(m[2])); }
        else { a = Number(m[1] || 0); if (m[2] !== "") b = Math.min(total - 1, Number(m[2])); }
        partial = true;
      }
      if (a > b || a >= total) return new Response("", { status: 416, headers: { "Content-Range": "bytes */" + total } });
    }
    const headers = new Headers({
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Content-Length": String(b - a + 1),
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    });
    if (partial) headers.set("Content-Range", "bytes " + a + "-" + b + "/" + total);
    if (request.method === "HEAD") return new Response(null, { status: partial ? 206 : 200, headers });

    // 只落在开头（ftyp+moov）里的范围：直接返回字节，带确定的 Content-Length
    if (b < preLen) return new Response(p.pre.slice(a, b + 1), { status: partial ? 206 : 200, headers });
    // 完全落在 mdat 里：直接转发源站的 206 响应体（源站自带长度）
    if (a >= preLen) {
      const r = await rangeGet(url, a - preLen + p.mdatOff, b - preLen + p.mdatOff);
      return new Response(r.body, { status: partial ? 206 : 200, headers });
    }
    // 跨越两段：FixedLengthStream 保证 Content-Length（AVPlayer 不认 chunked 的 206）
    const { readable, writable } = typeof FixedLengthStream !== "undefined" ? new FixedLengthStream(b - a + 1) : new TransformStream();
    (async () => {
      const w = writable.getWriter();
      try {
        if (a < preLen) await w.write(p.pre.slice(a, Math.min(b + 1, preLen)));
        if (b >= preLen) {
          const s = Math.max(a, preLen) - preLen + p.mdatOff;
          const e = b - preLen + p.mdatOff;
          const r = await rangeGet(url, s, e);
          w.releaseLock();
          await r.body.pipeTo(writable);
          return;
        }
        await w.close();
      } catch (e) {
        try { await w.abort(e); } catch (_) {}
      }
    })();
    return new Response(readable, { status: partial ? 206 : 200, headers });
  },
};
