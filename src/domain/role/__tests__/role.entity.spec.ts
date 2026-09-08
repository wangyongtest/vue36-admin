import { describe, it, expect } from 'vitest'
import { RoleEntity } from '../role.entity'
import { StatusEnum, DataScopeEnum } from '@domain/user/user.value-object'

describe('RoleEntity', () => {
  it('默认字段正确', () => {
    const r = new RoleEntity()
    expect(r.name).toBe('')
    expect(r.code).toBe('')
    expect(r.sort).toBe(0)
    expect(r.dataScope).toBe(DataScopeEnum.ALL)
    expect(r.status).toBe(StatusEnum.NORMAL)
    expect(r.menuIds).toEqual([])
    expect(r.deptIds).toEqual([])
    expect(r.remark).toBe('')
  })

  it('继承 BaseEntity.equals 按主键判定', () => {
    const a = new RoleEntity()
    a.id = 1
    const b = new RoleEntity()
    b.id = 1
    const c = new RoleEntity()
    c.id = 2
    expect(a.equals(b)).toBe(true)
    expect(a.equals(c)).toBe(false)
  })

  it('可正常赋值业务字段', () => {
    const r = new RoleEntity()
    r.name = '管理员'
    r.code = 'admin'
    r.menuIds = [1, 2, 3]
    expect(r.name).toBe('管理员')
    expect(r.menuIds).toEqual([1, 2, 3])
  })
})
