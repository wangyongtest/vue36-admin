import { describe, it, expect } from 'vitest'
import { DeptEntity } from '../dept.entity'
import { StatusEnum } from '@domain/user/user.value-object'

describe('DeptEntity', () => {
  it('默认字段正确', () => {
    const d = new DeptEntity()
    expect(d.parentId).toBe(0)
    expect(d.name).toBe('')
    expect(d.leader).toBe('')
    expect(d.phone).toBe('')
    expect(d.email).toBe('')
    expect(d.sort).toBe(0)
    expect(d.status).toBe(StatusEnum.NORMAL)
  })

  it('继承 BaseEntity.equals 按主键判定', () => {
    const a = new DeptEntity()
    a.id = 1
    const b = new DeptEntity()
    b.id = 1
    expect(a.equals(b)).toBe(true)
  })

  it('可正常赋值业务字段', () => {
    const d = new DeptEntity()
    d.name = '研发部'
    d.leader = '张三'
    expect(d.name).toBe('研发部')
    expect(d.leader).toBe('张三')
  })
})
