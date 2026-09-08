import http from '@infra/http'
import type {
  RoleRepository,
  RoleQuery,
  RoleCreateDTO,
  RoleUpdateDTO,
} from '@domain/role/role.repository'

/** 角色仓储实现（基础设施层）：对接 /system/role 后端接口 */
export class RoleRepositoryImpl implements RoleRepository {
  async list(params: RoleQuery) {
    return (await http.get('/system/role/list', { params })) as Awaited<
      ReturnType<RoleRepository['list']>
    >
  }

  async create(data: RoleCreateDTO): Promise<void> {
    await http.post('/system/role', data)
  }

  async update(data: RoleUpdateDTO): Promise<void> {
    await http.put(`/system/role/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/role/${id}`)
  }
}
