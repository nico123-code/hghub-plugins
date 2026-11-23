/**
 * girigiri爱动漫（ギリギリ爱 · GiriGiri）· Rex / Forward 模块（ForwardWidget 格式）
 * 站点：https://ani.girigirilove.com （前端是 SPA，数据走 MacCMS 接口 https://m3u8.girigirilove.com/api.php）
 *
 * 说明：
 *  - 列表 / 筛选 / 搜索：/Vod/get_list（type_id 分类，orderby 排序，vod_year / vod_area(季度) / vod_class / vod_version / vod_state 筛选，vod_name 搜索）。
 *  - 新番时间表：/App2/weekList（1=周一 … 7=周日）。
 *  - 详情 / 选集 / 播放：/Vod/get_detail，播放地址是站点自建的 m3u8 或 mp4 直链（不加密）。
 *    一部番可能有简中(chs) / 繁中(cht) / 杜比(DB) 几条线路，选集按集数最多的线路列出，
 *    播放时把同一集在各条线路上的地址都列出来，可在播放器里切换。
 */
WidgetMetadata = {
  "id": "hghub.girigiri",
  "title": "girigiri爱动漫",
  "description": "girigiri爱动漫（ギリギリ爱）：新番时间表、日番（年份/季度/类型/版本筛选）、美番、剧场版、真人番剧、BD副音轨，简中/繁中多线路",
  "author": "nico123-code",
  "site": "https://github.com/nico123-code/hghub-plugins",
  "version": "2026.11.23.1",
  "requiredVersion": "0.0.2",
  "detailCacheDuration": 300,
  "modules": [
    {
      "id": "week",
      "title": "新番时间表",
      "functionName": "loadWeek",
      "cacheDuration": 300,
      "params": [
        {
          "name": "week",
          "title": "星期",
          "type": "enumeration",
          "value": "today",
          "enumOptions": [
            {
              "title": "今天",
              "value": "today"
            },
            {
              "title": "周一",
              "value": "1"
            },
            {
              "title": "周二",
              "value": "2"
            },
            {
              "title": "周三",
              "value": "3"
            },
            {
              "title": "周四",
              "value": "4"
            },
            {
              "title": "周五",
              "value": "5"
            },
            {
              "title": "周六",
              "value": "6"
            },
            {
              "title": "周日",
              "value": "7"
            }
          ]
        }
      ]
    },
    {
      "id": "jp",
      "title": "日番",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "2"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "2026",
              "value": "2026"
            },
            {
              "title": "2025",
              "value": "2025"
            },
            {
              "title": "2024",
              "value": "2024"
            },
            {
              "title": "2023",
              "value": "2023"
            },
            {
              "title": "2022",
              "value": "2022"
            },
            {
              "title": "2021",
              "value": "2021"
            },
            {
              "title": "2020",
              "value": "2020"
            },
            {
              "title": "2019",
              "value": "2019"
            },
            {
              "title": "2018",
              "value": "2018"
            },
            {
              "title": "2017",
              "value": "2017"
            },
            {
              "title": "2016",
              "value": "2016"
            },
            {
              "title": "2015",
              "value": "2015"
            },
            {
              "title": "2014",
              "value": "2014"
            },
            {
              "title": "2013",
              "value": "2013"
            },
            {
              "title": "2012",
              "value": "2012"
            },
            {
              "title": "2011",
              "value": "2011"
            },
            {
              "title": "2010",
              "value": "2010"
            },
            {
              "title": "2009",
              "value": "2009"
            },
            {
              "title": "2008",
              "value": "2008"
            },
            {
              "title": "2007",
              "value": "2007"
            },
            {
              "title": "2006",
              "value": "2006"
            },
            {
              "title": "2005",
              "value": "2005"
            },
            {
              "title": "2004",
              "value": "2004"
            },
            {
              "title": "2003",
              "value": "2003"
            },
            {
              "title": "2002",
              "value": "2002"
            },
            {
              "title": "2001",
              "value": "2001"
            },
            {
              "title": "2000至90年代",
              "value": "2000至90年代"
            },
            {
              "title": "1989",
              "value": "1989"
            },
            {
              "title": "1988",
              "value": "1988"
            },
            {
              "title": "1986",
              "value": "1986"
            },
            {
              "title": "1985",
              "value": "1985"
            },
            {
              "title": "1984",
              "value": "1984"
            }
          ]
        },
        {
          "name": "area",
          "title": "季度",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "一月",
              "value": "一月"
            },
            {
              "title": "四月",
              "value": "四月"
            },
            {
              "title": "七月",
              "value": "七月"
            },
            {
              "title": "十月",
              "value": "十月"
            }
          ]
        },
        {
          "name": "cls",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "喜剧",
              "value": "喜剧"
            },
            {
              "title": "爱情",
              "value": "爱情"
            },
            {
              "title": "恐怖",
              "value": "恐怖"
            },
            {
              "title": "动作",
              "value": "动作"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "剧情",
              "value": "剧情"
            },
            {
              "title": "战争",
              "value": "战争"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "冒险",
              "value": "冒险"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "校园",
              "value": "校园"
            },
            {
              "title": "后宫",
              "value": "后宫"
            },
            {
              "title": "热血",
              "value": "热血"
            },
            {
              "title": "运动",
              "value": "运动"
            },
            {
              "title": "职场",
              "value": "职场"
            },
            {
              "title": "百合",
              "value": "百合"
            },
            {
              "title": "乙女",
              "value": "乙女"
            },
            {
              "title": "机甲",
              "value": "机甲"
            },
            {
              "title": "日常",
              "value": "日常"
            },
            {
              "title": "魔法少女",
              "value": "魔法少女"
            },
            {
              "title": "异世界",
              "value": "异世界"
            },
            {
              "title": "爱抖露",
              "value": "爱抖露"
            },
            {
              "title": "音乐",
              "value": "音乐"
            },
            {
              "title": "萌",
              "value": "萌"
            }
          ]
        },
        {
          "name": "version",
          "title": "版本",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "TV番",
              "value": "TV番"
            },
            {
              "title": "泡面番",
              "value": "泡面番"
            },
            {
              "title": "OVA",
              "value": "OVA"
            }
          ]
        },
        {
          "name": "state",
          "title": "来源",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "漫画改",
              "value": "漫画改"
            },
            {
              "title": "小说改",
              "value": "小说改"
            },
            {
              "title": "游戏改",
              "value": "游戏改"
            },
            {
              "title": "原创",
              "value": "原创"
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
      "id": "us",
      "title": "美番",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "3"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
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
      "id": "movie",
      "title": "剧场版",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "21"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "2026",
              "value": "2026"
            },
            {
              "title": "2025",
              "value": "2025"
            },
            {
              "title": "2024",
              "value": "2024"
            },
            {
              "title": "2023",
              "value": "2023"
            },
            {
              "title": "2022",
              "value": "2022"
            },
            {
              "title": "2021",
              "value": "2021"
            },
            {
              "title": "2020",
              "value": "2020"
            },
            {
              "title": "2019",
              "value": "2019"
            },
            {
              "title": "2018",
              "value": "2018"
            },
            {
              "title": "2017",
              "value": "2017"
            },
            {
              "title": "2016",
              "value": "2016"
            },
            {
              "title": "2015",
              "value": "2015"
            },
            {
              "title": "2014",
              "value": "2014"
            },
            {
              "title": "2013",
              "value": "2013"
            },
            {
              "title": "2012",
              "value": "2012"
            },
            {
              "title": "2011",
              "value": "2011"
            },
            {
              "title": "2010",
              "value": "2010"
            },
            {
              "title": "2009",
              "value": "2009"
            },
            {
              "title": "2008",
              "value": "2008"
            },
            {
              "title": "2007",
              "value": "2007"
            },
            {
              "title": "2006",
              "value": "2006"
            },
            {
              "title": "2005",
              "value": "2005"
            },
            {
              "title": "2004",
              "value": "2004"
            },
            {
              "title": "2003",
              "value": "2003"
            },
            {
              "title": "2002",
              "value": "2002"
            },
            {
              "title": "2001",
              "value": "2001"
            },
            {
              "title": "2000至90年代",
              "value": "2000至90年代"
            },
            {
              "title": "1989",
              "value": "1989"
            },
            {
              "title": "1988",
              "value": "1988"
            },
            {
              "title": "1986",
              "value": "1986"
            },
            {
              "title": "1985",
              "value": "1985"
            },
            {
              "title": "1984",
              "value": "1984"
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
      "id": "live",
      "title": "真人番剧",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "20"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
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
      "id": "bd",
      "title": "BD副音轨",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "24"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
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
      "id": "other",
      "title": "演唱会·其他",
      "functionName": "loadList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "typeId",
          "title": "分类",
          "type": "constant",
          "value": "26"
        },
        {
          "name": "orderby",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "本周热门",
              "value": "hits_week"
            },
            {
              "title": "今日热门",
              "value": "hits_day"
            },
            {
              "title": "评分最高",
              "value": "score"
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
        "title": "番剧名",
        "type": "input",
        "value": ""
      },
      {
        "name": "page",
        "title": "页码",
        "type": "page"
      }
    ]
  }
};

