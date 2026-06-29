-- Add theme management menus for existing databases.
-- The admin frontend now exposes portal theme pages as a dedicated menu group,
-- instead of embedding the theme workbench on the home dashboard.

SET @theme_parent_id := (SELECT `id` FROM `sys_menu` WHERE `route_name` = 'theme-management' OR `code` = 'theme:management' LIMIT 1);
SET @next_menu_id := (SELECT COALESCE(MAX(`id`), 0) + 1 FROM `sys_menu`);

INSERT INTO `sys_menu`
(`id`,`parent_id`,`type`,`name`,`code`,`i18n_key`,`route_name`,`path`,`icon`,`icon_type`,`component`,`permission`,`keep_alive`,`hide`,`href`,`sort`,`multi_tab`,`fixed_index_in_tab`,`query`,`iframe_url`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`)
SELECT @next_menu_id,0,'1','主题管理','theme:management','route.themeManagement','theme-management','/theme-management','mdi:palette-outline','1','layout.base',NULL,'N','N',NULL,3,'N',NULL,NULL,NULL,'1','theme-management',NOW(),NOW(),'system',NULL,0
WHERE @theme_parent_id IS NULL;

SET @theme_parent_id := COALESCE(@theme_parent_id, @next_menu_id);

UPDATE `sys_menu`
SET `parent_id` = 0,
    `type` = '1',
    `name` = '主题管理',
    `code` = 'theme:management',
    `i18n_key` = 'route.themeManagement',
    `path` = '/theme-management',
    `icon` = 'mdi:palette-outline',
    `icon_type` = '1',
    `component` = 'layout.base',
    `sort` = 3,
    `status` = '1',
    `is_deleted` = 0
WHERE `id` = @theme_parent_id;

SET @portal_theme_menu_id := (SELECT `id` FROM `sys_menu` WHERE `route_name` IN ('theme_management_portal_theme','portal-theme-control') OR `code` = 'portal:theme:list' LIMIT 1);
SET @next_menu_id := (SELECT COALESCE(MAX(`id`), 0) + 1 FROM `sys_menu`);

INSERT INTO `sys_menu`
(`id`,`parent_id`,`type`,`name`,`code`,`i18n_key`,`route_name`,`path`,`icon`,`icon_type`,`component`,`permission`,`keep_alive`,`hide`,`href`,`sort`,`multi_tab`,`fixed_index_in_tab`,`query`,`iframe_url`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`)
SELECT @next_menu_id,@theme_parent_id,'2','门户主题','portal:theme:list','route.portal-theme-control','theme_management_portal_theme','/theme-management/portal-themes','mdi:web','1','view.portal-theme-control',NULL,'N','N',NULL,1,'N',NULL,NULL,NULL,'1','theme-management',NOW(),NOW(),'system',NULL,0
WHERE @portal_theme_menu_id IS NULL;

UPDATE `sys_menu`
SET `parent_id` = @theme_parent_id,
    `type` = '2',
    `name` = '门户主题',
    `code` = 'portal:theme:list',
    `i18n_key` = 'route.portal-theme-control',
    `route_name` = 'theme_management_portal_theme',
    `path` = '/theme-management/portal-themes',
    `icon` = 'mdi:web',
    `icon_type` = '1',
    `component` = 'view.portal-theme-control',
    `sort` = 1,
    `status` = '1',
    `is_deleted` = 0
WHERE `route_name` IN ('theme_management_portal_theme','portal-theme-control')
   OR `code` = 'portal:theme:list';

SET @portal_orchestration_menu_id := (SELECT `id` FROM `sys_menu` WHERE `route_name` IN ('theme_management_portal_orchestration','portal-orchestration') OR `code` = 'portal:orchestration' LIMIT 1);
SET @next_menu_id := (SELECT COALESCE(MAX(`id`), 0) + 1 FROM `sys_menu`);

