package com.tt.application.route.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RouteDTO {
    private String name;
    private String path;
    private String component;
    private RouteMetaDTO meta;
    private Object props;
    private List<RouteDTO> children = new ArrayList<>();
}
