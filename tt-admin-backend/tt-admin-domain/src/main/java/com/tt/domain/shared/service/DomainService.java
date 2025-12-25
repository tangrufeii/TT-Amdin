package com.tt.domain.shared.service;

import com.tt.common.domain.DomainException;
import com.tt.common.domain.DomainEventPublisher;
import lombok.RequiredArgsConstructor;

/**
 * 领域服务基类
 * <p>
 * 领域服务职责：
 * 1. 处理跨聚合的业务逻辑
 * 2. 协调多个聚合根的交互
 * 3. 封装复杂的业务规则
 * 4. 发布领域事件
 * <p>
 * 注意事项：
 * 1. 不应包含技术实现细节
 * 2. 不应直接依赖基础设施层
 * 3. 应保持无状态
 * 4. 方法应有明确的业务含义
 */
@RequiredArgsConstructor
public abstract class DomainService {

    protected final DomainEventPublisher domainEventPublisher;

    /**
     * 验证前置条件
     *
     * @param condition 条件
     * @param message   错误消息
     * @param errorCode 错误码
     * @throws DomainException 如果条件不满足
     */
    protected void requireTrue(boolean condition, String message, String errorCode) {
        if (!condition) {
            throw new DomainException(errorCode, message, getDomainName());
        }
    }

    /**
     * 验证对象非空
     *
     * @param object   对象
     * @param message  错误消息
     * @param errorCode 错误码
     * @throws DomainException 如果对象为空
     */
    protected void requireNotNull(Object object, String message, String errorCode) {
        if (object == null) {
            throw new DomainException(errorCode, message, getDomainName());
        }
    }

    /**
     * 验证字符串非空
     *
     * @param str      字符串
     * @param message  错误消息
     * @param errorCode 错误码
     * @throws DomainException 如果字符串为空
     */
    protected void requireNotBlank(String str, String message, String errorCode) {
        if (str == null || str.trim().isEmpty()) {
            throw new DomainException(errorCode, message, getDomainName());
        }
    }

    /**
     * 获取领域名称
     * 子类应重写此方法返回具体的领域名称
     *
     * @return 领域名称
     */
    protected abstract String getDomainName();

    /**
     * 验证服务操作的前置条件
     * 默认实现不做验证，子类可以重写
     *
     * @param operation 操作名称
     * @throws IllegalStateException 如果前置条件不满足
     */
    protected void validatePrecondition(String operation) {
        // 默认不做验证
    }

    /**
     * 验证服务操作的后置条件
     * 默认实现不做验证，子类可以重写
     *
     * @param operation 操作名称
     * @throws IllegalStateException 如果后置条件不满足
     */
    protected void validatePostcondition(String operation) {
        // 默认不做验证
    }
}