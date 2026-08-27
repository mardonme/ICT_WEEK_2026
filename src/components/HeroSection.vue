<script setup>
import BaseIcon from './ui/BaseIcon.vue'
import { useCountdown } from '@/composables/useCountdown'
import videoPoster from '@/assets/images/hero-video-poster.webp'
import screenWide from '@/assets/images/hero-screen.webp'
import screenCompact from '@/assets/images/hero-screen-compact.webp'
import badge from '@/assets/images/award-badge.webp'
import dealroomLogo from '@/assets/logos/attendees/dealroom.svg'
import startupblinkLogo from '@/assets/logos/attendees/startupblink.svg'

const { days, hours, minutes } = useCountdown('2026-09-23T10:00:00+05:00')

const COUNTDOWN = [
  { label: 'Days', value: days },
  { label: 'Hours', value: hours },
  { label: 'Minutes', value: minutes },
]

const AWARDS = [
  {
    stats: [
      { value: '$4.3B', label: 'Startup Ecosystem Valuation' },
      { value: '#1', label: 'In venture investment growth globally' },
    ],
    logo: { src: dealroomLogo, alt: 'dealroom.co', width: 92 },
  },
  {
    // Mobil dizaynda StartupBlink nishoni shu kartaning ichida turadi
    badge: true,
    stats: [
      { value: '#1', label: 'Ecosystem in the World by Growth Rate' },
      { value: '#1', label: 'Startup Hub in Central Asia (Tashkent)' },
    ],
    logo: { src: startupblinkLogo, alt: 'StartupBlink', width: 95 },
  },
  {
    narrow: true,
    stats: [{ value: '2', label: 'Fintech Unicorns' }],
    brands: ['Uzum', 'TBC Bank'],
  },
]
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__intro">
      <h1 id="hero-title" class="hero__title">Unlock the World&rsquo;s Fastest Growing Ecosystem</h1>
      <p class="hero__lead">
        Learn everything about the thriving Uzbek tech ecosystem — in just one week.
        Meet 10k+ attendees, global VCs &amp; partners.
      </p>
    </div>

    <div class="hero__main">
      <!-- Video -->
      <div class="hero__player">
        <img
          class="hero__video"
          :src="videoPoster"
          alt="ICT Week Uzbekistan venue in Tashkent seen from above"
          width="769"
          height="488"
          fetchpriority="high"
        />
        <button class="hero__play" type="button">
          <span class="visually-hidden">Play the introduction video</span>
          <BaseIcon name="play" :size="20" />
        </button>
      </div>

      <!-- Ma'lumot kartasi -->
      <div class="hero__card">
        <div class="hero__card-top">
          <picture>
            <source :srcset="screenWide" media="(min-width: 1024px)" />
            <img
              class="hero__screen"
              :src="screenCompact"
              alt="ICT Week stage screen showing Uzbek tech ecosystem statistics"
              width="435"
              height="187"
            />
          </picture>

          <p class="hero__card-text">
            Learn everything about the thriving Uzbek tech ecosystem — in just one week
          </p>

          <div class="hero__card-actions">
            <a class="hero__btn hero__btn--solid" href="#register">
              Register now
              <BaseIcon name="arrow-up-right" :size="24" />
            </a>
            <a class="hero__btn hero__btn--outline" href="#program">
              <BaseIcon name="download" :size="20" />
              Full agenda
            </a>
          </div>
        </div>

        <ul class="hero__countdown">
          <li v-for="item in COUNTDOWN" :key="item.label" class="hero__count">
            <span class="hero__count-value">{{ item.value.value }}</span>
            <span class="hero__count-label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Yutuqlar -->
    <div class="hero__awards">
      <img
        class="hero__badge"
        :src="badge"
        alt="StartupBlink Country of the Year 2026 award badge"
        width="150"
        height="150"
        loading="lazy"
        decoding="async"
      />

      <ul class="hero__stats">
        <li
          v-for="(award, i) in AWARDS"
          :key="i"
          class="hero__stat"
          :class="{ 'hero__stat--narrow': award.narrow }"
        >
          <img
            v-if="award.badge"
            class="hero__badge-inline"
            :src="badge"
            alt=""
            width="48"
            height="59"
            loading="lazy"
            decoding="async"
          />

          <div v-for="stat in award.stats" :key="stat.label" class="hero__stat-pair">
            <p class="hero__stat-num">{{ stat.value }}</p>
            <p class="hero__stat-label">{{ stat.label }}</p>
          </div>

          <div v-if="award.brands" class="hero__stat-brands">
            <span v-for="brand in award.brands" :key="brand">{{ brand }}</span>
          </div>

          <div class="hero__stat-side">
            <span class="hero__stat-year">2026</span>
            <img
              v-if="award.logo"
              class="hero__stat-logo"
              :src="award.logo.src"
              :alt="award.logo.alt"
              :style="{ width: award.logo.width + 'px' }"
              loading="lazy"
              decoding="async"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;

  @include tablet { gap: 48px; }
  @include mobile { gap: 24px; }
}

