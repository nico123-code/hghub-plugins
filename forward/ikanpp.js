/**
 * 影视聚合 · Rex / Forward 模块（ForwardWidget 格式）
 * 站点：爱看片片 https://www.ikanpp.com 、nnyy 努努影院 https://nnyy.in 、小蜜蜂影院 https://www.xmfyy.com 、爱看机器人 https://www.ikanbot.com
 * link 前缀：ik:（爱看片片，旧链接都是这个）/ nn:（努努影院）/ xm:（小蜜蜂影院）/ kb:（爱看机器人），详情/播放按前缀分发
 *  - 努努影院：分类页 HTML 解析（?country/genre/year/ob/page），播放走站点 /_gp/<id>/<集> 接口，直接给各线路 m3u8
 *  - 小蜜蜂影院：/filter 筛选页、/search 搜索页 HTML 解析，播放走站点 /api/play-url，iframe 线路跳过
 *  - 爱看机器人：/hot 豆瓣榜单页、/category 分类页、/search 搜索页 HTML 解析；播放页 current_id+e_token 按站点前端规则算 token，请求 /api/getResN 取全部线路 m3u8；豆瓣封面走 hghub-db 代理补 Referer
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
  icon: "https://hghub-icons.hghub-zhang.workers.dev/vod.png",
  iconUrl: "https://hghub-icons.hghub-zhang.workers.dev/vod.png",
  logo: "https://hghub-icons.hghub-zhang.workers.dev/vod.png",
  description: "影视聚合：爱看片片（电影/剧集/动漫/综艺/纪录片/短剧）+ nnyy 努努影院 + 小蜜蜂影院 + 爱看机器人（全网线路聚合），四站聚合搜索，多线路播放",
  author: "nico123-code",
  site: "https://github.com/nico123-code/hghub-plugins",
  version: "2026.11.24.1",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  modules: [
    {
      "id": "browse_movie",
      "title": "爱看片片·电影",
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
      "title": "爱看片片·剧集",
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
      "title": "爱看片片·动漫",
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
      "title": "爱看片片·综艺",
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
      "title": "爱看片片·纪录片",
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
      "title": "爱看片片·短剧",
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
      "id": "nn_dianying",
      "title": "nnyy·电影",
      "functionName": "loadNnList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "constant",
          "value": "dianying"
        },
        {
          "name": "ob",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新",
              "value": ""
            },
            {
              "title": "人气",
              "value": "click"
            },
            {
              "title": "评分",
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
              "title": "剧情",
              "value": "ju-qing"
            },
            {
              "title": "喜剧",
              "value": "xi-ju"
            },
            {
              "title": "爱情",
              "value": "ai-qing"
            },
            {
              "title": "动作",
              "value": "dong-zuo"
            },
            {
              "title": "惊悚",
              "value": "jing-song"
            },
            {
              "title": "犯罪",
              "value": "fan-zui"
            },
            {
              "title": "悬疑",
              "value": "xuan-yi"
            },
            {
              "title": "恐怖",
              "value": "kong-bu"
            },
            {
              "title": "科幻",
              "value": "ke-huan"
            },
            {
              "title": "奇幻",
              "value": "qi-huan"
            },
            {
              "title": "传记",
              "value": "chuan-ji"
            },
            {
              "title": "战争",
              "value": "zhan-zheng"
            },
            {
              "title": "家庭",
              "value": "jia-ting"
            },
            {
              "title": "冒险",
              "value": "mao-xian"
            },
            {
              "title": "人性",
              "value": "ren-xing"
            },
            {
              "title": "青春",
              "value": "qing-chun"
            },
            {
              "title": "历史",
              "value": "li-shi"
            },
            {
              "title": "文艺",
              "value": "wen-yi"
            },
            {
              "title": "温情",
              "value": "wen-qing"
            },
            {
              "title": "搞笑",
              "value": "gao-xiao"
            }
          ]
        },
        {
          "name": "country",
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
              "value": "cn"
            },
            {
              "title": "美国",
              "value": "us"
            },
            {
              "title": "香港",
              "value": "hk"
            },
            {
              "title": "台湾",
              "value": "tw"
            },
            {
              "title": "日本",
              "value": "jp"
            },
            {
              "title": "韩国",
              "value": "kr"
            },
            {
              "title": "英国",
              "value": "gb"
            },
            {
              "title": "法国",
              "value": "fr"
            },
            {
              "title": "德国",
              "value": "de"
            },
            {
              "title": "意大利",
              "value": "it"
            },
            {
              "title": "西班牙",
              "value": "es"
            },
            {
              "title": "印度",
              "value": "in"
            },
            {
              "title": "泰国",
              "value": "th"
            },
            {
              "title": "俄罗斯",
              "value": "ru"
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
              "title": "2010以前",
              "value": "lt__2010"
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
      "id": "nn_dianshiju",
      "title": "nnyy·电视剧",
      "functionName": "loadNnList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "constant",
          "value": "dianshiju"
        },
        {
          "name": "ob",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新",
              "value": ""
            },
            {
              "title": "人气",
              "value": "click"
            },
            {
              "title": "评分",
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
              "title": "剧情",
              "value": "ju-qing"
            },
            {
              "title": "爱情",
              "value": "ai-qing"
            },
            {
              "title": "喜剧",
              "value": "xi-ju"
            },
            {
              "title": "悬疑",
              "value": "xuan-yi"
            },
            {
              "title": "犯罪",
              "value": "fan-zui"
            },
            {
              "title": "古装",
              "value": "gu-zhuang"
            },
            {
              "title": "奇幻",
              "value": "qi-huan"
            },
            {
              "title": "惊悚",
              "value": "jing-song"
            },
            {
              "title": "科幻",
              "value": "ke-huan"
            },
            {
              "title": "家庭",
              "value": "jia-ting"
            },
            {
              "title": "动作",
              "value": "dong-zuo"
            },
            {
              "title": "历史",
              "value": "li-shi"
            },
            {
              "title": "青春",
              "value": "qing-chun"
            },
            {
              "title": "搞笑",
              "value": "gao-xiao"
            },
            {
              "title": "推理",
              "value": "tui-li"
            },
            {
              "title": "战争",
              "value": "zhan-zheng"
            },
            {
              "title": "人性",
              "value": "ren-xing"
            },
            {
              "title": "女性",
              "value": "nv-xing"
            },
            {
              "title": "同性",
              "value": "tong-xing"
            },
            {
              "title": "武侠",
              "value": "wu-xia"
            }
          ]
        },
        {
          "name": "country",
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
              "value": "cn"
            },
            {
              "title": "美国",
              "value": "us"
            },
            {
              "title": "香港",
              "value": "hk"
            },
            {
              "title": "台湾",
              "value": "tw"
            },
            {
              "title": "日本",
              "value": "jp"
            },
            {
              "title": "韩国",
              "value": "kr"
            },
            {
              "title": "英国",
              "value": "gb"
            },
            {
              "title": "法国",
              "value": "fr"
            },
            {
              "title": "德国",
              "value": "de"
            },
            {
              "title": "意大利",
              "value": "it"
            },
            {
              "title": "西班牙",
              "value": "es"
            },
            {
              "title": "印度",
              "value": "in"
            },
            {
              "title": "泰国",
              "value": "th"
            },
            {
              "title": "俄罗斯",
              "value": "ru"
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
              "title": "2010以前",
              "value": "lt__2010"
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
      "id": "nn_zongyi",
      "title": "nnyy·综艺",
      "functionName": "loadNnList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "constant",
          "value": "zongyi"
        },
        {
          "name": "ob",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新",
              "value": ""
            },
            {
              "title": "人气",
              "value": "click"
            },
            {
              "title": "评分",
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
              "value": "zhen-ren-xiu"
            },
            {
              "title": "脱口秀",
              "value": "tuo-kou-xiu"
            },
            {
              "title": "音乐",
              "value": "yin-le"
            },
            {
              "title": "搞笑",
              "value": "gao-xiao"
            },
            {
              "title": "喜剧",
              "value": "xi-ju"
            },
            {
              "title": "美食",
              "value": "mei-shi"
            },
            {
              "title": "温情",
              "value": "wen-qing"
            },
            {
              "title": "文化",
              "value": "wen-hua"
            },
            {
              "title": "歌舞",
              "value": "ge-wu"
            },
            {
              "title": "青春",
              "value": "qing-chun"
            },
            {
              "title": "爱情",
              "value": "ai-qing"
            },
            {
              "title": "家庭",
              "value": "jia-ting"
            },
            {
              "title": "选秀",
              "value": "xuan-xiu"
            }
          ]
        },
        {
          "name": "country",
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
              "value": "cn"
            },
            {
              "title": "美国",
              "value": "us"
            },
            {
              "title": "香港",
              "value": "hk"
            },
            {
              "title": "台湾",
              "value": "tw"
            },
            {
              "title": "日本",
              "value": "jp"
            },
            {
              "title": "韩国",
              "value": "kr"
            },
            {
              "title": "英国",
              "value": "gb"
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
              "title": "2010以前",
              "value": "lt__2010"
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
      "id": "nn_dongman",
      "title": "nnyy·动漫",
      "functionName": "loadNnList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "constant",
          "value": "dongman"
        },
        {
          "name": "ob",
          "title": "排序",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "最新",
              "value": ""
            },
            {
              "title": "人气",
              "value": "click"
            },
            {
              "title": "评分",
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
              "title": "喜剧",
              "value": "xi-ju"
            },
            {
              "title": "奇幻",
              "value": "qi-huan"
            },
            {
              "title": "冒险",
              "value": "mao-xian"
            },
            {
              "title": "剧情",
              "value": "ju-qing"
            },
            {
              "title": "科幻",
              "value": "ke-huan"
            },
            {
              "title": "动作",
              "value": "dong-zuo"
            },
            {
              "title": "搞笑",
              "value": "gao-xiao"
            },
            {
              "title": "爱情",
              "value": "ai-qing"
            },
            {
              "title": "家庭",
              "value": "jia-ting"
            },
            {
              "title": "儿童",
              "value": "er-tong"
            },
            {
              "title": "短片",
              "value": "duan-pian"
            },
            {
              "title": "温情",
              "value": "wen-qing"
            },
            {
              "title": "悬疑",
              "value": "xuan-yi"
            },
            {
              "title": "青春",
              "value": "qing-chun"
            },
            {
              "title": "热血",
              "value": "re-xue"
            },
            {
              "title": "成长",
              "value": "cheng-zhang"
            },
            {
              "title": "童年",
              "value": "tong-nian"
            },
            {
              "title": "治愈",
              "value": "zhi-yu"
            },
            {
              "title": "经典",
              "value": "jing-dian"
            },
            {
              "title": "犯罪",
              "value": "fan-zui"
            }
          ]
        },
        {
          "name": "country",
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
              "value": "cn"
            },
            {
              "title": "美国",
              "value": "us"
            },
            {
              "title": "香港",
              "value": "hk"
            },
            {
              "title": "台湾",
              "value": "tw"
            },
            {
              "title": "日本",
              "value": "jp"
            },
            {
              "title": "韩国",
              "value": "kr"
            },
            {
              "title": "英国",
              "value": "gb"
            },
            {
              "title": "法国",
              "value": "fr"
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
              "title": "2010以前",
              "value": "lt__2010"
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
      "id": "xm_2",
      "title": "小蜜蜂·电影",
      "functionName": "loadXmList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "channel",
          "title": "频道",
          "type": "constant",
          "value": "2"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "hot",
          "enumOptions": [
            {
              "title": "热度",
              "value": "hot"
            },
            {
              "title": "上映时间",
              "value": "time"
            },
            {
              "title": "评分",
              "value": "score"
            }
          ]
        },
        {
          "name": "type",
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
              "value": "43"
            },
            {
              "title": "喜剧",
              "value": "44"
            },
            {
              "title": "爱情",
              "value": "45"
            },
            {
              "title": "科幻",
              "value": "46"
            },
            {
              "title": "恐怖",
              "value": "47"
            },
            {
              "title": "剧情",
              "value": "48"
            },
            {
              "title": "战争",
              "value": "49"
            },
            {
              "title": "犯罪",
              "value": "50"
            },
            {
              "title": "惊悚",
              "value": "51"
            },
            {
              "title": "冒险",
              "value": "52"
            },
            {
              "title": "悬疑",
              "value": "53"
            },
            {
              "title": "动画",
              "value": "54"
            },
            {
              "title": "武侠",
              "value": "55"
            },
            {
              "title": "古装",
              "value": "56"
            },
            {
              "title": "历史",
              "value": "57"
            },
            {
              "title": "传记",
              "value": "58"
            },
            {
              "title": "纪录片",
              "value": "59"
            }
          ]
        },
        {
          "name": "area",
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
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "美国",
              "value": "美国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "法国",
              "value": "法国"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "德国",
              "value": "德国"
            },
            {
              "title": "印度",
              "value": "印度"
            },
            {
              "title": "其他",
              "value": "其他"
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
              "title": "其他",
              "value": "-1"
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
      "id": "xm_1",
      "title": "小蜜蜂·电视剧",
      "functionName": "loadXmList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "channel",
          "title": "频道",
          "type": "constant",
          "value": "1"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "hot",
          "enumOptions": [
            {
              "title": "热度",
              "value": "hot"
            },
            {
              "title": "上映时间",
              "value": "time"
            },
            {
              "title": "评分",
              "value": "score"
            }
          ]
        },
        {
          "name": "type",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "剧情",
              "value": "7"
            },
            {
              "title": "古装",
              "value": "9"
            },
            {
              "title": "战争",
              "value": "10"
            },
            {
              "title": "谍战",
              "value": "11"
            },
            {
              "title": "爱情",
              "value": "12"
            },
            {
              "title": "罪案",
              "value": "13"
            },
            {
              "title": "悬疑",
              "value": "14"
            },
            {
              "title": "家庭",
              "value": "15"
            },
            {
              "title": "军旅",
              "value": "16"
            },
            {
              "title": "喜剧",
              "value": "17"
            },
            {
              "title": "都市",
              "value": "18"
            },
            {
              "title": "武侠",
              "value": "19"
            },
            {
              "title": "言情",
              "value": "20"
            },
            {
              "title": "偶像",
              "value": "21"
            },
            {
              "title": "青春",
              "value": "22"
            },
            {
              "title": "农村",
              "value": "23"
            },
            {
              "title": "穿越",
              "value": "24"
            },
            {
              "title": "奇幻",
              "value": "25"
            },
            {
              "title": "历史",
              "value": "26"
            },
            {
              "title": "年代",
              "value": "27"
            },
            {
              "title": "科幻",
              "value": "28"
            },
            {
              "title": "生活",
              "value": "29"
            },
            {
              "title": "励志",
              "value": "31"
            },
            {
              "title": "婚姻",
              "value": "32"
            },
            {
              "title": "警匪",
              "value": "33"
            },
            {
              "title": "犯罪",
              "value": "34"
            },
            {
              "title": "推理",
              "value": "35"
            },
            {
              "title": "商战",
              "value": "36"
            },
            {
              "title": "宫廷",
              "value": "37"
            },
            {
              "title": "仙侠",
              "value": "38"
            },
            {
              "title": "神话",
              "value": "39"
            },
            {
              "title": "动作",
              "value": "40"
            },
            {
              "title": "复仇",
              "value": "41"
            },
            {
              "title": "惊悚",
              "value": "42"
            }
          ]
        },
        {
          "name": "area",
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
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "美国",
              "value": "美国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "法国",
              "value": "法国"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "德国",
              "value": "德国"
            },
            {
              "title": "印度",
              "value": "印度"
            },
            {
              "title": "其他",
              "value": "其他"
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
              "title": "其他",
              "value": "-1"
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
      "id": "xm_3",
      "title": "小蜜蜂·动漫",
      "functionName": "loadXmList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "channel",
          "title": "频道",
          "type": "constant",
          "value": "3"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "hot",
          "enumOptions": [
            {
              "title": "热度",
              "value": "hot"
            },
            {
              "title": "上映时间",
              "value": "time"
            },
            {
              "title": "评分",
              "value": "score"
            }
          ]
        },
        {
          "name": "type",
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
              "value": "60"
            },
            {
              "title": "恋爱",
              "value": "61"
            },
            {
              "title": "校园",
              "value": "62"
            },
            {
              "title": "搞笑",
              "value": "63"
            },
            {
              "title": "机甲",
              "value": "64"
            },
            {
              "title": "神魔",
              "value": "65"
            },
            {
              "title": "竞技",
              "value": "66"
            },
            {
              "title": "冒险",
              "value": "67"
            },
            {
              "title": "治愈",
              "value": "68"
            },
            {
              "title": "百合",
              "value": "69"
            },
            {
              "title": "萝莉",
              "value": "70"
            },
            {
              "title": "后宫",
              "value": "71"
            },
            {
              "title": "励志",
              "value": "72"
            },
            {
              "title": "泡面番",
              "value": "73"
            },
            {
              "title": "国产动漫",
              "value": "74"
            },
            {
              "title": "日本动漫",
              "value": "75"
            },
            {
              "title": "欧美动漫",
              "value": "76"
            }
          ]
        },
        {
          "name": "area",
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
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "美国",
              "value": "美国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "法国",
              "value": "法国"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "德国",
              "value": "德国"
            },
            {
              "title": "印度",
              "value": "印度"
            },
            {
              "title": "其他",
              "value": "其他"
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
              "title": "其他",
              "value": "-1"
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
      "id": "xm_4",
      "title": "小蜜蜂·综艺",
      "functionName": "loadXmList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "channel",
          "title": "频道",
          "type": "constant",
          "value": "4"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "hot",
          "enumOptions": [
            {
              "title": "热度",
              "value": "hot"
            },
            {
              "title": "上映时间",
              "value": "time"
            },
            {
              "title": "评分",
              "value": "score"
            }
          ]
        },
        {
          "name": "type",
          "title": "类型",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
            },
            {
              "title": "选秀",
              "value": "77"
            },
            {
              "title": "情感",
              "value": "78"
            },
            {
              "title": "访谈",
              "value": "79"
            },
            {
              "title": "播报",
              "value": "80"
            },
            {
              "title": "旅游",
              "value": "81"
            },
            {
              "title": "音乐",
              "value": "82"
            },
            {
              "title": "美食",
              "value": "83"
            },
            {
              "title": "纪实",
              "value": "84"
            },
            {
              "title": "曲艺",
              "value": "85"
            },
            {
              "title": "游戏",
              "value": "86"
            },
            {
              "title": "亲子",
              "value": "87"
            },
            {
              "title": "职场",
              "value": "88"
            },
            {
              "title": "脱口秀",
              "value": "89"
            },
            {
              "title": "真人秀",
              "value": "90"
            },
            {
              "title": "晚会",
              "value": "91"
            }
          ]
        },
        {
          "name": "area",
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
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "美国",
              "value": "美国"
            },
            {
              "title": "泰国",
              "value": "泰国"
            },
            {
              "title": "法国",
              "value": "法国"
            },
            {
              "title": "英国",
              "value": "英国"
            },
            {
              "title": "德国",
              "value": "德国"
            },
            {
              "title": "印度",
              "value": "印度"
            },
            {
              "title": "其他",
              "value": "其他"
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
              "title": "其他",
              "value": "-1"
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
      "id": "kb_hot_movie",
      "title": "爱看机器人·电影榜",
      "functionName": "loadKbHot",
      "cacheDuration": 300,
      "params": [
        {
          "name": "kind",
          "title": "类别",
          "type": "constant",
          "value": "movie"
        },
        {
          "name": "tag",
          "title": "标签",
          "type": "enumeration",
          "value": "热门",
          "enumOptions": [
            {
              "title": "热门",
              "value": "热门"
            },
            {
              "title": "最新",
              "value": "最新"
            },
            {
              "title": "经典",
              "value": "经典"
            },
            {
              "title": "豆瓣高分",
              "value": "豆瓣高分"
            },
            {
              "title": "冷门佳片",
              "value": "冷门佳片"
            },
            {
              "title": "华语",
              "value": "华语"
            },
            {
              "title": "欧美",
              "value": "欧美"
            },
            {
              "title": "韩国",
              "value": "韩国"
            },
            {
              "title": "日本",
              "value": "日本"
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
              "title": "恐怖",
              "value": "恐怖"
            },
            {
              "title": "动画",
              "value": "动画"
            },
            {
              "title": "豆瓣top250",
              "value": "豆瓣top250"
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
      "id": "kb_hot_tv",
      "title": "爱看机器人·剧集榜",
      "functionName": "loadKbHot",
      "cacheDuration": 300,
      "params": [
        {
          "name": "kind",
          "title": "类别",
          "type": "constant",
          "value": "tv"
        },
        {
          "name": "tag",
          "title": "标签",
          "type": "enumeration",
          "value": "热门",
          "enumOptions": [
            {
              "title": "热门",
              "value": "热门"
            },
            {
              "title": "国产剧",
              "value": "国产剧"
            },
            {
              "title": "港剧",
              "value": "港剧"
            },
            {
              "title": "韩剧",
              "value": "韩剧"
            },
            {
              "title": "日剧",
              "value": "日剧"
            },
            {
              "title": "美剧",
              "value": "美剧"
            },
            {
              "title": "英剧",
              "value": "英剧"
            },
            {
              "title": "综艺",
              "value": "综艺"
            },
            {
              "title": "日本动画",
              "value": "日本动画"
            },
            {
              "title": "纪录片",
              "value": "纪录片"
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
      "id": "kb_category",
      "title": "爱看机器人·最新入库",
      "functionName": "loadKbCategory",
      "cacheDuration": 300,
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "enumeration",
          "value": "1",
          "enumOptions": [
            {
              "title": "电影",
              "value": "1"
            },
            {
              "title": "剧集",
              "value": "2"
            },
            {
              "title": "动漫",
              "value": "18"
            },
            {
              "title": "综艺",
              "value": "19"
            },
            {
              "title": "纪录片",
              "value": "20"
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
      {
        "name": "site",
        "title": "站点",
        "type": "enumeration",
        "value": "all",
        "enumOptions": [
          {
            "title": "全部（爱看片片 + nnyy + 小蜜蜂 + 爱看机器人）",
            "value": "all"
          },
          {
            "title": "爱看片片",
            "value": "ik"
          },
          {
            "title": "nnyy（努努影院）",
            "value": "nn"
          },
          {
            "title": "小蜜蜂影院",
            "value": "xm"
          },
          {
            "title": "爱看机器人",
            "value": "kb"
          }
        ]
      },
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

async function ikSearch(params) {
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

async function ikLoadDetail(link) {
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

async function ikLoadResource(params) {
  params = params || {};
  var ref = ikParseLink(params.link || params.id);
  if (!ref) return [];
  var ep = ref.ep || parseInt(params.episode, 10) || 1;
  return ikStreams(ref, ep);
}

// =====================================================================
// 努努影院（nnyy.in）  link：nn:<分类>:<id>:<集slug，空=整部>
// 小蜜蜂影院（xmfyy.com） link：xm:<id>:<集序号，0=整部>
// =====================================================================

var NN_ORIGIN = "https://nnyy.in";
var XM_ORIGIN = "https://www.xmfyy.com";
var VS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var NN_LINE_NAMES = {
  bfzy: "暴风", mdzy: "魔都", ikzy: "iKun", hnzy: "红牛", gszy: "光速", jszy: "极速", ffzy: "非凡",
  lzzy: "量子", xlzy: "新浪", sdzy2: "闪电", zdzy2: "最大", ukzy: "U酷", wjzy: "无尽", wjzy2: "无尽", snzy: "索尼", jyzy: "金鹰",
  yhzy: "樱花", hhzy: "豪华", tkzy: "天空", sdzy: "闪电", wlzy: "卧龙", zyzy: "最大", bdzy: "百度",
};

function vsText(s) {
  return String(s || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); })
    .replace(/\s+/g, " ")
    .trim();
}

async function vsGet(url, headers, label) {
  var h = { "User-Agent": VS_UA, Accept: "text/html,application/json,*/*" };
  for (var k in headers || {}) h[k] = headers[k];
  var res = await Widget.http.get(url, { headers: h });
  if (!res) throw new Error((label || url) + " 无响应");
  if (res.statusCode && res.statusCode >= 400) throw new Error((label || url) + " HTTP " + res.statusCode);
  return res.data;
}

