package com.tt.common.domain;

import java.util.List;

/**
 * 领域事件发布器接口
 * <p>
 * 职责：
 * 1. 发布领域事件
 * 2. 管理事务边界内的事件发布
 * 3. 支持批量发布
 * <p>
 * 实现类需要考虑：
 * - 事务内还是事务后发布
 * - 异常处理和重试机制
 * - 事件件存储（如果需要持久化）
 */
public interface DomainEventPublisher {

    /**
     * 发布单个领域事件
     *
     * @param event 领域事件
     */
    void publish(DomainEvent event);

    /**
     * 批量发布领域事件
     *
     * @param events 事件列表
     */
    void publishAll(List<DomainEvent> events);

    /**
     * 立即发布事件（不等待事务提交）
     *
     * @param event 领域事件
     */
    void publishImmediately(DomainEvent event);

    /**
     * 在事务提交后发布事件
     *
     * @param event 领域事件
     */
    void publishAfterCommit(DomainEvent event);
}