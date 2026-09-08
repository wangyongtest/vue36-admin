import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { setupGuard } from './guard'

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

setupGuard(router)
