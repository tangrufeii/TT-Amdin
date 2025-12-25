package com.tt.infrastructure.common.po;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class BasePo {
    /**
     * 创建人
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createUserId;

    /**
     * 更新人
     */
    @TableField(fill = FieldFill.UPDATE)
    private Long updateUserId;

    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.UPDATE)
    private LocalDateTime updateTime;

}