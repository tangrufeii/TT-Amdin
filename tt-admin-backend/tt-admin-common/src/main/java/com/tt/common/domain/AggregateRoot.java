package com.tt.common.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * 聚合根基类
 * <p>
 * 所有聚合根都需要继承此类，提供：
 * 1. 领域事件管理
 * 2. 统一的ID和版本管理
 * 3. 相等性判断
 *
 * @param <ID> ID类型
 */
@Getter
@SuperBuilder
@Setter
public abstract class AggregateRoot<ID> {

    /**
     * 聚合根ID
     */
    public ID id;

    /**
     * 设置聚合根ID（供基础设施层使用）
     *
     * @param id ID
     */
    public void setId(ID id) {
        this.id = id;
    }

    /**
     * 版本号，用于乐观锁
     */
    private Long version;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 待发布的领域事件
     */
    private final List<DomainEvent> domainEvents = new ArrayList<>();

    protected AggregateRoot() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    protected AggregateRoot(ID id) {
        this();
        this.id = id;
    }

    /**
     * 添加领域事件
     *
     * @param event 领域事件
     */
    protected void addDomainEvent(DomainEvent event) {
        domainEvents.add(event);
    }

    /**
     * 获取未提交的领域事件
     *
     * @return 领域事件列表
     */
    public List<DomainEvent> getUncommittedEvents() {
        return Collections.unmodifiableList(domainEvents);
    }

    /**
     * 清理已提交的领域事件
     */
    public void clearEvents() {
        domainEvents.clear();
    }

    /**
     * 标记聚合根已更改
     */
    protected void markAsChanged() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 设置创建时间（供基础设施层使用）
     *
     * @param createdAt 创建时间
     */
    protected void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * 设置更新时间（供基础设施层使用）
     *
     * @param updatedAt 更新时间
     */
    protected void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AggregateRoot)) return false;
        AggregateRoot<?> that = (AggregateRoot<?>) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    /**
     * 生成UUID作为ID
     *
     * @return UUID字符串
     */
    protected String generateUUID() {
        return UUID.randomUUID().toString();
    }
}