<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SaveSpotSection from './components/SaveSpotSection.vue'
import PastAttendeesSection from './components/PastAttendeesSection.vue'
import SummitSection from './components/SummitSection.vue'
import StartupsSection from './components/StartupsSection.vue'
import PartnersSection from './components/PartnersSection.vue'
import RegisterSection from './components/RegisterSection.vue'
import ThankYouView from './components/ThankYouView.vue'
import { useRoute } from '@/composables/useRoute'

const { path } = useRoute()
</script>

<template>
  <a class="skip-link" href="#main">Skip to main content</a>

  <div id="top" class="page" :class="{ 'page--compact': path === '/thank-you' }">
    <div class="page__decor" aria-hidden="true">
      <span class="page__aurora"></span>
    </div>

    <ThankYouView v-if="path === '/thank-you'" />

    <template v-else>
      <AppHeader />

      <main id="main" class="page__main">
        <HeroSection />
        <SaveSpotSection v-reveal />
        <PastAttendeesSection v-reveal />
        <SummitSection v-reveal />
        <StartupsSection v-reveal />
        <PartnersSection v-reveal />
        <RegisterSection v-reveal />
      </main>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  min-height: 100dvh;
  background: #010609;
}

/* ---------- Fon dekoratsiyasi ----------
   Figma renderidan o'lchangan piksel qiymatlariga moslangan:
   sahifaning chap va o'ng chekkalarida mayin teal nur, ustida
   ikkilik raqamlardan iborat "Northern Lights" teksturasi. */
/* Dekoratsiya shu yerda kesiladi. `overflow` ni .page ga qo'yish mumkin emas —
   u sahifani scroll konteyneriga aylantiradi va anchorga o'tishda kontentni
   ichkaridan surib yuboradi. */
.page__decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(900px 800px at -110px 1300px, rgba(20, 72, 68, 0.75), transparent 72%),
    radial-gradient(900px 800px at calc(100% + 110px) 1350px, rgba(18, 68, 66, 0.72), transparent 72%),
    radial-gradient(820px 700px at -90px 3980px, rgba(18, 64, 56, 0.68), transparent 72%),
    radial-gradient(820px 700px at calc(100% + 90px) 4000px, rgba(18, 62, 56, 0.68), transparent 72%),
    radial-gradient(900px 520px at -80px 5860px, rgba(20, 72, 70, 0.8), transparent 72%),
    radial-gradient(900px 520px at calc(100% + 80px) 5860px, rgba(20, 72, 70, 0.8), transparent 72%);
}

.page__aurora {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/images/aurora.webp');
  background-repeat: repeat;
  /* Figmada rasm 2420 px kenglikda ko'rsatiladi (1440 frame'ning 168% i) —
     shu nisbatda raqamlar o'z o'lchamida qoladi va xiralashmaydi. */
  background-size: 168% auto;
  background-position: 5% top;
  opacity: 0.28;
  /* Tekstura chapda kuchli, o'ngga qarab so'nadi */
  mask-image: linear-gradient(
    to right,
    #000 0%,
    rgba(0, 0, 0, 0.78) 40%,
    rgba(0, 0, 0, 0.5) 68%,
    rgba(0, 0, 0, 0.18) 88%,
    transparent 100%
  );

  /* Mobilda viewport ancha tor — kichikroq tekstura yetarli (101 KB -> 17 KB) */
  @include mobile {
    background-image: url('@/assets/images/aurora-sm.webp');
  }
}

/* Thank page bitta ekran balandligida — dekoratsiya ham unga moslanadi */
.page--compact .page__decor {
  background:
    radial-gradient(760px 620px at -120px 45%, rgba(20, 72, 68, 0.7), transparent 72%),
    radial-gradient(760px 620px at calc(100% + 120px) 55%, rgba(18, 68, 66, 0.65), transparent 72%);
}

/* ---------- Kontent ---------- */
.page__main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: $section-gap-desktop;
  width: 100%;
  max-width: $container-desktop + $pad-desktop * 2;
  margin-inline: auto;
  margin-top: 74px;
  padding-inline: $pad-desktop;
  padding-bottom: 58px;

  @include below-desktop {
    max-width: $container-tablet + $pad-tablet * 2;
    gap: $section-gap-tablet;
    margin-top: 56px;
    padding-inline: $pad-tablet;
  }

  @include mobile {
    max-width: none;
    gap: 24px;
    margin-top: 24px;
    padding-inline: $pad-mobile;
    padding-bottom: 32px;
  }

  /* Sticky panel bo'lim tepasini to'smasligi uchun */
  > [id] {
    scroll-margin-top: 132px;

    @include tablet { scroll-margin-top: 108px; }
    @include mobile { scroll-margin-top: 76px; }
  }
}
</style>
