package com.tt.application.user.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.user.command.UserCreateCommand;
import com.tt.application.user.command.UserPageQueryCommand;
import com.tt.application.user.command.UserUpdateCommand;
import com.tt.application.user.dto.UserManageDTO;
import com.tt.domain.auth.user.model.valobj.Password;

import java.time.LocalDateTime;
import java.util.List;

public interface UserManagementRepository {

    IPage<UserManageDTO> page(UserPageQueryCommand command);

    UserManageDTO get(Long id);

    void create(UserCreateCommand command, Password password, LocalDateTime now);

    void update(UserUpdateCommand command, LocalDateTime now);

    void delete(List<Long> ids);

    boolean resetPassword(Long userId, Password password, LocalDateTime now);

    boolean existsByUserName(String userName, Long excludeId);
}
