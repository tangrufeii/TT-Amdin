package com.tt.domain.plugin.service;

import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainException;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 插件领域服务
 * <p>
 * 负责插件相关的业务逻辑处理。
 * </p>
 *
 * @author tt
 * @date 2025/12/25
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PluginDomainService {

    private final PluginManagementRepository pluginManagementRepository;

    /**
     * 保存插件信息到数据库
     *
     * @param pluginConfig 插件配置
     */
    @Transactional(rollbackFor = Exception.class)
    public void savePluginInfo(PluginConfig pluginConfig) {
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "Plugin config is null");
        }

        // 删除旧记录（如果是更新）
        pluginManagementRepository.deleteByPluginId(pluginConfig.getPlugin().getId());

        // 创建新记录
        PluginManagement pluginManagement = PluginManagement.create(
                pluginConfig.getPlugin().getId(),
                pluginConfig.getPlugin().getName(),
                pluginConfig.getPlugin().getDescription(),
                pluginConfig.getPlugin().getVersion(),
                pluginConfig.getAuthor().getName(),
                pluginConfig.getAuthor().getEmail(),
                pluginConfig.getAuthor().getWebSite()
        );

        pluginManagementRepository.save(pluginManagement);
        log.info("Plugin info saved: pluginId={}", pluginConfig.getPlugin().getId());
    }

    /**
     * 从数据库删除插件信息
     *
     * @param pluginId 插件ID
     */
    @Transactional(rollbackFor = Exception.class)
    public void deletePluginInfo(String pluginId) {
        pluginManagementRepository.deleteByPluginId(pluginId);
        log.info("Plugin info deleted: pluginId={}", pluginId);
    }
}