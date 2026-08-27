<script setup>
/**
 * Figmadan eksport qilingan ikonkalar. Har birining o'z viewBox'i saqlangan —
 * shunda chiziq qalinligi Figmadagidek nisbatda kattalashadi.
 * Ranglar `currentColor` ga o'girilgan, CSS orqali boshqariladi.
 */
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const ICONS = {
  'chevron-down': {
    box: '0 0 16 16',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m4 6 4 4 4-4"/>',
  },
  'arrow-up-right': {
    box: '0 0 24 24',
    body: '<path fill="currentColor" d="M18 6h1V5h-1zm0 0-.707-.707-12 12L6 18l.707.707 12-12zm-7 0v1h7V5h-7zm7 0h-1v7h2V6z"/>',
  },
  'arrow-left': {
    box: '0 0 32 32',
    body: '<path stroke="currentColor" stroke-miterlimit="16" stroke-width="3" d="M21 4 9 16l12 12"/>',
  },
  download: {
    box: '0 0 20 20',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.667" d="M17.5 12.5v3.333a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15.833V12.5m3.334-4.167L10 12.5l4.167-4.167M10 12.5v-10"/>',
  },
  calendar: {
    box: '0 0 20 20',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-width="2.222" d="M6.667 1.666V5m6.666-3.334V5M2.5 8.333h15m-13.333-5h11.666c.92 0 1.667.746 1.667 1.667v11.667c0 .92-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.746-1.667-1.667V5c0-.921.746-1.667 1.667-1.667Z"/>',
  },
  clock: {
    box: '0 0 20 20',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-width="2.222" d="M10 5v5l3.334 1.667m5-1.667a8.334 8.334 0 1 1-16.668 0 8.334 8.334 0 0 1 16.668 0Z"/>',
  },
  'map-pin': {
    box: '0 0 20 20',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-width="2.222" d="M10.5 18.167c1.55-1.339 6.166-5.673 6.166-9.834A6.67 6.67 0 0 0 10 1.666a6.665 6.665 0 0 0-6.666 6.667c0 4.162 4.615 8.495 6.165 9.834a.83.83 0 0 0 1.002 0Z"/>',
  },
  'shield-check': {
    box: '0 0 40 40',
    body: '<path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="m15 19.999 3.334 3.333L25 16.666m8.332 5c0 8.334-5.833 12.5-12.765 14.918a1.67 1.67 0 0 1-1.117-.017C12.5 34.167 6.668 30 6.668 21.667V9.998a1.667 1.667 0 0 1 1.666-1.666c3.334 0 7.5-2 10.4-4.534a1.95 1.95 0 0 1 2.532 0c2.917 2.55 7.067 4.534 10.4 4.534a1.666 1.666 0 0 1 1.666 1.666z"/>',
  },
  home: {
    box: '0 0 20 20',
    body:
      '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" ' +
      'd="M1.667 9.167 10 2.5l8.333 6.667v8.333a1.667 1.667 0 0 1-1.666 1.667H3.333a1.667 1.667 0 0 1-1.666-1.667z"/>' +
      '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" ' +
      'd="M7.5 19.167V10.833h5v8.334"/>',
  },
  play: {
    box: '0 0 21 21',
    body: '<path fill="currentColor" d="M4.5 10.125V5c0-1.557 1.684-2.532 3.034-1.756L12 5.812l4.447 2.557c1.354.779 1.354 2.733 0 3.511L12 14.437l-4.466 2.568c-1.35.776-3.034-.198-3.034-1.756z"/>',
  },
  // Yashil doira + to'q belgi — Figmada ikki rangli
  'check-circle': {
    box: '0 0 20 20',
    body:
      '<rect width="20" height="20" fill="currentColor" rx="10"/>' +
      '<path stroke="#121b26" stroke-linecap="round" stroke-width="2" d="M14.666 6.5 8.25 12.916 5.334 10"/>',
  },
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="ICONS[name].box"
    fill="none"
    aria-hidden="true"
    focusable="false"
    v-html="ICONS[name].body"
  />
</template>
