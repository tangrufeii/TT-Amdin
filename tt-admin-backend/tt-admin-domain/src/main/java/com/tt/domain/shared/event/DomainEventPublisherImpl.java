package com.tt.domain.shared.event;

import com.tt.common.domain.DomainEvent;
import com.tt.common.domain.DomainEventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 领域事件发布器实现
 * <p>
 * 功能：
 * 1. 事务内事件缓存
 * 2. 事务提交后自动发布
 * 3. 支持立即发布
 * 4. 异步发布支持
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DomainEventPublisherImpl implements DomainEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    /**
     * 线程本地存储待发布的事件
     */
    private final ThreadLocal<List<DomainEvent>> pendingEvents = ThreadLocal.withInitial(ArrayList::new);

    @Override
    public void publish(DomainEvent event) {
        if (TransactionSynchronizationManager.isActualTransactionActive()) {
            // 在事务中，缓存事件，等待事务提交后发布
            pendingEvents.get().add(event);

            // 注册事务同步
            registerTransactionSynchronization();
        } else {
            // 不在事务中，立即发布
            publishEvent(event);
        }
    }

    @Override
    public void publishAll(List<DomainEvent> events) {
        if (events == null || events.isEmpty()) {
            return;
        }

        events.forEach(this::publish);
    }

    @Override
    public void publishImmediately(DomainEvent event) {
        publishEvent(event);
    }

    @Override
    public void publishAfterCommit(DomainEvent event) {
        if (TransactionSynchronizationManager.isActualTransactionActive()) {
            pendingEvents.get().add(event);
            registerTransactionSynchronization();
        } else {
            log.warn("No active transaction, publishing event immediately: {}", event.getEventType());
            publishEvent(event);
        }
    }

    /**
     * 注册事务同步
     */
    private void registerTransactionSynchronization() {
        // 避免重复注册
        if (!TransactionSynchronizationManager.getSynchronizations().stream()
                .anyMatch(sync -> sync instanceof DomainEventTransactionSynchronization)) {

            TransactionSynchronizationManager.registerSynchronization(
                new DomainEventTransactionSynchronization()
            );
        }
    }

    /**
     * 实际发布事件
     */
    private void publishEvent(DomainEvent event) {
        try {
            log.debug("Publishing domain event: {} with ID: {}", event.getEventType(), event.getEventId());
            eventPublisher.publishEvent(event);
        } catch (Exception e) {
            log.error("Failed to publish domain event: {} with ID: {}",
                    event.getEventType(), event.getEventId(), e);
            // 可以添加重试逻辑或持久化失败事件
        }
    }

    /**
     * 批量发布待发布的事件
     */
    private void publishPendingEvents() {
        List<DomainEvent> events = pendingEvents.get();
        if (events.isEmpty()) {
            return;
        }

        log.debug("Publishing {} pending domain events", events.size());

        // 复制事件列表并清空待发布列表
        List<DomainEvent> eventsToPublish = new ArrayList<>(events);
        events.clear();

        // 异步发布所有事件
        CompletableFuture.runAsync(() ->
            eventsToPublish.forEach(this::publishEvent)
        ).exceptionally(throwable -> {
            log.error("Failed to publish batch of domain events", throwable);
            return null;
        });
    }

    /**
     * 事务同步器
     */
    private class DomainEventTransactionSynchronization implements TransactionSynchronization {

        @Override
        public void afterCommit() {
            publishPendingEvents();
        }

        @Override
        public void afterCompletion(int status) {
            // 事务完成后清理线程本地变量
            if (status == STATUS_ROLLED_BACK) {
                log.debug("Transaction rolled back, discarding {} pending events",
                         pendingEvents.get().size());
            }
            pendingEvents.remove();
        }
    }
}