# TRACE — Implementation Specification (compiled v4 example)

## 00. Delivery & Priority
交付独立 `index.html`，全部 HTML/CSS/JS 内联；无远程素材依赖、无 npm。响应式且可操作。此文档是**模拟产品示例**，不代表真实客户需求或用户转化实测；不复制 Velia 视觉素材或脚本。

## 01. Product-first Creative Thesis
TRACE 是“有证据路径的 AI 研究”概念产品。用户最在意的是不确定 AI 回答背后的依据，因此独特设计符号不是 AI 光球，而是研究结论到来源节点之间的具体路径。主画面使用暗石墨底、微暖金色标记与严谨的研究工具排版。放弃通用三卡、蓝紫渐变和无关风景视频。

## 02. First Impression Contract
- What: 面向研究团队的可溯源 AI 工作台。
- Why: 关键结论能连接到可见证据路径。
- Next: 点击 `hero-cta`（探索演示工作台），结果 `source-trail-demo-open`。
- Dominant visual anchor: `source-trail`（实际 UI id 为 `trail-demo`），第一场景唯一主演示对象。其他内容服务解释、操作，不与其竞争。
- Proof: 仅为交互式概念 Demo，不是可核验来源；显式可见 `DEMO DATA`、`SIMULATED`。

## 03. Foundation & Asset Manifest
字体用系统无衬线及适配中文的本地回退；无外部资源。背景 `#101719`；前景 `#f5f5ed`；暖金 `#e2c18c`。仅对主要 CTA 和证据路径使用暖金，弱化其他强调。浮动工作区用渐变实体底、细边框和柔和投影，不滥用模糊或逐卡阴影。

## 04. Scene Blueprints
- 第一场景 `hero`：导航、`hero-title`、`hero-cta`、`source-trail`、`demo-caption`。
- Desktop ≥ 761px：Grid 主体 0.87fr / 1.13fr，间距约 34–92px，内容宽度不超过 1320px，左右对齐中线。标题约 60–90px；工作区右侧展示研究结论与三级来源节点。
- Mobile ≤ 760px：转换为上下堆叠，标题缩至 42–72px；CTA 必须先于工作区但工作区顶端仍进入首视范围；短屏保留滚动。
- Main UI：`source-trail` 含 appbar、研究声明、source list、所选来源说明，层次轻重通过对比和空间实现；不加入假数据或声称真实研究结论。

## 05. Motion & State Orchestration
- 点击 `hero-cta`：通过 native anchor 到 `#trail-demo`；JS 增强焦点和暖金描边，不改变真实链接语义。动作目的 orientation/feedback。
- 点击 `source-node-1`（及同类 source）：更换 `aria-pressed`、说明文字；不请求外网，不假装连接真实论文数据库。
- `reduced-motion`：取消 workspace 3D 微动及链接平滑滚动；关键界面静态可见。
- 任何动画不能阻挡 CTA；JS 禁用时文案、链接和产品演示布局保持可读。

## 06. Responsive & Small-height Contract
Chrome 1440x900、768x1024、390x844、320x640、390x667；各尺寸不得横向溢出，主 CTA 在首视范围。手机主要证据链上半部可见，下面节点允许随页面滚动继续查看。

## 07. Accessibility, Performance & Honesty
- native button + anchor，`aria-pressed` 和 `aria-live`，显示 focus ring。
- Demo 明确可见“CONCEPT/DEMO DATA/SIMULATED”，不包含客户数、收益、真实研究来源及虚假成功。
- 无视频、远程资源、无限重动画；对禁动和无 JS 场景提供原生结构。

## 08. Acceptance & Evidence
- `design-spec.json` 与 `interaction-spec.json` 必须通过 v4 一致性校验。
- 自动化 Chromium 5 种视口检查无横向溢出、首屏 CTA 可见、来源切换结果正确、CTA 聚焦正确；禁动/无 JS 内容可见。
- 桌面与移动截图保存于本目录（非真实用户体验研究）；另需目标用户盲测才能验证五秒识别与真实转化效果。