/* ---------- Sarlavha ---------- */
.hero__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.hero__title {
  max-width: 944px;
  color: $c-white;
  font-size: 70px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2.1px;
  text-align: center;
  text-wrap: balance;

  @include tablet {
    max-width: none;
    font-size: 42px;
    line-height: 50.4px;
    letter-spacing: -1.26px;
  }

  @include mobile {
    font-size: 32px;
    font-weight: 800;
    line-height: 36.8px;
    letter-spacing: -0.64px;
    text-wrap: wrap;
  }
}

/* Yetakchi matn faqat mobil dizaynda bor */
.hero__lead {
  display: none;

  @include mobile {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: center;
  }
}

/* ---------- Video + karta ---------- */
.hero__main {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  @include below-desktop { flex-direction: column; gap: 24px; }
}

.hero__player {
  position: relative;
  flex: 1 1 781px;
  padding: 6px;
  border-radius: $r-xl;
  background:
    radial-gradient(120% 120% at 50% 0%, rgba(132, 255, 193, 0.55) 0%, rgba(132, 255, 193, 0) 60%),
    radial-gradient(120% 120% at 50% 50%, #ffffff 0%, rgba(255, 255, 255, 0.1) 70%);

  @include below-desktop { flex: none; width: 100%; }
  @include mobile { padding: 2px; border-radius: $r-lg; }
}

.hero__video {
  width: 100%;
  height: auto;
  aspect-ratio: 769 / 488;
  border-radius: 17.19px;
  object-fit: cover;

  @include mobile { aspect-ratio: 354 / 206; border-radius: 14px; }
}

.hero__play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 54.44px;
  height: 54.44px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  backdrop-filter: blur(7.74px);
  color: $c-white;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;

  &:hover { transform: translate(-50%, -50%) scale(1.08); }

  @include mobile {
    width: 54px;
    height: 54px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: $c-card-soft;
  }
}

/* ---------- Ma'lumot kartasi ---------- */
.hero__card {
  display: flex;
  flex: 0 0 483px;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  align-self: stretch;
  padding: 24px;
  border-radius: $r-xl;
  background: $c-card-soft;

  @include below-desktop { flex: none; width: 100%; align-self: auto; gap: 24px; }
  @include mobile { gap: 32px; padding: 16px; background: $c-card; }
}

.hero__card-top {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @include tablet { flex-direction: row-reverse; gap: 16px; }
}

.hero__screen {
  width: 100%;
  height: auto;
  aspect-ratio: 435 / 187;
  border-radius: $r-lg;
  object-fit: cover;

  @include tablet { flex: 0 0 284px; aspect-ratio: 284 / 136; }
  @include mobile { aspect-ratio: 326 / 233; }
}

.hero__card-text {
  color: $c-white;
  font-size: 22px;
  font-weight: 500;
  line-height: 26.4px;
  text-transform: lowercase;

  @include below-desktop { text-transform: none; }
  @include tablet { font-size: 20px; line-height: 24px; }
  @include mobile { font-size: 16px; line-height: 19.2px; }
}

.hero__card-actions {
  display: flex;
  gap: 16px;

  @include below-desktop { gap: 12px; }
}

.hero__btn {
  gap: 4px;
  height: 52px;
  padding: 0 16px 0 20px;
  font-size: 18px;
  line-height: 32px;

  @include tablet { height: 48px; padding: 0 12px; font-size: 15px; }
  @include mobile { height: 48px; padding: 0 16px; font-size: 16px; line-height: 24px; }
}

