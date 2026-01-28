# 插件机制

## 插件目录结构

- 插件后端：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/java`
- 插件前端：`tt-admin-backend/tt-admin-plugins/<plugin>/ui`
- 插件清单：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/plugin.yaml`
- 前端模块描述：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/frontend.yaml`
- 插件安装 SQL：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/sql/install*.sql`
- 插件卸载 SQL：`tt-admin-backend/tt-admin-plugins/<plugin>/src/main/resources/sql/uninstall.sql`

## 插件数据模型

### 插件管理聚合根

路径：`tt-admin-backend/tt-admin-domain/src/main/java/com/tt/domain/plugin/model/aggregate/PluginManagement.java`

- `PluginManagement` 负责插件的数据库记录与状态（启用/禁用/卸载）
- 状态值对象：`PluginManagementStatus`

### 插件配置读取

路径：`tt-admin-backend/tt-admin-infrastructure/src/main/java/com/tt/infrastructure/plugin/engine/config/PluginConfigReader.java`

- 负责读取 `plugin.yaml` 并解析成 `PluginConfig`

## 插件生命周期（核心流程）

### 1) 安装

入口：`tt-admin-backend/tt-admin-interfaces/src/main/java/com/tt/interfaces/http/plugins/PluginManagementController.java`

```java
@PostMapping("/installPlugin")
@PermissionResource("plugin:install")
public Result install(PluginInstallCommand command) {
    pluginManagementApplicationService.installPlugin(command);
    return Result.success();
}
```

应用层：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/plugin/service/PluginManagementApplicationService.java`

安装流程核心步骤：
1. 保存上传文件到临时目录
2. 调用基础设施层 `PluginManager.installPlugin`
3. 落库插件信息
4. 发布生命周期进度事件（WebSocket）

```java
public void installPlugin(PluginInstallCommand command) {
    File pluginFile = new File(tempDir, command.getFile().getOriginalFilename());
    command.getFile().transferTo(pluginFile);
    PluginConfig pluginConfig = pluginManager.installPlugin(pluginFile);
    pluginDomainService.savePluginInfo(pluginConfig);
}
```

基础设施层：`tt-admin-backend/tt-admin-infrastructure/src/main/java/com/tt/infrastructure/plugin/engine/manager/PluginManagerImpl.java`

关键阶段：
- 解压插件包
- 读取 `plugin.yaml`
- 检查版本兼容
- 拷贝到插件目录
- 初始化插件上下文（`PluginHandler.installPlugin`）
- 执行安装 SQL
- 执行 `BasePluginLifecycle.onInstall`（若存在）

```java
PluginConfig pluginConfig = PluginConfigReader.readConfig(pluginTempDir);
checkVersionCompatibility(pluginConfig, pluginTempDir);
pluginHandler.installPlugin(pluginDir);
PluginSqlExecutor.executeInstallSql(pluginDir);
var lifecycleBean = PluginApplicationContextHolder.getPluginBean(
    pluginConfig.getPlugin().getId(), BasePluginLifecycle.class);
if (lifecycleBean != null) {
    lifecycleBean.onInstall();
}
```

### 2) 启用

入口：`PluginManagementController#enable`

应用层：`PluginManagementApplicationService#enable`
- 校验状态
- 调用聚合根 `plugin.enable()`
- 调用 `pluginManager.startPlugin`
- 同步插件菜单

基础设施层：`PluginManagerImpl#startPlugin`
- 若上下文未初始化，先执行 `pluginHandler.installPlugin`
- 注册插件组件（Controller/Mapper/WebSocket 等）
- 执行 `BasePluginLifecycle.onStart`

```java
if (!PluginHolder.containsPlugin(pluginId)) {
    pluginHandler.installPlugin(pluginDir, ACTION_ENABLE);
    runPendingInstallLifecycle(pluginId);
}
pluginHandler.startPlugin(pluginId);
```

### 3) 禁用

入口：`PluginManagementController#disable`

应用层：`PluginManagementApplicationService#disable`
- `plugin.disable()`
- `pluginManager.stopPlugin(pluginId)`
- `pluginMenuSyncService.disablePluginMenus(pluginId)`

基础设施层：`PluginHandler#stopPlugin`
- 执行 `BasePluginLifecycle.onStop`
- 反注册组件（Controller/Mapper/WebSocket 等）
- 清理插件上下文

### 4) 卸载

入口：`PluginManagementController#delete`

应用层：`PluginManagementApplicationService#delete`
- 调用 `pluginManager.uninstallPlugin`
- 删除插件菜单与权限
- 聚合根触发卸载事件
- 删除数据库记录

基础设施层：`PluginManagerImpl#uninstallPlugin`
- `pluginHandler.uninstallPlugin(pluginId)`
- 执行 `uninstall.sql`
- 删除插件目录

## 生命周期扩展点（插件自定义代码）

### BasePluginLifecycle

路径：`tt-admin-backend/tt-admin-plugin-core/src/main/java/com/tt/plugin/core/BasePluginLifecycle.java`

```java
public interface BasePluginLifecycle {
    void onInstall();
    void onStart();
    void onStop();
    void onUninstall();
    void onUpdate();
}
```

插件如需扩展生命周期行为，在插件内实现该接口并注册为 Spring Bean。

## 插件组件注册/反注册

路径：`tt-admin-backend/tt-admin-infrastructure/src/main/java/com/tt/infrastructure/plugin/engine/handler/PluginHandler.java`

- 安装时：扫描类 -> 创建插件 ClassLoader -> 创建插件 ApplicationContext -> 初始化注册器
- 启动时：注册 Controller/Mapper/WebSocket 等
- 停止时：反注册并清理上下文

关键逻辑：
```java
PluginClassLoader pluginClassLoader = new PluginClassLoader(...);
AnnotationConfigApplicationContext pluginContext = new AnnotationConfigApplicationContext();
pluginContext.setParent(applicationContext);
pluginContext.setClassLoader(pluginClassLoader);
PluginApplicationContextHolder.addPluginApplicationContext(pluginId, pluginContext);
```

## 插件菜单同步

路径：`tt-admin-backend/tt-admin-application/src/main/java/com/tt/application/plugin/service/PluginMenuSyncService.java`

- 插件菜单来源于 `frontend.yaml` 的 routes/menus
- 通过 `syncPluginMenus` 写入 `sys_menu` 并维护权限

## 插件状态通知

路径：`tt-admin-backend/tt-admin-server/src/main/java/com/tt/server/websocket/PluginLifecycleEventListener.java`

- 监听 `PluginLifecycleEvent` 并通过 WebSocket 广播
- 前端收到后刷新插件路由与菜单

```java
@EventListener
public void onPluginLifecycleEvent(PluginLifecycleEvent event) {
    PluginStatusMessage message = PluginStatusMessage.from(event);
    PluginStatusWebSocket.broadcast(objectMapper.writeValueAsString(message));
}
```

## 启动时插件加载

路径：`tt-admin-backend/tt-admin-server/src/main/java/com/tt/server/plugin/PluginStartupLoader.java`

启动流程要点：
- 同步插件记录
- 安装/启用插件
- 若插件目录缺失，自动降级为禁用

```java
if (plugin.isEnabled()) {
    pluginHandler.installPlugin(pluginDir);
    pluginManager.startPlugin(pluginId);
    pluginMenuSyncService.syncPluginMenus(plugin);
}
```
