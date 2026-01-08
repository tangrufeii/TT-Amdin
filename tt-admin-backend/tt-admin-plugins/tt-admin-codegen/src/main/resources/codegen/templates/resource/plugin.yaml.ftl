<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign pluginId = (ctx.pluginId)!("tt-plugin-" + moduleName)>
<#assign pluginName = (ctx.pluginName)!((ctx.tableComment)!moduleName)>
<#assign version = (ctx.version)!'1.0.0'>
<#assign author = (ctx.author)!'tt'>
plugin:
  # plugin id (must be unique)
  id: ${pluginId}
  # plugin name
  name: ${pluginName}
  # mapper xml location (optional)
  # mapperLocation:
  # plugin description
  description: ${pluginName} plugin
  # minimal supported version
  # minimalVersion: 2.2.0
  # plugin version
  version: ${version}
  # static resources path
  # staticLocations: /ui/
  # dev mode (frontend node)
  isDev: false
  # frontend dev address
  frontDevAddress: http://127.0.0.1:4203
  # update url
  updateUrl:
author:
  # author name
  name: ${author}
  # author email
  # email:
  # author website
  # webSite:
