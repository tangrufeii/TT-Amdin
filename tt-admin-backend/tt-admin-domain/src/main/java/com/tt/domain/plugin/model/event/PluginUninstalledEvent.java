package com.tt.domain.plugin.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 插件卸载事件
 * <p>
 * 当插件从系统中卸载时触发此事件
 *
 * @author tt
 * @date 2025/12/24
 */
@Getter
public class PluginUninstalledEvent extends DomainEvent {

    /**
     * 插件名称
     */
    private final String pluginName;

    /**
     * 构造函数
     *
     * @param pluginId   插件ID（作为聚合根ID）
     * @param pluginName 插件名称
     */
    public PluginUninstalledEvent(String pluginId, String pluginName) {
        super(pluginId, "Plugin");
        this.pluginName = pluginName;
    }
}