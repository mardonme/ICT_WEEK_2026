<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SaveSpotSection from './components/SaveSpotSection.vue'
import PastAttendeesSection from './components/PastAttendeesSection.vue'
import SummitSection from './components/SummitSection.vue'
import StartupsSection from './components/StartupsSection.vue'
import PartnersSection from './components/PartnersSection.vue'
import RegisterSection from './components/RegisterSection.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to main content</a>

  <div id="top" class="page">
    <div class="page__decor" aria-hidden="true">
      <span class="page__aurora page__aurora--1"></span>
      <span class="page__aurora page__aurora--2"></span>
      <span class="page__aurora page__aurora--3"></span>
    </div>

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
  </div>
</template>

<style lang="scss" scoped>
.page {
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  background: #010609;
}

/* ---------- Fon dekoratsiyasi ----------
   Figma renderidan o'lchangan piksel qiymatlariga moslangan:
   sahifaning chap va o'ng chekkalarida mayin teal nur, ustida
   ikkilik raqamlardan iborat "Northern Lights" teksturasi. */
.page__decor {
  position: absolute;
  inset: 0;
  z-index: 0;
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
  left: 0;
  width: 100%;
  background-image: url('@/assets/images/aurora.webp');
  background-repeat: no-repeat;
  background-size: 210% 100%;
  background-position: center;
  opacity: 0.2;
  mask-image:
    linear-gradient(
      to right,
      #000 0%,
      rgba(0, 0, 0, 0.3) 16%,
      transparent 32%,
      transparent 68%,
      rgba(0, 0, 0, 0.3) 84%,
      #000 100%
    ),
    linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}

.page__aurora--1 { top: 500px; height: 1400px; }
.page__aurora--2 { top: 3250px; height: 1350px; transform: scaleX(-1); }
.page__aurora--3 { top: 5400px; height: 950px; }

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
}
</style>
