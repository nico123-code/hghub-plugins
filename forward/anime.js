/**
 * 动漫聚合 · Rex / Forward 模块（ForwardWidget 格式）
 * 收录站点：
 *  - girigiri爱动漫  ani.girigirilove.com（苹果CMS 接口 https://m3u8.girigirilove.com/api.php，不加密的 m3u8/mp4 直链）
 *  - AGE动漫        www.agedm.io（HTML 解析；播放走站点自己的解析页，取明文 m3u8，VIP 加密线路跳过）
 *  - 稀饭动漫        next.xifanacg.com（列表解析站点页面；搜索/详情/播放用站点前端自己的公开接口，匿名 key 运行时从站点前端脚本读取）
 * 链接格式：<站>:<id>:<集序号>，站 = gg / age / xf
 */
WidgetMetadata = {
  "id": "hghub.anime",
  "title": "动漫聚合",
  "icon": "https://hghub-icons.hghub-zhang.workers.dev/anime.png",
  "description": "动漫聚合：girigiri（新番时间表/分类）、AGE（最近更新/目录筛选）、稀饭（最近更新/时间表/目录筛选），三站聚合搜索，多线路播放",
  "author": "nico123-code",
  "site": "https://github.com/nico123-code/hghub-plugins",
  "version": "2026.11.23.6",
  "requiredVersion": "0.0.2",
  "detailCacheDuration": 300,
  "modules": [
    {
      "id": "gg_week",
      "title": "girigiri·新番时间表",
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
      "id": "gg_jp",
      "title": "girigiri·日番",
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
      "id": "gg_us",
      "title": "girigiri·美番",
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
      "id": "gg_movie",
      "title": "girigiri·剧场版",
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
      "id": "gg_live",
      "title": "girigiri·真人番剧",
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
      "id": "gg_bd",
      "title": "girigiri·BD副音轨",
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
      "id": "gg_other",
      "title": "girigiri·演唱会·其他",
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
      "id": "age_update",
      "title": "AGE·最近更新",
      "functionName": "loadAgeUpdate",
      "cacheDuration": 300,
      "params": [
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "age_catalog",
      "title": "AGE·番剧目录",
      "functionName": "loadAgeCatalog",
      "cacheDuration": 300,
      "params": [
        {
          "name": "order",
          "title": "排序",
          "type": "enumeration",
          "value": "time",
          "enumOptions": [
            {
              "title": "最近更新",
              "value": "time"
            },
            {
              "title": "点击量",
              "value": "点击量"
            }
          ]
        },
        {
          "name": "version",
          "title": "版本",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "TV",
              "value": "TV"
            },
            {
              "title": "剧场版",
              "value": "剧场版"
            },
            {
              "title": "OVA",
              "value": "OVA"
            }
          ]
        },
        {
          "name": "region",
          "title": "地区",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "日本",
              "value": "日本"
            },
            {
              "title": "中国",
              "value": "中国"
            },
            {
              "title": "欧美",
              "value": "欧美"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
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
              "title": "2000以前",
              "value": "2000以前"
            }
          ]
        },
        {
          "name": "season",
          "title": "季度",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "1月",
              "value": "1"
            },
            {
              "title": "4月",
              "value": "4"
            },
            {
              "title": "7月",
              "value": "7"
            },
            {
              "title": "10月",
              "value": "10"
            }
          ]
        },
        {
          "name": "tag",
          "title": "类型",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "搞笑",
              "value": "搞笑"
            },
            {
              "title": "运动",
              "value": "运动"
            },
            {
              "title": "励志",
              "value": "励志"
            },
            {
              "title": "热血",
              "value": "热血"
            },
            {
              "title": "战斗",
              "value": "战斗"
            },
            {
              "title": "竞技",
              "value": "竞技"
            },
            {
              "title": "校园",
              "value": "校园"
            },
            {
              "title": "青春",
              "value": "青春"
            },
            {
              "title": "爱情",
              "value": "爱情"
            },
            {
              "title": "恋爱",
              "value": "恋爱"
            },
            {
              "title": "冒险",
              "value": "冒险"
            },
            {
              "title": "后宫",
              "value": "后宫"
            },
            {
              "title": "百合",
              "value": "百合"
            },
            {
              "title": "治愈",
              "value": "治愈"
            },
            {
              "title": "萝莉",
              "value": "萝莉"
            },
            {
              "title": "魔法",
              "value": "魔法"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "推理",
              "value": "推理"
            },
            {
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "游戏",
              "value": "游戏"
            },
            {
              "title": "神魔",
              "value": "神魔"
            },
            {
              "title": "恐怖",
              "value": "恐怖"
            },
            {
              "title": "血腥",
              "value": "血腥"
            },
            {
              "title": "机战",
              "value": "机战"
            },
            {
              "title": "战争",
              "value": "战争"
            },
            {
              "title": "犯罪",
              "value": "犯罪"
            },
            {
              "title": "历史",
              "value": "历史"
            },
            {
              "title": "社会",
              "value": "社会"
            },
            {
              "title": "职场",
              "value": "职场"
            },
            {
              "title": "剧情",
              "value": "剧情"
            },
            {
              "title": "伪娘",
              "value": "伪娘"
            },
            {
              "title": "耽美",
              "value": "耽美"
            },
            {
              "title": "童年",
              "value": "童年"
            },
            {
              "title": "教育",
              "value": "教育"
            },
            {
              "title": "亲子",
              "value": "亲子"
            },
            {
              "title": "真人",
              "value": "真人"
            },
            {
              "title": "歌舞",
              "value": "歌舞"
            },
            {
              "title": "肉番",
              "value": "肉番"
            },
            {
              "title": "美少女",
              "value": "美少女"
            },
            {
              "title": "轻小说",
              "value": "轻小说"
            },
            {
              "title": "吸血鬼",
              "value": "吸血鬼"
            },
            {
              "title": "女性向",
              "value": "女性向"
            },
            {
              "title": "泡面番",
              "value": "泡面番"
            },
            {
              "title": "欢乐向",
              "value": "欢乐向"
            }
          ]
        },
        {
          "name": "status",
          "title": "状态",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "连载",
              "value": "连载"
            },
            {
              "title": "完结",
              "value": "完结"
            },
            {
              "title": "未播放",
              "value": "未播放"
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
      "id": "xf_recent",
      "title": "稀饭·最近更新",
      "functionName": "loadXfRecent",
      "cacheDuration": 300,
      "params": [
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "xf_week",
      "title": "稀饭·新番时间表",
      "functionName": "loadXfWeek",
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
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "xf_browse",
      "title": "稀饭·番剧目录",
      "functionName": "loadXfBrowse",
      "cacheDuration": 300,
      "params": [
        {
          "name": "sort",
          "title": "排序",
          "type": "enumeration",
          "value": "release_date",
          "enumOptions": [
            {
              "title": "最新",
              "value": "release_date"
            },
            {
              "title": "新上架",
              "value": "created_at"
            },
            {
              "title": "热度",
              "value": "view_count"
            },
            {
              "title": "评分",
              "value": "bangumi_score"
            },
            {
              "title": "名称",
              "value": "title"
            }
          ]
        },
        {
          "name": "format",
          "title": "类型",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "TV 动画",
              "value": "tv"
            },
            {
              "title": "剧场版",
              "value": "movie"
            },
            {
              "title": "OVA",
              "value": "ova"
            },
            {
              "title": "OAD",
              "value": "oad"
            },
            {
              "title": "Web 动画",
              "value": "web"
            },
            {
              "title": "其他",
              "value": "other"
            }
          ]
        },
        {
          "name": "tag",
          "title": "题材",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
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
              "title": "奇幻",
              "value": "奇幻"
            },
            {
              "title": "战斗",
              "value": "战斗"
            },
            {
              "title": "原创",
              "value": "原创"
            },
            {
              "title": "恋爱",
              "value": "恋爱"
            },
            {
              "title": "校园",
              "value": "校园"
            },
            {
              "title": "日常",
              "value": "日常"
            },
            {
              "title": "百合",
              "value": "百合"
            },
            {
              "title": "后宫",
              "value": "后宫"
            },
            {
              "title": "科幻",
              "value": "科幻"
            },
            {
              "title": "游戏改",
              "value": "游戏改"
            },
            {
              "title": "悬疑",
              "value": "悬疑"
            },
            {
              "title": "冒险",
              "value": "冒险"
            },
            {
              "title": "穿越",
              "value": "穿越"
            },
            {
              "title": "音乐",
              "value": "音乐"
            },
            {
              "title": "运动",
              "value": "运动"
            },
            {
              "title": "机战",
              "value": "机战"
            },
            {
              "title": "喜剧",
              "value": "喜剧"
            },
            {
              "title": "少年向",
              "value": "少年向"
            },
            {
              "title": "推理",
              "value": "推理"
            },
            {
              "title": "少女向",
              "value": "少女向"
            },
            {
              "title": "职场",
              "value": "职场"
            },
            {
              "title": "美食",
              "value": "美食"
            },
            {
              "title": "青年向",
              "value": "青年向"
            }
          ]
        },
        {
          "name": "year",
          "title": "年份",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
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
              "title": "更早",
              "value": "older"
            }
          ]
        },
        {
          "name": "finished",
          "title": "状态",
          "type": "enumeration",
          "value": "all",
          "enumOptions": [
            {
              "title": "全部",
              "value": "all"
            },
            {
              "title": "连载中",
              "value": "0"
            },
            {
              "title": "完结",
              "value": "1"
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
        "name": "site",
        "title": "站点",
        "type": "enumeration",
        "value": "all",
        "enumOptions": [
          {
            "title": "全部（girigiri + AGE + 稀饭）",
            "value": "all"
          },
          {
            "title": "girigiri",
            "value": "gg"
          },
          {
            "title": "AGE",
            "value": "age"
          },
          {
            "title": "稀饭",
            "value": "xf"
          }
        ]
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

async function ggLoadList(params) {
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

async function ggLoadWeek(params) {
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

async function ggSearch(params) {
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

async function ggLoadDetail(link) {
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

async function ggLoadResource(params) {
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


// ======================================================================
// 通用
// ======================================================================
var AN_UA = GG_UA;

function anDecode(s) {
  return ggDecode(String(s == null ? "" : s).replace(/<br\s*\/?>/gi, "\n").replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); }));
}

async function anHtml(url, referer) {
  var res = await Widget.http.get(url, {
    headers: { "User-Agent": AN_UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8", Referer: referer || url },
  });
  var body = res && res.data;
  if (typeof body !== "string") body = body == null ? "" : String(body);
  return body;
}

// link 格式：<站>:<id>:<集序号,0=整部>，站 = gg / age / xf
function anParseLink(link) {
  var m = String(link || "").match(/^(gg|age|xf):([A-Za-z0-9_-]+):(\d+)$/);
  if (!m) return null;
  return { site: m[1], id: m[2], ep: parseInt(m[3], 10) || 0 };
}
function anMakeLink(site, id, ep) {
  return site + ":" + id + ":" + (ep || 0);
}

function anEpTitle(name, idx) {
  name = String(name || "").trim();
  if (/^\d+(\.\d+)?$/.test(name)) return "第" + name + "集";
  return name || "第" + (idx + 1) + "集";
}

function anPage(params) {
  return ggPage(params);
}

// 在某条线路上找“同一集”：先按集名对齐，找不到再按序号（集数一样时）
function anFindEp(line, primary, idx) {
  var target = primary.episodes[idx];
  if (!target) return null;
  if (line === primary) return target;
  for (var i = 0; i < line.episodes.length; i++) {
    if (line.episodes[i].name === target.name) return line.episodes[i];
  }
  return line.episodes.length === primary.episodes.length ? line.episodes[idx] : null;
}

function anPrimary(lines) {
  var best = null;
  for (var i = 0; i < lines.length; i++) {
    if (!best || lines[i].episodes.length > best.episodes.length) best = lines[i];
  }
  return best;
}

function anFmt(url) {
  return /\.mp4(\?|$)/i.test(url) ? "MP4" : "HLS";
}

// ======================================================================
// AGE 动漫（www.agedm.io）
// ======================================================================
var AGE_SITE = "https://www.agedm.io";

function ageAbs(u) {
  u = anDecode(u);
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return AGE_SITE + u;
  return u;
}

// 目录页 / 搜索页的卡片（cata_video_item）
function ageParseCards(html) {
  var out = [];
  var seen = {};
  var parts = html.split('class="card cata_video_item');
  for (var i = 1; i < parts.length; i++) {
    var p = parts[i];
    var id = (p.match(/\/detail\/(\d+)/) || [])[1];
    if (!id || seen[id]) continue;
    seen[id] = true;
    var title = anDecode((p.match(/class="card-title"><a[^>]*>([^<]+)</) || p.match(/title="([^"]+)"/) || [])[1]);
    if (!title) continue;
    var link = anMakeLink("age", id, 0);
    var it = { id: link, type: "url", title: title, mediaType: "tv", link: link };
    var cover = ageAbs((p.match(/data-original="([^"]+)"/) || [])[1]);
    if (cover) { it.posterPath = cover; it.coverUrl = cover; }
    var st = anDecode((p.match(/video_play_status[^>]*>([^<]*)</) || [])[1]);
    if (st) it.durationText = st;
    var kind = anDecode((p.match(/动画种类：<\/span>([^<]*)</) || [])[1]);
    if (kind === "剧场版") it.mediaType = "movie";
    var year = (p.match(/首播时间：<\/span>(\d{4})/) || [])[1];
    if (year) it.releaseDate = year;
    var desc = anDecode((p.match(/class="video_detail_info desc[^"]*"[^>]*>([\s\S]*?)<\/div>/) || [])[1]);
    if (desc) it.description = desc;
    it.genreTitle = "AGE" + (kind ? " / " + kind : "");
    out.push(it);
  }
  return out;
}

// 最近更新页的卡片（video_item）
function ageParseUpdate(html) {
  var out = [];
  var seen = {};
  var parts = html.split('class="video_item"');
  for (var i = 1; i < parts.length; i++) {
    var p = parts[i];
    var m = p.match(/href="[^"]*\/detail\/(\d+)"[^>]*>([^<]+)</);
    if (!m || seen[m[1]]) continue;
    seen[m[1]] = true;
    var link = anMakeLink("age", m[1], 0);
    var it = { id: link, type: "url", title: anDecode(m[2]), mediaType: "tv", link: link, genreTitle: "AGE" };
    var cover = ageAbs((p.match(/data-original="([^"]+)"/) || [])[1]);
    if (cover) { it.posterPath = cover; it.coverUrl = cover; }
    var st = anDecode((p.match(/video_item--info[^>]*>([^<]*)</) || [])[1]);
    if (st) it.durationText = st;
    out.push(it);
  }
  return out;
}

function ageMaxPage(html, re) {
  var max = 1;
  var m;
  while ((m = re.exec(html))) {
    var n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

async function ageSearch(kw, page) {
  var html = await anHtml(AGE_SITE + "/search?query=" + encodeURIComponent(kw) + (page > 1 ? "&page=" + page : ""), AGE_SITE + "/");
  var max = ageMaxPage(html, /[?&;]page=(\d+)/g);
  if (page > max) return [];
  return ageParseCards(html);
}

async function loadAgeUpdate(params) {
  if (anPage(params) > 1) return [];
  var html = await anHtml(AGE_SITE + "/update", AGE_SITE + "/");
  return ageParseUpdate(html);
}

async function loadAgeCatalog(params) {
  params = params || {};
  var page = anPage(params);
  var seg = [
    params.version || "all",
    params.year || "all",
    "all",
    params.tag || "all",
    "all",
    params.order || "time",
    String(page),
    params.region || "all",
    params.season || "all",
    params.status || "all",
  ];
  var path = "/catalog/" + seg.map(function (s) { return encodeURIComponent(s); }).join("-");
  var html = await anHtml(AGE_SITE + path, AGE_SITE + "/");
  var max = ageMaxPage(html, /\/catalog\/[^"]*?-(?:time|%E7%82%B9%E5%87%BB%E9%87%8F|点击量)-(\d+)/g);
  if (page > max) return [];
  return ageParseCards(html);
}

async function ageDetailRaw(id) {
  var html = await anHtml(AGE_SITE + "/detail/" + id, AGE_SITE + "/");
  if (html.indexOf("video_detail_wrapper") < 0) throw new Error("AGE：找不到这部番");
  // 线路名
  var names = {};
  var vip = {};
  var re = /data-bs-target="#playlist-source-([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
  var m;
  while ((m = re.exec(html))) {
    if (/VIP/.test(m[2])) vip[m[1]] = true;
    names[m[1]] = anDecode(m[2].replace(/<span[^>]*>[\s\S]*?<\/span>/g, "")) || m[1];
  }
  var lines = [];
  var panes = html.split('id="playlist-source-');
  for (var i = 1; i < panes.length; i++) {
    var key = panes[i].slice(0, panes[i].indexOf('"'));
    var body = panes[i].slice(0, panes[i].indexOf("</ul>"));
    var eps = [];
    var r2 = /href="([^"]*\/play\/\d+\/\d+\/\d+)"[^>]*>([^<]*)</g;
    var e;
    while ((e = r2.exec(body))) eps.push({ name: anDecode(e[2]), url: ageAbs(e[1]) });
    if (eps.length) lines.push({ from: key, name: names[key] || key, vip: !!vip[key], episodes: eps });
  }
  var info = {};
  var r3 = /detail_imform_tag">([^<：]+)：<\/span><span class="detail_imform_value">([^<]*)</g;
  while ((m = r3.exec(html))) info[m[1]] = anDecode(m[2]);
  return {
    id: id,
    title: anDecode((html.match(/<meta property="og:title" content="([^"]+)"/) || [])[1]).replace(/\s*-\s*AGE动漫\s*$/, ""),
    cover: ageAbs((html.match(/video_detail_cover">\s*<img[^>]*data-original="([^"]+)"/) || [])[1]),
    desc: anDecode((html.match(/class="video_detail_desc[^"]*">([\s\S]*?)<\/div>/) || [])[1]),
    info: info,
    lines: lines,
  };
}

// 播放页 → 站点自己的解析页 → 直链（解析页里的 Vurl 是明文 http 地址时才用；VIP 线路是加密的，跳过）
async function ageResolve(playUrl) {
  var html = await anHtml(playUrl, AGE_SITE + "/");
  var src = (html.match(/id="iframeForVideo"[^>]*src="([^"]+)"/) || [])[1];
  if (!src) return null;
  src = anDecode(src);
  var direct = src.match(/[?&]url=(https?[^&]+)/);
  if (direct) {
    var d = decodeURIComponent(direct[1]);
    if (/\.(m3u8|mp4)(\?|$)/i.test(d)) return d;
  }
  if (src.indexOf("/vip/") >= 0) return null;
  var jx = await anHtml(src, AGE_SITE + "/");
  var v = (jx.match(/var\s+Vurl\s*=\s*['"]([^'"]+)['"]/) || [])[1];
  if (v && /^https?:\/\//i.test(v)) return v;
  return null;
}

// ======================================================================
// 稀饭动漫（next.xifanacg.com）
//  列表：站点自己的页面（/recent /schedule /browse）
//  搜索 / 详情 / 播放：站点前端自己用的公开接口（rpc/search_animes、rpc/get_anime_detail、
//  functions/v1/issue-web-playback action=fallback，和网页未登录时一样）
//  接口用的是站点前端公开下发的匿名 key：运行时从站点自己的前端脚本里读，不写死在模块里
// ======================================================================
var XF_SITE = "https://next.xifanacg.com";
var XF_API = "https://api.xifanacg.com";
var XF_KEY_STORE = "hghub_anime_xf_key";

function xfCover(u, size) {
  u = String(u || "");
  if (!u) return "";
  if (/\/r\/\d+\/pic\//.test(u)) return u.replace(/\/r\/\d+\/pic\//, "/r/" + (size || 400) + "/pic/");
  return u.replace(/(https?:\/\/[^/]+)\/pic\//, "$1/r/" + (size || 400) + "/pic/");
}

async function xfKey(force) {
  if (!force) {
    try {
      var c = Widget.storage.get(XF_KEY_STORE);
      if (c && typeof c === "string") c = JSON.parse(c);
      if (c && c.k && Date.now() - c.t < 24 * 3600 * 1000) return c.k;
    } catch (e) {}
  }
  var html = await anHtml(XF_SITE + "/", XF_SITE + "/");
  var chunks = [];
  var re = /src="(\/_next\/static\/chunks\/[A-Za-z0-9_.-]+\.js)"/g;
  var m;
  while ((m = re.exec(html))) if (chunks.indexOf(m[1]) < 0) chunks.push(m[1]);
  var rk = /"https:\/\/api\.xifanacg\.com","(sb_publishable_[A-Za-z0-9_-]+)"/;
  var rk2 = /(sb_publishable_[A-Za-z0-9_-]{10,})/;
  // 从后往前、5 个一批并发找（key 一般在比较靠后的大包里）
  chunks.reverse();
  for (var i = 0; i < chunks.length; i += 5) {
    var batch = chunks.slice(i, i + 5);
    var found = await Promise.all(batch.map(function (c) {
      return anHtml(XF_SITE + c, XF_SITE + "/").then(function (js) {
        var k = (js.match(rk) || js.match(rk2) || [])[1];
        return k || null;
      }, function () { return null; });
    }));
    for (var j = 0; j < found.length; j++) {
      if (found[j]) {
        try { Widget.storage.set(XF_KEY_STORE, JSON.stringify({ k: found[j], t: Date.now() })); } catch (e) {}
        return found[j];
      }
    }
  }
  throw new Error("稀饭：读取站点接口配置失败");
}

async function xfPost(path, body, retried) {
  var k = await xfKey(!!retried);
  var res = await Widget.http.post(XF_API + path, body || {}, {
    headers: {
      "User-Agent": AN_UA,
      "Content-Type": "application/json",
      apikey: k,
      Authorization: "Bearer " + k,
      Origin: XF_SITE,
      Referer: XF_SITE + "/",
    },
  });
  var code = res && (res.statusCode || res.status);
  if ((code === 401 || code === 403) && !retried) return xfPost(path, body, true);
  var d = res && res.data;
  if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) {} }
  return d;
}

function xfItem(a) {
  var link = anMakeLink("xf", String(a.id), 0);
  var it = { id: link, type: "url", title: anDecode(a.title), mediaType: a.format === "movie" ? "movie" : "tv", link: link };
  var c = xfCover(a.cover_url);
  if (c) { it.posterPath = c; it.coverUrl = c; }
  if (a.release_year) it.releaseDate = String(a.release_year);
  if (a.bangumi_score) it.rating = Number(a.bangumi_score) || undefined;
  if (a.description) it.description = String(a.description).replace(/\r/g, "");
  var g = ["稀饭"];
  if (a.anime_type && a.anime_type.name) g.push(a.anime_type.name);
  it.genreTitle = g.join(" / ");
  if (a.current_episodes != null) {
    it.durationText = a.is_finished ? "全 " + (a.total_episodes || a.current_episodes) + " 集" : "更新至 " + a.current_episodes + (a.total_episodes ? " / " + a.total_episodes : "");
  }
  return it;
}

// 站点页面里的卡片：<a aria-label="名字" href="/anime/<id>"> … <img src=封面> … 评分/集数
function xfParseCards(html) {
  var out = [];
  var seen = {};
  var re = /<a aria-label="([^"]*)"[^>]*href="\/anime\/(\d+)"[^>]*>([\s\S]*?)<\/a>/g;
  var m;
  while ((m = re.exec(html))) {
    if (seen[m[2]]) continue;
    seen[m[2]] = true;
    var body = m[3];
    var link = anMakeLink("xf", m[2], 0);
    var it = { id: link, type: "url", title: anDecode(m[1]), mediaType: "tv", link: link, genreTitle: "稀饭" };
    var c = xfCover((body.match(/ src="(https?:\/\/[^"]+)"/) || [])[1]);
    if (c) { it.posterPath = c; it.coverUrl = c; }
    var sc = (body.match(/aria-label="评分 ([\d.]+)"/) || [])[1];
    if (sc) it.rating = Number(sc);
    var txt = anDecode(body.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
    var st = (txt.match(/(更新至 [\d.]+(?: \/ \d+)?|全 \d+ 集|EP[\d.]+)/) || [])[1];
    if (st) it.durationText = st;
    var y = (txt.match(/· (\d{4})/) || [])[1];
    if (y) it.releaseDate = y;
    if (/剧场版/.test(txt)) it.mediaType = "movie";
    out.push(it);
  }
  return out;
}

async function loadXfRecent(params) {
  if (anPage(params) > 1) return [];
  return xfParseCards(await anHtml(XF_SITE + "/recent", XF_SITE + "/"));
}

async function loadXfWeek(params) {
  params = params || {};
  if (anPage(params) > 1) return [];
  var w = String(params.week || "today");
  if (w === "today") {
    var d = new Date(Date.now() + 8 * 3600 * 1000).getUTCDay();
    w = d === 0 ? "7" : String(d);
  }
  var idx = parseInt(w, 10) - 1; // 站点 day-0 = 周一
  var html = await anHtml(XF_SITE + "/schedule", XF_SITE + "/");
  var start = html.indexOf('id="day-' + idx + '"');
  if (start < 0) return [];
  var end = html.indexOf('id="day-' + (idx + 1) + '"', start);
  if (end < 0) end = html.indexOf("</main>", start);
  return xfParseCards(html.slice(start, end > 0 ? end : undefined));
}

async function loadXfBrowse(params) {
  params = params || {};
  var page = anPage(params);
  var q = [];
  if (params.sort && params.sort !== "title") q.push("sort=" + encodeURIComponent(params.sort));
  if (params.format && params.format !== "all") q.push("format=" + encodeURIComponent(params.format));
  if (params.tag && params.tag !== "all") q.push("tag=" + encodeURIComponent(params.tag));
  if (params.year && params.year !== "all") {
    if (params.year === "older") q.push("older=1");
    else q.push("year=" + encodeURIComponent(params.year));
  }
  if (params.finished && params.finished !== "all") q.push("finished=" + encodeURIComponent(params.finished));
  if (page > 1) q.push("page=" + page);
  var res = await Widget.http.get(XF_SITE + "/browse" + (q.length ? "?" + q.join("&") : ""), {
    headers: { "User-Agent": AN_UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8", Referer: XF_SITE + "/" },
  });
  var html = res && res.data;
  if (typeof html !== "string") return [];
  return xfParseCards(html); // 越界页站点返回 400 / 空列表
}

async function xfSearch(kw, page) {
  var d = await xfPost("/rest/v1/rpc/search_animes", { search_term: kw, page_number: page, items_per_page: 24 });
  if (!Array.isArray(d)) return [];
  return d.map(xfItem);
}

function xfEpName(e, i) {
  if (e.kind === "main" && e.episode_number != null) {
    var n = Number(e.episode_number);
    return "第" + (n % 1 === 0 ? n.toFixed(0) : String(n)) + "集";
  }
  return anDecode(e.title) || "第" + (i + 1) + "集";
}

async function xfDetailRaw(id) {
  var d = await xfPost("/rest/v1/rpc/get_anime_detail", { p_id: parseInt(id, 10) });
  if (Array.isArray(d)) d = d[0];
  if (!d || !d.anime) throw new Error("稀饭：找不到这部番（可能需要登录才能看）");
  var a = d.anime;
  var lines = [];
  (d.sources || []).forEach(function (s) {
    var eps = (s.episodes || []).map(function (e, i) {
      var t = anDecode(e.title);
      return { name: xfEpName(e, i), title: t, url: e.id + ":" + s.id };
    });
    if (eps.length) lines.push({ from: s.code, name: anDecode(s.name) || s.code, episodes: eps });
  });
  var info = {};
  if (a.format === "movie") info["动画种类"] = "剧场版";
  if (a.region) info["地区"] = a.region;
  if (Array.isArray(a.meta_tags) && a.meta_tags.length) info["标签"] = a.meta_tags.filter(function (t) { return t !== "TV" && t !== a.region; }).join(" ");
  if (a.release_date) info["首播时间"] = a.release_date;
  return {
    id: String(a.id || id),
    title: anDecode(a.title),
    cover: xfCover(a.cover_url, 600),
    desc: String(a.description || "").replace(/\r/g, ""),
    info: info,
    lines: lines,
  };
}

async function xfResolve(epUrl) {
  var p = String(epUrl || "").split(":");
  var body = { action: "fallback", episode_id: parseInt(p[0], 10) };
  if (p[1]) body.source_id = parseInt(p[1], 10);
  var d = await xfPost("/functions/v1/issue-web-playback", body);
  if (!d || !d.ok) return null;
  var u = d.url || (d.candidates && d.candidates[0] && d.candidates[0].url);
  if (!u || !/^https?:\/\//i.test(u)) return null;
  try { u = encodeURI(decodeURI(u)); } catch (e) {}
  return u;
}

// ======================================================================
// 统一的 搜索 / 详情 / 播放
// ======================================================================
function anTag(items, name) {
  return (items || []).map(function (it) {
    if (!it) return it;
    it.title = it.title + " · " + name;
    if (!it.genreTitle || it.genreTitle.indexOf(name) < 0) it.genreTitle = name + (it.genreTitle ? " / " + it.genreTitle : "");
    return it;
  });
}

async function ggSearchItems(kw, page) {
  var items = await ggList({ vod_name: kw }, page);
  return items.map(function (it) {
    var r = ggParseLink(it.link);
    if (r) { it.id = anMakeLink("gg", r.id, 0); it.link = it.id; }
    return it;
  });
}

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var page = anPage(params);
  var site = String(params.site || "all");
  var jobs = [];
  if (site === "all" || site === "gg") jobs.push(ggSearchItems(kw, page).then(function (r) { return anTag(r, "girigiri"); }));
  if (site === "all" || site === "age") jobs.push(ageSearch(kw, page).then(function (r) { return anTag(r, "AGE"); }));
  if (site === "all" || site === "xf") jobs.push(xfSearch(kw, page).then(function (r) { return anTag(r, "稀饭"); }));
  var results = await Promise.all(jobs.map(function (j) { return j.catch(function () { return []; }); }));
  var out = [];
  results.forEach(function (r) { out = out.concat(r || []); });
  return out;
}

// 列表里的 girigiri 条目统一成 gg:<id>:<ep>
function ggFix(items) {
  return (items || []).map(function (it) {
    var r = ggParseLink(it && it.link);
    if (r) { it.id = anMakeLink("gg", r.id, r.ep); it.link = it.id; }
    return it;
  });
}
async function loadList(params) { return ggFix(await ggLoadList(params)); }
async function loadWeek(params) { return ggFix(await ggLoadWeek(params)); }

function anBuildDetail(site, raw, ref, siteName) {
  var base = anMakeLink(site, raw.id, 0);
  var primary = anPrimary(raw.lines);
  var isMovie = !!(primary && primary.episodes.length === 1 && raw.info && raw.info["动画种类"] === "剧场版");
  var item = { id: base, type: "url", title: raw.title || String(raw.id), mediaType: isMovie ? "movie" : "tv", link: base };
  if (raw.cover) { item.posterPath = raw.cover; item.coverUrl = raw.cover; item.backdropPath = raw.cover; }
  if (raw.desc) item.description = raw.desc;
  var g = [siteName];
  if (raw.info) {
    ["动画种类", "地区", "标签"].forEach(function (k) { if (raw.info[k]) g.push(raw.info[k].split(/\s+/)[0]); });
    var y = String(raw.info["首播时间"] || "").match(/\d{4}/);
    if (y) item.releaseDate = y[0];
  }
  item.genreTitle = g.join(" / ");
  if (!primary) {
    item.description = (item.description ? item.description + "\n" : "") + "（暂无可用播放源）";
    return item;
  }
  item.episodeItems = primary.episodes.map(function (e, i) {
    var l = anMakeLink(site, raw.id, i + 1);
    var ep = { id: l, type: "url", title: anEpTitle(e.name, i), mediaType: item.mediaType, episode: i + 1, link: l };
    if (raw.cover) ep.coverUrl = raw.cover;
    return ep;
  });
  if (ref.ep) {
    item.id = anMakeLink(site, raw.id, ref.ep);
    item.link = item.id;
    item.episode = ref.ep;
  }
  return item;
}

async function loadDetail(link) {
  var ref = anParseLink(link);
  if (!ref) {
    var g0 = ggParseLink(link);
    if (!g0) return null;
    ref = { site: "gg", id: g0.id, ep: g0.ep };
  }
  if (ref.site === "gg") {
    var it = await ggLoadDetail(ggMakeLink(ref.id, ref.ep));
    if (!it) return it;
    it.id = anMakeLink("gg", ref.id, ref.ep);
    it.link = it.id;
    it.genreTitle = "girigiri" + (it.genreTitle ? " / " + it.genreTitle : "");
    (it.episodeItems || []).forEach(function (e) {
      var r = ggParseLink(e.link);
      if (r) { e.id = anMakeLink("gg", r.id, r.ep); e.link = e.id; }
    });
    return it;
  }
  var raw = ref.site === "age" ? await ageDetailRaw(ref.id) : await xfDetailRaw(ref.id);
  var item = anBuildDetail(ref.site, raw, ref, ref.site === "age" ? "AGE" : "稀饭");
  // 兜底：先解析出一个能直接播的地址（当前集，没有就第 1 集）
  var primary = anPrimary(raw.lines);
  if (primary) {
    var idx = Math.max(0, Math.min((ref.ep || 1) - 1, primary.episodes.length - 1));
    var order = [primary].concat(raw.lines.filter(function (l) { return l !== primary && !l.vip; }));
    for (var i = 0; i < order.length && i < 3; i++) {
      var ep = anFindEp(order[i], primary, idx);
      if (!ep) continue;
      try {
        var u = ref.site === "age" ? await ageResolve(ep.url) : await xfResolve(ep.url);
        if (u) { item.videoUrl = u; item.playerType = "app"; break; }
      } catch (e) {}
    }
  }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var ref = anParseLink(params.link || params.id);
  if (!ref) {
    var g0 = ggParseLink(params.link || params.id);
    if (!g0) return [];
    ref = { site: "gg", id: g0.id, ep: g0.ep };
  }
  if (ref.site === "gg") {
    return ggLoadResource({ link: ggMakeLink(ref.id, ref.ep), episode: params.episode });
  }
  var epNo = ref.ep || parseInt(params.episode, 10) || 1;
  var raw = ref.site === "age" ? await ageDetailRaw(ref.id) : await xfDetailRaw(ref.id);
  var primary = anPrimary(raw.lines);
  if (!primary) return [];
  var idx = Math.max(0, epNo - 1);
  var target = primary.episodes[idx];
  if (!target) return [];
  // 主线路在前；AGE 的 VIP 线路解析页是加密的，排到最后（通常解不出来会被跳过）
  var order = [primary].concat(raw.lines.filter(function (l) { return l !== primary; }));
  order.sort(function (a, b) { return (a.vip ? 1 : 0) - (b.vip ? 1 : 0); });
  order = order.slice(0, 8);
  var site = ref.site;
  var referer = site === "age" ? AGE_SITE + "/" : XF_SITE + "/";
  var resolved = await Promise.all(order.map(function (line) {
    var ep = anFindEp(line, primary, idx);
    if (!ep) return Promise.resolve(null);
    var p = site === "age" ? ageResolve(ep.url) : xfResolve(ep.url);
    return p.then(function (u) { return u ? { line: line, url: u } : null; }, function () { return null; });
  }));
  var out = [];
  var seen = {};
  resolved.forEach(function (r) {
    if (!r || seen[r.url]) return;
    seen[r.url] = true;
    out.push({
      name: r.line.name,
      description: anEpTitle(target.name, idx) + " · " + anFmt(r.url),
      url: r.url,
      customHeaders: { "User-Agent": AN_UA, Referer: referer },
      playerType: "app",
    });
  });
  return out;
}
