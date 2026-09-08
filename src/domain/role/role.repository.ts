import type { PageResult } from '@domain/shared/result'
import type { RoleEntity } from './role.entity'
import type { StatusEnum, DataScopeEnum } from '@domain/user/user.value-object'

/** 角色列表查询参数 */
export interface RoleQuery {
  pageNum: number
  pageSize: number
  name?: string
  code?: string
  status?: StatusEnum
}

/** 角色创建 DTO */
export interface RoleCreateDTO {
  name: string
  code: string
  sort?: number
  dataScope?: DataScopeEnum
  status?: StatusEnum
  menuIds: number[]
  deptIds?: number[]
  remark?: string
}

/** 角色更新 DTO */
export interface RoleUpdateDTO extends Partial<RoleCreateDTO> {
  id: number
}

/** 角色仓储接口（领域层定义，基础设施层实现） */
export interface RoleRepository {
  list(params: RoleQuery): Promise<PageResult<RoleEntity>>
  create(data: RoleCreateDTO): Promise<void>
  update(data: RoleUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
}
