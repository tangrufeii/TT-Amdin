package com.tt.plugin.codegen.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Column metadata")
public class CodegenColumnInfo {

    @Schema(description = "Column name")
    private String columnName;

    @Schema(description = "Column comment")
    private String columnComment;

    @Schema(description = "Database type")
    private String dataType;

    @Schema(description = "Java type")
    private String javaType;

    @Schema(description = "TypeScript type")
    private String tsType;

    @Schema(description = "Primary key")
    private boolean primaryKey;

    @Schema(description = "Nullable")
    private boolean nullable;

    @Schema(description = "Auto increment")
    private boolean autoIncrement;

    @Schema(description = "Length")
    private Integer size;

    @Schema(description = "Scale")
    private Integer scale;
}