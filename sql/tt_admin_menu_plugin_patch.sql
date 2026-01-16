-- Plugin menu sync fields for sys_menu
ALTER TABLE `sys_menu`
  ADD COLUMN `source_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'SYSTEM' AFTER `remark`,
  ADD COLUMN `source_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL AFTER `source_type`,
  ADD COLUMN `origin_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL AFTER `source_id`;
