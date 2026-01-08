package com.tt.domain.system.access.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * 数据字典
 */
@Data
@Builder
public class SystemDict {

    private Long id;

    private String code;

    private String name;

    private String type;

    private String status;

    private List<SystemDictItem> items;
}
