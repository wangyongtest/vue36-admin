<template>
  <div class="login-wrap">
    <a-card class="login-card" title="Vue 3.6 企业级中台">
      <a-form :model="form" @finish="onSubmit">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
          <a-input v-model:value="form.username" placeholder="账号" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { message } from 'ant-design-vue'

const router = useRouter()
const user = useUserStore()
const form = reactive({ username: '', password: '' })
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await user.login(form.username, form.password)
    await user.fetchProfile()
    message.success('登录成功')
    router.replace('/')
  } catch {
    // 错误已由 http 拦截器统一提示
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1890ff;
}
.login-card {
  width: 360px;
}
</style>
