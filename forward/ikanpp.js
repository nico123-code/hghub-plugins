/**
 * 影视聚合（iKanPP）· Rex / Forward 模块（ForwardWidget 格式）
 * 站点：https://www.ikanpp.com （影视聚合站，多播放源）
 *
 * 说明：
 *  - 列表走站点自己的片库接口 /api/library/browse（电影/剧集/动漫/综艺/纪录片，可按类型、地区、排序筛选）。
 *  - 短剧走 /api/short-dramas/browse。
 *  - 搜索走 /api/suggest（一次最多 20 条，不分页）。
 *  - 详情/选集/播放走 /api/lines：一部片会聚合多条播放源（魔都、iKun、量子、非凡…），
 *    选集按集数最多的那条源列出，播放时把同一集在各条源上的地址都列出来，可在播放器里切换线路。
 *  - 注意：站点的 /api/lines 一带 Referer 头就返回 403，所以这里请求时不带 Referer。
 */
WidgetMetadata = {
  id: "hghub.ikanpp",
  title: "影视聚合",
  description: "影视聚合：电影、剧集、动漫、综艺、纪录片、短剧，多线路播放",
  author: "nico123-code",
  site: "https://github.com/nico123-code/hghub-plugins",
  version: "2026.11.23.2",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  modules: [
    {
      "id": "browse_movie",
      "title": "电影",
      "functionName": "loadBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "movie"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time_updated",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time_updated"
            },
            {
              "title": "最新上架",
              "value": "time_added"
            },
            {
              "title": "人气最高",
              "value": "popularity"
            },
            {
              "title": "评分最高",
              "value": "rating"
            }
          ]
        },
        {
          "name": "genre",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "动作",
              "value": "动作"
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
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "犯罪",
              "value": "犯罪"
            },
            {
              "title": "警匪",
              "value": "警匪"
            },
            {
              "title": "枪战",
              "value": "枪战"
            },
            {
              "title": "谍战",
              "value": "谍战"
            },
            {
              "title": "惊悚",
              "value": "惊悚"
            },
            {
              "title": "恐怖",
              "value": "恐怖"
            },
            {
              "title": "战争",
              "value": "战争"
            },
            {
              "title": "灾难",
              "value": "灾难"
            },
            {
              "title": "冒险",
              "value": "冒险"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "魔幻",
              "value": "魔幻"
            },
            {
              "title": "武侠",
              "value": "武侠"
            },
            {
              "title": "历史",
              "value": "历史"
            },
            {
              "title": "剧情",
              "value": "剧情"
            },
            {
              "title": "传记",
              "value": "传记"
            },
            {
              "title": "动画",
              "value": "动画"
            },
            {
              "title": "歌舞",
              "value": "歌舞"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "大陆",
              "value": "大陆"
            },
            {
              "title": "香港",
              "value": "香港"
            },
            {
              "title": "台湾",
              "value": "台湾"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "其它",
              "value": "其它"
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
      "id": "browse_tv",
      "title": "剧集",
      "functionName": "loadBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "tv"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time_updated",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time_updated"
            },
            {
              "title": "最新上架",
              "value": "time_added"
            },
            {
              "title": "人气最高",
              "value": "popularity"
            },
            {
              "title": "评分最高",
              "value": "rating"
            }
          ]
        },
        {
          "name": "genre",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "古装",
              "value": "古装"
            },
            {
              "title": "仙侠",
              "value": "仙侠"
            },
            {
              "title": "都市",
              "value": "都市"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "刑侦",
              "value": "刑侦"
            },
            {
              "title": "谍战",
              "value": "谍战"
            },
            {
              "title": "言情",
              "value": "言情"
            },
            {
              "title": "年代",
              "value": "年代"
            },
            {
              "title": "商战",
              "value": "商战"
            },
            {
              "title": "军旅",
              "value": "军旅"
            },
            {
              "title": "武侠",
              "value": "武侠"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "律政",
              "value": "律政"
            },
            {
              "title": "医疗",
              "value": "医疗"
            },
            {
              "title": "家庭",
              "value": "家庭"
            },
            {
              "title": "偶像",
              "value": "偶像"
            },
            {
              "title": "历史",
              "value": "历史"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "青春",
              "value": "青春"
            },
            {
              "title": "情景",
              "value": "情景"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "大陆",
              "value": "大陆"
            },
            {
              "title": "香港",
              "value": "香港"
            },
            {
              "title": "台湾",
              "value": "台湾"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "其它",
              "value": "其它"
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
      "id": "browse_anime",
      "title": "动漫",
      "functionName": "loadBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "anime"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time_updated",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time_updated"
            },
            {
              "title": "最新上架",
              "value": "time_added"
            },
            {
              "title": "人气最高",
              "value": "popularity"
            },
            {
              "title": "评分最高",
              "value": "rating"
            }
          ]
        },
        {
          "name": "genre",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "热血",
              "value": "热血"
            },
            {
              "title": "修真",
              "value": "修真"
            },
            {
              "title": "玄幻",
              "value": "玄幻"
            },
            {
              "title": "冒险",
              "value": "冒险"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "搞笑",
              "value": "搞笑"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "穿越",
              "value": "穿越"
            },
            {
              "title": "异世界",
              "value": "异世界"
            },
            {
              "title": "战斗",
              "value": "战斗"
            },
            {
              "title": "校园",
              "value": "校园"
            },
            {
              "title": "恋爱",
              "value": "恋爱"
            },
            {
              "title": "日常",
              "value": "日常"
            },
            {
              "title": "治愈",
              "value": "治愈"
            },
            {
              "title": "机战",
              "value": "机战"
            },
            {
              "title": "推理",
              "value": "推理"
            },
            {
              "title": "古风",
              "value": "古风"
            },
            {
              "title": "萌系",
              "value": "萌系"
            },
            {
              "title": "游戏",
              "value": "游戏"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "大陆",
              "value": "大陆"
            },
            {
              "title": "香港",
              "value": "香港"
            },
            {
              "title": "台湾",
              "value": "台湾"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "其它",
              "value": "其它"
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
      "id": "browse_variety",
      "title": "综艺",
      "functionName": "loadBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "variety"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time_updated",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time_updated"
            },
            {
              "title": "最新上架",
              "value": "time_added"
            },
            {
              "title": "人气最高",
              "value": "popularity"
            },
            {
              "title": "评分最高",
              "value": "rating"
            }
          ]
        },
        {
          "name": "genre",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "真人秀",
              "value": "真人秀"
            },
            {
              "title": "脱口秀",
              "value": "脱口秀"
            },
            {
              "title": "音乐现场",
              "value": "音乐"
            },
            {
              "title": "搞笑",
              "value": "搞笑"
            },
            {
              "title": "竞技户外",
              "value": "竞技"
            },
            {
              "title": "恋爱观察",
              "value": "恋爱"
            },
            {
              "title": "访谈",
              "value": "访谈"
            },
            {
              "title": "相声",
              "value": "相声"
            },
            {
              "title": "生活",
              "value": "生活"
            },
            {
              "title": "美食",
              "value": "美食"
            },
            {
              "title": "情感",
              "value": "情感"
            },
            {
              "title": "选秀",
              "value": "选秀"
            },
            {
              "title": "游戏",
              "value": "游戏"
            },
            {
              "title": "文化",
              "value": "文化"
            },
            {
              "title": "晚会盛典",
              "value": "晚会"
            },
            {
              "title": "亲子",
              "value": "亲子"
            },
            {
              "title": "职场",
              "value": "职场"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "大陆",
              "value": "大陆"
            },
            {
              "title": "香港",
              "value": "香港"
            },
            {
              "title": "台湾",
              "value": "台湾"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "其它",
              "value": "其它"
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
      "id": "browse_documentary",
      "title": "纪录片",
      "functionName": "loadBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "documentary"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time_updated",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time_updated"
            },
            {
              "title": "最新上架",
              "value": "time_added"
            },
            {
              "title": "人气最高",
              "value": "popularity"
            },
            {
              "title": "评分最高",
              "value": "rating"
            }
          ]
        },
        {
          "name": "genre",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "自然",
              "value": "自然"
            },
            {
              "title": "地理",
              "value": "地理"
            },
            {
              "title": "宇宙天文",
              "value": "宇宙"
            },
            {
              "title": "历史",
              "value": "历史"
            },
            {
              "title": "人文",
              "value": "人文"
            },
            {
              "title": "美食",
              "value": "美食"
            },
            {
              "title": "军事战争",
              "value": "军事"
            },
            {
              "title": "考古秘境",
              "value": "考古"
            },
            {
              "title": "科学",
              "value": "科学"
            },
            {
              "title": "探险",
              "value": "探险"
            },
            {
              "title": "动物生态",
              "value": "动物"
            },
            {
              "title": "社会纪实",
              "value": "社会"
            },
            {
              "title": "传记",
              "value": "传记"
            },
            {
              "title": "旅行",
              "value": "旅行"
            },
            {
              "title": "科技",
              "value": "科技"
            },
            {
              "title": "灾难",
              "value": "灾难"
            },
            {
              "title": "艺术",
              "value": "艺术"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "大陆",
              "value": "大陆"
            },
            {
              "title": "香港",
              "value": "香港"
            },
            {
              "title": "台湾",
              "value": "台湾"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "其它",
              "value": "其它"
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
      "id": "short",
      "title": "短剧",
      "functionName": "loadShort",
      "cacheDuration": 300,
      "params": [
        {
          "name": "category",
          "title": "分类",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "甜宠",
              "value": "甜宠"
            },
            {
              "title": "逆袭",
              "value": "逆袭"
            },
            {
              "title": "都市",
              "value": "都市"
            },
            {
              "title": "古装",
              "value": "古装"
            },
            {
              "title": "重生",
              "value": "重生"
            },
            {
              "title": "穿越",
              "value": "穿越"
            },
            {
              "title": "年代",
              "value": "年代"
            },
            {
              "title": "战神",
              "value": "战神"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "漫剧",
              "value": "漫剧"
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
      // id 需固定为 loadResource：起播 / 切线路时现取各条源的播放地址
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
      { name: "keyword", title: "关键词", type: "input", value: "" },
      { name: "page", title: "页码", type: "page" },
    ],
  },
};

