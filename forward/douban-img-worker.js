/**
 * 豆瓣封面代理 · Cloudflare Worker（hghub-db）
 *
 * 爱看机器人（ikanbot）的封面大多直接用豆瓣图床 img*.doubanio.com，
 * 豆瓣图床不带豆瓣 Referer 会返回 418，Rex 里封面就显示不出来。
 * 这个 Worker 只代理 *.doubanio.com 的图片，补上 Referer 后原样返回。
 * 2026-11-25 起也代理 *.sinaimg.cn（新浪图床，带外站 Referer 会 403，这里不带 Referer 去取），
 * 给孤岛书源「世界名著网」的封面用。
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
    const isDb = /^img\d*\.doubanio\.com$/i.test(t.hostname);
    const isSina = /^(ww|wx|tva|tvax)\d*\.sinaimg\.cn$/i.test(t.hostname);
    if (t.protocol !== "https:" || !(isDb || isSina)) {
      return new Response("host not allowed", { status: 403 });
    }
    const cache = caches.default;
    const cacheKey = new Request(t.toString());
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
    const res = await fetch(t.toString(), {
      // 新浪图床：浏览器 UA 且无 Referer 会 403，非浏览器 UA 才放行
      headers: isSina ? { "User-Agent": "curl/8.5.0" } : {
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
