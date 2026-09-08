import type { PageResult } from '@domain/shared/result'
import type { UserEntity } from './user.entity'
import type { GenderEnum, StatusEnum } from './user.value-object'

/** 用户列表查询参数 */
export interface UserQuery {
  pageNum: number
  pageSize: number
  username?: string
  nickname?: string
  email?: string
  phone?: string
  status?: StatusEnum
  gender?: GenderEnum
  deptId?: number
  roleId?: number
  createTime?: [string, string]
}

/** 用户创建 DTO */
export interface UserCreateDTO {
  username: string
  nickname: string
  password?: string
  email?: string
  phone?: string
  gender?: GenderEnum
  avatar?: string
  deptId: number
  roleIds: number[]
  postIds?: number[]
  status?: StatusEnum
  remark?: string
}

/** 用户更新 DTO */
export interface UserUpdateDTO extends Partial<Omit<UserCreateDTO, 'password'>> {
  id: number
}

/** 重置密码 DTO */
export interface UserResetPwdDTO {
  id: number
  password: string
  confirmPassword: string
}

/** 用户仓储接口（领域层定义，基础设施层实现） */
export interface UserRepository {
  list(params: UserQuery): Promise<PageResult<UserEntity>>
  create(data: UserCreateDTO): Promise<void>
  update(data: UserUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
  resetPassword(data: UserResetPwdDTO): Promise<void>
}
