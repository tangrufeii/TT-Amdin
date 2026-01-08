package com.tt.application.menu.command;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class MenuCommand {

    @NotNull(message = "parentId cannot be null")
    private Long parentId;

    @NotBlank(message = "type cannot be blank")
    private String type;

    @NotBlank(message = "name cannot be blank")
    private String name;

    private String code;

    private String i18nKey;

    @NotBlank(message = "routeName cannot be blank")
    private String routeName;

    @NotBlank(message = "routePath cannot be blank")
    private String routePath;

    @NotBlank(message = "iconType cannot be blank")
    private String iconType;

    private String icon;

    private String component;

    private String status;

    private String hide;

    private String href;

    private String iframeUrl;

    private String keepAlive;

    private Integer sort;

    private String multiTab;

    private Integer fixedIndexInTab;

    private String remark;

    @Valid
    @Size(max = 10, message = "query supports up to 10 items")
    private List<MenuQueryCommand> query;
}
