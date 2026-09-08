<template>
  <a-result status="error" title="页面出错了" :sub-title="devMessage || '请刷新页面重试'">
    <template #extra>
      <a-button type="primary" @click="onRetry">刷新页面</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ error?: Error }>()
const emit = defineEmits<{ (e: 'retry'): void }>()

const devMessage = computed(() => (import.meta.env.DEV ? props.error?.message : ''))

function onRetry() {
  emit('retry')
  window.location.reload()
}
</script>
