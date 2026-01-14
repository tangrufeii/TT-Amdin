import { request, requestData } from '@tt/plugin-sdk';

export interface BackupConfig {
  /** 主键 ID */
  id?: number;
  /** 数据库类型（auto/mysql/postgresql） */
  dbType?: string;
  /** 备份方式（dump/custom） */
  backupType?: string;
  /** 自定义备份命令 */
  customCommand?: string;
  /** 计划任务表达式 */
  cron?: string;
  /** 是否启用（Y/N） */
  enabled?: string;
  /** 保留天数 */
  retentionDays?: number;
  /** 备份目录 */
  targetDir?: string;
  /** 最近一次执行时间 */
  lastRunTime?: string;
}

export interface BackupRecord {
  /** 记录 ID */
  id: number;
  /** 配置 ID */
  configId: number;
  /** 备份文件名 */
  fileName: string;
  /** 备份文件路径 */
  filePath: string;
  /** 文件大小（字节） */
  fileSize: number;
  /** 执行状态（1 成功 / 0 失败） */
  status: string;
  /** 结果说明 */
  message: string;
  /** 开始时间 */
  startTime: string;
  /** 结束时间 */
  endTime: string;
}

/** 分页获取备份记录 */
export async function fetchBackupRecords(params: Record<string, any>) {
  return await request<{ records: BackupRecord[]; total: number; page?: number; pageSize?: number }>({
    url: '/plugin/backup/records/page',
    method: 'POST',
    data: params
  });
}

/** 获取备份配置 */
export async function fetchBackupConfig() {
  return await requestData<BackupConfig>({ url: '/plugin/backup/config' });
}

/** 保存备份配置 */
export async function saveBackupConfig(config: BackupConfig) {
  return await requestData<BackupConfig>({ url: '/plugin/backup/config', method: 'PUT', data: config });
}

/** 手动触发备份 */
export async function runBackupTask() {
  return await requestData({ url: '/plugin/backup/run', method: 'POST' });
}
