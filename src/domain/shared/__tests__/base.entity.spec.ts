import { describe, it, expect } from 'vitest'
import { BaseEntity } from '../base.entity'

class ConcreteEntity extends BaseEntity {
  name = ''
}

describe('BaseEntity.equals（共享内核）', () => {
  it('主键相等时返回 true', () => {
    const a = new ConcreteEntity()
    a.id = 1
    const b = new ConcreteEntity()
    b.id = 1
    expect(a.equals(b)).toBe(true)
  })

  it('主键不同时返回 false', () => {
    const a = new ConcreteEntity()
    a.id = 1
    const b = new ConcreteEntity()
    b.id = 2
    expect(a.equals(b)).toBe(false)
  })

  it('其它实体为 null 时返回 false', () => {
    const a = new ConcreteEntity()
    a.id = 1
    expect(a.equals(null as unknown as BaseEntity)).toBe(false)
  })

  it('自身 id 未赋值时返回 false', () => {
    const a = new ConcreteEntity()
    const b = new ConcreteEntity()
    expect(a.equals(b)).toBe(false)
  })
})
