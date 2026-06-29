package com.tt.domain.extension.model.manifest.admin;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 后台页面扩展位贡献
 */
@Data
@NoArgsConstructor
public class AdminPageContribution {

    /**
     * 页面扩展位唯一键
     */
    private String key;

    /**
     * 页面标题
     */
    private String title;

    /**
     * 页面路径或挂载标识
     */
    private String path;

    /**
     * 组件路径
     */
    private String component;

    /**
     * 排序号
     */
    private Integer order;
}
