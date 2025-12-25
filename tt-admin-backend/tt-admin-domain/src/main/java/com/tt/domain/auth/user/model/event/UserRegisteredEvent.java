package com.tt.domain.auth.user.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 用户注册事件
 * <p>
 * 当新用户注册时发布此事件
 */
@Getter
public class UserRegisteredEvent extends DomainEvent {

    /**
     * 用户名
     */
    private final String username;

    /**
     * 创建用户注册事件
     *
     * @param userId   用户ID
     * @param username 用户名
     */
    public UserRegisteredEvent(String userId, String username) {
        super(userId, "User");
        this.username = username;
    }
}