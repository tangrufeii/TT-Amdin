package com.tt.application.dict.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "字典项更新参数")
public class DictItemUpdateCommand {

    @Schema(description = "字典项ID")
    private Long id;

    @Schema(description = "字典ID")
    private Long dictId;

    @Schema(description = "字典编码")
    private String dictCode;

    @Schema(description = "字典项值")
    private String value;

    @Schema(description = "中文名称")
    private String zhCn;

    @Schema(description = "英文名称")
    private String enUs;

    @Schema(description = "类型")
    private String type;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "描述")
    private String description;

    @Schema(description = "状态")
    private String status;

    @Schema(description = "备注")
    private String remark;
}
