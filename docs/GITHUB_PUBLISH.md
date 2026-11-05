# GitHub 发布方式

当前 Github 连接器支持向已有仓库提交/创建文件，不提供新建 repository 操作；因此本地打包已准备好，但不能自动声称已发布到 GitHub。

推荐在账户中新建独立 `frontend-craft-skills` 仓库（建议先设为私有，检查授权再公开）。

命令行推送：

```bash
unzip frontend-craft-skills-v4.zip
cd frontend-skills-repo
git init
git add .
git commit -m "feat: frontend craft skills v4 first impression architecture"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/frontend-craft-skills.git
git push -u origin main
```

若用户提供一个**专门用于本项目的现有仓库路径**，可通过已经连接的 GitHub 工具直接提交，不需要命令行。公开前请审查原始 Skill 的授权与历史资料。
