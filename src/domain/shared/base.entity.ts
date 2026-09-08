/** 基础实体（领域层共享内核） */
export abstract class BaseEntity {
  id!: number
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
  remark?: string

  /** 同一实体判定：主键相等 */
  equals(other: BaseEntity): boolean {
    return other != null && this.id != null && this.id === other.id
  }
}