var GG_API = "https://m3u8.girigirilove.com/api.php";
var GG_SITE = "https://ani.girigirilove.com";
var GG_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var GG_PAGE_SIZE = 24;
var GG_TYPES = { 2: "日番", 3: "美番", 20: "真人番剧", 21: "剧场版", 24: "BD副音轨", 26: "演唱会&其他" };
var GG_LINE_NAMES = { chs: "简中", cht: "繁中", DB: "杜比", at: "特别版" };

// link 格式：gg:<vod_id>:<集序号,0=整部>
function ggMakeLink(id, ep) {
  return "gg:" + id + ":" + (ep || 0);
}
function ggParseLink(link) {
  var m = String(link || "").match(/^gg:(\d+):(\d+)$/);
  if (!m) return null;
  return { id: m[1], ep: parseInt(m[2], 10) || 0 };
}

function ggQuery(q) {
  var parts = [];
  for (var k in q) {
    if (q[k] === undefined || q[k] === null || q[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(q[k])));
  }
  return parts.length ? "?" + parts.join("&") : "";
}

async function ggJson(path, query) {
  var res = await Widget.http.get(GG_API + path + ggQuery(query || {}), {
    headers: { Accept: "application/json", "User-Agent": GG_UA, Origin: GG_SITE, Referer: GG_SITE + "/" },
  });
  var body = res && res.data;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== "object") throw new Error(path + " 返回结构已变化");
  if (Number(body.code) !== 1) throw new Error(path + " 失败：" + (body.msg || body.code));
  return body.info;
}

