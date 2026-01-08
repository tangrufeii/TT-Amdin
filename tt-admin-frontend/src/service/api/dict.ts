import { request } from '../request';

/** get all dict items */
export function fetchGetAllDicts() {
  return request<Api.SystemManage.Dict[]>({ url: '/dict/all' });
}
