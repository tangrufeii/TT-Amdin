package com.tt.domain.system.access.model;

import lombok.Builder;
import lombok.Data;

/**
 * 数据字典项
 */
@Data
@Builder
public class SystemDictItem {

    private Long id;

    private Long dictId;

    private String dictCode;

    private String value;

    private String zhCn;

    private String enUs;

    private String type;

    private Integer sort;

    private String status;
}
