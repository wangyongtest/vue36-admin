import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@presentation/router'
import { pinia } from '@/stores'
import Antd from 'ant-design-vue'
import auth from '@presentation/directives/permission'
import 'ant-design-vue/dist/reset.css'
import '@/presentation/styles/index.css'
import { logger } from '@infra/logger'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd)
app.directive('auth', auth)

// 1. Vue 组件渲染错误
app.config.errorHandler = (err, _instance, info) => {
  logger.error('vue', `组件渲染错误: ${info}`, err)
}

// 2. 全局未捕获错误（含静态资源加载失败）
window.addEventListener(
  'error',
  (event) => {
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK' || target.tagName === 'IMG')) {
      logger.error('resource', `资源加载失败: ${(target as any).src || (target as any).href}`, event)
    } else {
      logger.error('global', '全局运行时错误', event.error)
    }
  },
  true,
)

// 3. 未捕获的 Promise 异常
window.addEventListener('unhandledrejection', (event) => {
  logger.error('promise', '未捕获的 Promise 异常', event.reason)
})

// 4. Web Vitals 性能监控（生产环境采样 10% 上报）
import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP }) => {
  const sendPerf = (name: string) => (metric: any) => {
    if (import.meta.env.PROD && Math.random() > 0.1) return
    logger.info('perf', `${name}: ${metric.value}ms`, metric)
  }
  onCLS(sendPerf('CLS'))
  onFID(sendPerf('FID'))
  onLCP(sendPerf('LCP'))
  onFCP(sendPerf('FCP'))
})

app.mount('#app')
