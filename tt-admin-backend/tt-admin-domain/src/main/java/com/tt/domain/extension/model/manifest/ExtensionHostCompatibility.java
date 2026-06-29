package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 宿主版本兼容声明
 */
@Data
@NoArgsConstructor
public class ExtensionHostCompatibility {

    /**
     * 宿主最低兼容版本
     */
    private String minVersion;

    /**
     * 宿主最高兼容版本
     */
    private String maxVersion;
}
