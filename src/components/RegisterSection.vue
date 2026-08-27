<script setup>
import { ref } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'

const TRACKS = [
  'Enterprise Uzbekistan',
  'Startup & VC',
  'Service Companies',
  'Global Bridge',
  'Gamedev',
  'AI Native',
]

const SOURCES = [
  'Online Advertisement (Instagram, Facebook, LinkedIn, Google)',
  'Partner Network',
  'IT Park Representative',
  'Organic Search / Website',
]

const CATEGORIES = [
  'Startup founder',
  'Investor / VC',
  'Enterprise / Corporate',
  'Service company',
  'Government / Public sector',
  'Media',
  'Other',
]

const COUNTRIES = [
  'Uzbekistan', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Azerbaijan',
  'Türkiye', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'India', 'China',
  'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Indonesia', 'United Kingdom',
  'Germany', 'France', 'Netherlands', 'Poland', 'Italy', 'Spain', 'Switzerland',
  'United States', 'Canada', 'Brazil', 'Australia', 'Other',
]

const LEFT_FIELDS = [
  { id: 'full-name', label: 'Full name', type: 'text', placeholder: 'e.g. John Doe', autocomplete: 'name', required: true },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'e.g. alex@company.com', autocomplete: 'email', required: true },
  { id: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Tech Global Inc.', autocomplete: 'organization' },
  { id: 'category', label: 'I am attending as', placeholder: 'Select category...', options: CATEGORIES },
  { id: 'source', label: 'How did you hear about us?', placeholder: 'Select source...', options: SOURCES },
]

const RIGHT_FIELDS = [
  { id: 'country', label: 'Country', placeholder: 'Select country...', options: COUNTRIES },
  { id: 'phone', label: 'Phone number', type: 'tel', placeholder: 'e.g. +1 (555) 019-2834', autocomplete: 'tel' },
  { id: 'position', label: 'Position', type: 'text', placeholder: 'e.g. Managing Director', autocomplete: 'organization-title' },
  { id: 'tracks', label: 'Event track(s) you plan to attend (Select all that apply)', placeholder: 'Select track(s)...', options: TRACKS },
  { id: 'focal-point', label: 'Name of focal point in IT Park (if available)', type: 'text', placeholder: 'e.g. Contact person or team member name' },
]

// Figmada maydonlar ustunlar bo'yicha joylashgan: chap ustun to'liq,
// keyin o'ng ustun. CSS grid ustun bo'ylab to'ldiradi (grid-auto-flow: column).
const FIELDS = [...LEFT_FIELDS, ...RIGHT_FIELDS]

const submitted = ref(false)
const onSubmit = () => { submitted.value = true }
</script>

<template>
  <section id="register" class="register" aria-labelledby="register-title">
    <header class="register__header">
      <h2 id="register-title" class="register__title">Register for ICTWEEK Uzbekistan 2026</h2>
      <p class="register__subtitle">
        Join global tech leaders, enterprise delegates, and investors in Tashkent.
        Complete your details below to secure your pass.
      </p>
    </header>

    <form class="register__form" novalidate="false" @submit.prevent="onSubmit">
      <div class="register__grid">
        <div v-for="field in FIELDS" :key="field.id" class="register__field">
          <label class="register__label" :for="field.id">{{ field.label }}</label>

          <select v-if="field.options" :id="field.id" class="register__input" :name="field.id">
            <option value="" selected>{{ field.placeholder }}</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>

          <input
            v-else
            :id="field.id"
            class="register__input"
            :name="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            :required="field.required"
          />
        </div>
      </div>

      <div class="register__consent">
        <input id="consent" class="register__checkbox" type="checkbox" name="consent" required />
        <label for="consent">
          Yes, I agree that IT Park Uzbekistan team may contact me by e-mail to inquire about my
          request, and I am aware that my shared personal data will be saved.
        </label>
      </div>

      <div class="register__actions">
        <p v-if="submitted" class="register__success" role="status">
          Thank you! Your registration has been received.
        </p>
        <button class="register__submit" type="submit">
          Register now
          <BaseIcon name="arrow-up-right" :size="24" />
        </button>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 36px 56px 56px;
  border-radius: $r-xl;
  background: $c-card;

  @include below-desktop { gap: 24px; padding: 20px; }
  @include mobile {
    gap: 24px;
    padding: 32px 16px 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $r-lg;
  }
}

.register__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 894px;

  @include mobile { gap: 8px; }
}

.register__title {
  color: $c-heading;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;
  text-align: center;

  @include tablet { font-size: 28px; line-height: 33.6px; }
  @include mobile { font-size: 24px; font-weight: 800; line-height: 28.8px; }
}

.register__subtitle {
  max-width: 740px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;

  @include tablet { font-size: 14px; line-height: 16.8px; }
  @include mobile { color: $c-muted; font-size: 14px; line-height: 19.6px; }
}

.register__form {
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;

  @include below-desktop { gap: 24px; }
}

.register__grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  gap: 16px 32px;

  @include mobile {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 16px;
  }
}

.register__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.register__label {
  color: $c-white;
  font-size: 13.27px;
  font-weight: 600;
  line-height: 18.58px;
}

.register__input {
  width: 100%;
  height: 40px;
  padding: 12px;
  border: 0;
  border-radius: $r-sm;
  background: rgba(255, 255, 255, 0.08);
  color: $c-white;
  font-size: 12px;
  font-weight: 500;
  line-height: 16.39px;

  &::placeholder { color: $c-slate; }

  /* select uchun o'q ikonkasi */
  &:is(select) {
    appearance: none;
    padding-right: 34px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a4a7ae' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  /* Placeholder holatidagi select kulrang ko'rinadi */
  &:has(option[value='']:checked) { color: $c-slate; }

  option { background: $c-navy; color: $c-white; }
}

.register__consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: $c-white;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.86px;

  @include below-desktop { font-size: 13px; line-height: 18px; }
}

.register__checkbox {
  flex: none;
  width: 15px;
  height: 15px;
  margin: 3px 2px;
  accent-color: $c-accent;
}

.register__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  @include mobile { flex-direction: column-reverse; align-items: stretch; }
}

.register__success {
  color: $c-accent;
  font-size: 15px;
  font-weight: 600;
}

.register__submit {
  @include btn-solid;
  gap: 4px;
  height: 52px;
  padding: 0 16px 0 20px;
  font-size: 18px;
  line-height: 32px;

  @include mobile { justify-content: center; width: 100%; }
}
</style>
