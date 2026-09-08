import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@infra/storage'
import http from '@infra/http'
import { logger } from '@infra/logger'

interface ProfilePayload {
  user: Record<string, any>
  permissions: string[]
  roles: string[]
  menus: any[]
}

/** 用户鉴权状态（跨层共享） */
export const useUserStore = defineStore('user', () => {
  const token = ref<string>(storage.getToken() ?? '')
  const userInfo = ref<Record<string, any>>(storage.getUser() ?? {})
  const permissions = ref<string[]>([])
  const roles = ref<string[]>([])
  const menus = ref<any[]>([])

  const isLoggedIn = computed(() => !!token.value)

  function setToken(t: string) {
    token.value = t
    storage.setToken(t)
  }

  async function login(username: string, password: string) {
    // 后端登录返回结构含 token；http 拦截器已返回 response.data，
    // 此处不再传泛型避免 AxiosResponse 与业务负载混淆
    const res = (await http.post('/auth/login', { username, password })) as {
      token: string
      [k: string]: unknown
    }
    setToken(res.token)
    logger.info('auth', `用户 ${username} 登录成功`)
    return res
  }

  async function fetchProfile() {
    const res = (await http.get('/auth/profile')) as unknown as ProfilePayload
    userInfo.value = res.user ?? {}
    permissions.value = res.permissions ?? []
    roles.value = res.roles ?? []
    menus.value = res.menus ?? []
    storage.setUser(res.user)
  }

  function logout() {
    token.value = ''
    userInfo.value = {}
    permissions.value = []
    roles.value = []
    menus.value = []
    storage.clearToken()
    storage.clearUser()
  }

  function hasPerm(perm: string): boolean {
    return permissions.value.includes(perm)
  }

  return { token, userInfo, permissions, roles, menus, isLoggedIn, setToken, login, fetchProfile, logout, hasPerm }
})
