package com.tt.domain.system.dict.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统字典项领域模型
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

    private String description;

    private String status;

    private String remark;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
