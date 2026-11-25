/**
 * 热门短剧 · Rex / Forward 模块（ForwardWidget 格式）
 * 来源：西瓜短剧 m.xgshort.com（站点公开接口 + 游客登录）
 *  - 频道：短剧、AI短剧；筛选：排序 / 题材 / 年份 / 状态
 *  - 搜索走 Rex 自带搜索页（顶层 search），同时搜 短剧 + AI短剧
 *  - 分集与播放地址需要游客 token，模块自动领取并缓存（7 天）
 *  - 已过滤同性 / 男同题材
 */
WidgetMetadata = {
  "id": "hghub.xgshort",
  "title": "热门短剧",
  "icon": "https://m.xgshort.com/xiguaLogo.png",
  "iconUrl": "https://m.xgshort.com/xiguaLogo.png",
  "logo": "https://m.xgshort.com/xiguaLogo.png",
  "description": "热门短剧（西瓜短剧 m.xgshort.com）：最新更新、短剧 / AI短剧，排序、题材、年份、状态筛选，搜索，分集播放（已过滤男同题材）",
  "author": "nico123-code",
  "site": "https://github.com/nico123-code/hghub-plugins",
  "version": "2026.11.25.2",
  "requiredVersion": "0.0.2",
  "detailCacheDuration": 300,
  "modules": [
    {
      "id": "latest",
      "title": "最新更新",
      "functionName": "loadLatest",
      "cacheDuration": 300,
      "params": [
        {
          "name": "ch",
          "title": "频道",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "短剧",
              "value": "1"
            },
            {
              "title": "AI短剧",
              "value": "71"
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
      "id": "drama",
      "title": "短剧",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "ch",
          "title": "频道",
          "type": "constant",
          "value": "1"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "1",
          "enumOptions": [
            {
              "title": "人气最高",
              "value": "1"
            },
            {
              "title": "最新",
              "value": "0"
            },
            {
              "title": "评分最高",
              "value": "2"
            }
          ]
        },
        {
          "name": "tag",
          "title": "题材",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部类型",
              "value": "0"
            },
            {
              "title": "男频",
              "value": "1"
            },
            {
              "title": "女频",
              "value": "2"
            },
            {
              "title": "逆袭",
              "value": "3"
            },
            {
              "title": "都市",
              "value": "4"
            },
            {
              "title": "穿越",
              "value": "5"
            },
            {
              "title": "战神",
              "value": "6"
            },
            {
              "title": "赘婿",
              "value": "7"
            },
            {
              "title": "霸总",
              "value": "8"
            },
            {
              "title": "甜宠",
              "value": "9"
            },
            {
              "title": "悬疑",
              "value": "10"
            },
            {
              "title": "奇幻",
              "value": "11"
            },
            {
              "title": "复仇",
              "value": "12"
            },
            {
              "title": "家庭",
              "value": "13"
            },
            {
              "title": "搞笑",
              "value": "14"
            },
            {
              "title": "重生",
              "value": "15"
            },
            {
              "title": "乡村",
              "value": "16"
            },
            {
              "title": "热血",
              "value": "17"
            },
            {
              "title": "励志",
              "value": "18"
            },
            {
              "title": "爱情",
              "value": "20"
            },
            {
              "title": "古装",
              "value": "22"
            },
            {
              "title": "宫廷",
              "value": "23"
            },
            {
              "title": "青春",
              "value": "25"
            },
            {
              "title": "武侠",
              "value": "26"
            },
            {
              "title": "玄幻",
              "value": "27"
            },
            {
              "title": "言情",
              "value": "29"
            },
            {
              "title": "科幻",
              "value": "30"
            },
            {
              "title": "商战",
              "value": "33"
            },
            {
              "title": "年代",
              "value": "46"
            },
            {
              "title": "总裁",
              "value": "47"
            },
            {
              "title": "民国",
              "value": "49"
            },
            {
              "title": "古风",
              "value": "50"
            },
            {
              "title": "校园",
              "value": "51"
            },
            {
              "title": "女强",
              "value": "52"
            },
            {
              "title": "谍战",
              "value": "55"
            },
            {
              "title": "反转",
              "value": "56"
            },
            {
              "title": "现代",
              "value": "57"
            },
            {
              "title": "豪门",
              "value": "58"
            },
            {
              "title": "闪婚",
              "value": "59"
            },
            {
              "title": "马甲",
              "value": "60"
            },
            {
              "title": "架空",
              "value": "61"
            },
            {
              "title": "系统",
              "value": "62"
            },
            {
              "title": "萌宝",
              "value": "63"
            },
            {
              "title": "亲情",
              "value": "64"
            },
            {
              "title": "古代",
              "value": "65"
            },
            {
              "title": "职场",
              "value": "66"
            },
            {
              "title": "神豪",
              "value": "67"
            },
            {
              "title": "龙王",
              "value": "68"
            },
            {
              "title": "异能",
              "value": "70"
            },
            {
              "title": "逼婚",
              "value": "73"
            },
            {
              "title": "王妃",
              "value": "74"
            },
            {
              "title": "虐恋",
              "value": "75"
            },
            {
              "title": "追妻",
              "value": "76"
            },
            {
              "title": "神医",
              "value": "77"
            },
            {
              "title": "团宠",
              "value": "78"
            },
            {
              "title": "江湖",
              "value": "80"
            },
            {
              "title": "军旅",
              "value": "82"
            },
            {
              "title": "御姐",
              "value": "88"
            },
            {
              "title": "仙尊",
              "value": "90"
            },
            {
              "title": "替嫁",
              "value": "91"
            },
            {
              "title": "少帅",
              "value": "92"
            },
            {
              "title": "女帝",
              "value": "94"
            },
            {
              "title": "穿书",
              "value": "95"
            },
            {
              "title": "王爷",
              "value": "96"
            },
            {
              "title": "玄学",
              "value": "99"
            },
            {
              "title": "末世",
              "value": "101"
            },
            {
              "title": "大叔",
              "value": "104"
            },
            {
              "title": "病娇",
              "value": "105"
            },
            {
              "title": "萌宠",
              "value": "107"
            },
            {
              "title": "荒岛",
              "value": "108"
            },
            {
              "title": "锦鲤",
              "value": "110"
            },
            {
              "title": "异界",
              "value": "113"
            },
            {
              "title": "婆媳",
              "value": "114"
            },
            {
              "title": "快穿",
              "value": "115"
            },
            {
              "title": "暴富",
              "value": "118"
            },
            {
              "title": "海岛",
              "value": "120"
            },
            {
              "title": "后妈",
              "value": "124"
            },
            {
              "title": "盗墓",
              "value": "126"
            },
            {
              "title": "替身",
              "value": "127"
            },
            {
              "title": "特工",
              "value": "128"
            },
            {
              "title": "主播",
              "value": "140"
            },
            {
              "title": "丧尸",
              "value": "143"
            },
            {
              "title": "修真",
              "value": "147"
            },
            {
              "title": "种田",
              "value": "164"
            },
            {
              "title": "后宫",
              "value": "172"
            },
            {
              "title": "宠妻",
              "value": "174"
            },
            {
              "title": "虐渣",
              "value": "178"
            },
            {
              "title": "修仙",
              "value": "182"
            },
            {
              "title": "美食",
              "value": "188"
            },
            {
              "title": "鉴宝",
              "value": "190"
            },
            {
              "title": "治愈",
              "value": "207"
            },
            {
              "title": "追夫",
              "value": "211"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部年份",
              "value": "0"
            },
            {
              "title": "2025",
              "value": "1"
            },
            {
              "title": "2024",
              "value": "2"
            },
            {
              "title": "2023",
              "value": "3"
            },
            {
              "title": "2022",
              "value": "4"
            },
            {
              "title": "更早年份",
              "value": "12"
            }
          ]
        },
        {
          "name": "status",
          "title": "状态",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部状态",
              "value": "0"
            },
            {
              "title": "已完结",
              "value": "1"
            },
            {
              "title": "连载中",
              "value": "2"
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
      "id": "aidrama",
      "title": "AI短剧",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "ch",
          "title": "频道",
          "type": "constant",
          "value": "71"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "1",
          "enumOptions": [
            {
              "title": "人气最高",
              "value": "1"
            },
            {
              "title": "最新",
              "value": "0"
            },
            {
              "title": "评分最高",
              "value": "2"
            }
          ]
        },
        {
          "name": "tag",
          "title": "题材",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部类型",
              "value": "0"
            },
            {
              "title": "男频",
              "value": "1"
            },
            {
              "title": "女频",
              "value": "2"
            },
            {
              "title": "逆袭",
              "value": "3"
            },
            {
              "title": "都市",
              "value": "4"
            },
            {
              "title": "穿越",
              "value": "5"
            },
            {
              "title": "战神",
              "value": "6"
            },
            {
              "title": "赘婿",
              "value": "7"
            },
            {
              "title": "霸总",
              "value": "8"
            },
            {
              "title": "甜宠",
              "value": "9"
            },
            {
              "title": "悬疑",
              "value": "10"
            },
            {
              "title": "奇幻",
              "value": "11"
            },
            {
              "title": "复仇",
              "value": "12"
            },
            {
              "title": "家庭",
              "value": "13"
            },
            {
              "title": "搞笑",
              "value": "14"
            },
            {
              "title": "重生",
              "value": "15"
            },
            {
              "title": "乡村",
              "value": "16"
            },
            {
              "title": "热血",
              "value": "17"
            },
            {
              "title": "励志",
              "value": "18"
            },
            {
              "title": "爱情",
              "value": "20"
            },
            {
              "title": "古装",
              "value": "22"
            },
            {
              "title": "宫廷",
              "value": "23"
            },
            {
              "title": "青春",
              "value": "25"
            },
            {
              "title": "武侠",
              "value": "26"
            },
            {
              "title": "玄幻",
              "value": "27"
            },
            {
              "title": "言情",
              "value": "29"
            },
            {
              "title": "科幻",
              "value": "30"
            },
            {
              "title": "商战",
              "value": "33"
            },
            {
              "title": "年代",
              "value": "46"
            },
            {
              "title": "总裁",
              "value": "47"
            },
            {
              "title": "民国",
              "value": "49"
            },
            {
              "title": "古风",
              "value": "50"
            },
            {
              "title": "校园",
              "value": "51"
            },
            {
              "title": "女强",
              "value": "52"
            },
            {
              "title": "谍战",
              "value": "55"
            },
            {
              "title": "反转",
              "value": "56"
            },
            {
              "title": "现代",
              "value": "57"
            },
            {
              "title": "豪门",
              "value": "58"
            },
            {
              "title": "闪婚",
              "value": "59"
            },
            {
              "title": "马甲",
              "value": "60"
            },
            {
              "title": "架空",
              "value": "61"
            },
            {
              "title": "系统",
              "value": "62"
            },
            {
              "title": "萌宝",
              "value": "63"
            },
            {
              "title": "亲情",
              "value": "64"
            },
            {
              "title": "古代",
              "value": "65"
            },
            {
              "title": "职场",
              "value": "66"
            },
            {
              "title": "神豪",
              "value": "67"
            },
            {
              "title": "龙王",
              "value": "68"
            },
            {
              "title": "异能",
              "value": "70"
            },
            {
              "title": "逼婚",
              "value": "73"
            },
            {
              "title": "王妃",
              "value": "74"
            },
            {
              "title": "虐恋",
              "value": "75"
            },
            {
              "title": "追妻",
              "value": "76"
            },
            {
              "title": "神医",
              "value": "77"
            },
            {
              "title": "团宠",
              "value": "78"
            },
            {
              "title": "江湖",
              "value": "80"
            },
            {
              "title": "军旅",
              "value": "82"
            },
            {
              "title": "御姐",
              "value": "88"
            },
            {
              "title": "仙尊",
              "value": "90"
            },
            {
              "title": "替嫁",
              "value": "91"
            },
            {
              "title": "少帅",
              "value": "92"
            },
            {
              "title": "女帝",
              "value": "94"
            },
            {
              "title": "穿书",
              "value": "95"
            },
            {
              "title": "王爷",
              "value": "96"
            },
            {
              "title": "玄学",
              "value": "99"
            },
            {
              "title": "末世",
              "value": "101"
            },
            {
              "title": "大叔",
              "value": "104"
            },
            {
              "title": "病娇",
              "value": "105"
            },
            {
              "title": "萌宠",
              "value": "107"
            },
            {
              "title": "荒岛",
              "value": "108"
            },
            {
              "title": "锦鲤",
              "value": "110"
            },
            {
              "title": "异界",
              "value": "113"
            },
            {
              "title": "婆媳",
              "value": "114"
            },
            {
              "title": "快穿",
              "value": "115"
            },
            {
              "title": "暴富",
              "value": "118"
            },
            {
              "title": "海岛",
              "value": "120"
            },
            {
              "title": "后妈",
              "value": "124"
            },
            {
              "title": "盗墓",
              "value": "126"
            },
            {
              "title": "替身",
              "value": "127"
            },
            {
              "title": "特工",
              "value": "128"
            },
            {
              "title": "主播",
              "value": "140"
            },
            {
              "title": "丧尸",
              "value": "143"
            },
            {
              "title": "修真",
              "value": "147"
            },
            {
              "title": "种田",
              "value": "164"
            },
            {
              "title": "后宫",
              "value": "172"
            },
            {
              "title": "宠妻",
              "value": "174"
            },
            {
              "title": "虐渣",
              "value": "178"
            },
            {
              "title": "修仙",
              "value": "182"
            },
            {
              "title": "美食",
              "value": "188"
            },
            {
              "title": "鉴宝",
              "value": "190"
            },
            {
              "title": "治愈",
              "value": "207"
            },
            {
              "title": "追夫",
              "value": "211"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部年份",
              "value": "0"
            },
            {
              "title": "2025",
              "value": "1"
            },
            {
              "title": "2024",
              "value": "2"
            },
            {
              "title": "2023",
              "value": "3"
            },
            {
              "title": "2022",
              "value": "4"
            },
            {
              "title": "更早年份",
              "value": "12"
            }
          ]
        },
        {
          "name": "status",
          "title": "状态",
          "type": "enumeration",
          "value": "0",
          "enumOptions": [
            {
              "title": "全部状态",
              "value": "0"
            },
            {
              "title": "已完结",
              "value": "1"
            },
            {
              "title": "连载中",
              "value": "2"
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
      "id": "loadResource",
      "title": "加载资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ],
  "search": {
    "title": "搜索",
    "functionName": "search",
    "params": [
      {
        "name": "keyword",
        "title": "关键词",
        "type": "input"
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page"
      }
    ]
  }
};

// ---------------------------------------------------------------------------
// 西瓜短剧 m.xgshort.com 接口
//  列表 GET /api/list/getfiltersdata?channeid=&ids=排序,题材,地区,语言,年份,状态,0&page=&size=20
//  搜索 GET /api/list/fuzzysearch?keyword=&page=&size=20&categoryId=1|71
//  分集 GET /api/video/episodes?seriesShortId=&size=500   （需游客登录 token）
//  播放 POST /api/video/episode-url/query {type:"episode",accessKey:episodeAccessKey}（需 token）
//  游客登录 POST /api/auth/guest-login {guestToken}，token 7 天有效，存在模块存储里复用
// ---------------------------------------------------------------------------
var XG_ORIGIN = "https://m.xgshort.com";
var XG_PREFIX = "xg:";
var XG_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var XG_TOKEN_KEY = "xg_token";
var XG_GUEST_KEY = "xg_guest";
var XG_FAST = "https://hghub-xgv.hghub-zhang.workers.dev/?url=";
// 男同 / 同性题材过滤（站点题材「同性」= 40，已从筛选里去掉；标题再按关键词兜底）
var XG_BLOCK_RE = /男同|同性|gay|耽美|男男|基佬|\bBL\b/i;

function xgHeaders(auth) {
  var h = {
    "User-Agent": XG_UA,
    Accept: "application/json, text/plain, */*",
    Origin: XG_ORIGIN,
    Referer: XG_ORIGIN + "/",
  };
  if (auth) h.Authorization = auth;
  return h;
}

function xgQuery(q) {
  var parts = [];
  for (var k in q) {
    if (q[k] === undefined || q[k] === null || q[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(q[k])));
  }
  return parts.length ? "?" + parts.join("&") : "";
}

function xgJson(res) {
  var d = res && res.data;
  if (typeof d === "string") {
    try { d = JSON.parse(d); } catch (e) { d = null; }
  }
  return d;
}

function xgStore(k, v) {
  try {
    if (!Widget.storage) return undefined;
    if (v === undefined) return Widget.storage.get(k);
    Widget.storage.set(k, v);
  } catch (e) {}
  return undefined;
}

async function xgLogin() {
  var guest = xgStore(XG_GUEST_KEY) || "";
  var res = await Widget.http.post(XG_ORIGIN + "/api/auth/guest-login", guest ? { guestToken: guest } : {}, {
    headers: Object.assign(xgHeaders(), { "Content-Type": "application/json" }),
  });
  var d = xgJson(res);
  if (!d || !d.access_token) {
    // 游客登录偶尔返回 500（短时间内新建游客过多），稍等再试一次
    await new Promise(function (r) { setTimeout(r, 1500); });
    guest = xgStore(XG_GUEST_KEY) || guest;
    res = await Widget.http.post(XG_ORIGIN + "/api/auth/guest-login", guest ? { guestToken: guest } : {}, {
      headers: Object.assign(xgHeaders(), { "Content-Type": "application/json" }),
    });
    d = xgJson(res);
  }
  if ((!d || !d.access_token) && guest) {
    // 旧的游客标识失效时，用空标识重新领一个
    res = await Widget.http.post(XG_ORIGIN + "/api/auth/guest-login", {}, {
      headers: Object.assign(xgHeaders(), { "Content-Type": "application/json" }),
    });
    d = xgJson(res);
  }
  if (!d || !d.access_token) throw new Error("西瓜短剧游客登录失败" + (d && d.message ? "：" + d.message : ""));
  var tok = (d.token_type || "Bearer") + " " + d.access_token;
  var exp = Date.now() + Math.max(60, (Number(d.expires_in) || 3600) - 600) * 1000;
  xgStore(XG_TOKEN_KEY, JSON.stringify({ t: tok, e: exp }));
  if (d.guestToken) xgStore(XG_GUEST_KEY, String(d.guestToken));
  return tok;
}

async function xgToken(force) {
  if (!force) {
    try {
      var c = JSON.parse(xgStore(XG_TOKEN_KEY) || "null");
      if (c && c.t && c.e > Date.now()) return c.t;
    } catch (e) {}
  }
  return xgLogin();
}

async function xgGet(path, query, needAuth) {
  var url = XG_ORIGIN + path + xgQuery(query || {});
  var tok = needAuth ? await xgToken(false) : "";
  var res = await Widget.http.get(url, { headers: xgHeaders(tok) });
  var d = xgJson(res);
  if (needAuth && (res.statusCode === 401 || (d && d.statusCode === 401))) {
    tok = await xgToken(true);
    res = await Widget.http.get(url, { headers: xgHeaders(tok) });
    d = xgJson(res);
  }
  if (!d) throw new Error("西瓜短剧接口无响应：" + path);
  if (d.statusCode && d.statusCode >= 400) throw new Error("西瓜短剧：" + (d.message || d.statusCode));
  return d;
}

async function xgPost(path, body) {
  var tok = await xgToken(false);
  var h = Object.assign(xgHeaders(tok), { "Content-Type": "application/json" });
  var res = await Widget.http.post(XG_ORIGIN + path, body || {}, { headers: h });
  var d = xgJson(res);
  if (res.statusCode === 401 || (d && d.statusCode === 401)) {
    tok = await xgToken(true);
    h.Authorization = tok;
    res = await Widget.http.post(XG_ORIGIN + path, body || {}, { headers: h });
    d = xgJson(res);
  }
  if (!d) throw new Error("西瓜短剧接口无响应：" + path);
  if (d.statusCode && d.statusCode >= 400) throw new Error("西瓜短剧：" + (d.message || d.statusCode));
  return d;
}

function xgPage(params) {
  var p = parseInt(params && params.page, 10);
  return isFinite(p) && p > 0 ? p : 1;
}

function xgBlocked(raw) {
  var s = String((raw && raw.title) || "") + " " + String((raw && raw.description) || "").slice(0, 80);
  var tags = raw && Array.isArray(raw.tags) ? raw.tags.join(" ") : "";
  return XG_BLOCK_RE.test(String((raw && raw.title) || "")) || XG_BLOCK_RE.test(tags) || /男同|耽美/.test(s);
}

function xgItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  var sid = String(raw.shortId || raw.url || "");
  var title = String(raw.title || "").trim();
  if (!sid || !title || xgBlocked(raw)) return null;
  var item = {
    id: XG_PREFIX + sid,
    type: "url",
    title: title,
    mediaType: "tv",
    link: XG_PREFIX + sid,
    description: String(raw.description || ""),
  };
  if (raw.coverUrl) {
    item.posterPath = String(raw.coverUrl);
    item.coverUrl = String(raw.coverUrl);
  }
  var sc = parseFloat(raw.score);
  if (isFinite(sc) && sc > 0) item.rating = sc;
  if (raw.createdAt) item.releaseDate = String(raw.createdAt).slice(0, 10);
  var bits = [];
  if (raw.type) bits.push(String(raw.type));
  if (raw.upStatus) bits.push(String(raw.upStatus).trim());
  if (bits.length) item.durationText = bits.join(" · ");
  if (raw.author) item.genreTitle = String(raw.author).split(",").slice(0, 3).join(" / ");
  return item;
}

function xgMap(list) {
  var out = [];
  var seen = {};
  for (var i = 0; i < (list || []).length; i++) {
    var it = xgItem(list[i]);
    if (!it || seen[it.id]) continue;
    seen[it.id] = true;
    out.push(it);
  }
  return out;
}

async function loadList(params) {
  params = params || {};
  var ch = String(params.ch || "1");
  var ids = [params.sort || "1", params.tag || "0", "0", "0", params.year || "0", params.status || "0", "0"];
  if (ids[1] === "40") return []; // 同性
  var d = await xgGet("/api/list/getfiltersdata", { channeid: ch, ids: ids.join(","), page: xgPage(params), size: 20 }, false);
  return xgMap(d && d.data && d.data.list);
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var page = xgPage(params);
  var cats = ["1", "71"];
  var all = [];
  for (var i = 0; i < cats.length; i++) {
    try {
      var d = await xgGet("/api/list/fuzzysearch", { keyword: kw, page: page, size: 20, categoryId: cats[i] }, false);
      var l = (d && d.data && d.data.list) || [];
      // 完全同名的排前面（与站点一致）
      var same = l.filter(function (x) { return x.title === kw; });
      var rest = l.filter(function (x) { return x.title !== kw; });
      all = all.concat(same, rest);
    } catch (e) {
      console.log("[热门短剧] 搜索失败:", cats[i], e && e.message);
    }
  }
  return xgMap(all);
}

function xgParseLink(link) {
  var s = String(link || "");
  if (s.indexOf(XG_PREFIX) === 0) s = s.slice(XG_PREFIX.length);
  var p = s.split(":");
  if (!p[0] || !/^[A-Za-z0-9_-]+$/.test(p[0])) return null;
  return { sid: p[0], ep: parseInt(p[1], 10) || 0, key: p[2] || "" };
}

var XG_QORDER = { "4K": 10, "2K": 9, "1080P": 8, "720P": 7, "540P": 6, "480P": 5, "360P": 4 };

async function xgPlayback(key, epNo) {
  var d = await xgPost("/api/video/episode-url/query", { type: "episode", accessKey: key });
  var urls = (d && d.data && d.data.urls) || [];
  urls = urls
    .filter(function (u) { return u && (u.cdnUrl || u.ossUrl); })
    .sort(function (a, b) {
      return (XG_QORDER[String(b.quality || "").toUpperCase()] || 0) - (XG_QORDER[String(a.quality || "").toUpperCase()] || 0);
    });
  // 源站 mp4 的 moov 索引在文件末尾，Rex 里会一直转圈；
  // 优先走 hghub-xgv Worker（把 moov 挪到开头，视频数据按 Range 原样转发），原始地址作备用
  var out = [];
  urls.forEach(function (u) {
    var q = String(u.quality || "").toUpperCase() || "默认";
    var raw = String(u.cdnUrl || u.ossUrl);
    out.push({ name: q + " 秒开", description: "第" + epNo + "集 · " + q + " · 加速", url: XG_FAST + encodeURIComponent(raw), playerType: "app" });
    out.push({ name: q + " 原始", description: "第" + epNo + "集 · " + q + " · 源站直连", url: raw, playerType: "app" });
  });
  return out;
}

async function xgEpisodes(sid) {
  var d = await xgGet("/api/video/episodes", { seriesShortId: sid, size: 500 }, true);
  return (d && d.data) || {};
}

async function loadDetail(link) {
  var ref = xgParseLink(link);
  if (!ref) return null;
  var data = await xgEpisodes(ref.sid);
  var info = data.seriesInfo || {};
  var raw = Object.assign({}, info, { shortId: ref.sid, upStatus: info.updateStatus, author: info.starring || info.actor });
  var item = xgItem(raw);
  if (!item) return null;
  if (Array.isArray(info.tags) && info.tags.length) item.genreTitle = info.tags.slice(0, 3).join(" / ");
  var list = (data.list || []).filter(function (e) { return e && e.episodeAccessKey && (!e.status || e.status === "published"); });
  list.sort(function (a, b) { return (a.episodeNumber || 0) - (b.episodeNumber || 0); });
  item.episodeItems = list.map(function (e) {
    var no = e.episodeNumber || 0;
    var id = XG_PREFIX + ref.sid + ":" + no + ":" + e.episodeAccessKey;
    var ep = { id: id, type: "url", title: "第" + no + "集", mediaType: "tv", episode: no, link: id };
    if (e.duration) ep.duration = e.duration;
    if (item.posterPath) ep.coverUrl = item.posterPath;
    return ep;
  });
  if (item.episodeItems.length) item.durationText = (item.durationText ? item.durationText + " · " : "") + item.episodeItems.length + "集";
  var actors = String(info.starring || info.actor || "").split(",").filter(Boolean);
  if (actors.length) {
    item.peoples = actors.slice(0, 12).map(function (n, i) { return { id: "actor-" + i, title: n.trim(), role: "演员" }; });
  }
  // 点开的是某一集或剧本身：现取一次播放地址作为 videoUrl 兜底
  var target = null;
  for (var i = 0; i < list.length; i++) {
    if ((ref.ep && list[i].episodeNumber === ref.ep) || (!ref.ep && i === 0)) { target = list[i]; break; }
  }
  if (target) {
    try {
      var res = await xgPlayback(target.episodeAccessKey, target.episodeNumber);
      if (res.length) {
        item.videoUrl = res[0].url;
        item.playerType = "app";
      }
    } catch (e) {
      console.log("[热门短剧] 预取播放地址失败:", e && e.message);
    }
  }
  if (ref.ep) {
    item.id = XG_PREFIX + ref.sid + ":" + ref.ep + (ref.key ? ":" + ref.key : "");
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var ref = xgParseLink(params.link || params.id);
  if (!ref) return [];
  var key = ref.key;
  var no = ref.ep || parseInt(params.episode, 10) || 1;
  if (!key) {
    var data = await xgEpisodes(ref.sid);
    var list = data.list || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].episodeNumber === no) { key = list[i].episodeAccessKey; break; }
    }
    if (!key && list.length) { key = list[0].episodeAccessKey; no = list[0].episodeNumber || 1; }
  }
  if (!key) return [];
  return xgPlayback(key, no);
}

// 最新更新：按入库时间倒序（站点排序 0 = 最新）；「全部」把短剧和 AI短剧同页合并后按时间排
async function loadLatest(params) {
  params = params || {};
  var ch = String(params.ch || "all");
  var chs = ch === "all" ? ["1", "71"] : [ch];
  var page = xgPage(params);
  var all = [];
  for (var i = 0; i < chs.length; i++) {
    try {
      var d = await xgGet("/api/list/getfiltersdata", { channeid: chs[i], ids: "0,0,0,0,0,0,0", page: page, size: 20 }, false);
      all = all.concat((d && d.data && d.data.list) || []);
    } catch (e) {
      console.log("[热门短剧] 最新更新失败:", chs[i], e && e.message);
    }
  }
  all.sort(function (a, b) { return String(b.createdAt || "").localeCompare(String(a.createdAt || "")); });
  return xgMap(all);
}
