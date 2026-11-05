# Frontend Craft v4.0 — 验证报告

## 基线与改动
从 `/mnt/data/frontend-craft-skills-v3.3.zip` 解包最新 v3.3 Skill，保留 Apple 材质、Dashboard 规则、CSS 组件选型矩阵及 legacy 示例；新增首屏注意力架构、三阶段规格编译、跨 Skill 组件 ID 与行动结果约束、可运行的正反向静态测试。

## 校验范围
- `node scripts/test-v4.mjs`：12/12 正反例通过；包括无效锚点、多个焦点、未标明模拟证据、空 CTA、场景引用错误、移动端缺口、交互结果不一致。
- `node scripts/audit-css.mjs styles/`：6/6 旧 CSS 静态检查通过。
- `python scripts/test-hero-browser.py`：Chromium 1440×900、768×1024、390×844、320×640、390×667；无横向溢出；CTA/主锚点在首屏可发现；切换来源、aria-pressed、CTA 聚焦有效；减少动态效果和 JS 禁用时首屏仍可读。
- `node ai-ui/scripts/verify-evidence.mjs examples/attention-contract/qa-evidence.json`：文档证据结构校验。

## 视觉复核与修正
- 1440px 版本中的证据链次级文本较小：加大标题/说明字级。
- 320px 工作区出现偏晚：收紧手机端标题区域下方空白；主要卡片进入首视的起点由 ~454px 提前到 ~425px。
- 390×667 完整演示需滚动：接受滚动，不用固定一屏造成内容裁切；仍有可进一步压缩的余地。

## 重要限制
- 示例 TRACE 是原创虚构概念，不是用户自己的产品，也不是完整 SaaS。
- 研究数据和产品流程均标注 Demo；没有真实引用、用户数量、性能收益或外部资产许可承诺。
- 测试在无外部资源的 Chromium 中通过 `page.set_content` 进行；不是服务器部署验收，也没有真实手机 Safari 测试。
- 只做了模型辅助视觉复核，**没有真实目标用户五秒盲测或转化实验**。不能声称“顾客一定在五秒内注意到”或“转化率提高”。
- v4 静态检查可证明规范字段与引用逻辑完整，却无法自动证明美感和真实产品价值。

## 交付状态
Skill 规范、脚本与示例可供安装与进一步迭代；TRACE 单文件示例达到 `BROWSER_VERIFIED` 的自动化检查范围，**未达到 PRODUCTION_READY**。
