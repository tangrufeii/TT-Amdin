package com.tt.application.auth.dto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户DTO
 */
@Data
public class UserDTO {

    /** 用户ID */
    private String userId;

    /** 用户名 */
    private String userName;

    /** 昵称 */
    private String nickName;

    /** 真实姓名 */
    private String realName;

    /** 邮箱 */
    private String email;

    /** 手机号 */
    private String phone;

    /** 性别 */
    private String gender;

    /** 头像 */
    private String avatar;

    /** 状态 */
    private Integer status;

    /** 最近登录时间 */
    private LocalDateTime lastLoginTime;

    /** 创建时间 */
    private LocalDateTime createdAt;

    /** 更新时间 */
    private LocalDateTime updatedAt;

    /** 角色编码 */
    private List<String> roles = new ArrayList<>();

    /** 按钮权限 */
    private List<String> buttons = new ArrayList<>();
}
