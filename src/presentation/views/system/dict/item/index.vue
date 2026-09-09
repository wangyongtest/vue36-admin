<template>
  <PageContainer :title="pageTitle">
    <template #extra>
      <a-space>
        <a-button @click="router.back()">返回字典</a-button>
        <a-button type="primary" v-auth="'system:dict:add'" @click="openCreate">新增字典项</a-button>
      </a-space>
    </template>

    <a-alert
      v-if="!dictCode"
      type="warning"
      show-icon
      message="未指定字典编码，请在字典管理页点击「字典项」进入"
      style="margin-bottom: 16px"
    />

    <ProTable ref="tableRef" :columns="dictItemColumns" :request="fetchList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'tagType'">
          <a-tag :color="tagColor(record.tagType)">{{ record.tagType }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 0 ? 'green' : 'red'">
            {{ statusLabel(record.status) }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" v-auth="'system:dict:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:dict:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="字典编码" name="dictCode">
          <a-input v-model:value="formModel.dictCode" disabled />
        </a-form-item>
        <a-form-item label="标签" name="label">
          <a-input v-model:value="formModel.label" />
        </a-form-item>
        <a-form-item label="值" name="value">
          <a-input v-model:value="formModel.value" :disabled="!!formModel.id" />
        </a-form-item>
        <a-form-item label="标签类型" name="tagType">
          <a-select v-model:value="formModel.tagType" :options="TAG_TYPE_OPTIONS" />
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="formModel.sort" :min="0" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formModel.status" :options="statusOptions" />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea v-model:value="formModel.remark" :rows="3" />
        </a-form-item>
      </a-form>
    </a-modal>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import PageContainer from '@presentation/components/PageContainer.vue'
import ProTable from '@presentation/components/ProTable.vue'
import { dictItemService } from '@application/services/dict-item.service'
import { dictItemColumns, createDictItemForm } from './schema'
import { TAG_TYPE_OPTIONS } from '../schema'
import { StatusEnum, StatusLabel } from '@domain/user/user.value-object'
import type { DictItemEntity } from '@domain/dict/dict.entity'

const route = useRoute()
const router = useRouter()

/** 归属字典编码：由字典管理页通过 query 传入 */
const dictCode = computed(() => (route.query.dictCode as string) || '')
const pageTitle = computed(() => (dictCode.value ? `字典项 - ${dictCode.value}` : '字典项管理'))

const tableRef = ref<InstanceType<typeof ProTable> | null>(null)
const modalOpen = ref(false)
const modalTitle = ref('新增字典项')
const formModel = reactive(createDictItemForm())

const statusOptions = (Object.values(StatusEnum) as StatusEnum[]).map((v) => ({
  label: StatusLabel[v],
  value: v,
}))

/** 列表请求：在分页参数上补充当前字典编码 */
function fetchList(params: { pageNum: number; pageSize: number }) {
  return dictItemService.getDictItemList({ ...params, dictCode: dictCode.value || undefined })
}

function statusLabel(s: StatusEnum) {
  return StatusLabel[s] ?? '-'
}

function tagColor(tagType: string) {
  return TAG_TYPE_OPTIONS.some((o) => o.value === tagType) ? tagType : 'default'
}

function openCreate() {
  Object.assign(formModel, createDictItemForm(dictCode.value))
  modalTitle.value = '新增字典项'
  modalOpen.value = true
}

function onEdit(record: DictItemEntity) {
  Object.assign(formModel, {
    ...createDictItemForm(dictCode.value),
    id: record.id,
    dictCode: record.dictCode || dictCode.value,
    label: record.label,
    value: record.value,
    tagType: record.tagType,
    sort: record.sort,
    status: record.status,
    remark: record.remark,
  })
  modalTitle.value = '编辑字典项'
  modalOpen.value = true
}

async function onSubmit() {
  try {
    const payload = {
      dictCode: formModel.dictCode,
      label: formModel.label,
      value: formModel.value,
      tagType: formModel.tagType,
      sort: formModel.sort,
      status: formModel.status,
    }
    if (formModel.id) {
      await dictItemService.updateDictItem({ id: formModel.id, ...payload })
    } else {
      await dictItemService.createDictItem(payload)
    }
    message.success('保存成功')
    modalOpen.value = false
    tableRef.value?.reload()
  } catch {
    // 拦截器已提示
  }
}

function onDelete(record: DictItemEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除字典项「${record.label}」？`,
    onOk: async () => {
      await dictItemService.deleteDictItem(record.id)
      message.success('删除成功')
      tableRef.value?.reload()
    },
  })
}
</script>
