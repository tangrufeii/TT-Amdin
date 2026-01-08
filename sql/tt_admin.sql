/*
 Navicat Premium Dump SQL

 Source Server         : ??????
 Source Server Type    : MySQL
 Source Server Version : 80011 (8.0.11)
 Source Host           : localhost:3306
 Source Schema         : tt_admin

 Target Server Type    : MySQL
 Target Server Version : 80011 (8.0.11)
 File Encoding         : 65001

 Date: 05/01/2026 15:59:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
                             `id` bigint(20) NOT NULL,
                             `parent_id` bigint(20) NULL DEFAULT 0,
                             `dept_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `dept_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `leader` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `sort` int(11) NULL DEFAULT 0,
                             `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                             `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `is_deleted` tinyint(4) NULL DEFAULT 0,
                             PRIMARY KEY (`id`) USING BTREE,
                             INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
                             INDEX `idx_code`(`dept_code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- Records of sys_dept
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
                             `id` bigint(20) NOT NULL,
                             `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `sort` int(11) NULL DEFAULT 0,
                             `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                             `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `is_deleted` tinyint(4) NULL DEFAULT 0,
                             PRIMARY KEY (`id`) USING BTREE,
                             UNIQUE INDEX `uk_code`(`code` ASC) USING BTREE,
                             INDEX `idx_type`(`type` ASC) USING BTREE,
                             INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------

INSERT INTO `sys_dict` (`id`,`name`,`code`,`type`,`sort`,`description`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`) VALUES
(1,'性别','gender','1',1,'性别字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(2,'菜单类型','menu_type','1',2,'菜单类型字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(3,'状态','status','1',3,'状态字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(4,'功能状态','feature_status','1',4,'功能状态字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(5,'菜单图标类型','menu_icon_type','1',5,'菜单图标类型字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(6,'前端页面','frontend_page','1',6,'前端页面字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(7,'字典类型','dict_type','1',7,'字典类型字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(8,'通知类型','notice_category','2',8,'通知类型字典','1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0);

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item`  (
                                  `id` bigint(20) NOT NULL,
                                  `dict_id` bigint(20) NOT NULL,
                                  `dict_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                  `zh_cn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                  `en_us` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `sort` int(11) NULL DEFAULT 0,
                                  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                                  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  `is_deleted` tinyint(4) NULL DEFAULT 0,
                                  PRIMARY KEY (`id`) USING BTREE,
                                  INDEX `idx_dict_id`(`dict_id` ASC) USING BTREE,
                                  INDEX `idx_dict_code`(`dict_code` ASC) USING BTREE,
                                  INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------

INSERT INTO `sys_dict_item` (`id`,`dict_id`,`dict_code`,`value`,`zh_cn`,`en_us`,`type`,`sort`,`description`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`) VALUES
(1,1,'gender','male','男','Male',NULL,1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(2,1,'gender','female','女','Female',NULL,2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(3,2,'menu_type','1','目录','Directory','primary',1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(4,2,'menu_type','2','菜单','Menu','info',2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(5,3,'status','1','启用','Enabled','success',1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(6,3,'status','0','禁用','Disabled','error',2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(7,4,'feature_status','Y','是','Yes','success',1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(8,4,'feature_status','N','否','No','default',2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(9,5,'menu_icon_type','1','Iconify 图标','Iconify','info',1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(10,5,'menu_icon_type','2','本地图标','Local Icon','warning',2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(11,6,'frontend_page','system_dict','system_dict','system_dict',NULL,1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(12,6,'frontend_page','system_menu','system_menu','system_menu',NULL,2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(13,6,'frontend_page','system_user','system_user','system_user',NULL,3,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(14,6,'frontend_page','system_role','system_role','system_role',NULL,4,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(15,6,'frontend_page','system_notice','system_notice','system_notice',NULL,5,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(16,6,'frontend_page','system_docs_docs-plugin-dev','docs_plugin_dev','docs_plugin_dev',NULL,6,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(17,6,'frontend_page','system_docs_docs-project-intro','docs_project_intro','docs_project_intro',NULL,7,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(18,7,'dict_type','1','系统字典','System Dict',NULL,1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(19,7,'dict_type','2','业务字典','Business Dict',NULL,2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(20,8,'notice_category','1','通知','Notice',NULL,1,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(21,8,'notice_category','2','公告','Announcement',NULL,2,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
                             `id` bigint(20) NOT NULL,
                             `parent_id` bigint(20) NULL DEFAULT 0,
                             `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `i18n_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `route_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `icon_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `component` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `permission` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `keep_alive` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N',
                             `hide` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N',
                             `href` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `sort` int(11) NULL DEFAULT 0,
                             `multi_tab` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N',
                             `fixed_index_in_tab` int(11) NULL DEFAULT NULL,
                             `query` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `iframe_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                             `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `is_deleted` tinyint(4) NULL DEFAULT 0,
                             PRIMARY KEY (`id`) USING BTREE,
                             INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
                             INDEX `idx_code`(`code` ASC) USING BTREE,
                             INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------

INSERT INTO `sys_menu` (`id`,`parent_id`,`type`,`name`,`code`,`i18n_key`,`route_name`,`path`,`icon`,`icon_type`,`component`,`permission`,`keep_alive`,`hide`,`href`,`sort`,`multi_tab`,`fixed_index_in_tab`,`query`,`iframe_url`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`) VALUES
(1,0,'2','首页','dashboard:home','route.home','home','/home','mdi:monitor-dashboard','1','layout.base$view.home',NULL,'N','N',NULL,1,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(2,0,'2','插件管理','plugin:management','route.pluginManagement','plugin-management','/plugin-management','mdi:puzzle-outline','1','layout.base$view.plugin-management',NULL,'N','N',NULL,2,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(3,0,'1','系统管理','system:management','route.systemManagement','system','/system','mdi:cog-outline','1','layout.base',NULL,'N','N',NULL,3,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(4,3,'2','字典管理','system:dict','route.systemDict','system_dict','/system/dict','mdi:book-open-variant','1','view.system_dict',NULL,'N','N',NULL,1,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(5,3,'2','菜单管理','system:menu','route.systemMenu','system_menu','/system/menu','mdi:menu','1','view.system_menu',NULL,'N','N',NULL,2,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(6,3,'2','用户管理','system:user','route.systemUser','system_user','/system/user','mdi:account-circle-outline','1','view.system_user',NULL,'N','N',NULL,3,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(7,3,'2','角色管理','system:role','route.systemRole','system_role','/system/role','mdi:shield-account-outline','1','view.system_role',NULL,'N','N',NULL,4,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(8,3,'2','通知公告','system:notice','route.systemNotice','system_notice','/system/notice','mdi:bell-outline','1','view.system_notice',NULL,'N','N',NULL,5,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(9,0,'1','文档','docs:root','route.docs','docs','/docs','mdi:book-open-page-variant','1','layout.base',NULL,'N','N',NULL,4,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(10,9,'2','插件开发','docs:plugin-dev','route.pluginDev','docs_plugin_dev','/docs/plugin-dev','mdi:puzzle-outline','1','view.docs_plugin_dev',NULL,'N','N',NULL,1,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(11,9,'2','项目介绍','docs:project-intro','route.projectIntro','docs_project_intro','/docs/project','mdi:file-document-outline','1','view.docs_project_intro',NULL,'N','N',NULL,2,'N',NULL,NULL,NULL,'1',NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0);

-- ----------------------------
-- Table structure for sys_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation_log`;
CREATE TABLE `sys_operation_log`  (
                                      `id` bigint(20) NOT NULL,
                                      `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '2',
                                      `operation_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `request_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `request_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
                                      `response_result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
                                      `user_id` bigint(20) NULL DEFAULT NULL,
                                      `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                                      `error_msg` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `operation_time` datetime NULL DEFAULT NULL,
                                      `duration` bigint(20) NULL DEFAULT NULL,
                                      `user_agent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                      `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission`  (
                                   `id` bigint(20) NOT NULL,
                                   `menu_id` bigint(20) NOT NULL,
                                   `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                   `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                   `resource` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                   `sort` int(11) NULL DEFAULT 0,
                                   `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                   `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                                   `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                   `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------

INSERT INTO `sys_permission` (`id`,`menu_id`,`name`,`code`,`resource`,`sort`,`description`,`status`,`create_time`,`update_time`) VALUES
(1,2,'插件安装','plugin:install','plugin:install',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(2,2,'插件启用','plugin:enable','plugin:enable',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(3,2,'插件禁用','plugin:disable','plugin:disable',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(4,4,'字典列表','sys:dict:list','sys:dict:list',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(5,4,'字典新增','sys:dict:add','sys:dict:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(6,4,'字典更新','sys:dict:update','sys:dict:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(7,4,'字典删除','sys:dict:delete','sys:dict:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(8,4,'字典项分页','sys:dict:item:page','sys:dict:item:page',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(9,4,'字典项新增','sys:dict:item:add','sys:dict:item:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(10,4,'字典项更新','sys:dict:item:update','sys:dict:item:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(11,4,'字典项删除','sys:dict:item:delete','sys:dict:item:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(12,6,'用户分页','sys:user:page','sys:user:page',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(13,6,'用户新增','sys:user:add','sys:user:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(14,6,'用户更新','sys:user:update','sys:user:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(15,6,'用户删除','sys:user:delete','sys:user:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(16,6,'重置密码','sys:user:resetPassword','sys:user:resetPassword',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(17,7,'角色分页','sys:role:page','sys:role:page',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(18,7,'角色新增','sys:role:add','sys:role:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(19,7,'角色更新','sys:role:update','sys:role:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(20,7,'角色删除','sys:role:delete','sys:role:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(21,7,'角色菜单授权','sys:role:menu:add','sys:role:menu:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(22,7,'角色按钮授权','sys:role:permission:add','sys:role:permission:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(23,7,'角色列表','sys:role:all','sys:role:all',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(24,5,'菜单新增','sys:menu:add','sys:menu:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(25,5,'菜单更新','sys:menu:update','sys:menu:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(26,5,'菜单删除','sys:menu:delete','sys:menu:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(27,8,'公告新增','sys:notice:add','sys:notice:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(28,8,'公告更新','sys:notice:update','sys:notice:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(29,8,'公告删除','sys:notice:delete','sys:notice:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(30,5,'按钮权限新增','sys:permission:add','sys:permission:add',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(31,5,'按钮权限更新','sys:permission:update','sys:permission:update',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13'),
(32,5,'按钮权限删除','sys:permission:delete','sys:permission:delete',0,'','1','2025-12-10 09:39:13','2025-12-10 09:39:13');

-- ----------------------------
-- Table structure for sys_plugin
-- ----------------------------
DROP TABLE IF EXISTS `sys_plugin`;
CREATE TABLE `sys_plugin`  (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                               `pluginId` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `isDev` bit(1) NULL DEFAULT NULL,
                               `frontDevAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                               `status` int(11) NULL DEFAULT 0,
                               `createTime` datetime NULL DEFAULT NULL,
                               `updateTime` datetime NULL DEFAULT NULL,
                               `createUserId` int(11) NULL DEFAULT NULL,
                               `updateUserId` int(11) NULL DEFAULT NULL,
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
                                 `id` bigint(20) NOT NULL,
                                 `position_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                 `position_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                 `dept_id` bigint(20) NULL DEFAULT NULL,
                                 `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                 `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                                 `sort` int(11) NULL DEFAULT 0,
                                 `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                 `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                 `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                 `is_deleted` tinyint(4) NULL DEFAULT 0,
                                 PRIMARY KEY (`id`) USING BTREE,
                                 UNIQUE INDEX `uk_position_code`(`position_code` ASC) USING BTREE,
                                 INDEX `idx_dept_id`(`dept_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_position
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
                             `id` bigint(20) NOT NULL,
                             `role_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `role_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `sort` int(11) NULL DEFAULT 0,
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                             `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `update_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `is_deleted` tinyint(4) NULL DEFAULT 0,
                             PRIMARY KEY (`id`) USING BTREE,
                             UNIQUE INDEX `uk_role_code`(`role_code` ASC) USING BTREE,
                             INDEX `idx_sort`(`sort` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

INSERT INTO `sys_role` (`id`,`role_name`,`role_code`,`description`,`sort`,`status`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`) VALUES
(1,'超级管理员','super_admin','系统超级管理员',1,'1','2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(2,'管理员','admin','系统管理员',2,'1','2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0),
(3,'普通用户','user','普通用户',3,'1','2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
                                  `id` bigint(20) NOT NULL,
                                  `role_id` bigint(20) NOT NULL,
                                  `menu_id` bigint(20) NOT NULL,
                                  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  PRIMARY KEY (`id`) USING BTREE,
                                  UNIQUE INDEX `uk_role_menu`(`role_id` ASC, `menu_id` ASC) USING BTREE,
                                  INDEX `idx_role_id`(`role_id` ASC) USING BTREE,
                                  INDEX `idx_menu_id`(`menu_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

INSERT INTO `sys_role_menu` (`id`,`role_id`,`menu_id`,`create_time`,`create_user`) VALUES
(1,1,1,'2025-12-10 09:39:13','system'),(2,1,2,'2025-12-10 09:39:13','system'),(3,1,3,'2025-12-10 09:39:13','system'),(4,1,4,'2025-12-10 09:39:13','system'),(5,1,5,'2025-12-10 09:39:13','system'),(6,1,6,'2025-12-10 09:39:13','system'),(7,1,7,'2025-12-10 09:39:13','system'),(8,1,8,'2025-12-10 09:39:13','system'),(9,1,9,'2025-12-10 09:39:13','system'),(10,1,10,'2025-12-10 09:39:13','system'),(11,1,11,'2025-12-10 09:39:13','system'),
(12,2,1,'2025-12-10 09:39:13','system'),(13,2,3,'2025-12-10 09:39:13','system'),(14,2,4,'2025-12-10 09:39:13','system'),(15,2,5,'2025-12-10 09:39:13','system'),(16,2,6,'2025-12-10 09:39:13','system'),(17,2,7,'2025-12-10 09:39:13','system'),(18,2,8,'2025-12-10 09:39:13','system');

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission`  (
                                        `role_id` bigint(20) NOT NULL,
                                        `permission_id` bigint(20) NOT NULL,
                                        PRIMARY KEY (`role_id`, `permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------

INSERT INTO `sys_role_permission` (`role_id`,`permission_id`) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),
(1,21),
(1,22),
(1,23),
(1,24),
(1,25),
(1,26),
(1,27),
(1,28),
(1,29),
(1,30),
(1,31),
(1,32),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(2,16),
(2,17),
(2,18),
(2,19),
(2,20),
(2,21),
(2,22),
(2,23),
(2,24),
(2,25),
(2,26),
(2,27),
(2,28),
(2,29),
(2,30),
(2,31),
(2,32);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
                             `id` bigint(20) NOT NULL,
                             `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `nick_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `real_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0',
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
                             `salt` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `last_login_time` datetime NULL DEFAULT NULL,
                             `update_password_time` datetime NULL DEFAULT NULL,
                             `dept_id` bigint(20) NULL DEFAULT NULL,
                             `position_id` bigint(20) NULL DEFAULT NULL,
                             `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                             `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                             `create_user_id` bigint(20) NULL DEFAULT NULL,
                             `is_deleted` tinyint(4) NULL DEFAULT 0,
                             `update_user_id` bigint(20) NOT NULL,
                             PRIMARY KEY (`id`) USING BTREE,
                             UNIQUE INDEX `uk_user_name`(`user_name` ASC) USING BTREE,
                             INDEX `idx_phone`(`phone` ASC) USING BTREE,
                             INDEX `idx_email`(`email` ASC) USING BTREE,
                             INDEX `idx_dept_id`(`dept_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------

INSERT INTO `sys_user` (`id`,`user_name`,`password`,`nick_name`,`real_name`,`avatar`,`email`,`phone`,`gender`,`status`,`salt`,`last_login_time`,`update_password_time`,`dept_id`,`position_id`,`create_time`,`update_time`,`create_user`,`create_user_id`,`is_deleted`,`update_user_id`) VALUES
(1,'admin','123456','System Admin','Admin',NULL,NULL,NULL,'0','1','abc123',NULL,NULL,NULL,NULL,'2025-12-10 09:39:13','2025-12-10 09:39:13','system',NULL,0,0);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
                                  `id` bigint(20) NOT NULL,
                                  `user_id` bigint(20) NOT NULL,
                                  `role_id` bigint(20) NOT NULL,
                                  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                  PRIMARY KEY (`id`) USING BTREE,
                                  UNIQUE INDEX `uk_user_role`(`user_id` ASC, `role_id` ASC) USING BTREE,
                                  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
                                  INDEX `idx_role_id`(`role_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------

INSERT INTO `sys_user_role` (`id`,`user_id`,`role_id`,`create_time`,`create_user`) VALUES
(1,1,1,'2025-12-10 09:39:13','system');

-- ----------------------------
-- Table structure for sys_backup_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_backup_config`;
CREATE TABLE `sys_backup_config`  (
                                      `id` bigint(20) NOT NULL,
                                      `db_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'auto',
                                      `backup_type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'dump',
                                      `custom_command` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
                                      `cron` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0 0 2 * * ?',
                                      `enabled` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'Y',
                                      `retention_days` int(11) NULL DEFAULT 7,
                                      `target_dir` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `last_run_time` datetime NULL DEFAULT NULL,
                                      `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                      `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                      PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for sys_backup_record
-- ----------------------------
DROP TABLE IF EXISTS `sys_backup_record`;
CREATE TABLE `sys_backup_record`  (
                                      `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                      `config_id` bigint(20) NOT NULL,
                                      `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `file_path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                      `file_size` bigint(20) NULL DEFAULT 0,
                                      `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0',
                                      `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
                                      `start_time` datetime NULL DEFAULT NULL,
                                      `end_time` datetime NULL DEFAULT NULL,
                                      `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
                                      PRIMARY KEY (`id`) USING BTREE,
                                      INDEX `idx_config_id`(`config_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for sys_monitor_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_monitor_config`;
CREATE TABLE `sys_monitor_config`  (
                                       `id` bigint(20) NOT NULL,
                                       `cpu_threshold` int(11) NULL DEFAULT 60,
                                       `memory_threshold` int(11) NULL DEFAULT 60,
                                       `disk_threshold` int(11) NULL DEFAULT 60,
                                       `enabled` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'Y',
                                       `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                       PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;






-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `id` bigint(20) NOT NULL,
  `category` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `release_time` datetime NULL DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_user_id` bigint(20) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_user_id` bigint(20) NULL DEFAULT NULL,
  `is_deleted` tinyint(4) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` (`id`,`category`,`title`,`content`,`release_time`,`status`,`remark`,`create_user`,`create_user_id`,`create_time`,`update_time`,`update_user_id`,`is_deleted`) VALUES
(1,'1','Welcome','Welcome to TT Admin',NULL,'1',NULL,'system',1,'2025-12-10 09:39:13','2025-12-10 09:39:13',NULL,0);

-- ----------------------------
-- Table structure for tool_generator_table
-- ----------------------------
DROP TABLE IF EXISTS `tool_generator_table`;
CREATE TABLE `tool_generator_table` (
  `id` bigint(20) NOT NULL COMMENT 'primary key',
  `table_name` varchar(100) NOT NULL COMMENT 'table name',
  `table_comment` varchar(255) DEFAULT NULL COMMENT 'table comment',
  `table_prefix` varchar(50) DEFAULT NULL COMMENT 'table prefix',
  `plugin_id` varchar(100) NOT NULL COMMENT 'plugin id',
  `plugin_name` varchar(100) NOT NULL COMMENT 'plugin name',
  `version` varchar(32) DEFAULT '1.0.0' COMMENT 'plugin version',
  `parent_package` varchar(200) NOT NULL COMMENT 'parent package',
  `module_name` varchar(100) NOT NULL COMMENT 'module name',
  `route_path` varchar(200) DEFAULT NULL COMMENT 'route path',
  `menu_name` varchar(100) DEFAULT NULL COMMENT 'menu name',
  `i18n_key` varchar(100) DEFAULT NULL COMMENT 'i18n key',
  `icon` varchar(100) DEFAULT NULL COMMENT 'icon',
  `include_table_sql` char(1) DEFAULT '1' COMMENT 'include table sql',
  `parent_menu_id` bigint(20) DEFAULT 0 COMMENT 'parent menu id',
  `author` varchar(100) DEFAULT NULL COMMENT 'author',
  `status` char(1) DEFAULT '1' COMMENT 'status',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
  `create_user` varchar(50) DEFAULT NULL COMMENT 'create user',
  `update_user` varchar(50) DEFAULT NULL COMMENT 'update user',
  `is_deleted` tinyint(4) DEFAULT 0 COMMENT 'deleted flag',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_table_name` (`table_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='codegen table';

-- ----------------------------
-- Table structure for tool_generator_table_column
-- ----------------------------
DROP TABLE IF EXISTS `tool_generator_table_column`;
CREATE TABLE `tool_generator_table_column` (
  `id` bigint(20) NOT NULL COMMENT 'primary key',
  `table_id` bigint(20) NOT NULL COMMENT 'table id',
  `table_name` varchar(100) NOT NULL COMMENT 'table name',
  `column_name` varchar(100) NOT NULL COMMENT 'column name',
  `property_name` varchar(100) NOT NULL COMMENT 'property name',
  `column_comment` varchar(200) DEFAULT NULL COMMENT 'column comment',
  `data_type` varchar(100) DEFAULT NULL COMMENT 'data type',
  `java_type` varchar(100) DEFAULT NULL COMMENT 'java type',
  `typescript_type` varchar(100) DEFAULT NULL COMMENT 'typescript type',
  `ordinal_position` int(11) DEFAULT NULL COMMENT 'ordinal position',
  `is_i18n` char(1) DEFAULT '1' COMMENT 'i18n',
  `is_required` char(1) DEFAULT '0' COMMENT 'required',
  `is_list` char(1) DEFAULT '0' COMMENT 'list',
  `is_search` char(1) DEFAULT '0' COMMENT 'search',
  `search_type` varchar(32) DEFAULT NULL COMMENT 'search type',
  `is_added` char(1) DEFAULT '0' COMMENT 'add',
  `is_edit` char(1) DEFAULT '0' COMMENT 'edit',
  `dict_code` varchar(100) DEFAULT NULL COMMENT 'dict code',
  `render_type` varchar(32) DEFAULT 'input' COMMENT 'render type',
  `form_disabled` char(1) DEFAULT '0' COMMENT 'form disabled',
  `form_readonly` char(1) DEFAULT '0' COMMENT 'form readonly',
  `min_length` int(11) DEFAULT NULL COMMENT 'min length',
  `max_length` int(11) DEFAULT NULL COMMENT 'max length',
  `min_value` decimal(18,6) DEFAULT NULL COMMENT 'min value',
  `max_value` decimal(18,6) DEFAULT NULL COMMENT 'max value',
  `pattern` varchar(200) DEFAULT NULL COMMENT 'pattern',
  `component_props` text COMMENT 'component props',
  `form_span` int(11) DEFAULT 12 COMMENT 'form span',
  `search_span` int(11) DEFAULT 12 COMMENT 'search span',
  `list_width` int(11) DEFAULT 160 COMMENT 'list width',
  `placeholder` varchar(200) DEFAULT NULL COMMENT 'placeholder',
  `default_value` varchar(200) DEFAULT NULL COMMENT 'default value',
  `status` char(1) DEFAULT '1' COMMENT 'status',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
  `create_user` varchar(50) DEFAULT NULL COMMENT 'create user',
  `update_user` varchar(50) DEFAULT NULL COMMENT 'update user',
  `is_deleted` tinyint(4) DEFAULT 0 COMMENT 'deleted flag',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_table_id` (`table_id`) USING BTREE,
  INDEX `idx_column_name` (`column_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='codegen table column';
