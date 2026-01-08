package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.role.command.RoleCreateCommand;
import com.tt.application.role.command.RoleDeleteCommand;
import com.tt.application.role.command.RoleMenuAssignCommand;
import com.tt.application.role.command.RolePageQueryCommand;
import com.tt.application.role.command.RolePermissionAssignCommand;
import com.tt.application.role.command.RoleUpdateCommand;
import com.tt.application.role.dto.PermissionTreeDTO;
import com.tt.application.role.dto.RoleManageDTO;
import com.tt.application.role.dto.RoleOptionDTO;
import com.tt.application.role.service.RoleManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/role")
@RequiredArgsConstructor
@Tag(name = "角色管理", description = "角色管理相关接口")
public class RoleController {

    private final RoleManagementApplicationService roleManagementApplicationService;

    @PostMapping("/page")
    @Operation(summary = "角色分页列表")
    @PermissionResource("sys:role:page")
    public Result<RPage<RoleManageDTO>> page(@RequestBody RolePageQueryCommand command) {
        IPage<RoleManageDTO> page = roleManagementApplicationService.page(command);
        return Result.data(RPage.build(page, RoleManageDTO::new));
    }

    @GetMapping("/{id}")
    @Operation(summary = "角色详情")
    public Result<RoleManageDTO> detail(@PathVariable Long id) {
        return Result.data(roleManagementApplicationService.get(id));
    }

    @PostMapping
    @Operation(summary = "新增角色")
    @PermissionResource("sys:role:add")
    public Result<Boolean> create(@Valid @RequestBody RoleCreateCommand command) {
        roleManagementApplicationService.create(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新角色")
    @PermissionResource("sys:role:update")
    public Result<Boolean> update(@Valid @RequestBody RoleUpdateCommand command) {
        roleManagementApplicationService.update(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除角色")
    @PermissionResource("sys:role:delete")
    public Result<Boolean> delete(@Valid @RequestBody RoleDeleteCommand command) {
        roleManagementApplicationService.delete(command);
        return Result.success();
    }

    @GetMapping("/all")
    @Operation(summary = "获取启用角色列表")
    @PermissionResource("sys:role:all")
    public Result<List<RoleOptionDTO>> listAll() {
        return Result.data(roleManagementApplicationService.listAllEnabled());
    }

    @GetMapping("/menu/{roleId}")
    @Operation(summary = "获取角色菜单ID列表")
    public Result<List<Long>> getRoleMenus(@PathVariable Long roleId) {
        return Result.data(roleManagementApplicationService.getRoleMenuIds(roleId));
    }

    @PostMapping("/menu")
    @Operation(summary = "保存角色菜单")
    @PermissionResource("sys:role:menu:add")
    public Result<Boolean> saveRoleMenus(@RequestBody RoleMenuAssignCommand command) {
        roleManagementApplicationService.saveRoleMenus(command);
        return Result.success();
    }

    @GetMapping("/permission/{roleId}")
    @Operation(summary = "获取角色权限ID列表")
    public Result<List<Long>> getRolePermissions(@PathVariable Long roleId) {
        return Result.data(roleManagementApplicationService.getRolePermissionIds(roleId));
    }

    @PostMapping("/permission")
    @Operation(summary = "保存角色权限")
    @PermissionResource("sys:role:permission:add")
    public Result<Boolean> saveRolePermissions(@RequestBody RolePermissionAssignCommand command) {
        roleManagementApplicationService.saveRolePermissions(command);
        return Result.success();
    }

    @GetMapping("/permission/tree")
    @Operation(summary = "获取权限树")
    public Result<List<PermissionTreeDTO>> getPermissionTree() {
        return Result.data(roleManagementApplicationService.getPermissionTree());
    }
}
