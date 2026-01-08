package com.tt.application.permission.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "Permission delete")
public class PermissionDeleteCommand {

    @NotEmpty
    @Schema(description = "Ids")
    private List<Long> ids;
}
