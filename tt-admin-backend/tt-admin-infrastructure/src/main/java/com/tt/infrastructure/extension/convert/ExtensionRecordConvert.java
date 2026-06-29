package com.tt.infrastructure.extension.convert;

import com.tt.domain.extension.model.aggregate.ExtensionRecord;
import com.tt.domain.extension.model.entity.ExtensionRecordInfo;
import com.tt.domain.extension.model.enums.ExtensionType;
import com.tt.infrastructure.extension.persistence.po.ExtensionRecordPO;
import org.springframework.stereotype.Component;

/**
 * 扩展记录转换器
 * <p>
 * 负责领域聚合和持久化对象之间的转换。
 */
@Component
public class ExtensionRecordConvert {

    /**
     * 将持久化对象转换为领域聚合根
     *
     * @param po 持久化对象
     * @return 领域聚合根
     */
    public static ExtensionRecord toDomain(ExtensionRecordPO po) {
        if (po == null) {
            return null;
        }

        ExtensionRecordInfo info = ExtensionRecordInfo.builder()
                .id(po.getExtensionId())
                .name(po.getName())
                .type(ExtensionType.fromCode(po.getType()))
                .description(po.getDescription())
                .version(po.getVersion())
                .status(po.getStatus())
                .manifestVersion(po.getManifestVersion())
                .singletonFlag(po.getSingletonFlag())
                .autoEnable(po.getAutoEnable())
                .entryPriority(po.getEntryPriority())
                .sourceFormat(po.getSourceFormat())
                .installSource(po.getInstallSource())
                .hostMinVersion(po.getHostMinVersion())
                .hostMaxVersion(po.getHostMaxVersion())
                .author(po.getAuthor())
                .website(po.getWebsite())
                .email(po.getEmail())
                .isDev(po.getIsDev())
                .frontDevAddress(po.getFrontDevAddress())
                .capabilitiesJson(po.getCapabilitiesJson())
                .artifactsJson(po.getArtifactsJson())
                .manifestJson(po.getManifestJson())
                .installChecksum(po.getInstallChecksum())
                .createTime(po.getCreatedAt())
                .updateTime(po.getUpdatedAt())
                .createUserId(po.getCreatedBy())
                .updateUserId(po.getUpdatedBy())
                .build();

        return ExtensionRecord.reconstruct(po.getId(), info);
    }

    /**
     * 将领域聚合根转换为持久化对象
     *
     * @param record 领域聚合根
     * @return 持久化对象
     */
    public static ExtensionRecordPO toPO(ExtensionRecord record) {
        if (record == null || record.getExtensionInfo() == null) {
            return null;
        }

        ExtensionRecordInfo info = record.getExtensionInfo();
        return ExtensionRecordPO.builder()
                .id(record.getDbId())
                .extensionId(record.getExtensionId())
                .name(info.getName())
                .type(info.getType() == null ? null : info.getType().getCode())
                .description(info.getDescription())
                .version(info.getVersion())
                .status(info.getStatus())
                .manifestVersion(info.getManifestVersion())
                .singletonFlag(info.getSingletonFlag())
                .autoEnable(info.getAutoEnable())
                .entryPriority(info.getEntryPriority())
                .sourceFormat(info.getSourceFormat())
                .installSource(info.getInstallSource())
                .hostMinVersion(info.getHostMinVersion())
                .hostMaxVersion(info.getHostMaxVersion())
                .author(info.getAuthor())
                .website(info.getWebsite())
                .email(info.getEmail())
                .isDev(info.getIsDev())
                .frontDevAddress(info.getFrontDevAddress())
                .capabilitiesJson(info.getCapabilitiesJson())
                .artifactsJson(info.getArtifactsJson())
                .manifestJson(info.getManifestJson())
                .installChecksum(info.getInstallChecksum())
                .createdBy(info.getCreateUserId())
                .updatedBy(info.getUpdateUserId())
                .createdAt(info.getCreateTime())
                .updatedAt(info.getUpdateTime())
                .build();
    }
}
