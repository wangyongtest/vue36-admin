import http from '@infra/http'
import type {
  UserRepository,
  UserQuery,
  UserCreateDTO,
  UserUpdateDTO,
  UserResetPwdDTO,
} from '@domain/user/user.repository'

/** 用户仓储实现（基础设施层）：对接 /system/user 后端接口 */
export class UserRepositoryImpl implements UserRepository {
  // 列表查询：后端返回 PageResult<UserEntity>，由拦截器 unwrap 后直接得到
  async list(params: UserQuery) {
    return (await http.get('/system/user/list', { params })) as Awaited<
      ReturnType<UserRepository['list']>
    >
  }

  // 写入类接口后端无业务负载返回，调用方只需成功/失败，故不返回数据
  async create(data: UserCreateDTO): Promise<void> {
    await http.post('/system/user', data)
  }

  async update(data: UserUpdateDTO): Promise<void> {
    await http.put(`/system/user/${data.id}`, data)
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/system/user/${id}`)
  }

  async resetPassword(data: UserResetPwdDTO): Promise<void> {
    await http.put(`/system/user/reset-pwd/${data.id}`, data)
  }
}
