package com.tt.application.auth.command;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 注册用户命令
 * <p>
 * 包含用户注册所需的所有信息
 */
@Data
public class RegisterUserCommand {

    /**
     * 用户名
     */
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 40, message = "用户名长度必须在3-40个字符之间")
    private String username;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度必须在6-20个字符之间")
    private String password;

    /**
     * 昵称
     */
    @Size(max = 20, message = "昵称长度不能超过20个字符")
    private String nickname;

    /**
     * 真实姓名
     */
    @NotBlank(message = "真实姓名不能为空")
    @Size(max = 20, message = "真实姓名长度不能超过20个字符")
    private String realName;

    /**
     * 邮箱
     */
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    /**
     * 手机号
     */
    @Size(max = 45, message = "手机号长度不能超过45个字符")
    private String phone;

    /**
     * 性别 0:保密 1:男 2:女
     */
    private String gender = "0";
}