# TT Admin Backend System

基于 DDD 架构的 Spring Boot 后台管理系统，支持动态插件扩展。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| JDK | 21 | Java 运行环境 |
| Spring Boot | 3.5.0 | 应用框架 |
| MyBatis-Plus | 3.5.12 | ORM 框架 |
| Sa-Token | 1.44.0 | 权限认证框架 |
| MySQL | 8.3.0 | 数据库 |
| Redis | - | 缓存/会话存储 |
| Knife4j | 4.5.0 | 接口文档 |
| Hutool | 5.8.34 | 工具包 |
| MapStruct | 1.6.3 | 对象映射 |
| Lombok | - | 代码简化 |
| Druid | - | 数据库连接池 |

## 系统架构

采用 **DDD（领域驱动设计）** 架构，多模块分层设计：

```
tt-admin-backend
├── tt-admin-server           # 启动模块
├── tt-admin-common           # 公共组件
├── tt-admin-domain           # 领域层（核心业务逻辑）
├── tt-admin-application      # 应用层（业务流程编排）
├── tt-admin-infrastructure   # 基础设施层（技术实现）
├── tt-admin-interfaces       # 接口层（REST API）
├── tt-admin-plugin-core      # 插件核心框架
└── tt-admin-plugins          # 插件实现示例
```

### 分层说明

| 层级 | 职责 | 内容 |
|------|------|------|
| **Interfaces（接口层）** | 对外提供 API | REST 控制器、请求/响应 DTO |
| **Application（应用层）** | 业务流程编排 | Command、DTO、ApplicationService |
| **Domain（领域层）** | 核心业务逻辑 | 聚合根、实体、值对象、领域服务、仓储接口 |
| **Infrastructure（基础设施层）** | 技术实现 | 数据持久化、外部服务、插件引擎 |

### 插件架构

系统支持动态插件扩展，插件具有完整的生命周期管理：

```
插件生命周期：
安装 → 启用 → 禁用 → 卸载
         ↓
      更新升级
```

**插件特性：**
- 独立类加载器隔离
- 独立 Spring ApplicationContext
- 支持 Mapper/Controller/Service 组件注册
- 支持 SQL 脚本执行（安装/更新/卸载）
- 支持前端资源打包
- 生命周期回调（onInstall/onStart/onStop/onUnInstall/onUpdate）

## 快速开始

### 1. 环境要求

- JDK 21+
- Maven 3.5+
- MySQL 8.0+
- Redis 6.0+

### 2. 克隆项目

```bash
git clone https://github.com/your-repo/tt-admin-backend.git
cd tt-admin-backend
```

### 3. 数据库配置

创建数据库并执行初始化脚本：

```sql
CREATE DATABASE admin_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### 4. 修改配置

编辑 `tt-admin-server/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/admin_db?useUnicode=true&characterEncoding=utf8
    username: root
    password: 你的密码
  data:
    redis:
      host: localhost
      port: 6379
