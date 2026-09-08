/**
 * 本地存储封装（基础设施层）
 * 侧重业务语义化的持久化：Token、用户信息、布局配置等。
 */
import { setCache, getCache, removeCache } from '@infra/cache'

const TOKEN_KEY = 'token'
const USER_KEY = 'user-info'
const LAYOUT_KEY = 'layout-settings'

export const storage = {
  getToken: () => getCache<string>(TOKEN_KEY),
  setToken: (token: string) => setCache(TOKEN_KEY, token),
  clearToken: () => removeCache(TOKEN_KEY),

  getUser: <T = unknown>() => getCache<T>(USER_KEY),
  setUser: <T = unknown>(user: T) => setCache(USER_KEY, user),
  clearUser: () => removeCache(USER_KEY),

  getLayout: <T = unknown>() => getCache<T>(LAYOUT_KEY),
  setLayout: <T = unknown>(settings: T) => setCache(LAYOUT_KEY, settings),
}
