package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.permission.command.PermissionCreateCommand;
import com.tt.application.permission.command.PermissionDeleteCommand;
import com.tt.application.permission.command.PermissionPageQueryCommand;
import com.tt.application.permission.command.PermissionUpdateCommand;
import com.tt.application.permission.dto.MenuPermissionDTO;
import com.tt.application.permission.dto.PermissionManageDTO;
import com.tt.application.permission.service.PermissionManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import com.tt.interfaces.support.PermissionAnnotationExtractor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/system/permission")
@RequiredArgsConstructor
@Tag(name = "按钮权限管理", description = "按钮权限管理相关接口")
public class PermissionController {

    private final PermissionManagementApplicationService permissionManagementApplicationService;
    private final PermissionAnnotationExtractor permissionAnnotationExtractor;

    @PostMapping("/page")
    @Operation(summary = "权限分页列表")
    public Result<RPage<PermissionManageDTO>> page(@RequestBody PermissionPageQueryCommand command) {
        IPage<PermissionManageDTO> page = permissionManagementApplicationService.page(command);
        return Result.data(RPage.build(page, PermissionManageDTO::new));
    }

    @GetMapping("/{id}")
    @Operation(summary = "权限详情")
    public Result<PermissionManageDTO> detail(@PathVariable Long id) {
        return Result.data(permissionManagementApplicationService.get(id));
    }

    @PostMapping
    @Operation(summary = "新增权限")
    @PermissionResource("sys:permission:add")
    public Result<Boolean> create(@Valid @RequestBody PermissionCreateCommand command) {
        permissionManagementApplicationService.create(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新权限")
    @PermissionResource("sys:permission:update")
    public Result<Boolean> update(@Valid @RequestBody PermissionUpdateCommand command) {
        permissionManagementApplicationService.update(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除权限")
    @PermissionResource("sys:permission:delete")
    public Result<Boolean> delete(@Valid @RequestBody PermissionDeleteCommand command) {
        permissionManagementApplicationService.delete(command);
        return Result.success();
    }

    @GetMapping("/annotations")
    @Operation(summary = "权限注解说明")
    public Result<Map<String, String>> getAnnotations() {
        Map<String, String> merged = new LinkedHashMap<>();
        merged.putAll(permissionManagementApplicationService.getResourceAnnotations());
        merged.putAll(permissionAnnotationExtractor.extractPermissionAnnotations());
        return Result.data(merged);
    }

    @GetMapping("/menu")
    @Operation(summary = "菜单按钮权限列表")
    public Result<List<MenuPermissionDTO>> listMenuPermissions() {
        return Result.data(permissionManagementApplicationService.listMenuPermissions());
    }
}
