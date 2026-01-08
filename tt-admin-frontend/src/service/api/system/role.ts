import { request } from '../../request';

const API_PREFIX = '/system/role';

export function fetchGetRolePage(data: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({ url: `${API_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetRoleDetail(id: number | string) {
  return request<Api.SystemManage.Role>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddRole(data: Api.SystemManage.RoleEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdateRole(data: Api.SystemManage.RoleEdit & { id: number }) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeleteRole(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}

export function fetchGetAllRoles() {
  return request<Api.SystemManage.RoleOption[]>({ url: `${API_PREFIX}/all` });
}

export function fetchGetRoleMenuIds(roleId: number | string) {
  return request<number[]>({ url: `${API_PREFIX}/menu/${roleId}` });
}

export function fetchSaveRoleMenus(data: Api.SystemManage.RoleMenu) {
  return request<boolean>({ url: `${API_PREFIX}/menu`, method: 'POST', data });
}

export function fetchGetRolePermissionIds(roleId: number | string) {
  return request<number[]>({ url: `${API_PREFIX}/permission/${roleId}` });
}

export function fetchSaveRolePermissions(data: Api.SystemManage.RolePermission) {
  return request<boolean>({ url: `${API_PREFIX}/permission`, method: 'POST', data });
}

export function fetchGetPermissionTree() {
  return request<Api.SystemManage.PermissionTree[]>({ url: `${API_PREFIX}/permission/tree` });
}
