<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
<#assign routeName = (ctx.routeName)!("plugin-" + moduleName + "-index")>
<#assign routePath = (ctx.routePath)!("/" + moduleName)>
<#assign menuName = (ctx.menuName)!((ctx.tableComment)!moduleName)>
<#assign i18nKey = (ctx.i18nKey)!("plugin." + moduleName + ".title")>
<#assign icon = (ctx.icon)!'mdi:view-dashboard-outline'>
renderer: web-component
i18n:
  zh-CN: i18n/zh-CN.json
  en-US: i18n/en-US.json
modules:
  - moduleName: ${moduleName}
    routes:
      - name: ${routeName}
        path: ${routePath}
        component: /view/${entityName}View
        componentName: ${routeName}
        meta:
          title: ${menuName}
          i18nKey: ${i18nKey}
          icon: ${icon}
          order: 10
          hideInMenu: false
          keepAlive: true
          layout: base
menus:
  - routeName: ${routeName}
