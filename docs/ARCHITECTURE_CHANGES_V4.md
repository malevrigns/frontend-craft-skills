# v3.3 → v4.0 改动摘要

| 原有能力 | v4 新增的可执行约束 | 为什么 |
|---|---|---|
| focalPoint 描述 | visualAnchor 必须引用组件 ID，且在首屏 Scene 落实 | 防止写了焦点但画面无焦点 |
| firstAction 口头说明 | firstImpression.primaryAction 与交互中的 `firstActionJourney` 对齐 | 防止 CTA 只是装饰 |
| 内容布局/断点 | aboveFoldByViewport + smallHeightStrategy + 3/5 秒阅读信息 | 防止移动首屏不可用 |
| 素材清单 | source/licence/availability/fallback 与 proof 真实性 | 防止假素材和假社会证明 |
| 静态 CSS 检查 | 五秒启发式、缩略图构图、盲测记录（如有被试） | 检测模板感和视觉竞争 |
| 一堆动效建议 | motion timeline + interaction guard + fallback | 防止特效先于价值出现 |
| 单一设计路线 | explore 模式先比较构图选项并记录拒绝理由 | 避免总生成同一种 Dashboard |

**保留**：v3.3 Apple 材质、CSS 选库矩阵、Headless 基础、图表语义、Expo 平台边界、原始 legacy 组件及脚本；不集成 Impeccable，不照抄 Velia 的内容、视频、排版和 JS。旧 v3.0 规格仍可用原本的验证路径。当前 v4 演示是契约示例而不是任何真实客户的转化结果。
