package com.tt.infrastructure.plugin.convert;

import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.entity.PluginManagementInfo;
import com.tt.infrastructure.plugin.persistence.po.PluginManagementPO;
import org.springframework.stereotype.Component;

/**
 * 插件管理转换器
 * <p>
 * 负责在领域对象与持久化对象之间进行转换
 * <p>
 * ID说明：
 * - dbId/id (PO): 数据库主键ID (Long)
 * - pluginId (PO): 插件业务ID (String)
 * - dbId (Aggregate): 数据库主键ID (Long)
 * - id (Aggregate/Info): 插件业务ID (String)
 *
 * @author tt
 * @date 2025/12/24
 */
@Component
public class PluginManagementConvert {

    /**
     * 将PO转换为领域对象
     * <p>
     * 此方法用于从数据库恢复聚合根
     *
     * @param po 持久化对象
     * @return 插件管理聚合根
     */
    public static PluginManagement toDomain(PluginManagementPO po) {
        if (po == null) {
            return null;
        }

        // 构建插件信息实体
        PluginManagementInfo info = PluginManagementInfo.builder()
                .id(po.getPluginId()) // 使用pluginId作为实体ID
                .name(po.getName())
                .description(po.getDesc())
                .version(po.getVersion())
                .author(po.getAuthor())
                .email(po.getEmail())
                .website(po.getWebsite())
                .isDev(po.getIsDev())
                .frontDevAddress(po.getFrontDevAddress())
                .status(po.getStatus())
                .createTime(po.getCreateTime())
                .updateTime(po.getUpdateTime())
                .createUserId(po.getCreateUserId())
                .updateUserId(po.getUpdateUserId())
                .build();

        // 重建聚合根，使用数据库主键ID和插件信息
        return PluginManagement.reconstruct(po.getId(), info);
    }

    /**
     * 将领域对象转换为PO
     * <p>
     * 此方法用于将聚合根持久化到数据库
     *
     * @param plugin 插件管理聚合根
     * @return 持久化对象
     */
    public static PluginManagementPO toPO(PluginManagement plugin) {
        if (plugin == null) {
            return null;
        }

        PluginManagementInfo info = plugin.getPluginInfo();
        if (info == null) {
            return null;
        }

        return PluginManagementPO.builder()
                .id(plugin.getDbId()) // 使用dbId作为数据库主键
                .pluginId(plugin.getId()) // 使用聚合根ID作为pluginId
                .name(info.getName())
                .desc(info.getDescription())
                .version(info.getVersion())
                .author(info.getAuthor())
                .email(info.getEmail())
                .website(info.getWebsite())
                .isDev(info.getIsDev())
                .frontDevAddress(info.getFrontDevAddress())
                .status(info.getStatus())
                .createTime(info.getCreateTime())
                .updateTime(info.getUpdateTime())
                .createUserId(info.getCreateUserId())
                .updateUserId(info.getUpdateUserId())
                .build();
    }

    /**
     * 更新PO对象
     * <p>
     * 此方法用于更新操作，避免直接替换整个对象
     *
     * @param po     持久化对象
     * @param plugin 插件管理聚合根
     */
    public static void updatePO(PluginManagementPO po, PluginManagement plugin) {
        if (po == null || plugin == null) {
            return;
        }

        PluginManagementInfo info = plugin.getPluginInfo();
        if (info != null) {
            // 更新时保持主键不变
            po.setName(info.getName());
            po.setDesc(info.getDescription());
            po.setVersion(info.getVersion());
            po.setAuthor(info.getAuthor());
            po.setEmail(info.getEmail());
            po.setWebsite(info.getWebsite());
            po.setIsDev(info.getIsDev());
            po.setFrontDevAddress(info.getFrontDevAddress());
            po.setStatus(info.getStatus());
        }

        // 更新时间由 MyBatis-Plus 自动填充
    }
}