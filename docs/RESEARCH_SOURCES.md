# 官方资料 / 核验来源

核验日期：2026-11-01。链接用于定期回查 API 兼容性；此仓库没有直接 vendoring 第三方代码。

- Tailwind CSS v4, `@theme`: https://tailwindcss.com/docs/theme
- Tailwind Color system, OKLCH: https://tailwindcss.com/docs/colors
- Open Props, CSS variables and individual prop packs: https://open-props.style/
- Panda CSS, build-time atomic CSS + typed recipes: https://panda-css.com/docs
- vanilla-extract, build-time TypeScript CSS: https://vanilla-extract.style/
- UnoCSS, on-demand atomic CSS: https://unocss.dev/
- Base UI, unstyled accessible React primitives: https://base-ui.com/react/overview/about
- shadcn/ui, code distribution & open-code components: https://ui.shadcn.com/docs
- shadcn/ui GitHub registry support: https://ui.shadcn.com/docs/registry/github
- daisyUI, Tailwind plugin (v5): https://daisyui.com/docs/install/
- Motion for React, layout animation: https://motion.dev/docs/react-layout-animations
- React Bits, source-first components & animations: https://reactbits.dev/
- Magic UI, visual components: https://magicui.design/docs/components
- Aceternity UI, React & Tailwind effects: https://ui.aceternity.com/components
- Uiverse / Galaxy community CSS components (MIT archive): https://github.com/universmc/uiverse.io
- Animista CSS animation generator (FreeBSD for exported CSS): https://animista.net/
- Hover.css license differs for commercial/non-commercial usage: https://github.com/IanLunn/Hover
- NativeWind, React Native styling and compatibility: https://www.nativewind.dev/docs
- Apple Human Interface Guidelines — Materials: https://developer.apple.com/design/human-interface-guidelines/materials

## 核心结论

- Apple 的官方文档将 Liquid Glass 定位为控制与导航材质；不建议在内容层普遍使用，能解释为什么很多全页磨砂 Dashboard 像模板。
- shadcn/ui 提供源码可编辑组件，不是固定黑箱组件包；可以作为企业交互基础，但**不能代替整体艺术指导**。
- Base UI 无样式，适合自己写高水准 CSS 的项目，减少从零实现无障碍交互的风险。
- Magic UI / Aceternity / React Bits 是视觉案例和可选组件，不是“每一页都应装饰”规则。
- 跨 Expo Native 与 Web 必须分离 CSS 能力与交互实现，不能假定浏览器 CSS 原语在 RN Native 可用。
