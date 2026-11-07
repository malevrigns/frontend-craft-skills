---
name: AI UI 高级审美工作流
version: 4.0.0
description: 用于新产品首屏、Dashboard、UI还原及视觉优化：按风格检索成熟业务模块并实证复用，编译视觉规格，运行多视口验收与不抹平品牌的 unslop 复检。
---
# AI UI Aesthetic v4 — Attention-first design, not decoration

## 适用与边界
在用户提出新产品视觉、页面设计、设计优化、Apple 质感、产品首屏、Dashboard 或 UI 还原时使用。用户提供精确设计稿/规格时采用 faithful 模式并遵守要求。与 ../app/SKILL.md 联动。

完整流程以本技能目录及共享 ../docs ../styles ../scripts ../examples 为准。三阶段：Design Exploration → Specification Compilation → Implementation & Visual QA。

## 强制三阶段摘要
1. Exploration：识别 persuade/operate/read/experience；2–3 条不同构图；锁定 visual signature。
2. Specification：first-impression 契约 + design-spec.json + IMPLEMENTATION_SPEC.md（schema 4.0）；与 app skill 交叉校验。
3. QA：真实多视口截图；validate-spec / validate-first-impression / verify-evidence；记录至少 3 个视觉缺陷并修 Top 2；随后必过下方 unslop 收尾。

## 第一眼契约
唯一主锚点、五秒读懂 what/why/next、证明先于空话、signature 非 spectacle、保留焦点、唯一主 CTA。

## 材质与 Dashboard
读 references/apple-grade-materials.md；Dashboard 读 references/dashboard-quality.md。

## 硬规则：布局对齐，禁止零散留白
同一行的卡片必须对齐顶边/底边，禁止卡片内大片空白与三列参差。用 items-stretch + h-full、图表 ResponsiveContainer 100% 撑满；截图验收对齐。

## 硬规则：先复用，禁止从零整套手写 CSS
实现前必须先检索并复用已验证优秀作品（shadcn / Magic UI / Aceternity 等），改 token 与差异，禁止空白起手写整套；交付必须含复用清单（来源/许可/改了什么）。动效同样先查案例复用官方源码，禁止自写 keyframes，清单写入 MOTION_CASES.md。

## 硬规则：认可资源库（可迭代）
用户认可的资源只记 URL 到 docs/APPROVED_RESOURCES.md；同类≥2 候选先问用户选，单一认可直接复用。检索与核验不必等待；用户已选定的方向或组件不得反复确认。

## 硬规则：QA 收尾必过 unslop（去 AI 味）
多视口截图之后、交付之前必须再跑一遍 unslop：
1. 加载 https://github.com/heydamir/unslop 的 skills/unslop/SKILL.md，按 references/signs.md 审 AI 味（CC BY 4.0 保留署名）。使用已安装的路径，若无则下载到工作区。
2. 写五行方向 Product/Character/World/Moments/Signature，按 Spacing→Color→Icons→Copy→Type→Layout→Details→Visuals→Motion 九层复检。
3. 诊断无依据的渐变、字重、图标、装饰、空洞副标题、单位错误和分散注意的循环动画；须说明具体问题，不能仅凭某种风格存在就删掉。
4. 优先改 token/文案/间距/细节，保留适用的复用组件、对齐布局及用户认可的动效。组件或布局本身不适用时允许替换，记录理由，不以“已复用”回避用户反馈。
5. 产物：UNSLOP_AUDIT.md + UNSLOP_REPORT.md + 改前/改后截图。

## 模块复用验收：不能拿基础组件冒充业务模块
1. 复用层级必须明确：基础原语（Button/Card/Badge）、组合组件（带筛选分页的表格或日期选择器）、业务模块（完整分析面板、工作区导航、具有数据与状态的图表等）。只接入 Card/Button 不等于复用完整业务模块。
2. 开工先建 MODULE_REUSE_MAP.md：逐项写功能需求、参考实例URL和截图、源码URL及许可、复用层级、实际文件/导入位置、只需修改的差异。优先找同场景完整模块，而非从零拼外壳。
3. 找不到适用模块才用基础组件组合，并明确标为“组合实现”；不能宣称成熟模块已复用。图表库、动画库和侧栏都须分别如实记录。
4. 验收链必须闭合：参考实例 → 真实来源 → 实际导入/调用 → 运行中的效果 → 多视口截图。仅列库名、只安装依赖、构建成功、换色，都不构成模块复用证据。
5. 复用不是盲搬：模板残留、组件名教程副标题、错误单位、无效按钮必须清理；示例数据显式标明示例，不当作真实业务数据。

## 按风格选资源，而非固定套一个库
先根据品牌与任务判定需要：信息密集看板、细腻微交互、成熟工具后台、品牌化版式、AI状态表现，或尚未确定的风格探索。再检索对应的完整实例；不要对每个场景都套同一套灰色卡片。
- 视频/文章推荐只进入候选资源目录，不自动视为用户审美认可。
- 官网、拼写、适用范围、源码可用性与许可必须核实；付费组件未获授权不能下载或仿冒其实现，可用公开预览比较。
- 收集颜色、文字、间距、圆角、阴影、状态和动效规则，编译成统一tokens；不从多个风格不兼容的库各取一块导致拼盘。
- 多个同类候选仍遵守用户选定规则；已经选定后立即实施，可逆的技术细节自行处理，不把每次负面反馈都变成新的等待。

## 反同质化与反馈闭环
- unslop 是诊断方法，不是黑白灰模板。彩色、渐变、圆角、粗体、动效都不是原罪；只移除没有语义、品牌依据或明确作用的表现。
- 不默认米黄等于纸感、灰白等于高级、删除动效等于精致。明确背景/表面/文本/边框/强调色的层级与对比，使用真实内容截图判断。
- 用户指出难看、脏、空、像模板等问题，转成可验证缺陷后直接修复可逆内容，不只道歉或推荐配色；只有会改变核心方向的实质歧义才询问。
- 宣称开始前实际启动工作；宣称完成前检查真实产物。做不到的明确标明，不承诺无执行的下一版。
- 外部视频只有标题/描述/章节时，仅能据此归纳，并明确不是完整口述字幕；时间戳、作者观点和资源网址不得猜测。

## 校验
node ai-ui/scripts/validate-spec.mjs；validate-first-impression.mjs；verify-evidence.mjs。自动校验≠审美通过。

## 本地约定
有 Figma 优先 Figma；沟通中文；交付附真实截图；共享文件在 ../docs ../styles ../scripts ../examples。
