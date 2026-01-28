# 前端设计（Vue3 + Vite + Naive UI）

## 目录结构

- 业务页面：`tt-admin-frontend/src/views`
- 通用封装：`tt-admin-frontend/packages`
- 路由配置：`tt-admin-frontend/src/router`
- 状态管理：`tt-admin-frontend/src/store`
- 插件加载：`tt-admin-frontend/src/utils/plugin-import`

## 路由初始化与权限

### 路由守卫

路径：`tt-admin-frontend/src/router/guard/route.ts`

- 负责登录态校验、角色校验、动态路由初始化
- 动态路由模式下会从后端拉取用户路由并注入

### 路由 Store（含插件路由）

路径：`tt-admin-frontend/src/store/modules/route/index.ts`

- `initConstantRoute` 初始化常量路由
- `initAuthRoute` 拉取用户路由
- `initPluginRoutes` 拉取插件模块并合并菜单
- 插件状态通过 WebSocket 监听，变更时重新刷新

代码片段：

```ts
function initPluginStatusWatcher() {
  if (pluginStatusInited) return;
  pluginStatusInited = true;
  connectPluginStatusWs();
}

function connectPluginStatusWs() {
  if (pluginStatusWs) {
    pluginStatusWs.close();
  }
  const ws = new WebSocket(buildPluginStatusWsUrl());
  pluginStatusWs = ws;
  ws.onopen = async () => {
    if (!authStore.userInfo.userId) return;
    const dictStore = useDictStore();
    await dictStore.init(true);
    await refreshPluginRoutes();
  };
}
```

## 菜单渲染与搜索

路径：`tt-admin-frontend/src/store/modules/route/index.ts`

- `baseMenus`：基础菜单
- `pluginMenus`：插件菜单
- `syncMenus`：合并后用于渲染与搜索

```ts
function syncMenus() {
  const mergedMenus = mergeMenus(baseMenus.value, pluginMenus.value);
  menus.value = updateLocaleOfGlobalMenus(mergedMenus);
}
```

## 插件加载逻辑

- 开发态优先走宿主 Vite 代理 `/plugin-dev`
- 外部 dev server 作为回退
- 生产态统一走 `/api/plugin-static`

路径：`tt-admin-frontend/src/utils/plugin-import/_import-dev.ts`

## 菜单管理与权限

- 菜单管理 UI：`tt-admin-frontend/src/views/system/menu`
- 权限表格与按钮控制：`tt-admin-frontend/src/views/system/menu/modules/permission-list-table.vue`

## 表单与按钮对齐规范

- 表单与按钮风格统一参照“用户管理”页面
- 样式集中维护于 `tt-admin-frontend/src/styles`
