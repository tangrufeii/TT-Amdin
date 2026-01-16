package com.tt.domain.system.menu.repository;

import com.tt.domain.system.access.model.SystemMenu;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Repository abstraction for system menus.
 */
public interface SystemMenuRepository {

    List<SystemMenu> findAll();

    Optional<SystemMenu> findById(Long id);

    Optional<SystemMenu> findByCode(String code);

    Optional<SystemMenu> findByRouteName(String routeName);

    void insert(SystemMenu menu);

    void update(SystemMenu menu);

    void deleteByIds(Collection<Long> ids);

    void deleteRoleMenuRelations(Collection<Long> menuIds);

    void bindMenuToRoles(Long menuId, Collection<Long> roleIds);

    List<Long> findPermissionIdsByMenuIds(Collection<Long> menuIds);

    void deletePermissionsByIds(Collection<Long> permissionIds);

    void deleteRolePermissionRelations(Collection<Long> permissionIds);

    boolean existsRouteName(String routeName, Long excludeId);

    boolean existsPath(String path, Long excludeId);

    List<SystemMenu> findBySource(String sourceType, String sourceId);
}
