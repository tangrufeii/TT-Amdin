package com.tt.interfaces.http.system;

import com.tt.application.menu.command.MenuCreateCommand;
import com.tt.application.menu.command.MenuDeleteCommand;
import com.tt.application.menu.command.MenuUpdateCommand;
import com.tt.application.menu.dto.MenuDetailDTO;
import com.tt.application.menu.dto.MenuTreeDTO;
import com.tt.application.menu.service.MenuApplicationService;
import com.tt.common.api.Result;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/system/menu")
@RequiredArgsConstructor
@Tag(name = "菜单管理", description = "菜单管理相关接口")
public class MenuController {

    private final MenuApplicationService menuApplicationService;

    @GetMapping("/tree")
    @Operation(summary = "获取菜单树")
    public Result<List<MenuTreeDTO>> getMenuTree() {
        return Result.data(menuApplicationService.getMenuTree());
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取菜单详情")
    public Result<MenuDetailDTO> getMenuDetail(@PathVariable Long id) {

        return Result.data(menuApplicationService.getMenuDetail(id));
    }

    @PostMapping
    @Operation(summary = "新增菜单")
    @PermissionResource("sys:menu:add")
    public Result<Boolean> createMenu(@Valid @RequestBody MenuCreateCommand command) {
        menuApplicationService.createMenu(command);
        return Result.data(Boolean.TRUE);
    }

    @PutMapping
    @Operation(summary = "更新菜单")
    @PermissionResource("sys:menu:update")
    public Result<Boolean> updateMenu(@Valid @RequestBody MenuUpdateCommand command) {
        menuApplicationService.updateMenu(command);
        return Result.data(Boolean.TRUE);
    }

    @DeleteMapping
    @Operation(summary = "删除菜单")
    @PermissionResource("sys:menu:delete")
    public Result<Boolean> deleteMenu(@Valid @RequestBody MenuDeleteCommand command) {
        menuApplicationService.deleteMenus(command);
        return Result.data(Boolean.TRUE);
    }

    @GetMapping("/allPages")
    @Operation(summary = "获取全部页面标识")
    public Result<List<String>> getAllPages() {
        return Result.data(menuApplicationService.getAllPages());
    }
}
