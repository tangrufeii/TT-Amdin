package com.tt.application.menu.dto;

import lombok.Data;

import java.util.List;

@Data
public class MenuTreeDTO extends MenuDTO {
    private List<MenuTreeDTO> children;
}
