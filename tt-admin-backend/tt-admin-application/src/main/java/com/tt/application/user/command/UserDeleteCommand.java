package com.tt.application.user.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "删除用户")
public class UserDeleteCommand {

    @NotEmpty(message = "用户ID不能为空")
    @Schema(description = "用户ID列表", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Long> ids;
}
