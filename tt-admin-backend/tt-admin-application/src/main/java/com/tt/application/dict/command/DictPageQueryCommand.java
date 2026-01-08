package com.tt.application.dict.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "字典分页查询参数")
public class DictPageQueryCommand extends PageQuery {

    @Schema(description = "字典名称")
    private String name;

    @Schema(description = "字典编码")
    private String code;
}
