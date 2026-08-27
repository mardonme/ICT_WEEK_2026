<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  // Logotipning Figmadagi o'lchami — brauzer joyni oldindan band qiladi
  width: { type: Number, required: true },
  height: { type: Number, required: true },
})
</script>

<template>
  <li class="logo-card">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :style="{ maxWidth: width + 'px' }"
      loading="lazy"
      decoding="async"
    />
  </li>
</template>

<style lang="scss" scoped>
/* Figma: 1px ichki gradient chegara (#155b7f -> #1bdb86, opacity .3),
   fon deyarli shaffof, GLASS effekt. */
.logo-card {
  @include gradient-border($r-md);
  display: grid;
  place-items: center;
  padding: 0 24px;
  border-radius: $r-md;
  background: rgba(255, 255, 255, 0.012);

  @include below-desktop { padding: 0 14px; }
  @include mobile { padding: 0 10px; }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
