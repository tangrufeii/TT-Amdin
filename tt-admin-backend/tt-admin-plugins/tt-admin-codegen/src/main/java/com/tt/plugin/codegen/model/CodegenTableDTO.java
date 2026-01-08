package com.tt.plugin.codegen.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CodegenTableDTO {
    private Long id;
    private String tableName;
    private String tableComment;
    private String tablePrefix;
    private String pluginId;
    private String pluginName;
    private String version;
    private String parentPackage;
    private String moduleName;
    private String routePath;
    private String menuName;
    private String i18nKey;
    private String icon;
    private String includeTableSql;
    private Long parentMenuId;
    private String author;
    private String status;
    private LocalDateTime createTime;
}
