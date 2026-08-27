<script setup>
import uzMap from '@/assets/slides/uz-map.webp'
import itVisa from '@/assets/slides/it-visa.svg'
import datavolt from '@/assets/slides/datavolt.webp'

const icons = import.meta.glob('@/assets/slides/icons/*.{svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const icon = (n) => icons[Object.keys(icons).find((k) => k.includes(`/${n}.`))]

const TAXES = [
  ['0%', 'Corporate taxes'], ['0%', 'Social tax'], ['0%', 'Property & land tax'],
  ['NO', 'VAT on imported services'], ['5%', 'Tax on dividends'], ['7.5%', 'Personal income tax'],
]
const REIMBURSE = [
  { icon: 'exp-office', text: 'Free office for 1 year' },
  { icon: 'exp-equipment', text: 'Technical Equipment for 1 year' },
]
const ENERGY = [
  { value: '9.3 GW', text: 'Major green, wind-powered energy capacity', tag: 'Wind farms' },
  { value: '1 885 km', text: 'Extensive high-voltage transmission network', tag: 'Electricity grid' },
]
const TERMS = [
  { value: '$0.05 kWh', text: 'Competitive electricity rate' },
  { value: '$0.08-$0.12', text: 'Low-cost water supply' },
]
const SOFTLANDING = [
  { icon: 'soft-bank', lead: '3 days', text: 'Company registration' },
  { icon: 'soft-accounting', lead: 'Banking', text: 'support' },
  { icon: 'soft-talent', lead: 'Turnkey Accounting and Legal', text: 'Services' },
  { icon: 'soft-extra', lead: 'Talent and Staff', text: 'Recruitment' },
]
const VISA = [
  { icon: 'visa-permit', text: 'No work permit' },
  { icon: 'visa-salary', text: 'Salary in foreign currency' },
  { icon: 'visa-dividend', text: 'Dividends in foreign currency' },
]
const CUSTOMS = [
  { title: 'Fast-track construction', text: 'Accelerated Design-Procure-Build with streamlined land allocation in region' },
  { title: 'Direct international payments', text: 'Cross-border transactions without local bank intermediaries' },
]
</script>

<template>
  <div class="sl-exp">
    <!-- 1-qator -->
    <div class="sl-exp__row">
      <section class="sl-exp__panel sl-exp__panel--blue sl-exp__taxes">
        <h3 class="sl-exp__h sl-exp__h--accent">Benefits for IT Park<br />Member Companies</h3>
        <ul>
          <li v-for="[pct, label] in TAXES" :key="label">
            <b>{{ pct }}</b><span>{{ label }}</span>
          </li>
        </ul>
      </section>

      <section class="sl-exp__panel sl-exp__panel--blue">
        <h3 class="sl-exp__h"><b>Zero risk</b> Expense Reimbursement</h3>
        <ul class="sl-exp__rows">
          <li v-for="r in REIMBURSE" :key="r.text">
            <img :src="icon(r.icon)" alt="" width="36" height="36" loading="lazy" decoding="async" />
            {{ r.text }}
          </li>
        </ul>
      </section>

      <section class="sl-exp__panel sl-exp__panel--green sl-exp__energy">
        <div class="sl-exp__energy-top">
          <img
            class="sl-exp__uzmap"
            :src="uzMap"
            alt="Map of Uzbekistan"
            width="191"
            height="138"
            loading="lazy"
            decoding="async"
          />
          <ul>
            <li v-for="e in ENERGY" :key="e.tag">
              <span class="sl-exp__tag">{{ e.tag }}</span>
              <b>{{ e.value }}</b>
              <em>{{ e.text }}</em>
            </li>
          </ul>
        </div>
        <h4 class="sl-exp__terms-title">Special terms</h4>
        <ul class="sl-exp__terms">
          <li v-for="t in TERMS" :key="t.value">
            <b>{{ t.value }}</b>
            <em>{{ t.text }}</em>
          </li>
        </ul>
      </section>
    </div>

    <!-- 2-qator -->
    <div class="sl-exp__row">
      <section class="sl-exp__panel sl-exp__panel--green">
        <h3 class="sl-exp__h"><b>Softlanding</b> support</h3>
        <ul class="sl-exp__rows">
          <li v-for="s in SOFTLANDING" :key="s.lead">
            <img :src="icon(s.icon)" alt="" width="24" height="24" loading="lazy" decoding="async" />
            <span><b>{{ s.lead }}</b> {{ s.text }}</span>
          </li>
        </ul>
      </section>

      <section class="sl-exp__panel sl-exp__panel--blue">
        <img class="sl-exp__visa" :src="itVisa" alt="IT-VISA powered by IT Park" width="150" height="41" loading="lazy" decoding="async" />
        <ul class="sl-exp__rows">
          <li v-for="v in VISA" :key="v.text">
            <img :src="icon(v.icon)" alt="" width="24" height="24" loading="lazy" decoding="async" />
            {{ v.text }}
          </li>
        </ul>
      </section>

      <section class="sl-exp__panel sl-exp__panel--green sl-exp__dc">
        <div class="sl-exp__dc-top">
          <p class="sl-exp__dc-card">Turn your Data Center into the cutting edge infrastructure for AI &amp; MINING</p>
          <div class="sl-exp__dc-card sl-exp__dc-volt">
            <img :src="datavolt" alt="Datavolt" width="130" height="36" loading="lazy" decoding="async" />
            <dl>
              <div><dt>Capacity</dt><dd>500+ MW</dd></div>
              <div><dt>Investment</dt><dd>$6.5B</dd></div>
            </dl>
          </div>
          <div class="sl-exp__dc-card sl-exp__dc-invest">
            <b>$100M+</b>
            <span>Investment in AI infrostructore</span>
          </div>
        </div>

        <p class="sl-exp__customs"><b>No customs &amp; vat</b> Imported servers/gpus exempt from taxes</p>

        <ul class="sl-exp__customs-list">
          <li v-for="c in CUSTOMS" :key="c.title">
            <b>{{ c.title }}</b>
            <span>{{ c.text }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sl-exp { display: flex; flex-direction: column; gap: 16px; }

.sl-exp__row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 16px;

  @include tablet { grid-template-columns: 1fr 1fr; }
  @include mobile { grid-template-columns: 1fr; gap: 10px; }
}

.sl-exp__panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 17px;

  &--green { @include panel-green; }
  &--blue { @include panel-blue; }

  @include below-desktop { padding: 12px; gap: 10px; }
}

