问题分析 & 技术方案

  ---
问题1：后端接口文档动态生成

当前问题：插件Controller已注册到Spring MVC，但Knife4j/OpenAPI文档没有动态扫描到。

解决方案：动态刷新OpenAPI文档

● Read(tt-amdin\tt-admin-backend\tt-admin-infrastructure\src\main\java\cn\trifold\infrastructure\config\SwaggerAutoConfiguration.java)
⎿  Error reading file

● Search(pattern: "OpenApiCustomizer|SpringDocConfigProperties", path: "tt-amdin\tt-admin-backend", glob: "*.java")
⎿  Found 2 files (ctrl+o to expand)

● Read(tt-amdin\tt-admin-backend\tt-admin-server\src\main\java\com\tt\server\config\knife4j\SwaggerAutoConfiguration.java)
⎿  Read 30 lines

● Read(tt-amdin\tt-admin-backend\tt-admin-server\src\main\java\com\tt\server\config\knife4j\customizer\MyKnife4jOpenApiCustomizer.java)
⎿  Read 167 lines

● Search(pattern: "ControllerRegistry", path: "tt-amdin\tt-admin-backend", glob: "*.java")
⎿  Found 2 files (ctrl+o to expand)

● Read(tt-amdin\tt-admin-backend\tt-admin-infrastructure\src\main\java\com\tt\infrastructure\plugin\engine\registry\ControllerRegistry.java)
⎿  Read 161 lines

● Search(pattern: "addRoute|动态路由", path: "tt-amdin\tt-admin-frontend", glob: "*.ts")
⎿  Found 2 files (ctrl+o to expand)

● Read(tt-amdin\tt-admin-frontend\src\store\modules\route\index.ts)
⎿  Read 349 lines

● 现在我已经充分了解了整个项目，让我给你一个完整的技术方案：

  ---
技术方案

问题1：后端接口文档动态生成

现状分析：
- ControllerRegistry.java:146-160 已经有 getOpenAPIServiceByGroupName 方法的框架代码，说明作者已经考虑过这个问题
- SpringDoc 的 OpenAPIService 在启动时初始化，插件动态注册的 Controller 不会自动被扫描到文档中

解决方案：

在 ControllerRegistry 注册完成后，动态刷新 SpringDoc 的 API 文档：

// ControllerRegistry.java 中添加方法

private void refreshOpenApiDocumentation(Plugin plugin) {
try {
// 1. 获取 OpenAPIService

            //OpenAPIService openAPIService = getOpenAPIServiceByGroupName("默认分组");

          // 2. 强制刷新 OpenAPI 定义
          // SpringDoc 使用缓存，需要清除缓存并重新计算
          openAPIService.setOpenApi(null);  // 清除缓存

          // 3. 如果使用多个分组（插件独立分组），需要动态创建新的 Group
          String pluginGroupName = plugin.getPluginId();
          SpringDocConfigProperties configProperties = applicationContext.getBean(SpringDocConfigProperties.class);

          // 添加新的分组配置
          SpringDocConfigProperties.GroupConfig groupConfig = new SpringDocConfigProperties.GroupConfig();
          groupConfig.setGroup(pluginGroupName);
          groupConfig.setPathsToMatch("/api/" + plugin.getPluginId() + "/**");
          groupConfig.setPackagesToScan(Arrays.asList(plugin.getBasePackage()));

          configProperties.getGroupConfigs().add(groupConfig);

          log.info("Refreshed OpenAPI documentation for plugin: {}", plugin.getPluginId());
      } catch (Exception e) {
          log.error("Failed to refresh OpenAPI documentation", e);
      }
}

在 registry 方法末尾调用：
@Override
public void registry(Plugin plugin) throws Exception {
// ... 现有注册代码 ...

      // 刷新API文档
      refreshOpenApiDocumentation(plugin);
}

  ---
问题2：前端动态路由注册

你的判断是对的！ 前端确实需要动态路由注册来实现完整的插件化。

技术手段：Vue Router 的 addRoute API 已经支持动态添加路由

现状分析：
- src/store/modules/route/index.ts:254-258 已有 addRoutesToVueRouter 方法
- 项目支持动态路由模式（VITE_AUTH_ROUTE_MODE=dynamic）

完整解决方案：

方案架构

