package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.application.role.command.RoleCreateCommand;
import com.tt.application.role.command.RolePageQueryCommand;
import com.tt.application.role.command.RoleUpdateCommand;
import com.tt.application.role.dto.PermissionTreeDTO;
import com.tt.application.role.dto.RoleManageDTO;
import com.tt.application.role.dto.RoleOptionDTO;
import com.tt.application.role.repository.RoleManagementRepository;
import com.tt.infrastructure.system.persistence.mapper.SysMenuMapper;
import com.tt.infrastructure.system.persistence.mapper.SysPermissionMapper;
import com.tt.infrastructure.system.persistence.mapper.SysRoleMapper;
import com.tt.infrastructure.system.persistence.mapper.SysRoleMenuMapper;
import com.tt.infrastructure.system.persistence.mapper.SysRolePermissionMapper;
import com.tt.infrastructure.system.persistence.mapper.SysUserRoleMapper;
import com.tt.infrastructure.system.persistence.po.SysMenuPO;
import com.tt.infrastructure.system.persistence.po.SysPermissionPO;
import com.tt.infrastructure.system.persistence.po.SysRoleMenuPO;
import com.tt.infrastructure.system.persistence.po.SysRolePO;
import com.tt.infrastructure.system.persistence.po.SysRolePermissionPO;
import com.tt.infrastructure.system.persistence.po.SysUserRolePO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RoleManagementRepositoryImpl implements RoleManagementRepository {

    private final SysRoleMapper sysRoleMapper;
    private final SysUserRoleMapper sysUserRoleMapper;
    private final SysRoleMenuMapper sysRoleMenuMapper;
    private final SysRolePermissionMapper sysRolePermissionMapper;
    private final SysMenuMapper sysMenuMapper;
    private final SysPermissionMapper sysPermissionMapper;

    @Override
    public IPage<RoleManageDTO> page(RolePageQueryCommand command) {
        LambdaQueryWrapper<SysRolePO> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(command.getRoleName() != null && !command.getRoleName().isBlank(), SysRolePO::getRoleName, command.getRoleName());
        wrapper.like(command.getRoleCode() != null && !command.getRoleCode().isBlank(), SysRolePO::getRoleCode, command.getRoleCode());
        wrapper.eq(command.getStatus() != null && !command.getStatus().isBlank(), SysRolePO::getStatus, command.getStatus());
        wrapper.orderByAsc(SysRolePO::getSort, SysRolePO::getId);

        IPage<SysRolePO> page = sysRoleMapper.selectPage(command.buildPage(), wrapper);
        return page.convert(this::buildRoleDTO);
    }

    @Override
    public RoleManageDTO get(Long id) {
        SysRolePO po = sysRoleMapper.selectById(id);
        if (po == null) {
            return null;
        }
        return buildRoleDTO(po);
    }

    @Override
    public List<RoleOptionDTO> listAllEnabled() {
        List<SysRolePO> roles = sysRoleMapper.selectList(
                new LambdaQueryWrapper<SysRolePO>().eq(SysRolePO::getStatus, "1").orderByAsc(SysRolePO::getSort));
        return roles.stream().map(role -> {
            RoleOptionDTO dto = new RoleOptionDTO();
            dto.setId(role.getId());
            dto.setName(role.getRoleName());
            return dto;
        }).toList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(RoleCreateCommand command, LocalDateTime now) {
        SysRolePO po = new SysRolePO();
        po.setId(IdWorker.getId());
        po.setRoleName(command.getRoleName());
        po.setRoleCode(command.getRoleCode());
        po.setDescription(command.getDescription());
        po.setSort(Optional.ofNullable(command.getSort()).orElse(0));
        po.setStatus(Optional.ofNullable(command.getStatus()).orElse("1"));
        po.setCreateTime(now);
        sysRoleMapper.insert(po);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(RoleUpdateCommand command, LocalDateTime now) {
        SysRolePO existing = sysRoleMapper.selectById(command.getId());
        if (existing == null) {
            return;
        }

        existing.setRoleName(Optional.ofNullable(command.getRoleName()).orElse(existing.getRoleName()));
        existing.setRoleCode(Optional.ofNullable(command.getRoleCode()).orElse(existing.getRoleCode()));
        existing.setDescription(command.getDescription());
        existing.setSort(Optional.ofNullable(command.getSort()).orElse(existing.getSort()));
        existing.setStatus(Optional.ofNullable(command.getStatus()).orElse(existing.getStatus()));
        existing.setUpdateTime(now);
        sysRoleMapper.updateById(existing);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysRoleMapper.deleteBatchIds(ids);
        sysUserRoleMapper.delete(new LambdaQueryWrapper<SysUserRolePO>().in(SysUserRolePO::getRoleId, ids));
        sysRoleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenuPO>().in(SysRoleMenuPO::getRoleId, ids));
        sysRolePermissionMapper.delete(new LambdaQueryWrapper<SysRolePermissionPO>().in(SysRolePermissionPO::getRoleId, ids));
    }

    @Override
    public List<Long> getRoleMenuIds(Long roleId) {
        List<SysRoleMenuPO> list = sysRoleMenuMapper.selectList(
                new LambdaQueryWrapper<SysRoleMenuPO>().eq(SysRoleMenuPO::getRoleId, roleId));
        return list.stream().map(SysRoleMenuPO::getMenuId).distinct().toList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveRoleMenus(Long roleId, List<Long> menuIds, LocalDateTime now) {
        sysRoleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenuPO>().eq(SysRoleMenuPO::getRoleId, roleId));
        List<Long> finalMenuIds = Optional.ofNullable(menuIds).orElse(List.of());
        finalMenuIds.stream().filter(Objects::nonNull).distinct().forEach(menuId -> {
            SysRoleMenuPO po = new SysRoleMenuPO();
            po.setId(IdWorker.getId());
            po.setRoleId(roleId);
            po.setMenuId(menuId);
            po.setCreateTime(now);
            sysRoleMenuMapper.insert(po);
        });
    }

    @Override
    public List<Long> getRolePermissionIds(Long roleId) {
        List<SysRolePermissionPO> list = sysRolePermissionMapper.selectList(
                new LambdaQueryWrapper<SysRolePermissionPO>().eq(SysRolePermissionPO::getRoleId, roleId));
        return list.stream().map(SysRolePermissionPO::getPermissionId).distinct().toList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveRolePermissions(Long roleId, List<Long> permissionIds) {
        sysRolePermissionMapper.delete(new LambdaQueryWrapper<SysRolePermissionPO>().eq(SysRolePermissionPO::getRoleId, roleId));
        List<Long> finalPermissionIds = Optional.ofNullable(permissionIds).orElse(List.of());
        finalPermissionIds.stream().filter(Objects::nonNull).distinct().forEach(permissionId -> {
            SysRolePermissionPO po = new SysRolePermissionPO();
            po.setRoleId(roleId);
            po.setPermissionId(permissionId);
            sysRolePermissionMapper.insert(po);
        });
    }

    @Override
    public List<PermissionTreeDTO> getPermissionTree() {
        List<SysMenuPO> menus = sysMenuMapper.selectList(new LambdaQueryWrapper<SysMenuPO>()
                .ne(SysMenuPO::getType, "3")
                .orderByAsc(SysMenuPO::getParentId, SysMenuPO::getSort, SysMenuPO::getId));
        Map<Long, String> menuNameMap = menus.stream()
                .filter(menu -> menu.getId() != null)
                .collect(Collectors.toMap(SysMenuPO::getId, SysMenuPO::getName, (a, b) -> a));
        List<SysPermissionPO> permissions = sysPermissionMapper.selectList(
                new LambdaQueryWrapper<SysPermissionPO>().eq(SysPermissionPO::getStatus, "1"));
        Map<Long, List<SysPermissionPO>> grouped = permissions.stream()
                .collect(Collectors.groupingBy(SysPermissionPO::getMenuId));

        List<PermissionTreeDTO> tree = new ArrayList<>();
        grouped.forEach((menuId, perms) -> {
            String menuName = menuNameMap.getOrDefault(menuId, "菜单");
            PermissionTreeDTO menuNode = new PermissionTreeDTO();
            menuNode.setKey("menu-" + menuId);
            menuNode.setLabel(menuName);
            menuNode.setCheckboxDisabled(false);
            List<PermissionTreeDTO> children = perms.stream().map(permission -> {
                PermissionTreeDTO child = new PermissionTreeDTO();
                child.setKey(String.valueOf(permission.getId()));
                child.setLabel(permission.getName());
                child.setCheckboxDisabled(false);
                return child;
            }).toList();
            menuNode.setChildren(children);
            tree.add(menuNode);
        });
        return tree;
    }

    @Override
    public boolean existsByRoleCode(String roleCode, Long excludeId) {
        if (roleCode == null || roleCode.isBlank()) {
            return false;
        }
        Long count = sysRoleMapper.selectCount(new LambdaQueryWrapper<SysRolePO>()
                .eq(SysRolePO::getRoleCode, roleCode)
                .ne(excludeId != null, SysRolePO::getId, excludeId));
        return count != null && count > 0;
    }

    private RoleManageDTO buildRoleDTO(SysRolePO po) {
        RoleManageDTO dto = new RoleManageDTO();
        dto.setId(po.getId());
        dto.setRoleName(po.getRoleName());
        dto.setRoleCode(po.getRoleCode());
        dto.setDescription(po.getDescription());
        dto.setSort(po.getSort());
        dto.setStatus(po.getStatus());
        dto.setCreateTime(po.getCreateTime());
        return dto;
    }
}
