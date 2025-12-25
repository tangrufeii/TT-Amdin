package com.tt.domain.auth.user.model.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 用户登录失败事件
 * <p>
 * 当用户登录失败时发布此事件
 */
@Getter
public class UserLoginFailedEvent extends DomainEvent {

    /**
     * 用户名
     */
    private final String username;

    /**
     * 失败原因
     */
    private final String reason;

    /**
     * 创建用户登录失败事件
     *
     * @param username 用户名
     * @param reason   失败原因
     */
    public UserLoginFailedEvent(String username, String reason) {
        super(null, "User"); // 登录失败时可能没有用户ID
        this.username = username;
        this.reason = reason;
    }
}