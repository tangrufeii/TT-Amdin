# 后端设计（Java 21 + Spring Boot）

## 分层边界

- 领域模型：`tt-admin-backend/tt-admin-domain`
- 应用服务：`tt-admin-backend/tt-admin-application`
- 接口层：`tt-admin-backend/tt-admin-interfaces`
- 插件核心：`tt-admin-backend/tt-admin-plugin-core`

## 菜单与路由

### 菜单接口

路径：`tt-admin-backend/tt-admin-interfaces/src/main/java/com/tt/interfaces/http/system/MenuController.java`

```java
@GetMapping("/tree")
public Result<List<MenuTreeDTO>> getMenuTree() {
    return Result.data(menuApplicationService.getMenuTree());
}
```

### 路由构建

路径：`tt-admin-backend/tt-admin-domain/src/main/java/com/tt/domain/system/access/service/SystemRouteDomainService.java`

```java
return children.stream()
    .sorted(Comparator.comparing(menu -> Optional.ofNullable(menu.getSort()).orElse(0)))
    .map(menu -> SystemRouteNode.builder()
        .name(menu.getRouteName())
        .path(menu.getPath())
        .component(menu.getComponent())
        .meta(meta)
        .props(props)
        .children(buildChildren(menuGroup, menu.getId(), menuPermissions))
        .build())
    .collect(Collectors.toList());
```

### 路由接口输出

路径：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/route/service/RouteApplicationService.java`

- 通过 `SystemAccessRepository` 聚合角色、菜单与权限
- 组装 `RouteDTO` 返回给前端

## 插件菜单同步

路径：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/plugin/service/PluginMenuSyncService.java`

核心流程：
- 读取插件前端定义
- 确保插件根菜单存在
- 对比并 upsert 菜单/权限
- 删除被移除的菜单与权限

```java
private void syncPluginMenus(PluginManagement plugin, PluginFrontendDefinition definition) {
    List<PluginFrontendMenuDefinition> menuDefinitions = definition.getMenus();
    if (CollectionUtils.isEmpty(menuDefinitions)) {
        removePluginMenus(plugin.getPluginId());
        return;
    }
    SystemMenu pluginRoot = ensurePluginRoot();
    Map<String, PluginFrontendRouteDefinition> routeMap = buildRouteMap(definition.getModules());
    // ...
    SystemMenu synced = upsertPluginMenu(plugin, pluginRoot, menuDef, route, existing, menuByRouteName);
}
```

## 权限资源注解

- 权限注解：`tt-admin-backend/tt-admin-plugin-core/src/main/java/com/tt/plugin/core/annotation/PermissionResource.java`
- 注解提取：`tt-admin-backend/tt-admin-interfaces/src/main/java/com/tt/interfaces/support/PermissionAnnotationExtractor.java`

## AI 插件流式输出（SSE）

路径：`tt-admin-backend/tt-admin-plugins/tt-admin-ai-chat/src/main/java/com/tt/plugin/aichat/controller/AiChatController.java`

```java
@GetMapping(value = "/message/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<ServerSentEvent<String>> streamMessage(...) {
    return aiChatService.streamMessage(request)
        .map(chunk -> ServerSentEvent.builder(chunk).build());
}
```
