# App Interaction v4.0

主入口：`SKILL.md`。新增 `references/attention-interaction.md` 与 `references/state-contract-v4.md`，用于把第一眼的注意力转换为真实交互结果。

在配套仓库根目录运行：

```sh
node app/scripts/validate-interaction.mjs examples/attention-contract/interaction-spec.json examples/attention-contract/design-spec.json
```

事件规格 3.0 仍支持旧校验器。只运行脚本不能证明视觉满意度；需实测交互和截图。单独安装时需提供 `ai-ui/` 和 `docs/` 共享资料。
