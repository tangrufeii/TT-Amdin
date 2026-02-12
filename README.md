

# TT-Admin 插件化后台管理系统

## 项目简介

TT-Admin 是一个基于 **领域驱动设计 (DDD)** 架构的现代化后台管理系统。系统采用分层架构设计，实现了高度的内聚与解耦，并创新性地引入了**插件化架构**。

系统的核心优势在于前后端均支持动态扩展：
*   **后端插件化**：支持热插拔的业务模块（插件），每个插件拥有独立的类加载器、Bean 上下文和数据库表前缀，确保插件之间以及插件与宿主之间的完全隔离。
*   **前端插件化**：支持动态路由和菜单注册，插件前端模块可独立开发、构建，并通过统一的接口加载至主应用。
*   **代码生成器**：内置强大的代码生成插件，支持从数据库表结构一键生成包含前后端代码的完整插件模板，极大提升开发效率。

## 技术栈

### 后端技术
*   **核心语言**: Java 21
*   **框架**: Spring Boot 3.x
*   **架构模式**: 领域驱动设计 (DDD)
*   **数据库访问**: MyBatis-Plus
*   **认证授权**: Sa-Token
*   **API 文档**: Knife4j (SpringDoc OpenAPI 3)
*   **插件引擎**: 自研类加载器 (PluginClassLoader)、Spring 上下文隔离

### 前端技术
*   **构建工具**: Vite 5.x
*   **框架**: Vue 3 (Composition API)
*   **UI 组件库**: Naive UI
*   **状态管理**: Pinia
*   **语言**: TypeScript
*   **包管理**: pnpm

## 项目架构

TT-Admin 采用标准的 DDD 分层架构，并在此基础上构建了插件运行时环境。

### 后端架构 (DDD 分层)

```
tt-admin-backend
├── tt-admin-domain          # 领域层 (Domain)
│   ├── auth/user            # 用户领域模型 (User, UserProfile)
│   ├── plugin               # 插件核心领域 (Plugin, PluginConfig, 生命周期)
│   └── system               # 系统通用领域 (Menu, Dict, Route)
├── tt-admin-application     # 应用层 (Application Services)
│   ├── auth                 # 认证与授权用例
│   ├── menu                 # 菜单与路由编排
│   ├── plugin               # 插件管理用例 (安装、启用、生命周期)
│   └── ...                  # 其他业务用例
├── tt-admin-infrastructure  # 基础设施层 (Infrastructure)
│   ├── auth                 # Sa-Token 实现
│   ├── plugin               # 插件引擎核心实现
│   │   ├── engine           # 类加载器、扫描器、上下文隔离
│   │   ├── registry         # Controller/Mapper/Bean 注册处理器
│   │   └── persistence      # 插件持久化配置
│   └── system               # 菜单、字典、权限的 MyBatis 实现
├── tt-admin-interfaces      # 接口层 (REST API)
│   └── http                 # Controller 与 DTO 定义
└── tt-admin-plugin-core     # 插件核心抽象 (BasePluginLifecycle)
```

### 插件化架构原理

TT-Admin 的插件系统是其核心亮点，实现了 **"热插拔"** 与 **"隔离性"**：

1.  **隔离的类加载器 (ClassLoader)**:
    *   使用自定义 `PluginClassLoader` 加载插件 `jar` 或 `classes` 目录。
    *   实现了 **双亲委派模型的重写**，优先加载插件内部类，必要时才委派给宿主类加载器，避免依赖冲突。
2.  **独立的 Spring 上下文**:
    *   每个插件启动时，会创建一个独立的 `AnnotationConfigApplicationContext`。
    *   插件内的 `@Service`, `@Controller`, `@Mapper` 等注解会被自动扫描并注册到独立的上下文中，与主应用 Bean 隔离。
3.  **动态注册机制**:
    *   **Controller 注册**: 插件启动后，通过 `ControllerRegistry` 将插件内的 `Controller` 动态映射到 `RequestMappingHandlerMapping`。
    *   **Mapper 注册**: 通过 `MapperRegistry` 动态注册 MyBatis 的 Mapper XML 和接口。
4.  **生命周期钩子**:
    *   插件可实现 `BasePluginLifecycle` 接口，在 `install`, `start`, `stop`, `uninstall` 阶段执行自定义逻辑（如数据库初始化、数据清理）。

## 内置插件

系统预置了多个功能插件，演示了完整的开发流程：

