# AI UI Aesthetic v4.0

主入口：`SKILL.md`。首次使用请阅读 `references/attention-architecture.md`、`references/spec-contract-v4.md`、`references/first-viewport-review.md`。

在配套仓库根目录运行：

```sh
node ai-ui/scripts/validate-spec.mjs examples/attention-contract/design-spec.json
node ai-ui/scripts/validate-first-impression.mjs examples/attention-contract/design-spec.json examples/attention-contract/interaction-spec.json
```

保留的 `references/apple-grade-materials.md`、Dashboard 规范、CSS 工程文件与 `legacy/` 不自动强加到所有项目。单独安装时需同时提供 `app/` 和 `docs/` 共享资料以执行联合契约。
