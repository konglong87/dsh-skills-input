# dsh-skills-input

在 dsh composer 中选择当前会话可手动调用的 Skill，并把真实调用指令写入草稿。插件只回填草稿，不自动发送，也不修改 dsh 核心。

## 依赖

本插件采用方案 A，依赖已经安装并启用的 **Skill Explorer** 组件提供：

```text
GET /api/dsh-skill-explorer/list?cwd=<当前会话 cwd>
```

接口必须返回当前上下文的 Skill 目录，至少包含 `groups[].skills[]`，Skill 项需要有 `name`、`description`、`userInvocable`，项目级条目还应提供 `path`。`projectRoots` 用于确认当前 cwd 对应的项目根目录。

这里的 “Skill Explorer” 是接口契约，不是任意名为 “Skill Manager” 的插件。没有提供上述接口的组件不兼容；本插件不会扫描磁盘，也不会自己维护 Skill 数据库。

## 安装

在已安装 dsh 的环境中执行：

```bash
dsh plugin --profile web add github:konglong87/dsh-skills-input
```

同时安装并启用一个真正提供 `/api/dsh-skill-explorer/list` 的 Skill Explorer 组件，然后重启 web profile：

```bash
dsh --profile web
```

未安装 Skill Explorer 时，面板会明确提示缺少依赖，而不是显示“当前工作区没有 Skill”。

## 使用

1. 打开 dsh composer，点击“选择 Skill”。
2. 搜索并选中 Skill。
3. 插件把 `/skill-name ` 写入当前草稿，并保留原有内容。
4. 用户确认草稿后自行发送。

V1 只支持单次选择。已有相同调用指令时不会重复插入；草稿首个非空命令行已有其他斜杠命令时会提示冲突，避免生成歧义指令。

列表只保留当前上下文内 `userInvocable !== false` 的 Skill，并按名称去重。模型专用 Skill、其他项目目录中的 Skill 不会出现在列表中。界面提供搜索、键盘上下选择、Enter 确认、Escape/点击外部关闭、刷新、加载/空/失败状态，并适配移动端和暗色主题。

## 已核实的宿主契约

- 插槽：`conversation.input.right`，按当前 Session 作用域注册。
- Client inject：`slots`、`sessions`。
- 当前工作目录：`sessions.list.getSnapshot().byId[sessionId].cwd`。
- 认证：浏览器同源请求，使用 `credentials: "same-origin"`，不增加自定义鉴权头。
- 草稿写回：composer 注入的 `inputActions.setDraft()`。
- Skill 调用：dsh Skill host 识别首个符合边界的 `/skill-name` 文本，并在 `agent/pre-step` 注入 Skill instructions；本插件不把 `/skill-name` 当作未经核实的约定，而是按宿主源码验证后的真实语法写入。

## 开发

```bash
npm ci
npm run build
npm test
npm pack --dry-run
```

目录职责：

| 路径 | 职责 |
| --- | --- |
| `src/client.jsx` | Cordis client 注入、插槽注册和生命周期 |
| `src/catalog.js` | Skill Explorer 请求入口 |
| `src/model.js` | 纯函数：标准化、作用域过滤、去重、搜索、草稿处理 |
| `src/panel.jsx` | 面板状态、键盘交互、焦点与错误处理 |
| `src/styles.css` | 桌面、移动端、暗色变量适配 |
| `src/host.js` | 无核心改动的 Host 入口 |
| `tests/` | 目录、搜索、过滤、草稿和生命周期单测 |

## 限制

本插件不提供 Skill 安装、编辑、删除、数据库、管理后台、多 Skill 编排或自动发送，也不修改 `dsh-input-list`。

## 验证

验证阶段记录在 [docs/VERIFICATION.md](docs/VERIFICATION.md)，截图索引在 [screenshots.json](screenshots.json)。真实 dsh 验收必须同时检查桌面和移动端截图、依赖缺失、接口失败、切换工作区和插件卸载。

## 版本

见 [CHANGELOG.md](CHANGELOG.md)。

## 许可证

MIT，见 [LICENSE](LICENSE)。
