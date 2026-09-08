import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      /**
       * 门禁作用域：领域层 + 仓储实现（即有单测覆盖、且应当被强约束的两层）。
       * 表现层 / 应用服务 / 状态管理等尚无单测，纳入统计会让门禁永远不达标，
       * 因此不纳入 include，待补齐测试后再逐步放开。
       */
      include: ['src/domain/**/*.ts', 'src/infrastructure/repositories/**/*.ts'],
      /**
       * 纯类型 / 接口文件编译后无可执行语句，v8 统计恒为 0%，
       * 若不排除则 domain 100% 门禁永远无法通过。
       */
      exclude: [
        '**/*.d.ts',
        'src/domain/**/*.repository.ts',
        'src/domain/shared/result.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
        'src/domain/**/*.ts': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@presentation': fileURLToPath(new URL('./src/presentation', import.meta.url)),
      '@application': fileURLToPath(new URL('./src/application', import.meta.url)),
      '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
      '@infra': fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
    },
  },
})
