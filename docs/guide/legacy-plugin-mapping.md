# 旧插件配置到 V2 扩展模型的映射规则

## 1. 文档目的

这份文档专门回答一个现实问题：

现有仓库已经有一堆 `plugin.yaml + frontend.yaml` 插件，V2 不可能一夜之间全部重写，那怎么兼容。

答案不是“继续永远双轨跑”，而是：

1. 运行时先兼容旧格式。
2. 内部统一转成 `ExtensionManifest`。
3. 新扩展一律按 `extension.yaml` 开发。
4. 老扩展逐步迁移。

## 2. 兼容总原则

### 2.1 外部双格式，内部单模型

- 外部允许：
  - `extension.yaml`
  - `plugin.yaml + frontend.yaml`
- 后端内部只流转：
  - `ExtensionManifest`

### 2.2 旧插件默认按后台插件处理

- 旧插件的 `frontend.yaml` 本质是后台路由/菜单定义
- 所以兼容期默认映射到 `admin` 贡献

### 2.3 不对旧插件做“门户推断”

- 旧配置里根本没有可靠的门户语义
- 不要瞎猜哪些路由该挂 `/`

## 3. 识别顺序

安装器读取顺序建议固定如下：

1. 如果 ZIP 根目录存在 `extension.yaml`，按 V2 新格式读取。
2. 否则如果存在 `plugin.yaml`，走旧格式适配。
3. 如果两者都不存在，直接判定为非法扩展包。

## 4. 旧格式映射结果

### 4.1 扩展类型

旧插件默认映射为：

- `extension.type = hybrid`

原因：

1. 旧插件可能带后端接口
2. 可能带后台菜单和路由
3. 未来兼容时最不容易把能力砍丢

如果后续要更细，可以加规则优化，但第一版别折腾。

### 4.2 能力声明

按文件存在情况推导：

1. 存在 `frontend.yaml`：
   - `capabilities.admin = true`
2. 存在后端产物或可加载代码：
   - `capabilities.serverApi = true`
3. 存在 `sql/`：
   - `capabilities.migration = true`
4. 门户能力默认：
   - `capabilities.portal = false`

### 4.3 产物声明

旧插件目录可临时映射为：

1. `artifacts.serverJar`
   - 对应现有插件后端运行产物目录语义
2. `artifacts.adminDist`
   - 对应现有 `ui` 构建产物
3. `artifacts.migrationsDir`
   - 对应 `sql/`

注意：

- 这里是内部模型映射，不代表旧 ZIP 结构已经符合新规范

## 5. 字段级映射表

### 5.1 `plugin.yaml`

| 源字段 | 目标字段 | 备注 |
|---|---|---|
| `plugin.id` | `extension.id` | 必填 |
| `plugin.name` | `extension.name` | 必填 |
| `plugin.version` | `extension.version` | 必填 |
| `plugin.description` | `extension.description` | 可空 |
| `plugin.minimalVersion` | `compatibility.host.minVersion` | 可空 |
| `plugin.updateUrl` | 暂不进入 V2 主模型 | 先保留旧逻辑 |
| `plugin.staticLocations` | 暂不进入 V2 主模型 | 后续并入 artifacts 或资源规则 |
| `author.name` | `extension.author.name` | 可空 |
| `author.email` | `extension.author.email` | 可空 |
| `author.webSite` | `extension.author.website` | 命名统一 |

### 5.2 `frontend.yaml`

| 源字段 | 目标字段 | 备注 |
|---|---|---|
| `renderer` | 扩展前端加载策略扩展字段 | 第一版先兼容保留 |
| `modules[].routes[]` | `contributes.admin.routes[]` | 默认后台路由 |
| `menus[]` | `contributes.admin.menus[]` | 默认后台菜单 |
| `i18n` | 前端扩展属性 | 第一版可暂挂原始数据 |

## 6. 路由映射规则

### 6.1 旧 `routes[]` -> `contributes.admin.routes[]`

直接映射这些字段：

1. `name`
2. `path`
3. `component`
4. `componentName`
5. `meta.title`
6. `meta.i18nKey`
7. `meta.icon`
8. `meta.order`
9. `meta.keepAlive`
10. `meta.layout`

### 6.2 旧 `menus[]` -> `contributes.admin.menus[]`

直接映射这些字段：

1. `routeName`
2. `parent`
3. `title`
4. `i18nKey`
5. `icon`
6. `order`

## 7. 兼容适配器职责

建议后续增加 `LegacyPluginManifestAdapter`，职责只有 3 个：

1. 读取旧 `plugin.yaml`
2. 读取旧 `frontend.yaml`
3. 输出统一的 `ExtensionManifest`

它不应该负责：

1. 安装目录拷贝
2. 菜单入库
3. 路由注册
4. 插件启动

职责别乱，越乱越臭。

## 8. 迁移分期

### 阶段 A：兼容运行

1. 旧插件继续可安装
2. 宿主内部统一使用 `ExtensionManifest`

### 阶段 B：新扩展切换

1. 新主题、模块、挂件必须使用 `extension.yaml`
2. 新能力不再往旧 `frontend.yaml` 里塞

### 阶段 C：旧插件迁移

1. 给老插件逐步补 `extension.yaml`
2. 验证兼容逻辑无依赖后，再移除旧适配器

## 9. 当前建议

如果准备进代码阶段，推荐改造顺序是：

1. 先写 `ExtensionManifest` Java 模型
2. 再写 `LegacyPluginManifestAdapter`
3. 再把安装器内部消费对象切到 `ExtensionManifest`
4. 最后改启动恢复和菜单投影