var IK_REGIONS = ["大陆", "香港", "台湾", "日本", "韩国", "欧美", "英国", "泰国", "其它"];
var IK_GENRES = {
  movie: ["动作", "喜剧", "爱情", "科幻", "悬疑", "犯罪", "警匪", "枪战", "谍战", "惊悚", "恐怖", "战争", "灾难", "冒险", "奇幻", "魔幻", "武侠", "历史", "剧情", "传记", "动画", "歌舞"],
  tv: ["古装", "仙侠", "都市", "悬疑", "刑侦", "谍战", "言情", "年代", "商战", "军旅", "武侠", "科幻", "律政", "医疗", "家庭", "偶像", "历史", "奇幻", "青春", "情景"],
  anime: ["热血", "修真", "玄幻", "冒险", "科幻", "搞笑", "奇幻", "穿越", "异世界", "战斗", "校园", "恋爱", "日常", "治愈", "机战", "推理", "古风", "萌系", "游戏", "悬疑"],
  variety: [["真人秀", "真人秀"], ["脱口秀", "脱口秀"], ["音乐现场", "音乐"], ["搞笑", "搞笑"], ["竞技户外", "竞技"], ["恋爱观察", "恋爱"], ["访谈", "访谈"], ["相声", "相声"], ["生活", "生活"], ["美食", "美食"], ["情感", "情感"], ["选秀", "选秀"], ["游戏", "游戏"], ["文化", "文化"], ["晚会盛典", "晚会"], ["亲子", "亲子"], ["职场", "职场"]],
  documentary: [["自然", "自然"], ["地理", "地理"], ["宇宙天文", "宇宙"], ["历史", "历史"], ["人文", "人文"], ["美食", "美食"], ["军事战争", "军事"], ["考古秘境", "考古"], ["科学", "科学"], ["探险", "探险"], ["动物生态", "动物"], ["社会纪实", "社会"], ["传记", "传记"], ["旅行", "旅行"], ["科技", "科技"], ["灾难", "灾难"], ["艺术", "艺术"]],
};
var IK_SHORT_CATS = ["甜宠", "逆袭", "都市", "古装", "重生", "穿越", "年代", "战神", "悬疑", "漫剧"];




