package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展作者信息
 */
@Data
@NoArgsConstructor
public class ExtensionAuthor {

    /**
     * 作者名称
     */
    private String name;

    /**
     * 联系邮箱
     */
    private String email;

    /**
     * 作者或项目主页
     */
    private String website;
}
