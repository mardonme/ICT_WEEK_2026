<script setup>
import LogoCard from './ui/LogoCard.vue'

const files = import.meta.glob('@/assets/logos/partners/*.{svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const url = (name) => files[Object.keys(files).find((k) => k.endsWith(`/${name}`))]

const LOGOS = [
  { file: 'aws.svg', alt: 'Amazon Web Services', width: 124, height: 81 },
  { file: 'startupblink.svg', alt: 'StartupBlink', width: 196, height: 34 },
  { file: 'startup-world-cup.webp', alt: 'Startup World Cup', width: 76, height: 93 },
  { file: 'difc-innovation-hub.webp', alt: 'DIFC Innovation Hub', width: 197, height: 55 },
  { file: 'pegasus-tech-ventures.webp', alt: 'Pegasus Tech Ventures', width: 304, height: 96 },
  { file: 'jetro.webp', alt: 'JETRO', width: 224, height: 77 },
  { file: 'ignyte.svg', alt: 'Ignyte', width: 304, height: 40 },
]
</script>

<template>
  <section id="partners" class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title" class="partners__title">Our Partners</h2>

    <ul class="partners__grid">
      <LogoCard
        v-for="(logo, i) in LOGOS"
        :key="logo.file"
        :style="{ '--i': i }"
        :src="url(logo.file)"
        :alt="logo.alt"
        :width="logo.width"
        :height="logo.height"
      />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.partners {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  padding: 36px 56px 56px;
  border-radius: $r-xl;
  background: $c-card;

  @include tablet { gap: 24px; padding: 24px; }
  @include mobile { gap: 24px; padding: 24px 16px; border-radius: $r-lg; }
}

.partners__title {
  color: $c-heading;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;
  text-align: center;

  @include tablet { font-size: 36px; line-height: 43.2px; }
  @include mobile { color: $c-white; font-size: 24px; line-height: 32.78px; }
}

@keyframes logo-in {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
}

.partners.is-revealed :deep(.logo-card) {
  animation: logo-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 45ms + 120ms);
}

/* Figmadagi joylashuv: desktop/planshetda 4 + 3, mobilda 3 + 2 + 2.
   12 ustunli setka har uchala holatni ham aniq px'da beradi. */
.partners__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
  width: 100%;
  grid-auto-rows: 140px;

  > :nth-child(-n + 4) { grid-column: span 3; }
  > :nth-child(n + 5) { grid-column: span 4; }

  @include tablet { gap: 12px; grid-auto-rows: 120px; }

  @include mobile {
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    grid-auto-rows: 56px;

    > :nth-child(-n + 3) { grid-column: span 2; }
    > :nth-child(n + 4) { grid-column: span 3; }
  }
}
</style>
