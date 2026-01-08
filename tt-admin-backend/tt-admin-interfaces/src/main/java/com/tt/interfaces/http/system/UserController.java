package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.user.command.UserCreateCommand;
import com.tt.application.user.command.UserDeleteCommand;
import com.tt.application.user.command.UserPageQueryCommand;
import com.tt.application.user.command.UserUpdateCommand;
import com.tt.application.user.dto.UserManageDTO;
import com.tt.application.user.service.UserManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/system/user")
@RequiredArgsConstructor
@Tag(name = "用户管理", description = "用户管理相关接口")
public class UserController {

    private final UserManagementApplicationService userManagementApplicationService;

    @PostMapping("/page")
    @Operation(summary = "用户分页列表")
    @PermissionResource("sys:user:page")
    public Result<RPage<UserManageDTO>> page(@RequestBody UserPageQueryCommand command) {
        IPage<UserManageDTO> page = userManagementApplicationService.page(command);
        return Result.data(RPage.build(page, UserManageDTO::new));
    }

    @GetMapping("/{id}")
    @Operation(summary = "用户详情")
    public Result<UserManageDTO> detail(@PathVariable Long id) {
        return Result.data(userManagementApplicationService.get(id));
    }

    @PostMapping
    @Operation(summary = "新增用户")
    @PermissionResource("sys:user:add")
    public Result<Boolean> create(@Valid @RequestBody UserCreateCommand command) {
        userManagementApplicationService.create(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新用户")
    @PermissionResource("sys:user:update")
    public Result<Boolean> update(@Valid @RequestBody UserUpdateCommand command) {
        userManagementApplicationService.update(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除用户")
    @PermissionResource("sys:user:delete")
    public Result<Boolean> delete(@Valid @RequestBody UserDeleteCommand command) {
        userManagementApplicationService.delete(command);
        return Result.success();
    }

    @PutMapping("/reset-password/{id}")
    @Operation(summary = "重置密码")
    @PermissionResource("sys:user:resetPassword")
    public Result<String> resetPassword(@PathVariable Long id) {
        return Result.data(userManagementApplicationService.resetPassword(id));
    }
}
