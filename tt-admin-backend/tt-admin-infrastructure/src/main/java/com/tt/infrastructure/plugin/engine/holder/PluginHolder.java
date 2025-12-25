package com.tt.infrastructure.plugin.engine.holder;

import com.tt.domain.plugin.model.aggregate.Plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 插件运行时状态持有者
 * <p>
 * 负责维护插件运行时的状态信息，提供插件的注册、查询、移除等功能。
 * 使用线程安全的ConcurrentHashMap存储插件信息。
 * </p>
 *
 * @author trf
 * @date 2025/12/24
 */
public class PluginHolder {

    /**
     * 插件信息存储映射表
     * <p>
     * Key: 插件ID
     * Value: 插件运行时对象
     * </p>
     */
    private static final Map<String, Plugin> PLUGIN_REGISTRY = new ConcurrentHashMap<>();

    /**
     * 私有构造方法，防止实例化
     */
    private PluginHolder() {
    }

    /**
     * 添加插件信息到注册表
     *
     * @param pluginId 插件ID
     * @param plugin   插件运行时对象
     */
    public static void addPluginInfo(String pluginId, Plugin plugin) {
        PLUGIN_REGISTRY.put(pluginId, plugin);
    }

    /**
     * 根据插件ID移除插件信息
     *
     * @param pluginId 插件ID
     */
    public static void removePluginInfo(String pluginId) {
        PLUGIN_REGISTRY.remove(pluginId);
    }

    /**
     * 根据插件ID获取插件信息
     *
     * @param pluginId 插件ID
     * @return 插件运行时对象，不存在时返回null
     */
    public static Plugin getPluginInfo(String pluginId) {
        return PLUGIN_REGISTRY.get(pluginId);
    }

    /**
     * 获取所有已加载的插件信息
     *
     * @return 插件列表
     */
    public static List<Plugin> getAllPluginInfo() {
        return new ArrayList<>(PLUGIN_REGISTRY.values());
    }

    /**
     * 检查插件是否已加载
     *
     * @param pluginId 插件ID
     * @return 已加载返回true，否则返回false
     */
    public static boolean containsPlugin(String pluginId) {
        return PLUGIN_REGISTRY.containsKey(pluginId);
    }

    /**
     * 获取已加载插件的数量
     *
     * @return 插件数量
     */
    public static int getPluginCount() {
        return PLUGIN_REGISTRY.size();
    }

    /**
     * 清空所有插件信息
     * <p>
     * 主要用于测试场景
     * </p>
     */
    public static void clear() {
        PLUGIN_REGISTRY.clear();
    }

    /**
     * 根据插件ID获取插件信息的Optional包装
     *
     * @param pluginId 插件ID
     * @return 插件运行时对象的Optional包装
     */
    public static Optional<Plugin> getPluginInfoByID(String pluginId) {
        return Optional.ofNullable(PLUGIN_REGISTRY.get(pluginId));
    }
}