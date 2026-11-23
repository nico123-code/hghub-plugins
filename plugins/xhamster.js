export const meta = {
  id: 'xhamster',
  name: 'xHamster',
  version: '1.0.2',
  protocol: 1,
  description: 'xHamster：分类、搜索、详情与多清晰度播放。',
  author: 'community',
  kind: 'source',
  mature: true,
  linkDomains: ['xhamster.com', 'zh.xhamster.com'],
  defaultHeaders: {
    Referer: 'https://zh.xhamster.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  timeouts: { read: 20, playback: 30 },
};

const SITE = 'https://zh.xhamster.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TABS = [
  { id: '/newest', label: '最新' },
  { id: '/best/weekly', label: '本周最佳' },
  { id: '/4k', label: '4K' },
];

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

  async function fetchHtml(url, ctx) {
    const res = await hg.http.fetch({
      url,
      headers: headers(),
      responseType: 'text',
      timeoutMs: 15000,
      retry: 1,
      maxBytes: 8 * 1024 * 1024,
      signal: ctx && ctx.signal,
    });
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

  // 页面只把前几张卡片渲染成带 <img alt> 的 HTML，其余是懒加载空壳；
  // 完整列表在 window.initials 的 videoThumbProps 里。
  function extractJsonArray(text, key) {
    const idx = text.indexOf('"' + key + '":[');
    if (idx < 0) return null;
    const start = text.indexOf('[', idx);
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < text.length; i++) {
      const ch = text.charAt(i);
      if (inStr) {
        if (esc) esc = false;
        else if (ch === '\\') esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') inStr = true;
      else if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') {
        depth--;
        if (depth === 0) {
          try { return JSON.parse(text.slice(start, i + 1)); } catch (_) { return null; }
        }
      }
    }
    return null;
  }

  function fmtDuration(sec) {
    const n = Math.floor(Number(sec) || 0);
    if (!n) return '';
    const m = Math.floor(n / 60), ss = n % 60;
    return (m >= 60 ? Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0') : String(m)) + ':' + String(ss).padStart(2, '0');
  }

  function parseCards(html) {
    const rows = extractJsonArray(html, 'videoThumbProps');
    if (rows && rows.length) {
      const out = [];
      const seen = {};
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r || !r.pageURL || !r.title) continue;
        const id = pathId(r.pageURL);
        if (seen[id]) continue;
        seen[id] = true;
        const item = { id, title: String(r.title).trim(), type: 'movie' };
        const cover = r.thumbURL || r.imageURL;
        if (cover && /^https:\/\//.test(cover)) item.cover = cover;
        if (r.duration) { item.durationSec = Number(r.duration); const b = fmtDuration(r.duration); if (b) item.badge = b.slice(0, 8); }
        out.push(item);
      }
      if (out.length) return out;
    }
    return parseCardsHtml(html);
  }

  function parseCardsHtml(html) {
    const doc = hg.html.parse(html);
    const items = [];
    const nodes = doc.select('.thumb-list__item');
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i].first('a.video-thumb__image-container');
      const href = a && a.attr('href');
      const img = nodes[i].first('.thumb-image-container__image');
      const title = img && img.attr('alt');
      if (!href || !title) continue;
      const cover = img && img.attr('src');
      const dur = nodes[i].first('.thumb-image-container__duration');
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

  function extractJsonObject(text, startKey) {
    const idx = text.indexOf(startKey);
    if (idx < 0) return null;
    const brace = text.indexOf('{', idx);
    if (brace < 0) return null;
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let i = brace; i < text.length; i++) {
      const ch = text.charAt(i);
      if (inStr) {
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') { inStr = true; continue; }
      if (ch === '{') depth += 1;
      else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          try { return JSON.parse(text.slice(brace, i + 1)); } catch (_) { return null; }
        }
      }
    }
    return null;
  }

  function guessFormat(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return 'hls';
    return 'progressive';
  }

  return {
    endpoints: { list() { return [{ id: 'main', label: '主站', url: SITE }]; } },

    home: {
      async getSections(params, ctx) {
        const html = await fetchHtml(origin() + '/newest', ctx);
        return { items: [{ id: 'newest', title: '最新', layout: 'grid', items: parseCards(html) }], next: null };
      },
    },

    catalog: {
      async getCategories() {
        return TABS.map(function (t) { return { id: t.id, label: t.label }; });
      },
      async list(params, ctx) {
        const href = (params && params.categoryId) || '/newest';
        const page = pageOf(params && params.cursor);
        let url = origin() + href;
        if (page > 1) url += '/' + page;
        const html = await fetchHtml(url, ctx);
        const items = parseCards(html);
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    search: {
      async search(params, ctx) {
        const q = params && params.query ? String(params.query).trim() : '';
        if (!q) return { items: [], next: null };
        const page = pageOf(params && params.cursor);
        const html = await fetchHtml(origin() + '/search/' + encodeURIComponent(q) + '?page=' + page, ctx);
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
        const titleEl = doc.first('h1') || doc.first('.with-player-container h1');
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
        const pageUrl = absUrl(episodeId);
        const html = await fetchHtml(pageUrl, ctx);
        const settings = extractJsonObject(html, 'xplayerSettings');
        const h264 = settings && settings.sources && settings.sources.standard && settings.sources.standard.h264;
        if (!Array.isArray(h264) || !h264.length) fail('UPSTREAM_CHANGED', '未解析到播放地址');
        const streams = [];
        for (let i = 0; i < h264.length && streams.length < 16; i++) {
          if (!h264[i] || !h264[i].url) continue;
          streams.push({
            url: h264[i].url,
            kind: 'media',
            format: guessFormat(h264[i].url),
            label: String(h264[i].label || 'play'),
            headers: { 'User-Agent': UA, Referer: pageUrl + '/' },
          });
        }
        if (!streams.length) fail('UPSTREAM_CHANGED', '未解析到播放地址');
        return { streams };
      },
    },
  };
}
