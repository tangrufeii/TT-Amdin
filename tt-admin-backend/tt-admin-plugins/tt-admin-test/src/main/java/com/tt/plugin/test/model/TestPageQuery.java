package com.tt.plugin.test.model;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TestPageQuery extends PageQuery {
    @Schema(description = "姓名")
    private String name;

    @Schema(description = "性别")
    private String sex;

}
