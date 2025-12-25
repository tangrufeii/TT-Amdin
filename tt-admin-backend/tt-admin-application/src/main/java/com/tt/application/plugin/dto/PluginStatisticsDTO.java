package com.tt.application.plugin.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 插件统计信息DTO
 * <p>
 * 用于传输插件统计数据
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "插件统计信息")
public class PluginStatisticsDTO {

    @Schema(description = "插件总数")
    private Long total;

    @Schema(description = "启用数量")
    private Long enabledCount;

    @Schema(description = "禁用数量")
    private Long disabledCount;
}