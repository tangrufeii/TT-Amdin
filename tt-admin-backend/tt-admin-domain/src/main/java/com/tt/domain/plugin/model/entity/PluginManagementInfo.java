package com.tt.domain.plugin.model.entity;

import com.tt.common.domain.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * 插件管理信息实体
 * <p>
 * 属于PluginManagement聚合根的一部分
 * 负责存储插件的基本配置信息
 * <p>
 * 注意：此实体不应被直接实例化，应通过聚合根创建和管理
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PluginManagementInfo extends Entity<String> {

    /**
     * 插件ID（唯一标识）
     */
    private String id;

    /**
     * 插件名称
     */
    private String name;

    /**
     * 插件描述
     */
    private String description;

    /**
     * 版本号
     */
    private String version;

    /**
     * 作者
     */
    private String author;

    /**
     * 官方网址
     */
    private String website;

    /**
     * 联系邮箱
     */
    private String email;

    /**
     * 是否为开发环境插件
     */
    private Boolean isDev;

    /**
     * 开发环境前端地址（用于开发模式下的热更新）
     */
    private String frontDevAddress;

    /**
     * 插件状态：0-禁用，1-启用
     */
    private Integer status;

    /**
     * 数据库创建时间（与实体创建时间区分）
     */
    private LocalDateTime createTime;

    /**
     * 数据库更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 创建人ID
     */
    private Long createUserId;

    /**
     * 更新人ID
     */
    private Long updateUserId;

    /**
     * 更新插件基本信息
     *
     * @param name        插件名称
     * @param description 插件描述
     * @param version     版本号
     */
    public void updateBasicInfo(String name, String description, String version) {
        if (name != null && !name.isBlank()) {
            this.name = name;
        }
        if (description != null) {
            this.description = description;
        }
        if (version != null && !version.isBlank()) {
            this.version = version;
        }
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 更新开发者信息
     *
     * @param author  作者
     * @param email   邮箱
     * @param website 网址
     */
    public void updateAuthorInfo(String author, String email, String website) {
        if (author != null) {
            this.author = author;
        }
        if (email != null) {
            this.email = email;
        }
        if (website != null) {
            this.website = website;
        }
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 更新开发环境配置
     *
     * @param isDev            是否开发环境
     * @param frontDevAddress  前端开发地址
     */
    public void updateDevConfig(Boolean isDev, String frontDevAddress) {
        this.isDev = isDev;
        this.frontDevAddress = frontDevAddress;
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 判断插件是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return Integer.valueOf(1).equals(this.status);
    }

}