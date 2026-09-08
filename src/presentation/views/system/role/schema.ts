import { StatusEnum, DataScopeEnum } from '@domain/user/user.value-object'

/** 角色列表表格列配置 */
export const roleColumns = [
  { title: '角色ID', dataIndex: 'id', width: 80 },
  { title: '角色名称', dataIndex: 'name', width: 140 },
  { title: '角色编码', dataIndex: 'code', width: 140 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '数据范围', dataIndex: 'dataScope', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '备注', dataIndex: 'remark', width: 180 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 200, fixed: 'right' as const },
]

export interface RoleFormModel {
  id?: number
  name: string
  code: string
  sort: number
  dataScope: DataScopeEnum
  status: StatusEnum
  menuIds: number[]
  remark: string
}

/** 新增/编辑表单初始模型 */
export function createRoleForm(): RoleFormModel {
  return {
    name: '',
    code: '',
    sort: 0,
    dataScope: DataScopeEnum.ALL,
    status: StatusEnum.NORMAL,
    menuIds: [],
    remark: '',
  }
}
