# 交互契约 / Interaction Contract v2.0

每个动作记录：
| 字段 | 样例 |
|---|---|
| interaction_id | task.toggle |
| trigger | 点击/Enter/Space |
| state_before | task.status = pending |
| event | TOGGLE_TASK(taskId) |
| state_after | task.status = complete |
| dependent_ui | 计数、列表样式、进度值同步更新 |
| visual_response | 160ms 勾选淡入（reduced motion 为 0ms） |
| undo_or_retry | Undo 5 秒内可用；失败保持状态并允许重试 |
| accessibility | checkbox 角色、可见标签、状态变化 live region（不过度播报） |
| acceptance | 键盘触发和点击结果一致，刷新后数据仍正确 |

**反模式**：触发动画就认为业务已完成、仅靠长按才能删除、每次成功都播放粒子、弹层不还原焦点、隐藏按钮无法键盘导航、列表刷新未处理失败、对 `window/document` 的依赖进入 RN bundle。

## 检查顺序
1. 能否完成用户任务（无鼠标/无触摸的替代路径）？
2. 正在加载、失败、空状态、成功各显示什么？
3. 状态变化是否同步出现在所有 UI 引用位置？
4. 有无撤销/重试或足够明确的确认？
5. reduced-motion、慢设备、离线是否仍可用？
6. 是否真实通过指定设备/浏览器验证？
