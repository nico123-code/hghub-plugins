export const meta = {
  id: 'hanime',
  name: 'Hanime1',
  version: '1.0.2',
  protocol: 1,
  description: 'Hanime1：分类、搜索、详情与直链播放。',
  author: 'community',
  kind: 'source',
  mature: true,
  linkDomains: ['hanime1.me'],
  defaultHeaders: {
    Referer: 'https://hanime1.me/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  timeouts: { read: 20, playback: 30 },
};

const SITE = 'https://hanime1.me';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

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

  function pageOf(cursor) {
    const n = parseInt(cursor || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function parseCards(html) {
    const doc = hg.html.parse(html);
    const items = [];
    let nodes = doc.select('.home-rows-videos-wrapper > a');
    if (!nodes.length) nodes = doc.select('.content-padding-new > .row > .search-doujin-videos.col-xs-6, .col-xs-6');
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const overlay = el.first('.overlay');
      const href = el.attr('href') || (overlay && overlay.attr('href'));
      const titleEl = el.first('.home-rows-videos-title') || el.first('.card-mobile-title');
      const title = titleEl ? titleEl.text().trim() : '';
      if (!href || !title) continue;
      const imgs = el.select('img');
      let cover = imgs[0] && imgs[0].attr('src');
      if (cover && cover.indexOf('background') >= 0 && imgs[1]) cover = imgs[1].attr('src');
      const item = { id: absUrl(href), title, type: 'anime' };
      if (cover) item.cover = absUrl(cover);
      items.push(item);
    }
    return items;
  }

  function staticTabs() {
    const g = ['裏番', '泡麵番', 'Motion Anime', '3DCG', '2.5D', '2D動畫', 'AI生成', 'MMD', 'Cosplay'];
    return g.map(function (x) { return { id: origin() + '/search?genre=' + encodeURIComponent(x), label: x }; });
  }

  async function loadTabs(ctx) {
    let html;
    try {
      html = await fetchHtml(origin() + '/', ctx);
    } catch (_) {
      // 首页被 Cloudflare 拦截时 getCategories 会整体失败，分类页直接空白
      return staticTabs();
    }
    const doc = hg.html.parse(html);
    const links = doc.select('#main-nav-home > a.nav-item');
    const items = [];
    for (let i = 0; i < links.length; i++) {
      const name = links[i].text().trim();
      const href = links[i].attr('href');
      if (!name || !href) continue;
      if (name.indexOf('新番預告') >= 0 || name.indexOf('H漫畫') >= 0) continue;
      items.push({ id: absUrl(href), label: name });
    }
    return items.length ? items : staticTabs();
  }

  function guessFormat(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return 'hls';
    return 'progressive';
  }

  return {
    endpoints: { list() { return [{ id: 'main', label: '主站', url: SITE }]; } },

    home: {
      async getSections(params, ctx) {
        const html = await fetchHtml(origin() + '/', ctx);
        return { items: [{ id: 'latest', title: '最新', layout: 'grid', items: parseCards(html).slice(0, 40) }], next: null };
      },
    },

    catalog: {
      async getCategories(params, ctx) {
        return loadTabs(ctx);
      },
      async list(params, ctx) {
        const cat = (params && params.categoryId) || origin() + '/';
        const page = pageOf(params && params.cursor);
        let url = absUrl(cat);
        if (page > 1) url += (url.indexOf('?') >= 0 ? '&' : '?') + 'page=' + page;
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
        const html = await fetchHtml(origin() + '/search?query=' + encodeURIComponent(q) + '&page=' + page, ctx);
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
        const titleEl = doc.first('h3') || doc.first('h1') || doc.first('.video-description-panel h3');
        const title = titleEl ? titleEl.text().trim() : String(id);
        const img = doc.first('video') || doc.first('.video-player img');
        const cover = img && (img.attr('poster') || img.attr('src'));
        const detail = {
          id: absUrl(id),
          title,
          type: 'anime',
          playlists: [{
            id: 'main',
            label: '默认',
            episodes: [{ id: absUrl(id), index: 1, episodeNumber: 1, label: '播放' }],
          }],
        };
        if (cover) detail.cover = absUrl(cover);
        return detail;
      },

      async resolvePlayback(params, ctx) {
        const episodeId = params && params.episodeId;
        if (!episodeId) fail('INVALID_ARGUMENT', '缺少分集 ID');
        const html = await fetchHtml(absUrl(episodeId), ctx);
        const m = html.match(/contentUrl"\s*:\s*"(.*?)"/);
        if (!m) fail('UPSTREAM_CHANGED', '未解析到播放地址');
        return {
          streams: [{
            url: m[1],
            kind: 'media',
            format: guessFormat(m[1]),
            headers: headers(),
          }],
        };
      },
    },
  };
}
