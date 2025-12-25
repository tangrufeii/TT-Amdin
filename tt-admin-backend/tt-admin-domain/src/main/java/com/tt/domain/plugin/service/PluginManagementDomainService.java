package com.tt.domain.plugin.service;

import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainEventPublisher;
import com.tt.common.domain.DomainException;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.domain.shared.service.DomainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 插件管理领域服务
 * <p>
 * 负责插件管理的核心业务逻辑，包括：
 * 1. 插件安装前的验证（检查插件ID和名称是否重复）
 * 2. 插件卸载前的验证（检查插件是否存在）
 * 3. 插件状态变更的业务规则验证
 * <p>
 * 领域服务的特点：
 * - 处理跨聚合根的业务逻辑
 * - 处理无状态的业务操作
 * - 协调多个聚合根完成业务功能
 *
 * @author tt
 * @date 2025/12/24
 */
@Slf4j
@Service
public class PluginManagementDomainService extends DomainService {

    private final PluginManagementRepository pluginManagementRepository;

    public PluginManagementDomainService(DomainEventPublisher domainEventPublisher, PluginManagementRepository pluginManagementRepository) {
        super(domainEventPublisher);
        this.pluginManagementRepository = pluginManagementRepository;
    }

    /**
     * 验证插件ID是否可用
     * <p>
     * 在安装新插件时调用，确保插件ID唯一性
     *
     * @param pluginId 插件ID
     * @throws DomainException 如果插件ID已存在
     */
    public void validatePluginIdAvailable(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件ID不能为空");
        }

        if (pluginManagementRepository.existsByPluginId(pluginId)) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件ID [" + pluginId + "] 已存在，请检查是否已安装");
        }
    }

    /**
     * 验证插件名称是否可用
     * <p>
     * 在安装新插件时调用，确保插件名称唯一性
     *
     * @param name 插件名称
     * @throws DomainException 如果插件名称已存在
     */
    public void validatePluginNameAvailable(String name) {
        if (name == null || name.isBlank()) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件名称不能为空");
        }

        if (pluginManagementRepository.existsByName(name)) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件名称 [" + name + "] 已存在，请使用其他名称");
        }
    }

    /**
     * 验证插件是否存在
     *
     * @param pluginId 插件ID
     * @throws DomainException 如果插件不存在
     */
    public void validatePluginExists(String pluginId) {
        if (!pluginManagementRepository.existsByPluginId(pluginId)) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 不存在");
        }
    }

    /**
     * 验证插件是否启用
     *
     * @param pluginId 插件ID
     * @throws DomainException 如果插件未启用
     */
    public void validatePluginEnabled(String pluginId) {
        PluginManagement plugin = pluginManagementRepository.findByPluginId(pluginId)
                .orElseThrow(() -> new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 不存在"));

        if (!plugin.isEnabled()) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 未启用，无法执行此操作");
        }
    }

    /**
     * 验证插件是否禁用
     *
     * @param pluginId 插件ID
     * @throws DomainException 如果插件未禁用
     */
    public void validatePluginDisabled(String pluginId) {
        PluginManagement plugin = pluginManagementRepository.findByPluginId(pluginId)
                .orElseThrow(() -> new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 不存在"));

        if (plugin.isEnabled()) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 已启用，请先禁用后再执行此操作");
        }
    }

    /**
     * 检查插件是否可以被卸载
     * <p>
     * 业务规则：
     * 1. 插件必须存在
     * 2. 插件应该处于禁用状态（避免卸载正在运行的插件）
     *
     * @param pluginId 插件ID
     * @throws DomainException 如果插件不满足卸载条件
     */
    public void validatePluginCanBeUninstalled(String pluginId) {
        PluginManagement plugin = pluginManagementRepository.findByPluginId(pluginId)
                .orElseThrow(() -> new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 不存在"));

        if (plugin.isEnabled()) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + plugin.getName() + "] 正在运行中，请先禁用后再卸载");
        }
    }

    /**
     * 检查插件状态是否可以变更
     * <p>
     * 业务规则：
     * 1. 插件必须存在
     * 2. 目标状态不能与当前状态相同
     *
     * @param pluginId  插件ID
     * @param newStatus 目标状态
     * @throws DomainException 如果状态不满足变更条件
     */
    public void validateStatusChange(String pluginId, PluginManagementStatus newStatus) {
        PluginManagement plugin = pluginManagementRepository.findByPluginId(pluginId)
                .orElseThrow(() -> new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + pluginId + "] 不存在"));

        PluginManagementStatus currentStatus = plugin.getStatus();
        if (currentStatus.equals(newStatus)) {
            String action = newStatus.isEnabled() ? "启用" : "禁用";
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"插件 [" + plugin.getName() + "] 已经是" + action + "状态");
        }
    }

    /**
     * 获取插件统计信息
     *
     * @return 统计信息数组 [总数, 启用数, 禁用数]
     */
    public long[] getPluginStatistics() {
        long total = pluginManagementRepository.count();
        long enabled = pluginManagementRepository.countByStatus(1);
        long disabled = pluginManagementRepository.countByStatus(0);
        return new long[]{total, enabled, disabled};
    }

    @Override
    protected String getDomainName() {
        return "";
    }
}