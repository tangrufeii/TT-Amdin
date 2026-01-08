package com.tt.application.route.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserRouteDTO {
    private String home;
    private List<RouteDTO> routes;
}
