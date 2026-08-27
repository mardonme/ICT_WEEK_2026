<script setup>
import BaseIcon from '../ui/BaseIcon.vue'
import qrCode from '@/assets/logos/misc/startupbase-qr.svg'
import startupBaseLogo from '@/assets/logos/misc/startup-base.svg'

const FEATURES = [
  { metric: '100%', text: 'Reimbursement for patenting and trademark registration' },
  { icon: 'shield-check', text: 'Special legal regime "Regulatory Sandbox" for rapid piloting' },
  { metric: '$50K', text: 'Reimbursement for mentor/trainer costs in acceleration programs' },
  { metric: '1+1', text: 'Co-funding mechanism matching foreign investment dollar-for-dollar' },
  { metric: '$20K', text: 'Reimbursement of international acceleration program costs' },
  { metric: '1 YEAR', text: 'Free access to the massive Digital Data Platform for Startups' },
  { metric: '1 YEAR', text: 'Free dedicated legal and financial consultations with top experts' },
  { metric: '$10K', text: 'Awarding grants directly to winners of national hackathons and ideathons' },
]
</script>

<template>
  <div class="sl-startups">
    <ul class="sl-startups__grid">
      <li v-for="item in FEATURES" :key="item.text" class="sl-startups__feature">
        <span class="sl-startups__metric">
          <BaseIcon v-if="item.icon" :name="item.icon" :size="40" />
          <template v-else>{{ item.metric }}</template>
        </span>
        <span class="sl-startups__text">{{ item.text }}</span>
      </li>
    </ul>

    <div class="sl-startups__footer">
      <p class="sl-startups__summary">
        Digital Startups Program &ndash; a <strong>$50 million</strong> initiative, launched for
        promising Uzbek tech startups. Funding, mentorship, intellectual property protection and
        access to the global market &ndash; all available on one platform &ndash;
        <strong>startupbase.uz</strong>
      </p>

      <a class="sl-startups__qr" href="https://startupbase.uz" rel="noopener">
        <img
          class="sl-startups__qr-brand"
          :src="startupBaseLogo"
          alt="Startup Base"
          width="154"
          height="36"
          loading="lazy"
          decoding="async"
        />
        <img
          class="sl-startups__qr-code"
          :src="qrCode"
          alt="QR code to startupbase.uz"
          width="88"
          height="88"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sl-startups {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @include below-desktop { gap: 20px; }
}

.sl-startups__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @include mobile { grid-template-columns: 1fr; }
}

.sl-startups__feature {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 76px;
  padding: 14px 24px;
  border-radius: $r-lg;
  background: rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover { background: rgba(255, 255, 255, 0.09); transform: translateX(4px); }

  @include tablet { gap: 12px; padding: 12px 16px; }
  @include mobile { gap: 12px; min-height: 64px; padding: 8px 12px; border-radius: $r-md; }
}

.sl-startups__metric {
  display: grid;
  flex: none;
  place-items: center;
  width: 100px;
  color: $c-accent;
  font-size: 32px;
  font-weight: 800;
  line-height: 43.71px;
  white-space: nowrap;

  @include tablet { width: 68px; font-size: 22px; line-height: 30px; }
  @include mobile { width: 60px; font-size: 20px; line-height: 27px; }
}

.sl-startups__text {
  color: $c-body-strong;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  @include tablet { font-size: 13px; line-height: 18px; }
  @include mobile { font-size: 12px; line-height: 18px; }
}

.sl-startups__footer {
  display: flex;
  gap: 12px;

  @include below-desktop { flex-direction: column; }
}

.sl-startups__summary {
  @include panel-green;
  flex: 1;
  padding: 16px 24px;
  color: $c-white;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;

  strong { font-weight: 700; }

  @include below-desktop { padding: 14px 16px; font-size: 14px; line-height: 21px; }
}

.sl-startups__qr {
  @include panel-green;
  display: flex;
  flex: 0 0 285px;
  align-items: center;
  gap: 15px;
  padding: 14px;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;

  &:hover { transform: translateY(-3px); filter: brightness(1.1); }

  @include below-desktop { flex: none; }
}

.sl-startups__qr-brand {
  flex: 1;
  width: 154px;
  height: auto;
  object-fit: contain;

  @include below-desktop { width: 110px; }
}

.sl-startups__qr-code {
  flex: none;
  width: 88px;
  height: 88px;
  object-fit: contain;

  @include below-desktop { width: 64px; height: 64px; }
}
</style>
