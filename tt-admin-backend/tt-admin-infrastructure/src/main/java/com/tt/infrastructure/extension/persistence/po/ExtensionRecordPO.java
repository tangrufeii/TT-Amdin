package com.tt.infrastructure.extension.persistence.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 扩展记录持久化对象
 * <p>
 * 对应数据库表：sys_extension
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_extension")
public class ExtensionRecordPO {

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 扩展业务ID
     */
    @TableField("extension_id")
    private String extensionId;

    /**
     * 扩展名称
     */
    @TableField("name")
    private String name;

    /**
     * 扩展类型
     */
    @TableField("type")
    private String type;

    /**
     * 扩展描述
     */
    @TableField("description")
    private String description;

    /**
     * 版本号
     */
    @TableField("version")
    private String version;

    /**
     * 启停状态：0-禁用，1-启用
     */
    @TableField("status")
    private Integer status;

    /**
     * Manifest 版本号
     */
    @TableField("manifest_version")
    private Integer manifestVersion;

    /**
     * 是否单例
     */
    @TableField("singleton_flag")
    private Boolean singletonFlag;

    /**
     * 安装后是否自动启用
     */
    @TableField("auto_enable")
    private Boolean autoEnable;

    /**
     * 装载优先级
     */
    @TableField("entry_priority")
    private Integer entryPriority;

    /**
     * 声明来源格式
     */
    @TableField("source_format")
    private String sourceFormat;

    /**
     * 安装来源
     */
    @TableField("install_source")
    private String installSource;

    /**
     * 宿主最低兼容版本
     */
    @TableField("host_min_version")
    private String hostMinVersion;

    /**
     * 宿主最高兼容版本
     */
    @TableField("host_max_version")
    private String hostMaxVersion;

    /**
     * 作者名称
     */
    @TableField("author")
    private String author;

    /**
     * 作者主页
     */
    @TableField("website")
    private String website;

    /**
     * 联系邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 是否开发模式
     */
    @TableField("is_dev")
    private Boolean isDev;

    /**
     * 前端开发地址
     */
    @TableField("front_dev_address")
    private String frontDevAddress;

    /**
     * 能力声明快照 JSON
     */
    @TableField("capabilities_json")
    private String capabilitiesJson;

    /**
     * 产物声明快照 JSON
     */
    @TableField("artifacts_json")
    private String artifactsJson;

    /**
     * Manifest 快照 JSON
     */
    @TableField("manifest_json")
    private String manifestJson;

    /**
     * 安装包校验摘要
     */
    @TableField("install_checksum")
    private String installChecksum;

    /**
     * 创建人ID
     */
    @TableField("created_by")
    private Long createdBy;

    /**
     * 更新人ID
     */
    @TableField("updated_by")
    private Long updatedBy;

    /**
     * 创建时间
     */
    @TableField("created_at")
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @TableField("updated_at")
    private LocalDateTime updatedAt;
}
