package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.application.permission.command.PermissionCreateCommand;
import com.tt.application.permission.command.PermissionPageQueryCommand;
import com.tt.application.permission.command.PermissionUpdateCommand;
import com.tt.application.permission.dto.MenuPermissionButtonDTO;
import com.tt.application.permission.dto.MenuPermissionDTO;
import com.tt.application.permission.dto.PermissionManageDTO;
import com.tt.application.permission.repository.PermissionManagementRepository;
import com.tt.infrastructure.system.persistence.mapper.SysMenuMapper;
import com.tt.infrastructure.system.persistence.mapper.SysPermissionMapper;
import com.tt.infrastructure.system.persistence.po.SysMenuPO;
import com.tt.infrastructure.system.persistence.po.SysPermissionPO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class PermissionManagementRepositoryImpl implements PermissionManagementRepository {

    private final SysPermissionMapper sysPermissionMapper;
    private final SysMenuMapper sysMenuMapper;

    @Override
    public IPage<PermissionManageDTO> page(PermissionPageQueryCommand command) {
        LambdaQueryWrapper<SysPermissionPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(command.getMenuId() != null, SysPermissionPO::getMenuId, command.getMenuId());
        wrapper.like(StringUtils.hasText(command.getName()), SysPermissionPO::getName, command.getName());
        wrapper.like(StringUtils.hasText(command.getResource()), SysPermissionPO::getResource, command.getResource());
        wrapper.eq(StringUtils.hasText(command.getStatus()), SysPermissionPO::getStatus, command.getStatus());
        wrapper.orderByAsc(SysPermissionPO::getSort, SysPermissionPO::getId);

        IPage<SysPermissionPO> page = sysPermissionMapper.selectPage(command.buildPage(), wrapper);
        return page.convert(this::convert);
    }

    @Override
    public PermissionManageDTO get(Long id) {
        SysPermissionPO po = sysPermissionMapper.selectById(id);
        return po == null ? null : convert(po);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(PermissionCreateCommand command, LocalDateTime now) {
        SysPermissionPO po = new SysPermissionPO();
        po.setId(IdWorker.getId());
        po.setMenuId(command.getMenuId());
        po.setName(command.getName());
        String code = StringUtils.hasText(command.getCode()) ? command.getCode() : command.getResource();
        po.setCode(code);
        po.setResource(command.getResource());
        po.setSort(Optional.ofNullable(command.getSort()).orElse(0));
        po.setDescription(command.getDescription());
        po.setStatus(Optional.ofNullable(command.getStatus()).orElse("1"));
        po.setCreateTime(now);
        sysPermissionMapper.insert(po);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(PermissionUpdateCommand command, LocalDateTime now) {
        SysPermissionPO existing = sysPermissionMapper.selectById(command.getId());
        if (existing == null) {
            return;
        }
        existing.setMenuId(command.getMenuId());
        existing.setName(command.getName());
        String code = StringUtils.hasText(command.getCode()) ? command.getCode() : command.getResource();
        existing.setCode(code);
        existing.setResource(command.getResource());
        existing.setSort(Optional.ofNullable(command.getSort()).orElse(0));
        existing.setDescription(command.getDescription());
        existing.setStatus(Optional.ofNullable(command.getStatus()).orElse(existing.getStatus()));
        existing.setUpdateTime(now);
        sysPermissionMapper.updateById(existing);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysPermissionMapper.delete(new LambdaQueryWrapper<SysPermissionPO>().in(SysPermissionPO::getId, ids));
    }

    @Override
    public Map<String, String> findResourceAnnotations() {
        List<SysPermissionPO> list = sysPermissionMapper.selectList(new LambdaQueryWrapper<>());
        return list.stream()
                .filter(item -> StringUtils.hasText(item.getResource()))
                .collect(Collectors.toMap(
                        SysPermissionPO::getResource,
                        item -> StringUtils.hasText(item.getDescription()) ? item.getDescription() : item.getName(),
                        (a, b) -> a));
    }

    @Override
    public List<MenuPermissionDTO> listMenuPermissions() {
        List<SysPermissionPO> permissions = sysPermissionMapper.selectList(
                new LambdaQueryWrapper<SysPermissionPO>()
                        .eq(SysPermissionPO::getStatus, "1")
                        .orderByAsc(SysPermissionPO::getSort, SysPermissionPO::getId));
        if (permissions.isEmpty()) {
            return List.of();
        }
        Map<Long, List<SysPermissionPO>> grouped = permissions.stream()
                .filter(item -> item.getMenuId() != null)
                .collect(Collectors.groupingBy(SysPermissionPO::getMenuId));
        if (grouped.isEmpty()) {
            return List.of();
        }
        List<Long> menuIds = grouped.keySet().stream().toList();
        List<SysMenuPO> menus = sysMenuMapper.selectList(new LambdaQueryWrapper<SysMenuPO>()
                .in(SysMenuPO::getId, menuIds)
                .ne(SysMenuPO::getType, "3")
                .orderByAsc(SysMenuPO::getSort, SysMenuPO::getId));
        List<MenuPermissionDTO> result = new ArrayList<>();
        for (SysMenuPO menu : menus) {
            Long menuId = menu.getId();
            List<SysPermissionPO> menuPermissions = grouped.get(menuId);
            if (menuPermissions == null || menuPermissions.isEmpty()) {
                continue;
            }
            MenuPermissionDTO dto = new MenuPermissionDTO();
            dto.setMenuId(menuId);
            dto.setMenuName(menu.getName());
            dto.setI18nKey(menu.getI18nKey());
            List<MenuPermissionButtonDTO> buttons = menuPermissions.stream()
                    .map(permission -> {
                        MenuPermissionButtonDTO button = new MenuPermissionButtonDTO();
                        button.setId(permission.getId());
                        button.setName(permission.getName());
                        button.setResource(permission.getResource());
                        return button;
                    })
                    .toList();
            dto.setButtons(buttons);
            result.add(dto);
        }
        return result;
    }

    @Override
    public List<PermissionManageDTO> listByMenuId(Long menuId) {
        if (menuId == null) {
            return List.of();
        }
        List<SysPermissionPO> list = sysPermissionMapper.selectList(
                new LambdaQueryWrapper<SysPermissionPO>()
                        .eq(SysPermissionPO::getMenuId, menuId)
                        .orderByAsc(SysPermissionPO::getSort, SysPermissionPO::getId));
        return list.stream().map(this::convert).toList();
    }

    private PermissionManageDTO convert(SysPermissionPO po) {
        PermissionManageDTO dto = new PermissionManageDTO();
        dto.setId(po.getId());
        dto.setMenuId(po.getMenuId());
        dto.setName(po.getName());
        dto.setCode(po.getCode());
        dto.setResource(po.getResource());
        dto.setSort(po.getSort());
        dto.setDescription(po.getDescription());
        dto.setStatus(po.getStatus());
        dto.setCreateTime(po.getCreateTime());
        dto.setUpdateTime(po.getUpdateTime());
        return dto;
    }
}