```

### 5. 编译启动

```bash
mvn clean compile
cd tt-admin-server
mvn spring-boot:run
```

或直接运行 `tt-admin-server/src/main/java/com/tt/Application.java`

### 6. 访问系统

- 访问地址：http://localhost:8080/
- 接口文档：http://localhost:8080/doc.html

## 模块说明

### tt-admin-server
应用启动模块，包含：
- 主启动类 `Application.java`
- 全局异常处理器
- MyBatis-Plus 分页配置
- Knife4j 接口文档配置
- WebSocket 配置
- 拦截器配置

### tt-admin-common
公共组件模块，包含：
- **domain/** - 领域基类（Entity、ValueObject、AggregateRoot、DomainEvent）
- **api/** - 统一响应封装（Result、ResultCode）
- **page/** - 分页工具（PageQuery、RPage）
- **utils/** - 工具类（SpringBeanUtil、SqlExecUtils、ClassUtils）
- **annotation/** - 自定义注解（@Timestamp）

### tt-admin-domain
领域层模块，按领域划分：

**认证授权领域（auth/）：**
- 用户聚合根、实体、值对象
- 用户领域事件
- 用户领域服务
- 仓储接口定义

**插件管理领域（plugin/）：**
- 插件聚合根（Plugin、PluginManagement、PluginConfig）
- 插件值对象、枚举、常量
- 插件领域服务
- 插件仓储接口
- `PluginManager` 接口定义

### tt-admin-application
应用层模块，包含：

**认证授权应用服务（auth/）：**
- Command 对象（LoginCommand、RegisterUserCommand）
- DTO 对象（UserDTO、LoginResultDTO）
- ApplicationService 实现

**插件管理应用服务（plugin/）：**
- 插件 CRUD Command
- 插件 DTO
- 插件管理 ApplicationService（协调领域服务和基础设施）

### tt-admin-infrastructure
基础设施层模块，包含：

**认证授权持久化（auth/）：**
- MyBatis Mapper 接口
- PO（持久化对象）
- Repository 实现

**插件引擎（plugin/engine/）：**
- **config/** - 插件配置读取
- **loader/** - 插件类加载器
- **scanner/** - 类/Mapper 扫描器
- **extractor/** - 插件包解压
- **copier/** - 文件拷贝
- **installer/** - SQL 执行器
- **holder/** - 插件元数据持有者
- **context/** - 插件 ApplicationContext 管理
- **handler/** - 插件生命周期处理器
- **manager/** - PluginManager 实现
- **registry/** - 组件注册器（Class/Mapper/Controller/WebSocket）

**缓存实现（cache/）：**
- Redis 缓存实现

### tt-admin-interfaces
接口层模块，包含：
- REST 控制器（auth、plugin、job）
- 统一异常处理
- 事件监听器

### tt-admin-plugin-core
插件核心框架，包含：
- `BasePluginLifecycle` 接口 - 插件生命周期钩子
- `@InterceptPath` 注解 - 请求路径拦截配置

### tt-admin-plugins
插件实现示例（demo 插件）

## 插件开发指南

### 插件目录结构

```
plugin-demo/
├── code/                    # 代码目录
│   ├── controller/          # 控制器
│   ├── service/             # 服务
│   ├── mapper/              # MyBatis Mapper
│   ├── model/               # 数据模型
│   └── resources/           # 资源文件
│       └── mapper/          # Mapper XML
├── ui/                      # 前端资源（可选）
├── lib/                     # 依赖库（可选）
├── sql/                     # SQL 脚本
│   ├── install.sql          # 安装脚本
│   ├── update/              # 更新脚本
│   │   └── 1.0.0_to_1.0.1.sql
│   └── uninstall.sql        # 卸载脚本
└── plugin.yaml              # 插件配置
```

### 插件配置示例（plugin.yaml）

```yaml
plugin:
  id: demo-plugin
  name: 示例插件
  description: 这是一个演示插件
  version: 1.0.0
  author:
    name: trf
    email: trf@example.com
    webSite: https://example.com
  minimalVersion: 1.0.0     # 最低系统版本要求
  mapperLocation: mapper/**/*.xml

# 前端配置（可选）
frontend:
  path: ui/index.html
```

### 生命周期钩子

实现 `BasePluginLifecycle` 接口：

```java
@Component
public class DemoPluginLifecycle implements BasePluginLifecycle {

    @Override
    public void onInstall() {
        // 插件安装时执行
    }

    @Override
    public void onStart() {
        // 插件启动时执行
    }

    @Override
    public void onStop() {
        // 插件停止时执行
    }

    @Override
    public void onUnInstall() {
        // 插件卸载时执行
    }

    @Override
    public void onUpdate() {
        // 插件更新时执行
    }
}
```

## API 接口

### 认证授权

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/auth/login | POST | 用户登录 |
| /api/auth/logout | POST | 用户注销 |
| /api/auth/info | GET | 获取用户信息 |
| /api/auth/captcha | GET | 获取验证码 |

### 插件管理

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/plugin/management/page | GET | 分页查询插件 |
| /api/plugin/management/{id} | GET | 获取插件详情 |
| /api/plugin/management/install | POST | 安装插件 |
| /api/plugin/management/{id} | DELETE | 卸载插件 |
| /api/plugin/management/enable | POST | 启用插件 |
| /api/plugin/management/disable | POST | 禁用插件 |
| /api/plugin/management/changeStatus | POST | 变更插件状态 |
| /api/plugin/management/statistics | GET | 获取插件统计 |

## 开发规范

### 1. 领域模型

- 使用聚合根封装业务逻辑
- 实体通过 ID 标识唯一性
- 值对象不可变
- 领域事件用于跨聚合通信

### 2. 应用服务

- 使用 Command 对象接收输入
- 使用 DTO 对象返回输出
- 协调领域服务和基础设施
- 管理事务边界

### 3. 基础设施

- 实现 Repository 接口
- 不包含业务逻辑
- 处理技术细节（持久化、缓存、外部 API）

### 4. 编码规范

- 使用 Lombok 简化代码
- 使用 MapStruct 进行对象转换
- 统一异常处理
- 详细的方法注释


### 5. 相关参考
📚 参考
SpringDoc Issue #631 [相关链接](https://github.com/springdoc/springdoc-openapi/issues/631)
Spring MVC动态注册API [相关链接](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html#mvc-ann-requestmapping-registration)
## 许可证

MIT License

## 联系方式

- 作者：trf
