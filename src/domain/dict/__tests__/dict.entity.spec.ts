import { describe, it, expect } from 'vitest'
import { DictEntity, DictItemEntity } from '../dict.entity'
import { StatusEnum } from '@domain/user/user.value-object'

describe('DictEntity', () => {
  it('默认字段正确', () => {
    const d = new DictEntity()
    expect(d.name).toBe('')
    expect(d.code).toBe('')
    expect(d.status).toBe(StatusEnum.NORMAL)
  })

  it('继承 BaseEntity.equals 按主键判定', () => {
    const a = new DictEntity()
    a.id = 1
    const b = new DictEntity()
    b.id = 1
    expect(a.equals(b)).toBe(true)
  })
})

describe('DictItemEntity', () => {
  it('默认字段正确', () => {
    const i = new DictItemEntity()
    expect(i.dictCode).toBe('')
    expect(i.label).toBe('')
    expect(i.value).toBe('')
    expect(i.tagType).toBe('default')
    expect(i.sort).toBe(0)
    expect(i.remark).toBe('')
    expect(i.status).toBe(StatusEnum.NORMAL)
  })

  it('可正常赋值业务字段', () => {
    const i = new DictItemEntity()
    i.dictCode = 'sys_yes_no'
    i.label = '是'
    i.value = 'Y'
    expect(i.dictCode).toBe('sys_yes_no')
    expect(i.label).toBe('是')
    expect(i.value).toBe('Y')
  })
})
