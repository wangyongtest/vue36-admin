<template>
  <div class="page-container">
    <div v-if="title || $slots.extra" class="page-container__header">
      <h2 v-if="title" class="page-container__title">{{ title }}</h2>
      <div class="page-container__extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="page-container__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<style scoped>
.page-container {
  padding: 16px;
}
.page-container__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.page-container__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}
</style>
