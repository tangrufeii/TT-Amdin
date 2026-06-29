package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 扩展基础元信息
 */
@Data
@NoArgsConstructor
public class ExtensionMeta {

    /**
     * 扩展唯一标识
     */
    private String id;

    /**
     * 扩展名称
     */
    private String name;

    /**
     * 扩展版本号
     */
    private String version;

    /**
     * 扩展类型编码：theme / module / widget / hybrid
     */
    private String type;

    /**
     * 扩展描述
     */
    private String description;

    /**
     * 扩展主页
     */
    private String homepage;

    /**
     * 作者信息
     */
    private ExtensionAuthor author;

    /**
     * 许可证
     */
    private String license;

    /**
     * 关键字集合
     */
    private List<String> keywords;
}
