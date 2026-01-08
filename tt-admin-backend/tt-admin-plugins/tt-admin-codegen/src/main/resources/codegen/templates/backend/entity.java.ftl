<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign basePackage = (ctx.parentPackage)!'com.tt.plugin'>
<#assign packageName = (ctx.packageName)!((basePackage + '.' + (moduleName?replace('-',''))))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
<#assign tableName = (ctx.tableName)!'table'>
<#assign tableComment = (ctx.tableComment)!(tableName)!'表'>
package ${packageName}.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
<#if imports?seq_contains("BigDecimal")>
import java.math.BigDecimal;
</#if>
<#if imports?seq_contains("LocalDate")>
import java.time.LocalDate;
</#if>
<#if imports?seq_contains("LocalDateTime")>
import java.time.LocalDateTime;
</#if>

/**
 * ${tableComment}
 */
@Data
@TableName("${tableName}")
public class ${entityName} {
<#list columns as column>
    <#assign columnName = (column.columnName)!'column'>
    <#assign comment = (column.comment)!''>
    <#assign javaType = (column.javaType)!'String'>
    <#assign fieldName = (column.fieldName)!'field'>
    <#assign idType = (column.idType)!'ASSIGN_ID'>
    <#assign isPrimary = (column.primaryKey)!false>
    /**
     * ${comment}
     */
<#if isPrimary>
    @TableId(value = "${columnName}", type = IdType.${idType})
<#else>
    @TableField("${columnName}")
</#if>
    private ${javaType} ${fieldName};

</#list>
}
