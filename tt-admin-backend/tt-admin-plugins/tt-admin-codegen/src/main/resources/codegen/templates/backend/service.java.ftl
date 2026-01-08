<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign basePackage = (ctx.parentPackage)!'com.tt.plugin'>
<#assign packageName = (ctx.packageName)!((basePackage + '.' + (moduleName?replace('-',''))))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
<#assign pkUpperFieldName = (primaryKey.upperFieldName)!'Id'>
package ${packageName}.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import ${packageName}.mapper.${entityName}Mapper;
import ${packageName}.model.${entityName};
import ${packageName}.model.${entityName}PageQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class ${entityName}Service extends ServiceImpl<${entityName}Mapper, ${entityName}> {

    public LambdaQueryWrapper<${entityName}> buildWrapper(${entityName}PageQuery query) {
        LambdaQueryWrapper<${entityName}> wrapper = new LambdaQueryWrapper<>();
<#list searchColumns as column>
        <#assign fieldName = (column.fieldName)!'field'>
        <#assign upperFieldName = (column.upperFieldName)!((fieldName)?cap_first)>
        <#assign javaType = (column.javaType)!'String'>
        <#assign searchType = column.searchType?has_content?then(column.searchType, (javaType == "String")?string("like", "equal"))>
        <#if searchType == "between" || searchType == "notBetween">
        if (query.get${upperFieldName}() != null && query.get${upperFieldName}().size() == 2) {
            <#if searchType == "between">
            wrapper.between(${entityName}::get${upperFieldName}, query.get${upperFieldName}().get(0), query.get${upperFieldName}().get(1));
            <#else>
            wrapper.notBetween(${entityName}::get${upperFieldName}, query.get${upperFieldName}().get(0), query.get${upperFieldName}().get(1));
            </#if>
        }
        <#elseif searchType == "in" || searchType == "notIn">
        if (query.get${upperFieldName}() != null && !query.get${upperFieldName}().isEmpty()) {
            <#if searchType == "in">
            wrapper.in(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
            <#else>
            wrapper.notIn(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
            </#if>
        }
        <#else>
        <#if javaType == "String">
        if (StringUtils.hasText(query.get${upperFieldName}())) {
        <#else>
        if (query.get${upperFieldName}() != null) {
        </#if>
            <#switch searchType>
                <#case "equal">
            wrapper.eq(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "noEqual">
            wrapper.ne(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "leftLike">
            wrapper.likeLeft(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "rightLike">
            wrapper.likeRight(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "greaterThan">
            wrapper.gt(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "greaterThanOrEqual">
            wrapper.ge(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "lessThan">
            wrapper.lt(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "lessThanOrEqual">
            wrapper.le(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
                    <#break>
                <#case "like">
                <#default>
            wrapper.like(${entityName}::get${upperFieldName}, query.get${upperFieldName}());
            </#switch>
        }
        </#if>

</#list>
        wrapper.orderByDesc(${entityName}::get${pkUpperFieldName});
        return wrapper;
    }
}
