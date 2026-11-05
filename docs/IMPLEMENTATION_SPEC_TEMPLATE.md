# Implementation Specification — Template

> 将 Aesthetic Skill 的视觉决策与 Interaction Skill 的行为契约汇编为**给代码模型执行的实现提示词**。这是一份骨架，不是视觉模板。不得直接套任何示例字体、色彩、媒体和构图。用户指定参数优先；模型自主选择的设计应记录依据。

## 00. Delivery & Priority
产品名称、目标用户、交付物、技术栈、文件路径、可运行条件、约束优先级（用户显式要求 > 已批准设计规格 > 普通默认值）。哪些段落必须原样保存，哪些允许工程调整。禁止凭空添加功能、价格、销量和客户背书。

## 01. Product-first Creative Thesis
用一段话定义目标场景、访客的疑问、所选视觉方向与未选方向的原因。描述**辨识度来源**（产品本体、真实图像、数据工件、编辑式排版或实体材质），不是套用“高级、现代、惊艳”。

## 02. First Impression Contract
五秒阅读信息：What / Why / Next；唯一 dominant anchor 的组件 ID、视觉角色、占比与在每个断点上的位置；最多两个次级锚点；证明来源/状态；CTA ID、文案、目的地、用户按下后真实结果。

## 03. Foundation & Asset Manifest
字体加载与降级、字级比例、色彩 Token、网格、节奏、圆角、阴影与表面分层。所有图片/视频/字体标记来源、授权状态、加载策略和 fallback；不要强迫每页都有视频。

## 04. Scene Blueprints
逐场景定义：结构、DOM 层级、组件 ID、具体相对比例/间距/高度、视觉材质、z-index、素材 object-fit、文字最大行宽、首屏主次顺序、失败显示状态；可使用 CSS 值或范围，不能只有“漂亮的卡片”。

## 05. Motion & State Orchestration
列出每个动作：trigger → guard → stateBefore → stateAfter → feedback → failure → recovery。动画时间线应包含 start、duration、easing、purpose、reduced-motion 和是否可被打断。确保内容在 JavaScript 失败时仍可读，CTA 不受装饰动画阻塞。

## 06. Responsive & Small-height Contract
清楚列出 1440、768、390、320 和短屏的**布局变化**，不是单纯缩小字号。检查首屏锚点可见、CTA 可达、表格信息保留、软键盘行为、溢出及触屏目标。

## 07. Accessibility, Performance & Honesty
语义结构、焦点、对比、键盘、媒体回退、加载失败、真实/模拟业务结果、资源性能边界。明确哪些没有验证。

## 08. Acceptance & Evidence
静态规格 ID 对齐；浏览器/真机截图；首屏缩略图及五秒启发式；如有真实受试者才报告真实五秒测试；主要交互正向/失败/取消路径；缺陷 Top 3 与修复前后证据；交付状态（CODE_READY、BROWSER_VERIFIED 等）。

## Prompt Compiler Rules
- 每项设计决策必须落到具体元素或变量上。写“有层次”必须指明哪一层、为何、具体样式关系。
- 首屏关键视觉资产、信息顺序、CTA、组件 ID、动效不能在实现阶段被默默改写。
- 若实现发现矛盾，记录差异并修正规格；不要只改源码使文档过期。
- 对需要视觉创新的部分留下创作自由，但锁定目标、结构和约束；**不是把所有 CSS 都写成死值**。
- 检查器只能检查文件完整性，不能替代截图和用户评价。