INSERT INTO `sys_menu`
(`id`,`parent_id`,`type`,`name`,`code`,`i18n_key`,`route_name`,`path`,`icon`,`icon_type`,`component`,`permission`,`keep_alive`,`hide`,`href`,`sort`,`multi_tab`,`fixed_index_in_tab`,`query`,`iframe_url`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`)
SELECT @next_menu_id,@theme_parent_id,'2','挂件编排','portal:orchestration','route.portal-orchestration','theme_management_portal_orchestration','/theme-management/portal-orchestration','mdi:view-grid-plus-outline','1','view.portal-orchestration',NULL,'N','N',NULL,2,'N',NULL,NULL,NULL,'1','theme-management',NOW(),NOW(),'system',NULL,0
WHERE @portal_orchestration_menu_id IS NULL;

UPDATE `sys_menu`
SET `parent_id` = @theme_parent_id,
    `type` = '2',
    `name` = '挂件编排',
    `code` = 'portal:orchestration',
    `i18n_key` = 'route.portal-orchestration',
    `route_name` = 'theme_management_portal_orchestration',
    `path` = '/theme-management/portal-orchestration',
    `icon` = 'mdi:view-grid-plus-outline',
    `icon_type` = '1',
    `component` = 'view.portal-orchestration',
    `sort` = 2,
    `status` = '1',
    `is_deleted` = 0
WHERE `route_name` IN ('theme_management_portal_orchestration','portal-orchestration')
   OR `code` = 'portal:orchestration';

SET @portal_preview_menu_id := (SELECT `id` FROM `sys_menu` WHERE `route_name` IN ('theme_management_portal_preview','portal-preview') OR `code` = 'portal:preview' LIMIT 1);
SET @next_menu_id := (SELECT COALESCE(MAX(`id`), 0) + 1 FROM `sys_menu`);

INSERT INTO `sys_menu`
(`id`,`parent_id`,`type`,`name`,`code`,`i18n_key`,`route_name`,`path`,`icon`,`icon_type`,`component`,`permission`,`keep_alive`,`hide`,`href`,`sort`,`multi_tab`,`fixed_index_in_tab`,`query`,`iframe_url`,`status`,`remark`,`create_time`,`update_time`,`create_user`,`update_user`,`is_deleted`)
SELECT @next_menu_id,@theme_parent_id,'2','门户预览','portal:preview','route.portal-preview','theme_management_portal_preview','/theme-management/portal-preview','mdi:monitor-eye','1','view.portal-preview',NULL,'N','N',NULL,3,'N',NULL,NULL,NULL,'1','theme-management',NOW(),NOW(),'system',NULL,0
WHERE @portal_preview_menu_id IS NULL;

UPDATE `sys_menu`
SET `parent_id` = @theme_parent_id,
    `type` = '2',
    `name` = '门户预览',
    `code` = 'portal:preview',
    `i18n_key` = 'route.portal-preview',
    `route_name` = 'theme_management_portal_preview',
    `path` = '/theme-management/portal-preview',
    `icon` = 'mdi:monitor-eye',
    `icon_type` = '1',
    `component` = 'view.portal-preview',
    `sort` = 3,
    `status` = '1',
    `is_deleted` = 0
WHERE `route_name` IN ('theme_management_portal_preview','portal-preview')
   OR `code` = 'portal:preview';

UPDATE `sys_menu`
SET `sort` = 4
WHERE `route_name` = 'system' AND `sort` = 3;

UPDATE `sys_menu`
SET `sort` = 5
WHERE `route_name` = 'docs' AND `sort` = 4;

SET @super_admin_role_id := (SELECT `id` FROM `sys_role` WHERE `role_code` = 'super_admin' LIMIT 1);
SET @next_role_menu_id := (SELECT COALESCE(MAX(`id`), 0) FROM `sys_role_menu`);

INSERT INTO `sys_role_menu` (`id`,`role_id`,`menu_id`,`create_time`,`create_user`)
SELECT (@next_role_menu_id := @next_role_menu_id + 1),@super_admin_role_id,menu.`id`,NOW(),'system'
FROM `sys_menu` menu
WHERE @super_admin_role_id IS NOT NULL
  AND menu.`route_name` IN (
    'theme-management',
    'theme_management_portal_theme',
    'theme_management_portal_orchestration',
    'theme_management_portal_preview'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM `sys_role_menu` relation
    WHERE relation.`role_id` = @super_admin_role_id
      AND relation.`menu_id` = menu.`id`
  );
