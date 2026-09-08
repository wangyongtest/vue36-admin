import { describe, it, expect } from 'vitest'
import { BaseValueObject } from '../base.value-object'

class Point extends BaseValueObject {
  constructor(public x: number, public y: number) {
    super()
  }
}

describe('BaseValueObject.equals（共享内核）', () => {
  it('结构相等返回 true', () => {
    expect(new Point(1, 2).equals(new Point(1, 2))).toBe(true)
  })

  it('结构不同返回 false', () => {
    expect(new Point(1, 2).equals(new Point(1, 3))).toBe(false)
  })

  it('与非对象比较返回 false', () => {
    expect(new Point(1, 2).equals('not-an-object')).toBe(false)
  })
})