function vsPageNo(params) {
  var n = parseInt((params && params.page) || "1", 10);
  return isFinite(n) && n > 0 ? n : 1;
}

function vsDedup(list) {
  var seen = {};
  return list.filter(function (x) {
    if (!x || seen[x.id]) return false;
    seen[x.id] = true;
    return true;
  });
}

function vsQs(q) {
  var parts = [];
  for (var k in q) {
    if (q[k] === undefined || q[k] === null || q[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(q[k])));
  }
  return parts.length ? "?" + parts.join("&") : "";
}

// ---------------- 努努影院 ----------------

function nnParseLink(link) {
  var p = String(link || "").split(":");
  if (p[0] !== "nn" || p.length < 3) return null;
  if (!/^[a-z]+$/.test(p[1]) || !/^\d+$/.test(p[2])) return null;
  return { cat: p[1], id: p[2], ep: p[3] || "" };
}
function nnLink(cat, id, ep) {
  return ["nn", cat, id, ep || ""].join(":");
}
function nnImg(u) {
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return NN_ORIGIN + u;
  return u;
}

function nnParseList(html) {
  var out = [];
  var re = /<li[^>]*>\s*<a href="\/([a-z]+)\/(\d+)\.html" class="thumbnail"\s*>([\s\S]*?)<\/li>/g;
  var m;
  while ((m = re.exec(html))) {
    var cat = m[1], id = m[2], body = m[3];
    var img = (body.match(/data-src="([^"]+)"/) || body.match(/src="([^"]+)"/) || [])[1];
    var title = vsText((body.match(/<h2>\s*<a[^>]*>([\s\S]*?)<\/a>/) || [])[1] || (body.match(/alt="([^"]*)"/) || [])[1]);
    if (!title) continue;
    var spans = [];
    var cm = body.match(/<div class="countrie">([\s\S]*?)<\/div>/);
    if (cm) cm[1].replace(/<span[^>]*>([^<]*)<\/span>/g, function (_, t) { if (vsText(t)) spans.push(vsText(t)); return ""; });
    var note = vsText((body.match(/<div class="note"><span>([\s\S]*?)<\/span>/) || [])[1]);
    var link = nnLink(cat, id, "");
    var it = { id: link, type: "url", title: title, mediaType: cat === "dianying" ? "movie" : "tv", link: link };
    var cover = nnImg(img);
    if (cover) { it.posterPath = cover; it.coverUrl = cover; }
    if (spans[0] && /^\d{4}$/.test(spans[0])) it.releaseDate = spans[0];
    if (spans.length > 1) it.genreTitle = spans.slice(1).join(" / ");
    if (note) it.durationText = note;
    out.push(it);
  }
  return vsDedup(out);
}

async function loadNnList(params) {
  params = params || {};
  var cat = params.cat || "dianying";
  var q = { country: params.country, genre: params.genre, year: params.year, ob: params.ob };
  var page = vsPageNo(params);
  if (page > 1) q.page = page;
  var html = await vsGet(NN_ORIGIN + "/" + cat + "/" + vsQs(q), null, "努努影院列表");
  return nnParseList(String(html || ""));
}

async function nnSearch(kw, page) {
  if (page > 1) return []; // 站内搜索结果一页给全
  var html = await vsGet(NN_ORIGIN + "/so" + vsQs({ q: kw }), null, "努努影院搜索");
  return nnParseList(String(html || ""));
}

function nnField(html, label) {
  var re = new RegExp('<div class="product-excerpt">\\s*' + label + "[：:]\\s*<span>([\\s\\S]*?)</span>");
  var m = html.match(re);
  return m ? m[1] : "";
}

async function nnInfo(ref) {
  var html = String((await vsGet(NN_ORIGIN + "/" + ref.cat + "/" + ref.id + ".html", null, "努努影院详情")) || "");
  var title = vsText((html.match(/<img src="[^"]*" class="thumb detail-img" alt="([^"]*)"/) || [])[1]);
  if (!title) title = vsText((html.match(/<h1 class="product-title"[^>]*>([\s\S]*?)<span/) || [])[1]);
  var year = ((html.match(/<h1 class="product-title"[\s\S]*?\((\d{4})\)/) || [])[1]) || "";
  var cover = nnImg((html.match(/<img src="([^"]+)" class="thumb detail-img"/) || [])[1]);
  var names = function (s) {
    var a = [];
    s.replace(/<a[^>]*>([^<]*)<\/a>/g, function (_, t) { if (vsText(t)) a.push(vsText(t)); return ""; });
    return a;
  };
  var eps = [];
  var re = /ep_slug="([^"]+)"><a[^>]*>([^<]*)<\/a>/g, m;
  while ((m = re.exec(html))) eps.push({ slug: m[1], name: vsText(m[2]) });
  eps.reverse(); // 页面是倒序
  return {
    title: title, year: year, cover: cover,
    desc: vsText(nnField(html, "剧情简介")),
    genres: names(nnField(html, "类型")),
    actors: names(nnField(html, "主演")),
    eps: eps,
  };
}

async function nnPlays(ref, slug) {
  var d = await vsGet(NN_ORIGIN + "/_gp/" + ref.id + "/" + encodeURIComponent(slug), {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Referer: NN_ORIGIN + "/" + ref.cat + "/" + ref.id + ".html",
  }, "努努影院播放");
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  var plays = d && Array.isArray(d.video_plays) ? d.video_plays : [];
  return plays.filter(function (p) { return p && /^https?:\/\//.test(p.play_data || ""); });
}

// 常见大资源站排前面（播放器默认先试第一条）
var NN_PREFER = ["ikzy", "ffzy", "lzzy", "hnzy", "mdzy", "bfzy", "ukzy", "xlzy", "wjzy", "wjzy2", "snzy", "jyzy", "yhzy", "gszy", "jszy"];
function nnSort(plays) {
  var rank = function (p) { var i = NN_PREFER.indexOf(String(p.src_site || "")); return i < 0 ? 99 : i; };
  return plays.map(function (p, i) { return [p, i]; })
    .sort(function (a, b) { return rank(a[0]) - rank(b[0]) || a[1] - b[1]; })
    .map(function (x) { return x[0]; });
}

async function nnLoadDetail(link) {
  var ref = nnParseLink(link);
  if (!ref) return null;
  var info = await nnInfo(ref);
  var isMovie = ref.cat === "dianying";
  var base = nnLink(ref.cat, ref.id, "");
  var item = { id: base, type: "url", title: info.title || ref.id, mediaType: isMovie ? "movie" : "tv", link: base };
  if (info.desc) item.description = info.desc;
  if (info.cover) { item.posterPath = info.cover; item.coverUrl = info.cover; }
  if (info.year) item.releaseDate = info.year;
  if (info.genres.length) item.genreTitle = info.genres.slice(0, 3).join(" / ");
  if (info.actors.length) item.peoples = info.actors.slice(0, 12).map(function (n, i) { return { id: "actor-" + i, title: n, role: "演员" }; });
  if (!info.eps.length) {
    item.description = (item.description ? item.description + "\n" : "") + "（暂无可用播放源）";
    return item;
  }
  item.episodeItems = info.eps.map(function (e, i) {
    var l = nnLink(ref.cat, ref.id, e.slug);
    var ep = { id: l, type: "url", title: e.name || "第" + (i + 1) + "集", mediaType: item.mediaType, episode: i + 1, link: l };
    if (info.cover) ep.coverUrl = info.cover;
    return ep;
  });
  var slug = ref.ep || info.eps[0].slug;
  try {
    var plays = nnSort(await nnPlays(ref, slug));
    if (plays.length) { item.videoUrl = plays[0].play_data; item.playerType = "app"; }
  } catch (e) {}
  if (ref.ep) {
    item.id = nnLink(ref.cat, ref.id, ref.ep);
    item.link = item.id;
    var idx = info.eps.findIndex(function (e) { return e.slug === ref.ep; });
    if (idx >= 0) item.episode = idx + 1;
  }
  return item;
}

async function nnLoadResource(params) {
  var ref = nnParseLink(params.link || params.id);
  if (!ref) return [];
  var slug = ref.ep;
  if (!slug) {
    var info = await nnInfo(ref);
    var n = parseInt(params.episode, 10) || 1;
    var e = info.eps[n - 1] || info.eps[0];
    if (!e) return [];
    slug = e.slug;
  }
  var plays = nnSort(await nnPlays(ref, slug));
  var seen = {};
  var cnt = {};
  var out = [];
  plays.forEach(function (p) {
    if (seen[p.play_data]) return;
    seen[p.play_data] = true;
    var code = String(p.src_site || "");
    var nm = NN_LINE_NAMES[code] || code.toUpperCase() || "线路";
    cnt[nm] = (cnt[nm] || 0) + 1;
    out.push({
      name: cnt[nm] > 1 ? nm + cnt[nm] : nm,
      description: /\.mp4(\?|$)/i.test(p.play_data) ? "MP4" : "HLS",
      url: p.play_data,
      customHeaders: { "User-Agent": VS_UA },
      playerType: "app",
    });
  });
  return out;
}

// ---------------- 小蜜蜂影院 ----------------

function xmParseLink(link) {
  var p = String(link || "").split(":");
  if (p[0] !== "xm" || !/^\d+$/.test(p[1] || "")) return null;
  var ep = parseInt(p[2], 10);
  return { id: p[1], ep: isFinite(ep) && ep > 0 ? ep : 0 };
}
function xmLink(id, ep) {
  return ["xm", id, String(ep || 0)].join(":");
}

function xmItem(id, title, img, badge, sub, typeName) {
  var link = xmLink(id, 0);
  var it = { id: link, type: "url", title: title, mediaType: /电影/.test(typeName || "") ? "movie" : "tv", link: link };
  if (img) { it.posterPath = img; it.coverUrl = img; }
  if (badge) it.durationText = badge;
  if (sub) it.genreTitle = sub;
  return it;
}

function xmParseCards(html, channel) {
  var out = [];
  var re = /<a href="\/detail\/(\d+)\.html" class="text-decoration-none">\s*<div class="vod-card">([\s\S]*?)<\/a>/g, m;
  while ((m = re.exec(html))) {
    var b = m[2];
    var title = vsText((b.match(/<p class="vod-title[^"]*">([\s\S]*?)<\/p>/) || [])[1]);
    if (!title) continue;
    var img = (b.match(/<img src="([^"]+)"/) || [])[1] || "";
    var badge = vsText((b.match(/<span class="vod-badge[^"]*">([\s\S]*?)<\/span>/) || [])[1]);
    var sub = vsText((b.match(/<p class="vod-subtitle[^"]*">([\s\S]*?)<\/p>/) || [])[1]);
    out.push(xmItem(m[1], title, img, badge, sub, channel === "2" ? "电影" : ""));
  }
  return vsDedup(out);
}

function xmTotalPages(html) {
  var m = String(html).match(/data-totalpages="(\d+)"/);
  return m ? parseInt(m[1], 10) : 0;
}

async function loadXmList(params) {
  params = params || {};
  var ch = String(params.channel || "2");
  var page = vsPageNo(params);
  var html = String((await vsGet(XM_ORIGIN + "/filter" + vsQs({
    channel: ch, type: params.type, area: params.area, year: params.year, sort: params.sort || "hot", page: page,
  }), null, "小蜜蜂列表")) || "");
  var total = xmTotalPages(html);
  if (total && page > total) return [];
  return xmParseCards(html, ch);
}

async function xmSearch(kw, page) {
  var html = String((await vsGet(XM_ORIGIN + "/search" + vsQs({ keyword: kw, page: page > 1 ? page : "" }), null, "小蜜蜂搜索")) || "");
  var total = xmTotalPages(html);
  if (total && page > total) return [];
  var out = [];
  var parts = html.split('<div class="search-item">').slice(1);
  parts.forEach(function (b) {
    var id = (b.match(/href="\/detail\/(\d+)\.html"/) || [])[1];
    var title = vsText((b.match(/class="search-item-title[^"]*">([\s\S]*?)<\/a>/) || [])[1]);
    if (!id || !title) return;
    var img = (b.match(/<img src="([^"]+)"/) || [])[1] || "";
    var typeName = vsText((b.match(/<span class="search-item-type">([\s\S]*?)<\/span>/) || [])[1]);
    var metas = [];
    b.replace(/<span class="search-meta-label">([^<]*)<\/span>\s*<span class="search-meta-value">([\s\S]*?)<\/span>/g, function (_, k, v) { metas.push([vsText(k), vsText(v)]); return ""; });
    var it = xmItem(id, title, img, typeName, "", typeName);
    metas.forEach(function (kv) {
      if (/类型/.test(kv[0])) it.genreTitle = kv[1];
      if (/简介/.test(kv[0])) it.description = kv[1];
    });
    out.push(it);
  });
  return vsDedup(out);
}

async function xmInfo(id) {
  var html = String((await vsGet(XM_ORIGIN + "/detail/" + id + ".html", null, "小蜜蜂详情")) || "");
  var ld = null;
  var lm = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (lm) {
    try {
      var j = JSON.parse(lm[1]);
      var g = Array.isArray(j["@graph"]) ? j["@graph"] : [j];
      ld = g.find(function (x) { return x && /Series|Movie|CreativeWork|VideoObject/.test(x["@type"] || ""); }) || null;
    } catch (e) { ld = null; }
  }
  var crumbs = [];
  if (lm) { try { (JSON.parse(lm[1])["@graph"] || []).forEach(function (x) { if (x["@type"] === "BreadcrumbList") (x.itemListElement || []).forEach(function (c) { crumbs.push(c.name); }); }); } catch (e) {} }
  var tabs = [];
  html.replace(/<button class="source-tab[^"]*"\s*onclick="switchSource\(this\)" data-target="source-(\d+)">([\s\S]*?)<\/button>/g, function (_, i, n) { tabs[parseInt(i, 10)] = vsText(n); return ""; });
  var lines = [];
  var panels = html.split(/<div class="source-panel"\s+id="source-/).slice(1);
  panels.forEach(function (p) {
    var idx = parseInt(p, 10);
    var eps = [];
    var from = "";
    var re = /<a href="\/vodplay\/\d+-([A-Za-z0-9_]+)-(\d+)\.html"[^>]*>([\s\S]*?)<\/a>/g, m;
    var body = p.split(/<\/div>\s*<\/div>\s*<div class="source-panel"/)[0];
    while ((m = re.exec(body))) {
      from = m[1];
      eps.push({ index: parseInt(m[2], 10), name: vsText(m[3]) });
    }
    if (eps.length) lines.push({ name: tabs[idx] || from, from: from, eps: eps });
  });
  var info = { title: "", desc: "", cover: "", year: "", genres: [], actors: [], lines: lines, isMovie: crumbs[1] === "电影" };
  if (ld) {
    info.title = ld.name || "";
    info.desc = ld.description || "";
    info.cover = Array.isArray(ld.image) ? ld.image[0] : ld.image || "";
    info.year = String(ld.datePublished || ld.dateCreated || "").slice(0, 4);
    var ge = ld.genre;
    info.genres = Array.isArray(ge) ? ge : ge ? String(ge).split(/[,，]/) : [];
    var ac = ld.actor || [];
    info.actors = (Array.isArray(ac) ? ac : [ac]).map(function (a) { return typeof a === "string" ? a : a && a.name; }).filter(Boolean);
  }
  if (!info.title) info.title = vsText((html.match(/<title>《([^》]+)》/) || [])[1]);
  return info;
}

function xmPrimary(lines) {
  var best = null;
  lines.forEach(function (l) { if (!best || l.eps.length > best.eps.length) best = l; });
  return best;
}
function xmFindEp(line, primary, n) {
  var want = primary.eps[n - 1];
  if (!want) return null;
  var byName = line.eps.find(function (e) { return e.name === want.name; });
  return byName || line.eps[n - 1] || null;
}

async function xmLoadDetail(link) {
  var ref = xmParseLink(link);
  if (!ref) return null;
  var info = await xmInfo(ref.id);
  var primary = xmPrimary(info.lines);
  var isMovie = info.isMovie || (primary ? primary.eps.length === 1 : false);
  var base = xmLink(ref.id, 0);
  var item = { id: base, type: "url", title: info.title || ref.id, mediaType: isMovie ? "movie" : "tv", link: base };
  if (info.desc) item.description = info.desc;
  if (info.cover) { item.posterPath = info.cover; item.coverUrl = info.cover; }
  if (info.year) item.releaseDate = info.year;
  if (info.genres.length) item.genreTitle = info.genres.slice(0, 3).join(" / ");
  if (info.actors.length) item.peoples = info.actors.slice(0, 12).map(function (n, i) { return { id: "actor-" + i, title: n, role: "演员" }; });
  if (!primary) {
    item.description = (item.description ? item.description + "\n" : "") + "（暂无可用播放源）";
    return item;
  }
  item.episodeItems = primary.eps.map(function (e, i) {
    var l = xmLink(ref.id, i + 1);
    var ep = { id: l, type: "url", title: e.name || "第" + (i + 1) + "集", mediaType: item.mediaType, episode: i + 1, link: l };
    if (info.cover) ep.coverUrl = info.cover;
    return ep;
  });
  var n = ref.ep || 1;
  for (var i = 0; i < info.lines.length && !item.videoUrl && i < 3; i++) {
    var ep = xmFindEp(info.lines[i], primary, n);
    if (!ep) continue;
    try {
      var r = await xmPlayUrl(ref.id, info.lines[i].from, ep.index);
      if (r) { item.videoUrl = r.url; item.playerType = "app"; }
    } catch (e) {}
  }
  if (ref.ep) { item.id = xmLink(ref.id, ref.ep); item.link = item.id; item.episode = ref.ep; }
  return item;
}

async function xmPlayUrl(id, from, index) {
  var d = await vsGet(XM_ORIGIN + "/api/play-url" + vsQs({ vodId: id, playFrom: from, index: index }), {
    Accept: "application/json",
    Referer: XM_ORIGIN + "/vodplay/" + id + "-" + from + "-" + index + ".html",
  }, "小蜜蜂播放");
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || d.code !== 200 || !d.url) return null;
  if (d.mode && d.mode !== "native") return null; // iframe 线路拿不到直链，跳过
  return { url: d.url, headers: d.headers && typeof d.headers === "object" ? d.headers : null };
}

async function xmLoadResource(params) {
  var ref = xmParseLink(params.link || params.id);
  if (!ref) return [];
  var n = ref.ep || parseInt(params.episode, 10) || 1;
  var info = await xmInfo(ref.id);
  var primary = xmPrimary(info.lines);
  if (!primary) return [];
  var out = [];
  var seen = {};
  for (var i = 0; i < info.lines.length && i < 8; i++) {
    var ep = xmFindEp(info.lines[i], primary, n);
    if (!ep) continue;
    var r = null;
    try { r = await xmPlayUrl(ref.id, info.lines[i].from, ep.index); } catch (e) { r = null; }
    if (!r || seen[r.url]) continue;
    seen[r.url] = true;
    var h = { "User-Agent": VS_UA };
    if (r.headers) for (var k in r.headers) h[k] = r.headers[k];
    out.push({
      name: info.lines[i].name,
      description: (ep.name || "第" + n + "集") + (/\.mp4(\?|$)/i.test(r.url) ? " · MP4" : " · HLS"),
      url: r.url,
      customHeaders: h,
      playerType: "app",
    });
  }
  return out;
}

// ---------------- 分发：搜索 / 详情 / 播放 ----------------

var VS_SITES = { ik: "爱看片片", nn: "nnyy", xm: "小蜜蜂", kb: "爱看机器人" };

function vsTag(list, site) {
  return (list || []).map(function (x) {
    x.title = x.title + " · " + VS_SITES[site];
    return x;
  });
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var page = vsPageNo(params);
  var site = params.site || "all";
  var jobs = [];
  if (site === "all" || site === "ik") jobs.push(["ik", function () { return ikSearch({ keyword: kw, page: page }); }]);
  if (site === "all" || site === "nn") jobs.push(["nn", function () { return nnSearch(kw, page); }]);
  if (site === "all" || site === "xm") jobs.push(["xm", function () { return xmSearch(kw, page); }]);
  if (site === "all" || site === "kb") jobs.push(["kb", function () { return kbSearch(kw, page); }]);
  var results = await Promise.all(jobs.map(function (j) {
    return Promise.resolve().then(j[1]).then(function (r) { return vsTag(r, j[0]); }, function (e) {
      console.log("搜索失败 " + j[0] + "：" + (e && e.message));
      return [];
    });
  }));
  var out = [];
  results.forEach(function (r) { out = out.concat(r); });
  return out;
}

async function loadDetail(link) {
  var s = String(link || "");
  if (s.indexOf("nn:") === 0) return nnLoadDetail(s);
  if (s.indexOf("xm:") === 0) return xmLoadDetail(s);
  if (s.indexOf("kb:") === 0) return kbLoadDetail(s);
  return ikLoadDetail(s);
}

async function loadResource(params) {
  params = params || {};
  var s = String(params.link || params.id || "");
  if (s.indexOf("nn:") === 0) return nnLoadResource(params);
  if (s.indexOf("xm:") === 0) return xmLoadResource(params);
  if (s.indexOf("kb:") === 0) return kbLoadResource(params);
  return ikLoadResource(params);
}

// =====================================================================
// 爱看机器人（ikanbot.com） link：kb:<id>:<集序号，0=整部>
//  - 列表：/hot/index-<movie|tv>-<标签>[-p-N].html（豆瓣热门榜），/category/<分类>?p=N（最新入库）
//  - 搜索：/search?q=（下一页用页面里带游标 n 的链接）
//  - 播放：/play/<id> 页里的 current_id + e_token 按站点前端规则算出 token，再请求 /api/getResN
// =====================================================================

var KB_ORIGIN = "https://www.ikanbot.com";
var KB_IMG_PROXY = "https://hghub-db.hghub-zhang.workers.dev/?url=";

function kbParseLink(link) {
  var m = /^kb:(\d+)(?::(\d+))?$/.exec(String(link || ""));
  return m ? { id: m[1], ep: parseInt(m[2] || "0", 10) || 0 } : null;
}

function kbLink(id, ep) {
  return "kb:" + id + ":" + (ep || 0);
}

function kbImg(u) {
  u = String(u || "").trim();
  if (!u || /^data:/.test(u)) return "";
  if (u.indexOf("//") === 0) u = "https:" + u;
  if (u.charAt(0) === "/") u = KB_ORIGIN + u;
  // 豆瓣图床要豆瓣 Referer，否则 418，走代理补 Referer
  if (/^https:\/\/img\d*\.doubanio\.com\//i.test(u)) return KB_IMG_PROXY + encodeURIComponent(u);
  return u;
}

function kbItem(id, title, img, sub) {
  var l = kbLink(id, 0);
  var it = { id: l, type: "url", title: title || id, mediaType: "tv", link: l };
  var c = kbImg(img);
  if (c) { it.posterPath = c; it.coverUrl = c; }
  if (sub) it.description = sub;
  return it;
}

// 列表页（热门榜 / 分类页）卡片
function kbParseCards(html) {
  var out = [];
  var re = /<a class="item" href="\/play\/(\d+)"[\s\S]*?<img[^>]*?alt="([^"]*)"[^>]*?data-src="([^"]*)"[\s\S]*?<p>([\s\S]*?)<\/p>/g;
  var m;
  while ((m = re.exec(html))) out.push(kbItem(m[1], vsText(m[4]) || vsText(m[2]), m[3]));
  return vsDedup(out);
}

async function loadKbHot(params) {
  params = params || {};
  var kind = params.kind === "tv" ? "tv" : "movie";
  var tag = params.tag || "热门";
  var page = vsPageNo(params);
  var url = KB_ORIGIN + "/hot/index-" + kind + "-" + encodeURIComponent(tag) + (page > 1 ? "-p-" + page : "") + ".html";
  return kbParseCards(await vsGet(url, { Referer: KB_ORIGIN + "/" }, "爱看机器人列表"));
}

async function loadKbCategory(params) {
  params = params || {};
  var cat = params.cat || "1";
  var page = vsPageNo(params);
  var url = KB_ORIGIN + "/category/" + cat + (page > 1 ? "?p=" + page : "");
  return kbParseCards(await vsGet(url, { Referer: KB_ORIGIN + "/" }, "爱看机器人分类"));
}

function kbParseSearch(html) {
  var out = [];
  var re = /<a href="\/play\/(\d+)" class="cover-link">[\s\S]*?<img[^>]*?alt="([^"]*)"[^>]*?data-src="([^"]*)"[\s\S]*?class="title-text">([\s\S]*?)<\/a>([\s\S]*?)<\/div>/g;
  var m;
  while ((m = re.exec(html))) {
    var t = vsText(m[4]).replace(/\s+/g, " ");
    var rest = m[5];
    var lines = /\[(\d+)条线路/.exec(rest);
    var smalls = [];
    var sre = /<span class="small"[^>]*>([\s\S]*?)<\/span>/g, s;
    while ((s = sre.exec(rest))) { var v = vsText(s[1]); if (v) smalls.push(v); }
    var sub = (lines ? lines[1] + "条线路" : "") + (smalls.length ? (lines ? " · " : "") + smalls.join(" · ") : "");
    out.push(kbItem(m[1], t || vsText(m[2]), m[3], sub));
  }
  return vsDedup(out);
}

async function kbSearch(kw, page) {
  page = page > 0 ? page : 1;
  if (page > 5) return [];
  var url = KB_ORIGIN + "/search?q=" + encodeURIComponent(kw);
  var html = "";
  for (var i = 1; i <= page; i++) {
    html = await vsGet(url, { Referer: KB_ORIGIN + "/" }, "爱看机器人搜索");
    if (i === page) break;
    var nx = /href="(\/search\?q=[^"]*?p=(\d+)[^"]*)"/g, m, next = "";
    while ((m = nx.exec(html))) { if (parseInt(m[2], 10) === i + 1) { next = m[1].replace(/&amp;/g, "&"); break; } }
    if (!next) return [];
    url = KB_ORIGIN + next;
  }
  return kbParseSearch(html);
}

// 站点前端 get_tks()：取 id 末 4 位，每位 d → 跳过 d%3+1 个字符取 8 个
function kbToken(cid, etoken) {
  var d = String(cid).slice(-4);
  var parts = [];
  var e = String(etoken || "");
  for (var i = 0; i < d.length; i++) {
    var s = (parseInt(d[i], 10) % 3) + 1;
    parts.push(e.substring(s, s + 8));
    e = e.substring(s + 8);
  }
  return parts.join("");
}

var KB_FLAG_NAMES = { db: "豆瓣", xl: "新浪", gs: "光速", js: "极速", bfzy: "暴风", ff: "非凡", lz: "量子", hn: "红牛", ik: "iKun", wj: "无尽", md: "魔都", uk: "U酷", sn: "索尼", yh: "樱花", sd: "闪电", zd: "最大", jy: "金鹰", hh: "豪华", tk: "天空", wl: "卧龙", bd: "百度" };
function kbLineName(flag) {
  var f = String(flag || "").toLowerCase().replace(/m3u8$/, "");
  var k = f.replace(/zy\d*$/, "");
  return KB_FLAG_NAMES[f] || KB_FLAG_NAMES[k] || NN_LINE_NAMES[f] || NN_LINE_NAMES[k + "zy"] || (f ? f.toUpperCase() : "线路");
}

async function kbFetch(id) {
  var page = KB_ORIGIN + "/play/" + id;
  // 播放页带 Referer 反而会被拒（403 / 断开），这里不带
  var html = await vsGet(page, {}, "爱看机器人详情");
  var g = function (re) { var m = re.exec(html); return m ? m[1] : ""; };
  var cid = g(/id="current_id" value="(\d+)"/) || id;
  var et = g(/id="e_token" value="([^"]*)"/);
  var mtype = g(/id="mtype" value="(\d+)"/) || "1";
  var info = {
    id: cid,
    mtype: mtype,
    title: vsText(g(/<h2 class="meta title">([\s\S]*?)<\/h2>/)) || vsText(g(/<h1 id="video_title"[^>]*>([\s\S]*?)<\/h1>/)) || id,
    cover: kbImg(g(/property="og:image" content="([^"]*)"/) || g(/class="cover lazy" data-src="([^"]*)"/)),
    aka: "", year: "", area: "", director: "", actors: [],
  };
  var metas = [];
  var mre = /<h3 class="meta">([\s\S]*?)<\/h3>/g, mm;
  while ((mm = mre.exec(html))) metas.push(vsText(mm[1]));
  metas.forEach(function (v) {
    if (/^\d{4}$/.test(v)) info.year = v;
    else if (v.indexOf("/") >= 0 && !info.director) {
      var p = v.split("/");
      info.director = p[0];
      info.actors = (p[1] || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    } else if (!info.aka && metas.indexOf(v) === 0) info.aka = v;
    else if (!info.area) info.area = v;
  });
  var lines = [];
  if (et) {
    var d = await vsGet(KB_ORIGIN + "/api/getResN" + vsQs({ videoId: cid, mtype: mtype, token: kbToken(cid, et) }), {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Referer: page,
    }, "爱看机器人线路");
    if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { d = null; } }
    var list = d && d.state == 1 && d.data && Array.isArray(d.data.list) ? d.data.list : [];
    list.forEach(function (row) {
      var res = [];
      try { res = typeof row.resData === "string" ? JSON.parse(row.resData) : row.resData || []; } catch (e) { res = []; }
      (res || []).forEach(function (r) {
        var eps = [];
        String((r && r.url) || "").split("#").forEach(function (seg) {
          var i = seg.indexOf("$");
          if (i < 0) return;
          var nm = seg.slice(0, i).trim(), u = seg.slice(i + 1).trim();
          if (nm && /^https?:\/\/\S+m3u8$/i.test(u)) eps.push({ name: nm, url: u });
        });
        if (eps.length) lines.push({ name: kbLineName(r.flag), eps: eps });
      });
    });
  }
  info.lines = lines;
  return info;
}

function kbIsExtra(name) {
  return /预告|花絮|片花|彩蛋|先导|特辑|幕后/.test(name || "");
}

// 剧集：以集数最多的线路为准；电影：每条线路取正片
function kbEpisodes(info) {
  if (info.mtype == "1") return [{ name: "正片" }];
  var best = null;
  info.lines.forEach(function (l) {
    var n = l.eps.filter(function (e) { return !kbIsExtra(e.name); }).length;
    if (!best || n > best.n) best = { n: n, l: l };
  });
  if (!best) return [];
  return best.l.eps.filter(function (e) { return !kbIsExtra(e.name); }).map(function (e) { return { name: e.name }; });
}

function kbSources(info, epIndex) {
  var out = [];
  var seen = {};
  var cnt = {};
  var push = function (lineName, e, extra) {
    if (!e || seen[e.url]) return;
    seen[e.url] = true;
    cnt[lineName] = (cnt[lineName] || 0) + 1;
    out.push({
      name: (cnt[lineName] > 1 ? lineName + cnt[lineName] : lineName) + (extra ? " · " + e.name : ""),
      description: "HLS",
      url: e.url,
      customHeaders: { "User-Agent": VS_UA },
      playerType: "app",
    });
  };
  if (info.mtype == "1") {
    var trailers = [];
    info.lines.forEach(function (l) {
      l.eps.forEach(function (e) {
        if (kbIsExtra(e.name)) trailers.push([l.name, e]);
        else push(l.name, e, l.eps.length > 1);
      });
    });
    if (!out.length) trailers.forEach(function (t) { push(t[0], t[1], true); });
    return out;
  }
  var eps = kbEpisodes(info);
  var target = eps[epIndex - 1];
  if (!target) return out;
  info.lines.forEach(function (l) {
    var main = l.eps.filter(function (e) { return !kbIsExtra(e.name); });
    var hit = main.find(function (e) { return e.name === target.name; });
    if (!hit && main.length === eps.length) hit = main[epIndex - 1];
    push(l.name, hit, false);
  });
  return out;
}

async function kbLoadDetail(link) {
  var ref = kbParseLink(link);
  if (!ref) return null;
  var info = await kbFetch(ref.id);
  var isMovie = info.mtype == "1";
  var base = kbLink(ref.id, 0);
  var item = { id: base, type: "url", title: info.title, mediaType: isMovie ? "movie" : "tv", link: base };
  if (info.cover) { item.posterPath = info.cover; item.coverUrl = info.cover; }
  if (info.year) item.releaseDate = info.year;
  var desc = [];
  if (info.aka) desc.push("又名：" + info.aka);
  if (info.area) desc.push("地区：" + info.area);
  if (info.director) desc.push("导演：" + info.director);
  if (info.actors.length) desc.push("主演：" + info.actors.slice(0, 8).join("、"));
  desc.push("线路：" + info.lines.length + " 条");
  item.description = desc.join("\n");
  if (info.actors.length) item.peoples = info.actors.slice(0, 12).map(function (n, i) { return { id: "actor-" + i, title: n, role: "演员" }; });
  var eps = kbEpisodes(info);
  if (!eps.length || !info.lines.length) {
    item.description += "\n（暂无可用播放源）";
    return item;
  }
  item.episodeItems = eps.map(function (e, i) {
    var l = kbLink(ref.id, i + 1);
    var ep = { id: l, type: "url", title: e.name || "第" + (i + 1) + "集", mediaType: item.mediaType, episode: i + 1, link: l };
    if (info.cover) ep.coverUrl = info.cover;
    return ep;
  });
  var first = kbSources(info, ref.ep || 1);
  if (first.length) { item.videoUrl = first[0].url; item.playerType = "app"; }
  if (ref.ep) {
    item.id = kbLink(ref.id, ref.ep);
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function kbLoadResource(params) {
  var ref = kbParseLink(params.link || params.id);
  if (!ref) return [];
  var n = ref.ep || parseInt(params.episode, 10) || 1;
  var info = await kbFetch(ref.id);
  return kbSources(info, n);
}
