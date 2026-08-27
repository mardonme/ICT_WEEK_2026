<script setup>
import LogoCard from './ui/LogoCard.vue'

const files = import.meta.glob('@/assets/logos/partners/*.{svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const url = (name) =>
  files[Object.keys(files).find((k) => k.endsWith(`/${name}`))]

const ROWS = [
  [
    { file: 'aws.svg', alt: 'Amazon Web Services', width: 124 },
    { file: 'startupblink.svg', alt: 'StartupBlink', width: 196 },
    { file: 'startup-world-cup.webp', alt: 'Startup World Cup', width: 76 },
    { file: 'difc-innovation-hub.webp', alt: 'DIFC Innovation Hub', width: 204 },
  ],
  [
    { file: 'pegasus-tech-ventures.webp', alt: 'Pegasus Tech Ventures', width: 304 },
    { file: 'jetro.webp', alt: 'JETRO', width: 224 },
    { file: 'ignyte.svg', alt: 'Ignyte', width: 304 },
  ],
]
</script>

<template>
  <section id="partners" class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title" class="partners__title">Our Partners</h2>

    <div class="partners__grid">
      <ul v-for="(row, i) in ROWS" :key="i" class="partners__row">
        <LogoCard
          v-for="logo in row"
          :key="logo.file"
          :src="url(logo.file)"
          :alt="logo.alt"
          :width="logo.width"
        />
      </ul>
    </div>
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

  @include below-desktop { gap: 24px; padding: 24px; }
  @include mobile { gap: 24px; padding: 24px 16px; border-radius: $r-lg; }
}

.partners__title {
  color: $c-heading;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;
  text-align: center;

  @include tablet { font-size: 36px; line-height: 43.2px; }
  @include mobile { font-size: 24px; line-height: 32.78px; color: $c-white; }
}

.partners__grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  @include below-desktop { gap: 12px; }
}

.partners__row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  height: 140px;

  &:last-child { grid-template-columns: repeat(3, 1fr); }

  @include below-desktop { gap: 12px; height: 120px; }
  @include mobile {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
    grid-auto-rows: 72px;

    &:last-child { grid-template-columns: repeat(2, 1fr); }
  }
}
</style>
