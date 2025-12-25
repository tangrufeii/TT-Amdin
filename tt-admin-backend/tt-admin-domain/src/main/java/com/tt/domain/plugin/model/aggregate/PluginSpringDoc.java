package com.tt.domain.plugin.model.aggregate;

import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * 插件接口文档聚合 TODO将来考虑动态插入接口文档
 */
@Data
@NoArgsConstructor
public class PluginSpringDoc {

    private String groupName;

    private String pathsToMatch;

    private String packagesToScan;
}
