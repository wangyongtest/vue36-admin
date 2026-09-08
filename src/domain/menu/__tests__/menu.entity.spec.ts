import { describe, it, expect } from 'vitest'
import { MenuEntity } from '../menu.entity'

describe('MenuEntity', () => {
  it('默认字段正确', () => {
    const m = new MenuEntity()
    expect(m.parentId).toBe(0)
    expect(m.type).toBe('C')
    expect(m.path).toBe('')
    expect(m.component).toBe('')
    expect(m.permission).toBe('')
    expect(m.sort).toBe(0)
    expect(m.keepAlive).toBe(true)
    expect(m.isExternal).toBe(false)
    expect(m.visible).toBe(true)
    expect(m.status).toBe(0)
  })

  it('继承 BaseEntity.equals 按主键判定', () => {
    const a = new MenuEntity()
    a.id = 1
    const b = new MenuEntity()
    b.id = 1
    expect(a.equals(b)).toBe(true)
  })

  it('可正常赋值业务字段', () => {
    const m = new MenuEntity()
    m.name = '系统管理'
    m.type = 'M'
    m.path = '/system'
    expect(m.name).toBe('系统管理')
    expect(m.type).toBe('M')
    expect(m.path).toBe('/system')
  })
})
