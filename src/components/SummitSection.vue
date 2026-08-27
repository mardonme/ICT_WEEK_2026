<script setup>
import BaseIcon from './ui/BaseIcon.vue'
import cardImage from '@/assets/images/summit-card.webp'

// Figmadagi Home Page faqat "Enterprise Uzbekistan" holatini belgilaydi.
const TABS = [
  'Enterprise Uzbekistan',
  'Startup & VC',
  'Service Companies',
  'Global Bridge',
  'Gamedev',
  'AI Native',
]

const META = [
  { icon: 'calendar', text: 'September 23,2026' },
  { icon: 'clock', text: '10:00 - 12:00' },
  { icon: 'map-pin', text: 'CAEx, Hall 1', strong: true },
]

const BULLETS = [
  'Running on elements of English and Welsh law, it offers a legal environment that locks in the day you enter and remains guaranteed through 2100 — for IT exporters, data centers, startups, and infrastructure and institutional investors alike.',
  "On September 23, Enterprise Uzbekistan takes the stage at ICT Week to open the framework up in person. Meet the people building it, see how it's structured, and get a first look at what it means to operate inside it.",
  'Join us at CAEx, Main Hall — come see it before everyone else does.',
]
</script>

<template>
  <section id="program" class="summit" aria-labelledby="summit-title">
    <div class="summit__tabs" role="tablist" aria-label="Summit tracks">
      <button
        v-for="(tab, i) in TABS"
        :key="tab"
        class="summit__tab"
        :class="{ 'summit__tab--active': i === 0 }"
        type="button"
        role="tab"
        :aria-selected="i === 0"
        :aria-disabled="i !== 0 || undefined"
        :tabindex="i === 0 ? 0 : -1"
      >
        {{ tab }}
      </button>
    </div>

    <h2 id="summit-title" class="summit__title">Enterprise Uzbekistan Summit</h2>

    <ul class="summit__meta">
      <li v-for="item in META" :key="item.icon" class="summit__meta-item">
        <BaseIcon :name="item.icon" :size="20" />
        <span :class="{ 'summit__meta-strong': item.strong }">{{ item.text }}</span>
      </li>
    </ul>

    <div class="summit__card" role="tabpanel" aria-labelledby="summit-title">
      <div class="summit__promo">
        <img
          class="summit__promo-img"
          :src="cardImage"
          alt="Enterprise Uzbekistan Summit session"
          width="420"
          height="370"
          loading="lazy"
          decoding="async"
        />
        <div class="summit__promo-body">
          <h3 class="summit__promo-title">Enterprise Uzbekistan Summit</h3>
          <p class="summit__promo-text">
            Legally protected testing environment for new business models and frontier
            technologies.
          </p>
        </div>
        <a class="summit__promo-cta" href="#register">
          Register now
          <BaseIcon name="arrow-up-right" :size="20" />
        </a>
      </div>

      <div class="summit__details">
        <p class="summit__lead">
          Discover Enterprise Uzbekistan — the country&rsquo;s first dedicated jurisdiction built
          for global technology business.
        </p>

        <ul class="summit__bullets">
          <li v-for="(text, i) in BULLETS" :key="i" class="summit__bullet">
            <span class="summit__check"><BaseIcon name="check-circle" :size="20" /></span>
            <span>{{ text }}</span>
          </li>
        </ul>

        <p class="summit__audience">
          <span class="summit__audience-bar" aria-hidden="true"></span>
          <span>
            Ideal for:
            <strong>
              global tech companies, investors, legal and financial advisors, and government
              officials
            </strong>
          </span>
        </p>
      </div>
    </div>
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

  @include below-desktop { gap: 20px; padding: 24px; }
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
  transition: background-color 0.2s ease;

  &[aria-disabled='true'] { cursor: default; }

  @include below-desktop { font-size: 13px; line-height: 17.76px; }
  @include mobile { padding: 8px 14px; }
}

.summit__tab--active {
  border-color: $c-accent;
  background: $c-accent;
  color: $c-navy;
  font-weight: 700;
}

/* ---------- Sarlavha ---------- */
.summit__title {
  color: $c-white;
  font-size: 56px;
  font-weight: 700;
  line-height: 61.6px;
  text-align: center;
  text-transform: uppercase;

  @include tablet { font-size: 32px; line-height: 38.4px; }
  @include mobile {
    font-size: 26px;
    line-height: 31.2px;
    text-align: left;
  }
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

  & + & {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 16px;
  }

  svg { flex: none; color: $c-accent; }

  @include below-desktop {
    gap: 6px;
    font-size: 12px;

    svg { width: 16px; height: 16px; }
    & + & { padding-left: 12px; }
  }

  @include mobile {
    flex: none;
    & + & { border-left: 0; padding-left: 0; }
  }
}

.summit__meta-strong { font-weight: 700; }

/* ---------- Kontent kartasi ---------- */
.summit__card {
  display: flex;
  gap: 32px;
  padding: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);

  @include below-desktop { flex-direction: column; gap: 20px; padding: 20px; }
  @include mobile {
    gap: 16px;
    padding: 0;
    border: 0;
    background: none;
  }
}

.summit__promo {
  position: relative;
  display: flex;
  flex: 0 0 420px;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 24px;
  border-radius: $r-md;
  overflow: hidden;

  @include below-desktop { flex: none; width: 100%; min-height: 300px; }
  @include mobile { min-height: 200px; padding: 16px; }
}

.summit__promo-img {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summit__promo-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

  @include below-desktop { font-size: 14px; line-height: 21px; font-weight: 500; }
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

  @include below-desktop { align-items: flex-start; font-size: 13px; line-height: 19.5px; }
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

  @include below-desktop { gap: 12px; padding: 12px; border-radius: 8px; font-size: 13px; line-height: 18px; }

  strong { color: $c-white; font-weight: 700; }
}

.summit__audience-bar {
  flex: none;
  width: 4px;
  height: 28px;
  border-radius: 2px;
  background: $c-accent;
}
</style>
