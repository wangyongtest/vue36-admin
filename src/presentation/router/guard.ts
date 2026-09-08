import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { registerDynamicRoutes } from './dynamic'

/**
 * 全局路由守卫（路由级权限校验）
 * 1. 公开路由直接放行
 * 2. 未登录跳转登录页
 * 3. 已登录但未加载权限信息则拉取用户/角色/权限/菜单，并注册后端驱动的动态路由
 * 4. 目标路由携带 permissions 且当前用户无权限 → 跳 403
 */
export function setupGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()

    if (to.meta.public) return next()

    if (!userStore.isLoggedIn) return next('/login')

    if (userStore.permissions.length === 0 && to.path !== '/login') {
      try {
        await userStore.fetchProfile()
        // 拉取菜单并注册动态路由（失败内部降级，不阻塞登录）
        await registerDynamicRoutes(router)
      } catch {
        userStore.logout()
        return next('/login')
      }
      // 重新进入目标路由，使动态权限生效
      return next({ ...to, replace: true })
    }

    const perms = to.meta.permissions as string[] | string | undefined
    if (perms) {
      const list = Array.isArray(perms) ? perms : [perms]
      const ok = list.some((p) => userStore.hasPerm(p))
      if (!ok) return next('/403')
    }

    next()
  })
}
