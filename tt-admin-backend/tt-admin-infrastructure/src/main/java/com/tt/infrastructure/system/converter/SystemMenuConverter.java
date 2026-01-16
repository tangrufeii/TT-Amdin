package com.tt.infrastructure.system.converter;

import com.tt.domain.system.access.model.SystemMenu;
import com.tt.infrastructure.system.persistence.po.SysMenuPO;

/**
 * Converter between {@link SysMenuPO} and {@link SystemMenu}.
 */
public final class SystemMenuConverter {

    private SystemMenuConverter() {
    }

    public static SystemMenu toDomain(SysMenuPO po) {
        if (po == null) {
            return null;
        }
        return SystemMenu.builder()
                .id(po.getId())
                .parentId(po.getParentId())
                .type(po.getType())
                .name(po.getName())
                .code(po.getCode())
                .i18nKey(po.getI18nKey())
                .routeName(po.getRouteName())
                .path(po.getPath())
                .component(po.getComponent())
                .icon(po.getIcon())
                .iconType(po.getIconType())
                .permission(po.getPermission())
                .keepAlive(po.getKeepAlive())
                .hide(po.getHide())
                .multiTab(po.getMultiTab())
                .fixedIndexInTab(po.getFixedIndexInTab())
                .href(po.getHref())
                .sort(po.getSort())
                .iframeUrl(po.getIframeUrl())
                .query(po.getQuery())
                .status(po.getStatus())
                .remark(po.getRemark())
                .sourceType(po.getSourceType())
                .sourceId(po.getSourceId())
                .originData(po.getOriginData())
                .createTime(po.getCreateTime())
                .updateTime(po.getUpdateTime())
                .build();
    }

    public static SysMenuPO toPO(SystemMenu menu) {
        if (menu == null) {
            return null;
        }
        SysMenuPO po = new SysMenuPO();
        po.setId(menu.getId());
        po.setParentId(menu.getParentId());
        po.setType(menu.getType());
        po.setName(menu.getName());
        po.setCode(menu.getCode());
        po.setI18nKey(menu.getI18nKey());
        po.setRouteName(menu.getRouteName());
        po.setPath(menu.getPath());
        po.setComponent(menu.getComponent());
        po.setIcon(menu.getIcon());
        po.setIconType(menu.getIconType());
        po.setPermission(menu.getPermission());
        po.setKeepAlive(menu.getKeepAlive());
        po.setHide(menu.getHide());
        po.setMultiTab(menu.getMultiTab());
        po.setFixedIndexInTab(menu.getFixedIndexInTab());
        po.setHref(menu.getHref());
        po.setSort(menu.getSort());
        po.setIframeUrl(menu.getIframeUrl());
        po.setQuery(menu.getQuery());
        po.setStatus(menu.getStatus());
        po.setRemark(menu.getRemark());
        po.setSourceType(menu.getSourceType());
        po.setSourceId(menu.getSourceId());
        po.setOriginData(menu.getOriginData());
        po.setCreateTime(menu.getCreateTime());
        po.setUpdateTime(menu.getUpdateTime());
        return po;
    }
}
