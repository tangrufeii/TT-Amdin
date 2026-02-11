package com.tt.infrastructure.auth.persistence.po;

import com.baomidou.mybatisplus.annotation.*;
import com.tt.infrastructure.common.po.BasePo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 用户持久化对象
 * <p>
 * 对应表 sys_user
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_user")
public class UserPO extends BasePo {

    /**
     * 用户ID
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 用户名
     */
    @TableField("user_name")
    private String userName;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * 昵称
     */
    @TableField("nick_name")
    private String nickName;

    /**
     * 真实姓名
     */
    @TableField("real_name")
    private String realName;

    /**
     * 头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 手机号
     */
    @TableField("phone")
    private String phone;

    /**
     * 性别 0未知 1男 2女
     */
    @TableField("gender")
    private String gender;

    /**
     * 创建人
     */
    @TableField("create_user")
    private String createUser;

    /**
     * 创建人ID
     */
    @TableField("create_user_id")
    private Long createUserId;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField("update_time")
    private LocalDateTime updateTime;

    /**
     * MD5盐
     */
    @TableField("salt")
    private String salt;

    /**
     * 最后登录时间
     */
    @TableField("last_login_time")
    private LocalDateTime lastLoginTime;

    /**
     * 最后修改密码时间
     */
    @TableField("update_password_time")
    private LocalDateTime updatePasswordTime;

    /**
     * 状态(0:禁用,1:启用)
     */
    @TableField("status")
    private String status;

    /**
     * 删除标记(0:否,1:是)
     */
    @TableField("is_deleted")
    @TableLogic
    private Boolean isDeleted;
}