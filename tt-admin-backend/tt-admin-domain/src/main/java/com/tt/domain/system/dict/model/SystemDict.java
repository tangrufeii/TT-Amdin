package com.tt.domain.system.dict.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统字典领域模型
 */
@Data
@Builder
public class SystemDict {

    private Long id;

    private String name;

    private String code;

    private String type;

    private Integer sort;

    private String description;

    private String status;

    private String remark;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
