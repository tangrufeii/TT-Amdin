package com.tt.application.user.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "用户分页查询")
public class UserPageQueryCommand extends PageQuery {

    @Schema(description = "用户名")
    private String userName;

    @Schema(description = "手机号")
    private String phone;

    @Schema(description = "状态")
    private String status;
}
