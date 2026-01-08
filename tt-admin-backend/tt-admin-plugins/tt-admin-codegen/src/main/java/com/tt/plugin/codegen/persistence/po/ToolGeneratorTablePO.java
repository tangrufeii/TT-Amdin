package com.tt.plugin.codegen.persistence.po;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("tool_generator_table")
public class ToolGeneratorTablePO {

    @TableId
    private Long id;

    @TableField("table_name")
    private String tableName;

    @TableField("table_comment")
    private String tableComment;

    @TableField("table_prefix")
    private String tablePrefix;

    @TableField("plugin_id")
    private String pluginId;

    @TableField("plugin_name")
    private String pluginName;

    @TableField("version")
    private String version;

    @TableField("parent_package")
    private String parentPackage;

    @TableField("module_name")
    private String moduleName;

    @TableField("route_path")
    private String routePath;

    @TableField("menu_name")
    private String menuName;

    @TableField("i18n_key")
    private String i18nKey;

    @TableField("icon")
    private String icon;

    @TableField("include_table_sql")
    private String includeTableSql;

    @TableField("parent_menu_id")
    private Long parentMenuId;

    @TableField("author")
    private String author;

    @TableField("status")
    private String status;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_time")
    private LocalDateTime updateTime;

    @TableField("create_user")
    private String createUser;

    @TableField("update_user")
    private String updateUser;

    @TableLogic
    @TableField("is_deleted")
    private Integer isDeleted;
}