function ggDecode(s) {
  return String(s == null ? "" : s)
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/<[^>]+>/g, "").trim();
}

function ggImg(u) {
  if (!u || typeof u !== "string") return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return GG_SITE + u;
  return u;
}

function ggPage(params) {
  var n = parseInt((params && params.page) || "1", 10);
  return isFinite(n) && n > 0 ? n : 1;
}

function ggNum(v) {
  var n = parseFloat(v);
  return isFinite(n) && n > 0 ? n : undefined;
}

function ggItem(r) {
  if (!r || !r.vod_id || !r.vod_name) return null;
  var link = ggMakeLink(r.vod_id, 0);
  var it = { id: link, type: "url", title: ggDecode(r.vod_name), mediaType: Number(r.type_id) === 21 ? "movie" : "tv", link: link };
  var cover = ggImg(r.vod_pic);
  if (cover) {
    it.posterPath = cover;
    it.coverUrl = cover;
  }
  if (r.vod_blurb) it.description = ggDecode(r.vod_blurb);
  if (r.vod_year) it.releaseDate = String(r.vod_year);
  if (ggNum(r.vod_score) != null) it.rating = ggNum(r.vod_score);
  var remarks = r.vod_remarks || r.vod_time;
  if (remarks && typeof remarks === "string") it.durationText = ggDecode(remarks);
  var g = [];
  if (r.vod_area) g.push(String(r.vod_area));
  if (r.vod_class) g.push(String(r.vod_class).split(",")[0]);
  if (g.length) it.genreTitle = g.join(" / ");
  return it;
}

