import dayjs from 'dayjs'

/** 日期格式化：空值返回占位符 '-' */
export function formatDate(
  value?: string | number | Date | null,
  pattern = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (value == null || value === '') return '-'
  const d = dayjs(value)
  return d.isValid() ? d.format(pattern) : '-'
}

/** 字节大小格式化 */
export function formatBytes(bytes: number): string {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${units[i]}`
}
