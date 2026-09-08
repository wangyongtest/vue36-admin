import type { UserRepository, UserQuery, UserCreateDTO, UserUpdateDTO, UserResetPwdDTO } from '@domain/user/user.repository'
import type { PageResult } from '@domain/shared/result'
import type { UserEntity } from '@domain/user/user.entity'
import { UserRepositoryImpl } from '@infra/repositories/user.repository.impl'

// 应用层只做流程编排，具体技术实现委托基础设施层仓储
const userRepo: UserRepository = new UserRepositoryImpl()

export const userService = {
  getUserList: (params: UserQuery): Promise<PageResult<UserEntity>> => userRepo.list(params),
  createUser: (data: UserCreateDTO) => userRepo.create(data),
  updateUser: (data: UserUpdateDTO) => userRepo.update(data),
  deleteUser: (id: number) => userRepo.delete(id),
  resetPassword: (data: UserResetPwdDTO) => userRepo.resetPassword(data),
}
