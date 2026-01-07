package com.tt.common.utils;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.io.File;
import java.nio.file.Files;
import java.nio.charset.StandardCharsets;
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
        HikariDataSource hikariDataSource = SpringBeanUtil.context.getBean(HikariDataSource.class);
        ScriptUtils.executeSqlScript(hikariDataSource.getConnection(), encodedResource);
    }
}
