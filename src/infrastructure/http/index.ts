import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { logger } from '@infra/logger'

// 扩展 Axios 请求配置，挂载请求开始时间用于耗时统计
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: { startTime: number }
  }
  export interface AxiosResponse {
    metadata?: { startTime: number }
  }
}

/**
 * 业务侧 HTTP 客户端。
 *
 * 拦截器会在响应阶段 `return response.data`，因此业务侧拿到的就是后端 payload，
 * 不必再 `res.data`。但 axios 自身的类型签名仍把它标为 AxiosResponse，
 * 这里在导出处做一次类型擦除，调用方自行按业务契约断言 / 标注。
 */
type HttpInstance = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
  interceptors: AxiosInstance['interceptors']
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
})

// 请求拦截器：记录开始时间 + 注入 Token
http.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：统一解包、慢接口告警、错误提示
http.interceptors.response.use(
  (response) => {
    const startTime = response.config.metadata?.startTime ?? Date.now()
    const duration = Date.now() - startTime
    const url = response.config.url ?? ''

    // 慢接口告警 > 3s
    if (duration > 3000) {
      logger.warn('api', `慢接口告警: ${url} 耗时${duration}ms`, {
        url,
        duration,
        params: response.config.params,
      })
    } else {
      logger.debug('api', `${response.config.method?.toUpperCase()} ${url} ${duration}ms`)
    }

    return response.data
  },
  (error) => {
    logger.error('api', `接口请求失败: ${error.config?.url}`, error)
    message.error(error.message || '请求失败')
    return Promise.reject(error)
  },
)

export default http as unknown as HttpInstance
