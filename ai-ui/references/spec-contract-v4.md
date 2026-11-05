# Design Specification v4.0 — first impression + scene compilation

输出 `design-spec.json`。v4 拆分“注意力设计决策”和“技术实现约束”，不能只写漂亮的抽象词。参考 `../../examples/attention-contract/design-spec.json` 的可验证实例。

## Output Contract / 可实现规范
- `schemaVersion`: `4.0`
- `mode`: `faithful` / `explore` / `improve`
- `product`: `name`, `type`, `audience`, `primaryJob`, `platforms`
- `outputContract`: `deliverable`, `stack`, `immutableRequirements`
- `creativeDirection`: `thesis`, `visualSignature`, `rationale`, `rejectedPattern`, `alternatives`（explore 至少两条不同构图路径）
- `firstImpression`:
  - `visitorMode`: persuade / operate / read / experience
  - `attentionGoal`: 产品用户为什么会抬眼看
  - `fiveSecondRead`: `what`, `why`, `next`（简短具体，不写空泛口号）
  - `visualAnchor`: `componentId`, `kind`, `reason`
  - `attentionBudget`: `dominantAnchors:1`, `secondaryAnchors:0–2`
  - `primaryAction`: `componentId`, `label`, `destination`, `outcome`（对应交互规格）
  - `proof`: `type`, `source`, `status` (`verified`, `demo`, `none-yet`)，demo 必须 `visibleDemoLabel:true`，verified 必须有 evidence
  - `aboveFoldByViewport`: 宽度 320、390、≥1440 的 `{width, layout, anchorVisible, actionDiscoverable}`
  - `smallHeightStrategy`: 屏幕高度不足时如何保留阅读和交互
- `typography`: `display`, `body`, `hierarchy`
- `palette`: `background`, `foreground`, `accent`, `contrastStrategy`
- `layout`: `container`, `breakpoints` (mobile <=390 and desktop >=1024)
- `layers`: `[{id,z,role}]` 两层以上
- `assets`: `[{id,role,fallback,verification,rights,url?}]`，可以 []。没有外部素材时用产品 UI、文字/真实 SVG；不要填虚构 URL。
- `components`: `[{id,role,spec}]`，必须包含 anchor 与 CTA
- `scenes`: `[{id,goal,layout,focalComponentId,componentIds,...}]`；第一场景焦点必须等于 `visualAnchor.componentId`，同时包含 CTA；每个场景具体规定相对结构/材料/裁切/层级/响应式
- `motion`: `[{id,durationMs,purpose,reducedMotion}]`，可以 []，不是每页必须动画
- `constraints`: 有关用户要求、可达性与待验证信息的清单
- `sourceTrace`: 记录来源与假设（不得杜撰客户数据）
- `qualityPlan`: `screenshots` cover 320,390,768,1440；`fiveSecondEvaluation` 说明目标与方法，**若无真实受试者，标明 heuristic-only**。

## 重要一致性关系
```
firstImpression.visualAnchor.componentId == scenes[0].focalComponentId
firstImpression.primaryAction.componentId IN scenes[0].componentIds
firstImpression.primaryAction.componentId == interactionSpec.firstActionJourney.componentId
firstImpression.primaryAction.outcome == interactionSpec.firstActionJourney.outcome
```

仅检查 JSON 不能保证视觉强烈或产品转化。要做截图与用户感知验收，见 `first-viewport-review.md`。
