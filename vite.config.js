import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Hero rasmini <link rel="preload"> bilan oldindan yuklaydi.
 * SPA'da rasm faqat JS ishga tushgach topiladi — preload LCP'ni tezlashtiradi.
 */
function preloadHeroImage() {
  return {
    name: 'preload-hero-image',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {})
        const one = files.find((f) => /hero-video-poster-[\w-]+\.webp$/.test(f))
        const two = files.find((f) => /hero-video-poster@2x-[\w-]+\.webp$/.test(f))
        if (!one || !two) return html

        const link =
          `<link rel="preload" as="image" fetchpriority="high" ` +
          `imagesrcset="/${one} 769w, /${two} 1538w" ` +
          `imagesizes="(min-width: 1024px) 769px, 100vw" />`
        return html.replace('</head>', `  ${link}\n  </head>`)
      },
    },
  }
}

export default defineConfig({
  plugins: [vue(), preloadHeroImage()],
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