.hero__btn--solid { @include btn-solid; }

.hero__btn--outline {
  @include btn-outline;
  gap: 8px;
  padding: 0 20px;

  @include tablet { gap: 6px; padding: 0 16px; }
  @include mobile { padding: 0 16px; }
}

/* ---------- Countdown ---------- */
.hero__countdown {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero__count {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  height: 97px;
  padding: 20px 28px;
  border-radius: $r-lg;
  background: $c-card-strong;

  @include tablet { height: 92px; }
  @include mobile { height: 85px; padding: 20px 8px; }
}

.hero__count-value {
  color: $c-white;
  font-size: 36px;
  font-weight: 700;
  line-height: 1;

  @include tablet { font-size: 32px; }
  @include mobile { font-size: 28px; }
}

.hero__count-label {
  color: $c-accent;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;

  @include tablet { font-size: 17px; }
  @include mobile { font-size: 14px; }
}

/* ---------- Yutuqlar ---------- */
.hero__awards {
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
  padding: 16px 32px 16px 23px;
  border-radius: $r-xl;
  background: $c-card;

  @include tablet { flex-direction: column; gap: 20px; padding: 20px; }
  @include mobile { flex-direction: column; gap: 12px; padding: 0; background: none; }
}

.hero__badge {
  flex: none;
  width: 150px;
  height: 150px;
  object-fit: contain;

  @include tablet { width: 108px; height: 108px; }
  @include mobile { display: none; }
}

/* Mobilda nishon 2-kartaning ichiga ko'chadi */
.hero__badge-inline {
  display: none;

  @include mobile {
    display: block;
    flex: none;
    width: 48px;
    height: 59px;
    object-fit: contain;
  }
}

.hero__stats {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 26px;

  @include tablet { flex-wrap: wrap; gap: 16px; width: 100%; }
  @include mobile { flex-direction: column; gap: 12px; width: 100%; }
}

.hero__stat {
  position: relative;
  display: flex;
  flex: 1 1 370px;
  align-items: flex-start;
  gap: 24px;
  height: 108px;
  padding: 11px 12px;
  border: 1.2px solid transparent;
  border-radius: 9.74px;
  background:
    linear-gradient($c-bg, $c-bg) padding-box,
    $grad-border border-box;

  @include tablet {
    &:first-child { flex-basis: 100%; }
  }

  @include mobile {
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 113px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $r-lg;
    background: $c-card;
  }
}

.hero__stat--narrow {
  flex: 0 1 255px;

  @include mobile { height: 98px; }
}

.hero__stat-pair {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  @include mobile { flex: 1; gap: 12px; }
}

.hero__stat-num {
  color: $c-white;
  font-size: 32px;
  font-weight: 700;
  line-height: 35.2px;

  @include mobile { font-size: 22px; line-height: 24.2px; }
}

.hero__stat-label {
  color: $c-white;
  font-size: 12px;
  font-weight: 500;
  line-height: 15.12px;
  letter-spacing: -0.24px;

  @include mobile { letter-spacing: 0; }
}

.hero__stat-brands {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: $c-white;
  font-size: 14px;
  font-weight: 600;
}

/* Desktopda yil va logo kartaning burchaklariga mahkamlanadi,
   mobilda esa o'ng ustunda ustma-ust turadi. */
.hero__stat-side {
  display: contents;

  @include mobile {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    align-self: stretch;
    gap: 8px;
  }
}

.hero__stat-year {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  min-width: 72px;
  padding: 2px 10px;
  border-radius: 0 9.74px 0 9.74px;
  background: $c-accent;
  color: $c-navy;
  font-size: 15.75px;
  font-weight: 800;
  line-height: 22px;
  opacity: 0.87;

  @include mobile {
    position: static;
    min-width: 0;
    padding: 4px 10px;
    border-radius: $r-sm;
    font-size: 12px;
    line-height: 16.8px;
  }
}

.hero__stat-logo {
  position: absolute;
  right: 12px;
  bottom: 12px;
  height: auto;
  object-fit: contain;

  @include mobile { position: static; }
}
</style>
