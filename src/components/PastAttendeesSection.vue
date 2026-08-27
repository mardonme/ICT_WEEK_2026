<script setup>
import LogoCard from './ui/LogoCard.vue'

const files = import.meta.glob('@/assets/logos/attendees/*.{svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const url = (name) =>
  files[Object.keys(files).find((k) => k.endsWith(`/${name}`))]

// Figmadagi tartib: 5 + 5 + 5 + 4
const ROWS = [
  [
    { file: 'web-summit.svg', alt: 'Web Summit', width: 136, height: 68 },
    { file: 'plug-and-play.svg', alt: 'Plug and Play', width: 144, height: 28 },
    { file: 'mit.svg', alt: 'Massachusetts Institute of Technology', width: 152, height: 36 },
    { file: 'google-for-startups.svg', alt: 'Google for Startups', width: 136, height: 20 },
    { file: 'aws.svg', alt: 'Amazon Web Services', width: 96, height: 62 },
  ],
  [
    { file: 'alchemist.webp', alt: 'Alchemist Accelerator', width: 168, height: 28 },
    { file: 'dealroom.svg', alt: 'Dealroom.co', width: 152, height: 37 },
    { file: 'startupblink.svg', alt: 'StartupBlink', width: 160, height: 27 },
    { file: 'domino-ventures.svg', alt: 'Domino Ventures', width: 144, height: 39 },
    { file: 'startup-genome.svg', alt: 'Startup Genome', width: 152, height: 41 },
  ],
  [
    { file: 'accesa.svg', alt: 'Accesa', width: 144, height: 49 },
    { file: 'sturgeon-capital.svg', alt: 'Sturgeon Capital', width: 144, height: 52 },
    { file: 'salesforce-org.svg', alt: 'Salesforce.org', width: 144, height: 67 },
    { file: 'ey.svg', alt: 'EY', width: 80, height: 80 },
    { file: 'global-startup-awards.svg', alt: 'Global Startup Awards', width: 124, height: 64 },
  ],
  [
    { file: 'gbtp.svg', alt: 'GBTP — Gyeongbuk Technopark', width: 188, height: 58 },
    { file: 'polyvalent.svg', alt: 'Polyvalent', width: 196, height: 22 },
    { file: 'golden-gate-ventures.svg', alt: 'Golden Gate Ventures', width: 188, height: 74 },
    { file: 'sps-commerce.svg', alt: 'SPS Commerce', width: 196, height: 54 },
  ],
]
</script>

<template>
  <section class="attendees" aria-labelledby="attendees-title">
    <h2 id="attendees-title" class="attendees__title">Past Attendees Include</h2>

    <div class="attendees__grid">
      <ul v-for="(row, r) in ROWS" :key="r" class="attendees__row">
        <LogoCard
          v-for="(logo, i) in row"
          :key="logo.file"
          :src="url(logo.file)"
          :alt="logo.alt"
          :width="logo.width"
          :height="logo.height"
          :style="{ '--i': r * 5 + i }"
        />
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.attendees {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  padding: 36px 56px 56px;
  border-radius: $r-xl;
  background: $c-card;

  @include below-desktop { gap: 24px; padding: 20px; }
  @include mobile { gap: 24px; padding: 24px 16px; border-radius: $r-lg; }
}

.attendees__title {
  color: $c-heading;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;
  text-align: center;

  @include tablet { font-size: 36px; line-height: 43.2px; }
  @include mobile { font-size: 24px; line-height: 32.78px; color: $c-white; }
}

/* Bo'lim ekranga kirganda logolar to'lqin bo'lib chiqadi */
@keyframes logo-in {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
}

.attendees.is-revealed :deep(.logo-card) {
  animation: logo-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 28ms + 120ms);
}

.attendees__grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;

  @include below-desktop { gap: 12px; }
  @include mobile { gap: 8px; }
}

.attendees__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  height: 120px;

  &:last-child { grid-template-columns: repeat(4, 1fr); }

  @include tablet { gap: 12px; height: 100px; }

  @include mobile {
    display: contents;
  }
}

/* Mobilda barcha logolar bitta 3 ustunli setkaga tushadi */
@include mobile {
  .attendees__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 56px;
  }
}
</style>