var IK_ORIGIN = "https://www.ikanpp.com";
var IK_IMG = "https://p1.9fa9fa.com";
var IK_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var IK_PAGE_SIZE = 20;

// link 格式：ik:<t|s>:<集序号,0=整部>:<id>:<年份>:<片名>
//   t = 影视（id 形如 ik235408），s = 短剧（id 形如 kp107422，播放源要用片名+年份查）
function ikMakeLink(kind, ep, id, year, name) {
  return ["ik", kind, String(ep || 0), id, year || "", name || ""].join(":");
}
function ikParseLink(link) {
  var s = String(link || "");
  var p = s.split(":");
  if (p.length < 4 || p[0] !== "ik") return null;
  var kind = p[1] === "s" ? "s" : "t";
  var ep = parseInt(p[2], 10);
  var id = p[3];
  if (!/^(ik|kp)\d+$/i.test(id)) return null;
  return { kind: kind, ep: isFinite(ep) && ep > 0 ? ep : 0, id: id, year: p[4] || "", name: p.slice(5).join(":") };
}

function ikQuery(q) {
  var parts = [];
  for (var k in q) {
    if (q[k] === undefined || q[k] === null || q[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(q[k])));
  }
  return parts.length ? "?" + parts.join("&") : "";
}

async function ikJson(path, query, label) {
  // 不带 Referer：站点 /api/lines 见到 Referer 会 403
  var res = await Widget.http.get(IK_ORIGIN + path + ikQuery(query || {}), {
    headers: { Accept: "application/json", "User-Agent": IK_UA },
  });
  var body = res && res.data;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== "object") throw new Error((label || path) + " 返回结构已变化");
  if (body.error) throw new Error((label || path) + " 失败：" + body.error);
  return body;
}

