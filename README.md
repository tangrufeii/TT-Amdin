# TT-Admin

## 项目简介
TT-Admin 是一个基于 DDD 分层的后台管理系统，包含后端服务与前端管理台，并支持插件化扩展与统一的插件前端开发流程。

## 目录结构
- tt-admin-backend: 后端服务
  - tt-admin-domain: 领域模型
  - tt-admin-application: 用例编排
  - tt-admin-infrastructure: 持久化与外部集成
  - tt-admin-interfaces: REST 接口与 DTO
  - tt-admin-plugin-core: 插件通用能力与常量
  - tt-admin-plugins: 内置插件源码
- tt-admin-frontend: 前端管理台（Vite + Vue3）
  - src: 业务页面
  - packages: 通用封装
  - public: 静态资产
- tt-amdin/sql: 插件与初始化 SQL

## 技术栈
- 后端: Java 21, Spring Boot, JUnit5, MockMvc
- 前端: Vite, Vue3, TypeScript, pnpm

## 环境要求
- JDK 21
- Maven 3.9+
- Node.js 18+ 与 pnpm
- MySQL 与 Redis

## 快速开始
### 后端
- 全量构建: `mvn clean verify`
- 启动接口: `mvn -pl tt-admin-server spring-boot:run`
- 定向测试: `mvn -pl <module> -am test`
- 配置文件: `tt-admin-backend/tt-admin-server/src/main/resources/application.yml`
- 本地敏感配置: `tt-admin-backend/tt-admin-server/src/main/resources/application-local.yml`

### 前端
- 安装依赖: `pnpm install`
- 开发模式: `pnpm dev`（读取 `.env.dev`）
- 构建产物: `pnpm build` 或 `pnpm build:dev`
- 预览验证: `pnpm preview`
- 提交前: `pnpm lint` 与 `pnpm typecheck`

## 插件化说明
### 目录与资源
- 插件源码: `tt-admin-backend/tt-admin-plugins/<plugin>`
- 插件配置: `plugin.yaml`、`frontend.yaml`、`setting.json`
- 插件静态资源: `src/main/resources/ui`（构建产物，不提交）
- 插件 SQL: 统一放入 `tt-amdin/sql`

### plugin.yaml 关键字段
- `id/name/version/staticLocations`: 插件元数据与静态资源路径
- `isDev/frontDevAddress`: 插件前端开发模式配置

### 前端插件加载
- 插件模块通过 `frontend.yaml` 描述并由前端动态注册路由与菜单。
- 开发模式下，插件模块从 `frontDevAddress` 的 dev server 加载。
- 生产模式下，插件模块从 `/api/plugin-static/{pluginId}` 加载。

### 打包与共享依赖
- 插件打包需先构建宿主生成 `shared-lib`，以避免插件重复打包宿主依赖。
- 插件构建产物与资源目录必须忽略提交。

## 提交规范（Conventional Commit）
提交使用 `pnpm commit`（英文）或 `pnpm commit:zh`（中文），示例：
- `feat(plugin): enable dynamic loading`

常见类型对照：
| 类型 | 说明 | 例子 |
| --- | --- | --- |
| feat | 新功能 | `feat(plugin): add dictionary api` |
| fix | 修复问题 | `fix(ai-chat): handle sse error` |
| docs | 文档 | `docs: update plugin dev guide` |
| style | 格式调整（不影响代码逻辑） | `style(frontend): format lint` |
| refactor | 重构 | `refactor(plugin): extract api module` |
| perf | 性能优化 | `perf(route): reduce re-render` |
| test | 测试 | `test(plugin): add service tests` |
| build | 构建/依赖 | `build: bump pnpm lock` |
| chore | 维护/杂项 | `chore: cleanup build outputs` |
| ci | CI 相关 | `ci: update pipeline` |

## 贡献与规范
- PR 需包含目标、影响路径、已运行指令及结果，并附带 UI 截图或录像（如涉及 UI）。
- 单次提交聚焦一个模块，必要时标注关联 SQL。

## 文档入口
- 插件开发与前端说明: `tt-admin-frontend/docs/plugin-dev.md`
