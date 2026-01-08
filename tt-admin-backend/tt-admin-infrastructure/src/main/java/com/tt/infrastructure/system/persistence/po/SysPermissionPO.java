package com.tt.infrastructure.system.persistence.po;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sys_permission")
public class SysPermissionPO {

    @TableId
    private Long id;

    private Long menuId;

    private String name;

    private String code;

    private String resource;

    private Integer sort;

    private String description;

    private String status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
