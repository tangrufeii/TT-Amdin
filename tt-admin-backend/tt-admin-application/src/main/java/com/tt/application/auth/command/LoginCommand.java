package com.tt.application.auth.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 登录命令
 * <p>
 * 包含用户登录所需的信息
 */
@Data
@Schema(description = "登录对象")
public class LoginCommand {

    /**
     * 用户名
     */
    @NotBlank(message = "用户名不能为空")
    @Schema(description = "用户名",required = true)
    private String userName;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空")
    @Schema(description = "密码", required = true)
    private String password;
}