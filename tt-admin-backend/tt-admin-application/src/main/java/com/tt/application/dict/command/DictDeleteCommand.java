package com.tt.application.dict.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "字典删除参数")
public class DictDeleteCommand {

    @Schema(description = "字典ID集合")
    private List<Long> ids;
}
