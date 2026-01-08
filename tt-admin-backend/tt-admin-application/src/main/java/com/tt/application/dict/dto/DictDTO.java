package com.tt.application.dict.dto;

import lombok.Data;

import java.util.List;

@Data
public class DictDTO {
    private String code;
    private String name;
    private String type;
    private List<DictItemDTO> items;
}
