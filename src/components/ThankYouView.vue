<script setup>
import { onMounted, onUnmounted } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import { navigate } from '@/composables/useRoute'
import successIcon from '@/assets/images/registration-success.webp'

const HOME_TITLE = document.title

onMounted(() => {
  document.title = 'Registration submitted — ICT WEEK 2026'
})
onUnmounted(() => {
  document.title = HOME_TITLE
})
</script>

<template>
  <main id="main" class="thanks">
    <img
      class="thanks__icon"
      :src="successIcon"
      alt=""
      width="100"
      height="100"
      fetchpriority="high"
    />

    <div class="thanks__text">
      <h1 class="thanks__title">Registration Submitted &mdash; Welcome to ICTWEEK 2026!</h1>
      <p class="thanks__subtitle">
        Thank you for registering. A confirmation email is on its way, and a member of the IT Park
        Uzbekistan team will contact you shortly with your official delegate pass and next steps.
      </p>
    </div>

    <a class="thanks__cta" href="/" @click.prevent="navigate('/')">
      <BaseIcon name="home" :size="20" />
      Back to homepage
    </a>
  </main>
</template>

<style lang="scss" scoped>
.thanks {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  min-height: 100dvh;
  padding: 40px $pad-desktop;
  text-align: center;
  animation: thanks-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;

  @include tablet { gap: 36px; padding: 40px $pad-tablet; }
  @include mobile { gap: 36px; padding: 40px $pad-mobile; }
}

@keyframes thanks-in {
  from { opacity: 0; transform: translateY(20px); }
}

/* Ikonka atrofidagi mayin doira — Figmada r:120, deyarli shaffof fon */
.thanks__icon {
  width: 100px;
  height: 100px;
  padding: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 0 60px rgba(132, 255, 193, 0.12);
  box-sizing: content-box;
  object-fit: contain;

  @include mobile { width: 80px; height: 80px; padding: 26px; }
}

.thanks__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @include mobile { gap: 16px; }
}

.thanks__title {
  max-width: 944px;
  color: $c-white;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -1.92px;
  text-wrap: balance;

  @include tablet {
    max-width: 720px;
    font-size: 36px;
    line-height: 50.4px;
    letter-spacing: -0.72px;
  }

  @include mobile {
    font-size: 24px;
    line-height: 33.6px;
    letter-spacing: -0.36px;
  }
}

.thanks__subtitle {
  max-width: 846px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;

  @include tablet { max-width: 618px; font-size: 18px; line-height: 25.2px; }
  @include mobile { font-size: 14px; line-height: 21px; }
}

.thanks__cta {
  @include btn-outline;
  gap: 8px;
  height: 52px;
  padding: 0 20px;
  font-size: 16px;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease;

  &:hover { transform: translateY(-2px); }

  @include mobile { height: 46px; padding: 0 16px; font-size: 14px; }
}
</style>
