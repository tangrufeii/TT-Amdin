package com.tt.infrastructure.auth.persistence.po;

import com.baomidou.mybatisplus.annotation.*;
import com.tt.infrastructure.common.po.BasePo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * ???????
 * <p>
 * ?????? sys_user
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_user")
public class UserPO extends BasePo {

    /**
     * ??ID
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * ????
     */
    @TableField("user_name")
    private String userName;

    /**
     * ??
     */
    @TableField("password")
    private String password;

    /**
     * ??
     */
    @TableField("nick_name")
    private String nickName;

    /**
     * ????
     */
    @TableField("real_name")
    private String realName;

    /**
     * ??
     */
    @TableField("avatar")
    private String avatar;

    /**
     * ??
     */
    @TableField("email")
    private String email;

    /**
     * ??
     */
    @TableField("phone")
    private String phone;

    /**
     * ?? 0?? 1? 2?
     */
    @TableField("gender")
    private String gender;

    /**
     * ????
     */
    @TableField("create_user")
    private String createUser;

    /**
     * ????ID
     */
    @TableField("create_user_id")
    private Long createUserId;

    /**
     * ????
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * ????
     */
    @TableField("update_time")
    private LocalDateTime updateTime;

    /**
     * MD5???
     */
    @TableField("salt")
    private String salt;

    /**
     * ??????
     */
    @TableField("last_login_time")
    private LocalDateTime lastLoginTime;

    /**
     * ??????
     */
    @TableField("update_password_time")
    private LocalDateTime updatePasswordTime;

    /**
     * ????(0:??,1:??)
     */
    @TableField("status")
    private String status;

    /**
     * ????(0:?,1:?)
     */
    @TableField("is_deleted")
    @TableLogic
    private Boolean isDeleted;
}
