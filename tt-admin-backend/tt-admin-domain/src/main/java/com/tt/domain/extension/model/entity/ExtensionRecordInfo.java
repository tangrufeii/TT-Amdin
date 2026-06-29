package com.tt.domain.extension.model.entity;

import com.tt.common.domain.Entity;
import com.tt.domain.extension.model.enums.ExtensionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * 扩展记录信息实体
 * <p>
 * 属于 ExtensionRecord 聚合根的内部实体，承载扩展元数据快照。
 */
@Data
@EqualsAndHashCode(callSuper = false)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ExtensionRecordInfo extends Entity<String> {

    /**
     * 扩展唯一标识（业务ID）
     */
    private String id;

    /**
     * 扩展名称
     */
    private String name;

    /**
     * 扩展类型
     */
    private ExtensionType type;

    /**
     * 扩展描述
     */
    private String description;

    /**
     * 扩展版本
     */
    private String version;

    /**
     * Manifest 版本号
     */
    private Integer manifestVersion;

    /**
     * 是否单例扩展（主题必须为 true）
     */
    private Boolean singletonFlag;

    /**
     * 安装后是否自动启用
     */
    private Boolean autoEnable;

    /**
     * 启动优先级（值越小越优先）
     */
    private Integer entryPriority;

    /**
     * 扩展声明来源格式（extension-yaml / legacy-plugin）
     */
    private String sourceFormat;

    /**
     * 安装来源（upload / dev-sync / market / migration）
     */
    private String installSource;

    /**
     * 宿主最低兼容版本
     */
    private String hostMinVersion;

    /**
     * 宿主最高兼容版本
     */
    private String hostMaxVersion;

    /**
     * 作者名称
     */
    private String author;

    /**
     * 项目或作者主页
     */
    private String website;

    /**
     * 作者邮箱
     */
    private String email;

    /**
     * 是否开发联调模式
     */
    private Boolean isDev;

    /**
     * 前端开发联调地址
     */
    private String frontDevAddress;

    /**
     * 能力声明 JSON 快照
     */
    private String capabilitiesJson;

    /**
     * 构建产物 JSON 快照
     */
    private String artifactsJson;

    /**
     * Manifest JSON 快照
     */
    private String manifestJson;

    /**
     * 安装包校验摘要
     */
    private String installChecksum;

    /**
     * 扩展状态：0-禁用，1-启用
     */
    private Integer status;

    /**
     * 创建时间（数据库字段）
     */
    private LocalDateTime createTime;

    /**
     * 更新时间（数据库字段）
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
     * 更新扩展基本信息
     *
     * @param name        扩展名称
     * @param description 扩展描述
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
     * 更新开发联调配置
     *
     * @param isDev           是否开发模式
     * @param frontDevAddress 前端开发地址
     */
    public void updateDevConfig(Boolean isDev, String frontDevAddress) {
        this.isDev = isDev;
        this.frontDevAddress = frontDevAddress;
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 更新 Manifest 相关快照
     *
     * @param capabilitiesJson 能力声明 JSON
     * @param artifactsJson    产物声明 JSON
     * @param manifestJson     Manifest JSON
     */
    public void updateManifestSnapshot(String capabilitiesJson, String artifactsJson, String manifestJson) {
        this.capabilitiesJson = capabilitiesJson;
        this.artifactsJson = artifactsJson;
        this.manifestJson = manifestJson;
        this.updateTime = LocalDateTime.now();
    }

    /**
     * 判断扩展是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return Integer.valueOf(1).equals(this.status);
    }
}
