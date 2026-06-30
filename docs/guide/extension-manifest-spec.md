# 扩展包 Manifest 草案（V2）

## 1. 目标与范围

本文档用于定义宿主平台 V2 的扩展包声明规范，服务于这三件事：

1. 让宿主在运行时识别并加载主题、模块、挂件。
2. 让扩展开发者可以独立仓库开发，最终交付 ZIP 安装包。
3. 为后续 AI 生成扩展包提供稳定、可校验的输入结构。

当前版本是 MVP 草案，先保证可落地，不追求一步到位。

## 2. 文件与兼容策略

### 2.1 规范文件名

- ZIP 根目录必须包含：`extension.yaml`

### 2.2 与现有体系兼容

- 当前项目已有 `plugin.yaml` + `frontend.yaml`。
- V2 过渡期支持适配读取：
  - 如果存在 `extension.yaml`，优先按新规范加载。
  - 如果只有 `plugin.yaml`，走兼容适配器映射到 V2 内部模型。

## 3. ZIP 包结构（建议）

```text
my-extension.zip
├─ extension.yaml                  # 扩展声明（必须）
├─ dist/
│  ├─ portal/                      # 门户构建产物（可选）
│  ├─ admin/                       # 后台构建产物（可选）
│  └─ shared/                      # 可复用前端静态资源（可选）
├─ server/
│  ├─ plugin.jar                   # 后端扩展产物（可选）
│  └─ libs/                        # 后端依赖（可选）
├─ migrations/
│  ├─ install.sql                  # 安装脚本（可选）
│  ├─ upgrade_1.0.0_to_1.1.0.sql   # 升级脚本（可选）
│  └─ uninstall.sql                # 卸载脚本（可选）
├─ config/
│  ├─ defaults.json                # 默认配置（可选）
│  └─ schema.json                  # 配置 Schema（可选）
└─ README.md                       # 扩展说明（建议）
```

注意：平台只接收构建产物，不接收源码工程。

## 4. Manifest 字段定义

`extension.yaml` 草案字段如下：

```yaml
manifestVersion: 2
extension:
  id: "album-module"
  name: "相册模块"
  version: "1.0.0"
  type: "module" # theme | module | widget | hybrid
  description: "提供门户相册页、后台相册管理、相册接口"
  homepage: "https://example.com/album-module"
  author:
    name: "team-tt"
    email: "dev@example.com"
  license: "MIT"
  keywords: ["album", "gallery", "portal"]

compatibility:
  host:
    minVersion: "4.0.0"
    maxVersion: "4.x"
  runtime:
    java: "17"
    node: ">=20"

activation:
  autoEnable: false
  singleton: false
  entryPriority: 100

dependencies:
  required: []
  optional: []
  conflicts: []

capabilities:
  portal: true
  admin: true
  serverApi: true
  migration: true
  scheduler: false

artifacts:
  portalDist: "dist/portal"
  adminDist: "dist/admin"
  serverJar: "server/plugin.jar"
  migrationsDir: "migrations"
  configSchema: "config/schema.json"
  defaultConfig: "config/defaults.json"

contributes:
  portal:
    routes: []
    tabs: []
    slots: []
    widgets: []
  admin:
    routes: []
    menus: []
    pages: []
  server:
    apis: []
    permissions: []
    schedulers: []
```

## 5. 核心语义约束

### 5.1 `type`

- `theme`：门户主题包，决定 `/` 的渲染外观。
- `module`：独立业务模块，可同时有门户/后台/接口能力。
- `widget`：页面挂件，依附在主题 `slot` 中运行。
- `hybrid`：复杂组合型扩展，包含多种能力。

### 5.2 `activation.singleton`

- `theme` 类型必须强制 `singleton: true`。
- `module` / `widget` 默认 `false`，可并存。

### 5.3 `capabilities`

- 作为权限声明，不是文档装饰。
- 宿主在安装和启用时按 capability 做白名单校验。
- 声明了但包内没有对应产物，安装失败并给出明确错误。

### 5.4 `artifacts`

- 只允许引用 ZIP 内路径。
- 不允许指向宿主磁盘任意路径，防止越权加载。

## 6. `contributes` 挂载声明

### 6.1 门户挂载面

- `portal.routes`：门户页面路由。
- `portal.tabs`：门户导航 tab。
- `portal.slots`：主题定义可挂载区域。
- `portal.widgets`：挂件注册和默认挂载策略。

