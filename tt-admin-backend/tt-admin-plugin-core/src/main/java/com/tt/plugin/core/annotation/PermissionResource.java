package com.tt.plugin.core.annotation;

import java.lang.annotation.*;

/**
 * 标记接口的权限资源编码，用于权限下拉与说明提取。
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PermissionResource {

    /**
     * 权限资源编码，例如：sys:menu:add
     */
    String[] value();
}
