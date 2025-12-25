package com.tt.common.domain;

import lombok.EqualsAndHashCode;

import java.util.Objects;

/**
 * 值对象基类
 * <p>
 * 特点：
 * 1. 没有标识
 * 2. 不可变
 * 3. 通过属性值判断相等性
 * 4. 通常作为实体的属性
 * <p>
 * 使用建议：
 * - 实现类应该是不可变的
 * - 使用@Value注解简化实现
 * - 重写equals和hashCode方法
 */
@EqualsAndHashCode
public abstract class ValueObject {

    /**
     * 值对象的相等性比较
     * 子类应该基于业务规则实现equals方法
     * 可以使用@EqualsAndHashCode注解自动生成
     */

    /**
     * 验证值对象的有效性
     * 子类可以重写此方法添加业务验证逻辑
     *
     * @throws IllegalArgumentException 如果值对象无效
     */
    protected void validate() {
        // 默认不做验证，子类可以重写
    }

    /**
     * 检查值对象是否相同
     * 使用Objects.equals进行安全的比较
     *
     * @param obj 比较对象
     * @return 是否相同
     */
    protected final boolean sameValueAs(Object obj) {
        return Objects.equals(this, obj);
    }
}