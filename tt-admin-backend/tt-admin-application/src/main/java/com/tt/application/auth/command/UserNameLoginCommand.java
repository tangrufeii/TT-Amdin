package com.tt.application.auth.command;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

/**
 * 用户名密码登陆命令
 *
 * @author trf
 * @date 2025/12/17 06:16
 */
@Data
@Schema(description = "登录对象")
public class UserNameLoginCommand {
    @NotBlank
    @Schema(description = "用户名")
    private String userName;

    @NotBlank
    @Schema(description = "密码")
    private String password;
}
