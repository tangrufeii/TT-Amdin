package com.tt.domain.plugin;


import com.tt.domain.plugin.model.aggregate.Plugin;
import org.springframework.context.ApplicationContextAware;


/**
 * 基本插件注册处理程序
 *
 * @author trf
 * @date 2025/12/23 10:57
 */
public interface BasePluginRegistryHandler  extends ApplicationContextAware {

    /**
     * 初始化
     * @author perfree
     * @date 2023-09-27 16:09:56
     */
    void initialize() throws Exception;

    /**
     * 注册
     * @author perfree
     * @date 2023-09-27 16:09:56
     * @param pluginInfo pluginInfo
     */
    void registry(Plugin pluginInfo) throws Exception;

    /**
     * 取消注册
     * @author perfree
     * @date 2023-09-27 16:09:56
     * @param pluginInfo pluginInfo
     */
    void unRegistry(Plugin pluginInfo) throws Exception;
}
