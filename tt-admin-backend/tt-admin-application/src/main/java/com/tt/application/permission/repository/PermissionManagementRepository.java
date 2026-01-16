package com.tt.application.permission.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.permission.command.PermissionCreateCommand;
import com.tt.application.permission.command.PermissionPageQueryCommand;
import com.tt.application.permission.command.PermissionUpdateCommand;
import com.tt.application.permission.dto.MenuPermissionDTO;
import com.tt.application.permission.dto.PermissionManageDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface PermissionManagementRepository {

    IPage<PermissionManageDTO> page(PermissionPageQueryCommand command);

    PermissionManageDTO get(Long id);

    void create(PermissionCreateCommand command, LocalDateTime now);

    void update(PermissionUpdateCommand command, LocalDateTime now);

    void delete(List<Long> ids);

    Map<String, String> findResourceAnnotations();

    List<MenuPermissionDTO> listMenuPermissions();

    List<PermissionManageDTO> listByMenuId(Long menuId);
}
