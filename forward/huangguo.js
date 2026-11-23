/**
 * 黄果短剧 · Rex / Forward 模块（ForwardWidget 格式）
 * 由 HGhub 插件 plugins/huangguo.js 移植。
 *
 * 说明：
 *  - 列表 / 分类 / 榜单 / 搜索 / 详情（分集）/ 播放均走站点公开接口。
 *  - 播放地址带短时签名，所以不写死在 videoUrl，起播时由 loadResource 现取。
 *  - 站点封面是 AES-CBC 加密的图片（直接下载是乱码），ForwardWidget 没有图片解码钩子，
 *    默认无法显示封面。可在模块全局参数「封面解密代理」填一个自建解密代理
 *    （仓库 forward/cover-proxy-worker.js 是 Cloudflare Worker 模板），填了才会显示封面。
 */
WidgetMetadata = {
  id: "hghub.huangguo",
  title: "黄果短剧",
  description: "黄果短剧：分类、题材标签、榜单、搜索、分集播放（18+）",
  author: "nico123-code",
  site: "https://github.com/nico123-code/hghub-plugins",
  version: "2026.11.23.2",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "coverProxy",
      title: "封面解密代理（可选）",
      type: "input",
      description: "站点封面是加密图片，填自建解密代理地址才能显示封面，例如 https://xxx.workers.dev/?url= ，留空则不显示封面",
      value: "",
    },
  ],
  modules: [
    {
      id: "loadList",
      title: "全部短剧",
      functionName: "loadList",
      cacheDuration: 300,
      params: [
        {
          name: "cate",
          title: "分类",
          type: "enumeration",
          value: "all",
          enumOptions: [
            { title: "全部", value: "all" },
            { title: "短剧", value: "24" },
            { title: "漫剧", value: "25" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "loadRank",
      title: "排行榜",
      functionName: "loadRank",
      cacheDuration: 600,
      params: [
        {
          name: "rank",
          title: "榜单",
          type: "enumeration",
          value: "hot",
          enumOptions: [
            { title: "热播榜", value: "hot" },
            { title: "推荐榜", value: "recommend" },
            { title: "潜力榜", value: "potential" },
          ],
        },
      ],
    },
    {
      "id": "tag_djtc",
      "title": "分类·题材",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "题材",
          "type": "enumeration",
          "value": "huangdao",
          "enumOptions": [
            {
              "title": "荒岛",
              "value": "huangdao"
            },
            {
              "title": "性转",
              "value": "xingzhuan"
            },
            {
              "title": "乡村",
              "value": "xiangcun"
            },
            {
              "title": "校园",
              "value": "xiaoyuan"
            },
            {
              "title": "都市",
              "value": "dushi"
            },
            {
              "title": "游戏",
              "value": "youxi"
            },
            {
              "title": "古风",
              "value": "gufeng"
            },
            {
              "title": "丧尸",
              "value": "sangshi"
            },
            {
              "title": "现代",
              "value": "xiandai"
            },
            {
              "title": "娱乐圈",
              "value": "yulequan"
            },
            {
              "title": "大女主",
              "value": "danvzhu"
            },
            {
              "title": "超能力",
              "value": "chaonengli"
            },
            {
              "title": "职场",
              "value": "zhichang"
            },
            {
              "title": "医院",
              "value": "yiyuan"
            },
            {
              "title": "大男主",
              "value": "dananzhu"
            },
            {
              "title": "犯罪",
              "value": "fanzui"
            },
            {
              "title": "恐怖",
              "value": "kongbu"
            },
            {
              "title": "脑洞",
              "value": "naodong"
            },
            {
              "title": "复仇",
              "value": "fuchou"
            },
            {
              "title": "民国",
              "value": "minguo"
            },
            {
              "title": "悬疑",
              "value": "xuanyi"
            },
            {
              "title": "宫廷",
              "value": "gongting"
            },
            {
              "title": "搞笑",
              "value": "gaoxiao"
            },
            {
              "title": "街访",
              "value": "jiefang"
            },
            {
              "title": "冒险",
              "value": "maoxian"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_jiakong",
      "title": "分类·架空",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "架空",
          "type": "enumeration",
          "value": "xitong",
          "enumOptions": [
            {
              "title": "系统",
              "value": "xitong"
            },
            {
              "title": "重生",
              "value": "chongsheng"
            },
            {
              "title": "末日",
              "value": "mori"
            },
            {
              "title": "穿越",
              "value": "chuanyue"
            },
            {
              "title": "修仙",
              "value": "xiuxian"
            },
            {
              "title": "仙侠",
              "value": "xianxia"
            },
            {
              "title": "奇幻",
              "value": "qihuan"
            },
            {
              "title": "灵异",
              "value": "lingyi"
            },
            {
              "title": "武侠",
              "value": "wuxia"
            },
            {
              "title": "玄幻",
              "value": "xuanhuan"
            },
            {
              "title": "科幻",
              "value": "kehuan"
            },
            {
              "title": "异界",
              "value": "yijie"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_nanpin",
      "title": "分类·男频",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "男频",
          "type": "enumeration",
          "value": "hougong",
          "enumOptions": [
            {
              "title": "后宫",
              "value": "hougong"
            },
            {
              "title": "逆袭",
              "value": "nixi"
            },
            {
              "title": "赘婿",
              "value": "zhuixu"
            },
            {
              "title": "权谋",
              "value": "quanmou"
            },
            {
              "title": "萌宅",
              "value": "mengzhai"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_nvpin",
      "title": "分类·女频",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "女频",
          "type": "enumeration",
          "value": "bazong",
          "enumOptions": [
            {
              "title": "霸总",
              "value": "bazong"
            },
            {
              "title": "豪门",
              "value": "haomen"
            },
            {
              "title": "甜宠",
              "value": "tianchong"
            },
            {
              "title": "虐恋",
              "value": "nuelian"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_djll",
      "title": "分类·伦理",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "伦理",
          "type": "enumeration",
          "value": "luanlun",
          "enumOptions": [
            {
              "title": "乱伦",
              "value": "luanlun"
            },
            {
              "title": "ntr",
              "value": "ntr"
            },
            {
              "title": "绿帽",
              "value": "lvmao"
            },
            {
              "title": "熟女",
              "value": "shunv"
            },
            {
              "title": "sm",
              "value": "sm"
            },
            {
              "title": "公媳",
              "value": "gongxi"
            },
            {
              "title": "年下",
              "value": "nianxia"
            },
            {
              "title": "叔嫂",
              "value": "shusao"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_gyk",
      "title": "分类·关系",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "关系",
          "type": "enumeration",
          "value": "muzi",
          "enumOptions": [
            {
              "title": "母子",
              "value": "muzi"
            },
            {
              "title": "男同",
              "value": "nantong"
            },
            {
              "title": "同学",
              "value": "tongxue"
            },
            {
              "title": "网红",
              "value": "wanghong"
            },
            {
              "title": "女同",
              "value": "nvtong"
            },
            {
              "title": "父女",
              "value": "funv"
            },
            {
              "title": "姐弟",
              "value": "jiedi"
            },
            {
              "title": "兄妹",
              "value": "xiongmei"
            },
            {
              "title": "直播",
              "value": "zhibo"
            },
            {
              "title": "同事",
              "value": "tongshi"
            },
            {
              "title": "师生",
              "value": "shisheng"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_appearance",
      "title": "分类·外貌",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "外貌",
          "type": "enumeration",
          "value": "juru",
          "enumOptions": [
            {
              "title": "巨乳",
              "value": "juru"
            },
            {
              "title": "人妻",
              "value": "renqi"
            },
            {
              "title": "御姐",
              "value": "yujie"
            },
            {
              "title": "清纯",
              "value": "qingchun"
            },
            {
              "title": "短发",
              "value": "duanfa"
            },
            {
              "title": "高颜值",
              "value": "gaoyanzhi"
            },
            {
              "title": "外国人",
              "value": "waiguoren"
            },
            {
              "title": "娇小",
              "value": "jiaoxiao"
            },
            {
              "title": "甜美",
              "value": "tianmei"
            },
            {
              "title": "苗条",
              "value": "miaotiao"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_play",
      "title": "分类·玩法",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "玩法",
          "type": "enumeration",
          "value": "luoli",
          "enumOptions": [
            {
              "title": "萝莉",
              "value": "luoli"
            },
            {
              "title": "露出",
              "value": "luchu"
            },
            {
              "title": "奴隶",
              "value": "nuli"
            },
            {
              "title": "双飞",
              "value": "shuangfei"
            },
            {
              "title": "3P",
              "value": "3p"
            },
            {
              "title": "内射",
              "value": "neishe"
            },
            {
              "title": "口交",
              "value": "koujiao"
            },
            {
              "title": "制服",
              "value": "zhifu"
            },
            {
              "title": "群交",
              "value": "qunjiao"
            },
            {
              "title": "后入",
              "value": "houru"
            },
            {
              "title": "蒙眼",
              "value": "mengyan"
            },
            {
              "title": "角色扮演",
              "value": "juesebanyan"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "tag_changjing",
      "title": "分类·场景",
      "functionName": "loadTag",
      "cacheDuration": 300,
      "params": [
        {
          "name": "tag",
          "title": "场景",
          "type": "enumeration",
          "value": "sushe",
          "enumOptions": [
            {
              "title": "宿舍",
              "value": "sushe"
            },
            {
              "title": "办公室",
              "value": "bangonshi"
            },
            {
              "title": "KTV",
              "value": "ktv"
            },
            {
              "title": "健身房",
              "value": "jianshenfang"
            },
            {
              "title": "酒吧",
              "value": "jiuba"
            },
            {
              "title": "教室",
              "value": "jiaoshi"
            },
            {
              "title": "野外",
              "value": "yewai"
            },
            {
              "title": "摄影棚",
              "value": "sheyingpeng"
            },
            {
              "title": "洗手间",
              "value": "xishoujian"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      // id 需固定为 loadResource：起播 / 切线路时现取带签名的播放地址
      id: "loadResource",
      title: "加载资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: [],
    },
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", description: "剧名 / 标签" },
      { name: "page", title: "页码", type: "page" },
    ],
  },
};

var HG_ORIGIN = "https://huangguoai.com";
var HG_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var HG_PREFIX = "hg:"; // link 格式：hg:<剧ID> 或 hg:<剧ID>:<集数>

function hgHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
    "User-Agent": HG_UA,
    Referer: HG_ORIGIN + "/",
    Origin: HG_ORIGIN,
  };
}

function hgBody(res, label) {
  var body = res && res.data;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== "object") throw new Error(label + "返回结构已变化");
  if (body.status === 0) throw new Error(body.msg || label + "失败");
  return body.data !== undefined ? body.data : body;
}

function hgQuery(q) {
  var parts = [];
  for (var k in q) {
    if (q[k] === undefined || q[k] === null || q[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(q[k])));
  }
  return parts.length ? "?" + parts.join("&") : "";
}

async function hgGet(path, query, label) {
  var res = await Widget.http.get(HG_ORIGIN + path + hgQuery(query || {}), { headers: hgHeaders() });
  return hgBody(res, label || path);
}

async function hgPost(path, json, label) {
  var h = hgHeaders();
  h["Content-Type"] = "application/json";
  var res = await Widget.http.post(HG_ORIGIN + path, json || {}, { headers: h });
  return hgBody(res, label || path);
}

function hgRows(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.list)) return data.list;
  if (Array.isArray(data.videos)) return data.videos;
  return [];
}

function hgCover(url, params) {
  if (!url) return "";
  var proxy = params && params.coverProxy ? String(params.coverProxy).trim() : "";
  if (!proxy) return ""; // 原图是密文，直接给 App 只会显示裂图，所以不填
  return proxy + encodeURIComponent(String(url));
}

function hgNum(v) {
  var n = Number(v);
  return isFinite(n) ? n : undefined;
}

function hgItem(raw, params) {
  if (!raw || typeof raw !== "object") return null;
  var id = raw.id != null ? String(raw.id) : raw.video_id != null ? String(raw.video_id) : "";
  var title = String(raw.title || "").trim();
  if (!id || !title) return null;
  var eps = hgNum(raw.total_episodes) || hgNum(raw.episode_count);
  var tags = Array.isArray(raw.tags)
    ? raw.tags.map(function (t) { return typeof t === "string" ? t : t && t.name; }).filter(Boolean)
    : [];
  var item = {
    id: HG_PREFIX + id,
    type: "url",
    title: title,
    mediaType: "tv",
    link: HG_PREFIX + id,
    description: String(raw.description || raw.synopsis || ""),
  };
  var cover = hgCover(raw.cover, params);
  if (cover) {
    item.posterPath = cover;
    item.coverUrl = cover;
  }
  if (raw.created_at) item.releaseDate = String(raw.created_at).slice(0, 10);
  if (hgNum(raw.score) != null) item.rating = hgNum(raw.score);
  if (tags.length) item.genreTitle = tags.slice(0, 3).join(" / ");
  var dur = hgNum(raw.duration);
  if (dur) item.duration = dur;
  var bits = [];
  if (eps) bits.push(eps + "集");
  if (raw.is_finished === true) bits.push("完结");
  else if (raw.is_finished === false) bits.push("连载");
  if (bits.length) item.durationText = bits.join(" · ");
  return item;
}

function hgRemember(params) {
  try {
    if (params && typeof params.coverProxy === "string" && Widget.storage && Widget.storage.set) {
      Widget.storage.set("coverProxy", params.coverProxy.trim());
    }
  } catch (e) {}
}

function hgMap(data, params) {
  hgRemember(params);
  var out = [];
  var seen = {};
  var rows = hgRows(data);
  for (var i = 0; i < rows.length; i++) {
    var it = hgItem(rows[i], params);
    if (!it || seen[it.id]) continue;
    seen[it.id] = true;
    out.push(it);
  }
  return out;
}

function hgPage(params) {
  var n = parseInt((params && params.page) || "1", 10);
  return isFinite(n) && n > 0 ? n : 1;
}

async function loadList(params) {
  params = params || {};
  var q = { page: hgPage(params) };
  if (params.cate && params.cate !== "all") q.cate_id = params.cate;
  var data = await hgGet("/api/videos", q, "列表");
  var pg = data && data.pagination;
  if (pg && hgNum(pg.pages) && q.page > hgNum(pg.pages)) return [];
  return hgMap(data, params);
}

async function loadRank(params) {
  params = params || {};
  var rank = ["hot", "recommend", "potential"].indexOf(params.rank) >= 0 ? params.rank : "hot";
  var data = await hgGet("/api/ranks/" + rank, undefined, "榜单");
  return hgMap(data, params);
}

// 题材 / 标签分类：站点没有按标签筛选的 JSON 接口，标签页 /tag/<slug>/page/<n>/ 是服务端渲染的 HTML，这里直接解析卡片
function hgDecode(s) {
  return String(s || "")
    .replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "").trim();
}

function hgParseTagHtml(html, params) {
  html = String(html || "");
  var start = html.indexOf("hg-card-grid is-active");
  if (start < 0) return [];
  var end = html.indexOf("hg-pagination", start);
  var body = end > 0 ? html.slice(start, end) : html.slice(start);
  var chunks = body.split("<div class=\"hg-drama-card\"").slice(1);
  var out = [];
  var seen = {};
  for (var i = 0; i < chunks.length; i++) {
    var c = chunks[i];
    var idm = c.match(/data-track-item-id="(\d+)"/) || c.match(/href="\/video\/(\d+)\//);
    if (!idm || seen[idm[1]]) continue;
    var tm = c.match(/data-track-item-name="([^"]*)"/) || c.match(/class="hg-drama-card__title"><a[^>]*>([\s\S]*?)<\/a>/);
    var title = tm ? hgDecode(tm[1]) : "";
    if (!title) continue;
    seen[idm[1]] = true;
    var cover = (c.match(/data-src="([^"]+)"/) || [])[1];
    var score = (c.match(/hg-drama-card__score">([\d.]+)/) || [])[1];
    var epText = hgDecode((c.match(/hg-drama-card__episode">([^<]*)</) || [])[1]);
    var tags = [];
    var re = /class="hg-tag"[^>]*>([^<]+)</g, m;
    while ((m = re.exec(c)) && tags.length < 3) tags.push(hgDecode(m[1]));
    var item = {
      id: HG_PREFIX + idm[1],
      type: "url",
      title: title,
      mediaType: "tv",
      link: HG_PREFIX + idm[1],
      description: "",
    };
    var cv = hgCover(cover ? hgDecode(cover) : "", params);
    if (cv) { item.posterPath = cv; item.coverUrl = cv; }
    if (score && hgNum(score) != null) item.rating = hgNum(score);
    if (tags.length) item.genreTitle = tags.join(" / ");
    if (epText) item.durationText = epText;
    out.push(item);
  }
  return out;
}

async function loadTag(params) {
  params = params || {};
  hgRemember(params);
  var slug = String(params.tag || "").trim();
  if (!/^[a-z0-9-]+$/i.test(slug)) return [];
  var page = hgPage(params);
  var url = HG_ORIGIN + "/tag/" + slug + "/" + (page > 1 ? "page/" + page + "/" : "");
  var h = hgHeaders();
  h.Accept = "text/html,application/xhtml+xml";
  var res = await Widget.http.get(url, { headers: h });
  var html = res && res.data;
  if (typeof html !== "string") return [];
  if (html.indexOf("页面未找到") >= 0 && html.indexOf("hg-card-grid is-active") < 0) return [];
  return hgParseTagHtml(html, params);
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var page = hgPage(params);
  var data = await hgGet("/api/search", { q: kw, page: page, size: 20 }, "搜索");
  var pg = data && data.pagination;
  if (pg && hgNum(pg.pages) && page > hgNum(pg.pages)) return [];
  return hgMap(data, params);
}

function hgParseLink(link) {
  var s = String(link || "");
  if (s.indexOf(HG_PREFIX) === 0) s = s.slice(HG_PREFIX.length);
  var parts = s.split(":");
  var id = parts[0];
  var ep = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  if (!/^\d+$/.test(id)) return null;
  return { id: id, ep: isFinite(ep) && ep > 0 ? ep : 0 };
}

async function hgPlayback(id, ep) {
  var data = await hgPost(
    "/api/videos/" + encodeURIComponent(id) + "/episodes/" + ep + "/playback",
    {},
    "播放"
  );
  var streams = (data && data.streams) || {};
  var cdn = (data && data.cdn) || {};
  var headers = { "User-Agent": HG_UA, Referer: HG_ORIGIN + "/" };
  if (cdn.authKey && cdn.authValue) headers[String(cdn.authKey)] = String(cdn.authValue);
  var out = [];
  var seen = {};
  var order = [
    ["main", "主线 H.264"],
    ["hevc", "HEVC"],
    ["preview", "预览"],
  ];
  for (var i = 0; i < order.length; i++) {
    var url = streams[order[i][0]];
    if (typeof url !== "string" || !url || seen[url]) continue;
    seen[url] = true;
    out.push({
      name: order[i][1],
      description: "第" + ep + "集 · HLS",
      url: url,
      customHeaders: headers,
      playerType: "app",
    });
  }
  return out;
}

async function loadDetail(link) {
  var ref = hgParseLink(link);
  if (!ref) return null;
  var params = {};
  try {
    // 全局参数在 loadDetail 里拿不到时，退回到模块存储里记下的代理地址
    var saved = Widget.storage && Widget.storage.get ? Widget.storage.get("coverProxy") : "";
    if (saved) params.coverProxy = saved;
  } catch (e) {}

  var data = await hgGet("/api/videos/" + encodeURIComponent(ref.id), undefined, "详情");
  var item = hgItem(Object.assign({ id: ref.id }, data), params);
  if (!item) return null;

  var raw = Array.isArray(data.episodes) ? data.episodes : [];
  var eps = [];
  for (var i = 0; i < raw.length; i++) {
    var no = hgNum(raw[i] && raw[i].ep_num);
    if (!no || no <= 0) continue;
    if (raw[i].status === 0) continue; // 暂不可播
    eps.push({ no: no, title: String(raw[i].title || ""), dur: hgNum(raw[i].duration) });
  }
  if (!eps.length) {
    var count = hgNum(data.episode_count) || 1;
    for (var n = 1; n <= count; n++) eps.push({ no: n, title: "", dur: undefined });
  }
  eps.sort(function (a, b) { return a.no - b.no; });

  item.episodeItems = eps.map(function (e) {
    var t = e.title && e.title.length <= 20 ? e.title : "第" + e.no + "集";
    var ep = {
      id: HG_PREFIX + ref.id + ":" + e.no,
      type: "url",
      title: t,
      mediaType: "tv",
      episode: e.no,
      link: HG_PREFIX + ref.id + ":" + e.no,
    };
    if (e.title && e.title.length > 20) ep.description = e.title;
    if (e.dur) ep.duration = e.dur;
    if (item.posterPath) ep.coverUrl = item.posterPath;
    return ep;
  });

  if (Array.isArray(data.actors) && data.actors.length) {
    item.peoples = data.actors
      .map(function (a, idx) {
        var name = typeof a === "string" ? a : a && a.name;
        return name ? { id: "actor-" + idx, title: String(name), role: "演员" } : null;
      })
      .filter(Boolean);
  }

  // 点开的是某一集（hg:<id>:<n>），或剧本身：都现取一次播放地址作为 videoUrl 兜底
  var playEp = ref.ep || eps[0].no;
  try {
    var res;
    try { res = await hgPlayback(ref.id, playEp); } catch (e1) { res = await hgPlayback(ref.id, playEp); }
    if (res.length) {
      item.videoUrl = res[0].url;
      item.playerType = "app";
    }
  } catch (e) {
    console.log("[黄果] 预取播放地址失败:", e && e.message);
  }
  if (ref.ep) {
    item.id = HG_PREFIX + ref.id + ":" + ref.ep;
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var ref = hgParseLink(params.link || params.id);
  if (!ref) return [];
  var ep = ref.ep || parseInt(params.episode, 10) || 1;
  return hgPlayback(ref.id, ep);
}
