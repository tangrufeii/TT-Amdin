# 后端 `ExtensionManifest` 模型草案

## 1. 文档目标

这份文档用于定义后端 V2 要落的 `ExtensionManifest` Java 对象结构，以及它和旧 `plugin.yaml/frontend.yaml` 的映射关系。

先把模型拍稳，再写代码。  
不然改一半发现字段缺了、层次歪了、命名冲突了，又得返工，纯属自己抽自己。

## 2. 设计原则

### 2.1 一个主模型统一承载扩展声明

- V2 后端内部统一使用 `ExtensionManifest`
- 不再在运行时到处传 `PluginConfig + PluginFrontendDefinition`

### 2.2 兼容旧格式，但内部只认新模型

- 过渡期仍允许读取：
  - `plugin.yaml`
  - `frontend.yaml`
- 但读取后必须统一转换成 `ExtensionManifest`

### 2.3 先定稳定主干，别一步塞满

第一版 Java 模型只覆盖当前明确需要的字段：

1. 扩展基础信息
2. 兼容版本
3. 激活策略
4. 能力声明
5. 产物路径
6. contributes 挂载声明

## 3. 推荐包结构

建议后续新增如下包结构：

```text
tt-admin-backend/tt-admin-domain/src/main/java/com/tt/domain/extension/model/
├─ manifest/
│  ├─ ExtensionManifest.java
│  ├─ ExtensionMeta.java
│  ├─ ExtensionAuthor.java
│  ├─ ExtensionCompatibility.java
│  ├─ ExtensionHostCompatibility.java
│  ├─ ExtensionRuntimeCompatibility.java
│  ├─ ExtensionActivation.java
│  ├─ ExtensionDependencySet.java
│  ├─ ExtensionCapability.java
│  ├─ ExtensionArtifacts.java
│  ├─ ExtensionContributes.java
│  ├─ portal/
│  ├─ admin/
│  └─ server/
└─ enums/
   └─ ExtensionType.java
```

注意：

- 不建议继续塞进 `plugin.model.aggregate`
- 因为 V2 模型已经不是旧插件配置的语义了

## 4. 核心对象结构

### 4.1 `ExtensionManifest`

职责：

- 承载整个扩展声明

建议字段：

```java
public class ExtensionManifest {
    private Integer manifestVersion;
    private ExtensionMeta extension;
    private ExtensionCompatibility compatibility;
    private ExtensionActivation activation;
    private ExtensionDependencySet dependencies;
    private ExtensionCapability capabilities;
    private ExtensionArtifacts artifacts;
    private ExtensionContributes contributes;
}
```

### 4.2 `ExtensionMeta`

职责：

- 承载扩展基础标识信息

建议字段：

```java
public class ExtensionMeta {
    private String id;
    private String name;
    private String version;
    private ExtensionType type;
    private String description;
    private String homepage;
    private ExtensionAuthor author;
    private String license;
    private List<String> keywords;
}
```

### 4.3 `ExtensionType`

建议定义为枚举：

```java
public enum ExtensionType {
    THEME,
    MODULE,
    WIDGET,
    HYBRID
}
```

用途：

1. 控制启用规则
2. 控制运行时恢复顺序
3. 控制后台管理过滤和展示

### 4.4 `ExtensionCompatibility`

职责：

- 描述宿主兼容范围和运行时环境要求

建议字段：

```java
public class ExtensionCompatibility {
    private ExtensionHostCompatibility host;
    private ExtensionRuntimeCompatibility runtime;
}
```

```java
public class ExtensionHostCompatibility {
    private String minVersion;
    private String maxVersion;
}
```

```java
public class ExtensionRuntimeCompatibility {
    private String java;
    private String node;
}
```

### 4.5 `ExtensionActivation`

职责：

- 描述启用策略和运行优先级

建议字段：

```java
public class ExtensionActivation {
    private Boolean autoEnable;
    private Boolean singleton;
    private Integer entryPriority;
}
```

规则：

1. `theme` 必须强制 `singleton=true`
2. `widget/module` 默认允许多实例并存

### 4.6 `ExtensionDependencySet`

职责：

- 描述依赖、可选依赖、冲突约束

建议字段：

```java
public class ExtensionDependencySet {
    private List<String> required;
    private List<String> optional;
    private List<String> conflicts;
}
```

第一版先只做声明，不急着做复杂依赖求解。

### 4.7 `ExtensionCapability`

职责：

- 描述扩展申请了哪些能力

建议字段：

```java
public class ExtensionCapability {
    private Boolean portal;
    private Boolean admin;
    private Boolean serverApi;
    private Boolean migration;
    private Boolean scheduler;
}
```

说明：

- 这是后端安装和启用时做白名单校验的基础
- 后续可以扩展成更细粒度 capability，但第一版别搞太碎

### 4.8 `ExtensionArtifacts`

职责：

- 描述 ZIP 内构建产物位置

建议字段：

