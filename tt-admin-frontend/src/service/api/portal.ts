import { request } from '../request';

const API_PREFIX = '/portal/theme';

export function fetchGetCurrentPortalTheme() {
  return request<Api.Portal.PortalThemeCurrent>({
    url: `${API_PREFIX}/current`,
    method: 'GET'
  });
}

export function fetchGetPortalRuntime(themeKey?: string) {
  return request<Api.Portal.PortalRuntime>({
    url: `${API_PREFIX}/runtime`,
    method: 'GET',
    params: themeKey ? { themeKey } : undefined
  });
}

export function fetchGetPortalThemeOptions() {
  return request<Api.Portal.PortalThemeOption[]>({
    url: `${API_PREFIX}/options`,
    method: 'GET'
  });
}

export function fetchSwitchPortalTheme(themeKey: string) {
  return request<Api.Portal.PortalThemeCurrent>({
    url: `${API_PREFIX}/current`,
    method: 'PUT',
    data: { themeKey }
  });
}

export function fetchGetPortalFileThemes() {
  return request<Api.Portal.FileThemeSummary[]>({
    url: '/portal/file-themes',
    method: 'GET'
  });
}

export function fetchGetPortalFileThemeDefinition(themeKey: string) {
  return request<Api.Portal.FileThemeDefinition>({
    url: `/portal/file-themes/${themeKey}/definition`,
    method: 'GET'
  });
}

export function fetchSwitchPortalFileTheme(themeKey: string) {
  return request<Api.Portal.FileThemeSummary>({
    url: '/portal/file-themes/current',
    method: 'PUT',
    data: { themeKey }
  });
}
