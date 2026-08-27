<script setup>
import BarChart from './BarChart.vue'
import worldMap from '@/assets/slides/world-map.svg'

const flags = import.meta.glob('@/assets/slides/flags/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})
const flag = (n) => flags[Object.keys(flags).find((k) => k.endsWith(`/${n}.webp`))]

/** Xarita ustidagi foizlar — joylashuvi Figmadagidek foizda */
const REGIONS = [
  { label: 'North America', value: '46%', x: 8, y: 22, align: 'left' },
  { label: 'CIS & APAC', value: '27%', x: 58, y: 22, align: 'right' },
  { label: 'EU and UK', value: '21%', x: 8, y: 82, align: 'left' },
  { label: 'MENA', value: '6%', x: 62, y: 82, align: 'right' },
]

/** Donut: 53 / 28 / 11 / 8 — bitta mint halqa, orasida ajratgich */
// pos — Figmadagidek donut atrofidagi joylashuv
const SEGMENTS = [
  { label: 'IT Services', value: 53, pos: 'tr' },
  { label: 'KPO', value: 28, pos: 'bl' },
  { label: 'Creative & GameDev', value: 11, pos: 'tl' },
  { label: 'Software Products', value: 8, pos: 'br' },
]
const R = 42
const C = 2 * Math.PI * R
const GAP = 2.5
let offset = 0
const arcs = SEGMENTS.map((s) => {
  const len = (s.value / 100) * C
  const arc = { ...s, dash: `${Math.max(0, len - GAP)} ${C - Math.max(0, len - GAP)}`, offset: -offset }
  offset += len
  return arc
})

const OFFICES = [
  { file: 'usa', name: 'USA' },
  { file: 'germany', name: 'Germany' },
  { file: 'saudi', name: 'Saudi Arabia' },
  { file: 'china', name: 'China' },
  { file: 'korea', name: 'South Korea' },
  { file: 'japan', name: 'Japan' },
]

const REVENUE = [
  { year: '2017', value: 151 }, { year: '2021', value: 181 },
  { year: '2023', value: 540 }, { year: 'YTD\n2025', value: 1110, display: '1 110' },
]
const MEMBERS = [
  { year: '2017', value: 147 }, { year: '2021', value: 523 },
  { year: '2023', value: 1652, display: '1 652' }, { year: 'YTD\n2025', value: 3400, display: '3 400+' },
]
const FOREIGN = [
  { year: '2017', value: 4, sub: 0 }, { year: '2021', value: 23, sub: 19 },
  { year: '2023', value: 426, sub: 31 }, { year: 'YTD\n2025', value: 970, display: '970+', sub: 79 },
]
const MEMBER_REVENUE = [
  { year: '2017', value: 22, display: '22.0' }, { year: '2021', value: 234.5, display: '234.5' },
  { year: '2023', value: 1000, display: '1 000.0' }, { year: 'YTD\n2025', value: 2800, display: '2 800.0' },
]

const STATS = [
  { title: 'Number of Member\nCompanies', growth: '22x', bars: MEMBERS },
  { title: 'Growth of Companies\nwith Foreign Capital', growth: '127x', bars: FOREIGN, note: 'Number of American capital companies' },
  { title: 'Revenue of Members\n(Million USD)', growth: '127x', bars: MEMBER_REVENUE },
]
</script>

<template>
  <div class="sl-ind">
    <div class="sl-ind__top">
      <!-- Eksport geografiyasi -->
      <section class="sl-ind__geo">
        <h3 class="sl-ind__h">Export Geography</h3>
        <div class="sl-ind__map">
          <img :src="worldMap" alt="World map of IT Park export geography" loading="lazy" decoding="async" />
          <span
            v-for="r in REGIONS"
            :key="r.label"
            class="sl-ind__region"
            :class="`sl-ind__region--${r.align}`"
            :style="{ left: r.x + '%', top: r.y + '%' }"
          >
            <b>{{ r.value }}</b>
            <em>{{ r.label }}</em>
          </span>
        </div>
      </section>

      <div class="sl-ind__mid">
        <div class="sl-ind__charts">
          <!-- Eksport turlari -->
          <section class="sl-ind__panel">
            <h3 class="sl-ind__h sl-ind__h--sm">Types of Export</h3>
            <div class="sl-ind__donut">
              <svg viewBox="0 0 100 100" role="img" aria-label="Export types: IT Services 53%, KPO 28%, Creative and GameDev 11%, Software Products 8%">
                <g transform="rotate(-90 50 50)">
                  <circle
                    v-for="a in arcs" :key="a.label"
                    cx="50" cy="50" :r="R" fill="none"
                    stroke="#84ffc1" stroke-width="16"
                    :stroke-dasharray="a.dash" :stroke-dashoffset="a.offset"
                  />
                </g>
                <text x="50" y="50" class="sl-ind__donut-center">$1B</text>
              </svg>
              <p
                v-for="s in SEGMENTS"
                :key="s.label"
                class="sl-ind__label"
                :class="`sl-ind__label--${s.pos}`"
              >
                <b>{{ s.value }}%</b>
                <span>{{ s.label }}</span>
              </p>
            </div>
          </section>

          <!-- ICT eksport daromadi -->
          <section class="sl-ind__panel">
            <h3 class="sl-ind__h sl-ind__h--sm">ICT Export Revenue<br /><small>(Million USD)</small></h3>
            <div class="sl-ind__revenue">
              <p class="sl-ind__growth">7.2x <span>increase</span></p>
              <BarChart :bars="REVENUE" />
            </div>
          </section>
        </div>

        <!-- Vakolatxonalar -->
        <section class="sl-ind__offices">
          <h3 class="sl-ind__offices-title"><b>6</b> Representative offices abroad</h3>
          <ul>
            <li v-for="o in OFFICES" :key="o.file">
              <img :src="flag(o.file)" :alt="''" width="32" height="32" loading="lazy" decoding="async" />
              {{ o.name }}
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Pastki 3 ta diagramma -->
    <div class="sl-ind__bottom">
      <section v-for="s in STATS" :key="s.title" class="sl-ind__stat">
        <h3 class="sl-ind__stat-title">{{ s.title }}</h3>
        <div class="sl-ind__stat-body">
          <div class="sl-ind__stat-left">
            <p class="sl-ind__growth sl-ind__growth--lg">{{ s.growth }} <span>increase</span></p>
            <p v-if="s.note" class="sl-ind__note">{{ s.note }}</p>
          </div>
          <BarChart :bars="s.bars" />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sl-ind { display: flex; flex-direction: column; gap: 16px; }

.sl-ind__top {
  display: flex;
  gap: 16px;

  @include below-desktop { flex-direction: column; }
}

.sl-ind__h {
  color: $c-white;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;

  &--sm { font-size: 17px; }
  small { color: rgba(255, 255, 255, 0.7); font-size: 0.8em; font-weight: 500; }

  @include below-desktop { font-size: 16px; &--sm { font-size: 14px; } }
}

/* --- Xarita --- */
.sl-ind__geo {
  @include panel-blue;
  display: flex;
  flex: 0 0 442px;
  flex-direction: column;
  gap: 10px;
  padding: 18px;

  @include below-desktop { flex: none; }
}

.sl-ind__map {
  position: relative;
  flex: 1;

  img { width: 100%; height: auto; opacity: 0.55; }
}

.sl-ind__region {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  b { color: $c-white; font-size: 15px; font-weight: 700; }

  em {
    padding: 3px 9px;
    border-radius: $r-pill;
    background: $c-accent;
    color: $c-navy;
    font-size: 9px;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
  }

  &--right { flex-direction: row-reverse; }

  @include mobile { b { font-size: 12px; } em { font-size: 8px; padding: 2px 6px; } }
}

/* --- O'ng ustun --- */
.sl-ind__mid { display: flex; flex: 1; flex-direction: column; gap: 16px; min-width: 0; }

.sl-ind__charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @include mobile { grid-template-columns: 1fr; }
}

