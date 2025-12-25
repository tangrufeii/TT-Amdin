package com.tt.domain.auth.user.service;

import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainEventPublisher;
import com.tt.common.domain.DomainException;
import com.tt.domain.auth.user.model.aggregate.User;
import com.tt.domain.auth.user.model.event.UserLoginFailedEvent;
import com.tt.domain.auth.user.model.valobj.UserStatus;
import com.tt.domain.auth.user.repository.UserRepository;
import com.tt.domain.shared.service.DomainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * 用户领域服务
 * <p>
 * 处理用户相关的核心业务逻辑：
 * 1. 用户认证
 * 2. 用户名唯一性验证
 * 3. 用户状态管理
 */
@Slf4j
@Service
public class UserDomainService extends DomainService {

    private final UserRepository userRepository;

    public UserDomainService(UserRepository userRepository, DomainEventPublisher domainEventPublisher) {
        super(domainEventPublisher);
        this.userRepository = userRepository;
    }

    /**
     * 验证用户名是否可用
     *
     * @param username 用户名
     * @throws IllegalArgumentException 如果用户名已存在
     */
    public void validateUsernameAvailable(String username) {
        validatePrecondition("validateUsernameAvailable");

        requireNotBlank(username, "用户名不能为空", "USERNAME_REQUIRED");

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("用户名已存在: " + username);
        }

        validatePostcondition("validateUsernameAvailable");
    }

    /**
     * 用户登录认证
     *
     * @param username 用户名
     * @param password 密码
     * @return 认证成功的用户
     * @throws IllegalArgumentException 如果认证失败
     */
    public User authenticate(String username, String password) {
        validatePrecondition("authenticate");

        requireNotBlank(username, "用户名不能为空", "USERNAME_REQUIRED");
        requireNotBlank(password, "密码不能为空", "PASSWORD_REQUIRED");

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            domainEventPublisher.publish(
                new UserLoginFailedEvent(username, "用户不存在")
            );
            throw new IllegalArgumentException("用户名或密码错误");
        }

        User user = userOpt.get();

        // 检查用户状态
        if (user.getStatus() != UserStatus.ACTIVE) {
            domainEventPublisher.publish(
                new UserLoginFailedEvent(username, "用户已被" + user.getStatus().getDescription())
            );
            throw new IllegalArgumentException("用户已被" + user.getStatus().getDescription());
        }

        // 验证密码
        if (!user.validatePassword(password)) {
            domainEventPublisher.publish(
                new UserLoginFailedEvent(username, "密码错误")
            );
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(),"密码错误");
        }

        validatePostcondition("authenticate");
        return user;
    }

    /**
     * 检查用户是否可以执行操作
     *
     * @param userId 用户ID
     * @throws IllegalArgumentException 如果用户不存在或被禁用
     */
    public void checkUserActive(String userId) {
        validatePrecondition("checkUserActive");

        requireNotBlank(userId, "用户ID不能为空", "USER_ID_REQUIRED");

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("用户不存在");
        }

        User user = userOpt.get();
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new IllegalArgumentException("用户已被" + user.getStatus().getDescription());
        }

        validatePostcondition("checkUserActive");
    }

    @Override
    protected String getDomainName() {
        return "Auth";
    }
}