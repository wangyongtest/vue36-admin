import { describe, it, expect, vi, beforeEach } from 'vitest'
import http from '@infra/http'

// 隔离 HTTP 客户端，仓储实现只负责 URL 与参数映射
vi.mock('@infra/http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import { RoleRepositoryImpl } from '../role.repository.impl'

describe('RoleRepositoryImpl', () => {
  let repo: RoleRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new RoleRepositoryImpl()
  })

  it('list 请求 /system/role/list 并透传查询参数', async () => {
    const payload = { list: [], total: 0, pageNum: 1, pageSize: 10 }
    vi.mocked(http.get).mockResolvedValue(payload as never)

    const res = await repo.list({ pageNum: 1, pageSize: 10 })

    expect(http.get).toHaveBeenCalledWith('/system/role/list', {
      params: { pageNum: 1, pageSize: 10 },
    })
    // 响应拦截器已解包 response.data，故直接等于 payload
    expect(res).toBe(payload)
  })

  it('create 请求 POST /system/role', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined as never)

    await repo.create({ name: '管理员', code: 'admin', menuIds: [1, 2] })

    expect(http.post).toHaveBeenCalledWith('/system/role', {
      name: '管理员',
      code: 'admin',
      menuIds: [1, 2],
    })
  })

  it('update 请求 PUT /system/role/:id', async () => {
    vi.mocked(http.put).mockResolvedValue(undefined as never)

    await repo.update({ id: 7, name: '运营' })

    expect(http.put).toHaveBeenCalledWith('/system/role/7', { id: 7, name: '运营' })
  })

  it('delete 请求 DELETE /system/role/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue(undefined as never)

    await repo.delete(7)

    expect(http.delete).toHaveBeenCalledWith('/system/role/7')
  })
})
