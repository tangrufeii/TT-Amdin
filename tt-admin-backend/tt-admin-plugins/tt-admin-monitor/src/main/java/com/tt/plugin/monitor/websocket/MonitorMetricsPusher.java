package com.tt.plugin.monitor.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.plugin.monitor.model.MonitorMetrics;
import com.tt.plugin.monitor.service.MonitorService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * 监控指标推送服务
 * 定时获取系统指标并通过 WebSocket 推送给客户端
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MonitorMetricsPusher {

    private static final long PUSH_INTERVAL_MS = 2000; // 推送间隔 2 秒

    private final MonitorService monitorService;
    private final ObjectMapper objectMapper;

    private ScheduledExecutorService scheduler;
    private volatile boolean running = false;

    @PostConstruct
    public void start() {
        running = true;
        scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "monitor-metrics-pusher");
            t.setDaemon(true);
            return t;
        });

        scheduler.scheduleWithFixedDelay(this::pushMetrics, PUSH_INTERVAL_MS, PUSH_INTERVAL_MS, TimeUnit.MILLISECONDS);
        log.info("Monitor metrics pusher started with interval: {}ms", PUSH_INTERVAL_MS);
    }

    @PreDestroy
    public void stop() {
        running = false;
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
            try {
                if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                    scheduler.shutdownNow();
                }
            } catch (InterruptedException e) {
                scheduler.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
        log.info("Monitor metrics pusher stopped");
    }

    private void pushMetrics() {
        if (!running) {
            return;
        }

        // 只有在有活跃连接时才推送数据
        if (!MonitorWebSocket.hasActiveConnections()) {
            return;
        }

        try {
            MonitorMetrics metrics = monitorService.getMetrics();
            String json = objectMapper.writeValueAsString(metrics);
            MonitorWebSocket.broadcast(json);

            if (log.isTraceEnabled()) {
                log.trace("Pushed metrics to {} clients", MonitorWebSocket.getConnectionCount());
            }
        } catch (Exception e) {
            log.warn("Failed to push monitor metrics: {}", e.getMessage());
        }
    }
}
