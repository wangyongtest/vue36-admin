import type {
  DictRepository,
  DictQuery,
  DictCreateDTO,
  DictUpdateDTO,
} from '@domain/dict/dict.repository'
import type { PageResult } from '@domain/shared/result'
import type { DictEntity } from '@domain/dict/dict.entity'
import { DictRepositoryImpl } from '@infra/repositories/dict.repository.impl'

// 应用层只做流程编排，具体技术实现委托基础设施层仓储
const dictRepo: DictRepository = new DictRepositoryImpl()

export const dictService = {
  getDictList: (params: DictQuery): Promise<PageResult<DictEntity>> => dictRepo.list(params),
  createDict: (data: DictCreateDTO) => dictRepo.create(data),
  updateDict: (data: DictUpdateDTO) => dictRepo.update(data),
  deleteDict: (id: number) => dictRepo.delete(id),
}
