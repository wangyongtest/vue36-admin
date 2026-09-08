<template>
  <PageContainer title="菜单管理">
    <template #extra>
      <a-button type="primary" v-auth="'system:menu:add'" @click="openCreate">新增菜单</a-button>
    </template>

    <ProTable :columns="menuColumns" :request="menuService.getMenuList">
      <template #cell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <a-tag :color="typeColor(record.type)">{{ MenuTypeLabel[record.type as MenuType] }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'visible'">
          <a-tag :color="record.visible ? 'blue' : 'default'">
            {{ record.visible ? '显示' : '隐藏' }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="link" v-auth="'system:menu:edit'" @click="onEdit(record)">编辑</a-button>
            <a-button type="link" danger v-auth="'system:menu:delete'" @click="onDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>

    <a-modal v-model:open="modalOpen" :title="modalTitle" @ok="onSubmit">
      <a-form :model="formModel" layout="vertical">
        <a-form-item label="上级菜单" name="parentId">
          <a-input-number v-model:value="formModel.parentId" :min="0" />
        </a-form-item>
        <a-form-item label="菜单类型" name="type">
          <a-select v-model:value="formModel.type" :options="menuTypeOptions" />
        </a-form-item>
        <a-form-item label="菜单名称" name="name">
          <a-input v-model:value="formModel.name" />
        </a-form-item>
        <a-form-item label="图标" name="icon">
          <a-input v-model:value="formModel.icon" />
        </a-form-item>
        <a-form-item label="路由地址" name="path">
          <a-input v-model:value="formModel.path" />
        </a-form-item>
        <a-form-item label="组件路径" name="component">
          <a-input v-model:value="formModel.component" />
        </a-form-item>
        <a-form-item label="权限标识" name="permission">
          <a-input v-model:value="formModel.permission" placeholder="如 system:user:list" />
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number v-model:value="formModel.sort" :min="0" />
        </a-form-item>
        <a-form-item label="是否缓存" name="keepAlive">
          <a-switch v-model:checked="formModel.keepAlive" />
        </a-form-item>
        <a-form-item label="是否显示" name="visible">
          <a-switch v-model:checked="formModel.visible" />
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
import { menuService } from '@application/services/menu.service'
import { menuColumns, createMenuForm, menuTypeOptions, MenuTypeLabel } from './schema'
import type { MenuEntity, MenuType } from '@domain/menu/menu.entity'

const modalOpen = ref(false)
const modalTitle = ref('新增菜单')
const formModel = reactive(createMenuForm())

function typeColor(t: MenuType) {
  if (t === 'M') return 'purple'
  if (t === 'C') return 'blue'
  return 'orange'
}

function openCreate() {
  Object.assign(formModel, createMenuForm())
  modalTitle.value = '新增菜单'
  modalOpen.value = true
}

function onEdit(record: MenuEntity) {
  Object.assign(formModel, {
    ...createMenuForm(),
    id: record.id,
    parentId: record.parentId,
    name: record.name,
    icon: record.icon,
    type: record.type,
    path: record.path,
    component: record.component,
    permission: record.permission,
    sort: record.sort,
    keepAlive: record.keepAlive,
    visible: record.visible,
    status: record.status,
  })
  modalTitle.value = '编辑菜单'
  modalOpen.value = true
}

async function onSubmit() {
  try {
    const payload = {
      parentId: formModel.parentId,
      name: formModel.name,
      icon: formModel.icon,
      type: formModel.type,
      path: formModel.path,
      component: formModel.component,
      permission: formModel.permission,
      sort: formModel.sort,
      keepAlive: formModel.keepAlive,
      visible: formModel.visible,
      status: formModel.status,
    }
    if (formModel.id) {
      await menuService.updateMenu({ id: formModel.id, ...payload })
    } else {
      await menuService.createMenu(payload)
    }
    message.success('保存成功')
    modalOpen.value = false
  } catch {
    // 拦截器已提示
  }
}

function onDelete(record: MenuEntity) {
  Modal.confirm({
    title: '确认删除',
    content: `确认删除菜单「${record.name}」？`,
    onOk: async () => {
      await menuService.deleteMenu(record.id)
      message.success('删除成功')
    },
  })
}
</script>
