package com.tt.plugin.codegen.persistence.po;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("tool_generator_table_column")
public class ToolGeneratorTableColumnPO {

    @TableId
    private Long id;

    @TableField("table_id")
    private Long tableId;

    @TableField("table_name")
    private String tableName;

    @TableField("column_name")
    private String columnName;

    @TableField("property_name")
    private String propertyName;

    @TableField("column_comment")
    private String columnComment;

    @TableField("data_type")
    private String dataType;

    @TableField("java_type")
    private String javaType;

    @TableField("typescript_type")
    private String typeScriptType;

    @TableField("ordinal_position")
    private Integer ordinalPosition;

    @TableField("is_i18n")
    private String i18n;

    @TableField("is_required")
    private String required;

    @TableField("is_list")
    private String list;

    @TableField("is_search")
    private String search;

    @TableField("search_type")
    private String searchType;

    @TableField("is_added")
    private String added;

    @TableField("is_edit")
    private String edit;

    @TableField("dict_code")
    private String dictCode;

    @TableField("render_type")
    private String renderType;

    @TableField("form_disabled")
    private String formDisabled;

    @TableField("form_readonly")
    private String formReadonly;

    @TableField("min_length")
    private Integer minLength;

    @TableField("max_length")
    private Integer maxLength;

    @TableField("min_value")
    private Double minValue;

    @TableField("max_value")
    private Double maxValue;

    @TableField("pattern")
    private String pattern;

    @TableField("component_props")
    private String componentProps;

    @TableField("form_span")
    private Integer formSpan;

    @TableField("search_span")
    private Integer searchSpan;

    @TableField("list_width")
    private Integer listWidth;

    @TableField("placeholder")
    private String placeholder;

    @TableField("default_value")
    private String defaultValue;

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
