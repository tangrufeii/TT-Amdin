package com.tt.plugin.backup.util;

import org.springframework.util.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataSourceInfoParser {

    private static final Pattern MYSQL_PATTERN = Pattern.compile("jdbc:mysql://([^:/]+)(?::(\\d+))?/([^?]+)");
    private static final Pattern PG_PATTERN = Pattern.compile("jdbc:postgresql://([^:/]+)(?::(\\d+))?/([^?]+)");

    public static DataSourceInfo parse(String url, String username, String password) {
        DataSourceInfo info = new DataSourceInfo();
        info.setUsername(username);
        info.setPassword(password);

        if (!StringUtils.hasText(url)) {
            return info;
        }

        Matcher mysqlMatcher = MYSQL_PATTERN.matcher(url);
        if (mysqlMatcher.find()) {
            info.setType("mysql");
            info.setHost(mysqlMatcher.group(1));
            info.setPort(resolvePort(mysqlMatcher.group(2), 3306));
            info.setDatabase(mysqlMatcher.group(3));
            return info;
        }

        Matcher pgMatcher = PG_PATTERN.matcher(url);
        if (pgMatcher.find()) {
            info.setType("postgresql");
            info.setHost(pgMatcher.group(1));
            info.setPort(resolvePort(pgMatcher.group(2), 5432));
            info.setDatabase(pgMatcher.group(3));
        }

        return info;
    }

    private static int resolvePort(String value, int defaultValue) {
        if (!StringUtils.hasText(value)) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return defaultValue;
        }
    }
}
