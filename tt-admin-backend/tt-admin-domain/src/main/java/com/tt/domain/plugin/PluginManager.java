package com.tt.domain.plugin;

import com.tt.domain.plugin.model.aggregate.PluginConfig;

import java.io.File;

/**
 * 插件管理器接口
 * <p>
 * 定义插件系统对外提供的高级管理功能，包括插件的安装、卸载、启动、停止等操作。
 * 由基础设施层实现具体逻辑，应用层通过此接口调用。
 * </p>
 *
 * @author tt
 * @date 2025/12/25
 */
public interface PluginManager {

    /**
     * 安装插件
     *
     * @param pluginFile 插件文件(ZIP格式)
     * @return 插件配置对象
     * @throws Exception 安装过程中发生错误时抛出
     */
    PluginConfig installPlugin(File pluginFile) throws Exception;

    /**
     * 启动插件
     *
     * @param pluginId 插件ID
     */
    void startPlugin(String pluginId);

    /**
     * 停止插件
     *
     * @param pluginId 插件ID
     */
    void stopPlugin(String pluginId);

    /**
     * 卸载插件
     *
     * @param pluginId 插件ID
     * @throws Exception 卸载过程中发生错误时抛出
     */
    void uninstallPlugin(String pluginId) throws Exception;

    /**
     * 判断插件是否已完成启动并可用
     *
     * @param pluginId 插件ID
     * @return true=已启动
     */
    boolean isPluginStarted(String pluginId);
}
