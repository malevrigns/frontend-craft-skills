# First-Action Experience Contract

## 一次真实的注意力转化
发现主视觉 → 理解价值 → 找到 CTA → 点击 / 触摸 / 键盘触发 → 可预期的状态反馈 → 明确的结果（或错误）→ 继续或撤销。

## 动效时间线的目的是帮助理解
- 每个时间段写 `startMs`, `durationMs`, `purpose`, `targetComponentId`, `trigger`, `reducedMotion`, `canInterrupt`。所有 ID 必须属于 `design-spec.json` 组件或场景。
- 首屏内容应在 JS 失败时正常可见；JS 成功后再附加增强。勿让核心 CTA 被 delayed opacity 长时间遮蔽。
- 进入动效建议只安排 1 个主要视觉动作 + 少量次级过渡。无论是否同时入场，主要 CTA 在页面可交互时必须可用。
- `reduced-motion` 应保留有用的状态变化但跳过不必要的平移、漂浮、Ken Burns 和自动打字。
- 多媒体优先：首帧静态后备 → 可播放媒体；视频网络失败时 CTA/文字仍可阅读。性能预算明确可见的 decode 和隐形视频策略。

## CTA 验收
- ID 对应设计规格 `firstImpression.primaryAction.componentId`。
- `trigger` 真实可执行，`outcome` 不可为空；URL 无效或暂不存在时设计明显可识别的本地 Demo 流程。
- 禁止用 `alert('Success')` 假装产品真实注册；模拟提交写 `simulation: true` 并在 UI 上标明。
- 加载、验证错误、请求失败、重复点击、离开页面、返回路径都在契约中。
- 键盘：Tab 焦点、Enter/Space 激活、Escape 退出可退出控件；触屏目标尽可能约 44px。

## 针对页面模式
- Persuade：首要 CTA 优先，第二 CTA 只能作为低对比次要路径；不要用弹窗阻断首次理解。
- Operate：注意力锚定“当下最有价值的任务”，不要为了动画扰乱用户完成工作。
- Read：段落连续性优于滚动特效，不让跳字遮挡正文。
- Experience：允许有意义的动效，但提供跳过、退出与静态回退。