function ikImg(u) {
  if (!u || typeof u !== "string") return "";
  if (u.indexOf("placeholder") >= 0) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return IK_IMG + u;
  return u;
}

function ikPage(params) {
  var n = parseInt((params && params.page) || "1", 10);
  return isFinite(n) && n > 0 ? n : 1;
}

function ikNum(v) {
  var n = parseFloat(v);
  return isFinite(n) && n > 0 ? n : undefined;
}

function ikIdFromUrl(u) {
  var m = String(u || "").match(/\/(?:title|short)\/((?:ik|kp)\d+)/i);
  return m ? m[1] : "";
}

function ikItem(o) {
  // o: { kind, id, title, cover, rate, year, types, remarks, mediaType, desc }
  if (!o.id || !o.title) return null;
  var link = ikMakeLink(o.kind, 0, o.id, o.year, o.kind === "s" ? o.title : "");
  var it = {
    id: link,
    type: "url",
    title: String(o.title),
    mediaType: o.mediaType || "tv",
    link: link,
  };
  var cover = ikImg(o.cover);
  if (cover) {
    it.posterPath = cover;
    it.coverUrl = cover;
  }
  if (o.desc) it.description = String(o.desc);
  if (o.year) it.releaseDate = String(o.year);
  if (ikNum(o.rate) != null) it.rating = ikNum(o.rate);
  if (Array.isArray(o.types) && o.types.length) it.genreTitle = o.types.slice(0, 3).join(" / ");
  if (o.remarks && o.remarks !== "Released") it.durationText = String(o.remarks);
  return it;
}

function ikDedup(list) {
  var seen = {};
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (!list[i] || seen[list[i].id]) continue;
    seen[list[i].id] = true;
    out.push(list[i]);
  }
  return out;
}

