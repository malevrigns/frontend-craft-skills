# CSS 与组件工具链：选择矩阵（核对日期：2026-11-01）

重点不是插件越多越好，而是**每个库必须承担互不重叠的职责**。默认每层最多选一个方案。

| 角色 | 候选 | 使用场景 | 规避事项 |
|---|---|---|---|
| CSS 实现基础 | [Tailwind CSS v4](https://tailwindcss.com/docs/theme) | 快速实现精细间距、颜色、响应式，使用 `@theme` 统一 token | 类名堆砌和各页自行定义的 arbitrary values |
| CSS 变量配方 | [Open Props](https://open-props.style/) | 从 shadows/easings/gradients/sizes 获得可复用尺度 | 不要盲用默认颜色导致产品像模板 |
| 类型安全样式 | [Panda CSS](https://panda-css.com/docs) | 大型团队、有 token/recipes/variants 的设计系统 | 不必与 Tailwind 再并行做同一件事 |
| 零运行时样式 | [vanilla-extract](https://vanilla-extract.style/) | TypeScript 驱动静态 CSS、组件样式隔离和主题 | 需要适配构建链，不是即插即用视觉套件 |
| 高度自定原子 CSS | [UnoCSS](https://unocss.dev/) | Vite、需要自定义规则、快捷规则与插件的项目 | 不要在同一模块混合多套 utility CSS 引擎 |
| 原生语义+可访问性 | [Base UI](https://base-ui.com/react/overview/about) | 高定制 React Web Modal/Menu/Select，CSS 完全自行控制 | 不自带设计质感，也不是 React Native 组件 |
| 开放源码组件系统 | [shadcn/ui](https://ui.shadcn.com/docs) | CRUD、后台、复杂表单、表格，便于 AI 修改源码 | 默认外观容易同质化；必须定制 token/密度/形态 |
| 快速主题原型 | [daisyUI](https://daisyui.com/docs/install/) | 内部工具、快速原型，低配置成本 | 不适合作为独特品牌质感的唯一来源 |
| 复杂状态动效 | [Motion for React](https://motion.dev/docs/react) | shared layout、进退场、连续响应式过渡 | 简单 hover 用 CSS；尊重 reduced motion |
| 创意动效素材 | [React Bits](https://reactbits.dev/) | 营销页、展示组件、微交互视觉参考 | 不要默认放在 dashboard 主内容区 |
| 可复制装饰效果 | [Magic UI](https://magicui.design/docs/components) | 高品质营销页、Bento、动态背景、数字动画 | 容易堆砌装饰，先定义主视觉再引入 |
| 视觉炫技参考 | [Aceternity UI](https://ui.aceternity.com/components) | 英雄区、交互背景、视觉叙事 | 需核实每个组件许可和付费限制；避免整站套版 |
| 纯 CSS 社区组件 | [Uiverse](https://uiverse.io/) | 特殊按钮、开关、输入控件、加载动画的实现参考 | 社区作品质量参差；先审查语义、对比度和 reduced motion |
| CSS 动画调校 | [Animista](https://animista.net/) | 试验缓动、时间、方向、位移幅度并导出原生 CSS | 只选择明确作用于状态反馈的动画，避免整页乱动 |
| Hover 效果参考 | [Hover.css](https://github.com/IanLunn/Hover) | 小范围链接、CTA hover 状态 | 当前版本商业使用有单独授权要求，使用前核查许可 |

## 必须优先考虑的搭配

### A. 高度定制 Apple-inspired SaaS Web
`Tailwind CSS v4` **或** `vanilla-extract` + `Base UI` + （可选）`Motion`。材质自己定义：不要把 `backdrop-filter` 当成品质保证。推荐在 `styles/*.css` 中定义清晰的环境/内容/浮层角色。

### B. 后台 Dashboard
`Tailwind CSS v4` + `shadcn/ui`（按需选用表单和数据表组件，修改源码）+ 用正确单位和刻度表达数据的图表方案。依赖少、状态准确胜过动效多。

### C. 专门练习 CSS 材质与排版
原生 CSS + `Open Props` 可作刻度参考；熟练 `color-mix()`, `oklch()`, gradients, `box-shadow`, `backdrop-filter`, container queries, `clamp()`、`font-variation-settings`，结合真实截图复核。

### D. React Native / Expo
[NativeWind](https://www.nativewind.dev/docs) 是原生样式桥接路线，**其文档当期稳定版 4.2.7 对应 Tailwind v3**（2026-09-15 文档）。不要直接把 Web Tailwind v4 配置粘贴到 NativeWind；确认项目的 Expo SDK、RN、NativeWind 与 Tailwind 版本矩阵再选版本。Web-only Base UI、CSS backdrop-filter 和 CSS pseudo-elements 必须为原生分支实现。

## 决策清单（每个项目只选必要项）

- [ ] 确认环境：React Web / Next.js / Expo Native / Tauri WebView。
- [ ] 风格目标是什么？（技术、科技、严谨、沉浸、优雅……）有参考依据吗？
- [ ] CSS token 拥有者是谁？只允许一个主要 token 来源。
- [ ] 交互原语是否已经有成熟能力？不要重写 Focus Trap、Dialog Keyboard 行为。
- [ ] 新引入的视觉组件为什么比已有组件更合适？性能、授权、可访问性检查完成了吗？
- [ ] 样式与组件是否已在目标渲染平台真实验证？

**注意**：文档描述的是当前发现的候选方案，不代表已经将库加入 `package.json`、完成安装或通过集成测试。
