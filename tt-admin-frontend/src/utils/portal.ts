/**
 * 解析 iframe 和 window.open 使用的后端门户基础地址。
 *
 * 门户渲染是后端 HTML 端点，因此它遵循 VITE_SERVICE_BASE_URL，
 * 而不是管理端前端 origin。
 */
export function getPortalServiceBaseURL() {
  return (import.meta.env.VITE_SERVICE_BASE_URL || '').replace(/\/$/, '');
}

/**
 * 生成门户首页 URL。
 */
export function getPortalHomeUrl() {
  const baseURL = getPortalServiceBaseURL();
  return baseURL ? `${baseURL}/` : '/';
}

/**
 * 生成文件主题渲染 URL。
 *
 * @param themeKey 在 resources/themes 下声明的主题目录键
 */
export function getPortalRenderUrl(themeKey: string) {
  if (!themeKey) return '';

  const baseURL = getPortalServiceBaseURL();
  return `${baseURL}/portal/render?themeKey=${encodeURIComponent(themeKey)}`;
}
