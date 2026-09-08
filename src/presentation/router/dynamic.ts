import type { RouteRecordRaw, Router } from 'vue-router'
import type { MenuEntity, MenuType } from '@domain/menu/menu.entity'
import type { PageResult, Result } from '@domain/shared/result'
import { menuService } from '@application/services/menu.service'
import { logger } from '@infra/logger'
import NotFound from '@presentation/views/error/404.vue'

/**
 * 动态路由：由后端菜单驱动，登录后在守卫中一次性注册。
 *
 * 设计要点：
 * 1. 组件走「白名单映射」而非任意 `import(component)`，避免不可控的动态导入与打包失控。
 * 2. 类型为 F（按钮）的菜单不生成路由，仅作为权限点存在。
 * 3. 注册失败不阻塞登录，降级沿用静态路由，避免后端菜单异常导致整站白屏。
 */

/** 布局路由名：动态路由统一挂载到该路由下 */
export const LAYOUT_ROUTE_NAME = 'BasicLayout'

/** 组件白名单（key 为后端返回的 component 字段，去掉前后斜杠与 .vue 后缀） */
const VIEW_MODULES: Record<string, () => Promise<unknown>> = {
  'dashboard/index': () => import('@/presentation/views/dashboard/index.vue'),
  'system/user/index': () => import('@/presentation/views/system/user/index.vue'),
  'system/role/index': () => import('@/presentation/views/system/role/index.vue'),
  'system/dept/index': () => import('@/presentation/views/system/dept/index.vue'),
  'system/menu/index': () => import('@/presentation/views/system/menu/index.vue'),
}

/** 菜单树节点（不继承 MenuEntity，避免 BaseEntity.equals 等实例方法在对象 spread 后缺失） */
export interface MenuNode {
  id: number
  parentId: number
  name: string
  icon: string
  type: MenuType
  path: string
  component: string
  permission: string
  query: string
  sort: number
  keepAlive: boolean
  isExternal: boolean
  visible: boolean
  status: number
  children: MenuNode[]
}

let loaded = false

/** 重置动态路由状态（退出登录时调用） */
export function resetDynamicRoutes() {
  loaded = false
}

/** 动态路由是否已加载 */
export function isDynamicRoutesLoaded() {
  return loaded
}

/** 解析后端 component 字段为真实组件，未命中白名单时降级到 404 */
function resolveComponent(component?: string) {
  if (!component) return NotFound
  const key = component.replace(/^\/+/, '').replace(/\.vue$/, '')
  return VIEW_MODULES[key] ?? NotFound
}

/**
 * 兼容两种后端返回形态：
 * - 直接返回 PageResult（{ list, total }）
 * - 包一层统一 Result（{ code, msg, data: PageResult }）
 */
function unwrapMenus(res: unknown): MenuEntity[] {
  const r = res as Partial<PageResult<MenuEntity>> & { data?: PageResult<MenuEntity> }
  return (r?.list ?? r?.data?.list ?? []) as MenuEntity[]
}

/** 扁平菜单列表 → 菜单树（按 parentId 归组） */
export function buildMenuTree(list: MenuEntity[]): MenuNode[] {
  const nodes = new Map<number, MenuNode>()
  list.forEach((item) => nodes.set(item.id, { ...item, children: [] }))

  const roots: MenuNode[] = []
  nodes.forEach((node) => {
    const parent = nodes.get(node.parentId)
    if (parent && parent.id !== node.id) {
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  })
  return roots
}

/** 菜单节点 → 路由记录；F（按钮）类型返回 null */
export function toRoute(menu: MenuNode): RouteRecordRaw | null {
  if (menu.type === 'F') return null

  const children = menu.children
    .map(toRoute)
    .filter((r): r is RouteRecordRaw => r !== null)

  const meta: Record<string, unknown> = {
    title: menu.name,
    icon: menu.icon,
  }
  if (menu.permission) meta.permissions = [menu.permission]

  // 目录（M）作为纯容器：不挂组件，仅承载子路由
  if (menu.type === 'M') {
    return { path: menu.path, name: `Menu_${menu.id}`, meta, children }
  }

  const route: RouteRecordRaw = {
    path: menu.path,
    name: `Menu_${menu.id}`,
    meta,
    component: resolveComponent(menu.component),
  }
  if (children.length) {
    return { ...route, children }
  }
  return route
}

/**
 * 拉取后端菜单并注册为动态路由。
 * 挂载在 BasicLayout 下；失败时记录日志并保持 loaded=false，下次进入路由会重试。
 */
export async function registerDynamicRoutes(router: Router): Promise<void> {
  if (loaded) return
  try {
    const res = await menuService.getMenuList({ pageNum: 1, pageSize: 999 })
    const menus = unwrapMenus(res)
    const tree = buildMenuTree(menus)

    tree
      .map(toRoute)
      .filter((r): r is RouteRecordRaw => r !== null)
      .forEach((route) => router.addRoute(LAYOUT_ROUTE_NAME, route))

    loaded = true
    logger.debug('router', `动态路由注册完成，共 ${tree.length} 个顶层菜单`)
  } catch (error) {
    loaded = false
    logger.error('router', '动态路由注册失败，降级使用静态路由', error)
  }
}

/** 供 Result 类型被消费，避免未使用告警 */
export type _ResultAlias = Result<PageResult<MenuEntity>>
