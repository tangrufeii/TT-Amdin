<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign menuName = (ctx.menuName)!((ctx.tableComment)!moduleName)>
{
  "plugin": {
    "${moduleName}": {
      "title": "${menuName}"<#if columns?size gt 0>,</#if>
<#list columns as column>
      <#assign fieldName = (column.fieldName)!'field'>
      <#assign comment = (column.comment)!''>
      "${fieldName}": "${comment}"<#if column_has_next>,</#if>
</#list>
    }
  },
  "common": {
    "search": "查询",
    "reset": "重置",
    "add": "新增",
    "edit": "编辑",
    "delete": "删除",
    "confirm": "确定",
    "cancel": "取消",
    "action": "操作",
    "saveSuccess": "保存成功",
    "deleteConfirm": "确认删除该记录吗？"
  }
}
