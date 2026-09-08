/** 用户应用层 DTO：复用领域层仓储接口定义，避免应用层重复声明 */
export type {
  UserQuery,
  UserCreateDTO,
  UserUpdateDTO,
  UserResetPwdDTO,
} from '@domain/user/user.repository'
