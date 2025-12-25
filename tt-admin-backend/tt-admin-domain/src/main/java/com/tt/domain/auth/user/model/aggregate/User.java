package com.tt.domain.auth.user.model.aggregate;

import com.tt.common.domain.AggregateRoot;
import com.tt.domain.auth.user.model.entity.UserProfile;
import com.tt.domain.auth.user.model.valobj.Password;
import com.tt.domain.auth.user.model.valobj.UserStatus;
import com.tt.domain.auth.user.model.event.UserRegisteredEvent;
import com.tt.domain.auth.user.model.event.PasswordChangedEvent;
import com.tt.domain.auth.user.model.event.UserDisabledEvent;
import com.tt.domain.auth.user.model.event.UserEnabledEvent;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

/**
 * 用户聚合根
 * <p>
 * 负责管理用户的完整生命周期和核心业务逻辑
 * 包含用户的认证信息和基本资料
 *
 * 此处暴露无参构造器方便于反射,创建用户时推荐使用create方法
 */
@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User extends AggregateRoot<String> {
    private String id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码（值对象）
     */
    private Password password;

    /**
     * 用户状态
     */
    private UserStatus status;

    /**
     * 用户资料（实体）
     */
    private UserProfile profile;

    /**
     * 创建新用户
     *
     * @param username 用户名
     * @param password 密码
     * @return 用户聚合根
     */
    public static User create(String username, String password) {
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .username(username)
                .password(Password.create(password))
                .status(UserStatus.ACTIVE)
                .profile(UserProfile.create())
                .build();

        // 添加用户注册事件
        user.addDomainEvent(new UserRegisteredEvent(user.id, username));

        return user;
    }

    /**
     * 验证密码
     *
     * @param rawPassword 原始密码
     * @return 是否匹配
     */
    public boolean validatePassword(String rawPassword) {
        return this.password.validate(rawPassword);
    }

    /**
     * 修改密码
     *
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     */
    public void changePassword(String oldPassword, String newPassword) {
        if (!validatePassword(oldPassword)) {
            throw new IllegalArgumentException("旧密码不正确");
        }
        this.password = Password.create(newPassword);
        markAsChanged();

        // 添加密码修改事件
        addDomainEvent(new PasswordChangedEvent(id, username));
    }

    /**
     * 禁用用户
     */
    public void disable() {
        if (this.status == UserStatus.DISABLED) {
            return;
        }
        this.status = UserStatus.DISABLED;
        markAsChanged();

        // 添加用户禁用事件
        addDomainEvent(new UserDisabledEvent(id, username));
    }

    /**
     * 启用用户
     */
    public void enable() {
        if (this.status == UserStatus.ACTIVE) {
            return;
        }
        this.status = UserStatus.ACTIVE;
        markAsChanged();

        // 添加用户启用事件
        addDomainEvent(new UserEnabledEvent(id, username));
    }
}