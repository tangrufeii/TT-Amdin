package com.tt.domain.plugin.model.aggregate;

import com.tt.common.api.ResultCode;
import com.tt.common.domain.AggregateRoot;
import com.tt.common.domain.DomainException;
import com.tt.domain.plugin.model.entity.PluginManagementInfo;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.event.PluginInstalledEvent;
import com.tt.domain.plugin.model.event.PluginStatusChangedEvent;
import com.tt.domain.plugin.model.event.PluginUninstalledEvent;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * 插件管理聚合根
 * <p>
 * 负责管理插件的完整生命周期，包括：
 * 1. 插件的安装和卸载
 * 2. 插件状态的启用和禁用
 * 3. 插件信息的维护
 * 4. 插件版本管理
 * <p>
 * 与运行时Plugin聚合根的区别：
 * - PluginManagement：负责数据库中插件记录的管理（CRUD）
 * - Plugin：负责插件运行时的加载和执行
 * <p>
 * ID说明：
 * - dbId: 数据库主键ID（Long，自增）
 * - id: 插件业务ID（String，唯一标识）
 *
 * @author tt
 * @date 2025/12/24
 */
@Getter
@SuperBuilder
@Slf4j
@AllArgsConstructor
public class PluginManagement extends AggregateRoot<String> {
    /**
     * 数据库主键ID（用于数据库操作）
     */
    private Long dbId;

    /**
     * 插件业务ID（唯一标识，聚合根ID）
     */
    private String id;

    /**
     * 插件信息实体
     */
    private PluginManagementInfo pluginInfo;

    /**
     * 插件状态值对象
     */
    private PluginManagementStatus status;


    /**
     * 创建新插件记录（用于安装插件时）
     *
     * @param id          插件ID（唯一标识）
     * @param name        插件名称
     * @param description 插件描述
     * @param version     版本号
     * @param author      作者
     * @param email       邮箱
     * @param website     网址
     * @return 插件管理聚合根
     */
    public static PluginManagement create(
            String id,
            String name,
            String description,
            String version,
            String author,
            String email,
            String website
    ) {
        PluginManagementInfo info = PluginManagementInfo.builder()
                .id(id)
                .name(name)
                .description(description)
                .version(version)
                .author(author)
                .email(email)
                .website(website)
                .isDev(false)
                .status(0) // 默认禁用状态
                .build();

        PluginManagement plugin = PluginManagement.builder()
                .id(id) // 使用pluginId作为聚合根ID
                .pluginInfo(info)
                .status(PluginManagementStatus.DISABLED)
                .build();

        // 添加插件安装事件
        plugin.addDomainEvent(new PluginInstalledEvent(id, name));

        return plugin;
    }

    /**
     * 从已有信息构建插件管理对象（用于从数据库恢复）
     *
     * @param dbId       数据库主键ID
     * @param pluginInfo 插件信息
     * @return 插件管理聚合根
     */
    public static PluginManagement reconstruct(Long dbId, PluginManagementInfo pluginInfo) {
        PluginManagement plugin = PluginManagement.builder()
                .dbId(dbId)
                .id(pluginInfo.getId()) // 使用pluginId作为聚合根ID
                .pluginInfo(pluginInfo)
                .status(PluginManagementStatus.fromCode(pluginInfo.getStatus()))
                .build();
        plugin.setCreatedAt(pluginInfo.getCreateTime() != null ? pluginInfo.getCreateTime() : pluginInfo.getCreatedAt());
        plugin.setUpdatedAt(pluginInfo.getUpdateTime() != null ? pluginInfo.getUpdateTime() : pluginInfo.getUpdatedAt());
        return plugin;
    }

    /**
     * 启用插件
     * <p>
     * 启用插件后，插件可以被系统加载和执行
     */
    public void enable() {
        if (this.status.isEnabled()) {
            return; // 已经是启用状态，无需重复操作
        }

        this.status = PluginManagementStatus.ENABLED;
        this.pluginInfo.setStatus(1);
        markAsChanged();
        // 添加插件状态变更事件
        addDomainEvent(new PluginStatusChangedEvent(
                this.id, // 使用聚合根ID
                this.pluginInfo.getName(),
                PluginManagementStatus.ENABLED
        ));
    }

    /**
     * 禁用插件
     * <p>
     * 禁用插件后，插件将不会被系统加载
     */
    public void disable() {
        if (this.status.isDisabled()) {
            return; // 已经是禁用状态，无需重复操作
        }

        this.status = PluginManagementStatus.DISABLED;
        this.pluginInfo.setStatus(0);
        markAsChanged();

        // 添加插件状态变更事件
        addDomainEvent(new PluginStatusChangedEvent(
                this.id, // 使用聚合根ID
                this.pluginInfo.getName(),
                PluginManagementStatus.DISABLED
        ));
    }

    /**
     * 卸载插件
     * <p>
     * 卸载操作会删除插件记录，需要在应用层配合清理相关资源
     */
    public void uninstall() {
        // 添加插件卸载事件
        addDomainEvent(new PluginUninstalledEvent(
                this.id, // 使用聚合根ID
                this.pluginInfo.getName()
        ));
    }

    /**
     * 更新插件基本信息
     *
     * @param name        插件名称
     * @param description 插件描述
     * @param version     版本号
     */
    public void updateInfo(String name, String description, String version) {
        this.pluginInfo.updateBasicInfo(name, description, version);
        markAsChanged();
    }

    /**
     * 更新开发者信息
     *
     * @param author  作者
     * @param email   邮箱
     * @param website 网址
     */
    public void updateAuthorInfo(String author, String email, String website) {
        this.pluginInfo.updateAuthorInfo(author, email, website);
        markAsChanged();
    }

    /**
     * 更新开发环境配置
     *
     * @param isDev           是否开发环境
     * @param frontDevAddress 前端开发地址
     */
    public void updateDevConfig(Boolean isDev, String frontDevAddress) {
        this.pluginInfo.updateDevConfig(isDev, frontDevAddress);
        markAsChanged();
    }

    /**
     * 获取插件ID（唯一标识）
     *
     * @return 插件ID
     */
    public String getPluginId() {
        return this.id;
    }

    /**
     * 获取插件名称
     *
     * @return 插件名称
     */
    public String getName() {
        return this.pluginInfo.getName();
    }

    /**
     * 判断插件是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return this.status.isEnabled();
    }
}