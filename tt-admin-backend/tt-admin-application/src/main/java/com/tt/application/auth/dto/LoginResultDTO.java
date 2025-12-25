package com.tt.application.auth.dto;

import lombok.Data;

/**
 * 登录结果DTO
 * <p>
 * 包含登录成功后的Token和用户信息
 */
@Data
public class LoginResultDTO {

    /**
     * 访问令牌
     */
    private String token;

    /**
     * 刷新令牌
     */
    private String refreshToken;

    /**
     * Token过期时间（秒）
     */
    private Long expiresIn;

    /**
     * 用户信息
     */
    private UserDTO user;
}