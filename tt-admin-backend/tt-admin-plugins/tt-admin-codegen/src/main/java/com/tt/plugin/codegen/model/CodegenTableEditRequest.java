package com.tt.plugin.codegen.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CodegenTableEditRequest {
    private Long id;

    @NotBlank(message = "tableName is required")
    private String tableName;

    private String tableComment;

    private String tablePrefix;

    @NotBlank(message = "pluginId is required")
    private String pluginId;

    @NotBlank(message = "pluginName is required")
    private String pluginName;

    private String version;

    @NotBlank(message = "parentPackage is required")
    private String parentPackage;

    @NotBlank(message = "moduleName is required")
    private String moduleName;

    private String routePath;

    private String menuName;

    private String i18nKey;

    private String icon;

    private String includeTableSql;

    private Long parentMenuId;

    @NotBlank(message = "author is required")
    private String author;

    private String status;
}
