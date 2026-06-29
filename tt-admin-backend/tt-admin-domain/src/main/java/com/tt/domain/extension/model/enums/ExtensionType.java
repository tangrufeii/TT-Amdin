package com.tt.domain.extension.model.enums;

import lombok.Getter;

/**
 * 扩展类型枚举
 * <p>
 * 对应 V2 扩展包的四类对象：
 * 1. theme：门户主题（访客侧互斥）
 * 2. module：独立业务模块
 * 3. widget：页面挂件
 * 4. hybrid：混合扩展（同时包含多种能力）
 */
@Getter
public enum ExtensionType {

    /**
     * 门户主题
     */
    THEME("theme", "门户主题"),

    /**
     * 业务模块
     */
    MODULE("module", "业务模块"),

    /**
     * 页面挂件
     */
    WIDGET("widget", "页面挂件"),

    /**
     * 混合扩展
     */
    HYBRID("hybrid", "混合扩展");

    /**
     * 类型编码（持久化和 Manifest 使用）
     */
    private final String code;

    /**
     * 类型说明
     */
    private final String description;

    ExtensionType(String code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据编码解析扩展类型
     *
     * @param code 类型编码
     * @return 扩展类型
     */
    public static ExtensionType fromCode(String code) {
        if (code == null || code.isBlank()) {
            throw new IllegalArgumentException("扩展类型不能为空");
        }
        for (ExtensionType value : values()) {
            if (value.code.equalsIgnoreCase(code.trim())) {
                return value;
            }
        }
        throw new IllegalArgumentException("无效的扩展类型: " + code);
    }
}
