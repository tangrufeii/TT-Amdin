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
import com.tt.domain.extension.model.aggregate.ExtensionRecord;
import com.tt.domain.extension.model.entity.ExtensionRecordInfo;
import com.tt.domain.extension.model.enums.ExtensionType;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.extension.model.manifest.ExtensionRouteMeta;
import com.tt.domain.extension.model.manifest.admin.AdminContributes;
import com.tt.domain.extension.model.manifest.admin.AdminMenuContribution;
import com.tt.domain.extension.model.manifest.admin.AdminRouteContribution;
import com.tt.domain.extension.repository.ExtensionManifestRepository;
import com.tt.domain.extension.repository.ExtensionRecordRepository;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicReference;
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
    private final ExtensionManifestRepository extensionManifestRepository;
    private final ExtensionRecordRepository extensionRecordRepository;
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
        pluginDomainService.syncExtensionRecordFromPlugin(plugin);

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

        if (Boolean.TRUE.equals(command.getIsDev()) && !isPluginDevModeAllowed()) {
            throw new DomainException(ResultCode.BAD_REQUEST.toString(), "生产环境不允许开启插件开发模式");
        }

        plugin.updateInfo(command.getName(), command.getDescription(), command.getVersion());
        plugin.updateAuthorInfo(command.getAuthor(), command.getEmail(), command.getWebsite());
        boolean devModeEnabled = isPluginDevModeAllowed() && Boolean.TRUE.equals(command.getIsDev());
        String frontDevAddress = devModeEnabled ? command.getFrontDevAddress() : "";
        plugin.updateDevConfig(devModeEnabled, frontDevAddress);

        pluginManagementRepository.save(plugin);
        pluginDomainService.syncExtensionRecordFromPlugin(plugin);

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
        pluginDomainService.deleteExtensionRecord(plugin.getPluginId());

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
        if (hasExtensionTypeFilter(command.getType(), command.getExcludeType())) {
            try {
                return pageByExtensionRecord(command);
            } catch (Exception ex) {
                log.warn("Fallback to legacy plugin page, extension record query failed: type={}, excludeType={}",
                        command.getType(), command.getExcludeType(), ex);
            }
        }
        return pageByPluginManagement(command);
    }

    private IPage<PluginManagementDTO> pageByPluginManagement(PluginPageQueryCommand command) {
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
        String pluginId = null;
        AtomicReference<String> progressPluginId = new AtomicReference<>();
        StageTracker stageTracker = new StageTracker();
        PluginProgressContext.setReporter(progress -> {
            if (!isBlank(progress.getPluginId())) {
                progressPluginId.set(progress.getPluginId());
            }
            publishLifecycle(
                    progress.getPluginId(),
                    progress.getAction(),
                    STATUS_PROCESSING,
                    progress.getMessage(),
                    progress.getStage(),
                    progress.getProgress(),
                    startedAt,
                    System.currentTimeMillis() - startedAt,
                    stageTracker.elapsed(progress.getStage())
            );
        });
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
            pluginId = pluginConfig != null && pluginConfig.getPlugin() != null ? pluginConfig.getPlugin().getId() : null;

            // 3. 保存插件信息到数据库
            pluginDomainService.savePluginInfo(pluginConfig);

            publishLifecycle(pluginId, ACTION_INSTALL, STATUS_SUCCESS, "插件安装成功", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            log.info("Plugin installed successfully: {}", pluginId);

        } catch (Exception e) {
            String rawMessage = Optional.ofNullable(e.getMessage()).orElse("未知错误");
            String message = normalizeInstallErrorMessage(rawMessage);
            if (pluginId == null) {
                pluginId = progressPluginId.get();
            }
            if (pluginId == null && rawMessage.contains("already installed")) {
                pluginId = resolvePluginIdFromFilename(command.getFile());
            }
            publishLifecycle(pluginId, ACTION_INSTALL, STATUS_FAILED, "插件安装失败: " + message, "failed", 100, startedAt, System.currentTimeMillis() - startedAt, null);
            if (isDuplicateInstall(rawMessage)) {
                log.warn("Plugin install skipped: {}", message);
            } else {
                log.error("Failed to install plugin", e);
            }
            throw new DomainException(ResultCode.BAD_REQUEST.toString(), "插件安装失败: " + message, e);
        } finally {
            PluginProgressContext.clear();
        }
    }

    /**
     * 查询所有插件列表
     */
    public List<PluginManagementDTO> listAll(String type, String excludeType) {
        if (hasExtensionTypeFilter(type, excludeType)) {
            try {
                return convertExtensionRecordsToPluginDTOs(filterExtensionRecords(extensionRecordRepository.findAll(), null, type, excludeType));
            } catch (Exception ex) {
                log.warn("Fallback to legacy plugin list, extension record query failed: type={}, excludeType={}",
                        type, excludeType, ex);
            }
        }
        return pluginManagementRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * 根据状态查询插件列表
     */
    public List<PluginManagementDTO> listByStatus(Integer status, String type, String excludeType) {
        if (hasExtensionTypeFilter(type, excludeType)) {
            try {
                return convertExtensionRecordsToPluginDTOs(filterExtensionRecords(extensionRecordRepository.findAll(), status, type, excludeType));
            } catch (Exception ex) {
                log.warn("Fallback to legacy plugin status list, extension record query failed: status={}, type={}, excludeType={}",
                        status, type, excludeType, ex);
            }
        }
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
        if (isThemePlugin(plugin.getPluginId())) {
            disableOtherEnabledThemes(plugin.getPluginId());
        }
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
        pluginDomainService.syncExtensionRecordFromPlugin(plugin);

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
        pluginDomainService.syncExtensionRecordFromPlugin(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

        publishLifecycle(plugin.getPluginId(), ACTION_DISABLE, STATUS_SUCCESS, "插件已禁用", "complete", 100, startedAt, System.currentTimeMillis() - startedAt, null);
        log.info("Plugin disabled: pluginId={}", plugin.getPluginId());
        return convertToDTO(plugin);
    }

    /**
     * 主题包必须单例运行。
     * <p>
     * 只要当前要启用的是主题，就先把其他已启用主题统一停掉，
     * 避免后台操作、门户切换、安装 autoEnable 这些入口把状态表搞成“双主题同时启用”。
     * </p>
     *
     * @param targetPluginId 目标主题 ID
     */
    private void disableOtherEnabledThemes(String targetPluginId) {
        List<PluginManagement> enabledPlugins = pluginManagementRepository.findByStatus(PluginManagementStatus.ENABLED.getCode());
        if (CollectionUtils.isEmpty(enabledPlugins)) {
            return;
        }

        for (PluginManagement enabledPlugin : enabledPlugins) {
            if (enabledPlugin == null || isBlank(enabledPlugin.getPluginId())) {
                continue;
            }
            if (Objects.equals(enabledPlugin.getPluginId(), targetPluginId) || !isThemePlugin(enabledPlugin.getPluginId())) {
                continue;
            }

            try {
                pluginManager.stopPlugin(enabledPlugin.getPluginId());
            } catch (Exception ex) {
                log.error("Failed to stop active theme before switching: {}", enabledPlugin.getPluginId(), ex);
                throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "旧主题停止失败: " + enabledPlugin.getPluginId());
            }

            pluginMenuSyncService.disablePluginMenus(enabledPlugin.getPluginId());
            enabledPlugin.disable();
            pluginManagementRepository.save(enabledPlugin);
            pluginDomainService.syncExtensionRecordFromPlugin(enabledPlugin);
            domainEventPublisher.publishAll(enabledPlugin.getUncommittedEvents());
            enabledPlugin.clearEvents();
            log.info("Theme auto-disabled due to singleton switch: pluginId={}", enabledPlugin.getPluginId());
        }
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
    public PluginStatisticsDTO getStatistics(String type, String excludeType) {
        if (hasExtensionTypeFilter(type, excludeType)) {
            try {
                List<ExtensionRecord> filtered = filterExtensionRecords(extensionRecordRepository.findAll(), null, type, excludeType);
                long total = filtered.size();
                long enabled = filtered.stream()
                        .filter(Objects::nonNull)
                        .filter(record -> record.getExtensionInfo() != null && Integer.valueOf(1).equals(record.getExtensionInfo().getStatus()))
                        .count();
                return PluginStatisticsDTO.builder()
                        .total(total)
                        .enabledCount(enabled)
                        .disabledCount(Math.max(0L, total - enabled))
                        .build();
            } catch (Exception ex) {
                log.warn("Fallback to legacy plugin statistics, extension record query failed: type={}, excludeType={}",
                        type, excludeType, ex);
            }
        }
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
            try {
                if (!pluginManager.isPluginStarted(plugin.getPluginId())) {
                    log.warn("Enabled plugin runtime is not started, trying to recover: {}", plugin.getPluginId());
                    try {
                        pluginManager.startPlugin(plugin.getPluginId());
                    } catch (Exception startEx) {
                        log.warn("Skip plugin frontend modules, runtime recover failed: {}", plugin.getPluginId(), startEx);
                        continue;
                    }
                }
                ExtensionManifest manifest = extensionManifestRepository
                        .loadInstalled(plugin.getPluginId())
                        .orElse(null);
                AdminContributes adminContributes = manifest != null && manifest.getContributes() != null
                        ? manifest.getContributes().getAdmin()
                        : null;
                if (adminContributes == null || CollectionUtils.isEmpty(adminContributes.getRoutes())) {
                    continue;
                }
                for (Map.Entry<String, List<AdminRouteContribution>> moduleEntry : groupRoutesByModule(adminContributes.getRoutes()).entrySet()) {
                    PluginFrontendModuleDTO moduleDTO = convertFrontendModule(
                            plugin,
                            moduleEntry.getKey(),
                            moduleEntry.getValue(),
                            adminContributes
                    );
                    if (moduleDTO != null) {
                        modules.add(moduleDTO);
                    }
                }
            } catch (Exception ex) {
                log.warn("Skip plugin frontend modules (load failed): {}", plugin.getPluginId(), ex);
            }
        }
        return modules;
    }

    /**
     * 将插件聚合根转换为DTO
     */
    private PluginManagementDTO convertToDTO(PluginManagement plugin) {
        ExtensionRecord extensionRecord = null;
        if (plugin != null && !isBlank(plugin.getPluginId())) {
            try {
                extensionRecord = extensionRecordRepository.findByExtensionId(plugin.getPluginId()).orElse(null);
            } catch (Exception ex) {
                log.warn("Skip extension record snapshot, query failed: pluginId={}", plugin.getPluginId(), ex);
            }
        }
        return convertToDTO(plugin, extensionRecord);
    }

    /**
     * 将插件聚合和扩展记录快照组合成统一管理 DTO。
     * <p>
     * V2 阶段主题/模块/挂件类型以 sys_extension 为准，
     * 这里统一补到管理端 DTO，避免前端再自己猜类型。
     * </p>
     */
    private PluginManagementDTO convertToDTO(PluginManagement plugin, ExtensionRecord extensionRecord) {
        if (plugin == null && extensionRecord == null) {
            return null;
        }

        PluginManagementDTO dto = new PluginManagementDTO();
        if (plugin != null) {
            dto.setId(plugin.getDbId());
            dto.setPluginId(plugin.getId());
            dto.setName(plugin.getName());
            dto.setStatus(plugin.getStatus().getCode());
            dto.setStatusDesc(plugin.getStatus().getDescription());
        } else {
            dto.setPluginId(extensionRecord.getExtensionId());
        }
        applyExtensionRecordInfo(dto, extensionRecord);

        if (plugin != null && plugin.getPluginInfo() != null) {
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
        } else if (plugin != null) {
            dto.setCreateTime(plugin.getCreatedAt());
            dto.setUpdateTime(plugin.getUpdatedAt());
        }

        return dto;
    }

    /**
     * 通过扩展记录做分页，解决“主题中心 / 插件中心”需要按类型分流的问题。
     */
    private IPage<PluginManagementDTO> pageByExtensionRecord(PluginPageQueryCommand command) {
        IPage<ExtensionRecord> page = extensionRecordRepository.findPage(
                command,
                command.getName(),
                command.getStatus(),
                command.getType(),
                command.getExcludeType()
        );
        Map<String, PluginManagement> pluginMap = loadPluginMap(page.getRecords());
        return page.convert(record -> convertToDTO(pluginMap.get(record.getExtensionId()), record));
    }

    private Map<String, PluginManagement> loadPluginMap(List<ExtensionRecord> extensionRecords) {
        Map<String, PluginManagement> pluginMap = new HashMap<>();
        if (CollectionUtils.isEmpty(extensionRecords)) {
            return pluginMap;
        }
        for (ExtensionRecord record : extensionRecords) {
            if (record == null || isBlank(record.getExtensionId())) {
                continue;
            }
            pluginManagementRepository.findByPluginId(record.getExtensionId())
                    .ifPresent(plugin -> pluginMap.put(record.getExtensionId(), plugin));
        }
        return pluginMap;
    }

    private List<PluginManagementDTO> convertExtensionRecordsToPluginDTOs(List<ExtensionRecord> extensionRecords) {
        if (CollectionUtils.isEmpty(extensionRecords)) {
            return Collections.emptyList();
        }
        Map<String, PluginManagement> pluginMap = loadPluginMap(extensionRecords);
        return extensionRecords.stream()
                .map(record -> convertToDTO(pluginMap.get(record.getExtensionId()), record))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private List<ExtensionRecord> filterExtensionRecords(List<ExtensionRecord> extensionRecords,
                                                         Integer status,
                                                         String type,
                                                         String excludeType) {
        if (CollectionUtils.isEmpty(extensionRecords)) {
            return Collections.emptyList();
        }
        return extensionRecords.stream()
                .filter(Objects::nonNull)
                .filter(record -> matchExtensionStatus(record, status))
                .filter(record -> matchExtensionType(record, type))
                .filter(record -> !isExcludedExtensionType(record, excludeType))
                .collect(Collectors.toList());
    }

    private boolean matchExtensionStatus(ExtensionRecord record, Integer status) {
        if (status == null) {
            return true;
        }
        return record != null
                && record.getExtensionInfo() != null
                && Objects.equals(record.getExtensionInfo().getStatus(), status);
    }

    private boolean matchExtensionType(ExtensionRecord record, String type) {
        if (isBlank(type)) {
            return true;
        }
        if (record == null || record.getExtensionInfo() == null || record.getExtensionInfo().getType() == null) {
            return false;
        }
        return Objects.equals(record.getExtensionInfo().getType().getCode(), type.trim());
    }

    private boolean hasExtensionTypeFilter(String type, String excludeType) {
        return !isBlank(type) || !isBlank(excludeType);
    }

    private boolean isExcludedExtensionType(ExtensionRecord record, String excludeType) {
        if (isBlank(excludeType)) {
            return false;
        }
        return matchExtensionType(record, excludeType);
    }

    private void applyExtensionRecordInfo(PluginManagementDTO dto, ExtensionRecord extensionRecord) {
        if (dto == null || extensionRecord == null || extensionRecord.getExtensionInfo() == null) {
            return;
        }
        ExtensionRecordInfo extensionInfo = extensionRecord.getExtensionInfo();
        ExtensionType extensionType = extensionInfo.getType();
        if (extensionType != null) {
            dto.setType(extensionType.getCode());
            dto.setTypeDesc(extensionType.getDescription());
        }
        if (dto.getName() == null || dto.getName().isBlank()) {
            dto.setName(extensionInfo.getName());
        }
        if (dto.getStatus() == null) {
            dto.setStatus(extensionInfo.getStatus());
            dto.setStatusDesc(Integer.valueOf(1).equals(extensionInfo.getStatus()) ? "启用" : "禁用");
        }
        if (!isBlank(extensionInfo.getDescription())) {
            dto.setDescription(extensionInfo.getDescription());
        }
        if (!isBlank(extensionInfo.getVersion())) {
            dto.setVersion(extensionInfo.getVersion());
        }
        dto.setAuthor(extensionInfo.getAuthor());
        dto.setEmail(extensionInfo.getEmail());
        dto.setWebsite(extensionInfo.getWebsite());
        dto.setIsDev(Boolean.TRUE.equals(extensionInfo.getIsDev()));
        dto.setFrontDevAddress(Boolean.TRUE.equals(extensionInfo.getIsDev()) ? extensionInfo.getFrontDevAddress() : "");
        dto.setCreateTime(extensionInfo.getCreateTime());
        dto.setUpdateTime(extensionInfo.getUpdateTime());
        dto.setCreateUserId(extensionInfo.getCreateUserId());
        dto.setUpdateUserId(extensionInfo.getUpdateUserId());
    }

    /**
     * 按 module 字段对后台路由分组，兼容旧插件“模块”概念。
     *
     * @param routes 后台路由贡献
     * @return module -> routes
     */
    private Map<String, List<AdminRouteContribution>> groupRoutesByModule(List<AdminRouteContribution> routes) {
        if (CollectionUtils.isEmpty(routes)) {
            return Collections.emptyMap();
        }
        Map<String, List<AdminRouteContribution>> groupedRoutes = new LinkedHashMap<>();
        for (AdminRouteContribution route : routes) {
            if (route == null || isBlank(route.getName())) {
                continue;
            }
            String moduleName = isBlank(route.getModule()) ? "index" : route.getModule().trim();
            groupedRoutes.computeIfAbsent(moduleName, key -> new ArrayList<>()).add(route);
        }
        return groupedRoutes;
    }

    private PluginFrontendModuleDTO convertFrontendModule(PluginManagement plugin,
                                                          String moduleName,
                                                          List<AdminRouteContribution> routeDefinitions,
                                                          AdminContributes adminContributes) {
        if (plugin == null || isBlank(moduleName) || CollectionUtils.isEmpty(routeDefinitions)) {
            return null;
        }

        List<PluginFrontendRouteDTO> routes = routeDefinitions.stream()
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
        moduleDTO.setRenderer(adminContributes != null ? adminContributes.getRenderer() : null);
        moduleDTO.setModuleName(moduleName);
        moduleDTO.setPluginId(plugin.getPluginId());
        moduleDTO.setPluginName(plugin.getName());
        moduleDTO.setPluginVersion(plugin.getPluginInfo() != null ? plugin.getPluginInfo().getVersion() : null);
        moduleDTO.setPluginIsDev(pluginDevEnabled);
        moduleDTO.setFrontDevAddress(pluginDevEnabled && plugin.getPluginInfo() != null ? plugin.getPluginInfo().getFrontDevAddress() : "");
        moduleDTO.setRoutes(routes);
        moduleDTO.setMenus(resolveFrontendMenus(plugin.getPluginId(), adminContributes, routes));
        moduleDTO.setI18n(adminContributes != null ? adminContributes.getI18n() : null);
        return moduleDTO;
    }

    private PluginFrontendRouteDTO convertFrontendRoute(AdminRouteContribution routeDefinition) {
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

    private PluginFrontendRouteMetaDTO convertRouteMeta(ExtensionRouteMeta meta, String fallbackTitle) {
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

    private List<PluginFrontendMenuDTO> filterMenusForRoutes(List<AdminMenuContribution> menus,
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
                                                             AdminContributes adminContributes,
                                                             List<PluginFrontendRouteDTO> routes) {
        List<PluginFrontendMenuDTO> menusFromSystem = loadMenusFromSystem(pluginId, routes);
        if (!menusFromSystem.isEmpty()) {
            return menusFromSystem;
        }
        return filterMenusForRoutes(adminContributes != null ? adminContributes.getMenus() : null, routes);
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

    private boolean isThemePlugin(String pluginId) {
        if (isBlank(pluginId)) {
            return false;
        }
        return extensionManifestRepository.loadInstalled(pluginId)
                .map(ExtensionManifest::isThemeExtension)
                .orElse(false);
    }

    private String resolvePluginIdFromFilename(MultipartFile file) {
        if (file == null || file.getOriginalFilename() == null) {
            return null;
        }
        String filename = file.getOriginalFilename().trim();
        if (filename.isEmpty()) {
            return null;
        }
        int dotIndex = filename.lastIndexOf('.');
        return dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
    }

    private boolean isDuplicateInstall(String message) {
        return message != null
                && (message.contains("This version is already installed")
                || message.contains("A higher version is already installed"));
    }

    private String normalizeInstallErrorMessage(String message) {
        if (message == null || message.isBlank()) {
            return "未知错误";
        }
        if (message.contains("This version is already installed")) {
            return "该插件版本已安装，无需重复安装";
        }
        if (message.contains("A higher version is already installed")) {
            return "当前已安装更高版本，请提升插件包版本号后再安装";
        }
        if (message.contains("requires TT-Admin version")) {
            return message.replace("Plugin installation failed: ", "");
        }
        if (message.contains("Cannot write uploaded file to disk")) {
            return "上传文件写入临时目录失败，请检查 resources/temp 目录是否存在且可写";
        }
        return message.replace("Plugin installation failed: ", "");
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