```java
public class ExtensionArtifacts {
    private String portalDist;
    private String adminDist;
    private String serverJar;
    private String migrationsDir;
    private String configSchema;
    private String defaultConfig;
}
```

规则：

1. 只能引用 ZIP 包内部相对路径
2. 后端安装器必须校验路径是否存在

### 4.9 `ExtensionContributes`

职责：

- 承载门户、后台、服务端的挂载声明

建议字段：

```java
public class ExtensionContributes {
    private PortalContributes portal;
    private AdminContributes admin;
    private ServerContributes server;
}
```

## 5. 子结构建议

### 5.1 门户挂载

```java
public class PortalContributes {
    private List<PortalRouteContribution> routes;
    private List<PortalTabContribution> tabs;
    private List<PortalSlotContribution> slots;
    private List<PortalWidgetContribution> widgets;
}
```

### 5.2 后台挂载

```java
public class AdminContributes {
    private List<AdminRouteContribution> routes;
    private List<AdminMenuContribution> menus;
    private List<AdminPageContribution> pages;
}
```

### 5.3 服务端挂载

```java
public class ServerContributes {
    private List<ServerApiContribution> apis;
    private List<ServerPermissionContribution> permissions;
    private List<ServerSchedulerContribution> schedulers;
}
```

## 6. 第一版最小字段要求

第一版不要全实现，先收敛成下面这些必要字段：

### 6.1 安装器必须关心

1. `manifestVersion`
2. `extension.id`
3. `extension.name`
4. `extension.version`
5. `extension.type`
6. `compatibility.host`
7. `activation.singleton`
8. `capabilities`
9. `artifacts`

### 6.2 编排器必须关心

1. `contributes.portal.routes`
2. `contributes.portal.tabs`
3. `contributes.portal.slots`
4. `contributes.portal.widgets`
5. `contributes.admin.routes`
6. `contributes.admin.menus`
7. `contributes.server.apis`

## 7. 与旧模型的映射关系

### 7.1 `plugin.yaml -> ExtensionManifest`

| 旧字段 | 新字段 | 说明 |
|---|---|---|
| `plugin.id` | `extension.id` | 直接映射 |
| `plugin.name` | `extension.name` | 直接映射 |
| `plugin.version` | `extension.version` | 直接映射 |
| `plugin.description` | `extension.description` | 直接映射 |
| `plugin.minimalVersion` | `compatibility.host.minVersion` | 宿主最低版本 |
| `plugin.isDev` | 暂不进 Manifest 主字段 | 更适合保留为开发态元数据 |
| `plugin.frontDevAddress` | 暂不进 Manifest 主字段 | 更适合开发联调配置 |
| `author.name` | `extension.author.name` | 直接映射 |
| `author.email` | `extension.author.email` | 直接映射 |
| `author.webSite` | `extension.author.website` | 字段名统一 |

### 7.2 `frontend.yaml -> ExtensionManifest`

| 旧字段 | 新字段 | 说明 |
|---|---|---|
| `modules[].routes[]` | `contributes.admin.routes` 或 `contributes.portal.routes` | 过渡期需要按规则判断挂后台还是门户 |
| `menus[]` | `contributes.admin.menus` | 当前旧体系菜单主要服务后台 |
| `modules[].name` | 路由组件命名上下文 | 可作为模块来源信息保留 |
| `i18n` | 可先挂到 `contributes.admin/portal` 扩展属性 | 第一版可延后 |
| `renderer` | 可映射到前端产物加载策略 | 第一版先兼容保留 |

## 8. 旧 `frontend.yaml` 的临时判定规则

过渡期必须给旧路由一个默认归属规则，不然你根本没法兼容。

建议规则：

1. 旧插件 `frontend.yaml` 默认视为 `admin` 贡献。
2. 只有新增 `extension.yaml` 的扩展，才正式支持 `portal`、`slot`、`widget`。
3. 不要试图自动猜测旧插件哪些路由是门户，容易翻车。

这个规则很土，但稳。

## 9. 后续代码实现建议

### 9.1 第一批新增对象

1. `ExtensionManifest`
2. `ExtensionMeta`
3. `ExtensionType`
4. `ExtensionCompatibility`
5. `ExtensionActivation`
6. `ExtensionCapability`
7. `ExtensionArtifacts`
8. `ExtensionContributes`

### 9.2 第一批新增适配器

1. `ExtensionManifestReader`
   - 优先读 `extension.yaml`
2. `LegacyPluginManifestAdapter`
   - 负责把 `plugin.yaml + frontend.yaml` 转成 `ExtensionManifest`

### 9.3 第一批不要着急做的对象

1. 很细粒度的 capability 枚举
2. 复杂依赖图求解器
3. 完整挂件编排持久化模型

## 10. 当前建议

如果下一步进入代码阶段，最稳妥的起手式就是：

1. 先建 `ExtensionManifest` Java 对象。
2. 再建读取器和旧配置适配器。
3. 再让安装器内部改为统一消费 `ExtensionManifest`。

这才叫按顺序干活，不是拿锤子见啥都想砸。
