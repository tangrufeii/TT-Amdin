# `sys_extension` 表结构草案

## 1. 目标

这份文档给出 V2 扩展主表 `sys_extension` 的第一版结构草案。

目标很简单：

1. 让主题、模块、挂件、混合扩展统一落库。
2. 让安装器、启动恢复、后台管理有一张语义正确的主表可用。
3. 保持第一版足够克制，不一上来拆出一堆副表。

## 2. 设计原则

### 2.1 新表使用扩展语义，不再沿用插件语义

- 表名使用 `sys_extension`
- 主业务键使用 `extension_id`

### 2.2 第一版先保留快照，不追求过度范式化

下面这些内容先放 JSON：

1. `capabilities_json`
2. `artifacts_json`
3. `manifest_json`

原因：

1. 先把运行时主链路打通
2. 避免第一版为低频查询拆一堆子表
3. 后面如果某块查询需求稳定，再拆表

### 2.3 新表字段命名统一改用 snake_case

原因：

1. 新表不继续继承 `sys_plugin` 的历史命名包袱
2. 和仓库里更多较新的系统表风格更接近

## 3. 表字段说明

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | `bigint` | 是 | 主键ID |
| `extension_id` | `varchar(128)` | 是 | 扩展唯一标识，对应 Manifest 的 `extension.id` |
| `name` | `varchar(256)` | 是 | 扩展名称 |
| `type` | `varchar(32)` | 是 | 扩展类型：`theme/module/widget/hybrid` |
| `description` | `varchar(512)` | 否 | 扩展描述 |
| `version` | `varchar(64)` | 是 | 当前安装版本 |
| `status` | `int` | 是 | 当前状态，第一版先沿用 `0=禁用`、`1=启用` |
| `manifest_version` | `int` | 是 | Manifest 版本号，旧插件迁移默认记为 `1` |
| `singleton_flag` | `tinyint(1)` | 是 | 是否单例扩展，主题必须为 `1` |
| `auto_enable` | `tinyint(1)` | 是 | 安装后是否自动启用 |
| `entry_priority` | `int` | 是 | 启动或编排优先级，值越小越优先 |
| `source_format` | `varchar(32)` | 是 | 扩展声明来源，如 `extension-yaml`、`legacy-plugin` |
| `install_source` | `varchar(64)` | 否 | 安装来源，如 `upload`、`dev-sync`、`market`、`migration` |
| `host_min_version` | `varchar(64)` | 否 | 宿主最低兼容版本 |
| `host_max_version` | `varchar(64)` | 否 | 宿主最高兼容版本 |
| `author` | `varchar(128)` | 否 | 作者名称 |
| `website` | `varchar(255)` | 否 | 作者或项目主页 |
| `email` | `varchar(255)` | 否 | 作者邮箱 |
| `is_dev` | `tinyint(1)` | 是 | 是否开发联调模式 |
| `front_dev_address` | `varchar(255)` | 否 | 前端开发联调地址 |
| `capabilities_json` | `json` | 否 | 能力声明快照 |
| `artifacts_json` | `json` | 否 | 构建产物路径快照 |
| `manifest_json` | `json` | 否 | 原始 Manifest 快照 |
| `install_checksum` | `varchar(128)` | 否 | 安装包校验摘要 |
| `created_by` | `bigint` | 否 | 创建人ID |
| `updated_by` | `bigint` | 否 | 更新人ID |
| `created_at` | `datetime` | 否 | 创建时间 |
| `updated_at` | `datetime` | 否 | 更新时间 |

## 4. 索引设计

第一版建议保留这些索引：

1. `uk_extension_id`
   - 保证扩展唯一标识全局唯一
2. `idx_extension_type`
   - 支持按扩展类型筛选
3. `idx_extension_status`
   - 支持按启用状态筛选
4. `idx_extension_type_status`
   - 支持后台按类型 + 状态查询

## 5. 为什么第一版不拆子表

### 5.1 先解决主链路

当前更重要的是：

1. 安装
2. 启停
3. 迁移
4. 恢复
5. 管理页展示

不是立刻做高级分析报表。

### 5.2 `manifest_json` 本身就是兜底快照

就算某些字段后续模型没补全，主表里也保留了原始快照，不容易丢信息。

## 6. 与旧 `sys_plugin` 的关系

### 6.1 旧表继续保留，但不再加 V2 字段

- `sys_plugin` 仅作为迁移源和兼容历史表

### 6.2 新逻辑全部围绕 `sys_extension`

后续这些能力都应该基于新表：

1. 扩展安装记录
2. 扩展状态查询
3. 类型过滤
4. 主题单例判断
5. 扩展能力展示

## 7. 迁移后的数据补全策略

SQL 迁移只能迁基础元数据，没法凭空知道完整 capability 和 artifact。

所以推荐迁移后再做一次应用级补全：

1. 启动时读取扩展目录中的 `extension.yaml` 或旧 `plugin.yaml`
2. 重新回填：
   - `capabilities_json`
   - `artifacts_json`
   - `manifest_json`
   - `host_min_version`
   - `host_max_version`

这个流程比指望 SQL 猜所有信息靠谱得多。

## 8. 对应 SQL 草案

本仓库已经补了两份草案：

1. [001_create_sys_extension.sql](D:\WorkSpace\Projects\TT-Admin\tt-amdin\sql\v2\001_create_sys_extension.sql)
2. [002_migrate_sys_plugin_to_sys_extension.sql](D:\WorkSpace\Projects\TT-Admin\tt-amdin\sql\v2\002_migrate_sys_plugin_to_sys_extension.sql)

## 9. 当前建议

下一步如果开始写代码，推荐顺序：

1. 先创建 `sys_extension` 的 PO、领域对象、Repository
2. 再让安装器和读取器改为写入新表
3. 最后把旧插件管理接口的底层查询切过去
