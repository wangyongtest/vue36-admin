import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '@presentation/layouts/BasicLayout.vue'
import LoginView from '@presentation/views/login/index.vue'
import Forbidden from '@presentation/views/error/403.vue'
import NotFound from '@presentation/views/error/404.vue'
import DashboardView from '@presentation/views/dashboard/index.vue'
import { systemChildren } from './system'
import { LAYOUT_ROUTE_NAME } from '../dynamic'

/**
 * 常量路由（静态保底）+ 业务路由。
 * 后端菜单可用时，守卫会调用 registerDynamicRoutes 追加动态路由到 BasicLayout 下。
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: '登录', public: true },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: Forbidden,
    meta: { title: '无权限', public: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '未找到', public: true },
  },
  {
    path: '/',
    name: LAYOUT_ROUTE_NAME,
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { title: '工作台', icon: 'DashboardOutlined' },
      },
      ...systemChildren,
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]
