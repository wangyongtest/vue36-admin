import { describe, it, expect, vi, beforeEach } from 'vitest'
import http from '@infra/http'

vi.mock('@infra/http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import { DeptRepositoryImpl } from '../dept.repository.impl'

describe('DeptRepositoryImpl', () => {
  let repo: DeptRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new DeptRepositoryImpl()
  })

  it('list 请求 /system/dept/list 并透传查询参数', async () => {
    const payload = { list: [], total: 0, pageNum: 1, pageSize: 10 }
    vi.mocked(http.get).mockResolvedValue(payload as never)

    const res = await repo.list({ pageNum: 1, pageSize: 10 })

    expect(http.get).toHaveBeenCalledWith('/system/dept/list', {
      params: { pageNum: 1, pageSize: 10 },
    })
    expect(res).toBe(payload)
  })

  it('create 请求 POST /system/dept', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined as never)

    await repo.create({ parentId: 0, name: '技术部' })

    expect(http.post).toHaveBeenCalledWith('/system/dept', { parentId: 0, name: '技术部' })
  })

  it('update 请求 PUT /system/dept/:id', async () => {
    vi.mocked(http.put).mockResolvedValue(undefined as never)

    await repo.update({ id: 3, name: '研发部' })

    expect(http.put).toHaveBeenCalledWith('/system/dept/3', { id: 3, name: '研发部' })
  })

  it('delete 请求 DELETE /system/dept/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue(undefined as never)

    await repo.delete(3)

    expect(http.delete).toHaveBeenCalledWith('/system/dept/3')
  })
})
