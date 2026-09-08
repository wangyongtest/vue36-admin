<template>
  <PageContainer title="部门管理">
    <template #extra>
      <a-button type="primary" v-auth="'system:dept:add'" @click="openCreate">新增部门</a-button>
    </template>

    <ProTable :columns="deptColumns" :request="deptService.getDeptList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 0 ? 'green' : 'red'">
            {{ statusLabel(record.status) }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" v-auth="'system:dept:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:dept:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="上级部门" name="parentId">
          <a-input-number v-model:value="formModel.parentId" :min="0" />
        </a-form-item>
        <a-form-item label="部门名称" name="name">
          <a-input v-model:value="formModel.name" />
        </a-form-item>
        <a-form-item label="负责人" name="leader">
          <a-input v-model:value="formModel.leader" />
        </a-form-item>
        <a-form-item label="联系电话" name="phone">
          <a-input v-model:value="formModel.phone" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formModel.email" />
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="formModel.sort" :min="0" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formModel.status" :options="statusOptions" />
        </a-form-item>
      </a-form>
    </a-modal>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message, Modal } from 'ant-design-vue'
import PageContainer from '@presentation/components/PageContainer.vue'
import ProTable from '@presentation/components/ProTable.vue'
import { deptService } from '@application/services/dept.service'
import { deptColumns, createDeptForm } from './schema'
import { StatusEnum, StatusLabel } from '@domain/user/user.value-object'
import type { DeptEntity } from '@domain/dept/dept.entity'

const modalOpen = ref(false)
const modalTitle = ref('新增部门')
const formModel = reactive(createDeptForm())

const statusOptions = (Object.values(StatusEnum) as StatusEnum[]).map((v) => ({ label: StatusLabel[v], value: v }))

function statusLabel(s: StatusEnum) {
  return StatusLabel[s] ?? '-'
}

function openCreate() {
  Object.assign(formModel, createDeptForm())
  modalTitle.value = '新增部门'
  modalOpen.value = true
}

function onEdit(record: DeptEntity) {
  Object.assign(formModel, {
    ...createDeptForm(),
    id: record.id,
    parentId: record.parentId,
    name: record.name,
    leader: record.leader,
    phone: record.phone,
    email: record.email,
    sort: record.sort,
    status: record.status,
  })
  modalTitle.value = '编辑部门'
  modalOpen.value = true
}

async function onSubmit() {
  try {
    const payload = {
      parentId: formModel.parentId,
      name: formModel.name,
      leader: formModel.leader,
      phone: formModel.phone,
      email: formModel.email,
      sort: formModel.sort,
      status: formModel.status,
    }
    if (formModel.id) {
      await deptService.updateDept({ id: formModel.id, ...payload })
    } else {
      await deptService.createDept(payload)
    }
    message.success('保存成功')
    modalOpen.value = false
  } catch {
    // 拦截器已提示
  }
}

function onDelete(record: DeptEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除部门「${record.name}」？`,
    onOk: async () => {
      await deptService.deleteDept(record.id)
      message.success('删除成功')
    },
  })
}
</script>
