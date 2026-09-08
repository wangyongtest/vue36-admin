import { BaseEntity } from '@domain/shared/base.entity'
import { StatusEnum, DataScopeEnum } from '@domain/user/user.value-object'

/** 角色实体（领域层，MVP 仅占位） */
export class RoleEntity extends BaseEntity {
  name = ''
  code = ''
  sort = 0
  dataScope: DataScopeEnum = DataScopeEnum.ALL
  status: StatusEnum = StatusEnum.NORMAL
  menuIds: number[] = []
  deptIds: number[] = []
  remark = ''
}
