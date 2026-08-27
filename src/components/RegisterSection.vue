<script setup>
import { computed, reactive, ref } from 'vue'
import BaseIcon from './ui/BaseIcon.vue'
import { navigate } from '@/composables/useRoute'

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

// Figmada maydonlar ustunlar bo'yicha joylashgan: avval chap ustun to'liq,
// keyin o'ng ustun. CSS grid ustun bo'ylab to'ldiradi (grid-auto-flow: column).
// `required: false` — Figmada "(if available)" deb belgilangan yagona maydon.
const FIELDS = [
  { id: 'full-name', label: 'Full name', type: 'text', placeholder: 'e.g. John Doe', autocomplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'e.g. alex@company.com', autocomplete: 'email' },
  { id: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Tech Global Inc.', autocomplete: 'organization' },
  { id: 'category', label: 'I am attending as', placeholder: 'Select category...', options: CATEGORIES },
  { id: 'source', label: 'How did you hear about us?', placeholder: 'Select source...', options: SOURCES },
  { id: 'country', label: 'Country', placeholder: 'Select country...', options: COUNTRIES },
  { id: 'phone', label: 'Phone number', type: 'tel', placeholder: 'e.g. +1 (555) 019-2834', autocomplete: 'tel' },
  { id: 'position', label: 'Position', type: 'text', placeholder: 'e.g. Managing Director', autocomplete: 'organization-title' },
  { id: 'tracks', label: 'Event track(s) you plan to attend (Select all that apply)', placeholder: 'Select track(s)...', options: TRACKS },
  { id: 'focal-point', label: 'Name of focal point in IT Park (if available)', type: 'text', placeholder: 'e.g. Contact person or team member name', required: false },
]

const values = reactive(Object.fromEntries(FIELDS.map((f) => [f.id, ''])))
const consent = ref(false)
/** Xatolar faqat "Register now" bosilgandan keyin ko'rsatiladi */
const showErrors = ref(false)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const errors = computed(() => {
  const out = {}
  for (const f of FIELDS) {
    if (f.required === false) continue
    const v = values[f.id].trim()
    if (!v) out[f.id] = f.options ? 'Please choose an option' : 'This field is required'
    else if (f.type === 'email' && !EMAIL_RE.test(v)) out[f.id] = 'Enter a valid email address'
    else if (f.type === 'tel' && v.replace(/\D/g, '').length < 7) out[f.id] = 'Enter a valid phone number'
  }
  if (!consent.value) out.consent = 'Please accept the terms to continue'
  return out
})

const isValid = computed(() => Object.keys(errors.value).length === 0)
const missingCount = computed(() => Object.keys(errors.value).length)

const onSubmit = () => {
  if (!isValid.value) {
    showErrors.value = true
    // Birinchi to'ldirilmagan maydonga fokusni ko'chiramiz
    const firstId = Object.keys(errors.value)[0]
    document.getElementById(firstId)?.focus()
    return
  }
  // Muvaffaqiyatli yuborilgach Figmadagi "Thank page" ga o'tamiz
  navigate('/thank-you')
}
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

    <form class="register__form" novalidate @submit.prevent="onSubmit">
      <div class="register__grid">
        <div v-for="field in FIELDS" :key="field.id" class="register__field">
          <label class="register__label" :for="field.id">
            {{ field.label }}
            <span v-if="field.required === false" class="register__optional">(optional)</span>
          </label>

          <select
            v-if="field.options"
            :id="field.id"
            v-model="values[field.id]"
            class="register__input"
            :class="{ 'is-invalid': showErrors && errors[field.id] }"
            :name="field.id"
            :aria-invalid="showErrors && Boolean(errors[field.id])"
            :aria-describedby="showErrors && errors[field.id] ? `${field.id}-error` : undefined"
          >
            <option value="">{{ field.placeholder }}</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>

          <input
            v-else
            :id="field.id"
            v-model="values[field.id]"
            class="register__input"
            :class="{ 'is-invalid': showErrors && errors[field.id] }"
            :name="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            :aria-invalid="showErrors && Boolean(errors[field.id])"
            :aria-describedby="showErrors && errors[field.id] ? `${field.id}-error` : undefined"
          />

          <p v-if="showErrors && errors[field.id]" :id="`${field.id}-error`" class="register__error">
            {{ errors[field.id] }}
          </p>
        </div>
      </div>

      <div class="register__consent">
        <input
          id="consent"
          v-model="consent"
          class="register__checkbox"
          :class="{ 'is-invalid': showErrors && errors.consent }"
          type="checkbox"
          name="consent"
          :aria-invalid="showErrors && Boolean(errors.consent)"
          :aria-describedby="showErrors && errors.consent ? 'consent-error' : undefined"
        />
        <label for="consent">
          Yes, I agree that IT Park Uzbekistan team may contact me by e-mail to inquire about my
          request, and I am aware that my shared personal data will be saved.
        </label>
      </div>

      <p v-if="showErrors && errors.consent" id="consent-error" class="register__error">
        {{ errors.consent }}
      </p>

      <p id="submit-hint" class="visually-hidden">
        {{ isValid ? 'All required fields are complete.' : `${missingCount} required fields still need to be completed.` }}
      </p>

      <div class="register__actions">
        <p v-if="showErrors && !isValid" class="register__summary" role="alert">
          Please complete {{ missingCount }} highlighted
          {{ missingCount === 1 ? 'field' : 'fields' }} above.
        </p>

        <!-- Tugma ataylab `disabled` emas: bosilganda qaysi maydon
             yetishmayotganini aytishi kerak. Faqat ko'rinishi "o'chiq". -->
        <button
          class="register__submit"
          :class="{ 'is-locked': !isValid }"
          type="submit"
          aria-describedby="submit-hint"
        >
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

.register__optional {
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
}

/* --- Xato holati --- */
.register__error {
  color: #ff9b9b;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.35;
  animation: err-in 0.25s ease;
}

@keyframes err-in {
  from { opacity: 0; transform: translateY(-3px); }
}

.register__summary {
  flex: 1;
  color: #ff9b9b;
  font-size: 13px;
  font-weight: 600;
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
  transition: background-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder { color: $c-slate; }

  &:hover { background: rgba(255, 255, 255, 0.11); }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 2px rgba(132, 255, 193, 0.55);
  }

  &.is-invalid {
    box-shadow: 0 0 0 1.5px rgba(255, 155, 155, 0.75);

    &:focus { box-shadow: 0 0 0 2px rgba(255, 155, 155, 0.9); }
  }

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

  &.is-invalid { outline: 1.5px solid rgba(255, 155, 155, 0.85); outline-offset: 2px; }
}

.register__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  @include mobile { flex-direction: column; align-items: stretch; }
}

.register__submit {
  @include btn-solid;
  gap: 4px;
  height: 52px;
  padding: 0 16px 0 20px;
  font-size: 18px;
  line-height: 32px;
  transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1), filter 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(132, 255, 193, 0.28);
  }

  &:active { transform: translateY(0) scale(0.98); }

  /* Forma to'liq to'ldirilmaguncha tugma "o'chiq" ko'rinadi.
     `disabled` emas — bosilganda qaysi maydon yetishmayotganini aytishi kerak. */
  &.is-locked {
    background: rgba(132, 255, 193, 0.28);
    color: rgba(18, 27, 38, 0.55);
    cursor: not-allowed;

    &:hover { transform: none; box-shadow: none; filter: none; }
    &:active { transform: none; }
  }

  @include mobile { justify-content: center; width: 100%; }
}
</style>
