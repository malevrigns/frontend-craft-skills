# DESIGN.md（项目设计规范模板，放到项目根目录让 AI 每次都读）

## 立场
- 一句话气质：{{安静、克制、有纸感}}
- 风格方向：{{editorial}}（对应 ui-kit/themes/{{editorial}}.css）
- 三旋钮：变化度 {{6}} / 动效 {{4}} / 密度 {{3}}

## Tokens（唯一来源：ui-kit/tokens.json）
- 颜色：bg / surface / ink / ink-2 / ink-3 / line / accent（主色只给关键动作）
- 字号：12 / 14 / 16 / 18 / 24 / 32 / 48 / 72（单页 ≤ 5 级）
- 间距：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
- 圆角：8 / 12 / 16 / 24 / 999；阴影：shadow-1/2/3（不用自定义大阴影）
- 动效：ease-out 入场、ease-spring 按压回弹；160/240/360ms；错峰 50ms

## 组件约定
- 主按钮 48px 全圆角；一屏最多 1 个主按钮
- 卡片 hover 浮起 4px；空状态必须有插画 + 按钮
- 图标：assets/icons 线性 1.75 描边，不用 emoji

## 禁区
紫色渐变 / 全部居中 / 三等分特性卡 / 模板文案 / Inter 单字体 / 动画 width/height

## 验收
`node scripts/lint-ui.mjs src` 无 error；375/1280 截图无溢出；prefers-reduced-motion 可用
