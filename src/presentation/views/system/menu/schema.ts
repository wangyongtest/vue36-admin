import type { MenuType } from '@domain/menu/menu.entity'

/** 菜单类型选项 */
export const menuTypeOptions: { label: string; value: MenuType }[] = [
  { label: '目录', value: 'M' },
  { label: '菜单', value: 'C' },
  { label: '按钮', value: 'F' },
]

/** 菜单类型中文标签 */
export const MenuTypeLabel: Record<MenuType, string> = {
  M: '目录',
  C: '菜单',
  F: '按钮',
}

/** 菜单列表表格列配置 */
export const menuColumns = [
  { title: '菜单ID', dataIndex: 'id', width: 80 },
  { title: '菜单名称', dataIndex: 'name', width: 140 },
  { title: '上级菜单', dataIndex: 'parentId', width: 100 },
  { title: '类型', dataIndex: 'type', width: 80 },
  { title: '路由地址', dataIndex: 'path', width: 160 },
  { title: '组件路径', dataIndex: 'component', width: 180 },
  { title: '权限标识', dataIndex: 'permission', width: 160 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '可见', dataIndex: 'visible', width: 80 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 200, fixed: 'right' as const },
]

export interface MenuFormModel {
  id?: number
  parentId: number
  name: string
  icon: string
  type: MenuType
  path: string
  component: string
  permission: string
  sort: number
  keepAlive: boolean
  visible: boolean
  status: number
}

/** 新增/编辑表单初始模型 */
export function createMenuForm(): MenuFormModel {
  return {
    parentId: 0,
    name: '',
    icon: '',
    type: 'C',
    path: '',
    component: '',
    permission: '',
    sort: 0,
    keepAlive: true,
    visible: true,
    status: 0,
  }
}
