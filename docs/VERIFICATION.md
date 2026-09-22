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

以下项目已于 2026-09-22 在真实 dsh 页面完成，并在 `screenshots.json` 中留下桌面/移动端截图：

- 桌面端打开“选择 Skill”、搜索 `ui-safe-test`、显示真实名称和描述、单选并关闭：`docs/images/desktop-open-search-select.png`。
- 移动端完成同一流程并检查面板不越界：`docs/images/mobile-open-search-select.png`。
- 选择后草稿 `保留这段草稿内容 /ui-safe-test ` 和 `移动端草稿 /ui-safe-test ` 均保留，未自动发送。
- 重复选择同一 Skill 后，草稿中 `/ui-safe-test` 仍只有一处。
- 使用无外部副作用的 `ui-safe-test` 发送后，真实页面出现 `上下文注入 ui-safe-test`，确认宿主识别并注入 Skill。隔离 profile 未配置 `DEEPSEEK_API_KEY`，模型请求随后按预期以 `MISSING_CREDENTIAL` 失败，未产生外部副作用。
- 将列表接口模拟为 HTTP 404 时显示“缺少 Skill Explorer 组件”，截图见 `docs/images/dependency-missing.png`，没有误显示为空目录。
- 将接口模拟为 HTTP 500 时显示失败信息；恢复接口后点击刷新可恢复列表。
- 切换到另一个工作区后，当前项目的 `ui-safe-test` 不再出现在列表中。
- 插件生命周期由单测验证：Slot、全局样式、事件监听和请求 AbortController 均在卸载时清理。

说明：真实 DSH 页面另有一个既有的 `conversation.chat.user-actions` 重复 Slot 控制台错误，来自当前隔离组合的宿主插件组合，不由本插件触发；本插件修复后的运行路径没有再出现 `dsh-skills-input` 运行时错误。

## 清理

真实验收使用的测试 Skill、临时 profile、截图以外的临时文件必须在验证结束后删除。不得把凭据放入临时目录或仓库。
