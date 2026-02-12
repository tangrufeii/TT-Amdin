package com.tt.application.plugin.service;

import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.plugin.command.*;
import com.tt.application.plugin.dto.PluginManagementDTO;
import com.tt.application.plugin.dto.PluginStatisticsDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendMenuDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendModuleDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendRouteDTO;
import com.tt.application.plugin.dto.frontend.PluginFrontendRouteMetaDTO;
import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainEventPublisher;
import com.tt.common.domain.DomainException;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendMenuDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendModuleDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteMeta;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import com.tt.domain.plugin.repository.PluginFrontendDefinitionRepository;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.domain.plugin.service.PluginDomainService;
import com.tt.domain.plugin.service.PluginManagementDomainService;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.event.PluginLifecycleEvent;
import com.tt.domain.plugin.progress.PluginProgressContext;
import com.tt.domain.system.access.model.SystemMenu;
import com.tt.domain.system.menu.repository.SystemMenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 插件管理应用服务
 * <p>
 * 职责：
 * 1. 处理插件管理的CRUD操作
 * 2. 事务管理
 * 3. 协调领域服务（数据库）和基础设施（插件引擎）
 * 4. 返回DTO给接口层
 * </p>
 * <p>
 * 应用服务是领域模型与外部世界的协调者，不包含业务逻辑，只负责流程编排。
 * 通过同步调用 Infrastructure 层和 Domain 层，确保数据一致性。
 * </p>
 *
 * @author tt
 * @date 2025/12/24
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PluginManagementApplicationService {

    private static final String ACTION_INSTALL = "INSTALL";
    private static final String ACTION_ENABLE = "ENABLE";
    private static final String ACTION_DISABLE = "DISABLE";
    private static final String ACTION_UNINSTALL = "UNINSTALL";
    private static final String STATUS_PROCESSING = "PROCESSING";
    private static final String STATUS_SUCCESS = "SUCCESS";
    private static final String STATUS_FAILED = "FAILED";

    private final PluginManagementRepository pluginManagementRepository;
    private final PluginManagementDomainService pluginManagementDomainService;
    private final DomainEventPublisher domainEventPublisher;
    private final PluginDomainService pluginDomainService;
    private final PluginManager pluginManager;
    private final PluginFrontendDefinitionRepository pluginFrontendDefinitionRepository;
    private final SystemMenuRepository systemMenuRepository;
    private final PluginMenuSyncService pluginMenuSyncService;
    private final Environment environment;

    /**
     * 创建插件记录
     */
    @Transactional(rollbackFor = Exception.class)
    public PluginManagementDTO create(PluginCreateCommand command) {
        pluginManagementDomainService.validatePluginIdAvailable(command.getPluginId());
        pluginManagementDomainService.validatePluginNameAvailable(command.getName());

        PluginManagement plugin = PluginManagement.create(
                command.getPluginId(),
                command.getName(),
                command.getDescription(),
                command.getVersion(),
                command.getAuthor(),
                command.getEmail(),
                command.getWebsite()
        );

        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        return convertToDTO(plugin);
    }

    /**
     * 更新插件信息
     */
    @Transactional(rollbackFor = Exception.class)
    public PluginManagementDTO update(PluginUpdateCommand command) {
        PluginManagement plugin = pluginManagementRepository.findById(command.getId())
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));

        plugin.updateInfo(command.getName(), command.getDescription(), command.getVersion());
        plugin.updateAuthorInfo(command.getAuthor(), command.getEmail(), command.getWebsite());
        boolean devModeEnabled = isPluginDevModeAllowed() && Boolean.TRUE.equals(command.getIsDev());
        String frontDevAddress = devModeEnabled ? command.getFrontDevAddress() : "";
        plugin.updateDevConfig(devModeEnabled, frontDevAddress);

        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        return convertToDTO(plugin);
    }

    /**
     * 删除（卸载）插件
     */
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        PluginManagement plugin = pluginManagementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));

        pluginManagementDomainService.validatePluginCanBeUninstalled(plugin.getPluginId());

        long startedAt = System.currentTimeMillis();
        // Track per-stage elapsed time for progress reporting.
        StageTracker stageTracker = new StageTracker();
        PluginProgressContext.setReporter(progress -> publishLifecycle(
                progress.getPluginId(),
                progress.getAction(),
                STATUS_PROCESSING,
                progress.getMessage(),
                progress.getStage(),
                progress.getProgress(),
                startedAt,
                System.currentTimeMillis() - startedAt,
                stageTracker.elapsed(progress.getStage())
        ));
        try {
            publishLifecycle(plugin.getPluginId(), ACTION_UNINSTALL, STATUS_PROCESSING, "插件卸载中", "start", 0, startedAt, 0L, null);
            // 同步调用基础设施层卸载插件
            pluginManager.uninstallPlugin(plugin.getPluginId());
        } catch (Exception e) {
            publishLifecycle(plugin.getPluginId(), ACTION_UNINSTALL, STATUS_FAILED, "插件卸载失败: " + e.getMessage(), "failed", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.error("Failed to uninstall plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件卸载失败: " + e.getMessage());
        } finally {
            PluginProgressContext.clear();
        }

        pluginMenuSyncService.removePluginMenus(plugin.getPluginId());
        plugin.uninstall();
        pluginManagementRepository.deleteById(id);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        publishLifecycle(plugin.getPluginId(), ACTION_UNINSTALL, STATUS_SUCCESS, "插件已卸载", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
        log.info("Plugin deleted: pluginId={}, name={}", plugin.getPluginId(), plugin.getName());
    }

    /**
     * 根据ID查询插件
     */
    public PluginManagementDTO getById(Long id) {
        return pluginManagementRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));
    }

    /**
     * 根据插件ID查询
     */
    public PluginManagementDTO getByPluginId(String pluginId) {
        return pluginManagementRepository.findByPluginId(pluginId)
                .map(this::convertToDTO)
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));
    }

    /**
     * 分页查询插件列表
     */
    public IPage<PluginManagementDTO> page(PluginPageQueryCommand command) {
        IPage<PluginManagement> page = pluginManagementRepository.findPage(
                command,
                command.getName(),
                command.getStatus()
        );
        return page.convert(this::convertToDTO);
    }

    /**
     * 安装插件（同步）
     */
    @Transactional(rollbackFor = Exception.class)
    public void installPlugin(PluginInstallCommand command) {
        long startedAt = System.currentTimeMillis();
        StageTracker stageTracker = new StageTracker();
        PluginProgressContext.setReporter(progress -> publishLifecycle(
                progress.getPluginId(),
                progress.getAction(),
                STATUS_PROCESSING,
                progress.getMessage(),
                progress.getStage(),
                progress.getProgress(),
                startedAt,
                System.currentTimeMillis() - startedAt,
                stageTracker.elapsed(progress.getStage())
        ));
        try {
            // 1. 保存上传文件到临时目录
            File tempDir = new File(PluginDirectory.TEMP_DIRECTORY.getPath());
            if (!tempDir.exists()) {
                FileUtil.mkdir(tempDir.getAbsolutePath());
            }
            File pluginFile = new File(tempDir.getAbsolutePath() + File.separator + command.getFile().getOriginalFilename());
            command.getFile().transferTo(pluginFile);
            publishLifecycle(null, ACTION_INSTALL, STATUS_PROCESSING, "插件准备中", "prepare", 5, startedAt, System.currentTimeMillis() - startedAt, null);

            // 2. 同步调用基础设施层安装插件
            PluginConfig pluginConfig = pluginManager.installPlugin(pluginFile);

            // 3. 保存插件信息到数据库
            pluginDomainService.savePluginInfo(pluginConfig);

            publishLifecycle(pluginConfig.getPlugin().getId(), ACTION_INSTALL, STATUS_SUCCESS, "插件安装成功", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.info("Plugin installed successfully: {}", pluginConfig.getPlugin().getId());

        } catch (Exception e) {
            publishLifecycle(null, ACTION_INSTALL, STATUS_FAILED, "插件安装失败: " + e.getMessage(), "failed", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.error("Failed to install plugin", e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件安装失败: " + e.getMessage());
        } finally {
            PluginProgressContext.clear();
        }
    }

    /**
     * 查询所有插件列表
     */
    public List<PluginManagementDTO> listAll() {
        return pluginManagementRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * 根据状态查询插件列表
     */
    public List<PluginManagementDTO> listByStatus(Integer status) {
        return pluginManagementRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * 启用插件
     */
    @Transactional(rollbackFor = Exception.class)
    public PluginManagementDTO enable(Long id) {
        PluginManagement plugin = pluginManagementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));

        pluginManagementDomainService.validateStatusChange(plugin.getPluginId(), PluginManagementStatus.ENABLED);
        plugin.enable();

        // 同步调用基础设施层启动插件
        long startedAt = System.currentTimeMillis();
        StageTracker stageTracker = new StageTracker();
        PluginProgressContext.setReporter(progress -> publishLifecycle(
                progress.getPluginId(),
                progress.getAction(),
                STATUS_PROCESSING,
                progress.getMessage(),
                progress.getStage(),
                progress.getProgress(),
                startedAt,
                System.currentTimeMillis() - startedAt,
                stageTracker.elapsed(progress.getStage())
        ));
        try {
            publishLifecycle(plugin.getPluginId(), ACTION_ENABLE, STATUS_PROCESSING, "插件启动中", "start", 0, startedAt, 0L, null);
            pluginManager.startPlugin(plugin.getPluginId());
        } catch (Exception e) {
            publishLifecycle(plugin.getPluginId(), ACTION_ENABLE, STATUS_FAILED, "插件启动失败: " + e.getMessage(), "failed", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.error("Failed to start plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件启动失败: " + e.getMessage());
        } finally {
            PluginProgressContext.clear();
        }

        pluginMenuSyncService.syncPluginMenus(plugin);
        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        publishLifecycle(plugin.getPluginId(), ACTION_ENABLE, STATUS_SUCCESS, "插件已启用", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
        log.info("Plugin enabled: pluginId={}", plugin.getPluginId());
        return convertToDTO(plugin);
    }

    /**
     * 禁用插件
     */
    @Transactional(rollbackFor = Exception.class)
    public PluginManagementDTO disable(Long id) {
        PluginManagement plugin = pluginManagementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("插件不存在"));

        pluginManagementDomainService.validateStatusChange(plugin.getPluginId(), PluginManagementStatus.DISABLED);
        plugin.disable();

        // 同步调用基础设施层停止插件
        long startedAt = System.currentTimeMillis();
        StageTracker stageTracker = new StageTracker();
        PluginProgressContext.setReporter(progress -> publishLifecycle(
                progress.getPluginId(),
                progress.getAction(),
                STATUS_PROCESSING,
                progress.getMessage(),
                progress.getStage(),
                progress.getProgress(),
                startedAt,
                System.currentTimeMillis() - startedAt,
                stageTracker.elapsed(progress.getStage())
        ));
        try {
            publishLifecycle(plugin.getPluginId(), ACTION_DISABLE, STATUS_PROCESSING, "插件停止中", "start", 0, startedAt, 0L, null);
            pluginManager.stopPlugin(plugin.getPluginId());
        } catch (Exception e) {
            publishLifecycle(plugin.getPluginId(), ACTION_DISABLE, STATUS_FAILED, "插件停止失败: " + e.getMessage(), "failed", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.error("Failed to stop plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件停止失败: " + e.getMessage());
        } finally {
            PluginProgressContext.clear();
        }

        pluginMenuSyncService.disablePluginMenus(plugin.getPluginId());
        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        publishLifecycle(plugin.getPluginId(), ACTION_DISABLE, STATUS_SUCCESS, "插件已禁用", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
        log.info("Plugin disabled: pluginId={}", plugin.getPluginId());
        return convertToDTO(plugin);
    }

    /**
     * 变更插件状态
     */
    @Transactional(rollbackFor = Exception.class)
    public PluginManagementDTO changeStatus(PluginStatusChangeCommand command) {
        if (command.getStatus() == 1) {
            return enable(command.getId());
        } else {
            return disable(command.getId());
        }
    }

    /**
     * 获取插件统计信息
     */
    public PluginStatisticsDTO getStatistics() {
        long[] stats = pluginManagementDomainService.getPluginStatistics();
        return PluginStatisticsDTO.builder()
                .total(stats[0])
                .enabledCount(stats[1])
                .disabledCount(stats[2])
                .build();
    }

    /**
     * 获取前端插件模块描述
     */
    public List<PluginFrontendModuleDTO> listFrontendModules() {
        List<PluginManagement> enabledPlugins = pluginManagementRepository.findByStatus(PluginManagementStatus.ENABLED.getCode());
        if (CollectionUtils.isEmpty(enabledPlugins)) {
            return Collections.emptyList();
        }

        List<PluginFrontendModuleDTO> modules = new ArrayList<>();
        for (PluginManagement plugin : enabledPlugins) {
            if (!pluginManager.isPluginStarted(plugin.getPluginId())) {
                log.debug("Skip plugin frontend modules (not started): {}", plugin.getPluginId());
                continue;
            }
            PluginFrontendDefinition definition = pluginFrontendDefinitionRepository
                    .loadByPluginId(plugin.getPluginId())
                    .orElse(null);
            if (definition == null || CollectionUtils.isEmpty(definition.getModules())) {
                continue;
            }
            for (PluginFrontendModuleDefinition moduleDefinition : definition.getModules()) {
                PluginFrontendModuleDTO moduleDTO = convertFrontendModule(plugin, moduleDefinition, definition);
                if (moduleDTO != null) {
                    modules.add(moduleDTO);
                }
            }
        }
        return modules;
    }

    /**
     * 将插件聚合根转换为DTO
     */
    private PluginManagementDTO convertToDTO(PluginManagement plugin) {
        if (plugin == null) {
            return null;
        }

        PluginManagementDTO dto = new PluginManagementDTO();
        dto.setId(plugin.getDbId());
        dto.setPluginId(plugin.getId());
        dto.setName(plugin.getName());
        dto.setStatus(plugin.getStatus().getCode());
        dto.setStatusDesc(plugin.getStatus().getDescription());

        if (plugin.getPluginInfo() != null) {
            dto.setDescription(plugin.getPluginInfo().getDescription());
            dto.setVersion(plugin.getPluginInfo().getVersion());
            dto.setAuthor(plugin.getPluginInfo().getAuthor());
            dto.setEmail(plugin.getPluginInfo().getEmail());
            dto.setWebsite(plugin.getPluginInfo().getWebsite());
            boolean pluginDevEnabled = isPluginDevModeAllowed() && Boolean.TRUE.equals(plugin.getPluginInfo().getIsDev());
            dto.setIsDev(pluginDevEnabled);
            dto.setFrontDevAddress(pluginDevEnabled ? plugin.getPluginInfo().getFrontDevAddress() : "");
            dto.setCreateTime(plugin.getPluginInfo().getCreateTime());
            dto.setUpdateTime(plugin.getPluginInfo().getUpdateTime());
            dto.setCreateUserId(plugin.getPluginInfo().getCreateUserId());
            dto.setUpdateUserId(plugin.getPluginInfo().getUpdateUserId());
        } else {
            dto.setCreateTime(plugin.getCreatedAt());
            dto.setUpdateTime(plugin.getUpdatedAt());
        }

        return dto;
    }

    private PluginFrontendModuleDTO convertFrontendModule(PluginManagement plugin,
                                                          PluginFrontendModuleDefinition moduleDefinition,
                                                          PluginFrontendDefinition definition) {
        if (plugin == null || moduleDefinition == null || CollectionUtils.isEmpty(moduleDefinition.getRoutes())) {
            return null;
        }

        List<PluginFrontendRouteDTO> routes = moduleDefinition.getRoutes().stream()
                .map(this::convertFrontendRoute)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        if (routes.isEmpty()) {
            return null;
        }

        PluginFrontendModuleDTO moduleDTO = new PluginFrontendModuleDTO();
        boolean pluginDevEnabled = isPluginDevModeAllowed()
                && plugin.getPluginInfo() != null
                && Boolean.TRUE.equals(plugin.getPluginInfo().getIsDev());
        moduleDTO.setRenderer(definition != null ? definition.getRenderer() : null);
        moduleDTO.setModuleName(moduleDefinition.getModuleName());
        moduleDTO.setPluginId(plugin.getPluginId());
        moduleDTO.setPluginName(plugin.getName());
        moduleDTO.setPluginVersion(plugin.getPluginInfo() != null ? plugin.getPluginInfo().getVersion() : null);
        moduleDTO.setPluginIsDev(pluginDevEnabled);
        moduleDTO.setFrontDevAddress(pluginDevEnabled && plugin.getPluginInfo() != null ? plugin.getPluginInfo().getFrontDevAddress() : "");
        moduleDTO.setRoutes(routes);
        moduleDTO.setMenus(resolveFrontendMenus(plugin.getPluginId(), definition, routes));
        moduleDTO.setI18n(definition != null ? definition.getI18n() : null);
        return moduleDTO;
    }

    private PluginFrontendRouteDTO convertFrontendRoute(PluginFrontendRouteDefinition routeDefinition) {
        if (routeDefinition == null
                || isBlank(routeDefinition.getName())
                || isBlank(routeDefinition.getPath())
                || isBlank(routeDefinition.getComponent())) {
            return null;
        }

        PluginFrontendRouteDTO routeDTO = new PluginFrontendRouteDTO();
        routeDTO.setName(routeDefinition.getName());
        routeDTO.setPath(routeDefinition.getPath());
        routeDTO.setComponent(routeDefinition.getComponent());
        routeDTO.setComponentName(routeDefinition.getComponentName());
        routeDTO.setMeta(convertRouteMeta(routeDefinition.getMeta(), routeDefinition.getName()));
        return routeDTO;
    }

    private PluginFrontendRouteMetaDTO convertRouteMeta(PluginFrontendRouteMeta meta, String fallbackTitle) {
        PluginFrontendRouteMetaDTO metaDTO = new PluginFrontendRouteMetaDTO();
        if (meta != null) {
            metaDTO.setTitle(isBlank(meta.getTitle()) ? fallbackTitle : meta.getTitle());
            metaDTO.setI18nKey(meta.getI18nKey());
            metaDTO.setIcon(meta.getIcon());
            metaDTO.setOrder(meta.getOrder());
            metaDTO.setHideInMenu(meta.getHideInMenu());
            metaDTO.setKeepAlive(meta.getKeepAlive());
            metaDTO.setConstant(meta.getConstant());
            metaDTO.setActiveMenu(meta.getActiveMenu());
            metaDTO.setLayout(meta.getLayout());
        } else {
            metaDTO.setTitle(fallbackTitle);
        }
        return metaDTO;
    }

    private List<PluginFrontendMenuDTO> filterMenusForRoutes(List<PluginFrontendMenuDefinition> menus,
                                                             List<PluginFrontendRouteDTO> routes) {
        if (CollectionUtils.isEmpty(menus) || CollectionUtils.isEmpty(routes)) {
            return Collections.emptyList();
        }
        List<String> routeNames = routes.stream().map(PluginFrontendRouteDTO::getName).collect(Collectors.toList());
        return menus.stream()
                .filter(menu -> routeNames.contains(menu.getRouteName()))
                .map(menu -> {
                    PluginFrontendMenuDTO dto = new PluginFrontendMenuDTO();
                    dto.setRouteName(menu.getRouteName());
                    dto.setParent(menu.getParent());
                    dto.setTitle(menu.getTitle());
                    dto.setI18nKey(menu.getI18nKey());
                    dto.setIcon(menu.getIcon());
                    dto.setIconType("1");
                    dto.setOrder(menu.getOrder());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private List<PluginFrontendMenuDTO> resolveFrontendMenus(String pluginId,
                                                             PluginFrontendDefinition definition,
                                                             List<PluginFrontendRouteDTO> routes) {
        List<PluginFrontendMenuDTO> menusFromSystem = loadMenusFromSystem(pluginId, routes);
        if (!menusFromSystem.isEmpty()) {
            return menusFromSystem;
        }
        return filterMenusForRoutes(definition != null ? definition.getMenus() : null, routes);
    }

    private List<PluginFrontendMenuDTO> loadMenusFromSystem(String pluginId, List<PluginFrontendRouteDTO> routes) {
        if (pluginId == null || pluginId.isBlank() || CollectionUtils.isEmpty(routes)) {
            return Collections.emptyList();
        }
        List<SystemMenu> pluginMenus = systemMenuRepository.findBySource("PLUGIN", pluginId);
        if (pluginMenus.isEmpty()) {
            return Collections.emptyList();
        }
        Set<String> routeNames = routes.stream()
                .map(PluginFrontendRouteDTO::getName)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        if (routeNames.isEmpty()) {
            return Collections.emptyList();
        }
        Map<Long, SystemMenu> menuById = systemMenuRepository.findAll().stream()
                .filter(menu -> menu.getId() != null)
                .collect(Collectors.toMap(SystemMenu::getId, menu -> menu, (a, b) -> a));
        return pluginMenus.stream()
                .filter(menu -> "1".equals(menu.getStatus()))
                .filter(menu -> routeNames.contains(menu.getRouteName()))
                .map(menu -> {
                    PluginFrontendMenuDTO dto = new PluginFrontendMenuDTO();
                    dto.setRouteName(menu.getRouteName());
                    dto.setTitle(menu.getName());
                    dto.setI18nKey(menu.getI18nKey());
                    dto.setIcon(menu.getIcon());
                    dto.setIconType(menu.getIconType());
                    dto.setOrder(menu.getSort());
                    String parentRouteName = Optional.ofNullable(menuById.get(menu.getParentId()))
                            .map(SystemMenu::getRouteName)
                            .orElse(null);
                    dto.setParent(parentRouteName);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private boolean isPluginDevModeAllowed() {
        return !environment.acceptsProfiles(Profiles.of("prod"));
    }

    private void publishLifecycle(String pluginId,
                                  String action,
                                  String status,
                                  String message,
                                  String stage,
                                  Integer progress,
                                  Long startedAt,
                                  Long elapsedMs,
                                  Long stageElapsedMs) {
        domainEventPublisher.publishImmediately(
                new PluginLifecycleEvent(pluginId, action, status, message, stage, progress, startedAt, elapsedMs, stageElapsedMs)
        );
    }

    // Keeps per-stage timestamps for progress reporting.
    private static final class StageTracker {
        private String currentStage;
        private long stageStartedAt;

        public Long elapsed(String stage) {
            if (stage == null) {
                return null;
            }
            long now = System.currentTimeMillis();
            if (!stage.equals(currentStage)) {
                currentStage = stage;
                stageStartedAt = now;
                return 0L;
            }
            return now - stageStartedAt;
        }
    }
}
