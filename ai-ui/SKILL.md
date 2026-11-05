---
name: ai-ui-aesthetic-v4
version: 4.0.0
description: "将模糊产品需求编译为独特、可信、第一眼能被理解的视觉概念、首屏注意力契约与可实现的 CSS/组件规格；支持 Web、Dashboard、Expo 和桌面端。"
---
# AI UI Aesthetic v4 — Attention-first design, not decoration

## 适用与边界
在用户提出新产品视觉、页面设计、设计优化、Apple 质感、产品首屏、Dashboard 或 UI 还原时使用。**用户提供精确设计稿/规格时采用 `faithful` 模式并遵守要求；不要为了吸睛擅自改品牌。** 与 `../app/SKILL.md` 联动；视觉 Skill 拥有叙事、排版、素材、材质、第一眼优先级，交互 Skill 拥有触发-状态-反馈-恢复。

## 目标，不是风格
目标是让目标用户在快速扫视中定位产品核心价值，并愿意执行一个明确的下一步；不是强迫用户停留、制造误导性紧迫感、塞入视频或盲目模仿 Apple。**抓住注意力 ≠ 牺牲可信度、可读性和任务效率。** 需要验证真实用户转化时必须用用户测试或 A/B 数据，不可凭截图声称转化提升。

## 强制三阶段（更详细见 `../docs/WORKFLOW_V4.md`）

### A. Design Exploration / 视觉决策
1. 识别页面访问目的：`persuade` 营销转化 / `operate` 工作台任务 / `read` 阅读理解 / `experience` 作品沉浸。是**按页面**而不是整个产品分类。
2. 记录目标人群、场景、即时问题、可信收益、主要行动和用户指定约束。缺少资料时合理假设并标记 `ASSUMPTION`；不得捏造社会证明、营收、数据或第三方背书。
3. 从 `references/creative-directions.md` 选择**2–3 个真正不同的构图路线**（非换色），分析每条路线的焦点、表达方式、对业务的适配与风险。若用户已指定方向或要求直接实现，只记录选定方向和替代方案理由，不增加无用的确认回合。
4. 锁定一个产品专属的 **visual signature（视觉记忆点）**：来自产品演示、独特构图、材质/光影、编辑式字体、实体形象或有意义的数据，不得默认为玻璃、渐变、巨型标题或大号统计卡。

### B. Specification Compilation / 规格编译
5. 先产出 `first-impression` 核心信息：访问者前三至五秒读到的 **产品是什么 / 为什么值得看 / 下一步做什么**，以及唯一主视觉锚点、次要锚点预算、可信证据、首屏 CTA 和移动端保留策略。按 `references/attention-architecture.md` 的结构执行。
6. 编译 `design-spec.json` 与面向代码模型的 `IMPLEMENTATION_SPEC.md`（使用 `../docs/IMPLEMENTATION_SPEC_TEMPLATE.md` 而不是套用固定视觉风格），格式见 `references/spec-contract-v4.md`。必含：outputContract、creativeDirection、firstImpression、typography、palette、layout、layers、assets、components、scenes、motion、constraints、sourceTrace、qualityPlan。**注意力焦点必须落到具体组件 ID，并在 scene 中有尺寸/相对位置/层级/裁切的执行规格**。
7. 资产优先，而非模板优先：明确素材原型、用途、许可、加载情况、失败回退。写下视觉 Token、背景与前景分层、留白、光线、材质与文字对比的具体参数。若没有授权素材，不伪造授权或依赖易失效外部 URL；允许 typography-led / product-led 替代方案。
8. 与 Interaction Skill 一起编译 `interaction-spec.json`；首屏 CTA ID、演示开关、首屏动效均须能 cross-check。若项目是 native Expo，使用原生能力而不是把 CSS 伪元素直接套到 React Native。

### C. Implementation & Visual QA / 落地验收
9. 实现选定画面。视觉层次顺序：**一眼能发现的主锚点 → 一眼能读懂的价值 → 有根据的可信线索 → 首要行动**。不要求以上严格按 DOM 顺序；要求视觉阅读顺序明确。营销首屏不能用装饰抢走 CTA；Dashboard 的注意力主角通常是当前异常、决策或关键工作而不是巨型 Hero。
10. 做浏览器 **首屏截图审查**：至少 1440×900、768×1024、390×844、320×640；还要检查 390×667 等短屏。有动态媒体时检查首帧、失败后备与 reduced motion。按 `references/first-viewport-review.md` 进行 5 秒盲测、缩略图测试、层级评估；至少记录 3 处真实视觉缺陷，优先修复 Top 2，然后重新截图。
11. 跑规格检查：`node ai-ui/scripts/validate-spec.mjs design-spec.json`；运行项目测试与 `node ai-ui/scripts/verify-evidence.mjs qa-evidence.json`。**自动验证仅检查契约一致性，不判定是否美观；未截屏不得说通过视觉验收。**
12. 报告状态：`SPEC_READY` / `CODE_READY` / `BROWSER_VERIFIED` / `PRODUCTION_READY`，逐项提供实测证据、局限和未验证项。

## 绝不可省略的“第一眼契约”
- **One dominant anchor**：第一视线只有一个主锚点，最多两个次级锚点；主锚点不等于大图，必须与用户价值/任务相关。
- **Five-second read**：目标用户能迅速说出产品或当前任务是什么、关键利益是什么、从哪里开始；不保证所有用户实际可达，需要盲测。
- **Proof before claims**：演示、产品细节、可核验数据优于空泛营销语。模拟统计必须明确标记 Demo。
- **Signature not spectacle**：特色来自该产品本身；动画和光效服务理解，不以眩目为唯一目的。
- **Preserve the focal point**：桌面/平板/移动端各有可理解的主锚点；避免字体大到压缩真正内容。
- **Only one primary action**：一屏主 CTA 唯一或明显优先，其余降低层级；Dashboard 可以是主任务动作或信息决策。

## 既有能力与相关资料
- `references/apple-grade-materials.md`：实体内容与浮动 chrome 的分层、光影与排版；**Apple 风格不是全页面毛玻璃**。
- `references/dashboard-quality.md`：图表语义和工作台密度；Dashboard 首屏评估以任务为先。
- `references/platforms.md`、`references/decision-process.md`、`references/visual-review.md`、`references/lumora-benchmark.md`。
- `../docs/LIBRARY_SELECTION.md` 与 `../docs/CSS_CRAFT_PLAYBOOK.md`：依赖选择。不要因为想高质感就安装所有动效库。
- `legacy/`：仅存档，不作为默认组件安装源。

## 失败定义
缺少首屏视觉锚点、CTA 与视觉焦点打架、核心价值只有空话、伪造社会证明、移动端关键行为折叠后消失、首页靠模板卡片堆叠、截图不符合规格、无法证明素材来源或把静态脚本结果吹成用户转化成功：**必须返回修正阶段，不得称为高完成度设计。**
