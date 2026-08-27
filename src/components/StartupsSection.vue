<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import SlideStartups from './slides/SlideStartups.vue'

// Faqat birinchi slayd darhol yuklanadi; qolganlari o'q bosilganda
// alohida chunk sifatida keladi — dastlabki JS hajmi oshmaydi.
const SlideIndicators = defineAsyncComponent(() => import('./slides/SlideIndicators.vue'))
const SlideEnterprise = defineAsyncComponent(() => import('./slides/SlideEnterprise.vue'))
const SlideExport = defineAsyncComponent(() => import('./slides/SlideExport.vue'))
import bg from '@/assets/images/startups-bg.webp'
import ministryLogo from '@/assets/logos/misc/ministry-itpark.svg'

/** Figmadagi karusel slaydlari */
const SLIDES = [
  { title: 'Digital Startups Program', component: SlideStartups },
  { title: 'Key indicators of IT Park members', component: SlideIndicators },
  { title: 'Enterprise Uzbekistan', component: SlideEnterprise },
  { title: 'Digital service and products export development', component: SlideExport },
]

const index = ref(0)
const direction = ref(1)
const slide = computed(() => SLIDES[index.value])

const go = (step) => {
  direction.value = step
  index.value = (index.value + step + SLIDES.length) % SLIDES.length
}

const onKey = (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
}
</script>

<template>
  <section
    id="incentives"
    class="startups"
    aria-roledescription="carousel"
    aria-label="IT Park programs"
    @keydown="onKey"
  >
    <div class="startups__card">
      <img class="startups__bg" :src="bg" alt="" width="1208" height="624" loading="lazy" decoding="async" />

      <div class="startups__bar">
        <span class="startups__bar-mark" aria-hidden="true"></span>
        <h2 class="startups__bar-title">{{ slide.title }}</h2>
        <img
          class="startups__bar-logos"
          :src="ministryLogo"
          alt="Ministry of Digital Technologies of the Republic of Uzbekistan and IT Park Uzbekistan"
          width="234"
          height="31"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        class="startups__body"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} / ${SLIDES.length}: ${slide.title}`"
      >
        <Transition :name="direction > 0 ? 'slide-next' : 'slide-prev'" mode="out-in">
          <component :is="slide.component" :key="index" />
        </Transition>
      </div>
    </div>

    <div class="startups__nav">
      <button class="startups__arrow" type="button" aria-label="Previous program" @click="go(-1)">
        <BaseIcon name="arrow-left" :size="32" />
      </button>

      <p class="startups__nav-title">{{ slide.title }}</p>

      <button
        class="startups__arrow startups__arrow--next"
        type="button"
        aria-label="Next program"
        @click="go(1)"
      >
        <BaseIcon name="arrow-left" :size="32" />
      </button>
    </div>

    <ol class="startups__dots">
      <li v-for="(s, i) in SLIDES" :key="s.title">
        <button
          type="button"
          :class="{ 'is-active': i === index }"
          :aria-label="s.title"
          :aria-current="i === index"
          @click="direction = i > index ? 1 : -1; index = i"
        />
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
.startups {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 36px;
  border-radius: $r-xl;
  background: $c-card;

  @include tablet { gap: 20px; padding: 20px; }
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

/* --- Yashil sarlavha paneli --- */
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
  flex: none;
  width: 2px;
  height: 21.7px;
  border-radius: 6px;
  background: $c-navy;
}

.startups__bar-title {
  color: $c-navy;
  font-size: 24px;
  font-weight: 700;
  line-height: 32.78px;
  text-transform: uppercase;

  @include tablet { font-size: 15px; line-height: 20px; }
  @include mobile { font-size: 12px; line-height: 16px; }
}

.startups__bar-logos {
  flex: none;
  width: 234px;
  height: auto;
  margin-left: auto;
  object-fit: contain;

  @include tablet { width: 160px; }
  @include mobile { width: 96px; }
}

.startups__body {
  position: relative;
  z-index: 1;
  padding: 24px;

  @include below-desktop { padding: 16px; }
  @include mobile { padding: 12px; }
}

/* --- Slayd almashinuvi --- */
.slide-next-enter-active,
.slide-prev-enter-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.slide-next-leave-active,
.slide-prev-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }

.slide-next-enter-from { opacity: 0; transform: translateX(40px); }
.slide-next-leave-to { opacity: 0; transform: translateX(-30px); }
.slide-prev-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-prev-leave-to { opacity: 0; transform: translateX(30px); }

/* --- Boshqaruv --- */
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
  transition: background-color 0.25s ease, color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);

  &:hover { background: rgba(255, 255, 255, 0.1); color: $c-white; transform: scale(1.08); }
  &:active { transform: scale(0.94); }

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
  box-shadow: 0 8px 24px rgba(132, 255, 193, 0.25);

  svg { transform: rotate(180deg); }

  &:hover { background: $c-accent; color: $c-navy; filter: brightness(1.08); }
}

.startups__nav-title {
  flex: 1;
  color: $c-white;
  font-size: 23.3px;
  font-weight: 700;
  line-height: 31.83px;
  text-align: center;
  text-transform: uppercase;

  @include tablet { font-size: 15px; line-height: 20px; }
  @include mobile { font-size: 11px; line-height: 15px; }
}

/* --- Nuqtalar --- */
.startups__dots {
  display: flex;
  gap: 8px;

  button {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transition: background-color 0.25s ease, width 0.25s ease;

    &:hover { background: rgba(255, 255, 255, 0.5); }

    &.is-active { width: 24px; border-radius: 4px; background: $c-accent; }
  }
}
</style>
