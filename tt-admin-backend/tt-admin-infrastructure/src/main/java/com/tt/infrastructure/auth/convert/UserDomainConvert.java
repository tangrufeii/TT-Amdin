package com.tt.infrastructure.auth.convert;

import com.tt.domain.auth.user.model.aggregate.User;
import com.tt.domain.auth.user.model.entity.UserProfile;
import com.tt.domain.auth.user.model.valobj.Password;
import com.tt.domain.auth.user.model.valobj.UserStatus;
import com.tt.infrastructure.auth.persistence.po.UserPO;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * 用户领域对象与持久化对象转换器
 * <p>
 * 负责Domain层和Infrastructure层之间的对象转换
 */
@Component
public class UserDomainConvert {

    /**
     * 将聚合转换为PO
     *
     * @param user 用户聚合
     * @return 用户PO
     */
    public UserPO toPO(User user) {
        if (user == null) {
            return null;
        }

        return UserPO.builder()
                .id(Long.parseLong(user.getId()))
                .userName(user.getUsername())
                .password(user.getPassword().getHash())
                .salt(user.getPassword().getSalt())
                .status(String.valueOf(user.getStatus().getCode()))
                .realName(user.getProfile().getRealName())
                .email(user.getProfile().getEmail())
                .phone(user.getProfile().getPhone())
                .avatar(user.getProfile().getAvatar())
                .createTime(user.getCreatedAt())
                .updateTime(user.getUpdatedAt())
                .isDeleted(false)
                .build();
    }

    /**
     * 将PO转换为聚合
     *
     * @param po 用户PO
     * @return 用户聚合
     */
    public User toDomain(UserPO po) {
        if (po == null) {
            return null;
        }

        // 创建用户资料
        UserProfile profile = UserProfile.builder()
                .email(po.getEmail())
                .phone(po.getPhone())
                .realName(po.getRealName())
                .avatar(po.getAvatar())
                .build();

        // 使用Builder创建用户聚合
        return User.builder()
                .id(String.valueOf(po.getId()))
                .username(po.getUserName())
                .password(Password.fromHash(po.getPassword(), po.getSalt()))
                .status(UserStatus.fromCode(Integer.valueOf(po.getStatus())))
                .profile(profile)
                .createdAt(po.getCreateTime())
                .updatedAt(po.getUpdateTime())
                .build();
    }

    /**
     * 更新聚合到PO
     *
     * @param user 用户聚合
     * @param po   用户PO
     */
    public void updateEntityToPO(User user, UserPO po) {
        if (user == null || po == null) {
            return;
        }

        po.setUserName(user.getUsername());
        po.setPassword(user.getPassword().getHash());
        po.setSalt(user.getPassword().getSalt());
        po.setStatus(String.valueOf(user.getStatus().getCode()));

        if (user.getProfile() != null) {
            po.setRealName(user.getProfile().getRealName());
            po.setEmail(user.getProfile().getEmail());
            po.setPhone(user.getProfile().getPhone());
            po.setAvatar(user.getProfile().getAvatar());
        }

        po.setUpdateTime(user.getUpdatedAt());
    }
}