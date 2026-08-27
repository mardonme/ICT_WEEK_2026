<script setup>
/**
 * Figmadagi ikonkalar to'plami. Barchasi 24x24 viewBox'ga normallashtirilgan
 * va `currentColor` ishlatadi — rangni CSS'dan boshqarish uchun.
 */
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const PATHS = {
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  'arrow-right': '<path d="M4 12h16m0 0-6-6m6 6-6 6"/>',
  download: '<path d="M12 3v10m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  'map-pin':
    '<path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"/><circle cx="12" cy="10" r="2.75"/>',
  'shield-check':
    '<path d="M12 22s8-3.5 8-10V5.5L12 2.5 4 5.5V12c0 6.5 8 10 8 10Z"/><path d="m9 12 2.25 2.25L15.5 10"/>',
}

// To'ldirilgan (fill) ikonkalar — stroke emas
const FILLED = {
  'check-circle':
    '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5.03 7.53-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06Z"/>',
  play: '<path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.14-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z"/>',
}
</script>

<template>
  <svg
    v-if="FILLED[name]"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    v-html="FILLED[name]"
  />
  <svg
    v-else
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="PATHS[name]"
  />
</template>
