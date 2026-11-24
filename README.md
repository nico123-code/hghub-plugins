# HGhub 插件订阅源

按 [HGhub 插件开发教程](https://github.com/Minireel/HGhub/blob/main/docs/developers/index.md) 编写的 HPP 1.0 单文件源合集。

当前应用 **0.0.1 / HPP 1.0.0-dev**。协议仍是草案，导入前请对照[当前支持状态](https://github.com/Minireel/HGhub/blob/main/docs/developers/status.md)。

站点行为参考 [xptv-extensions](https://github.com/Yswag/xptv-extensions) 的 JS 蜘蛛，映射到 HPP：`tabs` → 分类，`cards` → `MediaItem`，`tracks` → 播放列表/分集，`playinfo` → `streams`。作品与分集 ID 使用路径或上游编号，不把会过期的播放地址当 ID。

## 订阅地址

在 HGhub **插件中心 → 导入与订阅** 粘贴下面任一 HTTPS 地址。列表里的插件路径是相对路径，会按列表最终 URL 解析。

| 列表 | 内容 | GitHub Raw | jsDelivr |
| --- | --- | --- | --- |
| 全部 | 12 个源（含成人） | `https://raw.githubusercontent.com/CoderL98/hghub-plugins/main/manifest.json` | `https://cdn.jsdelivr.net/gh/CoderL98/hghub-plugins@main/manifest.json` |
| 影视 | 6 个影视 / 短剧 | `https://raw.githubusercontent.com/CoderL98/hghub-plugins/main/subs/vod.json` | `https://cdn.jsdelivr.net/gh/CoderL98/hghub-plugins@main/subs/vod.json` |
| 成人 | 6 个成人源（`mature`） | `https://raw.githubusercontent.com/CoderL98/hghub-plugins/main/subs/18.json` | `https://cdn.jsdelivr.net/gh/CoderL98/hghub-plugins@main/subs/18.json` |

推荐先订 **影视源**。成人列表需在设置里打开成人内容后再导入。GitHub Raw 若打不开，改用 jsDelivr。

仓库首页：<https://github.com/CoderL98/hghub-plugins>

### 导入步骤

1. 打开 HGhub → **插件中心 → 导入与订阅**
2. 粘贴上表中的 HTTPS 地址（不要选本地 `manifest.json`：Android 文件选择器读不到同目录的 `plugins/*.js`）
3. 预览元信息后勾选要安装的条目
4. 确认状态为 **已就绪**
5. 从首页、分类或搜索进入详情，点集播放

订阅后可手动刷新列表。同 ID 更高版本会更新，同版本覆盖用于调试。

单独导入某个源时，使用对应 JS 的 raw 地址，例如：

`https://raw.githubusercontent.com/CoderL98/hghub-plugins/main/plugins/huangguo.js`

## 插件

| 文件 | ID | 能力 | 备注 |
| --- | --- | --- | --- |
| `plugins/hjkk.js` | `hjkk` | 分类、搜索、详情、播放 | 韩剧看看 |
| `plugins/jpyy.js` | `jpyy` | 分类、搜索、详情、播放 | 金牌影视，MD5+SHA1 签名 |
| `plugins/apple.js` | `apple` | 分类、搜索、详情、HLS | 小苹果，`allowInsecureHttp` |
| `plugins/xingya.js` | `xingya` | 分类、搜索、详情、直链 | 星芽短剧，JWT 存 `hg.storage` |
| `plugins/hdmoli.js` | `hdmoli` | 分类、搜索、详情、播放 | XOR 解密播放地址 |
| `plugins/wwgz.js` | `wwgz` | 分类、搜索、详情、播放 | 农民影视 |
| `plugins/huangguo.js` | `huangguo` | 首页、信息流、分类、搜索、详情、HLS、图文、评论 | JSON API，`mature` |
| `plugins/madou.js` | `madou` | 分类、搜索、详情、HLS | `mature` |
| `plugins/hkdoll.js` | `hkdoll` | 分类、搜索、详情、播放 | `mature`，XOR |
| `plugins/avtoday.js` | `avtoday` | 分类、搜索、详情、HLS | `mature` |
| `plugins/xhamster.js` | `xhamster` | 分类、搜索、详情、多清晰度 | `mature` |
| `plugins/pornhub.js` | `pornhub` | 分类、搜索、详情、HLS | `mature` |

标了 `mature: true` 的源，宿主默认隐藏，需在设置里打开成人内容后再导入或启用。

## Rex / Forward 模块

`forward/` 目录是给 iOS 播放器 Rex / Forward 用的 ForwardWidget 模块（与 HGhub 插件互不影响）。

| 模块 | 文件 | 功能 |
| --- | --- | --- |
| 黄果短剧 `hghub.huangguo` | `forward/huangguo.js` | 全部 / 分类（短剧、漫剧）、题材标签分类（题材、架空、男频、女频、伦理、关系、外貌、玩法、场景，共 96 个标签）、排行榜（热播 / 推荐 / 潜力）、搜索、分集列表、HLS 播放 |
| 影视聚合 `hghub.ikanpp` | `forward/ikanpp.js` | 聚合 3 个影视站：爱看片片 www.ikanpp.com（电影 / 剧集 / 动漫 / 综艺 / 纪录片，按类型、地区、排序筛选；短剧 10 个分类）、nnyy 努努影院 nnyy.in（电影 / 电视剧 / 综艺 / 动漫，按排序、类型、地区、年份筛选）、小蜜蜂影院 www.xmfyy.com（电影 / 电视剧 / 动漫 / 综艺，按排序、类型、地区、年份筛选）；搜索可选全部或单站；选集、多线路播放 |
| 动漫聚合 `hghub.anime` | `forward/anime.js` | 聚合 3 个动漫站：girigiri爱动漫（新番时间表、日番 / 美番 / 剧场版 / 真人 / BD副音轨 / 其他，带筛选）、AGE动漫（最近更新、番剧目录：版本 / 地区 / 年份 / 季度 / 类型 / 状态 / 排序）、稀饭动漫 next.xifanacg.com（最近更新、新番时间表、番剧目录：排序 / 类型 / 题材 / 年份 / 状态）；搜索可选全部或单站；选集、多线路播放 |

订阅地址（在 Rex / Forward 的「模块 → 添加订阅」里粘贴）：

```
https://raw.githubusercontent.com/nico123-code/hghub-plugins/main/forward/hghub.fwd
```

也可以只导入单个模块：`https://raw.githubusercontent.com/nico123-code/hghub-plugins/main/forward/huangguo.js`、`https://raw.githubusercontent.com/nico123-code/hghub-plugins/main/forward/ikanpp.js`、`https://raw.githubusercontent.com/nico123-code/hghub-plugins/main/forward/anime.js`

封面：黄果的封面图是 AES 加密的，Rex / Forward 不能解码，默认不显示封面。想要封面的话，把 `forward/cover-proxy-worker.js` 部署成 Cloudflare Worker，再在模块全局参数「封面解密代理」里填 `https://<你的子域>.workers.dev/?url=`。

## 重新生成订阅列表

增删 `plugins/*.js` 后执行：

```bash
node scripts/build-subs.mjs
```

会写入 `manifest.json`、`subs/all.json`、`subs/vod.json`、`subs/18.json`。插件 `url` 使用相对路径 `plugins/<id>.js`，同一份 JSON 可挂在 GitHub Raw 或 jsDelivr 上。不要给 `meta.updateUrl` 写死地址，宿主会用来源列表或 JS 的 URL 做更新。

## 尚未转换

这些 xptv 源本轮没有做成 HPP 插件：

- **混淆**：`gzys.js`（瓜子）、`laodifang.js`（老地方）、xptv 的 `huangguo.js`（本仓库已有独立 JSON 实现）
- **依赖页面脚本 / eval**：`novipnoad.js`、`subaibai.js` 播放第二路
- **鉴权较重**：`iyftv.js`（页面注入密钥）、`zero.js`（设备 token）
- **网盘 / Alist / 直播**：`alist_*.js`、`yunpan*.js`、`douyu.js`、`huya.js`、`bililive.js` 等
- **其余 HTML 蜘蛛**：`czzy.js`、`taohuazu.js`、`hdys.js`、`avdb.js`、`kbjfan.js` 等可按同样模式继续加

## 验证

### 黄果（不经过宿主）

```bash
curl -s "https://huangguoai.com/api/videos?page=1" | head -c 300
curl -s "https://huangguoai.com/api/videos/12" | head -c 300
curl -s -X POST -H "Content-Type: application/json" -d "{}" \
  "https://huangguoai.com/api/videos/12/episodes/1/playback"
```

成功时播放接口返回 `data.streams.main`（HLS）以及可选的 `hevc` / `preview`。请求体里不要带 `id` / `ep`。

### 真实宿主

- 搜索任意关键词，应出现分页结果
- 打开一部作品，选集 ID 为路径或编号，不是过期播放地址
- 播放返回 HLS 或 MP4；需要 Referer 的流已写在 `streams.headers` 或 `meta.defaultHeaders`
- 滑到分类第二页后重载插件，游标仍是页码字符串

本仓库没有 HGhub 假宿主，QuickJS 运行时验收需要在应用内完成。

## 说明

不提供、不存储音视频内容。使用第三方站点请自行判断合规性。
