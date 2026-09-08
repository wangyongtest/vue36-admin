import type { PageResult } from '@domain/shared/result'
import type { MenuEntity, MenuType } from './menu.entity'

/** 菜单列表查询参数 */
export interface MenuQuery {
  pageNum: number
  pageSize: number
  name?: string
  status?: number
}

/** 菜单创建 DTO */
export interface MenuCreateDTO {
  parentId: number
  name: string
  icon?: string
  type: MenuType
  path?: string
  component?: string
  permission?: string
  query?: string
  sort?: number
  keepAlive?: boolean
  isExternal?: boolean
  visible?: boolean
  status?: number
}

/** 菜单更新 DTO */
export interface MenuUpdateDTO extends Partial<MenuCreateDTO> {
  id: number
}

/** 菜单仓储接口（领域层定义，基础设施层实现） */
export interface MenuRepository {
  list(params: MenuQuery): Promise<PageResult<MenuEntity>>
  create(data: MenuCreateDTO): Promise<void>
  update(data: MenuUpdateDTO): Promise<void>
  delete(id: number): Promise<void>
}
