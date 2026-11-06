# Frontend Craft Skills 升级报告

- **时间（Asia/Singapore）**: 2026-11-06 01:15 +08
- **仓库**: https://github.com/malevrigns/frontend-craft-skills
- **分支**: main
- **Commit**: bf9132527045b99fea6c50439652f60efb83ddd5
- **Commit 说明**: feat: publish complete frontend craft skills v4.0 with examples and validation
- **仓库版本**: **4.0.0**
- **本地旧版**: 3.3.0 → 已归档
- **Clone 路径**: `/workspace/frontend-craft-skills`
- **安装目标**: `/home/box/agent-data/workflows/`

## 同步路径

| 来源 | 目标 | 说明 |
|---|---|---|
| `ai-ui/` | `workflows/ai-ui/` | SKILL + references + scripts + legacy；追加「本地约定」 |
| `app/` | `workflows/app/` | 同上 |
| `docs/` | `workflows/docs/` | 含 WORKFLOW_V4 / ARCHITECTURE_CHANGES_V4 / INSTALL_V4 等 |
| `styles/` | `workflows/styles/` | tokens / materials / motion |
| `scripts/` | `workflows/scripts/` | test-v4 / audit-css / test-hero-browser |
| `examples/` | `workflows/examples/` | 新增 attention-contract；保留本地 ATLAS-ops-v33 |
| `README.md` `AGENTS.md` `.github/` | 同名 | 顶层说明与 CI |

## 相对旧本地（v3.3）的主要变化

- Skill 从视觉约束升级为三阶段：**Design Exploration → Specification Compilation → Implementation & Visual QA**。
- 新增 First Impression Contract（唯一主锚点、五秒信息、CTA 与真实结果对齐、多视口阅读顺序）。
- 新增校验：`validate-spec.mjs`（v4，兼容转发 v3）、`validate-first-impression.mjs`、`validate-interaction.mjs`（v4）、`scripts/test-v4.mjs`（12/12）。
- 新增参考：`attention-architecture.md`、`creative-directions.md`、`first-viewport-review.md`、`spec-contract-v4.md`、`state-contract-v4.md`、`attention-interaction.md` 等。
- 新增文档：`docs/WORKFLOW_V4.md`、`ARCHITECTURE_CHANGES_V4.md`、`INSTALL_V4.md`、`VALIDATION_REPORT_V4.md`、`IMPLEMENTATION_SPEC_TEMPLATE.md`。
- 新增示例：`examples/attention-contract/`（design/interaction/spec + 截图 + qa-evidence）。
- frontmatter `name` 变为 `ai-ui-aesthetic-v4` / `app-interaction-v4`（旧中文名在 `legacy-from-v33/`）。

## 本地保留 / 追加

- **本地约定**（已追加到两个 SKILL.md）：Figma 优先、沟通中文、交付附真实截图、共享 `../docs|styles|scripts|examples`。
- 归档：`ai-ui/legacy-from-v33/`、`app/legacy-from-v33/`（含 SKILL.v33.md）。
- 更早归档仍在：`legacy-v2-local/`。
- 本地独有示例保留：`examples/ATLAS-ops-v33.html` + README。
- 未动：`skill-1793373848045/`。

## 校验结果（升级后在 workflows 根目录跑）

```
node ai-ui/scripts/validate-spec.mjs examples/attention-contract/design-spec.json  → PASS
node app/scripts/validate-interaction.mjs ... → PASS
node ai-ui/scripts/validate-first-impression.mjs ... → PASS（demo 警告正常）
node scripts/test-v4.mjs → 12/12
node scripts/audit-css.mjs styles/ → 6/6
```

## 已知注意点

1. **主 bot 仍需 UpdateSkill 注册**：磁盘已是 v4.0，技能目录前端描述可能仍显示旧中文名，需主 agent 刷新注册。
2. 自动校验只证明契约一致，**不等于审美通过或真实转化**（仓库 VALIDATION_REPORT_V4 同款免责）。
3. `examples/attention-contract` 是虚构 TRACE 演示，不是用户业务产品。
4. 旧 `schemaVersion: "3.0"` 规格仍可走 `validate-spec-v3.mjs` / 转发路径。
5. 有 Figma 时仍按本地约定优先 Figma；沟通与交付截图要求未丢。
6. 升级过程中曾出现一次脚本被旧内容覆盖的竞态；最终已用仓库文件强制对齐并通过 hash/测试核对。

## 关键路径速查

- `/home/box/agent-data/workflows/ai-ui/SKILL.md` (4.0.0 + 本地约定)
- `/home/box/agent-data/workflows/app/SKILL.md` (4.0.0 + 本地约定)
- `/home/box/agent-data/workflows/docs/CHANGELOG.md`
- `/home/box/agent-data/workflows/docs/WORKFLOW_V4.md`
- `/home/box/agent-data/workflows/examples/attention-contract/`
- `/workspace/frontend-craft-skills/` (git clone，bf91325)
- 本报告：`/workspace/frontend-craft-skills/UPGRADE_REPORT.md`
