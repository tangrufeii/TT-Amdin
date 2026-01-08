package com.tt.application.notice.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "Notice page query")
public class NoticePageQueryCommand extends PageQuery {

    @Schema(description = "Category")
    private String category;

    @Schema(description = "Title")
    private String title;

    @Schema(description = "Status")
    private String status;
}
