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

import { DictRepositoryImpl, DictItemRepositoryImpl } from '../dict.repository.impl'

describe('DictRepositoryImpl', () => {
  let repo: DictRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new DictRepositoryImpl()
  })

  it('list 请求 /system/dict/list 并透传查询参数', async () => {
    const payload = { list: [], total: 0, pageNum: 1, pageSize: 10 }
    vi.mocked(http.get).mockResolvedValue(payload as never)

    const res = await repo.list({ pageNum: 1, pageSize: 10, name: '性别' })

    expect(http.get).toHaveBeenCalledWith('/system/dict/list', {
      params: { pageNum: 1, pageSize: 10, name: '性别' },
    })
    expect(res).toBe(payload)
  })

  it('create 请求 POST /system/dict', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined as never)

    await repo.create({ name: '性别', code: 'gender' })

    expect(http.post).toHaveBeenCalledWith('/system/dict', { name: '性别', code: 'gender' })
  })

  it('update 请求 PUT /system/dict/:id', async () => {
    vi.mocked(http.put).mockResolvedValue(undefined as never)

    await repo.update({ id: 7, name: '用户性别' })

    expect(http.put).toHaveBeenCalledWith('/system/dict/7', { id: 7, name: '用户性别' })
  })

  it('delete 请求 DELETE /system/dict/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue(undefined as never)

    await repo.delete(7)

    expect(http.delete).toHaveBeenCalledWith('/system/dict/7')
  })
})

describe('DictItemRepositoryImpl', () => {
  let repo: DictItemRepositoryImpl

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new DictItemRepositoryImpl()
  })

  it('list 请求 /system/dict/item/list 并携带 dictCode 过滤', async () => {
    const payload = { list: [], total: 0, pageNum: 1, pageSize: 10 }
    vi.mocked(http.get).mockResolvedValue(payload as never)

    const res = await repo.list({ pageNum: 1, pageSize: 10, dictCode: 'gender' })

    expect(http.get).toHaveBeenCalledWith('/system/dict/item/list', {
      params: { pageNum: 1, pageSize: 10, dictCode: 'gender' },
    })
    expect(res).toBe(payload)
  })

  it('create 请求 POST /system/dict/item', async () => {
    vi.mocked(http.post).mockResolvedValue(undefined as never)

    await repo.create({ dictCode: 'gender', label: '男', value: '1' })

    expect(http.post).toHaveBeenCalledWith('/system/dict/item', {
      dictCode: 'gender',
      label: '男',
      value: '1',
    })
  })

  it('update 请求 PUT /system/dict/item/:id', async () => {
    vi.mocked(http.put).mockResolvedValue(undefined as never)

    await repo.update({ id: 12, label: '女' })

    expect(http.put).toHaveBeenCalledWith('/system/dict/item/12', { id: 12, label: '女' })
  })

  it('delete 请求 DELETE /system/dict/item/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue(undefined as never)

    await repo.delete(12)

    expect(http.delete).toHaveBeenCalledWith('/system/dict/item/12')
  })
})
