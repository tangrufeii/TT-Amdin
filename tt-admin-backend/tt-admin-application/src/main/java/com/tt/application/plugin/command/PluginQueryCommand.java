package com.tt.application.plugin.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 插件查询命令
 * <p>
 * 用于查询插件列表，支持分页和条件筛选
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "插件查询命令")
public class PluginQueryCommand extends PageQuery {

    /**
     * 插件名称（模糊查询）
     */
    @Schema(description = "插件名称（模糊查询）")
    private String name;

    /**
     * 插件状态：0-禁用，1-启用（不传则查询全部）
     */
    @Schema(description = "插件状态：0-禁用，1-启用")
    private Integer status;

    /**
     * 插件ID（精确查询）
     */
    @Schema(description = "插件ID（精确查询）")
    private String pluginId;
}