| 插件 ID | 名称 | 功能描述 | 技术亮点 |
| :--- | :--- | :--- | :--- |
| `tt-admin-ai-chat` | AI 助手 | 提供 ChatGPT/DeepSeek 对话能力 | SSE 流式响应、WebSocket 消息推送 |
| `tt-admin-backup` | 数据备份 | 数据库备份与恢复管理 | 多数据库支持 (MySQL/PostgreSQL)、定时任务 |
| `tt-admin-codegen` | 代码生成器 | 从数据表生成完整插件代码 | Freemarker 模板引擎、动态 ZIP 打包 |
| `tt-admin-monitor` | 系统监控 | 实时展示 JVM、磁盘、DB 指标 | WebSocket 实时推送、前端组件封装 |
| `tt-admin-demo` | 插件示例 | 最简插件开发模板 | 基础 CRUD、Mapper 注入示例 |

## 快速开始

### 环境要求

*   JDK 21
*   Maven 3.9+
*   Node.js 18+ (LTS)
*   pnpm 8+
*   MySQL 8.0+ & Redis

### 后端启动

1.  **初始化数据库**：执行 `sql/tt_admin.sql` 创建基础表。
2.  **配置修改**：
    *   编辑 `tt-admin-backend/tt-admin-server/src/main/resources/application.yml`。
    *   配置数据库连接与 Redis。
    *   (可选) 配置 `application-local.yml` 用于本地敏感配置覆盖。
3.  **编译构建**：
    ```bash
    mvn clean verify -DskipTests
    ```
4.  **启动服务**：
    ```bash
    mvn -pl tt-admin-backend/tt-admin-server spring-boot:run
    ```
    *   访问地址: `http://localhost:8080`
    *   API 文档: `http://localhost:8080/doc.html`

### 前端启动

1.  进入前端目录：
    ```bash
    cd tt-admin-frontend
    ```
2.  安装依赖：
    ```bash
    pnpm install
    ```
3.  启动开发模式：
    ```bash
    pnpm dev
    ```
    *   访问地址: `http://localhost:3000` (默认)

## 插件开发指南

TT-Admin 的设计哲学是让插件开发如同开发普通模块一样简单，同时具备即插即用的能力。

### 1. 目录结构

插件通常包含后端代码、前端代码和数据库脚本：

```text
tt-admin-plugins/
└── tt-admin-my-plugin/         # 插件根目录
    ├── src/main/java/           # 后端源码
    ├── src/main/resources/      # 资源配置
    │   ├── plugin.yaml          # 插件核心配置 (必须)
    │   ├── frontend.yaml        # 前端路由与菜单 (必须)
    │   ├── mapper/              # MyBatis XML
    │   └── sql/                 # SQL 脚本
    │       ├── install.sql      # 安装 SQL
    │       └── uninstall.sql    # 卸载 SQL
    └── ui/                      # 前端模块 (Vue3)
        ├── src/
        │   └── modules/
        └── vite.config.ts
```

### 2. 核心配置

*   **`plugin.yaml`**: 定义插件 ID、名称、版本、作者以及前端资源路径。
*   **`frontend.yaml`**: 定义插件在主应用中的路由 (Route)、菜单 (Menu) 和国际化文案 (i18n)。
    *   系统会根据此文件自动生成路由注册代码和侧边栏菜单。
    *   支持多级菜单和国际化 key 映射。

### 3. 开发流程

1.  **创建插件模块**：参考 `tt-admin-demo` 搭建 Maven 模块结构。
2.  **定义后端逻辑**：
    *   编写 `Controller`、`Service`、`Mapper`。
    *   **注意**：插件内的类必须由插件的 ClassLoader 加载，确保不在主应用 `scan` 范围内。
3.  **定义前端页面**：
    *   在 `ui/src/modules` 下编写 Vue 组件。
    *   使用 Naive UI 组件库。
4.  **配置菜单路由**：完善 `frontend.yaml`。
5.  **测试**：
    *   **开发模式**：前端可直接连接 `pnpm dev` 进行调试；后端通过 `mvn spring-boot:run` 启动时加载源码目录。
    *   **构建模式**：运行 `ui/build.mjs` 打包前端资源，上传至管理后台进行安装。

### 4. 代码生成器

TT-Admin 内置了 **Codegen 插件** (`tt-admin-codegen`)。

1.  进入系统 -> `系统工具` -> `代码生成`。
2.  输入数据库表名，选择插件基础信息（Plugin ID、模块名）。
3.  配置字段映射（列表、搜索、表单、类型）。
4.  点击 **生成代码**，下载 ZIP 包。
5.  解压覆盖或导入至 `tt-admin-plugins` 目录，即可得到一个包含完整前后端逻辑的插件。

## 贡献指南

我们欢迎社区贡献代码。

*   **提交规范**：请使用 `pnpm commit` (英文) 或 `pnpm commit:zh` (中文) 进行提交，遵循 Conventional Commits 规范。
*   **Pull Request**：
    *   PR 目标需明确，影响范围需清晰。
    *   附带测试用例或截图。
    *   代码风格需符合项目 ESLint/Checkstyle 规则。

## 许可证

本项目采用 [MIT License](LICENSE)。