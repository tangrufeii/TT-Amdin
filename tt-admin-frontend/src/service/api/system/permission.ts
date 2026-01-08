import { request } from '../../request';

const API_PREFIX = '/system/permission';

export function fetchGetPermissionPage(data: Api.SystemManage.PermissionSearchParams) {
  return request<Api.SystemManage.PermissionList>({ url: `${API_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetPermissionDetail(id: number | string) {
  return request<Api.SystemManage.Permission>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddPermission(data: Api.SystemManage.PermissionEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdatePermission(data: Api.SystemManage.PermissionEdit & { id: number }) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeletePermission(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}

export function fetchGetPermissionAnnotations() {
  return request<Record<string, string>>({ url: `${API_PREFIX}/annotations` });
}

export function fetchGetMenuPermissions() {
  return request<Api.SystemManage.MenuPermission[]>({ url: `${API_PREFIX}/menu` });
}
