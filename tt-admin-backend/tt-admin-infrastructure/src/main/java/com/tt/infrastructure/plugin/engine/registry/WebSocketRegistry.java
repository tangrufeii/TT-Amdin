package com.tt.infrastructure.plugin.engine.registry;

import com.tt.common.utils.ClassUtils;
import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadata;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadataCache;
import jakarta.servlet.ServletContext;
import jakarta.websocket.EndpointConfig;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerContainer;
import jakarta.websocket.server.ServerEndpoint;
import jakarta.websocket.server.ServerEndpointConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import java.util.Map;

/**
 * Registers plugin WebSocket endpoints into the server container.
 */
@Service
@Order(4)
@Slf4j
public class WebSocketRegistry implements BasePluginRegistryHandler {

    private ApplicationContext applicationContext;

    public WebSocketRegistry(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
        // 无需初始化操作
    }

    @Override
    public void registry(Plugin plugin) throws Exception {
        ServerContainer serverContainer = getServerContainer();
        if (serverContainer == null) {
            log.debug("WebSocket container not available, skipping WebSocket registration");
            return;
        }

        for (Class<?> clazz : resolveWebSocketClasses(plugin)) {
            ServerEndpoint serverEndpoint = clazz.getAnnotation(ServerEndpoint.class);
            if (serverEndpoint == null) {
                continue;
            }

            String path = serverEndpoint.value();
            if (StringUtils.isBlank(path)) {
                continue;
            }

            try {
                serverContainer.addEndpoint(clazz);
                log.info("Registered WebSocket endpoint: {} -> {}", path, clazz.getName());
            } catch (Exception e) {
                log.error("Failed to register WebSocket endpoint: {}", clazz.getName(), e);
            }
        }
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        ServerContainer serverContainer = getServerContainer();
        if (serverContainer == null) {
            return;
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> configExactMatchMap =
                (Map<String, Object>) ClassUtils.getReflectionField(serverContainer, "configExactMatchMap");
        @SuppressWarnings("unchecked")
        Map<String, Object> endpointSessionMap =
                (Map<String, Object>) ClassUtils.getReflectionField(serverContainer, "endpointSessionMap");
        @SuppressWarnings("unchecked")
        Map<Session, Session> sessions =
                (Map<Session, Session>) ClassUtils.getReflectionField(serverContainer, "sessions");

        for (Class<?> clazz : resolveWebSocketClasses(plugin)) {
            ServerEndpoint serverEndpoint = clazz.getAnnotation(ServerEndpoint.class);
            if (serverEndpoint == null) {
                continue;
            }

            String path = serverEndpoint.value();

            // 移除配置
            if (configExactMatchMap != null) {
                configExactMatchMap.remove(path);
            }

            // 移除会话映射
            if (endpointSessionMap != null) {
                endpointSessionMap.remove(path);
            }

            // 关闭所有会话
            if (sessions != null) {
                sessions.entrySet().removeIf(entry -> {
                    try {
                        return closeSessionIfNeeded(entry.getKey(), path);
                    } catch (Exception e) {
                        log.error("Failed to close WebSocket session: {}", entry.getKey().getId(), e);
                        return false;
                    }
                });
            }

            log.debug("Unregistered WebSocket endpoint: {}", path);
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // 已通过构造函数注入
    }

    /**
     * 关闭指定路径的WebSocket会话
     *
     * @param session WebSocket会话
     * @param path    WebSocket路径
     * @return 关闭成功返回true
     */
    private boolean closeSessionIfNeeded(Session session, String path) throws Exception {
        EndpointConfig endpointConfig = ClassUtils.getReflectionField(session, "endpointConfig");
        if (endpointConfig == null) {
            return false;
        }

        ServerEndpointConfig perEndpointConfig = ClassUtils.getReflectionField(endpointConfig, "perEndpointConfig");
        if (perEndpointConfig == null) {
            return false;
        }

        String sessionPath = ClassUtils.getReflectionField(perEndpointConfig, "path");
        if (path.equals(sessionPath)) {
            session.close();
            log.debug("Closed WebSocket session: {} for path: {}", session.getId(), path);
            return true;
        }

        return false;
    }

    /**
     * 获取WebSocket容器
     *
     * @return ServerContainer，不可用时返回null
     */
    private ServerContainer getServerContainer() {
        try {
            applicationContext.getBean(ServerEndpointExporter.class);
        } catch (BeansException e) {
            log.debug("ServerEndpointExporter not found, WebSocket support may be disabled");
            return null;
        }

        ServletContext servletContext = applicationContext.getBean(ServletContext.class);
        return (ServerContainer) servletContext.getAttribute(ServerContainer.class.getName());
    }

    private Iterable<Class<?>> resolveWebSocketClasses(Plugin plugin) {
        PluginClassMetadata metadata = PluginClassMetadataCache.get(plugin.getPluginId());
        if (metadata != null && !metadata.getWebSocketClassNames().isEmpty()) {
            return loadClasses(plugin, metadata.getWebSocketClassNames());
        }
        if (plugin.getClassList() != null && !plugin.getClassList().isEmpty()) {
            return plugin.getClassList();
        }
        if (plugin.getClassNameList() != null && !plugin.getClassNameList().isEmpty()) {
            return loadClasses(plugin, plugin.getClassNameList());
        }
        return java.util.List.of();
    }

    private Iterable<Class<?>> loadClasses(Plugin plugin, java.util.Collection<String> classNames) {
        java.util.List<Class<?>> classes = new java.util.ArrayList<>();
        ClassLoader classLoader = plugin.getPluginClassLoader();
        for (String className : classNames) {
            try {
                classes.add(classLoader.loadClass(className));
            } catch (ClassNotFoundException e) {
                log.debug("Failed to load plugin class: {}", className, e);
            }
        }
        return classes;
    }
}
