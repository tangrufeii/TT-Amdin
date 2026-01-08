package com.tt.application.dict.command;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "字典项删除参数")
public class DictItemDeleteCommand {

    @Schema(description = "字典项ID集合")
    private List<Long> ids;
}
