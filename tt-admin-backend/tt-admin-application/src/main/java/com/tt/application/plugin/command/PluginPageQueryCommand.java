package com.tt.application.plugin.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 插件分页查询命令
 * <p>
 * 用于分页查询插件列表，支持按名称和状态筛选
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "插件分页查询命令")
public class PluginPageQueryCommand extends PageQuery {

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
     * 只查询指定扩展类型。
     * <p>
     * 当前用于把主题中心、插件中心按扩展类型拆开。
     * 典型值：theme / module / widget / hybrid
     * </p>
     */
    @Schema(description = "扩展类型过滤：theme/module/widget/hybrid")
    private String type;

    /**
     * 排除指定扩展类型。
     * <p>
     * 当前主要给“插件中心”使用，用来把 theme 从通用扩展列表里排除。
     * </p>
     */
    @Schema(description = "排除的扩展类型，例如 theme")
    private String excludeType;
}
