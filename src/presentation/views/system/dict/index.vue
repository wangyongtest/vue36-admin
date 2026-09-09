<template>
  <PageContainer title="字典管理">
    <template #extra>
      <a-button type="primary" v-auth="'system:dict:add'" @click="openCreate">新增字典</a-button>
    </template>

    <ProTable ref="tableRef" :columns="dictColumns" :request="dictService.getDictList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 0 ? 'green' : 'red'">
            {{ statusLabel(record.status) }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" @click="onOpenItems(record)">字典项</a-button>
            <a-button type="link" v-auth="'system:dict:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:dict:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="字典名称" name="name">
          <a-input v-model:value="formModel.name" />
        </a-form-item>
        <a-form-item label="字典编码" name="code">
          <a-input v-model:value="formModel.code" :disabled="!!formModel.id" />
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import PageContainer from '@presentation/components/PageContainer.vue'
import ProTable from '@presentation/components/ProTable.vue'
import { dictService } from '@application/services/dict.service'
import { dictColumns, createDictForm } from './schema'
import { StatusEnum, StatusLabel } from '@domain/user/user.value-object'
import type { DictEntity } from '@domain/dict/dict.entity'

const router = useRouter()
const tableRef = ref<InstanceType<typeof ProTable> | null>(null)
const modalOpen = ref(false)
const modalTitle = ref('新增字典')
const formModel = reactive(createDictForm())

const statusOptions = (Object.values(StatusEnum) as StatusEnum[]).map((v) => ({
  label: StatusLabel[v],
  value: v,
}))

function statusLabel(s: StatusEnum) {
  return StatusLabel[s] ?? '-'
}

function openCreate() {
  Object.assign(formModel, createDictForm())
  modalTitle.value = '新增字典'
  modalOpen.value = true
}

function onEdit(record: DictEntity) {
  Object.assign(formModel, {
    ...createDictForm(),
    id: record.id,
    name: record.name,
    code: record.code,
    status: record.status,
    remark: record.remark,
  })
  modalTitle.value = '编辑字典'
  modalOpen.value = true
}

/** 跳转到字典项维护页，以 query 传递归属字典编码 */
function onOpenItems(record: DictEntity) {
  router.push({ path: '/system/dict-item', query: { dictCode: record.code } })
}

async function onSubmit() {
  try {
    const payload = {
      name: formModel.name,
      code: formModel.code,
      status: formModel.status,
      remark: formModel.remark,
    }
    if (formModel.id) {
      await dictService.updateDict({ id: formModel.id, ...payload })
    } else {
      await dictService.createDict(payload)
    }
    message.success('保存成功')
    modalOpen.value = false
    tableRef.value?.reload()
  } catch {
    // 拦截器已提示
  }
}

function onDelete(record: DictEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除字典「${record.name}」？`,
    onOk: async () => {
      await dictService.deleteDict(record.id)
      message.success('删除成功')
      tableRef.value?.reload()
    },
  })
}
</script>
