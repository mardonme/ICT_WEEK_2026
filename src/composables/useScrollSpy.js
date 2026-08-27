import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Skroll paytida qaysi bo'lim ko'rinayotganini aniqlaydi.
 * `rootMargin` ekranning ~45% balandligida ingichka "faol chiziq" hosil qiladi —
 * shu chiziqni kesib o'tgan bo'lim faol hisoblanadi.
 *
 * @param {{ key: string, selector: string }[]} sections
 */
export function useScrollSpy(sections) {
  const active = ref(sections[0]?.key ?? '')
  let observer

  onMounted(() => {
    const map = new Map()
    for (const s of sections) {
      const el = document.querySelector(s.selector)
      if (el) map.set(el, s.key)
    }
    if (!map.size) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = map.get(entry.target)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    for (const el of map.keys()) observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())

  return active
}
