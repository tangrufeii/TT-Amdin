package com.tt.domain.plugin.repository;

import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;

import java.util.Optional;

/**
 * 插件前端定义读取仓储
 */
public interface PluginFrontendDefinitionRepository {

    /**
     * 根据插件ID读取前端配置
     *
     * @param pluginId 插件ID
     * @return 前端定义，可为空
     */
    Optional<PluginFrontendDefinition> loadByPluginId(String pluginId);
}
