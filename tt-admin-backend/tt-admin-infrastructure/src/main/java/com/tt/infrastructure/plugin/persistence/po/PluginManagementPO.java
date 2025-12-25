package com.tt.infrastructure.plugin.persistence.po;

import com.baomidou.mybatisplus.annotation.*;
import com.tt.infrastructure.common.po.BasePo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 插件管理持久化对象
 * <p>
 * 对应数据库表 sys_plugin
 * 使用 MyBatis-Plus 注解进行ORM映射
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_plugin")
public class PluginManagementPO extends BasePo {

    /**
     * 数据库主键ID（自增）
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 插件ID（唯一标识，业务主键）
     */
    @TableField("pluginId")
    private String pluginId;

    /**
     * 插件名称
     */
    @TableField("name")
    private String name;

    /**
     * 插件描述
     */
    @TableField("`desc`")
    private String desc;

    /**
     * 版本号
     */
    @TableField("version")
    private String version;

    /**
     * 作者
     */
    @TableField("author")
    private String author;

    /**
     * 官方网址
     */
    @TableField("website")
    private String website;

    /**
     * 联系邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 是否为开发环境插件
     */
    @TableField("isDev")
    private Boolean isDev;

    /**
     * 开发环境前端地址
     */
    @TableField("frontDevAddress")
    private String frontDevAddress;

    /**
     * 插件状态：0-禁用，1-启用
     */
    @TableField("status")
    private Integer status;

    /**
     * 创建时间
     */
    @TableField(value = "createTime", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(value = "updateTime", fill = FieldFill.UPDATE)
    private LocalDateTime updateTime;

    /**
     * 创建人ID
     */
    @TableField(value = "createUserId", fill = FieldFill.INSERT)
    private Long createUserId;

    /**
     * 更新人ID
     */
    @TableField(value = "updateUserId", fill = FieldFill.UPDATE)
    private Long updateUserId;
}