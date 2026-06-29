package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展兼容信息
 */
@Data
@NoArgsConstructor
public class ExtensionCompatibility {

    /**
     * 宿主版本兼容范围
     */
    private ExtensionHostCompatibility host;

    /**
     * 运行时环境要求
     */
    private ExtensionRuntimeCompatibility runtime;
}
