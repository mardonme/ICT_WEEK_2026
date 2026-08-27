<script setup>
import { ref } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import logoUrl from '@/assets/logos/misc/ict-week-logo.svg'

const NAV_LINKS = [
  { label: 'Home', href: '#top', current: true },
  { label: 'Program', href: '#program' },
  { label: 'Partners', href: '#partners' },
  { label: 'Incentives', href: '#incentives' },
]

const menuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="header__bar">
      <a class="header__logo" href="#top" aria-label="ICT WEEK 2026 — bosh sahifa">
        <img :src="logoUrl" alt="" width="67" height="42" />
      </a>

      <nav class="header__nav" aria-label="Asosiy menyu">
        <ul class="header__list">
          <li v-for="link in NAV_LINKS" :key="link.label">
            <a
              class="header__link"
              :class="{ 'header__link--current': link.current }"
              :href="link.href"
              :aria-current="link.current ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <button class="header__lang" type="button">
          English
          <BaseIcon name="chevron-down" :size="16" />
        </button>

        <a class="header__cta" href="#register">
          <span class="header__cta-full">Register now</span>
          <span class="header__cta-short">Register</span>
        </a>

        <button
          class="header__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="visually-hidden">{{ menuOpen ? 'Menyuni yopish' : 'Menyuni ochish' }}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path
              :d="menuOpen ? 'M5 5l10 10M15 5L5 15' : 'M3.33 5.83h13.34M3.33 10h13.34M3.33 14.17h13.34'"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="menuOpen" id="mobile-menu" class="header__mobile" aria-label="Mobil menyu">
      <ul>
        <li v-for="link in NAV_LINKS" :key="link.label">
          <a :href="link.href" @click="menuOpen = false">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 20;
  padding-top: 37px;

  @include tablet { padding-top: 32px; }
  @include mobile { padding-top: 0; }
}

/* --- Pill --- */
.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1040px, calc(100% - #{$pad-desktop * 2}));
  margin-inline: auto;
  padding: 14px 14px 14px 32px;
  border-radius: $r-pill;
  background: $c-surface;

  @include tablet {
    gap: 16px;
    width: calc(100% - #{$pad-tablet * 2});
    padding: 12px 12px 12px 24px;
  }

  @include mobile {
    gap: 12px;
    width: 100%;
    padding: 12px 18px;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: $c-card;
  }
}

.header__logo img {
  width: 67px;
  height: 42px;

  @include below-desktop { width: 57px; height: 36px; }
}

/* --- Havolalar --- */
.header__nav {
  @include mobile { display: none; }
}

.header__list {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-inline: 6px;

  @include tablet { gap: 16px; padding-inline: 0; }
}

.header__link {
  display: block;
  color: $c-muted;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.2s ease;

  &:hover { color: $c-white; }

  @include tablet { font-size: 12px; }
}

.header__link--current {
  padding: 16px 24px;
  border-radius: $r-pill;
  background: $c-navy-deep;
  backdrop-filter: blur(22.6px);
  color: $c-white;
  font-weight: 600;
  line-height: 20px;

  @include tablet {
    padding: 10px 12px;
    line-height: 16px;
  }
}

/* --- O'ng tomon --- */
.header__actions {
  display: flex;
  align-items: center;
  gap: 12px;

  @include tablet { gap: 8px; }
}

.header__lang {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 52px;
  padding: 0 20px 0 24px;
  border-radius: $r-pill;
  background: $c-surface-dim;
  color: $c-muted;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover { color: $c-white; }

  svg { color: $c-muted-alt; }

  @include tablet {
    height: 36px;
    padding: 0 10px 0 12px;
    font-size: 12px;

    svg { width: 14px; height: 14px; }
  }

  @include mobile { display: none; }
}

.header__cta {
  display: grid;
  place-items: center;
  height: 52px;
  padding: 0 24px;
  border-radius: $r-pill;
  background: $grad-accent;
  color: $c-navy;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  transition: filter 0.2s ease;

  &:hover { filter: brightness(1.08); }

  @include tablet { height: 36px; padding: 0 12px; font-size: 12px; }
  @include mobile { height: 38px; padding: 0 16px; font-size: 13px; font-weight: 700; }
}

.header__cta-short { display: none; }

@include mobile {
  .header__cta-full { display: none; }
  .header__cta-short { display: block; }
}

/* --- Hamburger --- */
.header__burger {
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);

  @include mobile { display: grid; }
}

/* --- Mobil menyu --- */
.header__mobile {
  display: none;

  @include mobile {
    display: block;
    padding: 8px $pad-mobile 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: $c-navy;

    a {
      display: block;
      padding: 12px 4px;
      color: $c-body;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
