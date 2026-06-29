-- V2 扩展主表草案
-- 目标：
-- 1. 用统一主表承载 theme/module/widget/hybrid 四类扩展
-- 2. 为 Manifest、能力声明、产物快照和运行时恢复提供稳定落点
-- 3. 不再继续向 sys_plugin 堆 V2 核心字段

CREATE TABLE IF NOT EXISTS `sys_extension` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `extension_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '扩展唯一标识，对应 Manifest 的 extension.id',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '扩展名称',
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '扩展类型：theme/module/widget/hybrid',
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '扩展描述',
  `version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '当前安装版本',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '扩展状态：0禁用，1启用',
  `manifest_version` int(11) NOT NULL DEFAULT 2 COMMENT 'Manifest 版本号，旧插件迁移时默认写 1',
  `singleton_flag` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否单例扩展，主题必须为 1',
  `auto_enable` tinyint(1) NOT NULL DEFAULT 0 COMMENT '安装后是否自动启用',
  `entry_priority` int(11) NOT NULL DEFAULT 100 COMMENT '装载优先级，值越小越优先',
  `source_format` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'extension-yaml' COMMENT '声明来源：extension-yaml/legacy-plugin',
  `install_source` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '安装来源：upload/dev-sync/market/migration',
  `host_min_version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '宿主最低兼容版本',
  `host_max_version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '宿主最高兼容版本',
  `author` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者名称',
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者或项目主页',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作者联系邮箱',
  `is_dev` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否开发联调模式',
  `front_dev_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '前端开发联调地址',
  `capabilities_json` json NULL COMMENT '能力声明快照',
  `artifacts_json` json NULL COMMENT '构建产物路径快照',
  `manifest_json` json NULL COMMENT '完整 Manifest 快照',
  `install_checksum` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '安装包校验摘要',
  `created_by` bigint(20) NULL DEFAULT NULL COMMENT '创建人ID',
  `updated_by` bigint(20) NULL DEFAULT NULL COMMENT '更新人ID',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_extension_id` (`extension_id` ASC) USING BTREE,
  INDEX `idx_extension_type` (`type` ASC) USING BTREE,
  INDEX `idx_extension_status` (`status` ASC) USING BTREE,
  INDEX `idx_extension_type_status` (`type` ASC, `status` ASC) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_general_ci
  ROW_FORMAT = DYNAMIC
  COMMENT = 'V2 扩展主记录表';
