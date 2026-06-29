package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展能力声明
 */
@Data
@NoArgsConstructor
public class ExtensionCapability {

    /**
     * 是否提供门户能力
     */
    private Boolean portal;

    /**
     * 是否提供后台能力
     */
    private Boolean admin;

    /**
     * 是否提供服务端接口能力
     */
    private Boolean serverApi;

    /**
     * 是否包含数据库迁移脚本
     */
    private Boolean migration;

    /**
     * 是否包含定时任务能力
     */
    private Boolean scheduler;
}
