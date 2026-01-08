package com.tt.domain.system.access.repository;

import com.tt.domain.system.access.model.SystemDict;
import com.tt.domain.system.access.model.SystemMenu;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 系统访问仓储
 */
public interface SystemAccessRepository {

    List<Long> findRoleIdsByUserId(Long userId);

    List<String> findRoleCodesByUserId(Long userId);

    List<Long> findRoleIdsByCodes(Collection<String> roleCodes);

    List<SystemMenu> findMenusByRoleIds(Collection<Long> roleIds);

    Map<Long, List<String>> findPermissionResourcesByRoleIds(Collection<Long> roleIds);

    List<String> findUserPermissions(Long userId);

    boolean existsRouteName(String routeName);

    List<SystemDict> findAllEnabledDicts();
}
