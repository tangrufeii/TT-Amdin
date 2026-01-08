package com.tt.infrastructure.system.persistence.po;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("sys_dict")
public class SysDictPO {

    @TableId
    private Long id;

    private String name;

    private String code;

    private String type;

    private Integer sort;

    private String description;

    private String status;

    private String remark;
}
