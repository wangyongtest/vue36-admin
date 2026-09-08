import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@infra/http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import http from '@infra/http'
import { UserRepositoryImpl } from '../user.repository.impl'

const mockedHttp = vi.mocked(http)

describe('UserRepositoryImpl（严格按文档：直接透传 response.data）', () => {
  let repo: UserRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new UserRepositoryImpl()
  })

  it('list 调用 GET /system/user/list 并透传 data', async () => {
    const payload = { list: [{ id: 1 }], total: 1, pageNum: 1, pageSize: 10 }
    mockedHttp.get.mockResolvedValue(payload)
    const res = await repo.list({ pageNum: 1, pageSize: 10 })
    expect(mockedHttp.get).toHaveBeenCalledWith('/system/user/list', {
      params: { pageNum: 1, pageSize: 10 },
    })
    // 严格按文档：响应拦截器仅 return response.data，故直接得到 payload 而非包装对象
    expect(res).toBe(payload)
  })

  it('create 调用 POST /system/user', async () => {
    mockedHttp.post.mockResolvedValue(undefined)
    await repo.create({ username: 'a', nickname: 'A', deptId: 1, roleIds: [] })
    expect(mockedHttp.post).toHaveBeenCalledWith(
      '/system/user',
      expect.objectContaining({ username: 'a' }),
    )
  })

  it('update 调用 PUT /system/user/:id', async () => {
    mockedHttp.put.mockResolvedValue(undefined)
    await repo.update({ id: 5, username: 'a', nickname: 'A', deptId: 1, roleIds: [] })
    expect(mockedHttp.put).toHaveBeenCalledWith(
      '/system/user/5',
      expect.objectContaining({ id: 5 }),
    )
  })

  it('delete 调用 DELETE /system/user/:id', async () => {
    mockedHttp.delete.mockResolvedValue(undefined)
    await repo.delete(5)
    expect(mockedHttp.delete).toHaveBeenCalledWith('/system/user/5')
  })

  it('resetPassword 调用 PUT /system/user/reset-pwd/:id', async () => {
    mockedHttp.put.mockResolvedValue(undefined)
    await repo.resetPassword({ id: 5, password: 'abc123', confirmPassword: 'abc123' })
    expect(mockedHttp.put).toHaveBeenCalledWith(
      '/system/user/reset-pwd/5',
      expect.objectContaining({ id: 5 }),
    )
  })
})
