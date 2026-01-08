CREATE TABLE IF NOT EXISTS `sys_monitor_config`  (
                                       `id` bigint(20) NOT NULL COMMENT 'primary key',
                                       `cpu_threshold` int(11) NULL DEFAULT 60 COMMENT 'cpu threshold',
                                       `memory_threshold` int(11) NULL DEFAULT 60 COMMENT 'memory threshold',
                                       `disk_threshold` int(11) NULL DEFAULT 60 COMMENT 'disk threshold',
                                       `enabled` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'Y' COMMENT 'enabled',
                                       `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
                                       PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'monitor config' ROW_FORMAT = DYNAMIC;

INSERT IGNORE INTO `sys_monitor_config` (`id`, `cpu_threshold`, `memory_threshold`, `disk_threshold`, `enabled`, `update_time`)
VALUES (1, 60, 60, 60, 'Y', NOW());