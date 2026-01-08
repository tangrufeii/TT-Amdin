package com.tt.application.user.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.user.command.UserCreateCommand;
import com.tt.application.user.command.UserDeleteCommand;
import com.tt.application.user.command.UserPageQueryCommand;
import com.tt.application.user.command.UserUpdateCommand;
import com.tt.application.user.dto.UserManageDTO;
import com.tt.application.user.repository.UserManagementRepository;
import com.tt.domain.auth.user.model.valobj.Password;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserManagementApplicationService {

    private static final String DEFAULT_PASSWORD = "123456";

    private final UserManagementRepository userManagementRepository;

    public IPage<UserManageDTO> page(UserPageQueryCommand command) {
        return userManagementRepository.page(command);
    }

    public UserManageDTO get(Long id) {
        return userManagementRepository.get(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(UserCreateCommand command) {
        ensureUserNameAvailable(command.getUserName(), null);

        Password password = Password.create(Optional.ofNullable(command.getPassword()).orElse(DEFAULT_PASSWORD));
        userManagementRepository.create(command, password, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(UserUpdateCommand command) {
        ensureUserNameAvailable(command.getUserName(), command.getId());
        userManagementRepository.update(command, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(UserDeleteCommand command) {
        List<Long> ids = Optional.ofNullable(command.getIds()).orElse(List.of());
        userManagementRepository.delete(ids);
    }

    @Transactional(rollbackFor = Exception.class)
    public String resetPassword(Long userId) {
        Password password = Password.create(DEFAULT_PASSWORD);
        boolean reset = userManagementRepository.resetPassword(userId, password, LocalDateTime.now());
        return reset ? DEFAULT_PASSWORD : null;
    }

    private void ensureUserNameAvailable(String userName, Long excludeId) {
        if (userManagementRepository.existsByUserName(userName, excludeId)) {
            throw new IllegalArgumentException("\u7528\u6237\u540d\u5df2\u5b58\u5728");
        }
    }
}
