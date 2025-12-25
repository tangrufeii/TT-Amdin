# 欢迎使用 tt-boot 后台管理系统

## 项目简介

tt-admin 是一个基于 Spring Boot 3 + MyBatis Plus + Sa-Token + Knife4j 的现代化后台管理系统，提供了完整的用户管理、角色权限控制、菜单管理等功能。

## 技术栈

- **核心框架**: Spring Boot 3.5.0
- **持久层**: MyBatis Plus 3.5.8
- **安全框架**: Sa-Token 1.43.0
- **API 文档**: Knife4j 4.5.0
- **数据库**: MySQL 8.0+
- **Java 版本**: Java 21

## 模块结构

## 使用DDD架构

## 快速开始

### 1. 环境准备

- JDK 21+
- MySQL 8.0+
- Maven 3.9+

### 2. 数据库配置

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/tt_boot?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: root
```

创建对应名称数据库，如：tt_boot

### 3. 启动项目

```bash
# 进入项目根目录
cd tt-boot

# 编译并启动项目
mvn spring-boot:run
```

### 4. 访问系统

- **API 文档**: http://localhost:8080/doc.html

## API 认证说明

系统使用 Sa-Token 进行权限控制：

1. **登录接口**: `POST /api/auth/login`
2. **获取用户信息**: `GET /api/auth/profile`
3. **登出接口**: `POST /api/auth/logout`

登录成功后，系统会返回 token，后续请求需在 Header 中添加：

```
Authorization: Bearer {token}
```

## 联系我们

如有任何问题，请联系项目维护团队：

- **邮箱**: 1042731605@qq.com
- **GitHub**: https://github.com/your-org/tt-boot
