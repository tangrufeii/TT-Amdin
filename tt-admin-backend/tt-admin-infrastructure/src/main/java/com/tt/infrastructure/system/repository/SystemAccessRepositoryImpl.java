package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tt.domain.system.access.model.SystemDict;
import com.tt.domain.system.access.model.SystemDictItem;
import com.tt.domain.system.access.model.SystemMenu;
import com.tt.domain.system.access.repository.SystemAccessRepository;
import com.tt.infrastructure.system.converter.SystemMenuConverter;
import com.tt.infrastructure.system.persistence.mapper.*;
import com.tt.infrastructure.system.persistence.po.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class SystemAccessRepositoryImpl implements SystemAccessRepository {

    private final SysUserRoleMapper sysUserRoleMapper;
    private final SysRoleMapper sysRoleMapper;
    private final SysRoleMenuMapper sysRoleMenuMapper;
    private final SysMenuMapper sysMenuMapper;
    private final SysRolePermissionMapper sysRolePermissionMapper;
    private final SysPermissionMapper sysPermissionMapper;
    private final SysDictMapper sysDictMapper;
    private final SysDictItemMapper sysDictItemMapper;

    @Override
    public List<Long> findRoleIdsByUserId(Long userId) {
        List<SysUserRolePO> relations = sysUserRoleMapper.selectList(
                new LambdaQueryWrapper<SysUserRolePO>().eq(SysUserRolePO::getUserId, userId));
        return relations.stream().map(SysUserRolePO::getRoleId).distinct().collect(Collectors.toList());
    }

    @Override
    public List<String> findRoleCodesByUserId(Long userId) {
        List<Long> roleIds = findRoleIdsByUserId(userId);
        if (roleIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysRolePO> roles = sysRoleMapper.selectBatchIds(roleIds);
        return roles.stream().map(SysRolePO::getRoleCode).filter(Objects::nonNull).toList();
    }

    @Override
    public List<Long> findRoleIdsByCodes(Collection<String> roleCodes) {
        if (roleCodes == null || roleCodes.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysRolePO> roles = sysRoleMapper.selectList(
                new LambdaQueryWrapper<SysRolePO>().in(SysRolePO::getRoleCode, roleCodes));
        return roles.stream().map(SysRolePO::getId).filter(Objects::nonNull).toList();
    }

    @Override
    public List<SystemMenu> findMenusByRoleIds(Collection<Long> roleIds) {
        if (roleIds == null || roleIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysRoleMenuPO> relations = sysRoleMenuMapper.selectList(
                new LambdaQueryWrapper<SysRoleMenuPO>().in(SysRoleMenuPO::getRoleId, roleIds));
        List<Long> menuIds = relations.stream().map(SysRoleMenuPO::getMenuId).distinct().toList();
        if (menuIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysMenuPO> menuPOS = sysMenuMapper.selectBatchIds(menuIds);
        return menuPOS.stream()
                .filter(menu -> "1".equals(menu.getStatus()))
                .filter(menu -> !"3".equals(menu.getType()))
                .map(SystemMenuConverter::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Map<Long, List<String>> findPermissionResourcesByRoleIds(Collection<Long> roleIds) {
        if (roleIds == null || roleIds.isEmpty()) {
            return Collections.emptyMap();
        }
        List<SysRolePermissionPO> relations = sysRolePermissionMapper.selectList(
                new LambdaQueryWrapper<SysRolePermissionPO>().in(SysRolePermissionPO::getRoleId, roleIds));
        List<Long> permissionIds = relations.stream().map(SysRolePermissionPO::getPermissionId).distinct().toList();
        if (permissionIds.isEmpty()) {
            return Collections.emptyMap();
        }
        List<SysPermissionPO> permissions = sysPermissionMapper.selectBatchIds(permissionIds);
        return permissions.stream()
                .filter(permission -> "1".equals(permission.getStatus()))
                .collect(Collectors.groupingBy(SysPermissionPO::getMenuId,
                        Collectors.collectingAndThen(
                                Collectors.flatMapping(permission -> Arrays.stream(
                                                        Optional.ofNullable(permission.getResource()).orElse("")
                                                                .split(";"))
                                                .map(String::trim)
                                                .filter(str -> !str.isEmpty()),
                                        Collectors.toList()),
                                list -> list.stream().distinct().collect(Collectors.toList()))));
    }

    @Override
    public List<String> findUserPermissions(Long userId) {
        List<Long> roleIds = findRoleIdsByUserId(userId);
        Map<Long, List<String>> resources = findPermissionResourcesByRoleIds(roleIds);
        return resources.values().stream().flatMap(Collection::stream).distinct().collect(Collectors.toList());
    }

    @Override
    public boolean existsRouteName(String routeName) {
        Long count = sysMenuMapper.selectCount(
                new LambdaQueryWrapper<SysMenuPO>().eq(SysMenuPO::getRouteName, routeName));
        return count != null && count > 0;
    }

    @Override
    public List<SystemDict> findAllEnabledDicts() {
        List<SysDictPO> dicts = sysDictMapper.selectList(
                new LambdaQueryWrapper<SysDictPO>().eq(SysDictPO::getStatus, "1"));
        if (dicts.isEmpty()) {
            return Collections.emptyList();
        }
        List<Long> dictIds = dicts.stream().map(SysDictPO::getId).toList();
        List<SysDictItemPO> items = sysDictItemMapper.selectList(
                new LambdaQueryWrapper<SysDictItemPO>()
                        .in(SysDictItemPO::getDictId, dictIds)
                        .eq(SysDictItemPO::getStatus, "1"));
        Map<Long, List<SystemDictItem>> itemGroup = items.stream()
                .collect(Collectors.groupingBy(SysDictItemPO::getDictId,
                        Collectors.mapping(this::convertDictItem, Collectors.toList())));
        return dicts.stream()
                .map(dict -> SystemDict.builder()
                        .id(dict.getId())
                        .code(dict.getCode())
                        .name(dict.getName())
                        .type(dict.getType())
                        .status(dict.getStatus())
                        .items(itemGroup.getOrDefault(dict.getId(), Collections.emptyList()))
                        .build())
                .collect(Collectors.toList());
    }
    private SystemDictItem convertDictItem(SysDictItemPO item) {
        return SystemDictItem.builder()
                .id(item.getId())
                .dictId(item.getDictId())
                .dictCode(item.getDictCode())
                .value(item.getValue())
                .zhCn(item.getZhCn())
                .enUs(item.getEnUs())
                .type(item.getType())
                .sort(item.getSort())
                .status(item.getStatus())
                .build();
    }
}
