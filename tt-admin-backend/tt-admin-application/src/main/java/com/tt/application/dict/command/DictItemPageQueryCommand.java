package com.tt.application.dict.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "字典项分页查询参数")
public class DictItemPageQueryCommand extends PageQuery {

    @Schema(description = "字典ID")
    private Long dictId;

    @Schema(description = "字典项值")
    private String value;

    @Schema(description = "中文名称")
    private String zhCn;

    @Schema(description = "英文名称")
    private String enUs;

    @Schema(description = "描述")
    private String description;
}
