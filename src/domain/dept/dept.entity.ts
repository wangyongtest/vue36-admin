import { BaseEntity } from '@domain/shared/base.entity'
import { StatusEnum } from '@domain/user/user.value-object'

/** 部门实体（领域层，MVP 仅占位） */
export class DeptEntity extends BaseEntity {
  parentId = 0
  name = ''
  leader = ''
  phone = ''
  email = ''
  sort = 0
  status: StatusEnum = StatusEnum.NORMAL
}
