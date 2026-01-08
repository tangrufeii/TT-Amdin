<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign basePackage = (ctx.parentPackage)!'com.tt.plugin'>
<#assign packageName = (ctx.packageName)!((basePackage + '.' + (moduleName?replace('-',''))))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
package ${packageName}.model;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
<#assign needList = false>
<#list searchColumns as column>
  <#assign searchType = (column.searchType)!''>
  <#if searchType == "between" || searchType == "notBetween" || searchType == "in" || searchType == "notIn">
    <#assign needList = true>
  </#if>
</#list>
<#if needList>
import java.util.List;
</#if>

@Data
public class ${entityName}PageQuery extends PageQuery {
<#list searchColumns as column>
    <#assign fieldName = (column.fieldName)!'field'>
    <#assign comment = (column.comment)!''>
    <#assign javaType = (column.javaType)!'String'>
    <#assign searchType = (column.searchType)!''>
    @Schema(description = "${comment}")
<#if searchType == "between" || searchType == "notBetween" || searchType == "in" || searchType == "notIn">
    private List<String> ${fieldName};
<#else>
    private ${javaType} ${fieldName};
</#if>

</#list>
}
