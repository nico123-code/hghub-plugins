export const meta = {
  id: 'hdmoli',
  name: 'hdmoli',
  version: '1.0.3',
  protocol: 1,
  description: 'hdmoli：电影、剧集、动画分类、搜索、详情与播放解析。',
  author: 'community',
  kind: 'source',
  linkDomains: ['www.hdmoli.com', 'hdmoli.com', 'hdmoli.pro', 'v.damoli.pro'],
  defaultHeaders: {
    Referer: 'https://www.hdmoli.com/',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 Mobile Safari/537.36',
  },
  timeouts: { read: 20, playback: 30 },
};

// hdmoli.pro 现在把所有路径 301 到 www.hdmoli.com 首页，导致三个分类内容相同。
const SITE = 'https://www.hdmoli.com';
const UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 Mobile Safari/537.36';
const TABS = [
  { id: '1', label: '电影', type: 'movie' },
  { id: '2', label: '剧集', type: 'series' },
  { id: '41', label: '动画', type: 'anime' },
];

// 列表/详情页短缓存：重复进入首页、分类、返回上一页时不再重新请求；播放解析始终取最新。
const PAGE_CACHE = { ttlSec: 300, staleIfErrorSec: 3600 };

export default function (hg) {
  function origin() {
    const cur = hg.endpoint && hg.endpoint.current;
    if (cur && typeof cur.url === 'string' && cur.url) return cur.url.replace(/\/$/, '');
    return SITE;
  }

  function headers() {
    return { 'User-Agent': UA, Referer: origin() + '/' };
  }

  function fail(code, message, extra) {
    throw new hg.PluginError(code, message, extra);
  }

  async function fetchHtml(url, ctx, fresh) {
    const req = {
      url,
      headers: headers(),
      responseType: 'text',
      timeoutMs: 15000,
      retry: 1,
      maxBytes: 8 * 1024 * 1024,
      signal: ctx && ctx.signal,
    };
    if (!fresh) req.cache = PAGE_CACHE;
    const res = await hg.http.fetch(req);
    if (!res.ok) fail('UPSTREAM_ERROR', '页面暂时不可用（HTTP ' + res.status + '）');
    return res.data;
  }

  async function fetchJson(url, ctx, label) {
    const res = await hg.http.fetch({
      url,
      headers: headers(),
      responseType: 'json',
      timeoutMs: 15000,
      retry: 1,
      signal: ctx && ctx.signal,
    });
    if (!res.ok) fail('UPSTREAM_ERROR', (label || '接口') + '暂时不可用（HTTP ' + res.status + '）');
    return res.data;
  }

  function absUrl(href) {
    if (!href) return '';
    if (/^https?:\/\//i.test(href)) return href;
    if (href.startsWith('//')) return 'https:' + href;
    const o = origin();
    return href.startsWith('/') ? o + href : o + '/' + href;
  }

  function pathId(href) {
    try { return new URL(absUrl(href)).pathname; } catch (_) { return String(href || ''); }
  }

  function pageOf(cursor) {
    const n = parseInt(cursor || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function typeOf(id) {
    for (let i = 0; i < TABS.length; i++) if (TABS[i].id === id) return TABS[i].type;
    return 'other';
  }

  function parseCards(html, typeHint) {
    const doc = hg.html.parse(html);
    const items = [];
    const nodes = doc.select('.myui-vodlist > li, .myui-vodlist li');
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].first('.myui-vodlist__thumb') || nodes[i].first('a');
      if (!a) continue;
      const href = a.attr('href');
      const title = a.attr('title') || a.text();
      if (!href || !title) continue;
      // 站点改版后封面放在缩略图链接里的 <img class="vod-poster" src=...>，旧写法读不到。
      const img = a.first('img') || nodes[i].first('img');
      const cover = a.attr('data-original') ||
        (img && (img.attr('data-original') || img.attr('data-src') || img.attr('src')));
      const item = { id: pathId(href), title: title.trim(), type: typeHint || 'other' };
      if (cover) item.cover = absUrl(cover);
      items.push(item);
    }
    return items;
  }

  function latin1(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return s;
  }

  function decryptUrl(encData) {
    const raw = hg.codec.base64Decode(encData);
    const key = 'ItLdg666';
    let mid = '';
    for (let i = 0; i < raw.length; i++) {
      mid += String.fromCharCode(raw[i] ^ key.charCodeAt(i % 8));
    }
    return latin1(hg.codec.base64Decode(mid));
  }

  function guessFormat(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return 'hls';
    if (/\.mp4(\?|$)/i.test(url)) return 'progressive';
    return 'hls';
  }

  return {
    endpoints: { list() { return [{ id: 'main', label: '主站', url: SITE }]; } },

    home: {
      async getSections(params, ctx) {
        const html = await fetchHtml(origin() + '/mlist/index1-1.html', ctx);
        return { items: [{ id: 'movie', title: '电影', layout: 'grid', items: parseCards(html, 'movie') }], next: null };
      },
    },

    catalog: {
      async getCategories() {
        return TABS.map(function (t) { return { id: t.id, label: t.label }; });
      },
      async list(params, ctx) {
        const id = (params && params.categoryId) || '1';
        const page = pageOf(params && params.cursor);
        const html = await fetchHtml(origin() + '/mlist/index' + id + '-' + page + '.html', ctx);
        const items = parseCards(html, typeOf(id));
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    search: {
      async search(params, ctx) {
        const q = params && params.query ? String(params.query).trim() : '';
        if (!q) return { items: [], next: null };
        const page = pageOf(params && params.cursor);
        const html = await fetchHtml(origin() + '/search.php?page=' + page + '&searchword=' + encodeURIComponent(q), ctx);
        const items = parseCards(html);
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    media: {
      async getDetail(params, ctx) {
        const id = params && params.id;
        if (!id) fail('INVALID_ARGUMENT', '缺少作品 ID');
        const html = await fetchHtml(absUrl(id), ctx);
        const doc = hg.html.parse(html);
        const titleEl = doc.first('h1') || doc.first('.myui-content__detail h1');
        const title = titleEl ? titleEl.text().trim() : String(id);
        const lists = doc.select('ul.myui-content__list');
        const playlists = [];
        for (let i = 0; i < lists.length; i++) {
          const links = lists[i].select('li a');
          const episodes = [];
          for (let j = 0; j < links.length; j++) {
            const href = links[j].attr('href');
            if (!href) continue;
            episodes.push({
              id: pathId(href),
              index: j + 1,
              episodeNumber: j + 1,
              label: links[j].text().trim() || String(j + 1),
            });
          }
          if (episodes.length) playlists.push({ id: String(i + 1), label: '线路' + (i + 1), episodes });
        }
        if (!playlists.length) fail('UPSTREAM_CHANGED', '未解析到分集');
        const detail = {
          id: pathId(id),
          title,
          type: playlists[0].episodes.length > 1 ? 'series' : 'movie',
          playlists,
        };
        const poster = doc.first('.myui-content__thumb img');
        const cover = poster && (poster.attr('data-original') || poster.attr('src'));
        if (cover) detail.cover = absUrl(cover);
        return detail;
      },

      async resolvePlayback(params, ctx) {
        const episodeId = params && params.episodeId;
        if (!episodeId) fail('INVALID_ARGUMENT', '缺少分集 ID');
        const html = await fetchHtml(absUrl(episodeId), ctx, true);
        const m = html.match(/var now="([^"]+)"/);
        if (!m) fail('UPSTREAM_CHANGED', '未找到播放变量');
        const encUrl = m[1].split('|')[0];
        if (encUrl.endsWith('.mp4')) {
          const url = 'https://v.damoli.pro/v/' + encUrl;
          return {
            streams: [{
              url,
              kind: 'media',
              format: 'progressive',
              headers: headers(),
            }],
          };
        }
        const api = encUrl.length === 32
          ? origin() + '/api/webvideo.php?url=' + encodeURIComponent(encUrl) + '&type=json'
          : origin() + '/api/webvideo_ty.php?url=' + encodeURIComponent(encUrl) + '&type=json';
        const body = await fetchJson(api, ctx, '解析');
        if (!body || !body.url) fail('UPSTREAM_CHANGED', '解析接口无地址');
        const playUrl = decryptUrl(body.url);
        if (!playUrl) fail('UPSTREAM_CHANGED', '播放地址解密失败');
        return {
          streams: [{
            url: playUrl,
            kind: 'media',
            format: guessFormat(playUrl),
            headers: headers(),
          }],
        };
      },
    },
  };
}
