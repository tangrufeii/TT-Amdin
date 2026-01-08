package com.tt.infrastructure.system.persistence.po;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sys_menu")
public class SysMenuPO {

    @TableId
    private Long id;

    private Long parentId;

    private String type;

    private String name;

    private String code;

    private String i18nKey;

    private String routeName;

    private String path;

    private String icon;

    private String iconType;

    private String component;

    private String permission;

    private String keepAlive;

    private String hide;

    private String href;

    private Integer sort;

    private String multiTab;

    private Integer fixedIndexInTab;

    private String query;

    private String iframeUrl;

    private String status;

    private String remark;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
