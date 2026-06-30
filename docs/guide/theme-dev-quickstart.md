# 门户主题开发快速开始

这页不是讲概念，是直接回答两个问题：

1. 外部主题源码仓该怎么建
2. 最终 ZIP 到底该怎么打

当前宿主对门户主题的要求已经收敛到一条主链路：

- 开发阶段：独立仓写前端源码
- 发布阶段：构建出静态产物
- 安装阶段：上传 `extension.yaml + portal/` 的 ZIP

## 1. 最小发布包结构

当前主题 ZIP 至少要长这样：

```text
my-theme-1.0.0.zip
├─ extension.yaml
└─ portal/
   ├─ index.html
   └─ assets/
      ├─ app.js
      └─ app.css
```

关键点：

1. `extension.yaml` 必须在 ZIP 根目录。
2. `portal/` 必须是构建后的静态产物目录，不是源码目录。
3. 宿主当前不会替你编译 `.vue`、`.ts`，它只认浏览器能直接跑的产物。
4. 纯前端配置建议放 JSON，不要继续把页面配置硬塞进 YAML。

## 2. 最小 Manifest 示例

```yaml
manifestVersion: 2

extension:
  id: my-theme
  name: 我的主题
  version: 1.0.0
  type: theme
  description: 门户主题示例

activation:
  autoEnable: false
  singleton: true
  entryPriority: 10

capabilities:
  portal: true
  admin: false
  serverApi: false
  migration: false
  scheduler: false

artifacts:
  portalDist: portal

contributes:
  portal:
    renderer: static-html
    routes:
      - name: portal-home
        path: /
        component: /index.html
    tabs:
      - key: home
        title: 首页
        routeName: portal-home
        order: 1
    slots:
      - key: hero
        title: 首屏
        description: 主题主叙事区域
```

你至少得把 `id/name/version/type`、`portalDist`、首页路由这些东西写清楚，不然宿主没法认。

## 3. 独立主题源码仓建议结构

推荐按下面这套来，别把源码和发布包混成一锅粥：

```text
my-theme-repo/
├─ extension.yaml
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ build-zip.ps1
├─ src/
│  ├─ main.ts
│  ├─ App.vue
│  └─ style.css
├─ dist/
└─ release/
```

说明：

1. `src/` 是你自己的开发源码。
2. `dist/` 是前端构建结果。
3. `release/` 是打包脚本整理出的最终 ZIP 输出目录。
4. `extension.yaml` 给宿主识别扩展。
5. `theme.config.json` 给主题前端自己读。

## 4. 仓库内现成模板

当前仓库已经补了一套独立主题模板，可以直接拿去改：

- `templates/theme-starter-vue/README.md`
- `templates/theme-starter-vue/extension.yaml`
- `templates/theme-starter-vue/build-zip.ps1`
- `templates/theme-starter-vanilla/README.md`
- `templates/theme-starter-vanilla/extension.yaml`
- `templates/theme-starter-vanilla/build-zip.ps1`

这个模板里已经包含：

1. Vue + Vite 主题源码
2. 标准 `extension.yaml`
3. `pnpm build`
4. `pnpm package:zip`

现在你有两套模板，不要乱选：

1. `theme-starter-vue`
   适合需要组件拆分、后续还要继续工程化演进的主题。
2. `theme-starter-vanilla`
   适合纯静态门户、活动页、落地页，或者 AI 快速生成后人工收口。

两套模板现在都已经内置了 Web Component 挂载运行时：

1. 主题页面通过 `data-portal-slot="xxx"` 声明挂载点。
2. 宿主返回 slot 下的 widget 清单。
3. 主题运行时按 `componentUrl + tagName` 动态加载并挂载 Web Component。

## 5. 打包流程

以模板为例，完整流程就这几步：

```powershell
cd templates/theme-starter-vue
pnpm install
pnpm build
pnpm package:zip
```

执行完成后会生成：

```text
templates/theme-starter-vue/release/tt-theme-starter-vue-1.0.0.zip
```

如果你走原生模板，把目录换成：

```powershell
cd templates/theme-starter-vanilla
pnpm install
pnpm build
pnpm package:zip
```

输出会变成：

```text
templates/theme-starter-vanilla/release/tt-theme-starter-vanilla-1.0.0.zip
```

## 6. 上传宿主

1. 访问 `/portal-theme-control`，在后台上传 ZIP。
2. 安装扩展。
3. 到门户主题管理切换当前主题。
4. 访问已部署 `tt-admin-portal-shell` 的门户域名看正式门户。
5. 访问 `/portal-preview?theme={themeId}` 看后台预览。
6. 访问 `/portal-orchestration` 查看当前主题 slot/widget 运行态。

这里边界必须说死：后台管理端和门户公网入口是两套入口。正式门户建议部署 `tt-admin-portal-shell` 这种纯 HTML/JS 壳子，由 Nginx 挂到 `duck.vin/` 之类的域名；
`/portal-preview?theme={themeId}` 才是后台提供的预览和调试容器，可以展示切换器、运行时 slot/widget 信息。
别把预览容器当正式门户壳子用，否则主题又会退化成“被后台页面包住的插件”，这设计就废了。
如果没有安装或启用任何带 `portalDist` 的主题插件，门户壳应该显示明确空态，不应该伪装成后台首页或内置主题。

## 7. 当前阶段边界

现在已经支持：

1. 外部主题独立开发
2. 构建产物 ZIP 导入
3. 后台切换当前门户
4. 门户 `/` 加载当前主题产物

现在还没完全做透：

1. 一键脚手架命令
2. 多套主题模板市场
3. 主题内 widget 的真正动态渲染执行器

先把这条发布主链路跑顺，比瞎扯生态有用得多。
