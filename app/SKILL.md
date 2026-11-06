---
name: App 交互协议
version: 4.0.0
description: 把高关注度的首屏与完整 UI 场景编译为可测试的触发-状态-反馈-恢复及动效时间线，保持精致手感、可信 CTA 与跨屏体验。与 ai-ui v4 联动时用。
---
# App Interaction v4

完整流程以磁盘为准：`/home/box/agent-data/workflows/app/SKILL.md`（version 4.0.0）与 `../docs/WORKFLOW_V4.md`。加载本 skill 后阅读全文。

## 职责
拥有触发-状态-反馈-恢复与动效时间线；与 `../ai-ui` 共享 token 与组件 ID。首屏 CTA、演示开关、首屏动效必须能与 first-impression / design-spec 交叉校验。

## 产出
`interaction-spec.json`（schema 4.0，见 `references/state-contract-v4.md` / `attention-interaction.md`）。跑 `node app/scripts/validate-interaction.mjs`。

## 原则
- 每个主交互：trigger → states → feedback → recovery
- reduced-motion 与键盘可达
- Expo/native 不用 CSS 伪元素硬套
- 证明型 demo 必须标注 demo，不虚构指标

## 本地约定
沟通中文；交付附真实截图；共享 `../docs` `../styles` `../scripts` `../examples`。

## 与视觉实现联动
实现层遵循 ai-ui「先复用，禁止从零整套手写 CSS」：交互状态挂在复用组件上扩展，不要另起一套自写控件皮肤。
