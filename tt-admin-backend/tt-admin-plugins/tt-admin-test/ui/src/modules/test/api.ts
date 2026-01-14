import { request, requestData } from '@tt/plugin-sdk';

export interface TestRecord {
  /** 主键 ID */
  id?: number | null;
  /** 姓名 */
  name: string;
  /** 性别 */
  sex: string;
  /** 年龄 */
  age: number | null;
}

export interface TestPageQuery {
  /** 页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
  /** 姓名关键字 */
  name?: string;
  /** 性别 */
  sex?: string;
}

export async function fetchTestPage(params: TestPageQuery) {
  return await request({ url: '/plugin/test/page', method: 'POST', data: params });
}

export async function saveTestRecord(model: TestRecord, isEdit: boolean) {
  const method = isEdit ? 'PUT' : 'POST';
  return await requestData({ url: '/plugin/test', method, data: model });
}

export async function deleteTestRecord(id: number) {
  return await requestData({ url: '/plugin/test', method: 'DELETE', data: [id] });
}

export async function deleteTestRecords(ids: number[]) {
  return await requestData({ url: '/plugin/test', method: 'DELETE', data: ids });
}
