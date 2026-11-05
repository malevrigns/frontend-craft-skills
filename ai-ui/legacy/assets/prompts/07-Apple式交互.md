# Apple 式审美与交互
在 {{页面}} 上应用：
- Bento 布局：大面积留白 + 分散的图片卡片，6 列网格，卡片跨 2/3/4 列。
- 状态联动：拖滑块时相关元素（图片亮度、数值）实时变化，不需要确认按钮。
- Z 轴：悬停卡片浮起阴影加深；点击后翻到前面，其他卡退后（scale .96 + 压暗）。
- 错峰入场，节奏紧（50ms），不让用户干等。
- 能用纯 CSS 3D（perspective + rotateX/Y）就不引 3D 库；只动画 transform/opacity。
可点名的 Web 交互：滚动钉住主图、情境光标（data-spotlight）、磁吸按钮（data-magnetic）、图标按钮悬停展开标签（ui-btn--expand）、导航底色跟随（ui-nav .pill）、圆形扩散换肤（data-theme-toggle）。
