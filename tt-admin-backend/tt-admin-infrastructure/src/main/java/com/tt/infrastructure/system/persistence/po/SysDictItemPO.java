package com.tt.infrastructure.system.persistence.po;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("sys_dict_item")
public class SysDictItemPO {

    @TableId
    private Long id;

    private Long dictId;

    private String dictCode;

    private String value;

    private String zhCn;

    private String enUs;

    private String type;

    private Integer sort;

    private String description;

    private String status;

    private String remark;
}
