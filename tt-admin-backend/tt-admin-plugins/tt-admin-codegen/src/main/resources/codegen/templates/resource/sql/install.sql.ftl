<#assign tableName = (ctx.tableName)!'table'>
<#assign tableComment = (ctx.tableComment)!(tableName)!'表'>
<#assign pkColumn = (primaryKey.columnName)!'id'>
-- 表结构 ${tableName}
CREATE TABLE IF NOT EXISTS `${tableName}` (
<#list columns as column>
  <#assign columnName = (column.columnName)!'column'>
  <#assign sqlType = (column.sqlType)!'varchar(255)'>
  <#assign nullable = (column.nullable)!true>
  <#assign autoIncrement = (column.autoIncrement)!false>
  <#assign comment = (column.comment)!''>
  `${columnName}` ${sqlType}<#if !nullable> NOT NULL</#if><#if autoIncrement> AUTO_INCREMENT</#if> COMMENT '${comment?replace("'", "''")}'<#if column_has_next>,</#if>
</#list>
  ,PRIMARY KEY (`${pkColumn}`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='${tableComment?replace("'", "''")}';
