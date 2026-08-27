<script setup>
import BaseIcon from './ui/BaseIcon.vue'
import bg from '@/assets/images/startups-bg.webp'
import ministryLogo from '@/assets/logos/misc/ministry-itpark.webp'
import qrCode from '@/assets/logos/misc/startupbase-qr.webp'
import startupBaseIcon from '@/assets/logos/misc/startup-base-icon.webp'

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
  <section id="incentives" class="startups" aria-labelledby="startups-title">
    <div class="startups__card">
      <img class="startups__bg" :src="bg" alt="" width="1208" height="624" loading="lazy" decoding="async" />

      <div class="startups__bar">
        <span class="startups__bar-mark" aria-hidden="true"></span>
        <h2 id="startups-title" class="startups__bar-title">Digital Startups Program</h2>
        <img
          class="startups__bar-logos"
          :src="ministryLogo"
          alt="Ministry of Digital Technologies of the Republic of Uzbekistan · IT Park Uzbekistan"
          width="234"
          height="31"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="startups__body">
        <ul class="startups__grid">
          <li v-for="item in FEATURES" :key="item.text" class="startups__feature">
            <span class="startups__metric">
              <BaseIcon v-if="item.icon" :name="item.icon" :size="40" />
              <template v-else>{{ item.metric }}</template>
            </span>
            <span class="startups__feature-text">{{ item.text }}</span>
          </li>
        </ul>

        <div class="startups__footer">
          <p class="startups__summary">
            Digital Startups Program &ndash; a <strong>$50 million</strong> initiative, launched for
            promising Uzbek tech startups. Funding, mentorship, intellectual property protection and
            access to the global market &ndash; all available on one platform &ndash;
            <strong>startupbase.uz</strong>
          </p>

          <a class="startups__qr" href="https://startupbase.uz" rel="noopener">
            <span class="startups__qr-brand">
              <img
                class="startups__qr-icon"
                :src="startupBaseIcon"
                alt=""
                width="49"
                height="36"
                loading="lazy"
                decoding="async"
              />
              <span class="startups__qr-label">Startup Base</span>
            </span>
            <img
              class="startups__qr-code"
              :src="qrCode"
              alt="startupbase.uz saytiga QR kod"
              width="88"
              height="88"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="startups__nav">
      <button class="startups__arrow" type="button" aria-label="Previous program" aria-disabled="true">
        <BaseIcon name="arrow-left" :size="32" />
      </button>
      <p class="startups__nav-title">Digital Startups Program</p>
      <button
        class="startups__arrow startups__arrow--next"
        type="button"
        aria-label="Next program"
        aria-disabled="true"
      >
        <BaseIcon name="arrow-left" :size="32" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.startups {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 36px;
  border-radius: $r-xl;
  background: $c-card;

  @include below-desktop { gap: 24px; padding: 20px; }
  @include mobile { gap: 16px; padding: 12px 12px 16px; border-radius: $r-lg; }
}

.startups__card {
  position: relative;
  width: 100%;
  border-radius: $r-lg;
  background: radial-gradient(120% 120% at 50% 0%, #0c1e5b 0%, #010101 100%);
  overflow: hidden;
}

.startups__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.12;
}

/* ---------- Yashil sarlavha paneli ---------- */
.startups__bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 24px;
  background: linear-gradient(90deg, $c-accent 0%, rgba(132, 255, 193, 0) 100%);

  @include mobile { padding: 10px 16px; }
}

.startups__bar-mark {
  width: 2px;
  height: 21.7px;
  border-radius: 6px;
  background: $c-navy;
}

.startups__bar-logos {
  width: 234px;
  height: auto;
  margin-left: auto;
  object-fit: contain;

  @include tablet { width: 180px; }
  @include mobile { width: 120px; }
}

.startups__bar-title {
  color: $c-navy;
  font-size: 24px;
  font-weight: 700;
  line-height: 32.78px;
  text-transform: uppercase;

  @include below-desktop { font-size: 16px; line-height: 22px; }
  @include mobile { font-size: 14px; line-height: 20px; }
}

.startups__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;

  @include tablet { gap: 20px; padding: 16px; }
  @include mobile { gap: 20px; padding: 12px; }
}

/* ---------- Imtiyozlar setkasi ---------- */
.startups__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @include mobile { grid-template-columns: 1fr; }
}

.startups__feature {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 76px;
  padding: 14px 24px;
  border-radius: $r-lg;
  background: rgba(255, 255, 255, 0.05);

  @include tablet { gap: 12px; padding: 12px 16px; }
  @include mobile { gap: 12px; min-height: 64px; padding: 8px 12px; border-radius: $r-md; }
}

.startups__metric {
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

.startups__feature-text {
  color: $c-body-strong;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  @include tablet { font-size: 13px; line-height: 18px; }
  @include mobile { font-size: 12px; line-height: 18px; }
}

/* ---------- Pastki panel ---------- */
.startups__footer {
  display: flex;
  gap: 12px;

  @include below-desktop { flex-direction: column; }
}

.startups__summary {
  flex: 1;
  padding: 16px 24px;
  border-radius: 18px;
  background: linear-gradient(90deg, rgba(132, 255, 193, 0) 0%, rgba(132, 255, 193, 0.4) 100%);
  color: $c-white;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;

  strong { font-weight: 700; }

  @include below-desktop { padding: 14px 16px; font-size: 14px; line-height: 21px; }
}

.startups__qr {
  display: flex;
  flex: 0 0 285px;
  align-items: center;
  gap: 15px;
  padding: 14px;
  border-radius: 18px;
  background: linear-gradient(90deg, rgba(132, 255, 193, 0) 0%, rgba(132, 255, 193, 0.4) 100%);

  @include below-desktop { flex: none; }
}

/* Figma: ikonka 47.5 + oraliq 7 + yozuv 99.3 = 154 px */
.startups__qr-brand {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.startups__qr-label {
  color: $c-white;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;

  @include below-desktop { font-size: 13px; }
}

.startups__qr-icon {
  flex: none;
  width: 49px;
  height: 36px;
  object-fit: contain;

  @include below-desktop { width: 38px; height: 28px; }
}

.startups__qr-code {
  flex: none;
  width: 88px;
  height: 88px;
  object-fit: contain;

  @include below-desktop { width: 64px; height: 64px; }
}

/* ---------- Karusel boshqaruvi ---------- */
.startups__nav {
  display: flex;
  align-items: center;
  gap: 24px;

  @include mobile { gap: 12px; }
}

.startups__arrow {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(18, 27, 38, 0.2);
  color: rgba(255, 255, 255, 0.5);

  @include tablet { width: 48px; height: 48px; svg { width: 24px; height: 24px; } }
  @include mobile {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);

    svg { width: 16px; height: 16px; }
  }
}

.startups__arrow--next {
  background: $c-accent;
  color: $c-navy;

  svg { transform: rotate(180deg); }
}

.startups__nav-title {
  color: $c-white;
  font-size: 23.3px;
  font-weight: 700;
  line-height: 31.83px;
  text-align: center;
  text-transform: uppercase;

  @include tablet { font-size: 16px; line-height: 22px; }
  @include mobile { font-size: 12px; font-weight: 600; line-height: 16.39px; }
}
</style>
