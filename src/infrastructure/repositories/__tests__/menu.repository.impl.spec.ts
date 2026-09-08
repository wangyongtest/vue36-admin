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

import { MenuRepositoryImpl } from '../menu.repository.impl'

describe('MenuRepositoryImpl', () => {
  let repo: MenuRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new MenuRepositoryImpl()
  })

  it('list 请求 /system/menu/list 并透传查询参数', async () => {
    const payload = { list: [], total: 0, pageNum: 1, pageSize: 10 }
    vi.mocked(http.get).mockResolvedValue(payload as never)

    const res = await repo.list({ pageNum: 1, pageSize: 10 })

    expect(http.get).toHaveBeenCalledWith('/system/menu/list', {
      params: { pageNum: 1, pageSize: 10 },
    })
    expect(res).toBe(payload)
  })

  it('create 请求 POST /system/menu', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined as never)

    await repo.create({ parentId: 0, name: '系统管理', type: 'M' })

    expect(http.post).toHaveBeenCalledWith('/system/menu', {
      parentId: 0,
      name: '系统管理',
      type: 'M',
    })
  })

  it('update 请求 PUT /system/menu/:id', async () => {
    vi.mocked(http.put).mockResolvedValue(undefined as never)

    await repo.update({ id: 5, name: '用户管理' })

    expect(http.put).toHaveBeenCalledWith('/system/menu/5', { id: 5, name: '用户管理' })
  })

  it('delete 请求 DELETE /system/menu/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue(undefined as never)

    await repo.delete(5)

    expect(http.delete).toHaveBeenCalledWith('/system/menu/5')
  })
})
