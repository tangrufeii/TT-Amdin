package com.tt.plugin.codegen.model;

import lombok.Data;

@Data
public class CodegenTableColumnDTO {
    private Long id;
    private Long tableId;
    private String tableName;
    private String columnName;
    private String propertyName;
    private String columnComment;
    private String dataType;
    private String javaType;
    private String typeScriptType;
    private Integer ordinalPosition;
    private String i18n;
    private String required;
    private String list;
    private String search;
    private String searchType;
    private String added;
    private String edit;
    private String dictCode;
    private String renderType;
    private String formDisabled;
    private String formReadonly;
    private Integer minLength;
    private Integer maxLength;
    private Double minValue;
    private Double maxValue;
    private String pattern;
    private String componentProps;
    private Integer formSpan;
    private Integer searchSpan;
    private Integer listWidth;
    private String placeholder;
    private String defaultValue;
    private String status;
}
