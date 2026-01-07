package com.tt.interfaces.http.plugins;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.plugin.command.*;
import com.tt.application.plugin.dto.PluginManagementDTO;
import com.tt.application.plugin.dto.PluginStatisticsDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendModuleDTO;
import com.tt.application.plugin.service.PluginManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 插件管理控制器
 * <p>
 * 提供插件管理的HTTP接口，包括：
 * 1. 插件列表查询（分页）
 * 2. 插件详情查询
 * 3. 插件创建
 * 4. 插件更新
 * 5. 插件删除
 * 6. 插件启用/禁用
 * 7. 插件统计信息
 * <p>
 * 所有接口遵循 RESTful 风格设计
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
     * 分页查询插件列表
     * <p>
     * 支持按名称模糊查询和状态筛选
     *
     * @param command 查询条件
     * @return 分页结果
     */
    @PostMapping("/page")
    @Operation(summary = "分页查询插件列表", description = "支持按名称和状态筛选")
    public Result<RPage<PluginManagementDTO>> page(@RequestBody PluginPageQueryCommand command) {
        IPage<PluginManagementDTO> page = pluginManagementApplicationService.page(command);
        return Result.data(RPage.build(page,PluginManagementDTO::new));
    }
    @PostMapping("/installPlugin")
    @Operation(summary = "插件安装")
    @PermissionResource("plugin:install")
    public Result install(PluginInstallCommand command) {
        pluginManagementApplicationService.installPlugin(command);
        return Result.success();
    }
    /**
     * 查询所有插件列表
     *
     * @return 插件列表
     */
    @GetMapping("/list")
    @Operation(summary = "查询所有插件", description = "获取所有插件列表")
    public Result<List<PluginManagementDTO>> listAll() {
        List<PluginManagementDTO> list = pluginManagementApplicationService.listAll();
        return Result.data(list);
    }

    /**
     * 根据状态查询插件列表
     *
     * @param status 状态：0-禁用，1-启用
     * @return 插件列表
     */
    @GetMapping("/list/byStatus")
    @Operation(summary = "按状态查询插件", description = "根据状态查询插件列表")
    public Result<List<PluginManagementDTO>> listByStatus(
            @Parameter(description = "状态：0-禁用，1-启用")
            @RequestParam Integer status) {
        List<PluginManagementDTO> list = pluginManagementApplicationService.listByStatus(status);
        return Result.data(list);
    }

    /**
     * 根据ID查询插件详情
     *
     * @param id 插件主键ID
     * @return 插件详情
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询插件详情", description = "根据ID查询插件详细信息")
    public Result<PluginManagementDTO> getById(
            @Parameter(description = "插件主键ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.getById(id);
        return Result.data(dto);
    }

    /**
     * 根据插件ID查询详情
     *
     * @param pluginId 插件ID（唯一标识）
     * @return 插件详情
     */
    @GetMapping("/byPluginId/{pluginId}")
    @Operation(summary = "根据插件ID查询", description = "根据插件ID查询详细信息")
    public Result<PluginManagementDTO> getByPluginId(
            @Parameter(description = "插件ID")
            @PathVariable String pluginId) {
        PluginManagementDTO dto = pluginManagementApplicationService.getByPluginId(pluginId);
        return Result.data(dto);
    }

    /**
     * 创建插件记录
     * <p>
     * 用于安装插件后创建数据库记录
     *
     * @param command 创建命令
     * @return 插件详情
     */
    @PostMapping
    @Operation(summary = "创建插件", description = "创建新的插件记录")
    public Result<PluginManagementDTO> create(@Valid @RequestBody PluginCreateCommand command) {
        PluginManagementDTO dto = pluginManagementApplicationService.create(command);
        return Result.data(dto);
    }

    /**
     * 更新插件信息
     *
     * @param command 更新命令
     * @return 插件详情
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
     * 删除前会验证插件是否已禁用
     *
     * @param id 插件主键ID
     * @return 操作结果
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "删除插件", description = "删除指定插件（需先禁用）")
    public Result<Void> delete(
            @Parameter(description = "插件主键ID")
            @PathVariable Long id) {
        pluginManagementApplicationService.delete(id);
        return Result.success();
    }

    /**
     * 启用插件
     *
     * @param id 插件主键ID
     * @return 插件详情
     */
    @PutMapping("/{id}/enable")
    @Operation(summary = "启用插件", description = "启用指定插件")
    @PermissionResource("plugin:enable")
    public Result<PluginManagementDTO> enable(
            @Parameter(description = "插件主键ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.enable(id);
        return Result.data(dto);
    }

    /**
     * 禁用插件
     *
     * @param id 插件主键ID
     * @return 插件详情
     */
    @PutMapping("/{id}/disable")
    @Operation(summary = "禁用插件", description = "禁用指定插件")
    @PermissionResource("plugin:disable")
    public Result<PluginManagementDTO> disable(
            @Parameter(description = "插件主键ID")
            @PathVariable Long id) {
        PluginManagementDTO dto = pluginManagementApplicationService.disable(id);
        return Result.data(dto);
    }

    /**
     * 变更插件状态
     *
     * @param command 状态变更命令
     * @return 插件详情
     */
    @PutMapping("/status")
    @Operation(summary = "变更插件状态", description = "变更插件的启用/禁用状态")
    public Result<PluginManagementDTO> changeStatus(@Valid @RequestBody PluginStatusChangeCommand command) {
        PluginManagementDTO dto = pluginManagementApplicationService.changeStatus(command);
        return Result.data(dto);
    }

    /**
     * 获取插件统计信息
     *
     * @return 统计信息
     */
    @GetMapping("/statistics")
    @Operation(summary = "插件统计", description = "获取插件统计信息（总数、启用数、禁用数）")
    public Result<PluginStatisticsDTO> getStatistics() {
        PluginStatisticsDTO statistics = pluginManagementApplicationService.getStatistics();
        return Result.data(statistics);
    }

    /**
     * 鑾峰彇宸插紑鍚彃浠剁殑鍓嶇妯″潡鎺ュ彛
     */
    @GetMapping("/frontend/modules")
    @Operation(summary = "鑾峰彇鍓嶇鎻掍欢妯″潡", description = "鑾峰彇宸茬粡鍚敤鎻掍欢鐨勫墠绔瓙妯″潡鍜屽彛鐩」缁撴灉")
    public Result<List<PluginFrontendModuleDTO>> getFrontendModules() {
        List<PluginFrontendModuleDTO> modules = pluginManagementApplicationService.listFrontendModules();
        return Result.data(modules);
    }
}
