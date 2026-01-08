import { request } from '../../request';

const API_PREFIX = '/system/dict';
const ITEM_PREFIX = '/system/dict/item';

export function fetchGetDictPageList(data: Api.SystemManage.DictSearchParams) {
  return request<Api.SystemManage.DictPageList>({ url: `${API_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetDictList(params?: Partial<Api.SystemManage.DictSearchParams>) {
  return request<Api.SystemManage.DictTree[]>({ url: `${API_PREFIX}/list`, params });
}

export function fetchGetEditDict(id: string | number) {
  return request<Api.SystemManage.DictEdit>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdateDict(data: Api.SystemManage.DictEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeleteDict(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}

export function fetchGetDictItemPageList(data: Api.SystemManage.DictItemSearchParams) {
  return request<Api.SystemManage.DictItemPageList>({ url: `${ITEM_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetEditDictItem(id: string | number) {
  return request<Api.SystemManage.DictItemEdit>({ url: `${ITEM_PREFIX}/${id}` });
}

export function fetchAddDictItem(data: Api.SystemManage.DictItemEdit & { dictId: number; dictCode: string }) {
  return request<boolean>({ url: ITEM_PREFIX, method: 'POST', data });
}

export function fetchUpdateDictItem(data: Api.SystemManage.DictItemEdit & { dictId: number; dictCode: string }) {
  return request<boolean>({ url: ITEM_PREFIX, method: 'PUT', data });
}

export function fetchDeleteDictItem(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: ITEM_PREFIX, method: 'DELETE', data });
}
