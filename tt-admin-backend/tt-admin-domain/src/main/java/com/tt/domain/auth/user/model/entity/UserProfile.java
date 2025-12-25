package com.tt.domain.auth.user.model.entity;

import com.tt.common.domain.Entity;
import lombok.*;

/**
 * 用户资料实体
 * <p>
 * 存储用户的个人信息，作为用户聚合的一部分
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Builder
public class UserProfile extends Entity<String> {

    /**
     * 邮箱
     */
    private String email;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 头像URL
     */
    private String avatar;

    /**
     * 创建用户资料
     *
     * @return 用户资料实体
     */
    public static UserProfile create() {
        UserProfile profile = new UserProfile();
        profile.id = null; // 作为实体的一部分，ID由聚合根管理
        return profile;
    }

    /**
     * 创建用户资料（带初始值）
     *
     * @param email    邮箱
     * @param phone    手机号
     * @param realName 真实姓名
     * @return 用户资料实体
     */
    public static UserProfile create(String email, String phone, String realName) {
        UserProfile profile = new UserProfile();
        profile.id = null;
        profile.email = email;
        profile.phone = phone;
        profile.realName = realName;
        return profile;
    }

    /**
     * 更新邮箱
     *
     * @param email 新邮箱
     */
    public void updateEmail(String email) {
        this.email = email;
        markAsChanged();
    }

    /**
     * 更新手机号
     *
     * @param phone 新手机号
     */
    public void updatePhone(String phone) {
        this.phone = phone;
        markAsChanged();
    }

    /**
     * 更新真实姓名
     *
     * @param realName 新真实姓名
     */
    public void updateRealName(String realName) {
        this.realName = realName;
        markAsChanged();
    }

    /**
     * 更新头像
     *
     * @param avatar 新头像URL
     */
    public void updateAvatar(String avatar) {
        this.avatar = avatar;
        markAsChanged();
    }
}