function ggDedup(list) {
  var seen = {};
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (!list[i] || seen[list[i].id]) continue;
    seen[list[i].id] = true;
    out.push(list[i]);
  }
  return out;
}

async function ggList(q, page) {
  q.offset = (page - 1) * GG_PAGE_SIZE;
  q.limit = GG_PAGE_SIZE;
  var info = await ggJson("/Vod/get_list", q);
  var rows = (info && info.rows) || [];
  if (info && Number(info.total) >= 0 && q.offset >= Number(info.total)) return [];
  return ggDedup(rows.map(ggItem));
}

async function loadList(params) {
  params = params || {};
  var q = {
    type_id: params.typeId || "2",
    orderby: params.orderby || "",
    vod_year: params.year || "",
    vod_area: params.area || "",
    vod_class: params.cls || "",
    vod_version: params.version || "",
    vod_state: params.state || "",
  };
  return ggList(q, ggPage(params));
}

async function loadWeek(params) {
  params = params || {};
  var w = String(params.week || "today");
  if (w === "today") {
    // 按北京时间算今天是周几（1=周一 … 7=周日）
    var d = new Date(Date.now() + 8 * 3600 * 1000).getUTCDay();
    w = d === 0 ? "7" : String(d);
  }
  var info = await ggJson("/App2/weekList", {});
  var out = [];
  (Array.isArray(info) ? info : []).forEach(function (day) {
    if (String(day.week) !== w) return;
    (day.video || []).forEach(function (v) { out.push(ggItem(v)); });
  });
  return ggDedup(out);
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  return ggList({ vod_name: kw }, ggPage(params));
}

