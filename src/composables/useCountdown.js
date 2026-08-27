import { onUnmounted, ref } from 'vue'

/**
 * ICT WEEK 2026 ochilishigacha qolgan vaqt.
 * Figma dizaynida statik "81 / 21 / 15" ko'rsatilgan — bu yerda jonli sanaladi.
 */
export function useCountdown(target) {
  const deadline = new Date(target).getTime()
  const days = ref('0')
  const hours = ref('0')
  const minutes = ref('0')

  const tick = () => {
    const diff = Math.max(0, deadline - Date.now())
    const totalMinutes = Math.floor(diff / 60000)
    days.value = String(Math.floor(totalMinutes / 1440))
    hours.value = String(Math.floor((totalMinutes % 1440) / 60))
    minutes.value = String(totalMinutes % 60)
  }

  tick()
  const timer = setInterval(tick, 30000)
  onUnmounted(() => clearInterval(timer))

  return { days, hours, minutes }
}