.sl-ind__panel {
  @include panel-green;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

/* --- Donut --- */
.sl-ind__donut {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 150px;

  svg { width: 112px; height: 112px; }
}

/* Yorliqlar donutning to'rt burchagida — Figmadagidek */
.sl-ind__label {
  position: absolute;
  max-width: 84px;
  color: $c-white;
  font-size: 9.5px;
  line-height: 1.25;

  b { display: block; color: $c-accent; font-size: 13px; font-weight: 700; }

  &--tl { top: 4px; left: 0; }
  &--tr { top: 4px; right: 0; text-align: right; }
  &--bl { bottom: 4px; left: 0; }
  &--br { bottom: 4px; right: 0; text-align: right; }
}

.sl-ind__donut-center {
  fill: #fff;
  font-size: 17px;
  font-weight: 800;
  text-anchor: middle;
  dominant-baseline: central;
}

/* --- Daromad --- */
.sl-ind__revenue { display: flex; flex: 1; align-items: flex-end; gap: 10px; }

.sl-ind__growth {
  color: $c-accent;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;

  span { display: block; color: $c-white; font-size: 12px; font-weight: 500; }

  &--lg { font-size: 30px; span { font-size: 13px; } }

  @include below-desktop { font-size: 18px; &--lg { font-size: 22px; } }
}

/* --- Vakolatxonalar --- */
.sl-ind__offices {
  @include panel-blue;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $c-white;
    font-size: 13px;
    font-weight: 500;
  }

  img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }

  @include below-desktop { padding: 14px 16px; li { font-size: 11px; } img { width: 24px; height: 24px; } }
}

.sl-ind__offices-title {
  color: $c-white;
  font-size: 17.6px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;

  b { color: $c-accent; }

  @include below-desktop { font-size: 14px; }
}

/* --- Pastki statistikalar --- */
.sl-ind__bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include mobile { grid-template-columns: 1fr; }
}

.sl-ind__stat {
  @include panel-green;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

.sl-ind__stat-title {
  color: $c-white;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.25;
  white-space: pre-line;

  @include below-desktop { font-size: 14px; }
}

.sl-ind__stat-body { display: flex; align-items: flex-end; gap: 10px; min-height: 118px; }
.sl-ind__stat-left { display: flex; flex: 0 0 auto; flex-direction: column; gap: 4px; }

.sl-ind__note {
  max-width: 120px;
  color: $c-accent;
  font-size: 10px;
  line-height: 1.3;
}
</style>
