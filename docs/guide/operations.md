# 运维与配置

## 配置文件

- 后端统一配置：`tt-admin-backend/tt-admin-server/src/main/resources/application.yml`
- 本地敏感配置：`tt-admin-backend/tt-admin-server/src/main/resources/application-local.yml`
- 前端本地配置：`tt-admin-frontend/.env.local`

## 构建命令

- 后端全量构建：`mvn clean verify`
- 后端模块测试：`mvn -pl <module> -am test`
- 前端安装：`pnpm install`
- 前端开发：`pnpm dev`
- 前端构建：`pnpm build` 或 `pnpm build:dev`

## 插件开发配置

- 插件源码目录：`tt-admin-backend/tt-admin-plugins`
- 开发态代理：`/plugin-dev/<pluginId>/...`
- 生产态资源：`/api/plugin-static/<pluginId>/...`

## 约束与规范

- 产物不得写入 `resources/plugins` 与 `resources/temp`
- SQL/初始化脚本统一放入 `tt-amdin/sql`


## Docker 部署（可选）

### 目录与文件

- 统一编排：`tt-amdin/docker-compose.yml`
- 后端镜像：`tt-amdin/tt-admin-backend/Dockerfile`
- 前端镜像：`tt-amdin/tt-admin-frontend/Dockerfile`
- Nginx 配置：`tt-amdin/tt-admin-frontend/nginx.conf`

### 启动方式

```bash
# 在 tt-amdin 目录
docker compose up -d --build
```

### 访问地址

- 前端：`http://localhost:9527`
- 后端：`http://localhost:8080`

### 环境变量（后端）

- `SPRING_PROFILES_ACTIVE=prod`
- `DB_HOST=db`
- `DB_PORT=3306`
- `DB_NAME=tt_admin`
- `DB_USERNAME=root`
- `DB_PASSWORD=root`
- `SPRING_REDIS_HOST=redis`
- `SPRING_REDIS_PORT=6379`

### 持久化卷

- `mysql_data`：MySQL 数据目录
- `plugin_data`：插件目录 `resources/plugins`
- `plugin_temp`：插件临时目录 `resources/temp`
- `backend_logs`：后端日志目录 `/var/log/tt-admin`

### 说明

- 前端 Nginx 将 `/api` 和 `/ws` 代理至后端
- 插件静态资源走后端 `/api/plugin-static`，已包含在 `/api` 代理内
