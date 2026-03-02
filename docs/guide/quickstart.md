# 快速开始

本页面向首次接触 TT Admin 的使用者，目标是先把系统跑起来，再进入插件开发与部署。

## 1. 拉取代码

可任选一个仓库地址：

```bash
# Gitee
git clone https://gitee.com/YaaZi/tt-amdin.git

# GitHub
git clone https://github.com/tangrufeii/TT-Amdin.git

cd tt-amdin
```

## 2. 准备环境

- `Node.js >= 20`
- `pnpm >= 9`
- `JDK 21`
- `Maven 3.9+`
- 可用的 MySQL / Redis（按 `tt-admin-server` 配置）

## 3. 安装依赖

```bash
pnpm -C tt-admin-frontend install
pnpm -C docs install
cd tt-admin-backend
mvn -pl tt-admin-server -am clean compile -Pdev
cd ..
```

## 4. 启动服务

```bash
# 终端 1：后端
cd tt-admin-backend
mvn -pl tt-admin-server spring-boot:run -Pdev

# 终端 2：前端（仓库根目录）
pnpm -C tt-admin-frontend dev

# 终端 3：文档（可选，仓库根目录）
pnpm -C docs dev
```

## 5. 首次验证

1. 打开前端页面，确认基础菜单可见。
2. 进入插件管理，确认插件列表与状态可加载。
3. 访问文档站，确认文档导航可用。

## 6. 下一步路径

- 想快速做第一个插件：查看 [插件开发入门](/guide/plugin-dev-quickstart)
- 想看完整能力与机制：查看 [插件机制](/guide/plugins)
- 想看字段细节与模板：查看 [插件开发](/guide/plugin-dev)
- 准备上线部署：查看 [运维与配置](/guide/operations)
