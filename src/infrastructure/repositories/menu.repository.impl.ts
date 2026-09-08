import http from '@infra/http'
import type {
  MenuRepository,
  MenuQuery,
  MenuCreateDTO,
  MenuUpdateDTO,
} from '@domain/menu/menu.repository'

/** 菜单仓储实现（基础设施层）：对接 /system/menu 后端接口 */
export class MenuRepositoryImpl implements MenuRepository {
  async list(params: MenuQuery) {
    return (await http.get('/system/menu/list', { params })) as Awaited<
      ReturnType<MenuRepository['list']>
    >
  }

  async create(data: MenuCreateDTO): Promise<void> {
    await http.post('/system/menu', data)
  }

  async update(data: MenuUpdateDTO): Promise<void> {
    await http.put(`/system/menu/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/menu/${id}`)
  }
}
