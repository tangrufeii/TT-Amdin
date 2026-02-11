# tt-admin-wc-react

Web-Component React 模板插件，支持宿主 `plugin-dev` 热更新。

## 宿主模式（推荐）

1. 主前端保持 `tt-admin-frontend/.env.dev` 中 `VITE_PLUGIN_DEV_SOURCE=Y`
2. 安装并启用本插件（默认 `isDev: true`）
3. 只启动主前端：`pnpm -C tt-admin-frontend dev`

> 宿主模式下，`/plugin-dev/<pluginId>/...` 直接映射插件 `ui/src` 文件，不需要单独启动插件 `ui dev`。

## 热更新说明

- 编辑 `ui/src/modules/wc-react/view/WcReactView.tsx`
- 页面会通过 `__TT_PLUGIN_HMR_RELOAD__` 自动刷新当前插件视图

## 可选：独立调试插件前端

- `pnpm -C tt-admin-backend/tt-admin-plugins/tt-admin-wc-react/ui dev`

## 打包

- `mvn -pl tt-admin-wc-react -am package -DskipTests`
