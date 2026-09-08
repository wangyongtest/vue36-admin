<template>
  <router-view />
</template>

<script setup lang="ts">
// 全局错误由 main.ts 中 app.config.errorHandler 统一捕获并写入日志体系。
// 路由级错误页（403/404/500）见 src/presentation/views/error。
</script>
