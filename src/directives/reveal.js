/**
 * v-reveal — element ekranga kirganda uni mayin ko'tarib chiqaradi.
 * Bitta umumiy IntersectionObserver ishlatiladi, element bir marta
 * ochilgach kuzatuvdan chiqariladi — ortiqcha ish qolmaydi.
 *
 * Foydalanish:  <section v-reveal>…       <div v-reveal="120">…  (ms kechikish)
 */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)')

let observer = null
const getObserver = () => {
  observer ||= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
  )
  return observer
}

export const reveal = {
  mounted(el, binding) {
    if (REDUCED.matches) return
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
