package com.tt.domain.shared.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 聚合根基类
 *
 * @author system
 */
@Getter
@Setter(AccessLevel.PROTECTED)
public abstract class BaseAggregateRoot<T> {

    /**
     * 主键ID
     */
    protected T id;

    /**
     * 创建人
     */
    protected String createUser;

    /**
     * 创建人ID
     */
    protected Long createUserId;

    /**
     * 创建时间
     */
    protected LocalDateTime createTime;

    /**
     * 更新人
     */
    protected String updateUser;

    /**
     * 更新人ID
     */
    protected Long updateUserId;

    /**
     * 更新时间
     */
    protected LocalDateTime updateTime;

    /**
     * 是否删除
     */
    protected Boolean deleted = false;

    /**
     * 设置创建信息
     */
    public void setCreateInfo(String createUser, Long createUserId) {
        this.createUser = createUser;
        this.createUserId = createUserId;
        this.createTime = LocalDateTime.now();
    }

    /**
     * 设置更新信息
     */
    public void setUpdateInfo(String updateUser, Long updateUserId) {
        this.updateUser = updateUser;
        this.updateUserId = updateUserId;
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 标记为已删除
     */
    public void markAsDeleted() {
        this.deleted = true;
    }

    /**
     * 标记为未删除
     */
    public void markAsNotDeleted() {
        this.deleted = false;
    }
}