---
name: app-interaction-v4
version: 4.0.0
description: "把高关注度的首屏与完整 UI 场景编译为可测试的触发-状态-反馈-恢复及动效时间线，保持精致手感、可信 CTA 与跨屏体验。"
---
# App Interaction v4 — Attention → Understanding → Action

## 定位
与 `../ai-ui/SKILL.md` 配合。视觉决定用户第一眼应该看到**什么**；本 Skill 决定他们点下去之后**会发生什么**。不得靠无结果按钮、假表单成功、无限动效或强制滚动制造“吸引力”。当请求只是还原时，视觉规格优先，补充必要键盘/触控/错误状态而不擅改外观。

## 新增第一行动契约
1. 读取 `design-spec.json` 的 `firstImpression.primaryAction.componentId` 与 `scenes[0]`，确认 CTA ID 在 `components` 中存在。未有视觉规格时声明最小必要假设，并明确主操作的真实目的。
2. 制作 `first-action journey`：**发现 → 理解 → 触发 → 状态反馈 → 结果 / 失败 → 恢复**。触发动作必须兑现按钮文案：例如“开始体验”跳转到可用流程；缺少后端时只提供真实 Demo 反馈，不声称提交成功。
3. 先确定第一个交互反馈，再讨论装饰动效：可操作性、点击目标、焦点、输入、加载、错误、取消和权限比散落的弹性效果更重要。
4. 以 `references/attention-interaction.md` 建立首屏动效**预算与编排表**：进入视线 / 主素材 / 标题 / CTA / 信任依据 / 点击反馈。不要让 CTA 等所有动画播完才可操作；文字必须在 JS 失败时可见。
5. 生成 `interaction-spec.json`（v4.0）并运行 `node app/scripts/validate-interaction.mjs interaction-spec.json design-spec.json`，确保所有关键组件 ID、CTA 和时间线引用一致；旧 v3.0 数据可继续被旧校验路径处理。

## 常规互动实施（保留 v3 能力）
6. 每个关键行为都定义 `trigger`, `guard`, `stateBefore`, `stateAfter`, `feedback`, `durationMs`, `failure`, `recovery`, `keyboard`, `touch`, `a11y`, `reducedMotion`, `testCases`；用适当的 native/button/form 语义、焦点与状态反馈。
7. Web 可选择 CSS transition、Motion 和 Base UI/shadcn/ui；React Native / Expo 必须用平台兼容实现。遵守 `../docs/LIBRARY_SELECTION.md` 的“按需要引入”，避免重复动效与重叠依赖。
8. 媒体在加载失败/后台/低功耗/reduced motion 时降级为静态画面。避免多个不可见视频持续解码；首屏首帧应优先保证可读性。
9. 动态效果分 `orientation`、`feedback`、`continuity`、`brand`，只允许少数有目的的重点时刻。动效先于可操作内容阻挡任务、滚动劫持、强制弹窗和伪造成功都是失败。
10. 测试 Tab/Enter/Escape、触控、reduced motion、短屏、失网与快速连击；记录实际设备/浏览器和失败路径，不能用“代码看起来对”宣称完成。

## 两个 Gate
- **A 契约一致性**：CTA 在视觉和交互规格中一致，主按钮目标不是 `#`、空链接或仅装饰；有真实或明确模拟的结果状态，媒体有回退，状态边界明确。
- **B 可验证体验**：首屏不能靠动画延迟让重要内容暂时不可见；交互有状态/失败/恢复/输入/键盘证据。提交 `qa-evidence.json`，未截图/未实测不声称通过。

## 参考
`references/attention-interaction.md`、`references/state-contract-v4.md`、`references/state-contract.md`、`references/motion-and-media.md`、`references/apple-grade-interactions.md`、`references/a11y-and-platforms.md`、`references/dashboard-interaction.md`。历史组件存在 `legacy/`，非默认依赖。