async function loadBrowse(params) {
  params = params || {};
  var type = params.type || "movie";
  var page = ikPage(params);
  var d = await ikJson(
    "/api/library/browse",
    {
      type: type,
      sort: params.sort || "time_updated",
      genre: params.genre || "",
      region: params.region || "",
      limit: IK_PAGE_SIZE,
      page: page,
    },
    "片库"
  );
  if (d.pagecount && page > d.pagecount) return [];
  var rows = Array.isArray(d.list) ? d.list : [];
  return ikDedup(
    rows.map(function (r) {
      return ikItem({
        kind: "t",
        id: String(r.id || ikIdFromUrl(r.url)),
        title: r.title,
        cover: r.cover,
        rate: r.rate || r.score,
        year: r.year,
        types: r.types,
        remarks: r.remarks,
        mediaType: type === "movie" ? "movie" : "tv",
      });
    })
  );
}

async function loadShort(params) {
  params = params || {};
  var page = ikPage(params);
  var d = await ikJson(
    "/api/short-dramas/browse",
    { category: params.category || "", limit: IK_PAGE_SIZE, page: page },
    "短剧"
  );
  if (d.pagecount && page > d.pagecount) return [];
  var rows = Array.isArray(d.list) ? d.list : [];
  return ikDedup(
    rows.map(function (r) {
      var id = String(r.id || "");
      if (/^\d+$/.test(id)) id = "kp" + id;
      if (!/^kp\d+$/i.test(id)) id = ikIdFromUrl(r.url);
      return ikItem({
        kind: "s",
        id: id,
        title: r.title,
        cover: r.poster || r.cover,
        rate: r.score,
        year: r.year,
        types: Array.isArray(r.genres) && r.genres.length ? r.genres : r.categoryName ? [r.categoryName] : [],
        remarks: r.remarks || (r.episodes ? "全" + r.episodes + "集" : ""),
        desc: r.overview,
        mediaType: "tv",
      });
    })
  );
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  if (ikPage(params) > 1) return []; // 站点搜索接口不分页
  var d = await ikJson("/api/suggest", { q: kw, limit: 20 }, "搜索");
  var rows = Array.isArray(d.items) ? d.items : [];
  return ikDedup(
    rows.map(function (r) {
      var id = String(r.id || ikIdFromUrl(r.href));
      var isShort = /^kp/i.test(id) || r.type === "short";
      var bits = [];
      if (r.typeLabel) bits.push(r.typeLabel);
      if (r.status) bits.push(r.status);
      return ikItem({
        kind: isShort ? "s" : "t",
        id: id,
        title: r.title,
        cover: r.poster || r.cover,
        rate: r.rate,
        year: r.year,
        types: Array.isArray(r.actors) ? r.actors : [],
        remarks: bits.join(" · "),
        mediaType: r.type === "movie" ? "movie" : "tv",
      });
    })
  );
}

// ---------- 详情 / 选集 / 播放 ----------

async function ikLines(ref) {
  var q;
  if (ref.kind === "s") {
    q = { name: ref.name, type: "short", kind: "short", shortId: ref.id, year: ref.year };
  } else {
    q = { title: ref.id };
  }
  var d = await ikJson("/api/lines", q, "播放源");
  var lines = Array.isArray(d.lines) ? d.lines : [];
  return lines.filter(function (l) {
    return l && Array.isArray(l.episodes) && l.episodes.length;
  });
}

function ikNorm(name) {
  return String(name || "").replace(/\s+/g, "").replace(/^第0*/, "第").toLowerCase();
}

// 选集：电影类（多数源只有 1 集「正片」）取第一条单集源；剧集类取集数最多的源
function ikIsFilm(lines) {
  var one = 0;
  for (var i = 0; i < lines.length; i++) if (lines[i].episodes.length === 1) one++;
  return lines.length > 0 && one * 2 >= lines.length;
}

function ikPrimary(lines) {
  if (!lines.length) return null;
  if (ikIsFilm(lines)) {
    for (var j = 0; j < lines.length; j++) if (lines[j].episodes.length === 1) return lines[j];
  }
  var best = null;
  for (var i = 0; i < lines.length; i++) {
    if (!best || lines[i].episodes.length > best.episodes.length) best = lines[i];
  }
  return best;
}

