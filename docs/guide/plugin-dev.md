# 插件开发指南

本指南面向开发者，描述如何从零创建一个插件、如何声明前端模块/菜单/权限、如何打包与调试。

## 1. 插件目录结构（推荐）

```
<repo>/tt-admin-backend/tt-admin-plugins/tt-admin-xxx/
├─ src/main/java/                 # 插件后端代码
├─ src/main/resources/
│  ├─ plugin.yaml                 # 插件基本信息（必须）
│  ├─ frontend.yaml               # 插件前端模块/菜单定义（可选）
│  ├─ sql/
│  │  ├─ install.sql              # 安装 SQL（可选）
│  │  └─ uninstall.sql            # 卸载 SQL（可选）
│  └─ setting.json                # 插件配置默认值（可选）
└─ ui/                            # 插件前端（Vite）
   ├─ src/modules/<module>/
   │  ├─ index.ts                 # 模块入口（必须）
   │  └─ view/                    # 页面
   ├─ package.json
   └─ vite.config.ts
```

> 注意：插件包的 `plugin.yaml` 需在安装 zip 的根目录，源码结构中位于 `src/main/resources/plugin.yaml`。

## 2. plugin.yaml（插件基本信息）

路径：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/plugin.yaml`

- 必填字段：`plugin.id`、`plugin.name`、`plugin.version`
- 可选字段：`plugin.isDev`、`plugin.frontDevAddress`

> `plugin.id` 用于路由与资源路径，例如 `/plugin-dev/<pluginId>/...`

## 3. frontend.yaml（前端模块/菜单）

路径：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/frontend.yaml`

主要字段：
- `modules`: 插件前端模块列表
  - `name`: 模块名（对应 `ui/src/modules/<name>`）
  - `routes`: 路由定义（`name/path/component/meta`）
  - `menus`: 菜单定义（`routeName/title/icon/iconType/parent/order`）
  - `i18n`: i18n 文件映射（例如 `zh-CN: src/locales/zh-CN.json`）

## 4. 前端模块入口（必须）

路径：`ui/src/modules/<module>/index.ts`

返回结构示例：

```ts
import type { RouteRecordRaw } from 'vue-router';

export default () => ({
  router: (menusRouter: any[], moduleName: string): RouteRecordRaw[] => {
    return [
      {
        name: 'plugin-xxx-home',
        path: '/plugin/xxx',
        component: () => import('./view/PluginHome.vue'),
        meta: {
          title: '插件首页',
          layout: 'base',
          keepAlive: true
        }
      }
    ];
  }
});
```

- `layout` 可选值：`base` / `blank`
- `name` 建议前缀加 `plugin-xxx-` 防止冲突

## 5. 菜单/权限同步规则

- 插件菜单来源：`frontend.yaml` 的 `menus`
- 菜单落库由后端 `PluginMenuSyncService` 处理
- 如果菜单与插件绑定，禁用插件会禁用菜单，卸载插件会删除菜单与权限

路径：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/plugin/service/PluginMenuSyncService.java`

## 6. 生命周期扩展（可选）

实现接口：`tt-admin-backend/tt-admin-plugin-core/src/main/java/com/tt/plugin/core/BasePluginLifecycle.java`

```java
public interface BasePluginLifecycle {
    void onInstall();
    void onStart();
    void onStop();
    void onUninstall();
    void onUpdate();
}
```

插件内实现该接口并注册为 Spring Bean，可在启用/停用/升级时执行逻辑。

## 7. 开发调试模式

### 宿主 Vite（推荐）

- 插件 `plugin.yaml` 设置 `plugin.isDev: true`
- 宿主前端访问 `/plugin-dev/<pluginId>/...` 直接读取插件 UI 源码
- 无需独立启动插件 UI 的 `pnpm dev`

核心实现：`tt-admin-frontend/vite.config.ts` + `tt-admin-frontend/src/utils/plugin-import/_import-dev.ts`

### 外部 dev server（回退模式）

- 设置 `plugin.frontDevAddress`
- 宿主加载失败时回退到 `frontDevAddress`

## 8. 打包发布

- 插件后端打包后生成可安装 zip
- 安装 zip 根目录必须包含 `plugin.yaml`
- 安装 SQL 放置在 `src/main/resources/sql/`

## 9. 常见问题

- 菜单没生成：检查 `frontend.yaml` 的 `menus` 与路由 `name` 是否一致
- 图标不显示：确认 `iconType` 与 `icon` 是否符合前端图标体系
- 路由冲突：保证插件 route name 唯一


## 10. frontend.yaml 示例（可直接复制）

路径：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/frontend.yaml`

```yaml
modules:
  - name: ai-chat
    routes:
      - name: plugin-ai-chat-home
        path: /plugin/ai-chat
        component: view.ai-chat
        meta:
          title: AI 对话
          layout: base
          keepAlive: true
          icon: mdi:chat-processing
          iconType: '1'
          order: 10
    menus:
      - routeName: plugin-ai-chat-home
        title: AI 对话
        i18nKey: route.plugin_ai_chat
        icon: mdi:chat-processing
        iconType: '1'
        order: 10
        parent: plugin-root
    i18n:
      zh-CN: src/locales/zh-CN.json
      en-US: src/locales/en-US.json
```

### 10.1 frontend.yaml 多菜单示例

下面示例展示一个插件包含多个页面，并在菜单中展示为多个子项：

