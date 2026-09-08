import { describe, it, expect } from 'vitest'
import {
  StatusEnum,
  GenderEnum,
  DataScopeEnum,
  StatusLabel,
  GenderLabel,
} from '../user.value-object'

describe('用户值对象：枚举与中文标签', () => {
  it('StatusEnum 值正确', () => {
    expect(StatusEnum.NORMAL).toBe(0)
    expect(StatusEnum.DISABLED).toBe(1)
  })

  it('GenderEnum 值正确', () => {
    expect(GenderEnum.MALE).toBe(0)
    expect(GenderEnum.FEMALE).toBe(1)
    expect(GenderEnum.UNKNOWN).toBe(2)
  })

  it('DataScopeEnum 值正确', () => {
    expect(DataScopeEnum.ALL).toBe(1)
    expect(DataScopeEnum.DEPT).toBe(2)
    expect(DataScopeEnum.DEPT_AND_CHILD).toBe(3)
    expect(DataScopeEnum.CUSTOM).toBe(4)
    expect(DataScopeEnum.SELF).toBe(5)
  })

  it('StatusLabel 映射正确', () => {
    expect(StatusLabel[StatusEnum.NORMAL]).toBe('正常')
    expect(StatusLabel[StatusEnum.DISABLED]).toBe('停用')
  })

  it('GenderLabel 映射正确', () => {
    expect(GenderLabel[GenderEnum.MALE]).toBe('男')
    expect(GenderLabel[GenderEnum.FEMALE]).toBe('女')
    expect(GenderLabel[GenderEnum.UNKNOWN]).toBe('未知')
  })
})
