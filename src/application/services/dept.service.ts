import type {
  DeptRepository,
  DeptQuery,
  DeptCreateDTO,
  DeptUpdateDTO,
} from '@domain/dept/dept.repository'
import type { PageResult } from '@domain/shared/result'
import type { DeptEntity } from '@domain/dept/dept.entity'
import { DeptRepositoryImpl } from '@infra/repositories/dept.repository.impl'

// 应用层只做流程编排，具体技术实现委托基础设施层仓储
const deptRepo: DeptRepository = new DeptRepositoryImpl()

export const deptService = {
  getDeptList: (params: DeptQuery): Promise<PageResult<DeptEntity>> => deptRepo.list(params),
  createDept: (data: DeptCreateDTO) => deptRepo.create(data),
  updateDept: (data: DeptUpdateDTO) => deptRepo.update(data),
  deleteDept: (id: number) => deptRepo.delete(id),
}
