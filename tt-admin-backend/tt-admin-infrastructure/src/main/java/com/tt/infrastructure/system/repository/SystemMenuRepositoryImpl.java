package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tt.domain.system.access.model.SystemMenu;
import com.tt.domain.system.menu.repository.SystemMenuRepository;
import com.tt.infrastructure.system.converter.SystemMenuConverter;
import com.tt.infrastructure.system.persistence.mapper.SysMenuMapper;
import com.tt.infrastructure.system.persistence.mapper.SysPermissionMapper;
import com.tt.infrastructure.system.persistence.mapper.SysRoleMenuMapper;
import com.tt.infrastructure.system.persistence.mapper.SysRolePermissionMapper;
import com.tt.infrastructure.system.persistence.po.SysMenuPO;
import com.tt.infrastructure.system.persistence.po.SysPermissionPO;
import com.tt.infrastructure.system.persistence.po.SysRoleMenuPO;
import com.tt.infrastructure.system.persistence.po.SysRolePermissionPO;
import lombok.RequiredArgsConstructor;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SystemMenuRepositoryImpl implements SystemMenuRepository {

    private final SysMenuMapper sysMenuMapper;
    private final SysRoleMenuMapper sysRoleMenuMapper;
    private final SysPermissionMapper sysPermissionMapper;
    private final SysRolePermissionMapper sysRolePermissionMapper;

    @Override
    public List<SystemMenu> findAll() {
        List<SysMenuPO> list = sysMenuMapper.selectList(new LambdaQueryWrapper<SysMenuPO>()
                .orderByAsc(SysMenuPO::getParentId, SysMenuPO::getSort, SysMenuPO::getId));
        return list.stream().map(SystemMenuConverter::toDomain).toList();
    }

    @Override
    public Optional<SystemMenu> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        SysMenuPO po = sysMenuMapper.selectById(id);
        return Optional.ofNullable(SystemMenuConverter.toDomain(po));
    }

    @Override
    public void insert(SystemMenu menu) {
        sysMenuMapper.insert(SystemMenuConverter.toPO(menu));
    }

    @Override
    public void update(SystemMenu menu) {
        sysMenuMapper.updateById(SystemMenuConverter.toPO(menu));
    }

    @Override
    public void deleteByIds(Collection<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysMenuMapper.delete(new LambdaQueryWrapper<SysMenuPO>().in(SysMenuPO::getId, ids));
    }

    @Override
    public void deleteRoleMenuRelations(Collection<Long> menuIds) {
        if (menuIds == null || menuIds.isEmpty()) {
            return;
        }
        sysRoleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenuPO>()
                .in(SysRoleMenuPO::getMenuId, menuIds));
    }

    @Override
    public void bindMenuToRoles(Long menuId, Collection<Long> roleIds) {
        if (menuId == null || roleIds == null || roleIds.isEmpty()) {
            return;
        }
        roleIds.stream()
                .filter(id -> id != null)
                .forEach(roleId -> {
                    sysRoleMenuMapper.delete(new LambdaQueryWrapper<SysRoleMenuPO>()
                            .eq(SysRoleMenuPO::getRoleId, roleId)
                            .eq(SysRoleMenuPO::getMenuId, menuId));
                    SysRoleMenuPO po = new SysRoleMenuPO();
                    po.setId(IdWorker.getId());
                    po.setRoleId(roleId);
                    po.setMenuId(menuId);
                    sysRoleMenuMapper.insert(po);
                });
    }

    @Override
    public List<Long> findPermissionIdsByMenuIds(Collection<Long> menuIds) {
        if (menuIds == null || menuIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysPermissionPO> permissions = sysPermissionMapper.selectList(
                new LambdaQueryWrapper<SysPermissionPO>().in(SysPermissionPO::getMenuId, menuIds));
        return permissions.stream().map(SysPermissionPO::getId).toList();
    }

    @Override
    public void deletePermissionsByIds(Collection<Long> permissionIds) {
        if (permissionIds == null || permissionIds.isEmpty()) {
            return;
        }
        sysPermissionMapper.delete(new LambdaQueryWrapper<SysPermissionPO>().in(SysPermissionPO::getId, permissionIds));
    }

    @Override
    public void deleteRolePermissionRelations(Collection<Long> permissionIds) {
        if (permissionIds == null || permissionIds.isEmpty()) {
            return;
        }
        sysRolePermissionMapper.delete(new LambdaQueryWrapper<SysRolePermissionPO>()
                .in(SysRolePermissionPO::getPermissionId, permissionIds));
    }

    @Override
    public boolean existsRouteName(String routeName, Long excludeId) {
        if (routeName == null || routeName.isBlank()) {
            return false;
        }
        Long count = sysMenuMapper.selectCount(new LambdaQueryWrapper<SysMenuPO>()
                .eq(SysMenuPO::getRouteName, routeName)
                .ne(excludeId != null, SysMenuPO::getId, excludeId));
        return count != null && count > 0;
    }

    @Override
    public boolean existsPath(String path, Long excludeId) {
        if (path == null || path.isBlank()) {
            return false;
        }
        Long count = sysMenuMapper.selectCount(new LambdaQueryWrapper<SysMenuPO>()
                .eq(SysMenuPO::getPath, path)
                .ne(excludeId != null, SysMenuPO::getId, excludeId));
        return count != null && count > 0;
    }
}
