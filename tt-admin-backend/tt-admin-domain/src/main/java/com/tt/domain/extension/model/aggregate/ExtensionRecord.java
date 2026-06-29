package com.tt.domain.extension.model.aggregate;

import com.tt.common.domain.AggregateRoot;
import com.tt.domain.extension.model.entity.ExtensionRecordInfo;
import com.tt.domain.extension.model.enums.ExtensionType;
import com.tt.domain.extension.model.valobj.ExtensionRecordStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * 扩展记录聚合根
 * <p>
 * 用于管理扩展包在宿主中的元数据与启停状态。
 */
@Getter
@SuperBuilder
@AllArgsConstructor
public class ExtensionRecord extends AggregateRoot<String> {

    /**
     * 数据库主键ID
     */
    private Long dbId;

    /**
     * 扩展业务ID（唯一标识）
     */
    private String id;

    /**
     * 扩展记录信息实体
     */
    private ExtensionRecordInfo extensionInfo;

    /**
     * 扩展状态值对象
     */
    private ExtensionRecordStatus status;

    /**
     * 创建扩展记录
     *
     * @param extensionId 扩展ID
     * @param name        扩展名称
     * @param type        扩展类型
     * @param version     扩展版本
     * @return 扩展记录聚合根
     */
    public static ExtensionRecord create(String extensionId, String name, ExtensionType type, String version) {
        ExtensionRecordInfo info = ExtensionRecordInfo.builder()
                .id(extensionId)
                .name(name)
                .type(type)
                .version(version)
                .manifestVersion(2)
                .singletonFlag(Boolean.FALSE)
                .autoEnable(Boolean.FALSE)
                .entryPriority(100)
                .sourceFormat("extension-yaml")
                .status(0)
                .isDev(Boolean.FALSE)
                .build();

        return ExtensionRecord.builder()
                .id(extensionId)
                .extensionInfo(info)
                .status(ExtensionRecordStatus.DISABLED)
                .build();
    }

    /**
     * 从数据库记录重建聚合根
     *
     * @param dbId 数据库主键
     * @param info 扩展信息实体
     * @return 扩展记录聚合根
     */
    public static ExtensionRecord reconstruct(Long dbId, ExtensionRecordInfo info) {
        ExtensionRecord record = ExtensionRecord.builder()
                .dbId(dbId)
                .id(info.getId())
                .extensionInfo(info)
                .status(ExtensionRecordStatus.fromCode(info.getStatus()))
                .build();
        record.setCreatedAt(info.getCreateTime() != null ? info.getCreateTime() : record.getCreatedAt());
        record.setUpdatedAt(info.getUpdateTime() != null ? info.getUpdateTime() : record.getUpdatedAt());
        return record;
    }

    /**
     * 启用扩展
     */
    public void enable() {
        if (this.status.isEnabled()) {
            return;
        }
        this.status = ExtensionRecordStatus.ENABLED;
        this.extensionInfo.setStatus(1);
        markAsChanged();
    }

    /**
     * 禁用扩展
     */
    public void disable() {
        if (this.status.isDisabled()) {
            return;
        }
        this.status = ExtensionRecordStatus.DISABLED;
        this.extensionInfo.setStatus(0);
        markAsChanged();
    }

    /**
     * 更新扩展基本信息
     *
     * @param name        名称
     * @param description 描述
     * @param version     版本号
     */
    public void updateBasicInfo(String name, String description, String version) {
        this.extensionInfo.updateBasicInfo(name, description, version);
        markAsChanged();
    }

    /**
     * 更新扩展开发联调配置
     *
     * @param isDev           是否开发模式
     * @param frontDevAddress 前端开发地址
     */
    public void updateDevConfig(Boolean isDev, String frontDevAddress) {
        this.extensionInfo.updateDevConfig(isDev, frontDevAddress);
        markAsChanged();
    }

    /**
     * 更新 Manifest 快照
     *
     * @param capabilitiesJson 能力声明 JSON
     * @param artifactsJson    产物声明 JSON
     * @param manifestJson     Manifest JSON
     */
    public void updateManifestSnapshot(String capabilitiesJson, String artifactsJson, String manifestJson) {
        this.extensionInfo.updateManifestSnapshot(capabilitiesJson, artifactsJson, manifestJson);
        markAsChanged();
    }

    /**
     * 获取扩展业务ID
     *
     * @return 扩展ID
     */
    public String getExtensionId() {
        return this.id;
    }

    /**
     * 获取扩展名称
     *
     * @return 扩展名称
     */
    public String getName() {
        return this.extensionInfo.getName();
    }

    /**
     * 判断扩展是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return this.status.isEnabled();
    }
}
