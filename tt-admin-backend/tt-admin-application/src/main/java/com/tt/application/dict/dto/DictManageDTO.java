package com.tt.application.dict.dto;

import lombok.Data;

/**
 * 字典管理DTO
 */
@Data
public class DictManageDTO {

    private Long id;

    private String name;

    private String code;

    private String type;

    private Integer sort;

    private String description;

    private String status;

    private String remark;
}
