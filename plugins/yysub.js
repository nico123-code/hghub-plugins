export const meta = {
  id: 'yysub',
  name: '人人影视',
  version: '1.0.0',
  protocol: 1,
  description: '人人影视（YYeTs）：美剧/电影/公开课分类、排行、搜索与分季资源列表。站点只提供磁力/电驴下载链接，播放时交给外部下载或播放 App 打开。',
  author: 'community',
  kind: 'source',
  linkDomains: ['m.yysub.cc', 'www.yysub.cc', 'yysub.cc', 'www.yysub.net'],
  defaultHeaders: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  },
  timeouts: { read: 20, playback: 20 },
};

const SITE = 'https://m.yysub.cc';
const IMG = 'https://ftp.yysub.cc';
const TABS = [
  { id: 'tv', label: '电视剧', type: 'series' },
  { id: 'movie', label: '电影', type: 'movie' },
  { id: 'openclass', label: '公开课', type: 'documentary' },
  { id: 'top:tv_week', label: '本周剧集榜' },
  { id: 'top:movie_week', label: '本周电影榜' },
  { id: 'top:fav_month', label: '本月收藏榜' },
  { id: 'top:tv_total', label: '剧集总榜' },
  { id: 'top:movie_total', label: '电影总榜' },
];
const CHANNEL_TYPE = { tv: 'series', movie: 'movie', openclass: 'documentary' };
// 列表/详情短缓存；取下载链接（resolvePlayback）不缓存。
const PAGE_CACHE = { ttlSec: 300, staleIfErrorSec: 3600 };