### 6.2 后台挂载面

- `admin.routes`：后台路由声明。
- `admin.menus`：后台菜单声明。
- `admin.pages`：后台页面级扩展位声明。

### 6.3 服务端挂载面

- `server.apis`：接口前缀、分组声明。
- `server.permissions`：权限资源声明。
- `server.schedulers`：定时任务声明。

## 7. 三类最小示例

### 7.1 主题包（theme）

```yaml
manifestVersion: 2
extension:
  id: "portal-blog-theme"
  name: "博客主题"
  version: "1.0.0"
  type: "theme"
activation:
  autoEnable: false
  singleton: true
artifacts:
  portalDist: "dist/portal"
contributes:
  portal:
    slots:
      - key: "home.hero"
        title: "首页头图区"
      - key: "home.main"
        title: "首页主体区"
```

### 7.2 模块包（module，相册示例）

```yaml
manifestVersion: 2
extension:
  id: "album-module"
  name: "相册模块"
  version: "1.0.0"
  type: "module"
capabilities:
  portal: true
  admin: true
  serverApi: true
  migration: true
artifacts:
  portalDist: "dist/portal"
  adminDist: "dist/admin"
  serverJar: "server/plugin.jar"
  migrationsDir: "migrations"
contributes:
  portal:
    tabs:
      - key: "album"
        title: "相册"
        routeName: "portal-album-index"
    routes:
      - name: "portal-album-index"
        path: "/album"
        component: "portal/album/index.js"
  admin:
    routes:
      - name: "admin-album-manage"
        path: "/admin/plugin/album"
        component: "admin/album/manage.js"
    menus:
      - key: "plugin-album"
        title: "相册管理"
        routeName: "admin-album-manage"
  server:
    apis:
      - group: "album"
        basePath: "/api/plugin/album"
```

### 7.3 挂件包（widget，每日一言示例）

```yaml
manifestVersion: 2
extension:
  id: "daily-quote-widget"
  name: "每日一言"
  version: "1.0.0"
  type: "widget"
capabilities:
  portal: true
artifacts:
  portalDist: "dist/portal"
contributes:
  portal:
    widgets:
      - key: "daily-quote"
        title: "每日一言"
        mount:
          slot: "home.hero"
          order: 50
        component: "portal/widgets/daily-quote.js"
```

## 8. 安装与运行时流程（MVP）

1. 上传 ZIP 后，宿主先校验 `extension.yaml` 基础字段和版本兼容。
2. 校验 `capabilities` 与 `artifacts` 是否一致。
3. 解压并写入扩展目录，记录安装版本和校验信息。
4. 按 `contributes` 完成路由、菜单、挂载点注册。
5. 需要时执行 `migrations/install.sql`。
6. 启用扩展后广播生命周期事件，前端刷新挂载结果。

## 9. 从旧插件配置迁移（建议）

### 9.1 字段映射

- `plugin.yaml -> extension`
  - `plugin.id -> extension.id`
  - `plugin.name -> extension.name`
  - `plugin.version -> extension.version`
- `frontend.yaml -> contributes.portal/admin`
  - `routes -> contributes.portal.routes` 或 `contributes.admin.routes`
  - `menus -> contributes.admin.menus`

### 9.2 迁移策略

1. 第一阶段保留旧格式，宿主做兼容适配。
2. 新扩展全部按 `extension.yaml` 开发。
3. 老插件逐步补齐 `extension.yaml`，最终移除旧格式适配器。

## 10. 校验清单（安装前）

1. `manifestVersion`、`extension.id`、`extension.version`、`extension.type` 是否存在。
2. `extension.id` 是否全局唯一，且命名符合规范。
3. `type=theme` 是否强制 `singleton=true`。
4. `artifacts` 路径是否真实存在于 ZIP 内。
5. `contributes` 引用的组件路径是否可解析。
6. `compatibility.host` 是否满足当前宿主版本。
7. `dependencies/conflicts` 是否满足安装约束。

## 11. 下一步落实项

1. 在后端定义 `ExtensionManifest` 数据结构与字段校验器。
2. 增加 `plugin.yaml/frontend.yaml -> extension model` 兼容适配器。
3. 基于相册模块做首个 `module` 标准样例包。
4. 在后台扩展管理页展示 `type/capabilities/contributes` 信息。
