import { describe, it, expect } from 'vitest'
import { UserEntity } from '../user.entity'
import { StatusEnum } from '../user.value-object'

describe('UserEntity', () => {
  it('should create a valid user', () => {
    const user = UserEntity.create({
      username: 'admin',
      nickname: '管理员',
      status: StatusEnum.NORMAL,
    })
    expect(user.username).toBe('admin')
    expect(user.isActive()).toBe(true)
  })

  it('should apply default status when not provided', () => {
    const user = UserEntity.create({
      username: 'guest',
      nickname: '访客',
    })
    expect(user.status).toBe(StatusEnum.NORMAL)
    expect(user.isActive()).toBe(true)
  })

  it('should validate password strength', () => {
    expect(() => UserEntity.validatePassword('123')).toThrow('密码长度至少6位')
    expect(() => UserEntity.validatePassword('abcdef')).toThrow('密码必须包含字母和数字')
    expect(UserEntity.validatePassword('abc123')).toBe(true)
  })
})
