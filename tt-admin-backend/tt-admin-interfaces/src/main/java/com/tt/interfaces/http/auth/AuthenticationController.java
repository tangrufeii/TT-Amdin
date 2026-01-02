package com.tt.interfaces.http.auth;

import cn.dev33.satoken.stp.StpUtil;
import com.tt.application.auth.command.LoginCommand;
import com.tt.application.auth.command.RegisterUserCommand;
import com.tt.application.auth.command.UserNameLoginCommand;
import com.tt.application.auth.dto.LoginResultDTO;
import com.tt.application.auth.dto.UserDTO;
import com.tt.application.auth.service.AuthApplicationService;
import com.tt.common.api.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 身份验证控制器
 *
 * @author trf
 * @date 2025/12/17 05:43
 */
@RestController
@Tag(name = "认证管理",description = "认证管理相关接口")
@RequiredArgsConstructor
@RequestMapping("/auth")
@Log4j2
public class AuthenticationController {
    @NonNull
    private final AuthApplicationService authApplicationService;



    /**
     * 用户注册
     *
     * @param command 注册命令
     * @return 用户信息
     */
    @PostMapping("/register")
    @Operation(summary = "用户注册", description = "创建新用户账号")
    public Result<UserDTO> register(@Valid @RequestBody RegisterUserCommand command) {
        log.info("用户注册请求: username={}", command.getUsername());
        UserDTO user = authApplicationService.register(command);
        return Result.data(user);
    }

    /**
     * 用户登录
     *
     * @param command 登录命令
     * @return 登录结果（包含Token）
     */
    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "用户账号密码登录")
    public Result<LoginResultDTO> login( @Parameter(description = "登录对象") @RequestBody LoginCommand command) {
        log.info("用户登录请求: username={}", command.getUserName());
        LoginResultDTO result = authApplicationService.login(command);
        return Result.data(result);
    }

    /**
     * 用户登出
     *
     * @param token 访问令牌（从请求头获取）
     */
    @PostMapping("/logout")
    @Operation(summary = "用户登出", description = "用户退出登录")
    public Result<Void> logout(@RequestHeader("Authorization") String token) {
        // 去掉 "Bearer " 前缀
        String authToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        authApplicationService.logout(authToken);
        return Result.success();
    }

    /**
     * 获取当前用户信息
     *
     * @return 用户信息
     */
    @GetMapping("/getUserInfo")
    @Operation(summary = "获取当前用户信息", description = "获取当前登录用户的详细信息")
    public Result<UserDTO> getCurrentUser() {
        UserDTO user = authApplicationService.getCurrentUserInfo();
        return Result.data(user);
    }
}
