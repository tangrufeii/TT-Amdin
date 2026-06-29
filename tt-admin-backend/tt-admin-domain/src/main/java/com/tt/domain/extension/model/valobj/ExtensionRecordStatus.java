package com.tt.domain.extension.model.valobj;

import com.tt.common.domain.ValueObject;
import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 扩展记录状态值对象
 * <p>
 * 第一版沿用插件启停语义：
 * 0 = 禁用
 * 1 = 启用
 */
@Getter
@EqualsAndHashCode(callSuper = false)
public class ExtensionRecordStatus extends ValueObject {

    /**
     * 状态码
     */
    private final Integer code;

    /**
     * 状态描述
     */
    private final String description;

    /**
     * 禁用状态
     */
    public static final ExtensionRecordStatus DISABLED = new ExtensionRecordStatus(0, "禁用");

    /**
     * 启用状态
     */
    public static final ExtensionRecordStatus ENABLED = new ExtensionRecordStatus(1, "启用");

    private ExtensionRecordStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据状态码解析状态对象
     *
     * @param code 状态码
     * @return 状态值对象
     */
    public static ExtensionRecordStatus fromCode(Integer code) {
        if (code == null) {
            return DISABLED;
        }
        return switch (code) {
            case 0 -> DISABLED;
            case 1 -> ENABLED;
            default -> throw new IllegalArgumentException("无效的扩展状态码: " + code);
        };
    }

    /**
     * 是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return this.equals(ENABLED);
    }

    /**
     * 是否禁用
     *
     * @return true-禁用，false-启用
     */
    public boolean isDisabled() {
        return this.equals(DISABLED);
    }

    @Override
    public String toString() {
        return description;
    }
}
