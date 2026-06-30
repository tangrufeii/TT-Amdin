/**
 * 解析门户页面使用的基础地址。
 *
 * 门户入口应该走站点根路径 `/`，不是接口前缀 `/api`。
 */
export function getPortalBaseURL() {
  return (import.meta.env.VITE_PORTAL_BASE_URL || '/').replace(/\/$/, '') || '/';
}

/**
 * 生成门户首页 URL。
 */
export function getPortalHomeUrl() {
  const baseURL = getPortalBaseURL();
  return baseURL === '/' ? '/' : `${baseURL}/`;
}

/**
 * 生成文件主题渲染 URL。
 *
 * @param themeKey 在 resources/themes 下声明的主题目录键
 */
export function getPortalRenderUrl(themeKey: string) {
  if (!themeKey) return '';

  const baseURL = getPortalBaseURL();
  const prefix = baseURL === '/' ? '' : baseURL;
  return `${prefix}/portal/render?themeKey=${encodeURIComponent(themeKey)}`;
}
