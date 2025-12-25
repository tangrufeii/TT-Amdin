package com.tt.domain.auth.user.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 密码修改事件
 * <p>
 * 当用户修改密码时发布此事件
 */
@Getter
public class PasswordChangedEvent extends DomainEvent {

    /**
     * 用户名
     */
    private final String username;

    /**
     * 创建密码修改事件
     *
     * @param userId   用户ID
     * @param username 用户名
     */
    public PasswordChangedEvent(String userId, String username) {
        super(userId, "User");
        this.username = username;
    }
}