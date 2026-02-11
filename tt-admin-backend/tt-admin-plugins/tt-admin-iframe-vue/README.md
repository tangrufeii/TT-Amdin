# tt-admin-iframe-vue

Vue3 iframe 插件模板（开发态 + 构建态）。

## 开发模式

1. 修改 `src/main/resources/plugin.yaml`：
   - `isDev: true`
   - `frontDevAddress: http://127.0.0.1:5174`
2. 在主前端 `tt-admin-frontend/.env.dev` 确保：
   - `VITE_PLUGIN_DEV_SOURCE=Y`
3. 启动模板前端：
   - `pnpm -C tt-admin-backend/tt-admin-plugins/tt-admin-iframe-vue/ui dev`

## 构建模式

- 进入 `tt-admin-backend/tt-admin-plugins` 执行：
  - `mvn -pl tt-admin-iframe-vue -am package -DskipTests`
- 产物：
  - `tt-admin-backend/tt-admin-plugins/tt-admin-iframe-vue/target/tt-admin-iframe-vue-1.0.0.zip`

## 路由说明

- 插件路由配置在 `src/main/resources/frontend.yaml`
- iframe 页面入口为 `ui/index.html`
- 当前示例路径：`/plugin/iframe-vue`
