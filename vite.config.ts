import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      // 自动导入 API
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/hooks', 'src/stores', 'src/utils'],
      }),
      // 自动注册组件
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
        dts: 'src/components.d.ts',
        dirs: ['src/presentation/components'],
      }),
    ],
    server: {
      bundled: process.env.VITE_BUNDLED_DEV === 'true',
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
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
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // Ant Design Vue 主题定制
            '@primary-color': '#1890ff',
          },
        },
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      rollupOptions: {
        output: {
          /**
           * Vite 8 使用 rolldown 作为打包内核，`manualChunks` 只接受函数形式，
           * 对象形式会在构建期抛 "manualChunks is not a function"。
           * 判定顺序：antd 必须排在 vue 之前，否则 ant-design-vue 会被 "/vue/" 误吞。
           */
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined
            if (id.includes('ant-design-vue') || id.includes('@ant-design/icons-vue')) return 'antd'
            if (
              id.includes('/vue/') ||
              id.includes('vue-router') ||
              id.includes('/pinia/') ||
              id.includes('@vue/')
            ) {
              return 'vue'
            }
            if (id.includes('/axios/') || id.includes('@vueuse/') || id.includes('/dayjs/')) {
              return 'utils'
            }
            return undefined
          },
        },
      },
    },
  }
})
