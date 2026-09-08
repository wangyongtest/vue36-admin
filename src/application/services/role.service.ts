import type {
  RoleRepository,
  RoleQuery,
  RoleCreateDTO,
  RoleUpdateDTO,
} from '@domain/role/role.repository'
import type { PageResult } from '@domain/shared/result'
import type { RoleEntity } from '@domain/role/role.entity'
import { RoleRepositoryImpl } from '@infra/repositories/role.repository.impl'

// 应用层只做流程编排，具体技术实现委托基础设施层仓储
const roleRepo: RoleRepository = new RoleRepositoryImpl()

export const roleService = {
  getRoleList: (params: RoleQuery): Promise<PageResult<RoleEntity>> => roleRepo.list(params),
  createRole: (data: RoleCreateDTO) => roleRepo.create(data),
  updateRole: (data: RoleUpdateDTO) => roleRepo.update(data),
  deleteRole: (id: number) => roleRepo.delete(id),
}
