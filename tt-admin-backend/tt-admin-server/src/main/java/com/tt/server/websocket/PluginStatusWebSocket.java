package com.tt.server.websocket;

import com.tt.application.plugin.progress.PluginStatusSnapshotStore;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.EOFException;
import java.io.IOException;
import java.net.SocketException;
import java.nio.channels.ClosedChannelException;
import java.util.Collection;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
@Component
@ServerEndpoint("/ws/plugin/status")
public class PluginStatusWebSocket {

    private static final Set<Session> SESSIONS = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        SESSIONS.add(session);
        log.debug("Plugin status websocket connected: {}", session.getId());
        PluginStatusWebSocket.sendTo(session, PluginStatusSnapshotStore.values());
    }

    @OnClose
    public void onClose(Session session) {
        SESSIONS.remove(session);
        log.debug("Plugin status websocket disconnected: {}", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        if (session != null) {
            SESSIONS.remove(session);
        }
        if (isExpectedDisconnect(throwable)) {
            log.debug("Plugin status websocket disconnected: {}", session != null ? session.getId() : "unknown");
            return;
        }
        log.warn("Plugin status websocket error: {}", session != null ? session.getId() : "unknown", throwable);
    }

    public static void broadcast(String message) {
        for (Session session : SESSIONS) {
            if (!session.isOpen()) {
                SESSIONS.remove(session);
                continue;
            }
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                log.warn("Failed to send plugin status message: {}", session.getId(), e);
            }
        }
    }

    public static void sendTo(Session session, String message) {
        if (session == null || !session.isOpen()) {
            return;
        }
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.warn("Failed to send plugin status message: {}", session.getId(), e);
        }
    }

    public static void sendTo(Session session, Collection<String> messages) {
        if (messages == null || messages.isEmpty()) {
            return;
        }
        for (String message : messages) {
            sendTo(session, message);
        }
    }

    private boolean isExpectedDisconnect(Throwable throwable) {
        Throwable current = throwable;
        while (current != null) {
            if (current instanceof EOFException || current instanceof ClosedChannelException) {
                return true;
            }
            if (current instanceof SocketException socketException) {
                String msg = socketException.getMessage();
                if (msg == null) {
                    return true;
                }
                String normalized = msg.toLowerCase();
                if (normalized.contains("broken pipe") || normalized.contains("connection reset")) {
                    return true;
                }
            }
            current = current.getCause();
        }
        return false;
    }
}
