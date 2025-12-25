package com.tt.application.auth.service;

import cn.dev33.satoken.stp.StpUtil;
import com.tt.application.auth.command.LoginCommand;
import com.tt.application.auth.command.RegisterUserCommand;
import com.tt.application.auth.dto.LoginResultDTO;
import com.tt.application.auth.dto.UserDTO;
import com.tt.common.utils.CglibUtil;
import com.tt.domain.auth.user.model.aggregate.User;
import com.tt.domain.auth.user.repository.UserRepository;
import com.tt.domain.auth.user.service.UserDomainService;
import com.tt.common.domain.DomainEventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 认证应用服务
 * <p>
 * 职责：
 * 1. 处理用户注册和登录流程
 * 2. 事务管理
 * 3. 协调领域服务和基础设施
 * 4. 返回DTO给接口层
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthApplicationService {

    private final UserRepository userRepository;
    private final UserDomainService userDomainService;
    private final DomainEventPublisher domainEventPublisher;
    @Qualifier("saTokenAuthService") // 显式指定
    private final AuthService authService; // 假设的Token服务

    /**
     * 用户注册
     *
     * @param command 注册命令
     * @return 用户信息
     */
    @Transactional(rollbackFor = Exception.class)
    public UserDTO register(RegisterUserCommand command) {
        // 1. 验证用户名可用性
        userDomainService.validateUsernameAvailable(command.getUsername());

        // 2. 创建用户聚合
        User user = User.create(command.getUsername(), command.getPassword());

        // 3. 更新用户资料
        user.getProfile().updateEmail(command.getEmail());
        user.getProfile().updatePhone(command.getPhone());
        user.getProfile().updateRealName(command.getRealName());

        // 4. 保存用户
        userRepository.save(user);

        // 5. 发布领域事件
        domainEventPublisher.publishAll(user.getUncommittedEvents());
        user.clearEvents();

        // 6. 转换为DTO返回
        return convertToDTO(user);
    }

    /**
     * 用户登录
     *
     * @param command 登录命令
     * @return 登录结果
     */
    @Transactional(rollbackFor = Exception.class)
    public LoginResultDTO login(LoginCommand command) {
        // TODO 登陆日志记录
        // 1. 用户认证
        User user = userDomainService.authenticate(command.getUserName(), command.getPassword());
        // 2. 生成Token（这里简化处理）
        authService.login(user.getId()); // 只存储用户ID
        // 3. 将当前用户存入当前会话session
        UserDTO userDTO = convertToDTO(user);
        authService.saveUserToSession(userDTO);
        // 4. 返回登录结果
        LoginResultDTO result = new LoginResultDTO();
        result.setToken(authService.getTokenValue());
        result.setUser(convertToDTO(user));
        return result;
    }

    /**
     * 用户登出
     *
     * @param token 用户Token
     */
    public void logout(String token) {
        log.info("用户已登出");
    }

    /**
     * 获取当前用户信息
     *
     * @return 用户信息
     */
    public UserDTO getCurrentUserInfo() {
        Object userInfoFromSession = authService.getUserInfoFromSession();
        UserDTO user = CglibUtil.convertObj(userInfoFromSession, UserDTO::new);
        return user;
    }

    /**
     * 将用户聚合转换为DTO
     *
     * @param user 用户聚合
     * @return 用户DTO
     */
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getProfile().getEmail());
        dto.setPhone(user.getProfile().getPhone());
        dto.setRealName(user.getProfile().getRealName());
        dto.setAvatar(user.getProfile().getAvatar());
        dto.setStatus(user.getStatus().getCode());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}
