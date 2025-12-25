package com.tt.application.auth.service;

import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpUtil;

import java.util.Optional;

/**
 * 权限服务接口(做一层防腐,解除与框架的强关联)
 * <p>
 * 负责Token的生成、验证和刷新,登录认证、权限认证、单点登录、OAuth2.0、分布式Session会话、微服务网关鉴权 等一系列权限相关问题
 */
public interface AuthService {

    /**
     *
     * 用户登录
     * @param identity 用户唯一标识
     * @return
     */
     void login(Object identity);

    /**
     * 获取当前会话是否已经登录，返回true=已登录，false=未登录
     * @return 是否已登录
     */
     Boolean checkLoginState();

    /**
     * // 获取当前会话的 token 值
     * @return  当前token的值
     */
     String getTokenValue();

    /**
     * 获取当前token的名称
     * @return 当前token名称
     */
     String getTokenName();

    /**
     * 获取当前会话的id
     * @return
     */
     Optional<String> getLoginId();

    /**
     * 将当前用户信息存到session
     * @param user
     */
     void saveUserToSession(Object user);

     Object getUserInfoFromSession();
}