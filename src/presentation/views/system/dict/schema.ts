import { StatusEnum } from '@domain/user/user.value-object'

/** 字典类型列表列配置 */
export const dictColumns = [
  { title: '字典ID', dataIndex: 'id', width: 80 },
  { title: '字典名称', dataIndex: 'name', width: 150 },
  { title: '字典编码', dataIndex: 'code', width: 180 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '备注', dataIndex: 'remark', width: 200 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 250, fixed: 'right' as const },
]

export interface DictFormModel {
  id?: number
  name: string
  code: string
  status: StatusEnum
  remark: string
}

/** 新增/编辑表单初始模型 */
export function createDictForm(): DictFormModel {
  return {
    name: '',
    code: '',
    status: StatusEnum.NORMAL,
    remark: '',
  }
}

/** 字典项可选标签类型（与 antd Tag 色值对齐） */
export const TAG_TYPE_OPTIONS = [
  { label: '默认', value: 'default' },
  { label: '成功', value: 'success' },
  { label: '处理中', value: 'processing' },
  { label: '警告', value: 'warning' },
  { label: '错误', value: 'error' },
]
