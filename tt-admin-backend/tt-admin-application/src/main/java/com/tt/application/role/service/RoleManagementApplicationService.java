package com.tt.application.role.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.role.command.RoleCreateCommand;
import com.tt.application.role.command.RoleDeleteCommand;
import com.tt.application.role.command.RoleMenuAssignCommand;
import com.tt.application.role.command.RolePageQueryCommand;
import com.tt.application.role.command.RolePermissionAssignCommand;
import com.tt.application.role.command.RoleUpdateCommand;
import com.tt.application.role.dto.PermissionTreeDTO;
import com.tt.application.role.dto.RoleManageDTO;
import com.tt.application.role.dto.RoleOptionDTO;
import com.tt.application.role.repository.RoleManagementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleManagementApplicationService {

    private final RoleManagementRepository roleManagementRepository;

    public IPage<RoleManageDTO> page(RolePageQueryCommand command) {
        return roleManagementRepository.page(command);
    }

    public RoleManageDTO get(Long id) {
        return roleManagementRepository.get(id);
    }

    public List<RoleOptionDTO> listAllEnabled() {
        return roleManagementRepository.listAllEnabled();
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(RoleCreateCommand command) {
        ensureRoleCodeAvailable(command.getRoleCode(), null);
        roleManagementRepository.create(command, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(RoleUpdateCommand command) {
        ensureRoleCodeAvailable(command.getRoleCode(), command.getId());
        roleManagementRepository.update(command, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(RoleDeleteCommand command) {
        List<Long> ids = Optional.ofNullable(command.getIds()).orElse(List.of());
        roleManagementRepository.delete(ids);
    }

    public List<Long> getRoleMenuIds(Long roleId) {
        return roleManagementRepository.getRoleMenuIds(roleId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveRoleMenus(RoleMenuAssignCommand command) {
        roleManagementRepository.saveRoleMenus(command.getRoleId(), command.getMenuIds(), LocalDateTime.now());
    }

    public List<Long> getRolePermissionIds(Long roleId) {
        return roleManagementRepository.getRolePermissionIds(roleId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveRolePermissions(RolePermissionAssignCommand command) {
        roleManagementRepository.saveRolePermissions(command.getRoleId(), command.getPermissionIds());
    }

    public List<PermissionTreeDTO> getPermissionTree() {
        return roleManagementRepository.getPermissionTree();
    }

    private void ensureRoleCodeAvailable(String roleCode, Long excludeId) {
        if (roleManagementRepository.existsByRoleCode(roleCode, excludeId)) {
            throw new IllegalArgumentException("\u89d2\u8272\u7f16\u7801\u5df2\u5b58\u5728");
        }
    }
}