```yaml
modules:
  - name: demo
    routes:
      - name: plugin-demo-list
        path: /plugin/demo/list
        component: view.demo-list
        meta:
          title: 示例列表
          i18nKey: plugin.demo.list
          layout: base
          keepAlive: true
          icon: mdi:view-list
          order: 1
      - name: plugin-demo-detail
        path: /plugin/demo/detail
        component: view.demo-detail
        meta:
          title: 示例详情
          i18nKey: plugin.demo.detail
          layout: base
          keepAlive: true
          icon: mdi:file-document
          order: 2
    menus:
      - routeName: plugin-demo-list
        title: 示例列表
        i18nKey: plugin.demo.list
        icon: mdi:view-list
        iconType: '1'
        order: 1
        parent: plugin-root
      - routeName: plugin-demo-detail
        title: 示例详情
        i18nKey: plugin.demo.detail
        icon: mdi:file-document
        iconType: '1'
        order: 2
        parent: plugin-root
```

字段说明（关键字段）：
- `routes[].name`：必须唯一，建议以 `plugin-<id>-` 前缀
- `routes[].component`：与插件 UI 内的组件映射一致（通常通过模块入口解析）
- `menus[].routeName`：必须与 `routes[].name` 对应，否则菜单无法落库
- `menus[].parent`：父菜单 key，通常使用 `plugin-root`
- `iconType`：`1` 表示 Iconify，`2` 表示本地图标

## 11. 最小可运行插件 Demo

### 11.1 plugin.yaml

路径：`src/main/resources/plugin.yaml`

```yaml
plugin:
  id: tt-plugin-hello
  name: Hello 插件
  version: 0.1.0
  description: 最小插件示例
  isDev: true
  frontDevAddress: ''
author:
  name: dev
  email: dev@example.com
```

### 11.2 frontend.yaml

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

### 11.3 前端入口 index.ts

路径：`ui/src/modules/hello/index.ts`

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

### 11.4 前端页面 HelloView.vue

路径：`ui/src/modules/hello/view/HelloView.vue`

```vue
<template>
  <div class="p-16px">
    <n-card title="Hello 插件" size="small" :bordered="false">
      <div>插件页面已加载</div>
    </n-card>
  </div>
</template>
```

### 11.5 开发与验证

- 宿主前端启动：`tt-admin-frontend` 目录运行 `pnpm dev`
- 插件后端启动：`mvn -pl tt-admin-server spring-boot:run`
- 页面访问：菜单“插件/Hello 插件”

### 11.6 常见错误

- 路由/菜单不生效：检查 `frontend.yaml` 是否被打包进插件目录
- 菜单没出现：确认 `menus[].routeName` 与 `routes[].name` 一致
- 页面加载失败：检查 `ui/src/modules/<module>/index.ts` 是否导出 router


## 12. frontend.yaml 字段规范（全量说明）

### modules

- `name`: 模块名，必须与 `ui/src/modules/<name>` 对应
- `routes`: 路由列表
- `menus`: 菜单列表
- `i18n`: i18n 文件映射

### routes[]

- `name`: 路由名，必须唯一，建议前缀 `plugin-<id>-`
- `path`: 路由路径，例如 `/plugin/hello`
- `component`: 组件标识，建议 `view.<name>`（由模块入口解析）
- `componentName`: 可选，视图组件名
- `meta`: 路由元信息

### meta

- `title`: 菜单标题/页面标题
- `layout`: `base` | `blank`
- `keepAlive`: 是否缓存
- `icon`: Iconify 图标名（如 `mdi:home`）
- `iconType`: `1`=Iconify, `2`=本地图标
- `order`: 排序值（数字越小越靠前）
- `hideInMenu`: 是否隐藏
- `activeMenu`: 激活菜单 key（用于隐藏路由时高亮）

### menus[]

- `routeName`: 关联的路由名（必须存在于 routes）
- `parent`: 父菜单 key，通常使用 `plugin-root`
- `title`: 菜单标题
- `i18nKey`: i18n key
- `icon`: 图标
- `iconType`: `1` | `2`
- `order`: 排序值

### i18n

- `zh-CN`: `src/locales/zh-CN.json`
- `en-US`: `src/locales/en-US.json`

## 13. 插件后端最小模板

### 13.1 Controller

路径：`src/main/java/com/tt/plugin/hello/controller/HelloController.java`

```java
@RestController
@RequestMapping("/plugin/hello")
public class HelloController {

    @GetMapping("/ping")
    public Result<String> ping() {
        return Result.data("ok");
    }
}
```

### 13.2 Service

路径：`src/main/java/com/tt/plugin/hello/service/HelloService.java`

```java
@Service
public class HelloService {
    public String hello(String name) {
        return "hello " + name;
    }
}
```

### 13.3 Mapper/Repository（可选）

- 按 DDD 规范放入 `tt-admin-domain/tt-admin-application/tt-admin-infrastructure`
- 插件内若需持久化，建议建独立表并提供 install/uninstall SQL

## 14. 插件 SQL 规则

### 安装 SQL

- 路径：`src/main/resources/sql/install.sql`
- 支持多版本：`install-<version>.sql`
- 执行时机：插件安装/升级时执行

### 卸载 SQL

- 路径：`src/main/resources/sql/uninstall.sql`
- 执行时机：插件卸载时执行

### 约束建议

- 所有表名以 `plugin_<id>_` 前缀
- 禁止修改宿主表结构
- 需可重复执行或具备幂等保护

## 15. 插件生命周期事件与进度

### 事件推送

- 后端发布：`PluginLifecycleEvent`
- 推送通道：`/ws/plugin/status`

### 事件字段

- `pluginId` 插件ID
- `action` INSTALL/ENABLE/DISABLE/UNINSTALL
- `status` PROCESSING/SUCCESS/FAILED
- `stage` 阶段名
- `progress` 进度百分比
- `message` 进度描述

对应实现：
- `tt-admin-backend/tt-admin-server/src/main/java/com/tt/server/websocket/PluginLifecycleEventListener.java`
