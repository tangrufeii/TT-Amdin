# 后端扩展运行时链路分析（V2 前置）

## 1. 文档目的

这份文档只解决一个问题：

当前后端插件安装链路里，哪些能力可以直接复用到宿主平台 V2，哪些地方必须改。

别再空谈“要做平台”，先把现有链路拆明白，不然改起来就是瞎几把碰运气。

## 2. 当前链路总览

现有后端链路已经具备一条完整的插件生命周期闭环：

1. 接口层上传 ZIP。
2. 应用层编排安装、启停、卸载流程。
3. 基础设施层解压、读配置、拷贝文件、初始化插件上下文。
4. 插件运行时注册 Controller、Mapper、WebSocket 等组件。
5. 应用层同步菜单、状态、进度事件。
6. 启动时自动扫描插件目录并恢复运行状态。

换句话说，底子不是没有，底子是“已经能跑”，只是模型还停留在 `plugin.yaml + frontend.yaml + 后台插件` 这一代。

## 3. 当前核心组件职责

### 3.1 接口层

- `PluginManagementController`
- 提供安装、启用、禁用、卸载、分页查询、前端模块查询、进度快照接口。

### 3.2 应用层

- `PluginManagementApplicationService`
- 负责事务边界、流程编排、进度上报、数据库记录落库。

- `PluginMenuSyncService`
- 负责把 `frontend.yaml` 菜单信息同步进系统菜单表和权限表。

### 3.3 基础设施层

- `PluginManagerImpl`
- 负责 ZIP 安装、版本检查、更新、安装 SQL、升级 SQL、卸载 SQL、运行时装配入口。

- `PluginHandler`
- 负责创建类加载器、创建插件 Spring 上下文、扫描类、执行注册器、调用生命周期钩子。

- `PluginConfigReader`
- 负责从插件目录读取 `plugin.yaml`。

### 3.4 启动恢复

- `PluginStartupLoader`
- 系统启动时同步插件目录、恢复数据库记录、自动安装并启动已启用插件。

### 3.5 领域模型

- `PluginManagement`
- 管数据库里的插件记录和启停状态。

- `PluginConfig`
- 承载 `plugin.yaml` 配置。

当前这套分层没有本质错误，说明后端不需要推倒重写。

## 4. 已具备、可直接复用的能力

下面这些能力，V2 基本都能继续用，别手贱重写：

### 4.1 ZIP 安装和目录落盘链路

现状：

1. 支持上传 ZIP。
2. 支持解压到临时目录。
3. 支持版本校验后拷贝到正式插件目录。

结论：

- 这部分可以直接复用。
- 需要改的是“读取 `plugin.yaml`”升级为“读取 `extension.yaml` 或兼容旧格式”。

### 4.2 生命周期总线

现状：

1. 支持安装、启用、禁用、卸载、升级。
2. 支持进度事件广播。
3. 支持启动时恢复。

结论：

- 这套生命周期骨架很值钱，V2 应继续沿用。
- 后续只需要把动作对象从“插件”提升为“扩展包”。

### 4.3 类加载器与独立 ApplicationContext

现状：

1. 每个插件独立类加载器。
2. 每个插件独立 Spring 子上下文。
3. 支持 Controller、Mapper、WebSocket 动态注册/反注册。

结论：

- 这是后端扩展运行时最难啃的一块，你现在已经有了，别重写。
- V2 后端扩展包继续走这条路最稳。

### 4.4 SQL 安装/升级/卸载机制

现状：

1. 支持安装 SQL。
2. 支持版本升级 SQL。
3. 支持卸载 SQL。

结论：

- 可以直接复用为 `migrations/` 能力。
- 只需要升级命名和元数据约束，不需要推翻执行器。

### 4.5 启动恢复和开发态同步

现状：

1. 启动时会扫描插件目录并恢复数据库记录。
2. 开发态支持从源码产物目录同步插件目录。

结论：

- 这部分可以作为 V2 的开发态联调基础。
- 后续需要从“宿主仓内插件源码同步”升级为“外部扩展仓构建产物同步/挂载”。

## 5. 当前不适合直接复用、必须改造的地方

这些地方不改，V2 根本立不住。

### 5.1 配置模型过旧，只认识 `plugin.yaml`

问题：

1. 当前 `PluginConfigReader` 只读 `plugin.yaml`。
2. 当前 `PluginConfig` 只覆盖插件基础信息、作者、SpringDoc、状态。
3. 根本没有 `type`、`capabilities`、`artifacts`、`contributes` 这些 V2 核心字段。

影响：

- 宿主无法识别主题、模块、挂件。
- 宿主无法按能力边界做校验和编排。

结论：

- 必须引入新的 `ExtensionManifest` 读取模型。
- 同时保留旧格式兼容适配器。

### 5.2 当前“插件”对象过于单一，没有扩展类型语义

问题：

