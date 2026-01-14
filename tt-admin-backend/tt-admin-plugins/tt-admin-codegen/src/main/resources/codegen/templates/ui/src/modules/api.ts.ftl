<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign entityName = (ctx.entityName)!((moduleName?replace('-','')?cap_first)!'Entity')>
import { fetchSystemDictOptions, request, requestData } from '@tt/plugin-sdk';

export interface ${entityName}Record {
<#list columns as column>
  /** ${column.comment?js_string} */
  ${column.fieldName}: ${column.typeScriptType!'string'}<#if column_has_next>,</#if>
</#list>
}

export interface ${entityName}PageQuery {
  /** 页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
<#list searchColumns as column>
  /** ${column.comment?js_string} */
  ${column.fieldName}?: <#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween" || column.searchType == "in" || column.searchType == "notIn")>any[]<#elseif column.javaType == "Integer" || column.javaType == "Long" || column.javaType == "Double" || column.javaType == "BigDecimal">number | null<#else>string</#if><#if column_has_next>,</#if>
</#list>
}

/** 分页查询 */
export async function fetchPage(params: ${entityName}PageQuery) {
  return await request({ url: '/plugin/${moduleName}/page', method: 'POST', data: params });
}

/** 保存数据 */
export async function saveRecord(model: ${entityName}Record, isEdit: boolean) {
  const method = isEdit ? 'PUT' : 'POST';
  return await requestData({ url: '/plugin/${moduleName}', method, data: model });
}

/** 删除数据 */
export async function deleteRecord(id: any) {
  return await requestData({ url: `/plugin/${moduleName}/${r'${id}'}`, method: 'DELETE' });
}

/** 获取字典选项 */
export async function fetchDictOptions(code: string) {
  return await fetchSystemDictOptions(code);
}
