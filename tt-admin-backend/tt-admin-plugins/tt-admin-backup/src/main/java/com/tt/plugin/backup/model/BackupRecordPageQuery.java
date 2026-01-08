package com.tt.plugin.backup.model;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "备份记录分页查询")
public class BackupRecordPageQuery extends PageQuery {
    @Schema(description = "配置ID")
    private Long configId;
}
