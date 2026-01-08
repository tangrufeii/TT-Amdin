<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign basePackage = (ctx.parentPackage)!'com.tt.plugin'>
<#assign packageName = (ctx.packageName)!((basePackage + '.' + (moduleName?replace('-',''))))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
<#assign tableComment = (ctx.tableComment)!(ctx.tableName)!'表'>
package ${packageName}.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import ${packageName}.model.${entityName};
import org.apache.ibatis.annotations.Mapper;

/**
 * ${tableComment} Mapper
 */
@Mapper
public interface ${entityName}Mapper extends BaseMapper<${entityName}> {
}
