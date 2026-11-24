/**
 * 短剧聚合 · Rex / Forward 模块（ForwardWidget 格式）
 * 来源：星芽短剧（app.whjzjx.cn）、西饭短剧（xifan-api-cn.youlishipin.com）、七猫短剧（qmplaylet.com）
 * 接口思路参考 GitHub 上公开的 TVBox / drpy / OmniBox 短剧爬虫（Silent1566/OmniBox-Spider 短剧聚合.js 等），
 * 只用各平台免费可看的公开接口，全集免费，不含成人内容。
 *
 * link 前缀：dj:xy:<剧id> / dj:xf:<duanjuId>|<source> / dj:qm:<剧id>，单集再加 "#<集数>"
 *  - 星芽：游客登录拿 token（设备号随机生成并记住），分类/搜索/详情；播放地址带短时签名，起播时现取
 *  - 西饭：分类聚合页 / 搜索 / 详情，播放地址是平台的 302 跳转地址
 *  - 七猫：标签分类 / 详情，m3u8 直链；平台搜索接口目前返回空，所以搜索只走星芽 + 西饭
 */
WidgetMetadata = {
  id: "hghub.duanju",
  title: "短剧聚合",
  description: "短剧聚合：星芽短剧 + 西饭短剧 + 七猫短剧，分类浏览、聚合搜索、全集免费播放",
  author: "nico123-code",
  site: "https://github.com/nico123-code/hghub-plugins",
  version: "2026.11.24.1",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  modules: [
    {
      id: "xyList",
      title: "星芽短剧",
      functionName: "xyList",
      cacheDuration: 300,
      params: [
        {
          name: "channel",
          title: "频道",
          type: "enumeration",
          value: "1",
          enumOptions: [
            { title: "推荐", value: "1" },
            { title: "男频", value: "2" },
            { title: "女频", value: "3" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "xfList",
      title: "西饭短剧",
      functionName: "xfList",
      cacheDuration: 300,
      params: [
        {
          name: "cate",
          title: "分类",
          type: "enumeration",
          value: "68@推荐",
          enumOptions: [
            { title: "推荐", value: "68@推荐" },
            { title: "都市", value: "68@都市" },
            { title: "青春", value: "68@青春" },
            { title: "现代言情", value: "81@现代言情" },
            { title: "豪门", value: "81@豪门" },
            { title: "穿越", value: "81@穿越" },
            { title: "大女主", value: "80@大女主" },
            { title: "逆袭", value: "79@逆袭" },
            { title: "打脸虐渣", value: "79@打脸虐渣" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "qmList",
      title: "七猫短剧",
      functionName: "qmList",
      cacheDuration: 300,
      params: [
        {
          name: "tag",
          title: "分类",
          type: "enumeration",
          value: "0",
          enumOptions: [{"title": "推荐", "value": "0"}, {"title": "新剧", "value": "-1"}, {"title": "都市情感", "value": "1273"}, {"title": "都市", "value": "571"}, {"title": "古装", "value": "1272"}, {"title": "玄幻仙侠", "value": "1286"}, {"title": "乡村", "value": "590"}, {"title": "奇幻", "value": "570"}, {"title": "年代", "value": "572"}, {"title": "民国", "value": "573"}, {"title": "青春校园", "value": "1288"}, {"title": "末世", "value": "556"}, {"title": "武侠", "value": "371"}, {"title": "科幻", "value": "594"}, {"title": "逆袭", "value": "400"}, {"title": "打脸虐渣", "value": "716"}, {"title": "复仇", "value": "795"}, {"title": "家庭", "value": "670"}, {"title": "重生", "value": "784"}, {"title": "追妻火葬场", "value": "715"}, {"title": "穿越", "value": "373"}, {"title": "女性成长", "value": "1294"}, {"title": "闪婚", "value": "480"}, {"title": "权谋", "value": "790"}, {"title": "马甲", "value": "558"}, {"title": "强者回归", "value": "402"}, {"title": "系统", "value": "787"}, {"title": "职场", "value": "724"}, {"title": "商战", "value": "723"}, {"title": "宫斗", "value": "343"}, {"title": "高手下山", "value": "1299"}, {"title": "致富", "value": "492"}, {"title": "异能", "value": "727"}, {"title": "偷听心声", "value": "1258"}, {"title": "娱乐明星", "value": "1295"}, {"title": "宅斗", "value": "342"}, {"title": "脑洞", "value": "526"}, {"title": "替身", "value": "712"}, {"title": "穿书", "value": "338"}, {"title": "种田经商", "value": "1291"}, {"title": "豪门总裁", "value": "624"}, {"title": "真假千金", "value": "812"}, {"title": "战神", "value": "527"}, {"title": "赘婿", "value": "36"}, {"title": "欢喜冤家", "value": "464"}, {"title": "神医", "value": "1269"}, {"title": "小人物", "value": "1296"}, {"title": "神豪", "value": "37"}, {"title": "团宠", "value": "545"}, {"title": "女帝", "value": "617"}, {"title": "兵王", "value": "28"}, {"title": "虐恋", "value": "16"}, {"title": "甜宠", "value": "21"}, {"title": "搞笑", "value": "793"}, {"title": "悬疑", "value": "27"}],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", description: "剧名" },
      {
        name: "site",
        title: "来源",
        type: "enumeration",
        value: "all",
        enumOptions: [
          { title: "全部", value: "all" },
          { title: "星芽短剧", value: "xy" },
          { title: "西饭短剧", value: "xf" },
        ],
      },
      { name: "page", title: "页码", type: "page" },
    ],
  },
};

var DJ = "dj:";

/* ---------------- 通用 ---------------- */
function djPage(params) {
  var n = parseInt((params && params.page) || "1", 10);
  return isFinite(n) && n > 0 ? n : 1;
}
function djData(res, label) {
  var d = res && res.data !== undefined ? res.data : res;
  if (typeof d === "string") {
    try { d = JSON.parse(d); } catch (e) { throw new Error(label + " 返回不是 JSON"); }
  }
  return d || {};
}
function djStore(k, v) {
  try {
    if (!Widget.storage) return undefined;
    if (v === undefined) return Widget.storage.get(k);
    Widget.storage.set(k, v);
  } catch (e) {}
  return undefined;
}
function djItem(src, id, title, cover, desc, eps, extra) {
  if (!id || !title) return null;
  var link = DJ + src + ":" + id;
  var it = { id: link, type: "url", title: String(title).replace(/<\/?[^>]+>/g, "").trim(), mediaType: "tv", link: link };
  if (cover) { it.posterPath = cover; it.coverUrl = cover; }
  if (desc) it.description = String(desc);
  var bits = [{ xy: "星芽", xf: "西饭", qm: "七猫" }[src]];
  if (eps) bits.push(eps + "集");
  if (extra) bits.push(extra);
  it.durationText = bits.join(" · ");
  if (extra) it.genreTitle = extra;
  return it;
}
function djDedup(list) {
  var seen = {}, out = [];
  for (var i = 0; i < list.length; i++) {
    var it = list[i];
    if (!it || seen[it.id]) continue;
    seen[it.id] = true;
    out.push(it);
  }
  return out;
}

/* ---------------- MD5 / Base64（七猫签名用，纯 JS） ---------------- */
function djMd5(str) {
  function rh(n) { var s = "", j; for (j = 0; j <= 3; j++) s += ((n >> (j * 8 + 4)) & 15).toString(16) + ((n >> (j * 8)) & 15).toString(16); return s; }
  function ad(x, y) { var l = (x & 0xffff) + (y & 0xffff); return (((x >> 16) + (y >> 16) + (l >> 16)) << 16) | (l & 0xffff); }
  function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
  function cm(q, a, b, x, s, t) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cm((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cm((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cm(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cm(c ^ (b | ~d), a, b, x, s, t); }
  var u = unescape(encodeURIComponent(str));
  var n = ((u.length + 8) >> 6) + 1, x = new Array(n * 16), i;
  for (i = 0; i < n * 16; i++) x[i] = 0;
  for (i = 0; i < u.length; i++) x[i >> 2] |= u.charCodeAt(i) << ((i % 4) * 8);
  x[i >> 2] |= 0x80 << ((i % 4) * 8);
  x[n * 16 - 2] = u.length * 8;
  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (i = 0; i < x.length; i += 16) {
    var oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, x[i], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819); b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426); c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416); d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290); b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632); c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691); d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961); b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784); c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558); d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632); b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i], 11, -358537222); c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487); d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905); b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606); c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359); d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259); b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, oa); b = ad(b, ob); c = ad(c, oc); d = ad(d, od);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}
