package com.tt.application.notice.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "Notice delete")
public class NoticeDeleteCommand {

    @NotEmpty
    @Schema(description = "Ids")
    private List<Long> ids;
}