1. `PluginManagement` 只有启用/禁用，没有类型概念。
2. 不区分主题、模块、挂件、混合扩展。
3. 也没有单例约束，比如主题只能同时启用一个。

影响：

- 门户主题互斥无法在后端层面正确表达。
- 后台无法基于扩展类型做管理和过滤。

结论：

- 需要把数据库记录模型从 `PluginManagement` 升级为可承载扩展类型、能力、来源、版本策略的记录模型。

### 5.3 菜单同步逻辑强绑定 `frontend.yaml`

问题：

1. `PluginMenuSyncService` 目前只认 `frontend.yaml` 的 routes/menus。
2. 它天生是后台菜单同步器，不是通用挂载编排器。
3. 门户 tab、主题 slot、挂件挂载都不在它的能力边界内。

影响：

- 当前链路适合后台插件，不适合全站扩展平台。

结论：

- 菜单同步逻辑可以保留，但要降级成 `admin menu projector`。
- V2 需要新增更通用的 `contributes` 注册中心。

### 5.4 启动恢复逻辑是“插件恢复”，不是“扩展包恢复”

问题：

1. `PluginStartupLoader` 当前按“已启用插件”恢复。
2. 不处理主题单例优先级。
3. 不处理挂件编排装载。
4. 不处理 capability 白名单检查。

影响：

- V2 若直接套上去，启动顺序会乱。

结论：

- 需要升级成 `ExtensionStartupLoader`。
- 启动时按类型和依赖顺序恢复：
  1. 核心 module/hybrid
  2. 当前主题
  3. widget 编排

### 5.5 当前前后端定义拆成两份，不利于统一扩展模型

问题：

1. 后端读 `plugin.yaml`。
2. 前端读 `frontend.yaml`。
3. 运行时编排需要在两份配置之间来回映射。

影响：

- 很难成为 AI 友好的单一扩展声明。

结论：

- 长期目标必须收敛到 `extension.yaml` 一份主声明。
- `frontend.yaml` 在过渡期兼容，后续逐步废弃。

## 6. 现有链路与 V2 的映射关系

### 6.1 可以保留的骨架

1. `PluginManagementController` 的安装/启停/卸载接口形态可以保留。
2. `PluginManagementApplicationService` 的流程编排思路可以保留。
3. `PluginManagerImpl` 的 ZIP 安装、版本检查、SQL 执行、更新机制可以保留。
4. `PluginHandler` 的运行时注册机制可以保留。
5. `PluginStartupLoader` 的启动恢复思路可以保留。

### 6.2 需要替换的核心对象

1. `PluginConfig` -> `ExtensionManifest`
2. `PluginConfigReader` -> `ExtensionManifestReader`
3. `PluginManagement` -> `ExtensionRecord` 或兼容扩展后的插件记录模型
4. `PluginMenuSyncService` -> `ExtensionContributionProjector`

## 7. V2 后端最小改造方案

这里必须收敛，不然你又会想一步干到银河系。

### 7.1 第一批必须做

1. 新增 `ExtensionManifest` 数据结构。
2. 新增 `ExtensionManifestReader`，优先读 `extension.yaml`，兼容 `plugin.yaml/frontend.yaml`。
3. 新增扩展类型字段：
   - `theme`
   - `module`
   - `widget`
   - `hybrid`
4. 新增 capability 校验。
5. 新增主题单例启用规则。
6. 把菜单同步逻辑从“插件中心逻辑”拆成“后台投影逻辑”。

### 7.2 第二批再做

1. 启动恢复顺序改造。
2. widget 和 portal slot 的后端注册模型。
3. 后台扩展管理页展示贡献信息和能力声明。

### 7.3 第三批再做

1. 旧插件平滑迁移工具。
2. AI 生成扩展包的校验器和脚手架。

## 8. 推荐改造顺序

按下面顺序搞，别乱穿插：

1. 先定义 `ExtensionManifest` 和兼容映射。
2. 再改安装链路，让安装器能识别新旧两套声明。
3. 再改数据库记录模型，让后端认识扩展类型和单例约束。
4. 再改启动恢复顺序。
5. 最后再扩门户挂载、挂件编排和后台展示。

## 9. 当前判断

### 9.1 不需要重写的部分

1. ZIP 安装器
2. 类加载与 Spring 子上下文
3. 运行时注册器
4. SQL 执行器
5. 启停/卸载生命周期骨架

### 9.2 必须重构的部分

1. Manifest 模型
2. 插件记录模型
3. contributions 注册与投影机制
4. 启动恢复顺序
5. 主题单例与 capability 约束

## 10. 下一步建议

下一步最该做的不是立刻写大量代码，而是：

1. 先设计后端 `ExtensionManifest` Java 结构。
2. 明确 `plugin.yaml/frontend.yaml -> ExtensionManifest` 适配规则。
3. 确认数据库记录模型是“扩字段升级”还是“新建扩展表”。

如果这三件事不先拍板，直接改安装器就是找抽。
