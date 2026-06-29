package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 扩展依赖集合
 */
@Data
@NoArgsConstructor
public class ExtensionDependencySet {

    /**
     * 必需依赖扩展ID
     */
    private List<String> required;

    /**
     * 可选依赖扩展ID
     */
    private List<String> optional;

    /**
     * 冲突扩展ID
     */
    private List<String> conflicts;
}
