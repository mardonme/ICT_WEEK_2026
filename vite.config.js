import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_tokens.scss" as *;\n@use "@/styles/_mixins.scss" as *;\n`,
      },
    },
  },
  build: {
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
