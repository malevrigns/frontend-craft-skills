---
name: AI UI 高级审美工作流
version: 4.0.0
description: >-
  将模糊产品需求编译为独特、可信、第一眼能被理解的视觉概念、首屏注意力契约与可实现的 CSS/组件规格；支持 Web、Dashboard、Expo
  和桌面端。实现前必须先复用优秀现成组件，禁止整页从零手写 CSS；QA 收尾必过 unslop 去 AI 味。
---
# AI UI Aesthetic v4 — Attention-first design, not decoration

## 适用与边界
在用户提出新产品视觉、页面设计、设计优化、Apple 质感、产品首屏、Dashboard 或 UI 还原时使用。用户提供精确设计稿/规格时采用 faithful 模式并遵守要求。与 ../app/SKILL.md 联动。

完整流程以磁盘为准：/home/box/agent-data/workflows/ai-ui/（version 4.0.0）与共享 ../docs ../styles ../scripts ../examples。三阶段：Design Exploration → Specification Compilation → Implementation & Visual QA。

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
用户认可的资源只记 URL 到 docs/APPROVED_RESOURCES.md；同类≥2 候选先问用户选，单一认可直接复用。

## 硬规则：QA 收尾必过 unslop（去 AI 味）
多视口截图之后、交付之前必须再跑一遍 unslop：
1. 加载 https://github.com/heydamir/unslop（本机 /workspace/unslop/skills/unslop/SKILL.md，无则 clone），按 references/signs.md 审 AI 味（CC BY 4.0 保留署名）。
2. 写五行方向 Product/Character/World/Moments/Signature，按 Spacing→Color→Icons→Copy→Type→Layout→Details→Visuals→Motion 九层复检。
3. 重点去掉：无意义紫蓝渐变、过重 700+ 字重、emoji 图标、每块卡一个彩色分类、空洞副标题、数字单位错误、纯装饰 dollar 图标、无限 shimmer/果冻回弹。
4. 只改 token/文案/间距/细节，不推翻已复用组件与已对齐布局；保留用户认可的动效。
5. 产物：UNSLOP_AUDIT.md + UNSLOP_REPORT.md + 改前/改后截图。

## 校验
node ai-ui/scripts/validate-spec.mjs；validate-first-impression.mjs；verify-evidence.mjs。自动校验≠审美通过。

## 本地约定
有 Figma 优先 Figma；沟通中文；交付附真实截图；共享文件在 ../docs ../styles ../scripts ../examples。
