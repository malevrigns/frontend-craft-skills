---
name: AI UI 高级审美工作流
version: 4.0.0
description: >-
  将模糊产品需求编译为独特、可信、第一眼能被理解的视觉概念、首屏注意力契约与可实现的 CSS/组件规格；支持 Web、Dashboard、Expo
  和桌面端。用户要新产品视觉、首屏、Dashboard、Apple 质感或 UI 还原时用。实现前必须先复用优秀现成组件，禁止整页从零手写 CSS。
---
# AI UI Aesthetic v4 — Attention-first design, not decoration

## 适用与边界
在用户提出新产品视觉、页面设计、设计优化、Apple 质感、产品首屏、Dashboard 或 UI 还原时使用。**用户提供精确设计稿/规格时采用 `faithful` 模式并遵守要求；不要为了吸睛擅自改品牌。** 与 `../app/SKILL.md` 联动；视觉 Skill 拥有叙事、排版、素材、材质、第一眼优先级，交互 Skill 拥有触发-状态-反馈-恢复。

完整流程、参考与脚本以磁盘为准：`/home/box/agent-data/workflows/ai-ui/`（version 4.0.0）与共享 `../docs` `../styles` `../scripts` `../examples`。加载本 skill 后务必阅读该目录 `SKILL.md` 全文与 `../docs/WORKFLOW_V4.md`，按三阶段执行：Design Exploration → Specification Compilation → Implementation & Visual QA。

## 强制三阶段摘要
1. **Exploration**：按页面识别 persuade/operate/read/experience；2–3 条不同构图；锁定产品专属 visual signature。
2. **Specification**：产出 first-impression 契约 + `design-spec.json` + `IMPLEMENTATION_SPEC.md`（schema 4.0）；与 app skill 交叉校验 interaction-spec。
3. **QA**：真实多视口截图；validate-spec / validate-first-impression / verify-evidence；记录至少 3 个视觉缺陷并修 Top 2。

## 第一眼契约（不可省略）
唯一主锚点、五秒读懂 what/why/next、证明先于空话、signature 非 spectacle、保留焦点、唯一主 CTA。

## 材质与 Dashboard
读 `references/apple-grade-materials.md`：玻璃只用于 chrome/浮层。Dashboard 读 `references/dashboard-quality.md`。

## 硬规则：布局对齐，禁止零散留白
**同一行的卡片必须对齐：顶边对齐、底边对齐，禁止出现某张卡片内部大面积无内容空白、或三列高度参差不齐的零散布局。**

### 强制检查
1. **同排等高**：同一 grid/flex 行的卡片用 `items-stretch` + 子卡 `h-full`（或 flex 列 `flex-1`）撑满；不得让内容多少决定卡片高度。
2. **内容填满**：图表、列表、表格必须填满所在卡片（如 Recharts `ResponsiveContainer height="100%"` + 父容器 `flex-1 min-h-0`），禁止图表下方出现大片空白。
3. **对齐底边**：三列/多列布局的底边必须落在同一条线上；内容过长用内部滚动或统一高度，不得放任参差不齐。
4. **截图验收**：QA 截图必须检查同一行卡片的顶边/底边是否对齐；发现零散留白或高度不齐即为视觉缺陷，必须修复后才可交付。

## 硬规则：先复用，禁止从零整套手写 CSS
**CSS / 组件绝对不能整页从零手写。** 实现前必须先检索并复用已验证的优秀作品，再在其基础上改 token、文案、布局与品牌。

### 强制顺序
1. **搜**：在 `LIBRARY_SELECTION.md` 所列来源、本仓库 `examples/`、高质量开源落地页/Dashboard、shadcn / Magic UI / Aceternity / React Bits / Uiverse / 已通过视觉验收的本地样例中，找 1–3 个气质匹配的现成组件或整页骨架。
2. **证**：记下许可、来源 URL/路径、为何选它；截取或保存参考；无许可则换源。
3. **复用**：拷贝组件结构与样式配方（或官方 CLI 安装源码），用产品 token 替换颜色/圆角/字体；只改差异部分。
4. **禁**：禁止从空白 `index.html` 起手写一整套按钮、卡片、导航、表格、阴影系统；禁止「看起来差不多」的自创万能灰卡。
5. **交付**：`MATERIAL_DECISIONS.md` 或 `IMPLEMENTATION_SPEC.md` 必须列出 **复用清单**（组件名、来源、许可、改了什么）。缺复用清单不得称 CODE_READY。

### 动效同样先复用
加动效前必须先查优秀动效设计案例（Magic UI / Aceternity / Linear / Codrops 等），记录案例 URL → 选用组件 → 许可，再用官方组件源码接入；**禁止自写 keyframes / 动画曲线**。案例清单写入 `MOTION_CASES.md`。

例外：用户明确要求「纯教学手写 CSS」或只有像素级还原且无可用源时，可局部手写，但须在规格中标注 `HANDWRITTEN_EXCEPTION` 与理由。

## 校验
`node ai-ui/scripts/validate-spec.mjs`；`validate-first-impression.mjs`；`verify-evidence.mjs`。自动校验≠审美通过。

## 本地约定
有 Figma 优先 Figma；沟通中文；交付附真实截图；共享文件在 `../docs` `../styles` `../scripts` `../examples`。
