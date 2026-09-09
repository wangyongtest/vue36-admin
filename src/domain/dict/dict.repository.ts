import type { PageResult } from '@domain/shared/result'
import type { DictEntity, DictItemEntity } from './dict.entity'
import type { StatusEnum } from '@domain/user/user.value-object'

/* ------------------------------ 字典类型 ------------------------------ */

/** 字典类型列表查询参数 */
export interface DictQuery {
  pageNum: number
  pageSize: number
  name?: string
  code?: string
  status?: StatusEnum
}

/** 字典类型创建 DTO */
export interface DictCreateDTO {
  name: string
  code: string
  status?: StatusEnum
  remark?: string
}

/** 字典类型更新 DTO */
export interface DictUpdateDTO extends Partial<DictCreateDTO> {
  id: number
}

/** 字典类型仓储接口（领域层定义，基础设施层实现） */
export interface DictRepository {
  list(params: DictQuery): Promise<PageResult<DictEntity>>
  create(data: DictCreateDTO): Promise<void>
  update(data: DictUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
}

/* ------------------------------ 字典项 ------------------------------ */

/** 字典项列表查询参数（按 dictCode 归属到具体字典） */
export interface DictItemQuery {
  pageNum: number
  pageSize: number
  dictCode?: string
  label?: string
  status?: StatusEnum
}

/** 字典项创建 DTO */
export interface DictItemCreateDTO {
  dictCode: string
  label: string
  value: string
  tagType?: string
  sort?: number
  status?: StatusEnum
  remark?: string
}

/** 字典项更新 DTO */
export interface DictItemUpdateDTO extends Partial<DictItemCreateDTO> {
  id: number
}

/** 字典项仓储接口（领域层定义，基础设施层实现） */
export interface DictItemRepository {
  list(params: DictItemQuery): Promise<PageResult<DictItemEntity>>
  create(data: DictItemCreateDTO): Promise<void>
  update(data: DictItemUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
}
