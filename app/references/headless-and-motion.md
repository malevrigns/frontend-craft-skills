# Headless UI and Motion v3.3

- React Web 弹窗、菜单、组合框：优先使用 Base UI 或基于源码可定制的 shadcn/ui，避免自己实现键盘与焦点基础设施。
- CSS 能表达的简单 hover/active 状态用 CSS transition；状态布局变更、退出动画以及共享元素可选择 Motion for React。
- Motion 动画必须配置 reduced-motion，暂停不可见视频、结束定时器、消除连续点击竞态。
- React Native 原生交互应使用对应平台组件；`@base-ui/react` 不适用于 RN Native。
- 使用组件时审查许可和依赖版本，以实际安装的官方 API 为准。
- 库列表在 `../../docs/LIBRARY_SELECTION.md`，不要在这里机械列出动效供任意叠加。
