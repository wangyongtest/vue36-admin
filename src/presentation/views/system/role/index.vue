<template>
  <PageContainer title="角色管理">
    <template #extra>
      <a-button type="primary" v-auth="'system:role:add'" @click="openCreate">新增角色</a-button>
    </template>

    <ProTable :columns="roleColumns" :request="roleService.getRoleList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 0 ? 'green' : 'red'">
            {{ statusLabel(record.status) }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'dataScope'">
          <a-tag>{{ dataScopeLabel(record.dataScope) }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" v-auth="'system:role:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:role:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="角色名称" name="name">
          <a-input v-model:value="formModel.name" />
        </a-form-item>
        <a-form-item label="角色编码" name="code">
          <a-input v-model:value="formModel.code" :disabled="!!formModel.id" />
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="formModel.sort" :min="0" />
        </a-form-item>
        <a-form-item label="数据范围" name="dataScope">
          <a-select v-model:value="formModel.dataScope" :options="dataScopeOptions" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="formModel.status" :options="statusOptions" />
        </a-form-item>
        <a-form-item label="菜单权限" name="menuIds">
          <a-select v-model:value="formModel.menuIds" mode="multiple" :options="menuOptions" />
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
import { message, Modal } from 'ant-design-vue'
import PageContainer from '@presentation/components/PageContainer.vue'
import ProTable from '@presentation/components/ProTable.vue'
import { roleService } from '@application/services/role.service'
import { roleColumns, createRoleForm } from './schema'
import {
  StatusEnum,
  StatusLabel,
  DataScopeEnum,
  DataScopeLabel,
} from '@domain/user/user.value-object'
import type { RoleEntity } from '@domain/role/role.entity'

const modalOpen = ref(false)
const modalTitle = ref('新增角色')
const formModel = reactive(createRoleForm())

const statusOptions = (Object.values(StatusEnum) as StatusEnum[]).map((v) => ({ label: StatusLabel[v], value: v }))
const dataScopeOptions = (Object.values(DataScopeEnum) as DataScopeEnum[]).map((v) => ({
  label: DataScopeLabel[v],
  value: v,
}))
const menuOptions = [
  { label: '系统管理', value: 1 },
  { label: '用户管理', value: 2 },
  { label: '角色管理', value: 3 },
]

function statusLabel(s: StatusEnum) {
  return StatusLabel[s] ?? '-'
}

function dataScopeLabel(d: DataScopeEnum) {
  return DataScopeLabel[d] ?? '-'
}

function openCreate() {
  Object.assign(formModel, createRoleForm())
  modalTitle.value = '新增角色'
  modalOpen.value = true
}

function onEdit(record: RoleEntity) {
  Object.assign(formModel, {
    ...createRoleForm(),
    id: record.id,
    name: record.name,
    code: record.code,
    sort: record.sort,
    dataScope: record.dataScope,
    status: record.status,
    menuIds: record.menuIds,
    remark: record.remark,
  })
  modalTitle.value = '编辑角色'
  modalOpen.value = true
}

async function onSubmit() {
  try {
    const payload = {
      name: formModel.name,
      code: formModel.code,
      sort: formModel.sort,
      dataScope: formModel.dataScope,
      status: formModel.status,
      menuIds: formModel.menuIds,
      remark: formModel.remark,
    }
    if (formModel.id) {
      await roleService.updateRole({ id: formModel.id, ...payload })
    } else {
      await roleService.createRole(payload)
    }
    message.success('保存成功')
    modalOpen.value = false
  } catch {
    // 拦截器已提示
  }
}

function onDelete(record: RoleEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除角色「${record.name}」？`,
    onOk: async () => {
      await roleService.deleteRole(record.id)
      message.success('删除成功')
    },
  })
}
</script>