function djB64(str) {
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var s = unescape(encodeURIComponent(str)), o = "", i;
  for (i = 0; i < s.length; i += 3) {
    var a = s.charCodeAt(i), b = s.charCodeAt(i + 1), c = s.charCodeAt(i + 2);
    var n = (a << 16) | ((b || 0) << 8) | (c || 0);
    o += t.charAt((n >> 18) & 63) + t.charAt((n >> 12) & 63) + (i + 1 < s.length ? t.charAt((n >> 6) & 63) : "=") + (i + 2 < s.length ? t.charAt(n & 63) : "=");
  }
  return o;
}
function djRand(n) {
  var s = "", h = "0123456789abcdef";
  for (var i = 0; i < n; i++) s += h.charAt(Math.floor(Math.random() * 16));
  return s;
}

/* ---------------- 星芽 ---------------- */
var XY_API = "https://app.whjzjx.cn";
var XY_LOGIN = "https://u.shytkjgs.com/user/v1/account/login";
var XY_TOKEN = "";

async function xyToken(force) {
  if (!force) {
    if (XY_TOKEN) return XY_TOKEN;
    var saved = djStore("xyToken");
    if (saved && saved.t && saved.at && Date.now() - saved.at < 6 * 3600 * 1000) { XY_TOKEN = saved.t; return XY_TOKEN; }
  }
  var dev = djStore("xyDevice");
  if (!dev) { dev = djRand(33); djStore("xyDevice", dev); }
  var res = await Widget.http.post(XY_LOGIN, JSON.stringify({ device: dev }), {
    headers: { "User-Agent": "okhttp/4.10.0", platform: "1", "Content-Type": "application/json" },
  });
  var d = djData(res, "星芽登录");
  var tok = (d.data && (d.data.token || (d.data.data && d.data.data.token))) || "";
  if (!tok) throw new Error("星芽游客登录失败");
  XY_TOKEN = tok;
  djStore("xyToken", { t: tok, at: Date.now() });
  return tok;
}
function xyHeaders(tok) {
  return { "User-Agent": "okhttp/3.12.11", "Content-Type": "application/json; charset=utf-8", authorization: tok };
}
async function xyCall(method, path, body) {
  for (var round = 0; round < 2; round++) {
    var tok = await xyToken(round > 0);
    var res = method === "POST"
      ? await Widget.http.post(XY_API + path, JSON.stringify(body || {}), { headers: xyHeaders(tok) })
      : await Widget.http.get(XY_API + path, { headers: xyHeaders(tok) });
    var d = djData(res, "星芽");
    if (d && d.data) return d.data;
    if (round === 0) continue; // token 失效时重登一次
    throw new Error("星芽返回异常: " + JSON.stringify(d).slice(0, 120));
  }
}
function xyMap(t) {
  if (!t) return null;
  var tags = Array.isArray(t.classes) ? t.classes.slice(0, 2).join("/") : "";
  return djItem("xy", String(t.id), t.title, t.cover_url, t.introduction, t.total, tags || (t.play_amount_str ? t.play_amount_str + "播放" : ""));
}
async function xyList(params) {
  params = params || {};
  var ch = params.channel || "1";
  var data = await xyCall("GET", "/cloud/v2/theater/home_page?theater_class_id=" + encodeURIComponent(ch) + "&type=1&class2_ids=0&page_num=" + djPage(params) + "&page_size=24");
  var list = (data && data.list) || [];
  return djDedup(list.map(function (x) { return xyMap(x && x.theater); }));
}
async function xySearch(kw) {
  var data = await xyCall("POST", "/v3/search", { text: kw });
  var list = (data && data.theater && data.theater.search_data) || [];
  return list.map(xyMap);
}
async function xyDetail(id) {
  var d = await xyCall("GET", "/v2/theater_parent/detail?theater_parent_id=" + encodeURIComponent(id));
  var eps = (d.theaters || []).map(function (t, i) {
    var u = String(t.son_video_url || "").replace(/^http:\/\//, "https://");
    return { no: parseInt(t.num, 10) || i + 1, url: u };
  });
  return {
    title: d.title, cover: d.cover_url, desc: d.introduction, total: d.total || eps.length,
    genre: Array.isArray(d.desc_tags) ? d.desc_tags.join(" / ") : "", rating: parseFloat(d.score) || undefined,
    eps: eps, headers: { "User-Agent": "okhttp/3.12.11" },
  };
}

/* ---------------- 西饭 ---------------- */
var XF_API = "https://xifan-api-cn.youlishipin.com";
var XF_Q = "&version=2001001&androidVersionCode=28&appId=drama&teenMode=false&userBaseMode=false";
async function xfGet(path) {
  var res = await Widget.http.get(XF_API + path + XF_Q + "&requestId=" + Date.now() + djRand(16), { headers: { "User-Agent": "okhttp/3.12.11" } });
  var d = djData(res, "西饭");
  if (!d || !d.result) throw new Error("西饭返回异常");
  return d.result;
}
function xfCollect(result) {
  var out = [];
  var els = (result && result.elements) || [];
  for (var i = 0; i < els.length; i++) {
    var cs = els[i].contents || [];
    for (var j = 0; j < cs.length; j++) {
      var dj = cs[j] && cs[j].duanjuVo;
      if (!dj || !dj.duanjuId) continue;
      var tag = Array.isArray(dj.categories) ? dj.categories.slice(0, 2).map(function (c) { return typeof c === "string" ? c : c && (c.name || c.categoryName); }).filter(Boolean).join("/") : "";
      out.push(djItem("xf", dj.duanjuId + "|" + (dj.source || ""), dj.title, dj.coverImageUrl, dj.desc, dj.total, tag));
    }
  }
  return out;
}
async function xfList(params) {
  params = params || {};
  var parts = String(params.cate || "68@推荐").split("@");
  var off = (djPage(params) - 1) * 30;
  var r = await xfGet("/xifan/drama/portalPage?reqType=aggregationPage&offset=" + off + "&categoryId=" + encodeURIComponent(parts[0]) +
    "&quickEngineVersion=-1&scene=&categoryNames=" + encodeURIComponent(parts[1] || "") + "&categoryVersion=1&density=1.5&pageID=page_theater");
  return djDedup(xfCollect(r));
}
async function xfSearch(kw, page) {
  var r = await xfGet("/xifan/search/getSearchList?keyword=" + encodeURIComponent(kw + "84") + "&pageIndex=" + (page || 1));
  return xfCollect(r);
}
async function xfDetail(id) {
  var p = String(id).split("|");
  var r = await xfGet("/xifan/drama/getDuanjuInfo?duanjuId=" + encodeURIComponent(p[0]) + "&source=" + encodeURIComponent(p[1] || "") + "&openFrom=homescreen&type=&pageID=page_inner_flow&density=1.5");
  var eps = (r.episodeList || []).map(function (e, i) { return { no: parseInt(e.index, 10) || i + 1, url: e.playUrl }; });
  var genre = Array.isArray(r.tags) ? r.tags.slice(0, 3).map(function (t) { return typeof t === "string" ? t : t && (t.name || t.tagName); }).filter(Boolean).join(" / ") : "";
  return {
    title: r.title, cover: r.coverImageUrl, desc: r.desc, total: r.total || eps.length,
    genre: genre, status: r.updateStatus === "over" ? "完结" : "", eps: eps, headers: { "User-Agent": "okhttp/3.12.11" },
  };
}

/* ---------------- 七猫 ---------------- */
var QM_STORE = "https://api-store.qmplaylet.com";
var QM_READ = "https://api-read.qmplaylet.com";
var QM_KEY = "d3dGiJc651gSQ8w1";
var QM_MAP = {"+":"P","/":"X","0":"M","1":"U","2":"l","3":"E","4":"r","5":"Y","6":"W","7":"b","8":"d","9":"J","A":"9","B":"s","C":"a","D":"I","E":"0","F":"o","G":"y","H":"_","I":"H","J":"G","K":"i","L":"t","M":"g","N":"N","O":"A","P":"8","Q":"F","R":"k","S":"3","T":"h","U":"f","V":"R","W":"q","X":"C","Y":"4","Z":"p","a":"m","b":"B","c":"O","d":"u","e":"c","f":"6","g":"K","h":"x","i":"5","j":"T","k":"-","l":"2","m":"z","n":"S","o":"Z","p":"1","q":"V","r":"v","s":"j","t":"Q","u":"7","v":"D","w":"w","x":"n","y":"L","z":"e"};
function qmHeaders() {
  var info = {
    static_score: "0.8", uuid: "00000000-7fc7-08dc-0000-000000000000",
    "device-id": "20250220125449b9b8cac84c2dd3d035c9052a2572f7dd0122edde3cc42a70",
    mac: "", sourceuid: "aa7de295aad621a6", "refresh-type": "0", model: "22021211RC",
    "wlb-imei": "", "client-id": "aa7de295aad621a6", brand: "Redmi", oaid: "",
    "oaid-no-cache": "", "sys-ver": "12", "trusted-id": "", "phone-level": "H",
    imei: "", "wlb-uid": "aa7de295aad621a6", "session-id": String(Date.now()),
  };
  var b = djB64(JSON.stringify(info)), q = "";
  for (var i = 0; i < b.length; i++) q += QM_MAP[b.charAt(i)] || b.charAt(i);
  var base = "AUTHORI" + "ZATION=" + "app-version=10001application-id=com.duoduo.readchannel=unknownis-white=net-env=5platform=androidqm-params=" + q + "reg=" + QM_KEY;
  return {
    "net-env": "5", reg: "", channel: "unknown", "is-white": "", platform: "android",
    "application-id": "com.duoduo.read", authorization: "", "app-version": "10001",
    "User-Agent": "webviewversion/0", "qm-params": q, sign: djMd5(base),
  };
}
async function qmGet(url) {
  var res = await Widget.http.get(url, { headers: qmHeaders() });
  var d = djData(res, "七猫");
  if (!d || !d.data) throw new Error("七猫返回异常");
  return d.data;
}
async function qmList(params) {
  params = params || {};
  var tag = String(params.tag || "0");
  var page = djPage(params);
  var url = page === 1
    ? QM_STORE + "/api/v1/playlet/index?tag_id=" + tag + "&playlet_privacy=1&operation=1&sign=" + djMd5("operation=1playlet_privacy=1tag_id=" + tag + QM_KEY)
    : QM_STORE + "/api/v1/playlet/index?tag_id=" + tag + "&next_id=" + page + "&playlet_privacy=1&operation=1&sign=" + djMd5("next_id=" + page + "operation=1playlet_privacy=1tag_id=" + tag + QM_KEY);
  var data = await qmGet(url);
  return djDedup((data.list || []).map(function (v) {
    return djItem("qm", String(v.playlet_id), v.title, v.image_link, v.intro, v.total_episode_num, v.tags || "");
  }));
}
async function qmDetail(id) {
  var d = await qmGet(QM_READ + "/player/api/v1/playlet/info?playlet_id=" + encodeURIComponent(id) + "&sign=" + djMd5("playlet_id=" + id + QM_KEY));
  var eps = (d.play_list || []).map(function (e, i) { return { no: parseInt(e.sort, 10) || i + 1, url: e.video_url, dur: parseInt(e.duration, 10) || undefined }; });
  return {
    title: d.title, cover: d.image_link, desc: d.intro, total: d.total_episode_num || eps.length,
    genre: d.tags || "", status: String(d.is_over) === "1" ? "完结" : "", eps: eps, headers: {},
  };
}

/* ---------------- 搜索 ---------------- */
async function search(params) {
  params = params || {};
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var site = params.site || "all";
  var page = djPage(params);
  var jobs = [];
  if ((site === "all" || site === "xy") && page === 1) jobs.push(xySearch(kw).catch(function (e) { console.log("[短剧] 星芽搜索失败", e && e.message); return []; }));
  if (site === "all" || site === "xf") jobs.push(xfSearch(kw, page).catch(function (e) { console.log("[短剧] 西饭搜索失败", e && e.message); return []; }));
  var rs = await Promise.all(jobs);
  var all = [];
  for (var i = 0; i < rs.length; i++) all = all.concat(rs[i] || []);
  return djDedup(all);
}

/* ---------------- 详情 / 播放 ---------------- */
function djParse(link) {
  var s = String(link || "");
  if (s.indexOf(DJ) === 0) s = s.slice(DJ.length);
  var m = s.match(/^(xy|xf|qm):(.+?)(?:#(\d+))?$/);
  if (!m) return null;
  return { src: m[1], id: m[2], ep: m[3] ? parseInt(m[3], 10) : 0 };
}
async function djFetch(ref) {
  if (ref.src === "xy") return xyDetail(ref.id);
  if (ref.src === "xf") return xfDetail(ref.id);
  return qmDetail(ref.id);
}
async function loadDetail(link) {
  var ref = djParse(link);
  if (!ref) return null;
  var d = await djFetch(ref);
  var base = DJ + ref.src + ":" + ref.id;
  var item = djItem(ref.src, ref.id, d.title || "短剧", d.cover, d.desc, d.total, d.status || "");
  if (d.genre) item.genreTitle = d.genre;
  if (d.rating) item.rating = d.rating;
  item.episodeItems = d.eps.map(function (e) {
    var ep = { id: base + "#" + e.no, type: "url", title: "第" + e.no + "集", mediaType: "tv", episode: e.no, link: base + "#" + e.no };
    if (d.cover) ep.coverUrl = d.cover;
    if (e.dur) ep.duration = e.dur;
    return ep;
  });
  var cur = null;
  for (var i = 0; i < d.eps.length; i++) if (d.eps[i].no === (ref.ep || d.eps[0].no)) { cur = d.eps[i]; break; }
  if (!cur && d.eps.length) cur = d.eps[0];
  if (cur && cur.url) { item.videoUrl = cur.url; item.playerType = "app"; }
  if (ref.ep) { item.id = base + "#" + ref.ep; item.link = item.id; item.episode = ref.ep; }
  return item;
}
async function loadResource(params) {
  params = params || {};
  var ref = djParse(params.link || params.id);
  if (!ref) return [];
  var want = ref.ep || parseInt(params.episode, 10) || 1;
  var d = await djFetch(ref);
  for (var i = 0; i < d.eps.length; i++) {
    if (d.eps[i].no === want && d.eps[i].url) {
      var r = { name: { xy: "星芽", xf: "西饭", qm: "七猫" }[ref.src], description: "第" + want + "集", url: d.eps[i].url, playerType: "app" };
      if (d.headers && Object.keys(d.headers).length) r.customHeaders = d.headers;
      return [r];
    }
  }
  return [];
}
