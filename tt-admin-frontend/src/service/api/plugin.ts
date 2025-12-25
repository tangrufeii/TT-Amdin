import { request } from '../request';

/**
 * 插件管理 API
 */

/**
 * 分页查询插件列表
 * @param params 查询参数
 */
export function fetchPluginPage(params: Api.Plugin.PluginPageQuery) {
  return request<Api.Plugin.PluginPageResult>({
    url: '/plugin/management/page',
    method: 'post',
    data: params
  });
}

/**
 * 查询所有插件列表
 */
export function fetchPluginListAll() {
  return request<Api.Plugin.PluginManagement[]>({
    url: '/plugin/management/list',
    method: 'get'
  });
}

/**
 * 根据状态查询插件列表
 * @param status 状态：0-禁用，1-启用
 */
export function fetchPluginListByStatus(status: number) {
  return request<Api.Plugin.PluginManagement[]>({
    url: '/plugin/management/list/byStatus',
    method: 'get',
    params: { status }
  });
}

/**
 * 根据ID查询插件详情
 * @param id 插件主键ID
 */
export function fetchPluginById(id: number) {
  return request<Api.Plugin.PluginManagement>({
    url: `/plugin/management/${id}`,
    method: 'get'
  });
}

/**
 * 根据插件ID查询详情
 * @param pluginId 插件ID（唯一标识）
 */
export function fetchPluginByPluginId(pluginId: string) {
  return request<Api.Plugin.PluginManagement>({
    url: `/plugin/management/byPluginId/${pluginId}`,
    method: 'get'
  });
}

/**
 * 创建插件记录
 * @param data 创建参数
 */
export function fetchPluginCreate(data: Api.Plugin.PluginCreate) {
  return request<Api.Plugin.PluginManagement>({
    url: '/plugin/management',
    method: 'post',
    data
  });
}

/**
 * 更新插件信息
 * @param data 更新参数
 */
export function fetchPluginUpdate(data: Api.Plugin.PluginUpdate) {
  return request<Api.Plugin.PluginManagement>({
    url: '/plugin/management',
    method: 'put',
    data
  });
}

/**
 * 删除插件
 * @param id 插件主键ID
 */
export function fetchPluginDelete(id: number) {
  return request<void>({
    url: `/plugin/management/${id}`,
    method: 'delete'
  });
}

/**
 * 启用插件
 * @param id 插件主键ID
 */
export function fetchPluginEnable(id: number) {
  return request<Api.Plugin.PluginManagement>({
    url: `/plugin/management/${id}/enable`,
    method: 'put'
  });
}

/**
 * 禁用插件
 * @param id 插件主键ID
 */
export function fetchPluginDisable(id: number) {
  return request<Api.Plugin.PluginManagement>({
    url: `/plugin/management/${id}/disable`,
    method: 'put'
  });
}

/**
 * 变更插件状态
 * @param data 状态变更参数
 */
export function fetchPluginChangeStatus(data: Api.Plugin.PluginStatusChange) {
  return request<Api.Plugin.PluginManagement>({
    url: '/plugin/management/status',
    method: 'put',
    data
  });
}

/**
 * 获取插件统计信息
 */
export function fetchPluginStatistics() {
  return request<Api.Plugin.PluginStatistics>({
    url: '/plugin/management/statistics',
    method: 'get'
  });
}

/**
 * 上传并安装插件
 * @param file 插件文件
 */
export function fetchPluginInstall(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return request<boolean>({
    url: '/plugin/management/installPlugin',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
