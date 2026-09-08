import { StatusEnum } from '@domain/user/user.value-object'

/** 部门列表表格列配置 */
export const deptColumns = [
  { title: '部门ID', dataIndex: 'id', width: 80 },
  { title: '部门名称', dataIndex: 'name', width: 160 },
  { title: '上级部门', dataIndex: 'parentId', width: 100 },
  { title: '负责人', dataIndex: 'leader', width: 120 },
  { title: '联系电话', dataIndex: 'phone', width: 130 },
  { title: '邮箱', dataIndex: 'email', width: 180 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 200, fixed: 'right' as const },
]

export interface DeptFormModel {
  id?: number
  parentId: number
  name: string
  leader: string
  phone: string
  email: string
  sort: number
  status: StatusEnum
}

/** 新增/编辑表单初始模型 */
export function createDeptForm(): DeptFormModel {
  return {
    parentId: 0,
    name: '',
    leader: '',
    phone: '',
    email: '',
    sort: 0,
    status: StatusEnum.NORMAL,
  }
}
