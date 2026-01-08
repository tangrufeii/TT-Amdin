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
    "search": "Search",
    "reset": "Reset",
    "add": "Add",
    "edit": "Edit",
    "delete": "Delete",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "action": "Action",
    "saveSuccess": "Saved",
    "deleteConfirm": "Confirm delete?"
  }
}