export default function (hg) {
  function origin() {
    const cur = hg.endpoint && hg.endpoint.current;
    if (cur && typeof cur.url === 'string' && cur.url) return cur.url.replace(/\/$/, '');
    return SITE;
  }

  function fail(code, message, extra) {
    throw new hg.PluginError(code, message, extra);
  }

  function pageOf(cursor) {
    const n = parseInt(cursor || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  async function api(path, query, ctx, label, fresh) {
    const qs = [];
    if (query) {
      for (const k in query) {
        if (query[k] !== undefined && query[k] !== null && query[k] !== '') {
          qs.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(query[k])));
        }
      }
    }
    const req = {
      url: origin() + '/api/' + path + (qs.length ? '?' + qs.join('&') : ''),
      headers: { client: '6', Referer: origin() + '/' },
      responseType: 'json',
      timeoutMs: 15000,
      retry: 1,
      signal: ctx && ctx.signal,
    };
    if (!fresh) req.cache = PAGE_CACHE;
    const res = await hg.http.fetch(req);
    if (!res.ok) fail('UPSTREAM_ERROR', (label || '接口') + '暂时不可用（HTTP ' + res.status + '）');
    const body = res.data;
    if (!body || typeof body !== 'object') fail('UPSTREAM_CHANGED', (label || '接口') + '返回结构已变化');
    if (body.status !== undefined && body.status !== 1 && body.status !== '1' && body.data == null && !body.list) {
      fail('UPSTREAM_ERROR', (label || '接口') + '：' + (body.info || '请求失败'));
    }
    return body;
  }

  function img(p) {
    if (!p || typeof p !== 'string') return undefined;
    if (/^https?:\/\//i.test(p)) return p;
    if (/^\/res\//i.test(p)) return 'https://jstu.yysub.cc' + p.replace(/^\/res/i, '');
    return IMG + (p.charAt(0) === '/' ? p : '/' + p);
  }

  // 列表里的 poster 是原图，加上站点自己的缩略图后缀（280x390 webp，约 10 KB）。
  function thumb(p) {
    if (!p) return undefined;
    if (p.indexOf('@') < 0 && /\.(jpe?g|png|webp)$/i.test(p)) p = p + '@280,390.webp';
    return img(p);
  }

  function statusOf(s) {
    s = String(s || '');
    if (/连载|更新/.test(s)) return 'ongoing';
    if (/完结|已上映|全/.test(s)) return 'finished';
    if (/尚未|未上映|即将|待播/.test(s)) return 'upcoming';
    return undefined;
  }

  function toNum(v) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : undefined;
  }

  function card(e, typeHint) {
    if (!e) return null;
    const id = e.id != null ? e.id : (e.itemid != null ? e.itemid : e.rid);
    const title = e.cnname || e.enname;
    if (id == null || !title) return null;
    const item = { id: String(id), title: String(title).trim() };
    const t = CHANNEL_TYPE[e.channel] || typeHint;
    if (t) item.type = t;
    const cover = (e.poster_map && e.poster_map.b) || e.poster_b || e.poster;
    if (cover) item.cover = thumb(cover);
    const tags = [];
    if (e.area) tags.push(String(e.area));
    if (e.category) String(e.category).split('/').forEach(function (c) { if (c) tags.push(c); });
    if (tags.length) item.tags = tags.slice(0, 6);
    const score = toNum(e.score);
    if (score && score > 0 && score <= 10) item.score = score;
    const year = parseInt(e.publish_year, 10);
    if (year > 1900) item.year = year;
    const st = statusOf(e.play_status);
    if (st) item.status = st;
    if (e.play_status) item.badge = String(e.play_status).replace('连载中', '连载').slice(0, 8);
    else if (e.se) item.badge = String(e.se).slice(0, 8);
    else if (e.date) item.badge = String(e.date).slice(0, 8);
    return item;
  }

  function cards(rows, typeHint) {
    const out = [];
    const seen = {};
    if (!Array.isArray(rows)) return out;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i] && rows[i].resource_info ? rows[i].resource_info : rows[i];
      const c = card(r, typeHint);
      if (c && !seen[c.id]) { seen[c.id] = true; out.push(c); }
    }
    return out;
  }

  async function topList(key, limit, ctx) {
    const body = await api('resource_top', { channel: key, limit: limit || 30 }, ctx, '排行榜');
    return cards(body.data);
  }

  function formatLabel(f) {
    f = String(f || '').trim().toUpperCase();
    if (!f) return '其他';
    return f.replace(/^WEB-/, '');
  }

  function itemsToEpisodes(list, isTv) {
    // 按清晰度分组成播放列表，每个文件是一集（剧集带季号/集号，电影是不同版本）。
    const groups = {};
    const order = [];
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      if (!it || it.id == null) continue;
      const key = formatLabel(it.format);
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(it);
    }
    const rank = ['1080P', '2160P', 'BD-2160P', 'BD-1080P', '720P', 'BD-720P', 'HDTV', 'MP4', 'DVD', 'RMVB'];
    order.sort(function (a, b) {
      const ia = rank.indexOf(a); const ib = rank.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    // 1080P 排第一作为默认（体积和清晰度最均衡），同为 1080P 的 WEB 与普通版本合并成一组。
    const playlists = [];
    for (let g = 0; g < order.length; g++) {
      const rows = groups[order[g]].slice();
      if (isTv) {
        rows.sort(function (a, b) {
          return (parseInt(a.season, 10) - parseInt(b.season, 10)) ||
            (parseFloat(a.episode) - parseFloat(b.episode)) || (a.id - b.id);
        });
      }
      const episodes = [];
      for (let i = 0; i < rows.length; i++) {
        const it = rows[i];
        const s = parseInt(it.season, 10);
        const e = parseFloat(it.episode);
        const ep = { id: String(it.id), index: i + 1 };
        const size = it.size ? ' · ' + it.size : '';
        if (isTv && Number.isFinite(s) && Number.isFinite(e) && e > 0) {
          ep.season = s >= 0 && s < 100 ? s : undefined;
          if (ep.season === undefined) delete ep.season;
          ep.episodeNumber = e;
          ep.label = 'S' + (s < 10 ? '0' : '') + s + 'E' + (e < 10 ? '0' : '') + e;
          ep.title = (String(it.name || '') + size).slice(0, 200);
        } else {
          ep.label = String(i + 1);
          ep.title = (String(it.name || ('版本 ' + (i + 1))) + size).slice(0, 200);
        }
        if (it.dateline) ep.airDate = Number(it.dateline) * 1000;
        episodes.push(ep);
      }
      if (episodes.length) {
        playlists.push({ id: order[g], label: order[g], episodes });
      }
    }
    return playlists;
  }

  return {
    endpoints: {
      list() {
        return [{ id: 'main', label: '主站', url: SITE }];
      },
    },

    home: {
      async getSections(params, ctx) {
        const results = await Promise.all([
          api('index', null, ctx, '首页').catch(function () { return null; }),
          topList('tv_week', 20, ctx).catch(function () { return []; }),
          topList('movie_week', 20, ctx).catch(function () { return []; }),
        ]);
        const idx = results[0] || {};
        const sections = [];
        const hot = cards(idx.resource_hot);
        if (hot.length) {
          sections.push({
            id: 'banner', title: '热门推荐', layout: 'banner', imageAspect: 'portrait',
            items: hot.slice(0, 6).map(function (it) { return Object.assign({ backdrop: it.cover }, it); }),
          });
          sections.push({ id: 'hot', title: '热门资源', layout: 'row', imageAspect: 'portrait', items: hot });
        }
        const sched = cards(idx.tv_schedule, 'series');
        if (sched.length) sections.push({ id: 'schedule', title: '今日播出', layout: 'row', imageAspect: 'portrait', items: sched });
        if (results[1].length) sections.push({ id: 'top-tv', title: '本周剧集榜', layout: 'row', imageAspect: 'portrait', items: results[1], more: true });
        if (results[2].length) sections.push({ id: 'top-movie', title: '本周电影榜', layout: 'row', imageAspect: 'portrait', items: results[2], more: true });
        const movies = cards(idx.movie_list, 'movie');
        if (movies.length) sections.push({ id: 'coming', title: '近期上映', layout: 'row', imageAspect: 'portrait', items: movies });
        if (!sections.length) fail('UPSTREAM_ERROR', '首页暂时不可用');
        return { items: sections, next: null };
      },
      async listSection(params, ctx) {
        const sid = params && params.sectionId;
        const key = sid === 'top-tv' ? 'tv_week' : (sid === 'top-movie' ? 'movie_week' : null);
        if (!key) return { items: [], next: null };
        return { items: await topList(key, 50, ctx), next: null };
      },
    },

    catalog: {
      async getCategories() {
        return TABS.map(function (t) { return { id: t.id, label: t.label }; });
      },
      async list(params, ctx) {
        const id = (params && params.categoryId) || 'tv';
        if (id.indexOf('top:') === 0) {
          return { items: await topList(id.slice(4), 50, ctx), next: null };
        }
        const page = pageOf(params && params.cursor);
        const body = await api('resource', { p: page, channel: id }, ctx, '分类');
        const items = cards(body.list, CHANNEL_TYPE[id]);
        return { items, next: items.length ? String(page + 1) : null };
      },
    },

    search: {
      async search(params, ctx) {
        const q = params && params.query ? String(params.query).trim() : '';
        if (!q) return { items: [], next: null };
        const page = pageOf(params && params.cursor);
        const body = await api('search', { keyword: q, type: 'resource', p: page }, ctx, '搜索');
        const items = cards(body.data);
        return { items, next: items.length >= 10 ? String(page + 1) : null };
      },
    },

    media: {
      matchUrl(params) {
        const url = String((params && params.url) || '');
        const m = url.match(/[?&]id=(\d+)/) || url.match(/\/resource\/(\d+)/);
        return m ? { mediaId: m[1] } : null;
      },

      async getDetail(params, ctx) {
        const id = params && params.id;
        if (!id || !/^\d+$/.test(String(id))) fail('INVALID_ARGUMENT', '缺少作品 ID');
        const both = await Promise.all([
          api('resource/' + id, null, ctx, '详情'),
          api('resource_item', { rid: id }, ctx, '资源列表'),
        ]);
        const info = (both[0] && both[0].data) || {};
        const first = (both[1] && both[1].data) || {};
        const isTv = (info.channel || first.channel) === 'tv';
        let list = Array.isArray(first.item_list) ? first.item_list.slice() : [];
        const seasons = Array.isArray(first.season_list) ? first.season_list.map(String) : [];
        const cur = String(first.current_season || '');
        const rest = seasons.filter(function (s) { return s !== cur; });
        if (rest.length) {
          // 其余季并行取（宿主会限制同站并发），失败的季跳过不影响已有的季。
          const more = await Promise.all(rest.map(function (s) {
            return api('resource_item', { rid: id, season: s }, ctx, '第' + s + '季')
              .then(function (b) { return (b && b.data && b.data.item_list) || []; })
              .catch(function () { return []; });
          }));
          for (let i = 0; i < more.length; i++) list = list.concat(more[i]);
        }
        const playlists = itemsToEpisodes(list, isTv);
        if (!playlists.length) {
          playlists.push({
            id: 'none', label: '暂无资源',
            episodes: [{ id: 'none', index: 1, label: '暂无', title: '该条目暂时没有下载资源', locked: true, lockReason: '暂无资源' }],
          });
        }
        const base = card(Object.assign({ id: id }, info), CHANNEL_TYPE[info.channel]) || { id: String(id), title: String(id) };
        if (info.poster) base.cover = img(info.poster);
        const detail = Object.assign(base, { playlists });
        if (info.enname && info.enname !== base.title) detail.description = info.enname;
        const content = info.detail && info.detail.content;
        if (content) {
          const text = String(content).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
          detail.description = (detail.description ? detail.description + '\n\n' : '') + text;
        }
        const sc = both[0] && both[0].score && toNum(both[0].score.score);
        if (sc && sc > 0 && sc <= 10) detail.score = sc;
        if (isTv) {
          const nums = {};
          list.forEach(function (it) { const s = parseInt(it.season, 10); if (Number.isFinite(s) && s >= 0 && s < 100) nums[s] = true; });
          detail.seasons = Object.keys(nums).map(Number).sort(function (a, b) { return a - b; })
            .map(function (n) { return { number: n, label: n === 0 ? '前传/特别篇' : '第' + n + '季' }; });
        }
        const people = Array.isArray(both[0] && both[0].character_list) ? both[0].character_list : [];
        if (people.length) {
          detail.people = people.slice(0, 20).map(function (p) {
            const o = { name: String(p.cnname || '') };
            if (p.pro) o.role = p.pro === 'director' ? '导演' : (p.pro === 'actor' ? '演员' : String(p.pro));
            if (p.poster) o.avatar = img(p.poster);
            return o;
          }).filter(function (p) { return p.name; });
        }
        if (detail.description) detail.description = detail.description.slice(0, 5000);
        return detail;
      },

      async resolvePlayback(params, ctx) {
        const episodeId = params && params.episodeId;
        if (!episodeId || !/^\d+$/.test(String(episodeId))) fail('INVALID_ARGUMENT', '该条目暂无资源');
        const body = await api('resource_item_file', { itemid: episodeId }, ctx, '下载链接', true);
        const files = Array.isArray(body.data) ? body.data : [];
        const streams = [];
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          const addr = f && typeof f.address === 'string' ? f.address.trim() : '';
          if (!addr) continue;
          if (/^magnet:/i.test(addr)) {
            streams.push({ url: addr, kind: 'external', label: '磁力链接', external: { app: '迅雷 / BT 下载工具' } });
          } else if (/^ed2k:/i.test(addr)) {
            streams.push({ url: addr, kind: 'external', label: '电驴链接', external: { app: '迅雷 / 电驴' } });
          } else if (/^https?:\/\//i.test(addr)) {
            streams.push({ url: addr, kind: 'external', label: '网盘链接' });
          }
        }
        // 磁力优先
        streams.sort(function (a, b) { return (a.label === '磁力链接' ? 0 : 1) - (b.label === '磁力链接' ? 0 : 1); });
        if (!streams.length) fail('UPSTREAM_ERROR', '这个资源暂时没有可用的下载链接');
        return { streams };
      },
    },
  };
}
