import type {
  MenuRepository,
  MenuQuery,
  MenuCreateDTO,
  MenuUpdateDTO,
} from '@domain/menu/menu.repository'
import type { PageResult } from '@domain/shared/result'
import type { MenuEntity } from '@domain/menu/menu.entity'
import { MenuRepositoryImpl } from '@infra/repositories/menu.repository.impl'

// 应用层只做流程编排，具体技术实现委托基础设施层仓储
const menuRepo: MenuRepository = new MenuRepositoryImpl()

export const menuService = {
  getMenuList: (params: MenuQuery): Promise<PageResult<MenuEntity>> => menuRepo.list(params),
  createMenu: (data: MenuCreateDTO) => menuRepo.create(data),
  updateMenu: (data: MenuUpdateDTO) => menuRepo.update(data),
  deleteMenu: (id: number) => menuRepo.delete(id),
}
