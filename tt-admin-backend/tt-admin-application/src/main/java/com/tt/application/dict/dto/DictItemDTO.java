package com.tt.application.dict.dto;

import lombok.Data;

@Data
public class DictItemDTO {
    private String value;
    private String zhCn;
    private String enUs;
    private Integer sort;
}
