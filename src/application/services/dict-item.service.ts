import type {
  DictItemRepository,
  DictItemQuery,
  DictItemCreateDTO,
  DictItemUpdateDTO,
} from '@domain/dict/dict.repository'
import type { PageResult } from '@domain/shared/result'
import type { DictItemEntity } from '@domain/dict/dict.entity'
import { DictItemRepositoryImpl } from '@infra/repositories/dict.repository.impl'

// 字典项与字典类型同属一个聚合，服务单独成文件避免单文件职责膨胀
const dictItemRepo: DictItemRepository = new DictItemRepositoryImpl()

export const dictItemService = {
  getDictItemList: (params: DictItemQuery): Promise<PageResult<DictItemEntity>> =>
    dictItemRepo.list(params),
  createDictItem: (data: DictItemCreateDTO) => dictItemRepo.create(data),
  updateDictItem: (data: DictItemUpdateDTO) => dictItemRepo.update(data),
  deleteDictItem: (id: number) => dictItemRepo.delete(id),
}
