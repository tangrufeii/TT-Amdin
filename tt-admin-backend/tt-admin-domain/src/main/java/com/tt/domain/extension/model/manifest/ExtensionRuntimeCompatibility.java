package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 运行时环境兼容声明
 */
@Data
@NoArgsConstructor
public class ExtensionRuntimeCompatibility {

    /**
     * Java 版本要求
     */
    private String java;

    /**
     * Node 版本要求
     */
    private String node;
}
