export const meta = {
  id: 'pornhub',
  name: 'Pornhub',
  version: '1.0.2',
  protocol: 1,
  description: 'Pornhub：分类、搜索、详情与 HLS 播放。',
  author: 'community',
  kind: 'source',
  mature: true,
  linkDomains: ['pornhub.com', 'cn.pornhub.com', 'www.pornhub.com'],
  defaultHeaders: {
    Referer: 'https://cn.pornhub.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  timeouts: { read: 20, playback: 30 },
};

const SITE = 'https://cn.pornhub.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TABS = [
  { id: 'sy', label: '首页' },
  { id: 'cm', label: '最新' },
  { id: 'mv', label: '最多观看' },
  { id: 'ht', label: '最热' },
  { id: 'tr', label: '最高评分' },
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

  function absUrl(href) {
    if (!href) return '';
    if (/^https?:\/\//i.test(href)) return href;
    if (href.startsWith('//')) return 'https:' + href;
    const o = origin();
    return href.startsWith('/') ? o + href : o + '/' + href;
  }

  function pathId(href) {
    try {
      const u = new URL(absUrl(href));
      return u.pathname + (u.search || '');
    } catch (_) {
      return String(href || '');
    }
  }

  function pageOf(cursor) {
    const n = parseInt(cursor || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function parseCards(html) {
    const doc = hg.html.parse(html);
    const items = [];
    const nodes = doc.select('li.videoBox, li.pcVideoListItem, li.videoblock');
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].first('.phimage a.img') || nodes[i].first('a');
      const titleA = nodes[i].first('.title a') || a;
      const href = a && a.attr('href');
      const title = titleA && (titleA.attr('title') || titleA.text());
      if (!href || !title) continue;
      const img = nodes[i].first('.phimage a.img img') || nodes[i].first('img');
      const cover = img && (img.attr('data-mediumthumb') || img.attr('data-src') || img.attr('src'));
      const dur = nodes[i].first('.duration');
      const item = { id: pathId(href), title: title.trim(), type: 'movie' };
      if (cover) item.cover = absUrl(cover);
      if (dur) {
        const note = dur.text().trim();
        if (note) item.badge = note.slice(0, 8);
      }
      items.push(item);
    }
    return items;
  }

  function listUrl(id, page) {
    if (id === 'sy') {
      return origin() + '/video?' + (page > 1 ? 'page=' + page : '');
    }
    return origin() + '/video?o=' + encodeURIComponent(id) + (page > 1 ? '&page=' + page : '');
  }

  return {
    endpoints: { list() { return [{ id: 'main', label: '主站', url: SITE }]; } },

    home: {
      async getSections(params, ctx) {
        const html = await fetchHtml(listUrl('sy', 1), ctx);
        return { items: [{ id: 'home', title: '首页', layout: 'grid', items: parseCards(html) }], next: null };
      },
    },

    catalog: {
      async getCategories() {
        return TABS.map(function (t) { return { id: t.id, label: t.label }; });
      },
      async list(params, ctx) {
        const id = (params && params.categoryId) || 'sy';
        const page = pageOf(params && params.cursor);
        const html = await fetchHtml(listUrl(id, page), ctx);
        const items = parseCards(html);
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    search: {
      async search(params, ctx) {
        const q = params && params.query ? String(params.query).trim() : '';
        if (!q) return { items: [], next: null };
        const page = pageOf(params && params.cursor);
        const html = await fetchHtml(origin() + '/video/search?search=' + encodeURIComponent(q) + '&page=' + page, ctx);
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
        const titleEl = doc.first('h1') || doc.first('.title span') || doc.first('title');
        const title = titleEl ? titleEl.text().trim() : String(id);
        return {
          id: pathId(id),
          title,
          type: 'movie',
          playlists: [{
            id: 'main',
            label: '默认',
            episodes: [{ id: pathId(id), index: 1, episodeNumber: 1, label: '播放' }],
          }],
        };
      },

      async resolvePlayback(params, ctx) {
        const episodeId = params && params.episodeId;
        if (!episodeId) fail('INVALID_ARGUMENT', '缺少分集 ID');
        const html = await fetchHtml(absUrl(episodeId), ctx, true);
        const m = html.match(/var flashvars_.* = \{([\s\S]*?)\};/);
        if (!m) fail('UPSTREAM_CHANGED', '未找到播放配置');
        let json;
        try { json = JSON.parse('{' + m[1] + '}'); } catch (_) { fail('UPSTREAM_CHANGED', '播放配置不是 JSON'); }
        const defs = Array.isArray(json.mediaDefinitions) ? json.mediaDefinitions : [];
        const streams = [];
        for (let i = 0; i < defs.length; i++) {
          const e = defs[i];
          if (!e || e.format !== 'hls' || !e.videoUrl) continue;
          streams.push({
            url: e.videoUrl,
            kind: 'media',
            format: 'hls',
            label: String(e.quality || 'hls'),
            headers: headers(),
          });
        }
        if (!streams.length) fail('UPSTREAM_CHANGED', '未解析到 HLS 地址');
        return { streams: streams.slice(0, 16) };
      },
    },
  };
}
