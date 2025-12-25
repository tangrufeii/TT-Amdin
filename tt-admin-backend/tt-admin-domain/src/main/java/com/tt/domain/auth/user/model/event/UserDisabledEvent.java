package com.tt.domain.auth.user.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 用户禁用事件
 * <p>
 * 当用户被禁用时发布此事件
 */
@Getter
public class UserDisabledEvent extends DomainEvent {

    /**
     * 用户名
     */
    private final String username;

    /**
     * 创建用户禁用事件
     *
     * @param userId   用户ID
     * @param username 用户名
     */
    public UserDisabledEvent(String userId, String username) {
        super(userId, "User");
        this.username = username;
    }
}