# 安装指南

完整包推荐：将 `ai-ui/`、`app/`、`docs/`、`styles/` 一起放入同一父目录或项目仓库。两个 Skill 需要互相引用 `design-spec.json` 和 `interaction-spec.json`，独立包单独使用时不能执行完整交叉门槛。

例如安装到支持 Agent Skills 的项目时，可将 `ai-ui/` 和 `app/` 各复制到该客户端的技能目录，保证完整 `references/` 和 `scripts/`，另外将 `docs/` 与 `styles/` 放在技能目录的共享父级。根据客户端要求对 `SKILL.md` 的相对路径做适配。

运行 JSON 规格校验需 Node 18+，不依赖 npm 包。可用项目根目录中的 `scripts/test-v4.mjs` 验证完整包，浏览器样例使用 `examples/attention-contract/index.html`，直接打开即可运行。

不要使用过时的 `legacy` 组件自动覆盖现有设计系统；不要将原始 Skill 与第三方组件授权不明确的内容直接发布到公开仓库。
