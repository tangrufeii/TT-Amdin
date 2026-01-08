package com.tt.application.permission.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.permission.command.PermissionCreateCommand;
import com.tt.application.permission.command.PermissionDeleteCommand;
import com.tt.application.permission.command.PermissionPageQueryCommand;
import com.tt.application.permission.command.PermissionUpdateCommand;
import com.tt.application.permission.dto.MenuPermissionDTO;
import com.tt.application.permission.dto.PermissionManageDTO;
import com.tt.application.permission.repository.PermissionManagementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PermissionManagementApplicationService {

    private final PermissionManagementRepository permissionManagementRepository;

    public IPage<PermissionManageDTO> page(PermissionPageQueryCommand command) {
        return permissionManagementRepository.page(command);
    }

    public PermissionManageDTO get(Long id) {
        return permissionManagementRepository.get(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(PermissionCreateCommand command) {
        permissionManagementRepository.create(command, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(PermissionUpdateCommand command) {
        permissionManagementRepository.update(command, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(PermissionDeleteCommand command) {
        List<Long> ids = Optional.ofNullable(command.getIds()).orElse(List.of());
        permissionManagementRepository.delete(ids);
    }

    public Map<String, String> getResourceAnnotations() {
        return permissionManagementRepository.findResourceAnnotations();
    }

    public List<MenuPermissionDTO> listMenuPermissions() {
        return permissionManagementRepository.listMenuPermissions();
    }
}
