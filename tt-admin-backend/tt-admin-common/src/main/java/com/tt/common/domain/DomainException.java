package com.tt.common.domain;

import lombok.Getter;

/**
 * 领域异常基类
 * <p>
 * 用于表示业务规则违反的异常
 * <p>
 * 特点：
 * 1. 包含错误码，便于国际化
 * 2. 记录领域名称
 * 3. 继承自RuntimeException，避免受检异常的繁琐
 * <p>
 * 使用示例：
 * <pre>
 * {@code
 * throw new DomainException("USER_NOT_FOUND", "用户不存在", "UserDomain");
 * }
 * </pre>
 */
@Getter
public class DomainException extends RuntimeException {

    /**
     * 错误码
     */
    private  String errorCode;

    /**
     * 领域名称
     */
    private  String domainName;

    /**
     * 创建领域异常
     *
     * @param errorCode 错误码
     * @param message   错误消息
     */
    public DomainException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.domainName = "Unknown";
    }

    /**
     * 创建领域异常
     *
     * @param errorCode 错误码
     * @param message   错误��息
     * @param cause     原始异常
     */
    public DomainException(String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.domainName = "Unknown";
    }

    /**
     * 创建领域异常
     *
     * @param errorCode  错误码
     * @param message    错误消息
     * @param domainName 领域名称
     */
    public DomainException(String errorCode, String message, String domainName) {
        super(message);
        this.errorCode = errorCode;
        this.domainName = domainName;
    }


}