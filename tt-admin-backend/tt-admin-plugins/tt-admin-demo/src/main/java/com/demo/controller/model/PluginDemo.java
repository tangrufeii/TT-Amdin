package com.demo.controller.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
* @description 测试
* @author Perfree
*/
@Getter
@Setter
@TableName("p_plugin_demo")
public class PluginDemo  implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * 主键
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 名称
    */
    private String name;

    /**
    * 信息
    */
    private String msg;
    /**
     * 创建人
     */
    @TableField(fill = FieldFill.INSERT)
    private Integer createUserId;

    /**
     * 更新人
     */
    @TableField(fill = FieldFill.UPDATE)
    private Integer updateUserId;

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
