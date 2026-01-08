package com.tt.application.dict.dto;

import lombok.Data;

/**
 * 字典项管理DTO
 */
@Data
public class DictItemManageDTO {

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
}
