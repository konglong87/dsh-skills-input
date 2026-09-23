# Changelog

## 0.1.1 - 2026-09-23

- 优化包描述和关键词，覆盖 Skill、技能选择、Skill 浏览器、斜杠命令和 composer 等检索意图。
- README 增加技能选择器定位、与常用内容插件的区别及常见问题。

## 0.1.0 - 2026-09-22

- 新增 dsh composer “选择 Skill”按钮。
- 接入 Skill Explorer 的 `/api/dsh-skill-explorer/list` 接口。
- 支持当前会话作用域过滤、搜索、键盘操作、刷新和错误状态。
- 选择后保留原草稿并写入 `/skill-name `，不自动发送。
- 增加目录、搜索、草稿处理和 Cordis 卸载测试。
- 在真实 dsh 上完成桌面、移动端、依赖缺失、接口失败、工作区切换和宿主 Skill 注入验收。
