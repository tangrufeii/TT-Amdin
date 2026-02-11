package com.tt.interfaces.http.plugins;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.plugin.command.*;
import com.tt.application.plugin.dto.PluginManagementDTO;
import com.tt.application.plugin.dto.PluginStatisticsDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendModuleDTO;
import com.tt.application.plugin.service.PluginManagementApplicationService;
import com.tt.application.plugin.progress.PluginStatusSnapshotStore;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

/**
 * 插件管理控制器
 * <p>
 * 提供插件管理的 HTTP 接口：
 * 1. 插件分页查询
 * 2. 插件安装
 * 3. 插件列表
 * 4. 插件详情
 * 5. 插件创建
 * 6. 插件更新/删除
 * 7. 插件启用/禁用
 * <p>
 * 暴露插件管理的 RESTful 接口
 *
 * @author tt
 * @date 2025/12/24
 */
@Tag(name = "插件管理", description = "插件管理相关接口")
@RestController
@RequestMapping("/plugin/management")
@RequiredArgsConstructor
public class PluginManagementController {

    private final PluginManagementApplicationService pluginManagementApplicationService;

    /**
     * 插件分页查询
     * <p>
     * 分页查询插件列表
     *
     * @param command 查询条件
     * @return 分页数据
     */
    @PostMapping("/page")
    @Operation(summary = "插件分页查询", description = "分页查询插件列表")
    public Result<RPage<PluginManagementDTO>> page(@RequestBody PluginPageQueryCommand command) {
        IPage<PluginManagementDTO> page = pluginManagementApplicationService.page(command);
        return Result.data(RPage.build(page, PluginManagementDTO::new));
    }

    @PostMapping("/installPlugin")
    @Operation(summary = "安装插件")
    @PermissionResource("plugin:install")
    public Result install(PluginInstallCommand command) {
        pluginManagementApplicationService.installPlugin(command);
        return Result.success();
    }

    /**
     * 插件列表
     *
     * @return 插件列表
     */
    @GetMapping("/list")
    @Operation(summary = "插件列表", description = "查询全部插件")
    public Result<List<PluginManagementDTO>> listAll() {
        List<PluginManagementDTO> list = pluginManagementApplicationService.listAll();
        return Result.data(list);
    }

    /**
     * 按状态查询
     *
     * @param status 插件状态 0-禁用 1-启用
     * @return 插件列表
     */
    @GetMapping("/list/byStatus")
    @Operation(summary = "按状态查询", description = "按状态查询插件列表")
    public Result<List<PluginManagementDTO>> listByStatus(
            @Parameter(description = "插件状态 0-禁用 1-启用")
            @RequestParam Integer status) {
        List<PluginManagementDTO> list = pluginManagementApplicationService.listByStatus(status);
        return Result.data(list);
    }

    /**
     * 获取插件详情
     *
     * @param id 插件ID
     * @return 插件详情
     */
    @GetMapping("/{id}")
    @Operation(summary = "获取插件详情", description = "根据ID查询插件详情")
    public Result<PluginManagementDTO> getById(
            @Parameter(description = "插件ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.getById(id);
        return Result.data(dto);
    }

    /**
     * 按插件ID查询
     *
     * @param pluginId 插件ID
     * @return 插件详情
     */
    @GetMapping("/byPluginId/{pluginId}")
    @Operation(summary = "按插件ID查询", description = "根据插件ID查询插件详情")
    public Result<PluginManagementDTO> getByPluginId(
            @Parameter(description = "插件ID")
            @PathVariable String pluginId) {
        PluginManagementDTO dto = pluginManagementApplicationService.getByPluginId(pluginId);
        return Result.data(dto);
    }

    /**
     * 创建插件
     * <p>
     * 创建插件信息
     *
     * @param command 创建命令
     * @return 插件信息
     */
    @PostMapping
    @Operation(summary = "创建插件", description = "创建插件信息")
    public Result<PluginManagementDTO> create(@Valid @RequestBody PluginCreateCommand command) {
        PluginManagementDTO dto = pluginManagementApplicationService.create(command);
        return Result.data(dto);
    }

    /**
     * 更新插件
     *
     * @param command 更新命令
     * @return 插件信息
     */
    @PutMapping
    @Operation(summary = "更新插件", description = "更新插件信息")
    public Result<PluginManagementDTO> update(@Valid @RequestBody PluginUpdateCommand command) {
        PluginManagementDTO dto = pluginManagementApplicationService.update(command);
        return Result.data(dto);
    }

    /**
     * 删除插件
     * <p>
     * 删除插件信息
     *
     * @param id 插件ID
     * @return 处理结果
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "删除插件", description = "删除插件信息")
    public Result<Void> delete(
            @Parameter(description = "插件ID")
            @PathVariable Long id) {
        pluginManagementApplicationService.delete(id);
        return Result.success();
    }

    /**
     * 启用插件
     *
     * @param id 插件ID
     * @return 插件信息
     */
    @PutMapping("/{id}/enable")
    @Operation(summary = "启用插件", description = "启用插件")
    @PermissionResource("plugin:enable")
    public Result<PluginManagementDTO> enable(
            @Parameter(description = "插件ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.enable(id);
        return Result.data(dto);
    }

    /**
     * 停用插件
     *
     * @param id 插件ID
     * @return 插件信息
     */
    @PutMapping("/{id}/disable")
    @Operation(summary = "停用插件", description = "停用插件")
    @PermissionResource("plugin:disable")
    public Result<PluginManagementDTO> disable(
            @Parameter(description = "插件ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.disable(id);
        return Result.data(dto);
    }

    /**
     * 变更状态
     *
     * @param command 变更命令
     * @return 插件信息
     */
    @PutMapping("/status")
    @Operation(summary = "变更状态", description = "启用/停用插件")
    public Result<PluginManagementDTO> changeStatus(@Valid @RequestBody PluginStatusChangeCommand command) {
        PluginManagementDTO dto = pluginManagementApplicationService.changeStatus(command);
        return Result.data(dto);
    }

    /**
     * 插件统计
     *
     * @return 统计信息
     */
    @GetMapping("/statistics")
    @Operation(summary = "统计信息", description = "插件统计信息")
    public Result<PluginStatisticsDTO> getStatistics() {
        PluginStatisticsDTO statistics = pluginManagementApplicationService.getStatistics();
        return Result.data(statistics);
    }

    /**
     * 获取插件前端模块
     */
    @GetMapping("/frontend/modules")
    @Operation(summary = "前端模块", description = "获取插件前端模块信息")
    public Result<List<PluginFrontendModuleDTO>> getFrontendModules() {
        List<PluginFrontendModuleDTO> modules = pluginManagementApplicationService.listFrontendModules();
        return Result.data(modules);
    }

    /**
     * 获取插件状态快照
     */
    @GetMapping("/progress/snapshots")
    @Operation(summary = "进度快照", description = "获取插件状态快照")
    public Result<Collection<String>> getProgressSnapshots() {
        return Result.data(PluginStatusSnapshotStore.values());
    }

}