export const meta = {
  id: 'hjkk',
  name: '韩剧看看',
  version: '1.0.2',
  protocol: 1,
  description: '韩剧看看：韩剧、韩影、韩综分类、搜索、详情与播放解析。',
  author: 'community',
  kind: 'source',
  linkDomains: ['hanjukankan.com', 'www.hanjukankan.com'],
  defaultHeaders: {
    Referer: 'https://www.hanjukankan.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  timeouts: { read: 20, playback: 30 },
};

const SITE = 'https://www.hanjukankan.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TABS = [
  { id: '1', label: '韩剧', type: 'series' },
  { id: '2', label: '韩影', type: 'movie' },
  { id: '3', label: '韩综', type: 'variety' },
];
const LIST_TPL = '/xvs{id}xatxbtxctxdtxetxftxgtxht{page}atbtct.html';

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
      return u.pathname;
    } catch (_) {
      return String(href || '');
    }
  }

  function pageOf(cursor) {
    const n = parseInt(cursor || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function parseList(html, selector, typeHint) {
    const doc = hg.html.parse(html);
    const items = [];
    const nodes = doc.select(selector);
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const a = el.first('a') || el;
      const href = a.attr('href') || (el.first('.module-card-item-poster') && el.first('.module-card-item-poster').attr('href'));
      const title = a.attr('title') || (el.first('.module-card-item-title strong') && el.first('.module-card-item-title strong').text()) || a.text();
      if (!href || !title) continue;
      const img = el.first('.module-item-pic img') || el.first('img');
      const cover = img && (img.attr('data-original') || img.attr('src'));
      const noteEl = el.first('.module-item-note');
      const item = {
        id: pathId(href),
        title: title.trim(),
        type: typeHint || 'series',
      };
      if (cover) item.cover = absUrl(cover);
      if (noteEl) {
        const note = noteEl.text().trim();
        if (note) item.badge = note.slice(0, 8);
      }
      items.push(item);
    }
    return items;
  }

  function parsePlayer(html) {
    const m = html.match(/r player_.*?=\s*(\{[\s\S]*?\})\s*</);
    if (!m) return null;
    try {
      return JSON.parse(m[1]);
    } catch (_) {
      return null;
    }
  }

  function decodePlayUrl(cfg) {
    if (!cfg || !cfg.url) return '';
    let url = String(cfg.url);
    if (cfg.encrypt === 1) {
      try { url = unescape(url); } catch (_) {}
    } else if (cfg.encrypt === 2) {
      try {
        url = unescape(hg.codec.utf8Decode(hg.codec.base64Decode(url)));
      } catch (_) {}
    }
    return url;
  }

  function guessFormat(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return 'hls';
    if (/\.mp4(\?|$)/i.test(url)) return 'progressive';
    return 'hls';
  }

  function typeOf(categoryId) {
    for (let i = 0; i < TABS.length; i++) {
      if (TABS[i].id === categoryId) return TABS[i].type;
    }
    return 'series';
  }

  return {
    endpoints: {
      list() {
        return [{ id: 'main', label: '主站', url: SITE }];
      },
    },

    home: {
      async getSections(params, ctx) {
        const page = 1;
        const url = origin() + LIST_TPL.replace('{id}', '1').replace('{page}', String(page));
        const html = await fetchHtml(url, ctx);
        const items = parseList(html, '.module-poster-item', 'series');
        return { items: [{ id: 'drama', title: '韩剧', layout: 'grid', items }], next: null };
      },
    },

    catalog: {
      async getCategories() {
        return TABS.map(function (t) { return { id: t.id, label: t.label }; });
      },
      async list(params, ctx) {
        const id = (params && params.categoryId) || '1';
        const page = pageOf(params && params.cursor);
        const url = origin() + LIST_TPL.replace('{id}', id).replace('{page}', String(page));
        const html = await fetchHtml(url, ctx);
        const items = parseList(html, '.module-poster-item', typeOf(id));
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    search: {
      async search(params, ctx) {
        const q = params && params.query ? String(params.query).trim() : '';
        if (!q) return { items: [], next: null };
        const page = pageOf(params && params.cursor);
        const url = origin() + '/xvse' + encodeURIComponent(q) + 'abcdefghig' + page + 'klm.html';
        const html = await fetchHtml(url, ctx);
        const items = parseList(html, '.module-card-item', 'series');
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    media: {
      async getDetail(params, ctx) {
        const id = params && params.id;
        if (!id) fail('INVALID_ARGUMENT', '缺少作品 ID');
        const url = absUrl(id);
        const html = await fetchHtml(url, ctx);
        const doc = hg.html.parse(html);
        const titleEl = doc.first('h1') || doc.first('.module-info-heading h1') || doc.first('title');
        const title = titleEl ? titleEl.text().trim() : String(id);
        const img = doc.first('.module-item-pic img') || doc.first('.module-info-poster img');
        const cover = img && (img.attr('data-original') || img.attr('src'));
        const descEl = doc.first('.module-info-introduction-content') || doc.first('.video-info-item');
        const links = doc.select('#panel1 .module-play-list-link, .module-play-list-link');
        const episodes = [];
        for (let i = 0; i < links.length; i++) {
          const a = links[i].tag === 'a' ? links[i] : links[i].first('a') || links[i];
          const href = a.attr('href');
          const span = links[i].first('span');
          const label = (span ? span.text() : a.text()).trim() || String(i + 1);
          if (!href) continue;
          episodes.push({
            id: pathId(href),
            index: i + 1,
            episodeNumber: i + 1,
            label,
          });
        }
        if (!episodes.length) fail('UPSTREAM_CHANGED', '未解析到分集');
        const detail = {
          id: pathId(id),
          title,
          type: episodes.length > 1 ? 'series' : 'movie',
          playlists: [{ id: 'main', label: '默认', episodes }],
        };
        if (cover) detail.cover = absUrl(cover);
        if (descEl) {
          const desc = descEl.text().trim();
          if (desc) detail.description = desc;
        }
        return detail;
      },

      async resolvePlayback(params, ctx) {
        const episodeId = params && params.episodeId;
        if (!episodeId) fail('INVALID_ARGUMENT', '缺少分集 ID');
        const html = await fetchHtml(absUrl(episodeId), ctx, true);
        const cfg = parsePlayer(html);
        const playUrl = decodePlayUrl(cfg);
        if (!playUrl) fail('UPSTREAM_CHANGED', '未解析到播放地址');
        return {
          streams: [{
            url: playUrl,
            kind: 'media',
            format: guessFormat(playUrl),
            headers: headers(),
          }],
        };
      },

      matchUrl(params) {
        const raw = params && params.url;
        if (!raw) return null;
        try {
          const u = new URL(raw);
          if (!/hanjukankan\.com$/i.test(u.hostname)) return null;
          if (!u.pathname || u.pathname === '/') return null;
          return { mediaId: u.pathname };
        } catch (_) {
          return null;
        }
      },
    },
  };
}
