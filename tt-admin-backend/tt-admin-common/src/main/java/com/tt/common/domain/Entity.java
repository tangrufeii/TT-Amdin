package com.tt.common.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * 实体基类
 * <p>
 * 特点：
 * 1. 具有唯一标识
 * 2. 有生命周期
 * 3. 可变状态
 * 4. 通过ID判断相等性
 *
 * @param <ID> ID类型
 */
@Getter
@EqualsAndHashCode(of = "id")
@SuperBuilder
public abstract class Entity<ID> {

    /**
     * 实体ID
     */
    protected ID id;

    /**
     * 创建时间
     */
    private final LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    protected Entity() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    protected Entity(ID id) {
        this();
        this.id = id;
    }

    /**
     * 标记实体已更改
     */
    protected void markAsChanged() {
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * 检查实体是否为新创建的
     *
     * @return 是否为新实体
     */
    public boolean isNew() {
        return id == null;
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "{" +
                "id=" + id +
                '}';
    }
}