/* 3-ustun ikki qatorni egallaydi (planshetda) */
.sl-exp__energy, .sl-exp__dc {
  @include tablet { grid-column: span 2; }
}

.sl-exp__h {
  color: $c-white;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.28;
  text-align: center;
  text-transform: uppercase;

  b { color: $c-accent; }

  /* Figmada bu sarlavha to'liq mint gradient bilan */
  &--accent {
    background: linear-gradient(90deg, $c-accent 0%, #329c67 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @include below-desktop { font-size: 13px; }
}

/* --- Soliqlar --- */
.sl-exp__taxes ul { display: flex; flex-direction: column; gap: 8px; }

.sl-exp__taxes li {
  display: flex;
  align-items: baseline;
  gap: 12px;
  color: $c-white;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;

  b { flex: none; width: 34px; color: $c-accent; font-size: 12px; font-weight: 800; }
}

/* --- Ikonkali qatorlar --- */
.sl-exp__rows { display: flex; flex-direction: column; gap: 8px; }

.sl-exp__rows li {
  @include panel-outline;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: $c-white;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.3;

  b { color: $c-accent; font-weight: 700; }
  img { flex: none; }
}

/* --- Energiya --- */
.sl-exp__energy-top { display: flex; gap: 12px; }

.sl-exp__uzmap {
  flex: 0 0 191px;
  align-self: stretch;
  width: 191px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;

  @include tablet { flex-basis: 150px; width: 150px; }
  @include mobile { flex-basis: 110px; width: 110px; }
}

.sl-exp__energy-top ul { display: flex; flex: 1; flex-direction: column; gap: 8px; min-width: 0; }

.sl-exp__energy-top li {
  @include panel-outline;
  position: relative;
  padding: 8px 12px;

  b { display: block; color: $c-accent; font-size: 17px; font-weight: 700; }
  em { color: $c-white; font-size: 10.5px; font-style: normal; }
}

.sl-exp__tag {
  position: absolute;
  top: 6px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 5px;
  background: $c-accent;
  color: $c-navy;
  font-size: 9.5px;
  font-weight: 600;
}

.sl-exp__terms-title {
  color: $c-accent;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.sl-exp__terms {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  li {
    @include panel-outline;
    padding: 8px 12px;
    background: rgba(132, 255, 193, 0.12);
  }

  b { display: block; color: $c-white; font-size: 12.5px; font-weight: 700; }
  em { color: $c-white; font-size: 10px; font-style: normal; }
}

/* --- Data center --- */
.sl-exp__dc-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @include mobile { grid-template-columns: 1fr; }
}

.sl-exp__dc-card {
  @include panel-outline;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  color: $c-white;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.18;
  text-align: center;
}

.sl-exp__dc-volt {
  img { width: 100%; max-width: 130px; height: auto; }

  dl { display: flex; gap: 12px; }
  dt { color: $c-white; font-size: 8.5px; font-weight: 700; text-transform: uppercase; }
  dd { margin: 0; color: $c-accent; font-size: 15px; font-weight: 700; }
}

.sl-exp__dc-invest {
  b { color: $c-accent; font-size: 20px; font-weight: 700; }
  span { color: $c-white; font-size: 15px; font-weight: 700; line-height: 1.18; }
}

.sl-exp__customs {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  color: $c-white;
  font-size: 11px;
  font-weight: 500;

  b {
    color: $c-accent;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 0 24px rgba(207, 255, 139, 0.26);
  }
}

.sl-exp__customs-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  li { @include panel-outline; padding: 10px 12px; }
  b { display: block; color: $c-accent; font-size: 12px; font-weight: 700; }
  span { color: $c-white; font-size: 10.5px; line-height: 1.3; }

  @include mobile { grid-template-columns: 1fr; }
}
</style>
