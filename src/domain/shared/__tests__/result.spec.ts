import { describe, it, expect } from 'vitest'
import type { Result, PageResult } from '../result'

describe('Result / PageResult 契约（共享内核）', () => {
  it('PageResult 结构正确', () => {
    const page: PageResult<string> = {
      list: ['a', 'b'],
      total: 2,
      pageNum: 1,
      pageSize: 10,
    }
    expect(page.list).toEqual(['a', 'b'])
    expect(page.total).toBe(2)
    expect(page.pageNum).toBe(1)
    expect(page.pageSize).toBe(10)
  })

  it('Result 结构正确', () => {
    const r: Result<number> = { code: 200, msg: 'ok', data: 1 }
    expect(r.code).toBe(200)
    expect(r.msg).toBe('ok')
    expect(r.data).toBe(1)
  })
})
