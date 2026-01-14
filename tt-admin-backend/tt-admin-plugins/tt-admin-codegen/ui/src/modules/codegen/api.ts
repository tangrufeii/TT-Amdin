import { fetchSystemDictListOptions, getPluginBaseURL, request, requestData } from '@tt/plugin-sdk';

export interface DataTableInfo {
  /** 表名 */
  tableName: string;
  /** 表备注 */
  tableComment?: string;
}

export interface CodegenTable {
  /** 主键 ID */
  id?: number;
  /** 表名 */
  tableName: string;
  /** 表备注 */
  tableComment?: string;
  /** 表前缀 */
  tablePrefix?: string;
  /** 插件 ID */
  pluginId: string;
  /** 插件名称 */
  pluginName: string;
  /** 插件版本 */
  version?: string;
  /** 父包名 */
  parentPackage: string;
  /** 模块名 */
  moduleName: string;
  /** 路由路径 */
  routePath?: string;
  /** 菜单名称 */
  menuName?: string;
  /** i18n Key */
  i18nKey?: string;
  /** 菜单图标 */
  icon?: string;
  /** 是否包含建表 SQL（1/0） */
  includeTableSql: string;
  /** 父菜单 ID */
  parentMenuId: number;
  /** 作者 */
  author: string;
  /** 状态（1 启用 / 0 禁用） */
  status: string;
  /** 创建时间 */
  createTime?: string;
}

export interface CodegenColumn {
  /** 主键 ID */
  id?: number;
  /** 表 ID */
  tableId?: number;
  /** 表名 */
  tableName?: string;
  /** 数据库列名 */
  columnName?: string;
  /** 属性名 */
  propertyName?: string;
  /** 列备注 */
  columnComment?: string;
  /** 数据库类型 */
  dataType?: string;
  /** Java 类型 */
  javaType?: string;
  /** TypeScript 类型 */
  typeScriptType?: string;
  /** 列序号 */
  ordinalPosition?: number;
  /** 是否 i18n（1/0） */
  i18n?: string;
  /** 是否必填（1/0） */
  required?: string;
  /** 列表展示（1/0） */
  list?: string;
  /** 查询字段（1/0） */
  search?: string;
  /** 查询方式 */
  searchType?: string;
  /** 表单新增（1/0） */
  added?: string;
  /** 表单编辑（1/0） */
  edit?: string;
  /** 字典编码 */
  dictCode?: string;
  /** 渲染类型 */
  renderType?: string;
  /** 表单列宽 */
  formSpan?: number;
  /** 搜索列宽 */
  searchSpan?: number;
  /** 列表列宽 */
  listWidth?: number;
  /** 占位提示 */
  placeholder?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 表单禁用（1/0） */
  formDisabled?: string;
  /** 表单只读（1/0） */
  formReadonly?: string;
  /** 最小长度 */
  minLength?: number;
  /** 最大长度 */
  maxLength?: number;
  /** 最小值 */
  minValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 正则校验 */
  pattern?: string;
  /** 组件扩展参数（JSON 字符串） */
  componentProps?: string;
  /** 状态（1/0） */
  status?: string;
}

export interface DictOption {
  /** 展示名称 */
  label: string;
  /** 字典编码 */
  value: string;
}

export async function fetchTablePage(params: Record<string, any>) {
  return await request<any>({ url: '/plugin/codegen/tables/page', params });
}

export async function fetchDataTables() {
  return await requestData<DataTableInfo[]>({ url: '/plugin/codegen/data-tables' });
}

export async function fetchDictOptions() {
  return await fetchSystemDictListOptions();
}

export async function fetchTableDetail(id: number) {
  return await requestData<CodegenTable>({ url: `/plugin/codegen/tables/${id}` });
}

export async function saveTable(model: CodegenTable, isEdit: boolean) {
  const method = isEdit ? 'PUT' : 'POST';
  return await requestData<CodegenTable>({ url: '/plugin/codegen/tables', method, data: model });
}

export async function deleteTables(ids: number[]) {
  return await requestData({ url: '/plugin/codegen/tables', method: 'DELETE', data: ids });
}

export async function fetchColumns(tableId: number) {
  return await requestData<CodegenColumn[] | Record<string, unknown>>({
    url: `/plugin/codegen/tables/columns/${tableId}`
  });
}

export async function updateColumns(columns: CodegenColumn[]) {
  return await requestData({ url: '/plugin/codegen/tables/columns', method: 'PUT', data: columns });
}

export async function syncColumns(tableId: number) {
  return await requestData<CodegenColumn[] | Record<string, unknown>>({
    url: `/plugin/codegen/tables/columns/sync/${tableId}`
  });
}

export async function cleanColumns(tableId: number) {
  return await requestData({ url: `/plugin/codegen/tables/columns/clean/${tableId}`, method: 'PUT' });
}

export async function downloadTableZip(tableId: number) {
  const response = await fetch(`${getPluginBaseURL()}/plugin/codegen/tables/zip/${tableId}`, { method: 'POST' });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const disposition = response.headers.get('content-disposition') || '';
  const match = disposition.match(/filename=([^;]+)/i);
  const filename = match ? decodeURIComponent(match[1].replace(/"/g, '')) : 'plugin-source.zip';
  return { url, filename };
}
