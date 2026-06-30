package com.tt.common.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
import java.io.File;
import java.nio.file.Files;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlExecUtils {

    /**
     * 执行sql
     * @param sqlFile sqlFile
     * @throws SQLException SQLException
     */
    public static void execSqlFile(File sqlFile) throws SQLException {
        if (!sqlFile.exists()){
            return;
        }
        String readString;
        try {
            readString = Files.readString(sqlFile.toPath(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new SQLException("Failed to read sql file", e);
        }
        if (StringUtils.isBlank(readString)) {
            return;
        }
        String sanitized = readString.replace("\uFEFF", "")
                .replaceAll("(?s)/\\*.*?\\*/", "")
                .replaceAll("(?m)^\\s*--.*?$", "")
                .replaceAll("(?m)^\\s*//.*?$", "")
                .trim();
        if (StringUtils.isBlank(sanitized)) {
            return;
        }
        Resource resource = new ByteArrayResource(sanitized.getBytes(StandardCharsets.UTF_8)) {
            @Override
            public String getFilename() {
                return sqlFile.getName();
            }
        };
        EncodedResource encodedResource = new EncodedResource(resource, StandardCharsets.UTF_8);
        DataSource dataSource = SpringBeanUtil.context.getBean(DataSource.class);
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, encodedResource);
        }
    }
}
