<template>
  <a-layout class="basic-layout">
    <a-layout-sider :collapsed="app.collapsed" collapsible width="220" @collapse="app.toggleCollapsed">
      <div class="logo">{{ app.collapsed ? 'A' : 'Vue36 Admin' }}</div>
      <a-menu :selected-keys="[activeMenu]" mode="inline" @click="onMenuClick">
        <a-menu-item v-for="m in menus" :key="m.key">{{ m.label }}</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header__left">
          <span class="header__label">布局：</span>
          <a-radio-group :value="app.layout" size="small" @change="onLayoutChange">
            <a-radio-button value="side">左侧</a-radio-button>
            <a-radio-button value="top">顶部</a-radio-button>
            <a-radio-button value="mix">混合</a-radio-button>
            <a-radio-button value="columns">双栏</a-radio-button>
          </a-radio-group>
        </div>
        <div class="header__right">
          <a-dropdown>
            <a-button type="text">{{ user.userInfo.username || '未登录' }}</a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="logout" @click="onLogout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'

const app = useAppStore()
const user = useUserStore()
const route = useRoute()
const router = useRouter()

// MVP：菜单由静态配置驱动；接入后端后改为遍历 user.menus 动态生成
const menus = [
  { key: '/dashboard', label: '工作台' },
  { key: '/system/user', label: '用户管理' },
]

const activeMenu = computed(() => route.path)

// 显式对齐 antd 的 MenuProps['onClick'] 签名，避免自定义入参类型不匹配
const onMenuClick: MenuProps['onClick'] = ({ key }) => {
  router.push(key as string)
}

function onLayoutChange(e: any) {
  app.setLayout(e.target.value)
}

function onLogout() {
  user.logout()
  router.push('/login')
}
</script>

<style scoped>
.basic-layout {
  min-height: 100vh;
}
.logo {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 16px;
}
.header__label {
  color: #5c6b7a;
  margin-right: 8px;
}
.content {
  background: #f0f2f5;
}
</style>