function ikFindEp(line, primary, idx) {
  var target = primary.episodes[idx];
  if (!target) return null;
  if (line === primary) return target;
  // 电影：各源的版本名不一样（正片/HD/TC…），取该源最后一个（通常是最清晰的正式版）
  if (primary.episodes.length === 1) return line.episodes.length <= 3 ? line.episodes[line.episodes.length - 1] : null;
  var key = ikNorm(target.name);
  for (var i = 0; i < line.episodes.length; i++) {
    if (ikNorm(line.episodes[i].name) === key) return line.episodes[i];
  }
  if (line.episodes.length === primary.episodes.length) return line.episodes[idx];
  return null;
}

async function ikResolve(u) {
  if (!u || typeof u !== "string") return null;
  if (u.indexOf("/api/") === 0) {
    var d = await ikJson(u.split("?")[0], ikParseQs(u), "解析");
    if (d && typeof d.url === "string" && d.url.indexOf("http") === 0) return { url: d.url, kind: d.kind || "" };
    return null;
  }
  if (u.indexOf("http") === 0) return { url: u, kind: /\.mp4(\?|$)/i.test(u) ? "mp4" : "hls" };
  return null;
}

function ikParseQs(u) {
  var out = {};
  var i = u.indexOf("?");
  if (i < 0) return out;
  var parts = u.slice(i + 1).split("&");
  for (var j = 0; j < parts.length; j++) {
    var p = parts[j];
    if (!p) continue;
    var e = p.indexOf("=");
    var k = e >= 0 ? p.slice(0, e) : p;
    var v = e >= 0 ? p.slice(e + 1) : "";
    try { out[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " ")); } catch (x) { out[k] = v; }
  }
  return out;
}

async function ikStreams(ref, epNo) {
  var lines = await ikLines(ref);
  if (!lines.length) return [];
  var primary = ikPrimary(lines);
  var idx = Math.max(0, (epNo || 1) - 1);
  var epName = primary.episodes[idx] ? primary.episodes[idx].name : "";
  var out = [];
  var seen = {};
  var apiResolved = 0;
  for (var i = 0; i < lines.length && out.length < 10; i++) {
    var ep = ikFindEp(lines[i], primary, idx);
    if (!ep || !ep.url) continue;
    if (ep.url.indexOf("/api/") === 0) {
      if (apiResolved >= 2) continue;
      apiResolved++;
    }
    var r = null;
    try { r = await ikResolve(ep.url); } catch (e) { r = null; }
    if (!r || seen[r.url]) continue;
    seen[r.url] = true;
    out.push({
      name: String(lines[i].sourceName || lines[i].sourceId || "线路" + (out.length + 1)),
      description: (epName || "第" + (idx + 1) + "集") + (r.kind === "mp4" ? " · MP4" : " · HLS"),
      url: r.url,
      customHeaders: { "User-Agent": IK_UA },
      playerType: "app",
    });
  }
  return out;
}

function ikMeta(html, key) {
  var re = new RegExp('<meta[^>]+(?:property|name)="' + key + '"[^>]+content="([^"]*)"', "i");
  var m = String(html || "").match(re);
  return m ? ikDecode(m[1]) : "";
}

