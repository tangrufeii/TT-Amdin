package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展激活策略
 */
@Data
@NoArgsConstructor
public class ExtensionActivation {

    /**
     * 安装后是否自动启用
     */
    private Boolean autoEnable;

    /**
     * 是否互斥单例
     */
    private Boolean singleton;

    /**
     * 装载优先级，值越小越优先
     */
    private Integer entryPriority;
}
