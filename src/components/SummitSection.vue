<script setup>
import { ref, computed, nextTick } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import { SUMMIT_TRACKS } from '@/data/summitTracks'

const META_ICONS = ['calendar', 'clock', 'map-pin']

const active = ref(0)
const tabRefs = ref([])
const tabsEl = ref(null)

const track = computed(() => SUMMIT_TRACKS[active.value])

const select = async (i) => {
  active.value = i
  await nextTick()
  tabRefs.value[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
}

/** Chap/o'ng strelkalar bilan tablar orasida yurish (WAI-ARIA tablist) */
const onKey = (e) => {
  const last = SUMMIT_TRACKS.length - 1
  const moves = {
    ArrowRight: active.value === last ? 0 : active.value + 1,
    ArrowLeft: active.value === 0 ? last : active.value - 1,
    Home: 0,
    End: last,
  }
  const next = moves[e.key]
  if (next === undefined) return
  e.preventDefault()
  select(next)
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <section id="program" class="summit" aria-labelledby="summit-title">
    <div ref="tabsEl" class="summit__tabs" role="tablist" aria-label="Summit tracks" @keydown="onKey">
      <button
        v-for="(item, i) in SUMMIT_TRACKS"
        :key="item.tab"
        :ref="(el) => (tabRefs[i] = el)"
        class="summit__tab"
        :class="{ 'summit__tab--active': i === active }"
        type="button"
        role="tab"
        :id="`summit-tab-${i}`"
        :aria-selected="i === active"
        :aria-controls="`summit-panel-${i}`"
        :tabindex="i === active ? 0 : -1"
        @click="select(i)"
      >
        {{ item.tab }}
      </button>
    </div>

    <Transition name="panel" mode="out-in">
      <div
        :key="active"
        class="summit__panel"
        role="tabpanel"
        :id="`summit-panel-${active}`"
        :aria-labelledby="`summit-tab-${active}`"
        tabindex="0"
      >
        <h2 id="summit-title" class="summit__title">{{ track.title }}</h2>

        <ul v-if="track.meta" class="summit__meta">
          <li v-for="(text, i) in track.meta" :key="text" class="summit__meta-item">
            <BaseIcon :name="META_ICONS[i]" :size="20" />
            <span :class="{ 'summit__meta-strong': i === 2 }">{{ text }}</span>
          </li>
        </ul>

        <!-- Batafsil ko'rinish: rasm + ro'yxat -->
        <div v-if="track.layout === 'detail'" class="summit__card">
          <div class="summit__promo">
            <img
              class="summit__promo-img"
              :src="track.image"
              :alt="track.imageAlt"
              width="840"
              height="740"
              loading="lazy"
              decoding="async"
            />
            <template v-if="track.promo">
              <div class="summit__promo-body">
                <h3 class="summit__promo-title">{{ track.promo.title }}</h3>
                <p class="summit__promo-text">{{ track.promo.text }}</p>
              </div>
              <a class="summit__promo-cta" href="#register">
                Register now
                <BaseIcon name="arrow-up-right" :size="20" />
              </a>
            </template>
          </div>

          <div class="summit__details">
            <p class="summit__lead">{{ track.lead }}</p>

            <ul class="summit__bullets">
              <li
                v-for="(text, i) in track.bullets"
                :key="i"
                class="summit__bullet"
                :style="{ '--i': i }"
              >
                <span class="summit__check"><BaseIcon name="check-circle" :size="20" /></span>
                <span>{{ text }}</span>
              </li>
            </ul>

            <p class="summit__audience">
              <span class="summit__audience-bar" aria-hidden="true"></span>
              <span>Ideal for: <strong>{{ track.audience }}</strong></span>
            </p>
          </div>
        </div>

        <!-- Setka ko'rinishi: tadbir kartalari -->
        <ul v-else class="summit__grid">
          <li
            v-for="(card, i) in track.cards"
            :key="card.title"
            class="summit__event"
            :style="{ '--span': card.span, '--i': i }"
          >
            <img
              class="summit__event-img"
              :src="card.image"
              :alt="card.title"
              width="710"
              height="400"
              loading="lazy"
              decoding="async"
            />
            <div class="summit__event-body">
              <h3 class="summit__event-title">{{ card.title }}</h3>
              <ul class="summit__event-meta">
                <li v-for="(text, m) in card.meta" :key="text">
                  <BaseIcon :name="META_ICONS[m]" :size="14" />
                  {{ text }}
                </li>
              </ul>
              <p class="summit__event-text">{{ card.text }}</p>

              <ul v-if="card.bullets" class="summit__event-bullets">
                <li v-for="text in card.bullets" :key="text">
                  <BaseIcon name="check-circle" :size="14" />
                  {{ text }}
                </li>
              </ul>

              <p v-if="card.audience" class="summit__event-audience">
                <span class="summit__audience-bar" aria-hidden="true"></span>
                <span>Ideal for: <strong>{{ card.audience }}</strong></span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
.summit {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 40px 48px;
  border-radius: $r-xl;
  background: $c-card;

  @include tablet { gap: 20px; padding: 24px; }
  @include mobile {
    gap: 20px;
    padding: 24px 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $r-lg;
    background: $c-card-soft;
  }
}

/* ---------- Tablar ---------- */
.summit__tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  @include mobile {
    flex-wrap: nowrap;
    gap: 8px;
    margin-inline: -16px;
    padding-inline: 16px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar { display: none; }
  }
}

.summit__tab {
  flex: none;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $r-pill;
  background: rgba(255, 255, 255, 0.03);
  color: $c-body-strong;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);

  &:hover:not(.summit__tab--active) {
    border-color: rgba(132, 255, 193, 0.4);
    background: rgba(132, 255, 193, 0.08);
    color: $c-white;
  }

  &:active { transform: scale(0.96); }

  @include below-desktop { font-size: 13px; line-height: 17.76px; }
  @include mobile { padding: 8px 14px; }
}

