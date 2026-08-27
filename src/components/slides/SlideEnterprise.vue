<script setup>
const icons = import.meta.glob('@/assets/slides/icons/ent-*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})
const icon = (name) => icons[Object.keys(icons).find((k) => k.endsWith(`/${name}.svg`))]

const CARDS = [
  { icon: 'ent-sandbox', title: 'Regulatory Sandbox', text: 'Legally protected testing environment for new business models and frontier technologies.' },
  { icon: 'ent-currency', title: 'Foreign exchange freedom', text: 'Foreign currency operations, payroll, and capital flows without conversion mandates.' },
  { icon: 'ent-tax', title: 'Tax & customs', text: 'Corporate tax exemption for export-led companies; customs-duty exemption on equipment imports.' },
  { icon: 'ent-labour', title: 'Labour relations', text: 'International-grade employment structures aligned with global labour standards.' },
  { icon: 'ent-data', title: 'Personal data', text: 'Internationally aligned data protection rules with full support for cross-border processing.' },
  { icon: 'ent-gov', title: 'Government services', text: 'Full government services for foreign residents — including remote registration and licensing.' },
  { icon: 'ent-ip', title: 'Intellectual property', text: 'Enhanced IP protections with specific provisions for AI-generated outputs and software assets.' },
  { icon: 'ent-investment', title: 'Investment attraction', text: 'Investment instruments purpose-built for venture financing — SAFEs, convertibles, hybrid structures.' },
  { icon: 'ent-export', title: 'Export promotion', text: 'Favourable operating conditions for export-driven companies with zero-friction outbound trade.' },
]
</script>

<template>
  <ul class="sl-ent">
    <li v-for="(card, i) in CARDS" :key="card.title" class="sl-ent__card" :style="{ '--i': i }">
      <div class="sl-ent__head">
        <h3 class="sl-ent__title">{{ card.title }}</h3>
        <img :src="icon(card.icon)" alt="" width="64" height="64" loading="lazy" decoding="async" />
      </div>
      <p class="sl-ent__text">{{ card.text }}</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sl-ent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @include tablet { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  @include mobile { grid-template-columns: 1fr; gap: 10px; }
}

.sl-ent__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  min-height: 159px;
  padding: 16px;
  border-radius: $r-lg;
  background: linear-gradient(135deg, rgba(132, 255, 193, 0) 0%, rgba(132, 255, 193, 0.4) 100%);
  animation: ent-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i) * 45ms + 80ms);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;

  &:hover { transform: translateY(-4px); filter: brightness(1.12); }

  @include below-desktop { min-height: 0; padding: 12px; }
}

@keyframes ent-in {
  from { opacity: 0; transform: translateY(16px); }
}

.sl-ent__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  img {
    flex: none;
    width: 64px;
    height: 64px;

    @include below-desktop { width: 44px; height: 44px; }
    @include mobile { width: 40px; height: 40px; }
  }
}

.sl-ent__title {
  max-width: 215px;
  color: $c-white;
  font-size: 26px;
  font-weight: 700;
  line-height: 31.2px;

  @include tablet { font-size: 19px; line-height: 23px; }
  @include mobile { font-size: 18px; line-height: 22px; }
}

.sl-ent__text {
  color: $c-white;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;

  @include below-desktop { font-size: 12px; line-height: 16px; }
}
</style>
