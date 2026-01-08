import { request } from '../../request';

const API_PREFIX = '/system/notice';

export function fetchGetNoticePage(data: Api.SystemManage.NoticeSearchParams) {
  return request<Api.SystemManage.NoticeList>({ url: `${API_PREFIX}/page`, method: 'POST', data });
}

export function fetchGetNoticeDetail(id: number | string) {
  return request<Api.SystemManage.Notice>({ url: `${API_PREFIX}/${id}` });
}

export function fetchAddNotice(data: Api.SystemManage.NoticeEdit) {
  return request<boolean>({ url: API_PREFIX, method: 'POST', data });
}

export function fetchUpdateNotice(data: Api.SystemManage.NoticeEdit & { id: number }) {
  return request<boolean>({ url: API_PREFIX, method: 'PUT', data });
}

export function fetchDeleteNotice(data: Api.Common.DeleteParams) {
  return request<boolean>({ url: API_PREFIX, method: 'DELETE', data });
}
