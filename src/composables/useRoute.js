import { ref } from 'vue'

/**
 * Juda yengil marshrutlash — bitta qo'shimcha sahifa uchun vue-router
 * ortiqcha bo'lardi. History API bilan ishlaydi, sahifani yangilaganda
 * ham to'g'ri ochiladi (vercel.json dagi SPA rewrite tufayli).
 */
const path = ref(window.location.pathname)

window.addEventListener('popstate', () => {
  path.value = window.location.pathname
})

export function navigate(to) {
  if (window.location.pathname === to) return
  window.history.pushState({}, '', to)
  path.value = to
  window.scrollTo({ top: 0, behavior: 'instant' })
}

export function useRoute() {
  return { path }
}
