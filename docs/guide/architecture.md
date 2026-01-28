# 架构总览

## 项目结构

- 后端根目录：`tt-admin-backend`
- 前端根目录：`tt-admin-frontend`
- 插件集合：`tt-admin-backend/tt-admin-plugins`
- SQL 与初始化脚本：`tt-amdin/sql`

## DDD 分层（后端）

- 领域层：`tt-admin-backend/tt-admin-domain`
- 应用层：`tt-admin-backend/tt-admin-application`
- 基础设施层：`tt-admin-backend/tt-admin-infrastructure`
- 接口层：`tt-admin-backend/tt-admin-interfaces`
- 插件核心：`tt-admin-backend/tt-admin-plugin-core`

## 前后端边界与职责

- 前端负责路由渲染、权限校验、插件 UI 动态加载
- 后端负责菜单/权限/路由数据构建、插件菜单同步、接口安全

## 关键入口与路径

- 前端入口：`tt-admin-frontend/src/main.ts`
- 前端路由守卫：`tt-admin-frontend/src/router/guard/route.ts`
- 前端插件加载：`tt-admin-frontend/src/utils/plugin-import`
- 后端路由聚合：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/route/service/RouteApplicationService.java`
- 后端菜单聚合：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/menu/service/MenuApplicationService.java`
- 插件菜单同步：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/plugin/service/PluginMenuSyncService.java`

## 代码片段示例

### 后端：用户路由树构建

路径：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/route/service/RouteApplicationService.java`

```java
public UserRouteDTO getUserRoutes(Long userId) {
    List<Long> roleIds = systemAccessRepository.findRoleIdsByUserId(userId);
    Map<Long, List<String>> permissionMap = systemAccessRepository.findPermissionResourcesByRoleIds(roleIds);
    var menus = systemAccessRepository.findMenusByRoleIds(roleIds);
    var routeNodes = systemRouteDomainService.buildRouteTree(menus, permissionMap);
    UserRouteDTO result = new UserRouteDTO();
    result.setHome("home");
    result.setRoutes(routeNodes.stream().map(this::convertRoute).toList());
    return result;
}
```

### 前端：插件模块动态导入

路径：`tt-admin-frontend/src/utils/plugin-import/_import-dev.ts`

```ts
if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
  const localBase = `/plugin-dev/${moduleInfo.pluginId}/src/modules/${name}/index`;
  importPromise = tryImport(localBase, 'host')
    .catch(() => (remoteBaseWithPrefix ? tryImport(remoteBaseWithPrefix, 'external') : Promise.reject()))
    .catch(() => {
      const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
      return import(/* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js?v=${version}`);
    });
}
```
