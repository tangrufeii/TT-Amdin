package com.tt.domain.extension.model.manifest.portal;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * 门户主题声明。
 */
@Data
@NoArgsConstructor
public class PortalContributes {

    /**
     * 门户渲染模式，可选扩展字段
     */
    private String renderer;

    /**
     * 国际化资源映射
     */
    private Map<String, String> i18n;
}
