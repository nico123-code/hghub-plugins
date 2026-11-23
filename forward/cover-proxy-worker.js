/**
 * 黄果短剧封面解密代理 · Cloudflare Worker 模板（可选，自行部署）
 *
 * 黄果的封面图是 AES-128-CBC 加密的（key/iv 来自站点前端公开代码），
 * Rex / Forward 模块无法自己解码图片，所以需要一个小代理：拉取密文 → 解密 → 返回 JPEG。
 *
 * 部署：Cloudflare 控制台 → Workers → 新建 → 粘贴本文件 → 部署，
 * 然后在 Rex 里黄果模块的全局参数「封面解密代理」填：
 *   https://<你的子域>.workers.dev/?url=
 *
 * 只代理 pic.* 图床域名，避免被当成开放代理滥用。
 */
const KEY = "f5d965df75336270";
const IV = "97b60394abc2fbe1";

export default {
  async fetch(request) {
    const u = new URL(request.url);
    const target = u.searchParams.get("url");
    if (!target) return new Response("missing url", { status: 400 });
    let t;
    try { t = new URL(target); } catch (_) { return new Response("bad url", { status: 400 }); }
    if (t.protocol !== "https:" || !/^pic\.[a-z0-9-]+\.[a-z]+$/i.test(t.hostname)) {
      return new Response("host not allowed", { status: 403 });
    }
    const cache = caches.default;
    const cacheKey = new Request(t.origin + t.pathname); // 去掉会过期的 auth_key 做缓存键
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    const res = await fetch(t.toString(), { headers: { Referer: "https://huangguoai.com/" } });
    if (!res.ok) return new Response("upstream " + res.status, { status: 502 });
    const buf = new Uint8Array(await res.arrayBuffer());
    const len = buf.length - (buf.length % 16);
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(KEY), { name: "AES-CBC" }, false, ["decrypt"]);
    // WebCrypto 的 AES-CBC 强制 PKCS7 去填充；密文无填充，这里补一个加密的 PKCS7 块再解密
    const lastBlock = buf.slice(len - 16, len);
    const padKey = await crypto.subtle.importKey("raw", enc.encode(KEY), { name: "AES-CBC" }, false, ["encrypt"]);
    const pad = new Uint8Array(16).fill(16);
    const padEnc = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv: lastBlock }, padKey, pad)).slice(0, 16);
    const joined = new Uint8Array(len + 16);
    joined.set(buf.subarray(0, len));
    joined.set(padEnc, len);
    let plain = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-CBC", iv: enc.encode(IV) }, key, joined));
    // 原图自带 PKCS7 填充时顺手去掉（JPEG 尾部多几个字节也能显示，这里只是更干净）
    const n = plain[plain.length - 1];
    if (n > 0 && n <= 16 && plain.slice(-n).every((x) => x === n)) plain = plain.slice(0, plain.length - n);
    const out = new Response(plain, {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=604800" },
    });
    await cache.put(cacheKey, out.clone());
    return out;
  },
};
