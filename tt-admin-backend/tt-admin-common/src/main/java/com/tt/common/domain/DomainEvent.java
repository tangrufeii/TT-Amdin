package com.tt.common.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 领域事件基类
 * <p>
 * 所有的领域事件都需要继承此类
 * <p>
 * 特点：
 * 1. 不可变性 - 事件创建后不应修改
 * 2. ��含时间戳和唯一ID
 * 3. 记录事件来源的聚合根
 */
@Getter
@EqualsAndHashCode(of = "eventId")
public abstract class DomainEvent {

    /**
     * 事件唯一标识
     */
    private final String eventId;

    /**
     * 事件发生时间
     */
    private final LocalDateTime occurredOn;

    /**
     * 聚合根ID
     */
    private final String aggregateId;

    /**
     * 聚合根类型
     */
    private final String aggregateType;

    /**
     * 事件版本
     */
    private final Long version;

    protected DomainEvent(String aggregateId, String aggregateType) {
        this.eventId = UUID.randomUUID().toString();
        this.occurredOn = LocalDateTime.now();
        this.aggregateId = aggregateId;
        this.aggregateType = aggregateType;
        this.version = 1L;
    }

    protected DomainEvent(String aggregateId, String aggregateType, Long version) {
        this.eventId = UUID.randomUUID().toString();
        this.occurredOn = LocalDateTime.now();
        this.aggregateId = aggregateId;
        this.aggregateType = aggregateType;
        this.version = version;
    }

    /**
     * 获取事件类型名称
     *
     * @return 事件类型
     */
    public String getEventType() {
        return this.getClass().getSimpleName();
    }
}