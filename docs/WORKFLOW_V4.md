# Frontend Craft Skills v4 — From user intent to a first-impression product

## 设计-开发流程（不是复制任何具体页面的视觉样式）
```text
用户需求 / 参考资料 / 受众
    ↓
A. Explore: 产品目标 + 当前访问情境 + 2~3 种不同构图候选
    ↓ 选择并记录理由
B. Compile: First Impression Contract（唯一主锚点、价值、证据、行动）
    ↓
  design-spec.json v4
    + outputContract / creativeDirection / firstImpression
    + typography / assets / layers / scenes / motion / responsive
    ↓ 共享组件 ID
  interaction-spec.json v4
    + firstActionJourney / timeline / states / fallback / a11y
    ↓
C. Implement: CSS tokens + composition + reusable components + event state
    ↓
  Chromium / Safari / native screenshots
    ↓
  thumbnail + 5-second heuristic / actual user tests (when available)
    ↓
  fix highest defects / rerender / verified report
```

## 与上一版的重大差异
v3.3 的 `focalPoint` 字符串通过检查并不代表画面有独特视觉焦点。v4 绑定 `firstImpression.visualAnchor.componentId`、`scenes[].focalComponentId` 与首屏 CTA ID，形成真实设计依赖。未实施的首屏设计决策会在机器级契约检查时失败；未渲染或未测用户仍不能声称美观/转化已获证明。

## 规范分层
1. **Output Contract**：必须交付什么、使用平台、用户指定不可变项。
2. **Creative Decision**：受众、竞争注意力的核心价值、视觉叙事和明确拒绝的默认模板。
3. **First Impression Contract**：5 秒信息与唯一主锚点、证据、主要操作、视觉权重预算。
4. **Design Foundation**：字体/色彩/网格/空间/材质/图层/资源及回退。
5. **Scene Blueprint**：每场景的组件关系、尺寸/相对布局、响应式、裁切、Z 层级。
6. **Interaction Orchestration**：事件-状态、动效时间线、恢复路径和可达性。
7. **Acceptance**：静态规格门槛 + 浏览器截图/功能检查 + 审美人工复核。

## 使用命令
```sh
node ai-ui/scripts/validate-spec.mjs examples/attention-contract/design-spec.json
node app/scripts/validate-interaction.mjs examples/attention-contract/interaction-spec.json examples/attention-contract/design-spec.json
node ai-ui/scripts/validate-first-impression.mjs examples/attention-contract/design-spec.json examples/attention-contract/interaction-spec.json
node scripts/test-v4.mjs
```

## 约束
- 不自动强加视频、玻璃、全屏大标题到任意产品；特别是 Dashboard/Operate 首屏的主角优先是任务和信息。
- 素材来源、使用许可、真实社会证明、埋点/转化实验必须有证据；示例数据标注 `demo`。
- 遵守用户指定审美，faithful 模式避免不必要的重设计。
- 即使机器校验 PASS，仍需真实浏览器截图、行为测试、实际用户评价才能作进一步质量判断。
