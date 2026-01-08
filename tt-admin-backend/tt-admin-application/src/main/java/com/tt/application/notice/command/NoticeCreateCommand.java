package com.tt.application.notice.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Notice create")
public class NoticeCreateCommand {

    @NotBlank
    @Schema(description = "Category")
    private String category;

    @NotBlank
    @Schema(description = "Title")
    private String title;

    @NotBlank
    @Schema(description = "Content")
    private String content;

    @NotNull
    @Schema(description = "Release time timestamp")
    private Long releaseTime;

    @Schema(description = "Remark")
    private String remark;

    @Schema(description = "Status")
    private String status;
}
