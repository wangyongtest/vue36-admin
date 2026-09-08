/** 统一返回结果（领域层共享内核） */
export interface Result<T = unknown> {
  code: number
  msg: string
  data: T
}

/** 分页结果 */
export interface PageResult<T = unknown> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
}
