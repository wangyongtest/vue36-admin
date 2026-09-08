import { GenderEnum, StatusEnum } from '@domain/user/user.value-object'

/** 用户列表表格列配置（对照文档 03 字段设计） */
export const userColumns = [
  { title: '用户ID', dataIndex: 'id', width: 80 },
  { title: '账号', dataIndex: 'username', width: 120 },
  { title: '昵称', dataIndex: 'nickname', width: 120 },
  { title: '邮箱', dataIndex: 'email', width: 180 },
  { title: '手机', dataIndex: 'phone', width: 130 },
  { title: '性别', dataIndex: 'gender', width: 80 },
  { title: '部门', dataIndex: 'deptName', width: 150 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 200, fixed: 'right' as const },
]

export interface UserFormModel {
  id?: number
  username: string
  nickname: string
  password?: string
  deptId: number
  roleIds: number[]
  status?: StatusEnum
  gender?: GenderEnum
}

/** 新增/编辑表单初始模型 */
export function createUserForm(): UserFormModel {
  return {
    username: '',
    nickname: '',
    password: '',
    deptId: 0,
    roleIds: [],
    status: StatusEnum.NORMAL,
    gender: GenderEnum.UNKNOWN,
  }
}
