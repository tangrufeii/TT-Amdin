package com.tt.domain.plugin.model.valobj;

import com.tt.common.domain.ValueObject;
import lombok.EqualsAndHashCode;
import lombok.Getter;

/**
 * 插件状态值对象
 * <p>
 * 定义插件的各种状态：禁用、启用
 * 使用值对象确保状态的有效性和业务语义
 *
 * @author tt
 * @date 2025/12/24
 */
@Getter
@EqualsAndHashCode
public class PluginManagementStatus extends ValueObject {

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
    public static final PluginManagementStatus DISABLED = new PluginManagementStatus(0, "禁用");

    /**
     * 启用状态
     */
    public static final PluginManagementStatus ENABLED = new PluginManagementStatus(1, "启用");

    /**
     * 私有构造函数，防止直接实例化
     *
     * @param code        状态码
     * @param description 状态描述
     */
    private PluginManagementStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据状态码获取插件状态
     *
     * @param code 状态码
     * @return 插件状态
     */
    public static PluginManagementStatus fromCode(Integer code) {
        if (code == null) {
            return DISABLED;
        }
        return switch (code) {
            case 0 -> DISABLED;
            case 1 -> ENABLED;
            default -> throw new IllegalArgumentException("无效的插件状态码: " + code);
        };
    }

    /**
     * 判断是否启用
     *
     * @return true-启用，false-禁用
     */
    public boolean isEnabled() {
        return this.equals(ENABLED);
    }

    /**
     * 判断是否禁用
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