┌─────────────────────────────────────────────────────────────┐
│                        后端                                  │
├─────────────────────────────────────────────────────────────┤
│  插件加载成功后 → 返回插件前端配置（路由/菜单/权限）           │
│  GET /api/plugin/installed                                  │
│  响应: {                                                    │
│    plugins: [{                                              │
│      id: "tt-plugin-demo",                                  │
│      name: "示例插件",                                        │
│      routes: [{                                             │
│        path: "/plugin-demo",                                │
│        name: "plugin-demo",                                 │
│        component: "plugin-demo/views/index",                │
│        meta: { title: "示例插件", icon: "icon" }            │
│      }]                                                     │
│    }]                                                       │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────────┐
│                        前端                                  │
├─────────────────────────────────────────────────────────────┤
│  1. 插件管理页面启用插件 → 调用后端获取插件路由配置            │
│  2. 动态注册路由到 Vue Router                                │
│  3. 动态添加菜单到全局菜单                                   │
│  4. 动态加载插件前端资源（可选）                             │
└─────────────────────────────────────────────────────────────┘

具体实现

1. 后端：插件配置文件扩展

在 plugin.yaml 中添加前端配置：

plugin:
id: tt-plugin-demo
name: 示例插件
# ... 现有配置 ...

    # 新增：前端配置
    frontend:
      routes:
        - path: /plugin-demo
          name: plugin-demo
          component: plugin-demo/views/index
          meta:
            title: $t.plugin.demo.title
            icon: carbon:plugin
            order: 100
      menus:
        - key: plugin-demo
          path: /plugin-demo
          icon: carbon:plugin
          title: $t.plugin.demo.title
          order: 100

2. 后端：提供插件前端配置接口

@RestController
@RequestMapping("/api/plugin")
public class PluginController {

      @GetMapping("/frontend-config")
      public Result<List<PluginFrontendDto>> getPluginFrontendConfig() {
          // 获取所有已启用插件的前端配置
          List<Plugin> enabledPlugins = pluginHandler.getEnabledPlugins();
          List<PluginFrontendDto> configs = enabledPlugins.stream()
              .map(plugin -> {
                  PluginFrontendDto dto = new PluginFrontendDto();
                  dto.setId(plugin.getPluginId());
                  dto.setRoutes(plugin.getFrontendRoutes());
                  dto.setMenus(plugin.getFrontendMenus());
                  return dto;
              })
              .collect(Collectors.toList());
          return Result.data(configs);
      }
}

3. 前端：创建插件动态路由 Store

// src/store/modules/plugin-route/index.ts

import { defineStore } from 'pinia';
import router from '@/router';
import type { RouteRecordRaw } from 'vue-router';

export interface PluginRouteConfig {
id: string;
name: string;
routes: RouteRecordRaw[];
menus: App.Global.Menu[];
}

export const usePluginRouteStore = defineStore('plugin-route', {
state: () => ({
loadedPlugins: [] as string[],
pluginRoutes: [] as RouteRecordRaw[],
pluginMenus: [] as App.Global.Menu[]
}),

    actions: {
      // 加载插件路由
      async loadPluginRoutes() {
        const { data } = await fetchPluginFrontendConfig();

        for (const plugin of data) {
          if (this.loadedPlugins.includes(plugin.id)) continue;

          // 1. 动态注册路由
          plugin.routes.forEach(route => {
            router.addRoute(route);
          });

          // 2. 添加菜单
          this.pluginMenus.push(...plugin.menus);

          // 3. 标记已加载
          this.loadedPlugins.push(plugin.id);
        }
      },

      // 卸载插件路由
      unloadPluginRoutes(pluginId: string) {
        // router.removeRoute(pluginId);
        // 移除菜单
        this.pluginMenus = this.pluginMenus.filter(m => !m.key.startsWith(pluginId));
        this.loadedPlugins = this.loadedPlugins.filter(id => id !== pluginId);
      }
    }
});

4. 前端：动态组件加载（插件资源）

插件前端资源有两种加载方式：

// 方式A：远程组件（推荐）
// 插件将前端资源打包成独立的 js，通过 CDN 或插件服务器加载
const loadPluginComponent = async (componentPath: string) => {
const module = await import(`http://plugin-server/${componentPath}`);
return module.default;
};

// 方式B：微前端（更复杂但更强大）
// 使用 qiankun 或 micro-app 加载完整的插件前端应用