import { StatusEnum } from '@domain/user/user.value-object'

/** 字典项列表列配置（字段与 docs/03-系统管理字段设计.md 5.3 对齐） */
export const dictItemColumns = [
  { title: '字典项ID', dataIndex: 'id', width: 80 },
  { title: '字典编码', dataIndex: 'dictCode', width: 140 },
  { title: '字典标签', dataIndex: 'label', width: 150 },
  { title: '字典键值', dataIndex: 'value', width: 150 },
  { title: '样式属性', dataIndex: 'tagType', width: 120 },
  { title: '显示排序', dataIndex: 'sort', width: 100 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  { title: '操作', dataIndex: 'action', width: 200, fixed: 'right' as const },
]

export interface DictItemFormModel {
  id?: number
  dictCode: string
  label: string
  value: string
  tagType: string
  sort: number
  status: StatusEnum
  remark: string
}

/** 新增/编辑表单初始模型 */
export function createDictItemForm(dictCode = ''): DictItemFormModel {
  return {
    dictCode,
    label: '',
    value: '',
    tagType: 'default',
    sort: 0,
    status: StatusEnum.NORMAL,
    remark: '',
  }
}
