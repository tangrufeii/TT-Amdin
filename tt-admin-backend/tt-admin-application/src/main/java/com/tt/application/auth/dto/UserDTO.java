package com.tt.application.auth.dto;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户DTO
 * <p>
 * 用于传输用户信息
 */
@Data
public class UserDTO {

    /**
     * 用户ID
     */
    private String id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 性别
     */
    private String gender;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 最后登录时间
     */
    private LocalDateTime lastLoginTime;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}