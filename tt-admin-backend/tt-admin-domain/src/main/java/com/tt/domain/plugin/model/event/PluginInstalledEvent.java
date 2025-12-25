package com.tt.domain.plugin.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 插件安装事件
 * <p>
 * 当插件被安装到系统时触发此事件
 *
 * @author tt
 * @date 2025/12/24
 */
@Getter
public class PluginInstalledEvent extends DomainEvent {

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
    public PluginInstalledEvent(String pluginId, String pluginName) {
        super(pluginId, "Plugin");
        this.pluginName = pluginName;
    }
}
