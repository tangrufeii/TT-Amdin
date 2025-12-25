package com.tt.domain.auth.user.model.valobj;

import com.tt.common.domain.ValueObject;
import lombok.Value;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * 密码值对象
 * <p>
 * 封装密码的加密存储和验证逻辑
 */
@Value
public class Password extends ValueObject {

    /**
     * 加密后的密码
     */
    String hash;

    /**
     * 盐值
     */
    String salt;

    /**
     * 加密算法
     */
    private static final String ALGORITHM = "SHA-256";
    private static final int SALT_LENGTH = 32;

    /**
     * 私有构造函数
     *
     * @param hash 加密后的密码
     * @param salt 盐值
     */
    private Password(String hash, String salt) {
        this.hash = hash;
        this.salt = salt;
    }

    /**
     * 创建密码值对象（加密存储）
     *
     * @param rawPassword 原始密码
     * @return 密码值对象
     */
    public static Password create(String rawPassword) {
        String salt = generateSalt();
        String hash = encrypt(rawPassword, salt);
        return new Password(hash, salt);
    }

    /**
     * 从已有值创建密码值对象（从数据库恢复时使用）
     *
     * @param hash 加密后的密码
     * @param salt 盐值
     * @return 密码值对象
     */
    public static Password fromHash(String hash, String salt) {
        return new Password(hash, salt);
    }

    /**
     * 验证密码
     *
     * @param rawPassword 原始密码
     * @return 是否匹配
     */
    public boolean validate(String rawPassword) {
        String checkHash = encrypt(rawPassword, this.salt);
        return this.hash.equals(checkHash);
    }

    /**
     * 生成随机盐值
     *
     * @return 盐值
     */
    private static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_LENGTH];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    /**
     * 加密密码
     *
     * @param rawPassword 原始密码
     * @param salt        盐值
     * @return 加密后的密码
     */
    private static String encrypt(String rawPassword, String salt) {
//        try {
//            MessageDigest digest = MessageDigest.getInstance(ALGORITHM);
//            byte[] saltBytes = Base64.getDecoder().decode(salt);
//            digest.update(saltBytes);
//            byte[] hashBytes = digest.digest(rawPassword.getBytes());
//            return Base64.getEncoder().encodeToString(hashBytes);
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException("密码加密失败", e);
//        }
        //暂时先不验证便于开发
        return rawPassword;

    }
}