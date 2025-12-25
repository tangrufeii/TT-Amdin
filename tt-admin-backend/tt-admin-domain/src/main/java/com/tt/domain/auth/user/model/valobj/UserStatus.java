package com.tt.domain.auth.user.model.valobj;

import com.tt.common.domain.ValueObject;
import lombok.Value;

/**
 * 用户状态值对象
 * <p>
 * 表示用户的当前状态
 */
@Value
public class UserStatus extends ValueObject {

    /**
     * 状态值
     */
    private final Integer code;

    /**
     * 状态描述
     */
    private final String description;

    /**
     * 私有构造函数
     *
     * @param code        状态码
     * @param description 描述
     */
    private UserStatus(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 激活状态
     */
    public static final UserStatus ACTIVE = new UserStatus(1, "激活");

    /**
     * 禁用状态
     */
    public static final UserStatus DISABLED = new UserStatus(0, "禁用");

    /**
     * 锁定状态
     */
    public static final UserStatus LOCKED = new UserStatus(2, "锁定");

    /**
     * 根据状态码获取用户状态
     *
     * @param code 状态码
     * @return 用户状态
     */
    public static UserStatus fromCode(Integer code) {
        switch (code) {
            case 1:
                return ACTIVE;
            case 0:
                return DISABLED;
            case 2:
                return LOCKED;
            default:
                throw new IllegalArgumentException("未知的用户状态码: " + code);
        }
    }
}