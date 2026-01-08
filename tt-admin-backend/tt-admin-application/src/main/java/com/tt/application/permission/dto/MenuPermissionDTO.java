package com.tt.application.permission.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "Menu permission dto")
public class MenuPermissionDTO {

    private Long menuId;

    private String menuName;

    private String i18nKey;

    private List<MenuPermissionButtonDTO> buttons;
}
