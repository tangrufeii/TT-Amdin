package com.tt.plugin.codegen.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Codegen request")
public class CodegenRequest {

    @Schema(description = "Plugin id", example = "tt-plugin-order")
    @NotBlank(message = "pluginId is required")
    private String pluginId;

    @Schema(description = "Plugin name", example = "Order Management")
    @NotBlank(message = "pluginName is required")
    private String pluginName;

    @Schema(description = "Plugin version", example = "1.0.0")
    private String version;

    @Schema(description = "Author")
    private String author;

    @Schema(description = "Module name", example = "order")
    @NotBlank(message = "moduleName is required")
    private String moduleName;

    @Schema(description = "Package name", example = "com.tt.plugin.order")
    @NotBlank(message = "packageName is required")
    private String packageName;

    @Schema(description = "Table name")
    @NotBlank(message = "tableName is required")
    private String tableName;

    @Schema(description = "Table comment")
    private String tableComment;

    @Schema(description = "Route path")
    private String routePath;

    @Schema(description = "Menu name")
    private String menuName;

    @Schema(description = "I18n key")
    private String i18nKey;

    @Schema(description = "Menu icon")
    private String icon;

    @Schema(description = "Table prefix")
    private String tablePrefix;

    @Schema(description = "Include table SQL")
    private Boolean includeTableSql;
}