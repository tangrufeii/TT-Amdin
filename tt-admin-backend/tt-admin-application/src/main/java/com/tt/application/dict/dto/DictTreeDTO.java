package com.tt.application.dict.dto;

import lombok.Data;

/**
 * 字典树节点DTO
 */
@Data
public class DictTreeDTO {

    private Long id;

    private String name;

    private String code;

    private String type;

    private String description;

    private String status;
}
