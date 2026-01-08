CREATE TABLE IF NOT EXISTS `sys_backup_config`  (
                                      `id` bigint(20) NOT NULL COMMENT 'primary key',
                                      `db_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'auto' COMMENT 'db type',
                                      `backup_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'dump' COMMENT 'backup type',
                                      `custom_command` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'custom command',
                                      `cron` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0 0 2 * * ?' COMMENT 'cron',
                                      `enabled` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'Y' COMMENT 'enabled',
                                      `retention_days` int(11) NULL DEFAULT 7 COMMENT 'retention days',
                                      `target_dir` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'target dir',
                                      `last_run_time` datetime NULL DEFAULT NULL COMMENT 'last run time',
                                      `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
                                      `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
                                      PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'backup config' ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `sys_backup_record`  (
                                      `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
                                      `config_id` bigint(20) NOT NULL COMMENT 'config id',
                                      `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'file name',
                                      `file_path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'file path',
                                      `file_size` bigint(20) NULL DEFAULT 0 COMMENT 'file size',
                                      `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT 'status',
                                      `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'message',
                                      `start_time` datetime NULL DEFAULT NULL COMMENT 'start time',
                                      `end_time` datetime NULL DEFAULT NULL COMMENT 'end time',
                                      `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
                                      PRIMARY KEY (`id`) USING BTREE,
                                      INDEX `idx_config_id`(`config_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'backup record' ROW_FORMAT = DYNAMIC;

INSERT IGNORE INTO `sys_backup_config` (`id`, `db_type`, `backup_type`, `custom_command`, `cron`, `enabled`, `retention_days`, `target_dir`, `create_time`, `update_time`) 
VALUES (1, 'auto', 'dump', NULL, '0 0 2 * * ?', 'Y', 7, NULL, NOW(), NOW());