package com.tt.plugin.aichat.service;

import com.tt.common.domain.DomainException;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class AiChatCrypto {

    private static final String PREFIX = "enc:v1:";
    private static final int IV_LENGTH = 12;
    private static final int TAG_LENGTH_BIT = 128;

    private AiChatCrypto() {
    }

    public static String encrypt(String secret, String plainText) {
        if (plainText == null || plainText.isEmpty()) {
            return plainText;
        }
        try {
            SecretKey key = buildKey(secret);
            byte[] iv = new byte[IV_LENGTH];
            new SecureRandom().nextBytes(iv);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BIT, iv));
            byte[] cipherText = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            byte[] combined = new byte[iv.length + cipherText.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(cipherText, 0, combined, iv.length, cipherText.length);
            return PREFIX + Base64.getEncoder().encodeToString(combined);
        } catch (Exception ex) {
            throw new DomainException("AI_CHAT", "encrypt api key failed", ex);
        }
    }

    public static String decrypt(String secret, String encrypted) {
        if (encrypted == null || encrypted.isEmpty()) {
            return encrypted;
        }
        if (!encrypted.startsWith(PREFIX)) {
            return encrypted;
        }
        try {
            SecretKey key = buildKey(secret);
            String raw = encrypted.substring(PREFIX.length());
            byte[] combined = Base64.getDecoder().decode(raw);
            if (combined.length <= IV_LENGTH) {
                throw new IllegalArgumentException("invalid encrypted payload");
            }
            byte[] iv = new byte[IV_LENGTH];
            byte[] cipherText = new byte[combined.length - IV_LENGTH];
            System.arraycopy(combined, 0, iv, 0, IV_LENGTH);
            System.arraycopy(combined, IV_LENGTH, cipherText, 0, cipherText.length);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BIT, iv));
            byte[] plain = cipher.doFinal(cipherText);
            return new String(plain, StandardCharsets.UTF_8);
        } catch (Exception ex) {
            throw new DomainException("AI_CHAT", "decrypt api key failed", ex);
        }
    }

    private static SecretKey buildKey(String secret) throws Exception {
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("secret is empty");
        }
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(secret.getBytes(StandardCharsets.UTF_8));
        return new SecretKeySpec(hash, 0, 32, "AES");
    }
}