// 解析播放线路：返回 [{ from, name, episodes:[{name,url}] }]
function ggLines(v) {
  var froms = String(v.vod_play_from || "").split("$$$");
  var urls = String(v.vod_play_url || "").split("$$$");
  var out = [];
  for (var i = 0; i < froms.length; i++) {
    var f = froms[i];
    if (!f) continue;
    var eps = [];
    String(urls[i] || "").split("#").forEach(function (seg, j) {
      if (!seg) return;
      var k = seg.indexOf("$");
      var name = k >= 0 ? seg.slice(0, k) : String(j + 1);
      var url = k >= 0 ? seg.slice(k + 1) : seg;
      if (!/^https?:\/\//i.test(url)) return;
      eps.push({ name: ggDecode(name) || String(j + 1), url: url.trim() });
    });
    if (eps.length) out.push({ from: f, name: GG_LINE_NAMES[f] || f, episodes: eps });
  }
  return out;
}

function ggPrimary(lines) {
  var best = null;
  for (var i = 0; i < lines.length; i++) {
    if (!best || lines[i].episodes.length > best.episodes.length) best = lines[i];
  }
  return best;
}

function ggEpTitle(name, idx, isMovie) {
  if (isMovie) return name && !/^\d+$/.test(name) ? name : "正片";
  if (/^\d+(\.\d+)?$/.test(name)) return "第" + name + "集";
  return name || "第" + (idx + 1) + "集";
}

// 在某条线路上找“同一集”：先按集名对齐，找不到再按序号
function ggFindEp(line, primary, idx) {
  var target = primary.episodes[idx];
  if (!target) return null;
  if (line === primary) return target;
  for (var i = 0; i < line.episodes.length; i++) {
    if (line.episodes[i].name === target.name) return line.episodes[i];
  }
  return line.episodes.length === primary.episodes.length ? line.episodes[idx] : null;
}

async function ggDetail(id) {
  var v = await ggJson("/Vod/get_detail", { vod_id: id });
  if (!v || !v.vod_id) throw new Error("找不到这部番");
  return v;
}

async function loadDetail(link) {
  var ref = ggParseLink(link);
  if (!ref) return null;
  var v = await ggDetail(ref.id);
  var lines = ggLines(v);
  var primary = ggPrimary(lines);
  var isMovie = Number(v.type_id) === 21 && primary && primary.episodes.length === 1;
  var base = ggMakeLink(v.vod_id, 0);
  var item = ggItem(v) || { id: base, type: "url", title: String(ref.id), link: base };
  item.mediaType = isMovie ? "movie" : "tv";
  var content = ggDecode(v.vod_content || v.vod_blurb);
  if (content) item.description = content;
  var g = [];
  if (GG_TYPES[v.type_id]) g.push(GG_TYPES[v.type_id]);
  String(v.vod_class || "").split(",").forEach(function (c) { if (c && g.length < 4) g.push(c); });
  if (g.length) item.genreTitle = g.join(" / ");
  var actors = String(v.vod_actor || "").split(/\s*[\/,，]\s*/).filter(Boolean);
  if (actors.length) {
    item.peoples = actors.slice(0, 12).map(function (n, i) {
      return { id: "cv-" + i, title: ggDecode(n), role: "声优/演员" };
    });
  }
  if (!primary) {
    item.description = (item.description ? item.description + "\n" : "") + "（暂无可用播放源）";
    return item;
  }
  var poster = item.posterPath;
  item.episodeItems = primary.episodes.map(function (e, i) {
    var l = ggMakeLink(v.vod_id, i + 1);
    var ep = { id: l, type: "url", title: ggEpTitle(e.name, i, isMovie), mediaType: item.mediaType, episode: i + 1, link: l };
    if (poster) ep.coverUrl = poster;
    return ep;
  });
  // 兜底：直接给一个能播的 videoUrl（点开的是某一集就给那一集，否则第 1 集）
  var idx = Math.max(0, Math.min((ref.ep || 1) - 1, primary.episodes.length - 1));
  item.videoUrl = primary.episodes[idx].url;
  item.playerType = "app";
  if (ref.ep) {
    item.id = ggMakeLink(v.vod_id, ref.ep);
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var ref = ggParseLink(params.link || params.id);
  if (!ref) return [];
  var epNo = ref.ep || parseInt(params.episode, 10) || 1;
  var v = await ggDetail(ref.id);
  var lines = ggLines(v);
  var primary = ggPrimary(lines);
  if (!primary) return [];
  var idx = Math.max(0, epNo - 1);
  var target = primary.episodes[idx];
  if (!target) return [];
  var out = [];
  var seen = {};
  // 主线路排第一，其余线路（繁中 / 杜比…）跟在后面
  var order = [primary].concat(lines.filter(function (l) { return l !== primary; }));
  for (var i = 0; i < order.length; i++) {
    var ep = ggFindEp(order[i], primary, idx);
    if (!ep || seen[ep.url]) continue;
    seen[ep.url] = true;
    out.push({
      name: order[i].name,
      description: ggEpTitle(target.name, idx, false) + (/\.mp4(\?|$)/i.test(ep.url) ? " · MP4" : " · HLS"),
      url: ep.url,
      customHeaders: { "User-Agent": GG_UA, Referer: GG_SITE + "/" },
      playerType: "app",
    });
  }
  return out;
}
