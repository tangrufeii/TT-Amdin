import { request } from '../../request';

const API_PREFIX = '/system/menu';

export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTreeData[]>({ url: `${API_PREFIX}/tree` });
}

export function fetchGetMenuDetail(id: string | number) {
  return request<Api.SystemManage.MenuDetail>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddMenu(data: Api.SystemManage.MenuEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdateMenu(data: Api.SystemManage.MenuEdit & { id: number }) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeleteMenu(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}

export function fetchGetAllPages() {
  return request<string[]>({ url: `${API_PREFIX}/allPages` });
}
