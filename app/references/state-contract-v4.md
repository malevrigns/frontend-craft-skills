# Interaction Specification v4.0

保留 v3 的完整事件-状态字段，新增首个行动旅程与动效时间线。参见 `../../examples/attention-contract/interaction-spec.json`。

顶层字段：
```
schemaVersion: '4.0'
product: same as visual product.name
platforms: ['web']
firstActionJourney: {
  componentId, discover, understand, trigger, feedback,
  outcome, recovery, simulation: boolean
}
interactions: [{
  id,componentId,trigger,guard,stateBefore,stateAfter,
  feedback,durationMs,failure,recovery,keyboard,touch,a11y,
  reducedMotion,testCases
}]
timeline: [{targetComponentId,trigger,purpose,startMs,durationMs,reducedMotion}]
```
- 首个 CTA 的 `componentId` 和 `outcome` 与设计规格一致。
- 对有视觉动效的关键交互，其 `timeline` 必须可停止、可退化，CTA 不因其他动画延迟而无法操作。
- 无后端的真实可运行演示必须 `simulation:true`，用户界面明示 Demo；不得模拟注册成功或付款成功。
- 无动画的项目允许 `timeline: []`；克制也是设计选择。
