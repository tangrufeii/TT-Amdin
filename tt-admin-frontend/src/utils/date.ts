import dayjs from 'dayjs';

export function formatDateTime(value?: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (value === null || value === undefined || value === '') return '-';
  const date = dayjs(value);
  if (!date.isValid()) return String(value);
  return date.format(format);
}
