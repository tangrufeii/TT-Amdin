package com.tt.application.plugin.service;

import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.plugin.command.*;
import com.tt.application.plugin.dto.PluginManagementDTO;
import com.tt.application.plugin.dto.PluginStatisticsDTO;
import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainEventPublisher;
import com.tt.common.domain.DomainException;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.domain.plugin.service.PluginDomainService;
import com.tt.domain.plugin.service.PluginManagementDomainService;
import com.tt.domain.plugin.PluginManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
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

    private final PluginManagementRepository pluginManagementRepository;
    private final PluginManagementDomainService pluginManagementDomainService;
    private final DomainEventPublisher domainEventPublisher;
    private final PluginDomainService pluginDomainService;
    private final PluginManager pluginManager;

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
        plugin.updateDevConfig(command.getIsDev(), command.getFrontDevAddress());

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

        try {
            // 同步调用基础设施层卸载插件
            pluginManager.uninstallPlugin(plugin.getPluginId());
        } catch (Exception e) {
            log.error("Failed to uninstall plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件卸载失败: " + e.getMessage());
        }

        plugin.uninstall();
        pluginManagementRepository.deleteById(id);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

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
        try {
            // 1. 保存上传文件到临时目录
            File tempDir = new File(PluginDirectory.TEMP_DIRECTORY.getPath());
            if (!tempDir.exists()) {
                FileUtil.mkdir(tempDir.getAbsolutePath());
            }
            File pluginFile = new File(tempDir.getAbsolutePath() + File.separator + command.getFile().getOriginalFilename());
            command.getFile().transferTo(pluginFile);

            // 2. 同步调用基础设施层安装插件
            PluginConfig pluginConfig = pluginManager.installPlugin(pluginFile);

            // 3. 保存插件信息到数据库
            pluginDomainService.savePluginInfo(pluginConfig);

            log.info("Plugin installed successfully: {}", pluginConfig.getPlugin().getId());

        } catch (Exception e) {
            log.error("Failed to install plugin", e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件安装失败: " + e.getMessage());
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
        try {
            pluginManager.startPlugin(plugin.getPluginId());
        } catch (Exception e) {
            log.error("Failed to start plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件启动失败: " + e.getMessage());
        }

        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

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
        try {
            pluginManager.stopPlugin(plugin.getPluginId());
        } catch (Exception e) {
            log.error("Failed to stop plugin: {}", plugin.getPluginId(), e);
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件停止失败: " + e.getMessage());
        }

        pluginManagementRepository.save(plugin);

        domainEventPublisher.publishAll(plugin.getUncommittedEvents());
        plugin.clearEvents();

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
            dto.setIsDev(plugin.getPluginInfo().getIsDev());
            dto.setFrontDevAddress(plugin.getPluginInfo().getFrontDevAddress());
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
}