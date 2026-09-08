import http from '@infra/http'
import type {
  DeptRepository,
  DeptQuery,
  DeptCreateDTO,
  DeptUpdateDTO,
} from '@domain/dept/dept.repository'

/** 部门仓储实现（基础设施层）：对接 /system/dept 后端接口 */
export class DeptRepositoryImpl implements DeptRepository {
  async list(params: DeptQuery) {
    return (await http.get('/system/dept/list', { params })) as Awaited<
      ReturnType<DeptRepository['list']>
    >
  }

  async create(data: DeptCreateDTO): Promise<void> {
    await http.post('/system/dept', data)
  }

  async update(data: DeptUpdateDTO): Promise<void> {
    await http.put(`/system/dept/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/dept/${id}`)
  }
}
