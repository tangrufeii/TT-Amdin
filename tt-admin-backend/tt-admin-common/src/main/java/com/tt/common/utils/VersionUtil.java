package com.tt.common.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class VersionUtil {

    private static final String UPDATE_PREFIX = "update-";

    private static final String SQL_SUFFIX = ".sql";


    /**
     * 判断更新文件是否在版本范围内
     * <p>
     * 兼容两种命名：
     * <ul>
     *     <li>update-{targetVersion}.sql</li>
     *     <li>update-{fromVersion}-{targetVersion}.sql</li>
     * </ul>
     * 版本范围按目标版本判断，避免跨多个版本升级时漏跑中间脚本。
     * </p>
     *
     * @param file       file
     * @param oldVersion oldVersion
     * @param newVersion newVersion
     * @return boolean
     */
    public static boolean isWithinVersionRange(File file, String oldVersion, String newVersion) {
        if (file == null) {
            return false;
        }
        String targetVersion = extractUpdateSqlTargetVersion(file.getName());
        if (targetVersion == null) {
            return false;
        }
        return compareVersion(targetVersion, oldVersion) > 0
                && compareVersion(targetVersion, newVersion) <= 0;
    }

    /**
     * 提取更新SQL文件的目标版本。
     *
     * @param fileName SQL文件名
     * @return 目标版本；不是更新SQL文件时返回null
     */
    public static String extractUpdateSqlTargetVersion(String fileName) {
        if (fileName == null || !fileName.startsWith(UPDATE_PREFIX) || !fileName.endsWith(SQL_SUFFIX)) {
            return null;
        }
        String versionPart = fileName.substring(UPDATE_PREFIX.length(), fileName.length() - SQL_SUFFIX.length()).trim();
        if (versionPart.isEmpty()) {
            return null;
        }
        int rangeSeparatorIndex = versionPart.lastIndexOf('-');
        if (rangeSeparatorIndex >= 0
                && rangeSeparatorIndex < versionPart.length() - 1
                && isSemanticVersion(versionPart.substring(0, rangeSeparatorIndex))
                && isVersionStart(versionPart.substring(rangeSeparatorIndex + 1))) {
            return versionPart.substring(rangeSeparatorIndex + 1).trim();
        }
        return versionPart;
    }

    /**
     * 比较语义化版本号。
     *
     * @param left  左侧版本
     * @param right 右侧版本
     * @return 左侧大于右侧返回正数，相等返回0，小于返回负数
     */
    public static int compareVersion(String left, String right) {
        List<Integer> leftParts = parseVersionParts(left);
        List<Integer> rightParts = parseVersionParts(right);
        int maxSize = Math.max(leftParts.size(), rightParts.size());
        for (int index = 0; index < maxSize; index++) {
            int leftValue = index < leftParts.size() ? leftParts.get(index) : 0;
            int rightValue = index < rightParts.size() ? rightParts.get(index) : 0;
            int compare = Integer.compare(leftValue, rightValue);
            if (compare != 0) {
                return compare;
            }
        }
        return 0;
    }

    public static long versionToLong(String versionStr) {
        List<Integer> parts = parseVersionParts(versionStr);
        long result = 0L;
        int maxParts = Math.max(parts.size(), 4);
        for (int index = 0; index < maxParts; index++) {
            int value = index < parts.size() ? parts.get(index) : 0;
            result = result * 1000 + value;
        }
        return result;
    }

    private static List<Integer> parseVersionParts(String versionStr) {
        List<Integer> parts = new ArrayList<>();
        if (versionStr == null) {
            return parts;
        }
        String normalized = versionStr.trim()
                .replace("\r", "")
                .replace("\n", "")
                .replace("--", "");
        if (normalized.startsWith("v") || normalized.startsWith("V")) {
            normalized = normalized.substring(1);
        }
        if (normalized.isEmpty()) {
            return parts;
        }
        for (String part : normalized.split("\\.")) {
            parts.add(parseVersionPart(part));
        }
        return parts;
    }

    private static int parseVersionPart(String part) {
        if (part == null || part.isBlank()) {
            return 0;
        }
        StringBuilder number = new StringBuilder();
        for (int index = 0; index < part.length(); index++) {
            char ch = part.charAt(index);
            if (!Character.isDigit(ch)) {
                break;
            }
            number.append(ch);
        }
        if (number.isEmpty()) {
            return 0;
        }
        return Integer.parseInt(number.toString());
    }

    private static boolean isVersionStart(String value) {
        if (value == null || value.isBlank()) {
            return false;
        }
        String trimmed = value.trim();
        char first = trimmed.charAt(0);
        if (Character.isDigit(first)) {
            return true;
        }
        return (first == 'v' || first == 'V')
                && trimmed.length() > 1
                && Character.isDigit(trimmed.charAt(1));
    }

    private static boolean isSemanticVersion(String value) {
        if (value == null || value.isBlank()) {
            return false;
        }
        String trimmed = value.trim();
        if (trimmed.startsWith("v") || trimmed.startsWith("V")) {
            trimmed = trimmed.substring(1);
        }
        return trimmed.matches("\\d+(\\.\\d+){1,3}([-.][A-Za-z0-9]+)?");
    }
}
