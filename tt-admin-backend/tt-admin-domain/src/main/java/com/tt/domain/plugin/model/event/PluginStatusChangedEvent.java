package com.tt.domain.plugin.model.event;

import com.tt.common.domain.DomainEvent;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import lombok.Getter;

/**
 * 插件状态变更事件
 * <p>
 * 当插件的启用/禁用���态发生变化时触发此事件
 *
 * @author tt
 * @date 2025/12/24
 */
@Getter
public class PluginStatusChangedEvent extends DomainEvent {

    /**
     * 插件名称
     */
    private final String pluginName;

    /**
     * 新的状态
     */
    private final PluginManagementStatus newStatus;

    /**
     * 构造函数
     *
     * @param pluginId   插件ID（作为聚合根ID）
     * @param pluginName 插件名称
     * @param newStatus  新的状态
     */
    public PluginStatusChangedEvent(String pluginId, String pluginName, PluginManagementStatus newStatus) {
        super(pluginId, "Plugin");
        this.pluginName = pluginName;
        this.newStatus = newStatus;
    }

    /**
     * 判断是否为启用操作
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnableOperation() {
        return newStatus.isEnabled();
    }
}
