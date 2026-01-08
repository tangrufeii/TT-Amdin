package com.tt.plugin.backup.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tt.common.domain.DomainException;
import com.tt.plugin.backup.model.BackupConfig;
import com.tt.plugin.backup.model.BackupRecord;
import com.tt.plugin.backup.model.BackupRecordPageQuery;
import com.tt.plugin.backup.util.DataSourceInfo;
import com.tt.plugin.backup.util.DataSourceInfoParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BackupService {

    private static final String DEFAULT_CRON = "0 0 2 * * ?";
    private static final int DEFAULT_RETENTION_DAYS = 7;
    private static final String DEFAULT_ENABLED = "Y";
    private static final String DEFAULT_BACKUP_TYPE = "dump";
    private static final String DEFAULT_DB_TYPE = "auto";

    private final JdbcTemplate jdbcTemplate;
    private final BackupScheduler backupScheduler;

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:}")
    private String datasourceUsername;

    @Value("${spring.datasource.password:}")
    private String datasourcePassword;

    private final RowMapper<BackupConfig> configRowMapper = (rs, rowNum) -> {
        BackupConfig config = new BackupConfig();
        config.setId(rs.getLong("id"));
        config.setDbType(rs.getString("db_type"));
        config.setBackupType(rs.getString("backup_type"));
        config.setCustomCommand(rs.getString("custom_command"));
        config.setCron(rs.getString("cron"));
        config.setEnabled(rs.getString("enabled"));
        config.setRetentionDays(rs.getInt("retention_days"));
        config.setTargetDir(rs.getString("target_dir"));
        config.setLastRunTime(rs.getTimestamp("last_run_time") != null ? rs.getTimestamp("last_run_time").toLocalDateTime() : null);
        return config;
    };

    private final RowMapper<BackupRecord> recordRowMapper = (rs, rowNum) -> {
        BackupRecord record = new BackupRecord();
        record.setId(rs.getLong("id"));
        record.setConfigId(rs.getLong("config_id"));
        record.setFileName(rs.getString("file_name"));
        record.setFilePath(rs.getString("file_path"));
        record.setFileSize(rs.getLong("file_size"));
        record.setStatus(rs.getString("status"));
        record.setMessage(rs.getString("message"));
        record.setStartTime(rs.getTimestamp("start_time") != null ? rs.getTimestamp("start_time").toLocalDateTime() : null);
        record.setEndTime(rs.getTimestamp("end_time") != null ? rs.getTimestamp("end_time").toLocalDateTime() : null);
        record.setCreateTime(rs.getTimestamp("create_time") != null ? rs.getTimestamp("create_time").toLocalDateTime() : null);
        return record;
    };

    @PostConstruct
    public void init() {
        BackupConfig config = getConfig();
        schedule(config);
    }

    public BackupConfig getConfig() {
        List<BackupConfig> list = jdbcTemplate.query("SELECT * FROM sys_backup_config ORDER BY id ASC LIMIT 1", configRowMapper);
        if (!list.isEmpty()) {
            return ensureTargetDir(list.get(0));
        }
        BackupConfig config = new BackupConfig();
        config.setId(1L);
        config.setDbType(resolveDefaultDbType());
        config.setBackupType(DEFAULT_BACKUP_TYPE);
        config.setCron(DEFAULT_CRON);
        config.setEnabled(DEFAULT_ENABLED);
        config.setRetentionDays(DEFAULT_RETENTION_DAYS);
        config.setTargetDir(defaultTargetDir());
        jdbcTemplate.update(
                "INSERT INTO sys_backup_config (id, db_type, backup_type, custom_command, cron, enabled, retention_days, target_dir, create_time, update_time) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW())",
                config.getId(),
                config.getDbType(),
                config.getBackupType(),
                config.getCustomCommand(),
                config.getCron(),
                config.getEnabled(),
                config.getRetentionDays(),
                config.getTargetDir()
        );
        return config;
    }

    public BackupConfig updateConfig(BackupConfig input) {
        if (input == null) {
            throw new DomainException("PLUGIN_BACKUP", "backup config is required");
        }
        BackupConfig current = getConfig();
        String cron = StringUtils.hasText(input.getCron()) ? input.getCron() : current.getCron();
        String enabled = StringUtils.hasText(input.getEnabled()) ? input.getEnabled() : current.getEnabled();
        jdbcTemplate.update(
                "UPDATE sys_backup_config SET db_type=?, backup_type=?, custom_command=?, cron=?, enabled=?, retention_days=?, target_dir=?, update_time=NOW() WHERE id=?",
                StringUtils.hasText(input.getDbType()) ? input.getDbType() : current.getDbType(),
                StringUtils.hasText(input.getBackupType()) ? input.getBackupType() : current.getBackupType(),
                StringUtils.hasText(input.getCustomCommand()) ? input.getCustomCommand() : current.getCustomCommand(),
                cron,
                enabled,
                input.getRetentionDays() != null ? input.getRetentionDays() : current.getRetentionDays(),
                StringUtils.hasText(input.getTargetDir()) ? input.getTargetDir().trim() : current.getTargetDir(),
                current.getId()
        );
        BackupConfig updated = getConfigById(current.getId());
        schedule(updated);
        return updated;
    }

    private BackupConfig getConfigById(Long id) {
        if (id == null) {
            return getConfig();
        }
        List<BackupConfig> list = jdbcTemplate.query("SELECT * FROM sys_backup_config WHERE id=? LIMIT 1", configRowMapper, id);
        if (list.isEmpty()) {
            return getConfig();
        }
        return ensureTargetDir(list.get(0));
    }

    public void runBackup(boolean manual) {
        BackupConfig config = getConfig();
        if (!"Y".equalsIgnoreCase(config.getEnabled()) && !manual) {
            return;
        }
        executeBackup(config);
    }

    public IPage<BackupRecord> pageRecords(BackupRecordPageQuery query) {
        long page = query.getPage() == null ? 1 : query.getPage();
        long pageSize = query.getPageSize() == null ? 20 : query.getPageSize();
        Page<BackupRecord> result = new Page<>(page, pageSize);

        Long count = jdbcTemplate.queryForObject("SELECT COUNT(1) FROM sys_backup_record", Long.class);
        result.setTotal(count == null ? 0 : count);

        List<BackupRecord> records = jdbcTemplate.query(
                "SELECT * FROM sys_backup_record ORDER BY id DESC LIMIT ? OFFSET ?",
                recordRowMapper,
                pageSize,
                (page - 1) * pageSize
        );
        result.setRecords(records);
        return result;
    }

    private void schedule(BackupConfig config) {
        backupScheduler.schedule(config.getCron(), "Y".equalsIgnoreCase(config.getEnabled()), () -> runBackup(false));
    }

    private void executeBackup(BackupConfig config) {
        LocalDateTime start = LocalDateTime.now();
        BackupRecord record = new BackupRecord();
        record.setConfigId(config.getId());
        record.setStartTime(start);
        record.setCreateTime(start);
        record.setStatus("0");

        String targetDir = config.getTargetDir();
        if (!StringUtils.hasText(targetDir)) {
            throw new DomainException("PLUGIN_BACKUP", "backup directory is required");
        }
        File dir = new File(targetDir);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new DomainException("PLUGIN_BACKUP", "failed to create backup directory");
        }

        DataSourceInfo info = DataSourceInfoParser.parse(datasourceUrl, datasourceUsername, datasourcePassword);
        String dbType = resolveDbType(config.getDbType(), info);
        if (!StringUtils.hasText(dbType)) {
            throw new DomainException("PLUGIN_BACKUP", "database type cannot be resolved");
        }

        String filename = buildFilename(dbType);
        File targetFile = new File(dir, filename);

        record.setFileName(filename);
        record.setFilePath(targetFile.getAbsolutePath());

        try {
            ProcessBuilder builder = buildCommand(dbType, config, info, targetFile);
            Process process = builder.start();
            String output = readProcessOutput(process);
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                record.setStatus("1");
                record.setMessage("success");
            } else {
                record.setStatus("0");
                record.setMessage(output);
            }
        } catch (Exception ex) {
            record.setStatus("0");
            record.setMessage(ex.getMessage());
        } finally {
            record.setEndTime(LocalDateTime.now());
            record.setFileSize(targetFile.exists() ? targetFile.length() : 0);
            jdbcTemplate.update(
                    "INSERT INTO sys_backup_record (config_id, file_name, file_path, file_size, status, message, start_time, end_time, create_time) VALUES (?,?,?,?,?,?,?,?,?)",
                    record.getConfigId(),
                    record.getFileName(),
                    record.getFilePath(),
                    record.getFileSize(),
                    record.getStatus(),
                    record.getMessage(),
                    record.getStartTime(),
                    record.getEndTime(),
                    record.getCreateTime()
            );
            jdbcTemplate.update("UPDATE sys_backup_config SET last_run_time=? WHERE id=?", record.getEndTime(), config.getId());
            cleanOldBackups(config.getRetentionDays(), dir);
        }
    }

    private ProcessBuilder buildCommand(String dbType, BackupConfig config, DataSourceInfo info, File targetFile) {
        if ("custom".equalsIgnoreCase(config.getBackupType())) {
            return buildCustomCommand(config.getCustomCommand(), info, targetFile);
        }
        if ("mysql".equalsIgnoreCase(dbType)) {
            return buildMysqlDump(info, targetFile);
        }
        if ("postgresql".equalsIgnoreCase(dbType) || "postgres".equalsIgnoreCase(dbType)) {
            return buildPostgresDump(info, targetFile);
        }
        throw new DomainException("PLUGIN_BACKUP", "unsupported db type: " + dbType);
    }

    private ProcessBuilder buildMysqlDump(DataSourceInfo info, File targetFile) {
        List<String> command = new ArrayList<>();
        command.add("mysqldump");
        command.add("-h");
        command.add(info.getHost());
        command.add("-P");
        command.add(String.valueOf(info.getPort()));
        command.add("-u");
        command.add(info.getUsername());
        command.add(info.getDatabase());
        command.add("--result-file=" + targetFile.getAbsolutePath());
        ProcessBuilder builder = new ProcessBuilder(command);
        if (StringUtils.hasText(info.getPassword())) {
            builder.environment().put("MYSQL_PWD", info.getPassword());
        }
        return builder;
    }

    private ProcessBuilder buildPostgresDump(DataSourceInfo info, File targetFile) {
        List<String> command = new ArrayList<>();
        command.add("pg_dump");
        command.add("-h");
        command.add(info.getHost());
        command.add("-p");
        command.add(String.valueOf(info.getPort()));
        command.add("-U");
        command.add(info.getUsername());
        command.add("-F");
        command.add("p");
        command.add("-f");
        command.add(targetFile.getAbsolutePath());
        command.add(info.getDatabase());
        ProcessBuilder builder = new ProcessBuilder(command);
        if (StringUtils.hasText(info.getPassword())) {
            builder.environment().put("PGPASSWORD", info.getPassword());
        }
        return builder;
    }

    private ProcessBuilder buildCustomCommand(String rawCommand, DataSourceInfo info, File targetFile) {
        if (!StringUtils.hasText(rawCommand)) {
            throw new DomainException("PLUGIN_BACKUP", "custom command is required");
        }
        String resolved = rawCommand
                .replace("{host}", safe(info.getHost()))
                .replace("{port}", String.valueOf(info.getPort()))
                .replace("{user}", safe(info.getUsername()))
                .replace("{password}", safe(info.getPassword()))
                .replace("{database}", safe(info.getDatabase()))
                .replace("{file}", safe(targetFile.getAbsolutePath()));

        ProcessBuilder builder = isWindows()
                ? new ProcessBuilder("cmd", "/c", resolved)
                : new ProcessBuilder("bash", "-c", resolved);

        if (StringUtils.hasText(info.getPassword())) {
            builder.environment().put("DB_PASSWORD", info.getPassword());
        }
        return builder;
    }

    private String buildFilename(String dbType) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "backup-" + dbType + "-" + timestamp + ".sql";
    }

    private String readProcessOutput(Process process) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder builder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line).append('\n');
            }
            return builder.toString();
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

    private void cleanOldBackups(Integer retentionDays, File dir) {
        if (retentionDays == null || retentionDays <= 0 || !dir.exists()) {
            return;
        }
        long expireAt = System.currentTimeMillis() - retentionDays * 24L * 60L * 60L * 1000L;
        File[] files = dir.listFiles(file -> file.isFile() && file.lastModified() < expireAt);
        if (files == null) {
            return;
        }
        for (File file : files) {
            file.delete();
        }
    }

    private String resolveDefaultDbType() {
        DataSourceInfo info = DataSourceInfoParser.parse(datasourceUrl, datasourceUsername, datasourcePassword);
        return StringUtils.hasText(info.getType()) ? info.getType() : DEFAULT_DB_TYPE;
    }

    private String defaultTargetDir() {
        return System.getProperty("user.home") + File.separator + "tt-backups";
    }

    private BackupConfig ensureTargetDir(BackupConfig config) {
        if (config == null) {
            return null;
        }
        if (StringUtils.hasText(config.getTargetDir())) {
            return config;
        }
        String targetDir = defaultTargetDir();
        config.setTargetDir(targetDir);
        jdbcTemplate.update("UPDATE sys_backup_config SET target_dir=?, update_time=NOW() WHERE id=?", targetDir, config.getId());
        return config;
    }

    private String resolveDbType(String configured, DataSourceInfo info) {
        if (!StringUtils.hasText(configured) || DEFAULT_DB_TYPE.equalsIgnoreCase(configured)) {
            return info.getType();
        }
        return configured;
    }

    private boolean isWindows() {
        String osName = System.getProperty("os.name", "").toLowerCase();
        return osName.contains("win");
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
