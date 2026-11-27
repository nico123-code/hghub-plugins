/**
 * 热门短剧 · Rex / Forward 模块（ForwardWidget 格式）
 * 来源：西瓜短剧 m.xgshort.com（站点公开接口 + 游客登录）+ PandFlix pandflix.com（短剧 / AI剧，JSON 接口）
 *  - 频道：短剧、AI短剧；筛选：排序 / 题材 / 年份 / 状态
 *  - PandFlix（置顶）：短剧（排序/题材/年份）、AI剧（排序/年份），link 前缀 pf:，直链 m3u8 多线路
 *  - 搜索走 Rex 自带搜索页（顶层 search），PandFlix 短剧 / AI剧 在前，西瓜 短剧 + AI短剧 在后
 *  - 分集与播放地址需要游客 token，模块自动领取并缓存（7 天）
 *  - 已过滤同性 / 男同题材
 */
WidgetMetadata = {
  "id": "hghub.xgshort",
  "title": "热门短剧",
  "icon": "https://m.xgshort.com/xiguaLogo.png",
  "iconUrl": "https://m.xgshort.com/xiguaLogo.png",
  "logo": "https://m.xgshort.com/xiguaLogo.png",
  "description": "热门短剧（PandFlix pandflix.com + 西瓜短剧 m.xgshort.com）：PandFlix 短剧 / AI剧、最新更新、短剧 / AI短剧，排序、题材、年份筛选，两站聚合搜索（PandFlix 在前），分集播放（已过滤男同题材）",
  "author": "nico123-code",
  "site": "https://github.com/nico123-code/hghub-plugins",
  "version": "2026.11.27.2",
  "requiredVersion": "0.0.2",
  "detailCacheDuration": 300,
  "modules": [
    {
      "id": "pf_short",
      "title": "PandFlix·短剧",
      "functionName": "loadPfList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "5"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time",
          "enumOptions": [
            {
              "title": "最新",
              "value": "time"
            },
            {
              "title": "最热",
              "value": "hits"
            },
            {
              "title": "评分最高",
              "value": "score"
            }
          ]
        },
        {
          "name": "cls",
          "title": "题材",
          "type": "enumeration",
          "value": "",
          "enumOptions": [
            {
              "title": "全部",
              "value": ""
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
              "title": "爱情",
              "value": "爱情"
            },
            {
              "title": "逆袭",
              "value": "逆袭"
            },
            {
              "title": "甜宠",
              "value": "甜宠"
            },
            {
              "title": "穿越",
              "value": "穿越"
            },
            {
              "title": "重生",
              "value": "重生"
            },
            {
              "title": "玄幻",
              "value": "玄幻"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "喜剧",
              "value": "喜剧"
            },
            {
              "title": "家庭",
              "value": "家庭"
            },
            {
              "title": "复仇",
              "value": "复仇"
            },
            {
              "title": "青春",
              "value": "青春"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "战神",
              "value": "战神"
            },
            {
              "title": "年代",
              "value": "年代"
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
      "id": "pf_ai",
      "title": "PandFlix·AI剧",
      "functionName": "loadPfList",
      "cacheDuration": 300,
      "params": [
        {
          "name": "type",
          "title": "频道",
          "type": "constant",
          "value": "21"
        },
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "time",
          "enumOptions": [
            {
              "title": "最新",
              "value": "time"
            },
            {
              "title": "最热",
              "value": "hits"
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

async function xgSearch(params) {
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
  // 预热：先让 Worker 把这一集的索引算好，播放器真正请求时直接命中（不等待结果）
  if (out.length) {
    try {
      var w = Widget.http.get(out[0].url, { headers: { Range: "bytes=0-1" } });
      if (w && w.catch) w.catch(function () {});
    } catch (e) {}
  }
  return out;
}

async function xgEpisodes(sid) {
  var d = await xgGet("/api/video/episodes", { seriesShortId: sid, size: 500 }, true);
  return (d && d.data) || {};
}

async function xgLoadDetail(link) {
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

async function xgLoadResource(params) {
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


// ---------------------------------------------------------------------------
// PandFlix pandflix.com 短剧 / AI剧   link：pf:<id>:<集序号，0=整部>
//  列表 GET /api/vod/browse?type=5|21&cls=&year=&sort=&page=&limit=30（JSON）
//  搜索 GET /api/vod/search?wd=&page=（全站混合，只保留 短剧 / AI剧）
//  详情 GET /api/vod/detail/<id>（sources[].episodes[].url 直链 m3u8，带全站播放成功率）
//  已过滤：站点「同性」分类的全部条目（构建时抓取 ID）+ 标题关键词
// ---------------------------------------------------------------------------
var PF_ORIGIN = "https://pandflix.com";
var PF_PREFIX = "pf:";
var PF_LIMIT = 30;
var PF_TYPES = { "5": "短剧", "21": "AI剧" };
var PF_BLOCK = {};
var PF_BLOCK_IDS = [30087, 29806, 18812, 5299, 24391, 676, 244202, 22802, 181726, 241566, 189193, 252074, 242812, 242360, 244119, 6426, 25524, 24535, 30996, 5302, 276427, 244808, 245004, 242258, 253375, 251290, 15545, 252717, 25449, 26793, 3124, 8401, 6376, 1408, 559, 16093, 6479, 107136, 6465, 44682, 7879, 45173, 6438, 45892, 172124, 46696, 172322, 172371, 172287, 172407, 172408, 172421, 172441, 172442, 172449, 172372, 172505, 8371, 172485, 172615, 172542, 6487, 6472, 2367, 27559, 6471, 6464, 41921, 6477, 36824, 45446, 46193, 47720, 6406, 32115, 6455, 133433, 50059, 117676, 243695];
PF_BLOCK_IDS.forEach(function (i) { PF_BLOCK[String(i)] = 1; });
var PF_FROM_NAMES = {
  ffm3u8: "非凡", rym3u8: "如意", bfzym3u8: "暴风", gsm3u8: "光速", lzm3u8: "量子", wjm3u8: "无尽", wolong: "卧龙",
  hnm3u8: "红牛", ikm3u8: "iKun", jsm3u8: "极速", sdm3u8: "闪电", yhm3u8: "樱花", tkm3u8: "天空", snm3u8: "索尼",
  "1080zyk": "1080资源", xlm3u8: "新浪", jinyingm3u8: "金鹰", hhm3u8: "豪华", mdm3u8: "魔都", zuidam3u8: "最大",
};

function pfText(s) {
  return String(s == null ? "" : s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function pfParseLink(link) {
  var m = /^pf:(\d+)(?::(\d+))?$/.exec(String(link || ""));
  return m ? { id: m[1], ep: parseInt(m[2] || "0", 10) || 0 } : null;
}
function pfLink(id, ep) { return PF_PREFIX + id + ":" + (ep || 0); }
function pfImg(u) {
  u = String(u || "").trim();
  if (!u || /^data:/.test(u)) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return PF_ORIGIN + u;
  return u;
}
function pfBlocked(x) {
  if (!x) return true;
  if (PF_BLOCK[String(x.id)]) return true;
  return XG_BLOCK_RE.test(String(x.name || "")) || /同性/.test(String(x.cls || x.className || ""));
}
function pfItem(x) {
  if (!x || !x.id || pfBlocked(x)) return null;
  var l = pfLink(x.id, 0);
  var it = { id: l, type: "url", title: pfText(x.name) || String(x.id), mediaType: "tv", link: l };
  var c = pfImg(x.picture);
  if (c) { it.posterPath = c; it.coverUrl = c; }
  var b = pfImg(x.backdrop);
  if (b) it.backdropPath = b;
  var bits = ["PandFlix"];
  if (x.typeName) bits.push(String(x.typeName));
  if (x.remarks) bits.push(pfText(x.remarks));
  it.durationText = bits.join(" · ");
  if (x.year) it.releaseDate = String(x.year);
  var sc = Number(x.doubanScore) || parseFloat(x.score) || 0;
  if (sc) it.rating = sc;
  if (x.content) it.description = pfText(x.content);
  return it;
}
function pfMap(list) {
  var out = [], seen = {};
  (list || []).forEach(function (x) {
    var it = pfItem(x);
    if (it && !seen[it.id]) { seen[it.id] = 1; out.push(it); }
  });
  return out;
}
async function pfJson(path, label) {
  var res = await Widget.http.get(PF_ORIGIN + path, { headers: { "User-Agent": XG_UA, Accept: "application/json", Referer: PF_ORIGIN + "/" } });
  var d = xgJson(res);
  if (!d) throw new Error(label + " 无响应" + (res && res.statusCode ? "（HTTP " + res.statusCode + "）" : ""));
  return d;
}

async function loadPfList(params) {
  params = params || {};
  var type = String(params.type || "5");
  if (params.cls === "同性") return [];
  var page = xgPage(params);
  var sort = params.sort || "time";
  var d = await pfJson("/api/vod/browse" + xgQuery({
    type: type, cls: params.cls, year: params.year, sort: sort === "time" ? "" : sort, page: page, limit: PF_LIMIT,
  }), "PandFlix 列表");
  if (!Array.isArray(d.items)) return [];
  if (d.total && (page - 1) * PF_LIMIT >= d.total) return [];
  return pfMap(d.items);
}

async function pfSearch(kw, page) {
  var d = await pfJson("/api/vod/search" + xgQuery({ wd: kw, page: page > 1 ? page : "" }), "PandFlix 搜索");
  if (!Array.isArray(d.items)) return [];
  if (d.pageCount && page > d.pageCount) return [];
  return pfMap(d.items.filter(function (x) { return PF_TYPES[String(x.typeId)]; }));
}

var PF_CACHE = {};
async function pfInfo(id) {
  var c = PF_CACHE[id];
  if (c && Date.now() - c.at < 300000) return c.d;
  var d = await pfJson("/api/vod/detail/" + id, "PandFlix 详情");
  PF_CACHE[id] = { at: Date.now(), d: d };
  return d;
}
// 线路：无水印优先，再按全站首播成功率排序
function pfLines(d) {
  var lines = (d.sources || []).filter(function (s) { return s && Array.isArray(s.episodes) && s.episodes.length; });
  function rate(s) {
    var h = (s.episodes[0] && s.episodes[0].health) || {};
    return typeof h.successRate === "number" ? h.successRate : 0.5;
  }
  lines.sort(function (a, b) {
    // clean 优先，含广告 / 水印的排后
    var wa = a.kind && a.kind !== "clean" ? 1 : 0, wb = b.kind && b.kind !== "clean" ? 1 : 0;
    if (wa !== wb) return wa - wb;
    return rate(b) - rate(a);
  });
  return lines;
}
function pfPrimary(lines) {
  var best = null;
  lines.forEach(function (l) { if (!best || l.episodes.length > best.episodes.length) best = l; });
  return best;
}
function pfFindEp(line, primary, n) {
  var want = primary.episodes[n - 1];
  if (want) {
    for (var i = 0; i < line.episodes.length; i++) if (line.episodes[i].name === want.name) return line.episodes[i];
  }
  // 只有「全集」一条的线路只在整部只有 1 集时可用
  if (line.episodes.length === 1 && primary.episodes.length > 1) return null;
  return line.episodes[n - 1] || null;
}
function pfSources(d, n, max) {
  var lines = pfLines(d);
  var primary = pfPrimary(lines);
  if (!primary) return [];
  var out = [], seen = {};
  for (var i = 0; i < lines.length && out.length < (max || 8); i++) {
    var ep = pfFindEp(lines[i], primary, n);
    if (!ep || !ep.url || seen[ep.url]) continue;
    seen[ep.url] = true;
    var sid = ep.sourceId || lines[i].id || "";
    var nm = PF_FROM_NAMES[sid] || sid || lines[i].name;
    var h = ep.health || {};
    var desc = (ep.name || "第" + n + "集") + (/\.mp4(\?|$)/i.test(ep.url) ? " · MP4" : " · HLS");
    if (lines[i].kind === "watermark") desc += " · 有水印";
    else if (lines[i].kind === "ad") desc += " · 含广告";
    if (typeof h.successRate === "number" && h.samples > 20) desc += " · 成功率 " + Math.round(h.successRate * 100) + "%";
    out.push({ name: "线路" + (out.length + 1) + "（" + nm + "）", description: desc, url: ep.url, customHeaders: { "User-Agent": XG_UA }, playerType: "app" });
  }
  return out;
}

async function pfLoadDetail(link) {
  var ref = pfParseLink(link);
  if (!ref) return null;
  var d = await pfInfo(ref.id);
  var item = pfItem(d);
  if (!item) return null;
  var lines = pfLines(d);
  var primary = pfPrimary(lines);
  if (d.typeName) item.genreTitle = d.typeName;
  var desc = [];
  var meta = [d.remarks, d.year, d.area, d.typeName].filter(Boolean).map(pfText).join(" · ");
  if (meta) desc.push(meta);
  var actors = String(d.actors || "").split(/[,，、\/]/).map(pfText).filter(Boolean);
  if (actors.length) desc.push("主演：" + actors.slice(0, 8).join("、"));
  if (d.content) desc.push(pfText(d.content));
  item.description = desc.join("\n");
  if (actors.length) item.peoples = actors.slice(0, 12).map(function (n, i) { return { id: "actor-" + i, title: n, role: "演员" }; });
  if (!primary) {
    item.description += "\n（暂无可用播放源）";
    return item;
  }
  item.episodeItems = primary.episodes.map(function (e, i) {
    var l = pfLink(ref.id, i + 1);
    var ep = { id: l, type: "url", title: e.name || "第" + (i + 1) + "集", mediaType: "tv", episode: i + 1, link: l };
    if (item.coverUrl) ep.coverUrl = item.coverUrl;
    return ep;
  });
  item.durationText += " · " + item.episodeItems.length + "集";
  var first = pfSources(d, ref.ep || 1, 1);
  if (first.length) { item.videoUrl = first[0].url; item.playerType = "app"; }
  if (ref.ep) { item.id = pfLink(ref.id, ref.ep); item.link = item.id; item.episode = ref.ep; }
  return item;
}

async function pfLoadResource(params) {
  var ref = pfParseLink(params.link || params.id);
  if (!ref) return [];
  var n = ref.ep || parseInt(params.episode, 10) || 1;
  var d = await pfInfo(ref.id);
  return pfSources(d, n, 8);
}

// ---------------------------------------------------------------------------
// 分发：pf: → PandFlix，其余 → 西瓜短剧
// ---------------------------------------------------------------------------
async function loadDetail(link) {
  if (String(link || "").indexOf(PF_PREFIX) === 0) return pfLoadDetail(link);
  return xgLoadDetail(link);
}
async function loadResource(params) {
  params = params || {};
  if (String(params.link || params.id || "").indexOf(PF_PREFIX) === 0) return pfLoadResource(params);
  return xgLoadResource(params);
}
// 搜索：PandFlix 短剧 / AI剧在前，西瓜短剧在后
async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var out = [];
  try { out = await pfSearch(kw, xgPage(params)); } catch (e) { console.log("[热门短剧] PandFlix 搜索失败:", e && e.message); }
  try { out = out.concat(await xgSearch(params)); } catch (e) { console.log("[热门短剧] 西瓜搜索失败:", e && e.message); }
  return out;
}
