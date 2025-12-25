package com.tt.infrastructure.plugin.engine.context;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 插件Spring上下文持有者
 * <p>
 * 负责管理每个插件的独立Spring ApplicationContext。
 * 每个插件拥有自己的应用上下文，实现Bean的隔离管理。
 * </p>
 *
 * @author trf
 * @date 2025/12/25
 */
public class PluginApplicationContextHolder {

    /**
     * 插件应用上下文映射表
     * <p>
     * Key: 插件ID
     * Value: 插件的AnnotationConfigApplicationContext
     * </p>
     */
    private static final Map<String, AnnotationConfigApplicationContext> CONTEXT_REGISTRY = new ConcurrentHashMap<>();

    /**
     * 私有构造方法，防止实例化
     */
    private PluginApplicationContextHolder() {
    }

    /**
     * 添加插件应用上下文
     *
     * @param pluginId          插件ID
     * @param applicationContext 插件的AnnotationConfigApplicationContext
     */
    public static void addPluginApplicationContext(String pluginId, AnnotationConfigApplicationContext applicationContext) {
        CONTEXT_REGISTRY.put(pluginId, applicationContext);
    }

    /**
     * 根据插件ID移除应用上下文
     * <p>
     * 移除前会先停止并关闭上下文，释放资源
     * </p>
     *
     * @param pluginId 插件ID
     */
    public static void removePluginApplicationContext(String pluginId) {
        AnnotationConfigApplicationContext context = CONTEXT_REGISTRY.get(pluginId);
        if (context != null) {
            context.stop();
            context.close();
        }
        CONTEXT_REGISTRY.remove(pluginId);
    }

    /**
     * 根据插件ID获取应用上下文
     *
     * @param pluginId 插件ID
     * @return AnnotationConfigApplicationContext，不存在时返回null
     */
    public static AnnotationConfigApplicationContext getApplicationContext(String pluginId) {
        return CONTEXT_REGISTRY.get(pluginId);
    }

    /**
     * 获取插件内的Bean
     *
     * @param pluginId 插件ID
     * @param clazz    Bean的类型
     * @param <T>      Bean类型泛型
     * @return Bean实例，获取失败时返回null
     */
    public static <T> T getPluginBean(String pluginId, Class<T> clazz) {
        AnnotationConfigApplicationContext context = CONTEXT_REGISTRY.get(pluginId);
        if (context == null) {
            return null;
        }
        try {
            return context.getBean(clazz);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 获取所有插件的应用上下文
     *
     * @return 应用上下文列表
     */
    public static List<AnnotationConfigApplicationContext> getAllPluginApplicationContext() {
        return new ArrayList<>(CONTEXT_REGISTRY.values());
    }

    /**
     * 检查插件上下文是否存在
     *
     * @param pluginId 插件ID
     * @return 存在返回true，否则返回false
     */
    public static boolean containsContext(String pluginId) {
        return CONTEXT_REGISTRY.containsKey(pluginId);
    }

    /**
     * 清空所有插件上下文
     * <p>
     * 主要用于测试场景，会先关闭所有上下文
     * </p>
     */
    public static void clear() {
        CONTEXT_REGISTRY.values().forEach(context -> {
            context.stop();
            context.close();
        });
        CONTEXT_REGISTRY.clear();
    }
}