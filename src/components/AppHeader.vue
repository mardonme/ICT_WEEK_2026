<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useStickyHeader } from '@/composables/useStickyHeader'
import logoUrl from '@/assets/logos/misc/ict-week-logo.svg'

const NAV_LINKS = [
  { key: 'home', label: 'Home', href: '#top', selector: '.hero' },
  { key: 'program', label: 'Program', href: '#program', selector: '#program' },
  { key: 'partners', label: 'Partners', href: '#partners', selector: '#partners' },
  {
    key: 'incentives',
    label: 'Incentives',
    // Figmada planshet versiyasida bu havola "Exhibition" deb nomlangan
    tabletLabel: 'Exhibition',
    href: '#incentives',
    selector: '#incentives',
  },
]

const menuOpen = ref(false)
const activeKey = useScrollSpy(NAV_LINKS.map(({ key, selector }) => ({ key, selector })))
const { stuck, hidden } = useStickyHeader()

// Menyu ochiq bo'lsa panel yashirinmaydi
const isHidden = computed(() => hidden.value && !menuOpen.value)

/* --- Faol havola ostidagi siljiydigan pill --- */
const listEl = ref(null)
const linkEls = ref([])
const pill = reactive({ left: 0, width: 0, ready: false })

const measurePill = () => {
  const i = NAV_LINKS.findIndex((l) => l.key === activeKey.value)
  const el = linkEls.value[i]
  if (!el || !listEl.value) return
  pill.left = el.offsetLeft
  pill.width = el.offsetWidth
  pill.ready = true
}

watch(activeKey, () => nextTick(measurePill))

onMounted(async () => {
  await document.fonts.ready
  measurePill()
  window.addEventListener('resize', measurePill)
})
onUnmounted(() => window.removeEventListener('resize', measurePill))
</script>

<template>
  <header class="header" :class="{ 'header--stuck': stuck, 'header--hidden': isHidden }">
    <div class="header__bar">
      <a class="header__logo" href="#top" aria-label="ICT WEEK 2026 — home">
        <img :src="logoUrl" alt="" width="67" height="42" />
      </a>

      <nav class="header__nav" aria-label="Main navigation">
        <ul ref="listEl" class="header__list">
          <span
            v-show="pill.ready"
            class="header__pill"
            :style="{ transform: `translateX(${pill.left}px)`, width: `${pill.width}px` }"
            aria-hidden="true"
          />

          <li v-for="(link, i) in NAV_LINKS" :key="link.key">
            <a
              :ref="(el) => (linkEls[i] = el)"
              class="header__link"
              :class="{ 'header__link--current': link.key === activeKey }"
              :href="link.href"
              :aria-current="link.key === activeKey ? 'true' : undefined"
            >
              <span v-if="link.tabletLabel" class="header__label-wide">{{ link.label }}</span>
              <span v-if="link.tabletLabel" class="header__label-tablet">{{ link.tabletLabel }}</span>
              <template v-else>{{ link.label }}</template>
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
          <span class="visually-hidden">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
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

    <Transition name="menu">
      <nav v-show="menuOpen" id="mobile-menu" class="header__mobile" aria-label="Mobile navigation">
        <ul>
          <li v-for="link in NAV_LINKS" :key="link.key">
            <a
              :href="link.href"
              :class="{ 'is-active': link.key === activeKey }"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  padding-top: 37px;
  /* Panelning o'zi joyida qoladi, faqat siljiydi — kontent sakramaydi */
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @include tablet { padding-top: 32px; }
  @include mobile { padding-top: 0; }
}

.header--hidden {
  transform: translateY(-140%);
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
  border: 1px solid #171a1c;
  border-radius: $r-pill;
  background: $c-surface;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    0 16px 30px rgba(0, 0, 0, 0.5),
    0 2px 2px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -1px 0 rgba(255, 255, 255, 0.04);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @include tablet {
    gap: 16px;
    width: calc(100% - #{$pad-tablet * 2});
    padding: 12px 12px 12px 24px;
  }

  @include mobile {
    gap: 12px;
    width: 100%;
    padding: 12px 18px;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0;
    background: $c-card;
    box-shadow: none;
  }
}

/* Skroll qilinganda kontent ustida turadi — fon quyuqroq bo'ladi */
.header--stuck .header__bar {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(10, 18, 24, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.6),
    0 2px 2px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(255, 255, 255, 0.04);

  @include mobile { background: rgba(10, 18, 24, 0.9); }
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-inline: 6px;

  @include tablet { gap: 16px; padding-inline: 0; }
}

/* Faol bo'lim ostidagi pill — havoladan havolaga siljiydi */
.header__pill {
  position: absolute;
  inset-block: 0;
  left: 0;
  z-index: 0;
  border-radius: $r-pill;
  background: $c-navy-deep;
  box-shadow: inset 0 0 0 1px rgba(132, 255, 193, 0.22);
  transition:
    transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1),
    width 0.45s cubic-bezier(0.34, 1.25, 0.64, 1);
}

.header__link {
  position: relative;
  z-index: 1;
  display: block;
  padding: 16px 24px;
  color: $c-muted;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  transition: color 0.25s ease;

  &:hover { color: $c-white; }

  @include tablet { padding: 10px 12px; font-size: 12px; line-height: 16px; }
}

.header__link--current {
  color: $c-white;
  font-weight: 600;
}

.header__label-tablet { display: none; }

@include tablet {
  .header__label-wide { display: none; }
  .header__label-tablet { display: inline; }
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
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $r-pill;
  background: $c-surface-dim;
  color: $c-muted;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease, border-color 0.25s ease, background-color 0.25s ease;

  &:hover { border-color: rgba(255, 255, 255, 0.22); background: rgba(255, 255, 255, 0.06); color: $c-white; }

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
  transition: filter 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);

  &:hover { filter: brightness(1.08); transform: translateY(-2px); }
  &:active { transform: translateY(0) scale(0.97); }

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
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.header__mobile {
  display: none;

  @include mobile {
    display: block;
    padding: 8px $pad-mobile 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(10, 18, 24, 0.96);
    backdrop-filter: blur(16px);

    a {
      display: block;
      padding: 12px 4px;
      color: $c-body;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s ease, padding-left 0.25s ease;

      &:hover { padding-left: 10px; color: $c-accent; }

      &.is-active {
        padding-left: 10px;
        border-left: 2px solid $c-accent;
        color: $c-white;
        font-weight: 600;
      }
    }
  }
}
</style>
