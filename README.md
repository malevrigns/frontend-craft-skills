# Frontend Craft Skills v4.0

> AI UI Aesthetic + App Interaction：将产品需求转化为**第一眼有识别度、可理解、可信并能够操作**的视觉产品。

## 核心变化

从 v3.3 的视觉约束与 CSS 工具升级为三阶段：**Design Exploration → Specification Compilation → Implementation & Visual QA**。

新版引入 `First Impression Contract`：

- 唯一视觉主锚点（必须引用真实组件 ID）
- 五秒信息：是什么 / 为什么值得注意 / 下一步做什么
- 产品专属视觉记忆点与可信证据
- 首要 CTA 与真实交互结果对齐
- 320 / 390 / 768 / 1440px 及小高度视口的阅读顺序
- 首屏缩略图、截图和实际用户测试的区别

**重点：让目标用户注意真正的产品价值，而不是堆积玻璃、装饰或不真实的数字。** 对营销页用高辨识度构图；对 Dashboard 则让任务、当前异常或关键决策自然成为焦点。用户指定规格时精确还原，不强加新的美术方向。

## 仓库结构

- [`ai-ui/SKILL.md`](ai-ui/SKILL.md)：品牌、首屏注意力、素材、CSS、场景规格与视觉 QA。
- [`app/SKILL.md`](app/SKILL.md)：真实 CTA、事件状态、时间线、失败路径与可达性。
- [`docs/WORKFLOW_V4.md`](docs/WORKFLOW_V4.md)：可用于生成高精度实现提示词的完整架构。
- [`docs/ARCHITECTURE_CHANGES_V4.md`](docs/ARCHITECTURE_CHANGES_V4.md)：与 v3.3 的差异。
- [`ai-ui/references/attention-architecture.md`](ai-ui/references/attention-architecture.md)：首屏抓眼/可信表达规则。
- [`ai-ui/references/creative-directions.md`](ai-ui/references/creative-directions.md)：多种创意构图方向选择。
- [`ai-ui/references/first-viewport-review.md`](ai-ui/references/first-viewport-review.md)：视觉验收与五秒测试协议。
- [`examples/attention-contract/`](examples/attention-contract/)：独立演示 TRACE（非用户产品），包含规格 JSON、交互 HTML、屏幕截图和测试记录。
- [`docs/LIBRARY_SELECTION.md`](docs/LIBRARY_SELECTION.md)、[`styles/`](styles/)：保留 v3.3 CSS 组件选型与原创样式配方。
- `legacy/`：原版实验素材，仅供参考，默认不导入。

## 规范如何校验

```bash
node ai-ui/scripts/validate-spec.mjs examples/attention-contract/design-spec.json
node app/scripts/validate-interaction.mjs examples/attention-contract/interaction-spec.json examples/attention-contract/design-spec.json
node ai-ui/scripts/validate-first-impression.mjs examples/attention-contract/design-spec.json examples/attention-contract/interaction-spec.json
node scripts/test-v4.mjs
```

旧 `schemaVersion: "3.0"` 规格仍可由原路径验证；v4.0 为新增首屏场景与交叉一致性门槛。代码检查不等于审美检查，不等于真实转化率证据。

## 样例

`examples/attention-contract/index.html` 是不依赖安装的概念演示，使用模拟数据，**非真实研究工具、非用户业务产品**。桌面 / 手机截图来自 Chromium 测试环境；没有经由真实目标客户做 5 秒理解测试，也不宣称提高转化率。

## 发布与许可证

本仓库用于公开管理两个前端 Skill。原始 Skill 与第三方代码许可应由权利人确认；新增示例与规范为本次原创，不包含 Impeccable 的代码，也不复制 Velia 具体素材、UI 或 JavaScript。
