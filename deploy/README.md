# Docker 部署说明

## 本地体验启动

```bash
docker compose up -d --build
```

访问地址：

- 后台前端：`http://localhost:9527`
- 后端接口：`http://localhost:8080`
- MySQL：`localhost:3306`
- Redis：`localhost:6379`

## 生产环境启动

1. 复制环境变量模板：

```bash
cp .env.docker.prod.example .env
```

2. 修改 `.env` 中的数据库密码、前端端口、HTTPS 域名等配置。

3. 启动服务：

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

如果需要 Caddy 自动 HTTPS：

```bash
docker compose -f docker-compose.prod.yml -f docker-compose.prod.https.yml up -d --build
```

## 数据库初始化

MySQL 官方镜像只会在 `/var/lib/mysql` 首次为空时执行 `/docker-entrypoint-initdb.d` 下的 SQL。当前 Compose 会按顺序执行：

- `sql/tt_admin.sql`
- `sql/v2/002_migrate_sys_plugin_to_sys_extension.sql`

注意：修改初始化 SQL 后，已有 `mysql_data` 数据卷不会自动重跑初始化脚本。需要重建测试库时再清理数据卷，别在生产环境手贱删库。

## 插件资源目录

后端容器会绑定宿主机目录：

- `tt-admin-backend/resources/plugins` -> `/app/resources/plugins`
- `resources/themes` -> `/app/resources/themes`
- `tt-admin-backend/resources/temp` -> `/app/resources/temp`

这样部署后可以直接带上仓库里的预置插件和文件化门户主题，也方便体验站上传、启停、替换插件。日志仍使用 Docker volume 保存到 `backend_logs`。
