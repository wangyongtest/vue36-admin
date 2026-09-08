import { BaseEntity } from '@domain/shared/base.entity'
import { StatusEnum } from '@domain/user/user.value-object'

/** 字典类型实体（领域层，MVP 仅占位） */
export class DictEntity extends BaseEntity {
  name = ''
  code = ''
  status: StatusEnum = StatusEnum.NORMAL
}

/** 字典项实体（领域层，MVP 仅占位） */
export class DictItemEntity extends BaseEntity {
  dictCode = ''
  label = ''
  value = ''
  tagType = 'default'
  sort = 0
  status: StatusEnum = StatusEnum.NORMAL
}
