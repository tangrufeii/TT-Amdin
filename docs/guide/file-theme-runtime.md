# 文件化门户主题运行时 v0

这版先跑通最小闭环，不碰数据库编排，也不替代现有扩展 Manifest。

## 目录结构

```text
resources/themes/blog/
├─ theme.json
├─ pages/
│  └─ index.html
├─ static/
│  ├─ style.css
│  └─ main.js
└─ widgets/
   ├─ weather/
   │  ├─ template.html
   │  ├─ style.css
   │  └─ script.js
   └─ music/
      ├─ template.html
      ├─ style.css
      └─ script.js
```

主题页面用 `data-slot` 声明挂载点：

```html
<aside data-slot="hero-aside"></aside>
<section data-slot="content-top"></section>
```

`theme.json` 里声明页面、slot、默认挂件：

```json
{
  "id": "blog",
  "title": "TT 文件化博客主题",
  "pages": {
    "/": "pages/index.html"
  },
  "widgets": [
    {
      "key": "weather",
      "slot": "hero-aside",
      "template": "widgets/weather/template.html",
      "style": "widgets/weather/style.css",
      "script": "widgets/weather/script.js",
      "order": 10,
      "config": {
        "city": "杭州"
      }
    }
  ]
}
```

## 访问方式

后端渲染入口：

```text
GET /portal/render
GET /portal/render?themeKey=blog
```

主题静态资源入口：

```text
GET /portal/theme-assets/{themeKey}/static/style.css
```

如果经过 nginx，公网路径应该走 `/api` 代理：

```nginx
location / {
  proxy_pass http://backend:8080/portal/render;
}

location /portal/theme-assets/ {
  proxy_pass http://backend:8080/portal/theme-assets/;
}

location /api/ {
  proxy_pass http://backend:8080/;
}
```

## 当前边界

1. 当前挂件编排来自 `theme.json`，后续再迁到数据库编排中心。
2. 当前只做 HTML 片段、CSS、JS 注入，不做模板表达式。
3. 后续在线编辑接口只需要围绕 `resources/themes/{themeKey}` 做文件树、读取、保存、版本快照即可。
4. AI 编辑应该生成文件 diff，再由用户确认保存，不要直接改线上文件。

