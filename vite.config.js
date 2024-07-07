import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vuezhyqdap',{
        useDevMode: true,// 开发模式
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 8888,
    //域名
    // host: 'localhost',
    proxy:{
      '/api': {
        target: 'https://api-hmzs.itheima.net/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // 防止开发阶段的assets静态资源加载问题
    origin: '//localhost:8888'
  }
})
