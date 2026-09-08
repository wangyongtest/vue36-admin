import type { PageResult } from '@domain/shared/result'
import type { DeptEntity } from './dept.entity'
import type { StatusEnum } from '@domain/user/user.value-object'

/** 部门列表查询参数 */
export interface DeptQuery {
  pageNum: number
  pageSize: number
  name?: string
  status?: StatusEnum
}

/** 部门创建 DTO */
export interface DeptCreateDTO {
  parentId: number
  name: string
  leader?: string
  phone?: string
  email?: string
  sort?: number
  status?: StatusEnum
}

/** 部门更新 DTO */
export interface DeptUpdateDTO extends Partial<DeptCreateDTO> {
  id: number
}

/** 部门仓储接口（领域层定义，基础设施层实现） */
export interface DeptRepository {
  list(params: DeptQuery): Promise<PageResult<DeptEntity>>
  create(data: DeptCreateDTO): Promise<void>
  update(data: DeptUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
}
