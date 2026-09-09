import http from '@infra/http'
import type {
  DictRepository,
  DictQuery,
  DictCreateDTO,
  DictUpdateDTO,
  DictItemRepository,
  DictItemQuery,
  DictItemCreateDTO,
  DictItemUpdateDTO,
} from '@domain/dict/dict.repository'

/** 字典类型仓储实现（基础设施层）：对接 /system/dict 后端接口 */
export class DictRepositoryImpl implements DictRepository {
  async list(params: DictQuery) {
    return (await http.get('/system/dict/list', { params })) as Awaited<
      ReturnType<DictRepository['list']>
    >
  }

  async create(data: DictCreateDTO): Promise<void> {
    await http.post('/system/dict', data)
  }

  async update(data: DictUpdateDTO): Promise<void> {
    await http.put(`/system/dict/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/dict/${id}`)
  }
}

/** 字典项仓储实现（基础设施层）：对接 /system/dict/item 后端接口 */
export class DictItemRepositoryImpl implements DictItemRepository {
  async list(params: DictItemQuery) {
    return (await http.get('/system/dict/item/list', { params })) as Awaited<
      ReturnType<DictItemRepository['list']>
    >
  }

  async create(data: DictItemCreateDTO): Promise<void> {
    await http.post('/system/dict/item', data)
  }

  async update(data: DictItemUpdateDTO): Promise<void> {
    await http.put(`/system/dict/item/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/dict/item/${id}`)
  }
}
