import type { RouteRecordRaw } from 'vue-router'

/** 系统管理模块路由（children，挂载在 BasicLayout 下） */
export const systemChildren: RouteRecordRaw[] = [
  {
    path: 'system/user',
    name: 'SystemUser',
    component: () => import('@/presentation/views/system/user/index.vue'),
    meta: {
      title: '用户管理',
      permissions: ['system:user:list'],
      icon: 'UserOutlined',
    },
  },
  {
    path: 'system/role',
    name: 'SystemRole',
    component: () => import('@/presentation/views/system/role/index.vue'),
    meta: {
      title: '角色管理',
      permissions: ['system:role:list'],
      icon: 'SolutionOutlined',
    },
  },
  {
    path: 'system/dept',
    name: 'SystemDept',
    component: () => import('@/presentation/views/system/dept/index.vue'),
    meta: {
      title: '部门管理',
      permissions: ['system:dept:list'],
      icon: 'ApartmentOutlined',
    },
  },
  {
    path: 'system/dict',
    name: 'SystemDict',
    component: () => import('@/presentation/views/system/dict/index.vue'),
    meta: {
      title: '字典管理',
      permissions: ['system:dict:list'],
      icon: 'BookOutlined',
    },
  },
  {
    // 字典项维护页：不在菜单中直接入口，由字典管理页「字典项」按钮跳转
    path: 'system/dict-item',
    name: 'SystemDictItem',
    component: () => import('@/presentation/views/system/dict/item/index.vue'),
    meta: {
      title: '字典项管理',
      permissions: ['system:dict:list'],
      icon: 'TagsOutlined',
    },
  },
]
