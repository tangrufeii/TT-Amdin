# 插件开发快速开始

本页给新同事和外部开发者用，目标是 15-30 分钟跑通一个最小插件并完成安装验证。

## 1. 最小目录

```text
tt-admin-backend/tt-admin-plugins/tt-admin-hello/
├─ src/main/java/
├─ src/main/resources/
│  ├─ plugin.yaml
│  ├─ frontend.yaml
│  └─ sql/
│     ├─ install.sql
│     └─ uninstall.sql
└─ ui/
   └─ src/modules/hello/
      ├─ index.ts
      └─ view/HelloView.vue
```

## 2. 必填文件

### 2.1 `plugin.yaml`

路径：`src/main/resources/plugin.yaml`

```yaml
plugin:
  id: tt-plugin-hello
  name: Hello 插件
  version: 0.1.0
  description: 最小可运行示例
  minimalVersion: 2.2.0
  isDev: true
  frontDevAddress: ''
author:
  name: dev
  email: dev@example.com
```

### 2.2 `frontend.yaml`

路径：`src/main/resources/frontend.yaml`

```yaml
modules:
  - name: hello
    routes:
      - name: plugin-hello-home
        path: /plugin/hello
        component: view.hello
        meta:
          title: Hello 插件
          layout: base
          keepAlive: true
    menus:
      - routeName: plugin-hello-home
        title: Hello 插件
        icon: mdi:hand-wave
        iconType: '1'
        order: 1
        parent: plugin-root
```

### 2.3 `ui/src/modules/hello/index.ts`

```ts
import type { RouteRecordRaw } from 'vue-router';

export default () => ({
  router: (_menus: any[], _moduleName: string): RouteRecordRaw[] => [
    {
      name: 'plugin-hello-home',
      path: '/plugin/hello',
      component: () => import('./view/HelloView.vue'),
      meta: {
        title: 'Hello 插件',
        layout: 'base',
        keepAlive: true
      }
    }
  ]
});
```

## 3. 本地调试

### 3.1 宿主模式（推荐）

1. 在插件 `plugin.yaml` 设置 `isDev: true`。
2. 启动宿主前端：`tt-admin-frontend` 目录执行 `pnpm dev`。
3. 启动宿主后端：`tt-admin-backend` 目录执行 `mvn -pl tt-admin-server spring-boot:run`。
4. 访问菜单中的插件页面。

说明：
- 宿主会通过 `/plugin-dev/<pluginId>/...` 读取插件 UI 源码。
- 通常不需要单独跑插件 `ui` 的 `pnpm dev`。

## 4. 打包安装

### 4.1 打包命令

```bash
# 在 tt-admin-backend/tt-admin-plugins 目录
mvn -pl tt-admin-hello -am -DskipTests package
```

### 4.2 验包要点

- 压缩包根目录必须有 `plugin.yaml`。
- `plugin.id` 必须稳定不变（升级时依赖它匹配）。
- `plugin.version` 必须递增。

## 5. 升级规则（重点）

- 同版本安装会被拒绝：`This version is already installed`。
- 升级不会执行 `uninstall.sql`，不会因为升级自动清库。
- 只有显式卸载才会执行 `uninstall.sql`。

因此建议：
- 每次发包都提高版本号。
- 升级 SQL 用幂等写法，不覆盖历史业务数据。

## 6. 常见问题快查

### 6.1 同版本报错

报错：`This version is already installed`  
处理：提升 `plugin.yaml` 版本号后重新打包上传。

### 6.2 Windows 文件占用

报错：`FileSystemException ... jar ... 另一个程序正在使用此文件`  
处理：
- 先确认没有并发安装。
- 排查杀毒/索引程序占用插件目录。
- 再重试安装。

### 6.3 路由转换错误

报错：`can't access property "replace", component2 is undefined`  
处理：
- 单级路由组件写法必须包含 `$`，例如 `layout.base$view.plugin-hello-home`。
- 父级布局写法用 `layout.base`，不要混用。

## 7. 下一步

- 详细字段说明与完整模板见：[插件开发指南](/guide/plugin-dev)
- 生命周期、菜单同步、启动加载机制见：[插件机制](/guide/plugins)
