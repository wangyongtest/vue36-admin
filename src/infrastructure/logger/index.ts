type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'

interface LogEntry {
  timestamp: string
  level: LogLevel
  module: string
  message: string
  stack?: string
  userId?: string | number
  url?: string
  userAgent?: string
  duration?: number
  extra?: Record<string, any>
}

/**
 * 统一日志体系（五大类：全局错误 / 资源加载 / Oxlint 规范 / 性能监控 / 接口请求）
 * - 开发环境全量输出，生产环境仅输出 ERROR 及以上并上报
 * - 本地缓存最近 100 条，便于复现时排查
 */
class Logger {
  private level: LogLevel = import.meta.env.DEV ? 'DEBUG' : 'ERROR'
  private cache: LogEntry[] = []
  private maxCache = 100

  private formatEntry(
    level: LogLevel,
    module: string,
    message: string,
    extra?: any,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      stack: extra?.stack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      extra,
    }
  }

  private output(entry: LogEntry) {
    const colors: Record<LogLevel, string> = {
      DEBUG: '#888',
      INFO: '#1890ff',
      WARN: '#faad14',
      ERROR: '#ff4d4f',
      FATAL: '#8b0000',
    }
    // 1. 控制台美化输出
    console.log(
      `%c[${entry.level}]%c[${entry.module}]%c ${entry.message}`,
      `color:${colors[entry.level]};font-weight:bold`,
      'color:#666',
      'color:#333',
      entry.extra || '',
    )

    // 2. 本地缓存最近 100 条
    this.cache.push(entry)
    if (this.cache.length > this.maxCache) {
      this.cache.shift()
    }

    // 3. 生产环境 ERROR 级别上报日志服务
    if (import.meta.env.PROD && ['ERROR', 'FATAL'].includes(entry.level)) {
      this.report(entry)
    }
  }

  private async report(entry: LogEntry) {
    try {
      await fetch('/api/log/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
        keepalive: true,
      })
    } catch {
      // 上报失败不影响主流程
    }
  }

  debug(module: string, message: string, extra?: any) {
    if (this.level === 'DEBUG') this.output(this.formatEntry('DEBUG', module, message, extra))
  }

  info(module: string, message: string, extra?: any) {
    this.output(this.formatEntry('INFO', module, message, extra))
  }

  warn(module: string, message: string, extra?: any) {
    this.output(this.formatEntry('WARN', module, message, extra))
  }

  error(module: string, message: string, error?: Error | any) {
    this.output(
      this.formatEntry('ERROR', module, message, {
        stack: error?.stack,
        ...error,
      }),
    )
  }

  fatal(module: string, message: string, error?: Error | any) {
    this.output(
      this.formatEntry('FATAL', module, message, {
        stack: error?.stack,
        ...error,
      }),
    )
  }

  getCache(): LogEntry[] {
    return [...this.cache]
  }
}

export const logger = new Logger()
export type { LogLevel, LogEntry }
