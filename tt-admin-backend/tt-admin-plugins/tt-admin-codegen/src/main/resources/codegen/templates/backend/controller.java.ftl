<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign basePackage = (ctx.parentPackage)!'com.tt.plugin'>
<#assign packageName = (ctx.packageName)!((basePackage + '.' + (moduleName?replace('-',''))))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
<#assign entityVar = (ctx.entityVar)!(entityName?uncap_first)>
<#assign menuName = (ctx.menuName)!((ctx.tableComment)!'模块')>
<#assign tableComment = (ctx.tableComment)!(ctx.tableName)!'表'>
<#assign pkFieldName = (primaryKey.fieldName)!'id'>
<#assign pkJavaType = (primaryKey.javaType)!'Long'>
<#assign pkUpperFieldName = (primaryKey.upperFieldName)!'Id'>
package ${packageName}.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import ${packageName}.model.${entityName};
import ${packageName}.model.${entityName}PageQuery;
import ${packageName}.service.${entityName}Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * ${tableComment} 控制器
 */
@RestController
@RequestMapping("/plugin/${moduleName}")
@Tag(name = "${menuName}管理")
@RequiredArgsConstructor
public class ${entityName}Controller {

    private final ${entityName}Service ${entityVar}Service;

    @PostMapping("/page")
    @Operation(summary = "${menuName}分页查询")
    public Result<RPage<${entityName}>> page(@RequestBody ${entityName}PageQuery query) {
        IPage<${entityName}> page = ${entityVar}Service.page(query.buildPage(), ${entityVar}Service.buildWrapper(query));
        return Result.data(RPage.build(page));
    }

    @GetMapping("/{${pkFieldName}}")
    @Operation(summary = "${menuName}详情")
    public Result<${entityName}> getById(@PathVariable ${pkJavaType} ${pkFieldName}) {
        return Result.data(${entityVar}Service.getById(${pkFieldName}));
    }

    @PostMapping
    @Operation(summary = "${menuName}新增")
    public Result<${entityName}> create(@RequestBody ${entityName} entity) {
        ${entityVar}Service.save(entity);
        return Result.data(entity);
    }

    @PutMapping
    @Operation(summary = "${menuName}更新")
    public Result<${entityName}> update(@RequestBody ${entityName} entity) {
        ${entityVar}Service.updateById(entity);
        return Result.data(entity);
    }

    @DeleteMapping("/{${pkFieldName}}")
    @Operation(summary = "${menuName}删除")
    public Result<Void> delete(@PathVariable ${pkJavaType} ${pkFieldName}) {
        ${entityVar}Service.removeById(${pkFieldName});
        return Result.success();
    }
}
