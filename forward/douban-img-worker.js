/**
 * 豆瓣封面代理 · Cloudflare Worker（hghub-db）
 *
 * 爱看机器人（ikanbot）的封面大多直接用豆瓣图床 img*.doubanio.com，
 * 豆瓣图床不带豆瓣 Referer 会返回 418，Rex 里封面就显示不出来。
 * 这个 Worker 只代理 *.doubanio.com 的图片，补上 Referer 后原样返回。
 *
 * 用法：https://hghub-db.hghub-zhang.workers.dev/?url=<豆瓣图片地址>
 */
export default {
  async fetch(request) {
    const u = new URL(request.url);
    const target = u.searchParams.get("url");
    if (!target) return new Response("missing url", { status: 400 });
    let t;
    try { t = new URL(target); } catch (_) { return new Response("bad url", { status: 400 }); }
    if (t.protocol !== "https:" || !/^img\d*\.doubanio\.com$/i.test(t.hostname)) {
      return new Response("host not allowed", { status: 403 });
    }
    const cache = caches.default;
    const cacheKey = new Request(t.toString());
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
    const res = await fetch(t.toString(), {
      headers: {
        Referer: "https://movie.douban.com/",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    });
    if (!res.ok) return new Response("upstream " + res.status, { status: 502 });
    const out = new Response(res.body, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=604800",
      },
    });
    await cache.put(cacheKey, out.clone());
    return out;
  },
};
