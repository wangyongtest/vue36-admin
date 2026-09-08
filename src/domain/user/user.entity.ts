import { BaseEntity } from '@domain/shared/base.entity'
import { StatusEnum, GenderEnum } from './user.value-object'

/** 用户创建种子（字段按需传入，缺省取默认值） */
export type UserSeed = Partial<Omit<UserEntity, 'equals' | 'isActive'>> & {
  username: string
  nickname: string
}

/**
 * 用户实体（领域层核心）
 * 负责用户状态判定与密码强度等业务规则校验，不依赖任何框架。
 */
export class UserEntity extends BaseEntity {
  username = ''
  nickname = ''
  email = ''
  phone = ''
  gender: GenderEnum = GenderEnum.UNKNOWN
  avatar = ''
  deptId = 0
  deptName = ''
  roleIds: number[] = []
  roleNames: string[] = []
  status: StatusEnum = StatusEnum.NORMAL
  loginIp = ''
  loginDate = ''

  static create(seed: UserSeed): UserEntity {
    const user = new UserEntity()
    Object.assign(user, seed)
    user.status = (seed.status as StatusEnum) ?? StatusEnum.NORMAL
    return user
  }

  /** 密码强度校验：长度≥6 且同时含字母与数字 */
  static validatePassword(password: string): boolean {
    if (password.length < 6) throw new Error('密码长度至少6位')
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      throw new Error('密码必须包含字母和数字')
    }
    return true
  }

  /** 是否启用 */
  isActive(): boolean {
    return this.status === StatusEnum.NORMAL
  }
}
