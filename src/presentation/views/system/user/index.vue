<template>
  <PageContainer title="用户管理">
    <template #extra>
      <a-button type="primary" v-auth="'system:user:add'" @click="openCreate">新增用户</a-button>
    </template>

    <ProTable :columns="userColumns" :request="userService.getUserList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'gender'">
          <a-tag>{{ genderLabel(record.gender) }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <a-switch :checked="record.status === 0" @change="() => onToggleStatus(record)" />
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" v-auth="'system:user:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:user:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="用户账号" name="username">
          <a-input v-model:value="formModel.username" :disabled="!!formModel.id" />
        </a-form-item>
        <a-form-item label="用户昵称" name="nickname">
          <a-input v-model:value="formModel.nickname" />
        </a-form-item>
        <a-form-item label="密码" name="password" v-if="!formModel.id">
          <a-input-password v-model:value="formModel.password" placeholder="长度6-20，含字母+数字" />
        </a-form-item>
        <a-form-item label="部门" name="deptId">
          <a-input-number v-model:value="formModel.deptId" :min="0" />
        </a-form-item>
        <a-form-item label="角色" name="roleIds">
          <a-select v-model:value="formModel.roleIds" mode="multiple" :options="roleOptions" />
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
import { userService } from '@application/services/user.service'
import { userColumns, createUserForm } from './schema'
import { GenderEnum, GenderLabel } from '@domain/user/user.value-object'
import type { UserEntity } from '@domain/user/user.entity'

const modalOpen = ref(false)
const modalTitle = ref('新增用户')
const formModel = reactive(createUserForm())
const roleOptions = [
  { label: '管理员', value: 1 },
  { label: '普通用户', value: 2 },
]

function genderLabel(g: GenderEnum) {
  return GenderLabel[g] ?? '-'
}

function openCreate() {
  Object.assign(formModel, createUserForm())
  modalTitle.value = '新增用户'
  modalOpen.value = true
}

function onEdit(record: UserEntity) {
  Object.assign(formModel, {
    ...createUserForm(),
    id: record.id,
    username: record.username,
    nickname: record.nickname,
    deptId: record.deptId,
    roleIds: record.roleIds,
  })
  modalTitle.value = '编辑用户'
  modalOpen.value = true
}

async function onSubmit() {
  try {
    if (formModel.id) {
      await userService.updateUser({
        id: formModel.id,
        username: formModel.username,
        nickname: formModel.nickname,
        deptId: formModel.deptId,
        roleIds: formModel.roleIds,
      })
    } else {
      await userService.createUser({
        username: formModel.username,
        nickname: formModel.nickname,
        password: formModel.password,
        deptId: formModel.deptId,
        roleIds: formModel.roleIds,
      })
    }
    message.success('保存成功')
    modalOpen.value = false
  } catch {
    // 拦截器已提示
  }
}

function onToggleStatus(_record: UserEntity) {
  message.info('状态切换需对接后端接口')
}

function onDelete(record: UserEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除用户「${record.username}」？`,
    onOk: async () => {
      await userService.deleteUser(record.id)
      message.success('删除成功')
    },
  })
}
</script>
