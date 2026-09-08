/** 用户值对象与枚举（领域层） */

/** 状态枚举：0=正常 1=停用 */
export enum StatusEnum {
  NORMAL = 0,
  DISABLED = 1,
}

/** 性别枚举：0=男 1=女 2=未知 */
export enum GenderEnum {
  MALE = 0,
  FEMALE = 1,
  UNKNOWN = 2,
}

/** 数据权限范围：1=全部 2=本部门 3=本部门及以下 4=自定义 5=仅本人 */
export enum DataScopeEnum {
  ALL = 1,
  DEPT = 2,
  DEPT_AND_CHILD = 3,
  CUSTOM = 4,
  SELF = 5,
}

/** 状态枚举 → 中文标签（用于表格 Tag 渲染） */
export const StatusLabel: Record<StatusEnum, string> = {
  [StatusEnum.NORMAL]: '正常',
  [StatusEnum.DISABLED]: '停用',
}

export const GenderLabel: Record<GenderEnum, string> = {
  [GenderEnum.MALE]: '男',
  [GenderEnum.FEMALE]: '女',
  [GenderEnum.UNKNOWN]: '未知',
}

export const DataScopeLabel: Record<DataScopeEnum, string> = {
  [DataScopeEnum.ALL]: '全部',
  [DataScopeEnum.DEPT]: '本部门',
  [DataScopeEnum.DEPT_AND_CHILD]: '本部门及下级',
  [DataScopeEnum.CUSTOM]: '自定义',
  [DataScopeEnum.SELF]: '仅本人',
}
