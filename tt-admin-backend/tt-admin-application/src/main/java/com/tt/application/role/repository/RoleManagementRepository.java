package com.tt.application.role.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.role.command.RoleCreateCommand;
import com.tt.application.role.command.RolePageQueryCommand;
import com.tt.application.role.command.RoleUpdateCommand;
import com.tt.application.role.dto.PermissionTreeDTO;
import com.tt.application.role.dto.RoleManageDTO;
import com.tt.application.role.dto.RoleOptionDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface RoleManagementRepository {

    IPage<RoleManageDTO> page(RolePageQueryCommand command);

    RoleManageDTO get(Long id);

    List<RoleOptionDTO> listAllEnabled();

    void create(RoleCreateCommand command, LocalDateTime now);

    void update(RoleUpdateCommand command, LocalDateTime now);

    void delete(List<Long> ids);

    List<Long> getRoleMenuIds(Long roleId);

    void saveRoleMenus(Long roleId, List<Long> menuIds, LocalDateTime now);

    List<Long> getRolePermissionIds(Long roleId);

    void saveRolePermissions(Long roleId, List<Long> permissionIds);

    List<PermissionTreeDTO> getPermissionTree();

    boolean existsByRoleCode(String roleCode, Long excludeId);
}
