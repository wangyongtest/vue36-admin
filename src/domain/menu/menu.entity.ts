import { BaseEntity } from '@domain/shared/base.entity'

/** 菜单类型：M=目录 C=菜单 F=按钮 */
export type MenuType = 'M' | 'C' | 'F'

/** 菜单/资源实体（领域层，MVP 仅占位） */
export class MenuEntity extends BaseEntity {
  parentId = 0
  name = ''
  icon = ''
  type: MenuType = 'C'
  path = ''
  component = ''
  permission = ''
  query = ''
  sort = 0
  keepAlive = true
  isExternal = false
  visible = true
  status = 0
}
