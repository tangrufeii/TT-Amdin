import { requestData } from '@tt/plugin-sdk';

export interface MonitorConfig {
  /** 主键 ID */
  id?: number;
  /** CPU 告警阈值（百分比） */
  cpuThreshold?: number;
  /** 内存告警阈值（百分比） */
  memoryThreshold?: number;
  /** 磁盘告警阈值（百分比） */
  diskThreshold?: number;
  /** 是否启用（Y/N） */
  enabled?: string;
}

export interface DiskUsage {
  /** 磁盘路径 */
  path: string;
  /** 磁盘总量（字节） */
  total: number;
  /** 磁盘可用（字节） */
  free: number;
  /** 磁盘已用（字节） */
  used: number;
  /** 使用率（百分比） */
  usage: number;
}

export interface MonitorMetrics {
  /** CPU 使用率 */
  cpuUsage?: number;
  /** 内存使用率 */
  memoryUsage?: number;
  /** JVM 内存使用率 */
  jvmMemoryUsage?: number;
  /** JVM 已用内存 */
  jvmMemoryUsed?: number;
  /** JVM 总内存 */
  jvmMemoryTotal?: number;
  /** 系统负载 */
  loadAverage?: number;
  /** 线程数 */
  threadCount?: number;
  /** 运行时长（毫秒） */
  uptime?: number;
  /** 时间戳 */
  timestamp?: number;
  /** 磁盘列表 */
  disks?: DiskUsage[];
  /** 告警状态（key: 指标名，value: 是否告警） */
  alerts?: Record<string, boolean>;
}

/** 获取监控配置 */
export async function fetchMonitorConfig() {
  return await requestData<MonitorConfig>({ url: '/plugin/monitor/config' });
}

/** 保存监控配置 */
export async function saveMonitorConfig(config: MonitorConfig) {
  return await requestData<MonitorConfig>({ url: '/plugin/monitor/config', method: 'PUT', data: config });
}

/** 获取监控指标 */
export async function fetchMonitorMetrics() {
  return await requestData<MonitorMetrics>({ url: '/plugin/monitor/metrics' });
}