function ikDecode(s) {
  return String(s || "")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function ikLd(html) {
  var re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  var m;
  while ((m = re.exec(String(html || "")))) {
    try {
      var j = JSON.parse(m[1]);
      var arr = Array.isArray(j) ? j : j && j["@graph"] ? j["@graph"] : [j];
      for (var i = 0; i < arr.length; i++) {
        var t = arr[i] && arr[i]["@type"];
        if (t === "Movie" || t === "TVSeries" || t === "TVSeason" || t === "CreativeWork") return arr[i];
      }
    } catch (e) {}
  }
  return null;
}

async function ikPageInfo(ref) {
  try {
    var path = ref.kind === "s" ? "/short/" + ref.id : "/title/" + ref.id;
    var res = await Widget.http.get(IK_ORIGIN + path, { headers: { "User-Agent": IK_UA, Accept: "text/html" } });
    var html = res && typeof res.data === "string" ? res.data : "";
    if (!html) return {};
    var ld = ikLd(html) || {};
    var title = ld.name || ikMeta(html, "og:title").split(/\s*[(（|]/)[0];
    var imgs = Array.isArray(ld.image) ? ld.image : ld.image ? [ld.image] : [];
    var poster = imgs.length > 1 ? imgs[1] : imgs[0] || "";
    var backdrop = imgs.length > 1 ? imgs[0] : ikMeta(html, "og:image");
    var actors = Array.isArray(ld.actor) ? ld.actor : [];
    var genres = Array.isArray(ld.genre) ? ld.genre : ld.genre ? [ld.genre] : [];
    var rating = ld.aggregateRating && ld.aggregateRating.ratingValue;
    return {
      title: title,
      desc: ld.description || ikMeta(html, "og:description"),
      poster: poster,
      backdrop: backdrop && backdrop.indexOf("og-image") < 0 ? backdrop : "",
      year: ld.datePublished ? String(ld.datePublished).slice(0, 4) : "",
      actors: actors.map(function (a) { return typeof a === "string" ? a : a && a.name; }).filter(Boolean),
      genres: genres,
      rating: rating,
      isMovie: ld["@type"] === "Movie",
    };
  } catch (e) {
    return {};
  }
}

async function loadDetail(link) {
  var ref = ikParseLink(link);
  if (!ref) return null;
  var both = await Promise.all([ikLines(ref), ikPageInfo(ref)]);
  var lines = both[0];
  var info = both[1] || {};
  var primary = ikPrimary(lines);
  var isMovie = ref.kind === "s" ? false : primary ? primary.episodes.length === 1 : !!info.isMovie;

  var base = ikMakeLink(ref.kind, 0, ref.id, ref.year || info.year, ref.name);
  var item = {
    id: base,
    type: "url",
    title: String(info.title || ref.name || ref.id),
    mediaType: isMovie ? "movie" : "tv",
    link: base,
  };
  if (info.desc) item.description = String(info.desc);
  var poster = ikImg(info.poster);
  if (poster) {
    item.posterPath = poster;
    item.coverUrl = poster;
  }
  var bd = ikImg(info.backdrop);
  if (bd) item.backdropPath = bd;
  if (info.year || ref.year) item.releaseDate = String(info.year || ref.year);
  if (ikNum(info.rating) != null) item.rating = ikNum(info.rating);
  if (info.genres && info.genres.length) item.genreTitle = info.genres.slice(0, 3).join(" / ");
  if (info.actors && info.actors.length) {
    item.peoples = info.actors.slice(0, 12).map(function (n, i) {
      return { id: "actor-" + i, title: String(n), role: "演员" };
    });
  }
  if (!primary) {
    item.description = (item.description ? item.description + "\n" : "") + "（暂无可用播放源）";
    return item;
  }
  if (primary.remarks) item.durationText = String(primary.remarks);

  item.episodeItems = primary.episodes.map(function (e, i) {
    var l = ikMakeLink(ref.kind, i + 1, ref.id, ref.year || info.year, ref.name);
    var ep = {
      id: l,
      type: "url",
      title: String(e.name || "第" + (i + 1) + "集"),
      mediaType: item.mediaType,
      episode: i + 1,
      link: l,
    };
    if (poster) ep.coverUrl = poster;
    return ep;
  });

  // 兜底：直接给一个能播的 videoUrl（点开的是某一集就给那一集，否则第 1 集）
  var playEp = ref.ep || 1;
  var target = ikFindEp(primary, primary, playEp - 1);
  var direct = null;
  for (var i = 0; i < lines.length && !direct; i++) {
    var ep = ikFindEp(lines[i], primary, playEp - 1);
    if (ep && ep.url && ep.url.indexOf("http") === 0) direct = ep.url;
  }
  if (!direct && target) {
    try {
      var r = await ikResolve(target.url);
      if (r) direct = r.url;
    } catch (e) {}
  }
  if (direct) {
    item.videoUrl = direct;
    item.playerType = "app";
  }
  if (ref.ep) {
    item.id = ikMakeLink(ref.kind, ref.ep, ref.id, ref.year || info.year, ref.name);
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var ref = ikParseLink(params.link || params.id);
  if (!ref) return [];
  var ep = ref.ep || parseInt(params.episode, 10) || 1;
  return ikStreams(ref, ep);
}
