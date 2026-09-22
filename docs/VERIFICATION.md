# 验证记录

## 设计与源码核实

- 参考插件：`/Users/konglong/Documents/dsh-input-list`，仅阅读，未修改。
- dsh 源码：`/Users/konglong/Documents/deepseek-harness`，仅阅读，未修改。
- composer 插槽为 `conversation.input.right`，属于当前 Session 作用域。
- 当前 Session 的 cwd 来自 `sessions.list.getSnapshot().byId[sessionId].cwd`。
- composer 草稿通过 `useInput` 读取、`inputActions.setDraft()` 写回。
- dsh Skill host 的真实用户调用形式是首个符合边界的 `/name` 文本；`dsh-tool-skill` 在 `agent/pre-step` 中确认 `userInvocable` 后注入 instructions。
- 插件使用同源 `fetch` 请求 Skill Explorer，不添加自定义鉴权头。

## 单元验证

执行：

```bash
npm run build
npm test
```

覆盖：

- Skill Explorer 分组目录解析、缺失依赖和 HTTP 失败。
- 当前项目根目录选择、项目级路径过滤、用户可调用过滤和去重。
- 大小写不敏感子序列搜索与前缀优先。
- 保留草稿、避免重复插入、检测其他首行斜杠命令。
- Cordis inject、插槽注册和插件卸载清理。

## 真实 dsh 验收清单

以下项目必须在真实 dsh 页面完成，并在 `screenshots.json` 中留下桌面/移动端截图：

- 打开“选择 Skill”、搜索、单选并关闭。
- 选择后原有草稿保留，未触发自动发送。
- 使用无外部副作用的测试 Skill 发送，确认宿主识别并注入。
- 依赖缺失时显示“缺少 Skill Explorer 组件”。
- 接口失败时显示失败信息并可刷新。
- 切换工作区后不显示其他工作区的项目 Skill。
- 卸载插件后按钮、面板和样式副作用消失。

## 清理

真实验收使用的测试 Skill、临时 profile、截图以外的临时文件必须在验证结束后删除。不得把凭据放入临时目录或仓库。
