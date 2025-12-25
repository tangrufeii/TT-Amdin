/*
 Navicat Premium Dump SQL

 Source Server         : 本地数据
 Source Server Type    : MySQL
 Source Server Version : 80011 (8.0.11)
 Source Host           : localhost:3306
 Source Schema         : tt_admin

 Target Server Type    : MySQL
 Target Server Version : 80011 (8.0.11)
 File Encoding         : 65001

 Date: 25/12/2025 23:29:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `id` bigint(20) NOT NULL COMMENT '部门ID',
  `parent_id` bigint(20) NULL DEFAULT 0 COMMENT '父部门ID',
  `dept_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  `dept_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '部门编码',
  `leader` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '负责人',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
  INDEX `idx_code`(`dept_code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '部门表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` bigint(20) NOT NULL COMMENT '字典ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典编码',
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '字典类型 1:系统字典 2:业务字典',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '字典描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_code`(`code` ASC) USING BTREE,
  INDEX `idx_type`(`type` ASC) USING BTREE,
  INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据字典表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item`  (
  `id` bigint(20) NOT NULL COMMENT '字典项ID',
  `dict_id` bigint(20) NOT NULL COMMENT '父字典ID',
  `dict_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '父字典编码',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '数据值',
  `zh_cn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '中文名称',
  `en_us` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '英文名称',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型(前端渲染类型)',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '字典描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_dict_id`(`dict_id` ASC) USING BTREE,
  INDEX `idx_dict_code`(`dict_code` ASC) USING BTREE,
  INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '数据字典项表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint(20) NOT NULL COMMENT '菜单ID',
  `parent_id` bigint(20) NULL DEFAULT 0 COMMENT '父菜单ID',
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单类型 1:目录 2:菜单 3:按钮',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单编码',
  `i18n_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '多语言标题',
  `route_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由名称',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `icon_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '图标类型 1:iconify 2:local',
  `component` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由组件',
  `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限标识',
  `keep_alive` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N' COMMENT '是否缓存 Y:是 N:否',
  `hide` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N' COMMENT '是否隐藏 Y:是 N:否',
  `href` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '外部链接',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `multi_tab` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N' COMMENT '支持多标签 Y:是 N:否',
  `fixed_index_in_tab` int(11) NULL DEFAULT NULL COMMENT '固定在页签中的序号',
  `query` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由查询参数',
  `iframe_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内嵌链接iframe url',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
  INDEX `idx_code`(`code` ASC) USING BTREE,
  INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '菜单管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 0, '1', '系统管理', 'system', NULL, NULL, '/system', 'mdi:settings', '1', NULL, NULL, 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (2, 1, '2', '用户管理', 'system:user', NULL, NULL, '/system/user', 'mdi:account-group', '1', NULL, 'system:user:list', 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (3, 2, '3', '查看', 'system:user:view', NULL, NULL, NULL, NULL, '1', NULL, 'system:user:query', 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (4, 2, '3', '新增', 'system:user:add', NULL, NULL, NULL, NULL, '1', NULL, 'system:user:add', 'N', 'N', NULL, 2, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (5, 2, '3', '编辑', 'system:user:edit', NULL, NULL, NULL, NULL, '1', NULL, 'system:user:edit', 'N', 'N', NULL, 3, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (6, 2, '3', '删除', 'system:user:delete', NULL, NULL, NULL, NULL, '1', NULL, 'system:user:delete', 'N', 'N', NULL, 4, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (7, 2, '3', '重置密码', 'system:user:reset', NULL, NULL, NULL, NULL, '1', NULL, 'system:user:reset-password', 'N', 'N', NULL, 5, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (10, 1, '2', '角色管理', 'system:role', NULL, NULL, '/system/role', 'mdi:account-key', '1', NULL, 'system:role:list', 'N', 'N', NULL, 2, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (11, 10, '3', '查看', 'system:role:view', NULL, NULL, NULL, NULL, '1', NULL, 'system:role:query', 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (12, 10, '3', '新增', 'system:role:add', NULL, NULL, NULL, NULL, '1', NULL, 'system:role:add', 'N', 'N', NULL, 2, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (13, 10, '3', '编辑', 'system:role:edit', NULL, NULL, NULL, NULL, '1', NULL, 'system:role:edit', 'N', 'N', NULL, 3, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (14, 10, '3', '删除', 'system:role:delete', NULL, NULL, NULL, NULL, '1', NULL, 'system:role:delete', 'N', 'N', NULL, 4, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (15, 10, '3', '分配菜单', 'system:role:menu', NULL, NULL, NULL, NULL, '1', NULL, 'system:role:assign', 'N', 'N', NULL, 5, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (20, 1, '2', '菜单管理', 'system:menu', NULL, NULL, '/system/menu', 'mdi:menu', '1', NULL, 'system:menu:list', 'N', 'N', NULL, 3, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (21, 20, '3', '查看', 'system:menu:view', NULL, NULL, NULL, NULL, '1', NULL, 'system:menu:query', 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (22, 20, '3', '新增', 'system:menu:add', NULL, NULL, NULL, NULL, '1', NULL, 'system:menu:add', 'N', 'N', NULL, 2, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (23, 20, '3', '编辑', 'system:menu:edit', NULL, NULL, NULL, NULL, '1', NULL, 'system:menu:edit', 'N', 'N', NULL, 3, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (24, 20, '3', '删除', 'system:menu:delete', NULL, NULL, NULL, NULL, '1', NULL, 'system:menu:delete', 'N', 'N', NULL, 4, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (30, 1, '2', '字典管理', 'system:dict', NULL, NULL, '/system/dict', 'mdi:book-open-variant', '1', NULL, 'system:dict:list', 'N', 'N', NULL, 4, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (31, 30, '3', '查看', 'system:dict:view', NULL, NULL, NULL, NULL, '1', NULL, 'system:dict:query', 'N', 'N', NULL, 1, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (32, 30, '3', '新增', 'system:dict:add', NULL, NULL, NULL, NULL, '1', NULL, 'system:dict:add', 'N', 'N', NULL, 2, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (33, 30, '3', '编辑', 'system:dict:edit', NULL, NULL, NULL, NULL, '1', NULL, 'system:dict:edit', 'N', 'N', NULL, 3, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_menu` VALUES (34, 30, '3', '删除', 'system:dict:delete', NULL, NULL, NULL, NULL, '1', NULL, 'system:dict:delete', 'N', 'N', NULL, 4, 'N', NULL, NULL, NULL, '1', NULL, '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);

-- ----------------------------
-- Table structure for sys_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation_log`;
CREATE TABLE `sys_operation_log`  (
  `id` bigint(20) NOT NULL COMMENT '日志ID',
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '2' COMMENT '日志类型 1:登录日志 2:操作日志',
  `operation_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作类型',
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求方法',
  `request_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求URL',
  `request_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '请求参数',
  `response_result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '响应结果',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '操作人ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作人用户名',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作IP',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作地点',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '操作状态 0:失败 1:成功',
  `error_msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '错误信息',
  `operation_time` datetime NULL DEFAULT NULL COMMENT '操作时间',
  `duration` bigint(20) NULL DEFAULT NULL COMMENT '执行时长(毫秒)',
  `user_agent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户代理',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '操作描述',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '操作日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_plugin
-- ----------------------------
DROP TABLE IF EXISTS `sys_plugin`;
CREATE TABLE `sys_plugin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名',
  `pluginId` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件id',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件描述',
  `version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '版本',
  `author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者',
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网址',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `isDev` bit(1) NULL DEFAULT NULL COMMENT '是否为开发环境',
  `frontDevAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '开发环境前端地址',
  `status` int(11) NULL DEFAULT 0 COMMENT '插件状态:0禁用,1启用',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int(11) NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int(11) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1567 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_plugin
-- ----------------------------

-- ----------------------------
-- Table structure for sys_position
-- ----------------------------
DROP TABLE IF EXISTS `sys_position`;
CREATE TABLE `sys_position`  (
  `id` bigint(20) NOT NULL COMMENT '岗位ID',
  `position_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位名称',
  `position_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位编码',
  `dept_id` bigint(20) NULL DEFAULT NULL COMMENT '所属部门ID',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '岗位描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_position_code`(`position_code` ASC) USING BTREE,
  INDEX `idx_dept_id`(`dept_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '岗位表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_position
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint(20) NOT NULL COMMENT '角色ID',
  `role_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `role_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色编码',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_role_code`(`role_code` ASC) USING BTREE,
  INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'super_admin', '系统超级管理员，拥有所有权限', 1, '1', '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_role` VALUES (2, '系统管理员', 'admin', '系统管理员，拥有系统管理权限', 2, '1', '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);
INSERT INTO `sys_role` VALUES (3, '普通用户', 'user', '普通用户，基础权限', 3, '1', '2025-12-10 09:39:13', '2025-12-10 09:39:13', 'system', NULL, 0);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` bigint(20) NOT NULL COMMENT '主键ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单ID',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_role_menu`(`role_id` ASC, `menu_id` ASC) USING BTREE,
  INDEX `idx_role_id`(`role_id` ASC) USING BTREE,
  INDEX `idx_menu_id`(`menu_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色菜单关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) NOT NULL COMMENT '用户ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nick_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `real_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '真名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '性别 0:保密 1:男 2:女',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否启用 0:禁用 1:启用',
  `salt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码盐值',
  `last_login_time` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `update_password_time` datetime NULL DEFAULT NULL COMMENT '修改密码时间',
  `dept_id` bigint(20) NULL DEFAULT NULL COMMENT '部门ID',
  `position_id` bigint(20) NULL DEFAULT NULL COMMENT '岗位ID',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user_id` bigint(20) NULL DEFAULT NULL COMMENT '创建人ID',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '逻辑删除 0:未删除 1:已删除',
  `update_user_id` bigint(20) NOT NULL COMMENT '修改用户ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_name`(`user_name` ASC) USING BTREE,
  INDEX `idx_phone`(`phone` ASC) USING BTREE,
  INDEX `idx_email`(`email` ASC) USING BTREE,
  INDEX `idx_dept_id`(`dept_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '123456', '系统管理员', '管理员', NULL, NULL, NULL, '0', '1', 'abc123', NULL, NULL, NULL, NULL, '2025-12-10 09:39:13', '2025-12-19 17:40:13', NULL, 0, 0);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` bigint(20) NOT NULL COMMENT '主键ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_role`(`user_id` ASC, `role_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_role_id`(`role_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户角色关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 1, '2025-12-10 09:39:13', 'system');

SET FOREIGN_KEY_CHECKS = 1;
