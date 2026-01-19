package com.tt.plugin.monitor.websocket;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * 系统监控 WebSocket 端点
 * 用于向客户端推送实时监控数据
 */
@Slf4j
@Component
@ServerEndpoint("/ws/plugin/monitor")
public class MonitorWebSocket {

    private static final Set<Session> SESSIONS = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        SESSIONS.add(session);
        log.debug("Monitor WebSocket connected: {}", session.getId());
    }

    @OnClose
    public void onClose(Session session) {
        SESSIONS.remove(session);
        log.debug("Monitor WebSocket disconnected: {}", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.warn("Monitor WebSocket error: {}", session != null ? session.getId() : "unknown", throwable);
        if (session != null) {
            SESSIONS.remove(session);
        }
    }

    /**
     * 广播消息到所有连接的客户端
     */
    public static void broadcast(String message) {
        for (Session session : SESSIONS) {
            if (!session.isOpen()) {
                SESSIONS.remove(session);
                continue;
            }
            sendTo(session, message);
        }
    }

    /**
     * 发送消息到指定会话
     */
    public static void sendTo(Session session, String message) {
        if (session == null || !session.isOpen()) {
            return;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.warn("Failed to send monitor message to session {}: {}", session.getId(), e.getMessage());
            SESSIONS.remove(session);
        }
    }

    /**
     * 检查是否有活跃连接
     */
    public static boolean hasActiveConnections() {
        return !SESSIONS.isEmpty();
    }

    /**
     * 获取当前连接数
     */
    public static int getConnectionCount() {
        return SESSIONS.size();
    }
}
