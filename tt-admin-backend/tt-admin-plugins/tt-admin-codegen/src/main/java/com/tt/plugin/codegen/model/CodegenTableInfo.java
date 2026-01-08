package com.tt.plugin.codegen.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Table metadata")
public class CodegenTableInfo {

    @Schema(description = "Table name")
    private String tableName;

    @Schema(description = "Table comment")
    private String tableComment;
}