.summit__tab--active {
  border-color: $c-accent;
  background: $c-accent;
  color: $c-navy;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(132, 255, 193, 0.25);
}

/* ---------- Panel almashinuvi ---------- */
.summit__panel {
  display: flex;
  flex-direction: column;
  gap: 32px;
  outline: none;

  @include below-desktop { gap: 20px; }
}

.panel-enter-active { transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.panel-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.panel-enter-from { opacity: 0; transform: translateY(14px); }
.panel-leave-to { opacity: 0; transform: translateY(-8px); }

/* ---------- Sarlavha ---------- */
.summit__title {
  color: $c-white;
  font-size: 56px;
  font-weight: 700;
  line-height: 61.6px;
  text-align: center;
  text-transform: uppercase;
  text-wrap: balance;

  @include tablet { font-size: 32px; line-height: 38.4px; }
  @include mobile { font-size: 26px; line-height: 31.2px; text-align: left; }
}

/* ---------- Meta panel ---------- */
.summit__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $r-lg;
  background: rgba(255, 255, 255, 0.03);

  @include mobile {
    gap: 12px;
    justify-content: space-between;
    padding: 12px;
    border-radius: $r-md;
    background: rgba(255, 255, 255, 0.02);
  }
}

.summit__meta-item {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 10px;
  color: $c-white;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.86px;

  & + & { padding-left: 16px; border-left: 1px solid rgba(255, 255, 255, 0.1); }

  svg { flex: none; color: $c-accent; }

  @include below-desktop {
    gap: 6px;
    font-size: 12px;

    svg { width: 16px; height: 16px; }
    & + & { padding-left: 12px; }
  }

  @include mobile {
    flex: none;
    & + & { padding-left: 0; border-left: 0; }
  }
}

.summit__meta-strong { font-weight: 700; }

/* ---------- Batafsil karta ---------- */
.summit__card {
  display: flex;
  gap: 32px;
  padding: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);

  @include below-desktop { flex-direction: column; gap: 20px; padding: 20px; }
  @include mobile { gap: 16px; padding: 0; border: 0; background: none; }
}

.summit__promo {
  position: relative;
  display: flex;
  flex: 0 0 420px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  min-height: 300px;
  padding: 24px;
  border-radius: $r-md;
  overflow: hidden;

  @include below-desktop { flex: none; width: 100%; }
  @include mobile { min-height: 200px; padding: 16px; }
}

.summit__promo-img {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.summit__promo:hover .summit__promo-img { transform: scale(1.05); }

.summit__promo-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: auto;
}

.summit__promo-title {
  color: $c-white;
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;

  @include mobile { font-size: 20px; line-height: 24px; }
}

.summit__promo-text {
  color: $c-white;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;
}

.summit__promo-cta {
  @include btn-solid;
  gap: 4px;
  align-self: flex-start;
  height: 46px;
  padding: 0 16px 0 20px;
  font-size: 16px;
  line-height: 21.86px;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s ease;

  &:hover { transform: translateY(-2px); }
}

/* ---------- O'ng ustun ---------- */
.summit__details {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
}

.summit__lead {
  color: $c-white;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;

  @include below-desktop { font-size: 14px; font-weight: 500; line-height: 21px; }
}

.summit__bullets {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @include below-desktop { gap: 12px; }
}

.summit__bullet {
  display: flex;
  align-items: center;
  gap: 12px;
  color: $c-white;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.08px;
  animation: bullet-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i) * 70ms + 120ms);

  @include below-desktop { align-items: flex-start; font-size: 13px; line-height: 19.5px; }
}

@keyframes bullet-in {
  from { opacity: 0; transform: translateX(-10px); }
}

.summit__check {
  flex: none;
  display: grid;
  place-items: center;
  color: $c-accent;

  @include below-desktop { margin-top: 2px; }
}

.summit__audience {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: $r-md;
  background: rgba(255, 255, 255, 0.04);
  color: $c-body-strong;
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;

  strong { color: $c-white; font-weight: 700; }

  @include below-desktop { gap: 12px; padding: 12px; border-radius: 8px; font-size: 13px; line-height: 18px; }
}

.summit__audience-bar {
  flex: none;
  width: 4px;
  height: 28px;
  border-radius: 2px;
  background: $c-accent;
}

/* ---------- Tadbir kartalari setkasi ---------- */
.summit__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; gap: 16px; }
}

.summit__event {
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column: span var(--span);
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  animation: card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i) * 60ms + 100ms);
  transition: background-color 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-4px);
  }

  @include below-desktop { grid-column: auto; gap: 16px; }
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(18px); }
}

.summit__event-img {
  width: 100%;
  height: 200px;
  border-radius: $r-md;
  object-fit: cover;

  @include mobile { height: 160px; }
}

.summit__event-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 0 4px 4px;
}

.summit__event-title {
  color: $c-white;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
}

.summit__event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #b0bec5;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.39px;
  }

  svg { flex: none; color: $c-accent; }
}

.summit__event-text {
  color: #b0bec5;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.13px;
}

.summit__event-bullets {
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: $c-body-strong;
    font-size: 13px;
    line-height: 19.5px;
  }

  svg { flex: none; margin-top: 3px; color: $c-accent; }
}

.summit__event-audience {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: $c-body-strong;
  font-size: 13px;
  line-height: 18px;

  strong { color: $c-white; font-weight: 700; }

  .summit__audience-bar { height: 22px; }
}
</style>
