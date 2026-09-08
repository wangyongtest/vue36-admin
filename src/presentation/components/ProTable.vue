<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    :scroll="{ x: 'max-content' }"
    @change="handleChange"
  >
    <template #bodyCell="{ column, record }">
      <slot name="cell" :column="column" :record="record" />
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface PageData {
  list: any[]
  total: number
}

const props = withDefaults(
  defineProps<{
    columns: any[]
    request: (params: { pageNum: number; pageSize: number }) => Promise<PageData>
    rowKey?: string
  }>(),
  { rowKey: 'id' },
)

const data = ref<any[]>([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

async function load() {
  loading.value = true
  try {
    const res = await props.request({
      pageNum: pagination.value.current,
      pageSize: pagination.value.pageSize,
    })
    data.value = res.list
    pagination.value.total = res.total
  } catch (e) {
    // 错误已由 http 拦截器统一处理
  } finally {
    loading.value = false
  }
}

function handleChange(pag: any) {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
  load()
}

onMounted(load)

defineExpose({ reload: load })
</script>
