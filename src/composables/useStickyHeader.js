import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Sarlavha panelining skroll xatti-harakati:
 *  - `stuck`  — sahifa yuqorisidan pastga tushildi (fon quyuqlashadi)
 *  - `hidden` — pastga skroll qilinmoqda (panel yashiriladi)
 * Tepaga surilganda panel darhol qaytadi.
 */
export function useStickyHeader({ stickAfter = 40, hideAfter = 240 } = {}) {
  const stuck = ref(false)
  const hidden = ref(false)

  let lastY = 0
  let ticking = false

  const update = () => {
    const y = window.scrollY
    stuck.value = y > stickAfter
    // 6 px dan kichik harakatlarni e'tiborsiz qoldiramiz — panel titramaydi
    if (Math.abs(y - lastY) > 6) {
      hidden.value = y > hideAfter && y > lastY
      lastY = y
    }
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  onMounted(() => {
    lastY = window.scrollY
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { stuck, hidden }
}
