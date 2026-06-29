-- sys_plugin -> sys_extension 迁移草案
-- 说明：
-- 1. 这份脚本只迁移基础元数据，不负责推断完整 capability 和 artifact
-- 2. 迁移完成后，建议由应用启动过程重新读取磁盘 Manifest，补齐 JSON 快照字段
-- 3. 为了避免重复迁移，这里使用 extension_id 做幂等保护

INSERT INTO `sys_extension` (
  `extension_id`,
  `name`,
  `type`,
  `description`,
  `version`,
  `status`,
  `manifest_version`,
  `singleton_flag`,
  `auto_enable`,
  `entry_priority`,
  `source_format`,
  `install_source`,
  `host_min_version`,
  `host_max_version`,
  `author`,
  `website`,
  `email`,
  `is_dev`,
  `front_dev_address`,
  `capabilities_json`,
  `artifacts_json`,
  `manifest_json`,
  `install_checksum`,
  `created_by`,
  `updated_by`,
  `created_at`,
  `updated_at`
)
SELECT
  sp.`pluginId` AS `extension_id`,
  sp.`name` AS `name`,
  'hybrid' AS `type`,
  sp.`desc` AS `description`,
  COALESCE(sp.`version`, '1.0.0') AS `version`,
  COALESCE(sp.`status`, 0) AS `status`,
  1 AS `manifest_version`,
  0 AS `singleton_flag`,
  0 AS `auto_enable`,
  100 AS `entry_priority`,
  'legacy-plugin' AS `source_format`,
  'migration' AS `install_source`,
  NULL AS `host_min_version`,
  NULL AS `host_max_version`,
  sp.`author` AS `author`,
  sp.`website` AS `website`,
  sp.`email` AS `email`,
  COALESCE(CAST(sp.`isDev` AS UNSIGNED), 0) AS `is_dev`,
  sp.`frontDevAddress` AS `front_dev_address`,
  NULL AS `capabilities_json`,
  NULL AS `artifacts_json`,
  JSON_OBJECT(
    'legacy', TRUE,
    'pluginId', sp.`pluginId`,
    'name', sp.`name`,
    'version', sp.`version`
  ) AS `manifest_json`,
  NULL AS `install_checksum`,
  sp.`createUserId` AS `created_by`,
  sp.`updateUserId` AS `updated_by`,
  sp.`createTime` AS `created_at`,
  sp.`updateTime` AS `updated_at`
FROM `sys_plugin` sp
WHERE sp.`pluginId` IS NOT NULL
  AND sp.`pluginId` <> ''
  AND NOT EXISTS (
    SELECT 1
    FROM `sys_extension` se
    WHERE se.`extension_id` = sp.`pluginId`
  );

-- 迁移完成后建议执行一次核对：
-- 1. 检查数量是否一致
-- 2. 检查 extension_id 是否全部唯一
-- 3. 通过应用级补全流程回填 capabilities_json / artifacts_json / manifest_json
