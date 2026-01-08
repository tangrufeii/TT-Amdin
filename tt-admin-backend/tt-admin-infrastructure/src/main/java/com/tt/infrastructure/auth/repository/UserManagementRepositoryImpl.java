package com.tt.infrastructure.auth.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.application.user.command.UserCreateCommand;
import com.tt.application.user.command.UserPageQueryCommand;
import com.tt.application.user.command.UserUpdateCommand;
import com.tt.application.user.dto.UserManageDTO;
import com.tt.application.user.repository.UserManagementRepository;
import com.tt.domain.auth.user.model.valobj.Password;
import com.tt.infrastructure.auth.persistence.mapper.UserMapper;
import com.tt.infrastructure.auth.persistence.po.UserPO;
import com.tt.infrastructure.system.persistence.mapper.SysRoleMapper;
import com.tt.infrastructure.system.persistence.mapper.SysUserRoleMapper;
import com.tt.infrastructure.system.persistence.po.SysRolePO;
import com.tt.infrastructure.system.persistence.po.SysUserRolePO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class UserManagementRepositoryImpl implements UserManagementRepository {

    private final UserMapper userMapper;
    private final SysUserRoleMapper sysUserRoleMapper;
    private final SysRoleMapper sysRoleMapper;

    @Override
    public IPage<UserManageDTO> page(UserPageQueryCommand command) {
        LambdaQueryWrapper<UserPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.like(command.getUserName() != null && !command.getUserName().isBlank(), UserPO::getUserName, command.getUserName());
        wrapper.eq(command.getPhone() != null && !command.getPhone().isBlank(), UserPO::getPhone, command.getPhone());
        wrapper.eq(command.getStatus() != null && !command.getStatus().isBlank(), UserPO::getStatus, command.getStatus());
        wrapper.orderByDesc(UserPO::getCreateTime);

        IPage<UserPO> page = userMapper.selectPage(command.buildPage(), wrapper);
        List<UserPO> records = page.getRecords();
        if (records == null || records.isEmpty()) {
            return page.convert(item -> new UserManageDTO());
        }

        List<Long> userIds = records.stream().map(UserPO::getId).toList();
        Map<Long, List<Long>> roleIdMap = queryRoleIdsByUserIds(userIds);
        Map<Long, String> roleNameMap = queryRoleNames(roleIdMap.values().stream().flatMap(Collection::stream).distinct().toList());

        return page.convert(po -> buildUserDTO(po, roleIdMap, roleNameMap));
    }

    @Override
    public UserManageDTO get(Long id) {
        UserPO po = userMapper.selectById(id);
        if (po == null) {
            return null;
        }
        Map<Long, List<Long>> roleIdMap = queryRoleIdsByUserIds(List.of(id));
        Map<Long, String> roleNameMap = queryRoleNames(roleIdMap.getOrDefault(id, List.of()));
        return buildUserDTO(po, roleIdMap, roleNameMap);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(UserCreateCommand command, Password password, LocalDateTime now) {
        UserPO po = UserPO.builder()
                .id(IdWorker.getId())
                .userName(command.getUserName())
                .password(password.getHash())
                .salt(password.getSalt())
                .nickName(command.getNickName())
                .realName(command.getRealName())
                .phone(command.getPhone())
                .email(command.getEmail())
                .status(Optional.ofNullable(command.getStatus()).orElse("1"))
                .createTime(now)
                .isDeleted(false)
                .build();

        userMapper.insert(po);
        saveUserRoles(po.getId(), command.getRoleIds(), now);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(UserUpdateCommand command, LocalDateTime now) {
        UserPO existing = userMapper.selectById(command.getId());
        if (existing == null) {
            return;
        }

        existing.setUserName(Optional.ofNullable(command.getUserName()).orElse(existing.getUserName()));
        existing.setNickName(command.getNickName());
        existing.setRealName(command.getRealName());
        existing.setPhone(command.getPhone());
        existing.setEmail(command.getEmail());
        existing.setStatus(Optional.ofNullable(command.getStatus()).orElse(existing.getStatus()));
        existing.setUpdateTime(now);

        userMapper.updateById(existing);
        saveUserRoles(existing.getId(), command.getRoleIds(), now);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        ids.forEach(userMapper::deleteById);
        sysUserRoleMapper.delete(new LambdaQueryWrapper<SysUserRolePO>().in(SysUserRolePO::getUserId, ids));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean resetPassword(Long userId, Password password, LocalDateTime now) {
        UserPO existing = userMapper.selectById(userId);
        if (existing == null) {
            return false;
        }
        existing.setPassword(password.getHash());
        existing.setSalt(password.getSalt());
        existing.setUpdatePasswordTime(now);
        userMapper.updateById(existing);
        return true;
    }

    @Override
    public boolean existsByUserName(String userName, Long excludeId) {
        if (userName == null || userName.isBlank()) {
            return false;
        }
        Long count = userMapper.selectCount(new LambdaQueryWrapper<UserPO>()
                .eq(UserPO::getUserName, userName)
                .ne(excludeId != null, UserPO::getId, excludeId));
        return count != null && count > 0;
    }

    private void saveUserRoles(Long userId, List<Long> roleIds, LocalDateTime now) {
        sysUserRoleMapper.delete(new LambdaQueryWrapper<SysUserRolePO>().eq(SysUserRolePO::getUserId, userId));
        if (roleIds == null || roleIds.isEmpty()) {
            return;
        }
        roleIds.stream()
                .filter(Objects::nonNull)
                .distinct()
                .forEach(roleId -> {
                    SysUserRolePO relation = new SysUserRolePO();
                    relation.setId(IdWorker.getId());
                    relation.setUserId(userId);
                    relation.setRoleId(roleId);
                    relation.setCreateTime(now);
                    sysUserRoleMapper.insert(relation);
                });
    }

    private Map<Long, List<Long>> queryRoleIdsByUserIds(List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return Collections.emptyMap();
        }
        List<SysUserRolePO> relations = sysUserRoleMapper.selectList(
                new LambdaQueryWrapper<SysUserRolePO>().in(SysUserRolePO::getUserId, userIds));
        return relations.stream().collect(Collectors.groupingBy(SysUserRolePO::getUserId,
                Collectors.mapping(SysUserRolePO::getRoleId, Collectors.toList())));
    }

    private Map<Long, String> queryRoleNames(List<Long> roleIds) {
        if (roleIds == null || roleIds.isEmpty()) {
            return Collections.emptyMap();
        }
        List<SysRolePO> roles = sysRoleMapper.selectBatchIds(roleIds);
        return roles.stream()
                .filter(role -> role.getId() != null)
                .collect(Collectors.toMap(SysRolePO::getId, SysRolePO::getRoleName, (a, b) -> a));
    }

    private UserManageDTO buildUserDTO(UserPO po, Map<Long, List<Long>> roleIdMap, Map<Long, String> roleNameMap) {
        UserManageDTO dto = new UserManageDTO();
        dto.setId(po.getId());
        dto.setUserName(po.getUserName());
        dto.setNickName(po.getNickName());
        dto.setRealName(po.getRealName());
        dto.setPhone(po.getPhone());
        dto.setEmail(po.getEmail());
        dto.setStatus(po.getStatus());
        dto.setCreateTime(po.getCreateTime());
        List<Long> roleIds = roleIdMap.getOrDefault(po.getId(), List.of());
        dto.setRoleIds(roleIds);
        dto.setRoleNames(roleIds.stream()
                .map(roleNameMap::get)
                .filter(Objects::nonNull)
                .distinct()
                .toList());
        return dto;
    }
}
