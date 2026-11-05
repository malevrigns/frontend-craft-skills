# CSS Craft Playbook：从普通到有质感

## 0. 第一次决策
写清：① 产品主任务 ② 人群 ③ 视觉关键词（最多 3 个）④ 拒绝什么模板 ⑤ 两个高质量的可核验参考 ⑥ 目标平台。若用户提供精确截图/prompt，以还原优先。

## 1. 五层设计，不是五种模糊特效

1. **环境画布 (canvas)**：以低频背景色、柔和的光源、极轻细节营造氛围；不能跟内容竞争。
2. **实体内容表面 (solid surface)**：图表、数据、文本和任务卡必须有稳定对比度。此层不推荐大面积半透明。
3. **辅助导航材质 (translucent chrome)**：侧栏、工具栏、悬浮控件在可辨背景上允许适度半透明。
4. **分层阴影与边缘 (edge & shadow)**：轻亮顶部高光、低对比外描边、接触阴影 + 远距离环境阴影；数值必须统一，不是每张卡任选。
5. **状态与运动 (feedback)**：Focus ring、hover、pressed、selected、disabled、loading/reduced motion 都是产品质感一部分。

## 2. 最小结构化输出

- `typeScale`: display/headline/title/body/label/caption 的 font-size、line-height、weight、tracking，中文与西文字体回退分开。
- `spacing`: 页面外边距、card padding、nav gap、统计表行高，至少 320/390/768/1024/1440 覆盖。
- `radius`: 只保留 3~4 级，允许功能特殊例外但要有理由。
- `surfaceRoles`: canvas / solid / chrome / overlay，含浅色和深色。
- `elevation`: 两至三层阴影；阴影颜色与背景相容。
- `componentStates`: hover, focus-visible, active, disabled, selected, error, busy。
- `media`: 图片来源、裁切、兜底、版权状态；拒绝靠随机图库完成主视觉。
- `motion`: 类型、时长、缓动、减少动画偏好；不要所有控件都弹一下。

## 3. CSS 改进原则（可直接操作）

- 使用 `clamp()` 控制标题与容器间距；排版不是所有宽度线性等比缩小。
- 优先 `oklch()` 和语义 token；暗色不是将浅色数值直接反转。
- 可通过 `color-mix(in oklab, ...)` 微调边缘、分隔线；须检查浏览器支持与 fallback。
- 用 `box-shadow` 的接触阴影 + 环境阴影制造真实深度，不用过重黑影。
- `backdrop-filter` 只用在需要透出上下文的 chrome/overlay；内容面板保持可读。
- 数据排版使用 `font-variant-numeric: tabular-nums`; 货币、单位、K/M 必须语义一致。
- SVG 图表 `text` 必须禁用继承 `stroke`，避免刻度字被描边。
- 高密度工作台，主任务应该在首屏可见；手机端关键数值不得裁切。

## 4. 先检查再宣称

- 静态：语义 token、全局覆盖规则、reduced motion、focus visible、重复的 arbitrary CSS 值。
- 浏览器：1440 / 1024 / 768 / 390 / 320 宽度截图、hover/focus/disabled/active、浅色深色，检查主图是否被挤压。
- 审美：明确指出三个问题，至少修复前两个；由人或视觉模型比较参考图，不给“自动 9/10 分”。
- 功能：键盘、触摸、失败路径和 CSV 真实数据导出等，分开记录；UI 好看不等于功能通过。

## 5. 对下一轮 AI 的交付模板

1. 设计方向 + 拒绝方案（why）
2. 材质映射表（which layer）
3. CSS Token 表（exact values）
4. 组件清单（source or custom, license/compatibility）
5. 实现文件（where）
6. 截图和行为测试（evidence）
7. 已知问题和未通过项（limits）
