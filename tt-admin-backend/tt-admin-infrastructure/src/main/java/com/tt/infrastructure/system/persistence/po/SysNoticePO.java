package com.tt.infrastructure.system.persistence.po;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.tt.infrastructure.common.po.BasePo;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sys_notice")
public class SysNoticePO extends BasePo {

    @TableId
    private Long id;

    private String category;

    private String title;

    private String content;

    private LocalDateTime releaseTime;

    private String status;

    private String remark;

    private String createUser;

    @TableLogic
    private Boolean isDeleted;
}
