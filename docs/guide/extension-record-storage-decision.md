# 扩展记录存储模型决策

## 1. 要解决的问题

宿主平台 V2 要不要继续沿用现在的 `sys_plugin`，通过加字段把它升级成扩展记录表；  
还是直接新建一张扩展主表，例如 `sys_extension`。

这不是命名洁癖问题，这是后面会不会继续把数据层干成一坨屎的问题。

## 2. 当前事实

### 2.1 现有 `sys_plugin` 很薄

当前 `sys_plugin` 只存这些东西：

1. `pluginId`
2. `name`
3. `desc`
4. `version`
5. `author`
6. `website`
7. `email`
8. `isDev`
9. `frontDevAddress`
10. `status`
11. 创建更新信息

它本质上是“插件管理列表表”，不是“扩展运行时主记录表”。

### 2.2 现有后端对这张表的耦合范围有限

直接耦合点主要集中在：

1. `PluginManagementPO`
2. `PluginManagementRepositoryImpl`
3. `PluginManagementConvert`
4. `PluginManagementApplicationService`
5. `PluginStartupLoader`

前端插件管理页依赖的是接口返回字段，不是直接依赖数据库表。

这说明：  
**如果要换底层主表，改造范围是可控的，不是全站爆炸。**

### 2.3 其他业务基本没有把 `sys_plugin` 当强外键中心

当前搜索结果看下来：

1. `pluginId` 更多是业务标识，用在插件目录、插件运行时、代码生成等场景。
2. 没看到大量别的核心主表强依赖 `sys_plugin.id` 做外键。

这点很关键。  
如果别的表全靠它活，那你还得保守点；现在不是这个局面。

## 3. 两种方案对比

## 3.1 方案 A：继续扩字段升级 `sys_plugin`

### 优点

1. 现有表和代码名都不用大动。
2. 插件管理页短期改动少。
3. 数据迁移步骤看起来简单。

### 缺点

1. 语义已经错了，V2 管的不是“插件”，而是“扩展”。
2. 需要继续往表里塞：
   - `type`
   - `manifestVersion`
   - `singleton`
   - `entryPriority`
   - `capabilities`
   - `artifacts`
   - `contributes`
   - `sourceFormat`
   - `installChecksum`
   - `rawManifest`
3. 老字段和新字段会混在一起，表会越来越像杂物间。
4. 后面主题、挂件、模块都放这张“插件表”里，语义会越来越拧巴。
5. 以后真想彻底改名，又得再迁一次。

### 结论

短期省事，长期恶心。  
这是典型“今天少改一点，半年后多吃三倍屎”。

## 3.2 方案 B：新建 `sys_extension` 主表

### 优点

1. 语义正确，V2 数据模型从第一天就是扩展模型。
2. 可以按 V2 需要设计字段，不被旧插件概念绑死。
3. 主题、模块、挂件、混合扩展都能统一落表。
4. 后面做主题单例、能力校验、启动顺序、挂载编排更自然。
5. 旧插件兼容逻辑可以收敛在适配器层，不污染主记录表语义。

### 缺点

1. 需要做一次数据迁移。
2. 需要改仓储、转换器、启动恢复和管理接口底层实现。
3. 短期内会出现“代码里还叫 plugin，底层表已经是 extension”的过渡状态。

### 结论

工程改动稍大一点，但方向是对的。  
这是能把后面路铺平的方案。

## 4. 最终决策

**采用方案 B：新建 `sys_extension` 作为 V2 扩展主表。**

`sys_plugin` 的处理策略：

1. 不再继续向 `sys_plugin` 扩展 V2 核心字段。
2. 作为旧插件时代的兼容历史表逐步退出。
3. 在迁移窗口内可保留只读兼容或一次性迁移脚本。

## 5. 为什么这个决策更稳

### 5.1 V2 的核心对象已经变了

V2 管的是：

1. `theme`
2. `module`
3. `widget`
4. `hybrid`

这四类对象塞进“插件表”本身就不对味。

### 5.2 当前表承载不了 V2 语义

V2 至少需要天然支持：

1. 扩展类型
2. 单例约束
3. 能力声明
4. 安装来源
5. Manifest 版本
6. 产物路径快照
7. 原始 Manifest 快照
8. 当前激活策略

这些往 `sys_plugin` 里堆，只会越来越丑。

### 5.3 当前代码耦合可控，正适合趁早切

现在切，成本还能控。  
等你后面主题切换、挂件编排、扩展市场、AI 生成全上了，再切就是大出血。

## 6. 推荐表设计方向

第一版建议只设计一张主表：

- `sys_extension`

建议核心字段：

1. `id`
2. `extension_id`
3. `name`
4. `type`
5. `description`
6. `version`
7. `status`
8. `manifest_version`
9. `singleton_flag`
10. `auto_enable`
11. `entry_priority`
12. `source_format`
13. `install_source`
14. `host_min_version`
15. `host_max_version`
16. `is_dev`
17. `front_dev_address`
18. `capabilities_json`
19. `artifacts_json`
20. `manifest_json`
21. `install_checksum`
22. `created_by / updated_by / created_at / updated_at`

### 6.1 为什么这里允许 JSON

第一版先让主表扛住运行时主索引和元数据快照：

1. `capabilities_json`
2. `artifacts_json`
3. `manifest_json`

这样不会一上来把表拆成七八张。  
后面如果某块查询频率高，再拆副表。

## 7. 兼容与迁移策略

## 7.1 迁移阶段 1：建新表，不停旧逻辑

1. 新增 `sys_extension`
2. 新增扩展领域对象、PO、Repository
3. 先把读取器和安装器改成写新表

## 7.2 迁移阶段 2：把旧数据迁入新表

迁移规则：

1. `sys_plugin.pluginId -> sys_extension.extension_id`
2. `name/desc/version/author/email/website/isDev/frontDevAddress/status` 直接迁
3. `type` 默认设为 `hybrid`
4. `source_format` 默认设为 `legacy-plugin`
5. `manifest_version` 对旧插件记为 `1` 或 `legacy`

## 7.3 迁移阶段 3：管理接口底层切到新表

1. 插件管理页接口先不急着改 URL
2. 仍可保留 `/plugin/management/*`
3. 但底层查询和保存从 `sys_extension` 取

这叫“外部接口先稳住，内部语义先纠正”。

## 7.4 迁移阶段 4：逐步废弃 `sys_plugin`

可选策略：

1. 保留历史表，不再写入
2. 保留迁移脚本和回滚说明
3. 等旧逻辑彻底切完再删除

## 8. 现阶段不建议做的事

1. 不要现在就把管理接口、前端页面、菜单权限全部从 `plugin` 改名成 `extension`
2. 不要第一版就拆一堆 `extension_capability`、`extension_artifact`、`extension_slot_binding` 子表
3. 不要试图同时完成数据库改造、运行时改造、前端改造

先把主表切稳，再往上改。

## 9. 当前建议

基于现有项目状态，最稳的路线是：

1. **新建 `sys_extension` 主表**
2. **保留现有插件管理 API 作为兼容壳**
3. **底层仓储和领域模型逐步切到扩展语义**
4. **旧 `sys_plugin` 不再继续加 V2 核心字段**

这条路线最不花哨，但最抗揍。
