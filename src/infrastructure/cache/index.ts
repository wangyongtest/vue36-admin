/**
 * 缓存实现（基础设施层）
 * 封装 localStorage / sessionStorage 的统一读写，供仓储与状态层复用。
 */
type StorageEngine = 'local' | 'session'

function engineOf(type: StorageEngine): Storage {
  return type === 'session' ? window.sessionStorage : window.localStorage
}

export function setCache<T>(key: string, value: T, type: StorageEngine = 'local'): void {
  engineOf(type).setItem(key, JSON.stringify(value))
}

export function getCache<T>(key: string, type: StorageEngine = 'local'): T | null {
  const raw = engineOf(type).getItem(key)
  if (raw == null) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function removeCache(key: string, type: StorageEngine = 'local'): void {
  engineOf(type).removeItem(key)
}

export const cache = { setCache, getCache, removeCache }
