import { request } from '../../request';

const API_PREFIX = '/system/user';

export function fetchGetUserPage(data: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({ url: `${API_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetUserDetail(id: number | string) {
  return request<Api.SystemManage.User>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddUser(data: Api.SystemManage.UserEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdateUser(data: Api.SystemManage.UserEdit & { id: number }) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeleteUser(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}

export function fetchResetUserPassword(id: number | string) {
  return request<string>({ url: `${API_PREFIX}/reset-password/${id}`, method: 'PUT' });
}
