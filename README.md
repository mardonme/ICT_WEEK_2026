# ICT WEEK 2026 — Home Page

Figma dizayni asosida pixel-perfect ishlab chiqilgan **ICT WEEK Uzbekistan 2026** bosh sahifasi.

**Stack:** Vue 3 (Composition API, `<script setup>`) · Vite · SCSS · shriftlar o'z serverimizda

---

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ ga yig'ish
npm run preview  # yig'ilgan versiyani ko'rish
```

Node.js 20+ talab qilinadi.

---

## Tuzilma

```
src/
├── App.vue                    # Sahifa qobig'i + fon dekoratsiyasi
├── main.js
├── composables/
│   ├── useCountdown.js        # Tadbirgacha qolgan vaqt
│   └── useRoute.js            # History API asosidagi yengil marshrutlash
├── components/
│   ├── AppHeader.vue          # Navbar (desktop / planshet / mobil)
│   ├── HeroSection.vue        # Sarlavha, video, countdown, yutuqlar
│   ├── SaveSpotSection.vue
│   ├── PastAttendeesSection.vue
│   ├── SummitSection.vue      # Tab'lar + summit kartasi
│   ├── StartupsSection.vue    # Dasturlar karuseli (4 slayd)
│   ├── slides/                # Karusel slaydlari + BarChart
│   ├── PartnersSection.vue
│   ├── RegisterSection.vue    # Ro'yxatdan o'tish formasi
│   └── ui/
│       ├── BaseIcon.vue       # Inline SVG ikonkalar to'plami
│       └── LogoCard.vue       # Gradient chegarali logo kartasi
├── styles/
│   ├── _tokens.scss           # Figmadan olingan ranglar, radiuslar, breakpointlar
│   ├── _mixins.scss           # Media query, konteyner, gradient-border, tugmalar
│   ├── _fonts.scss            # Manrope (woff2, o'z serverimizda)
│   └── main.scss              # Reset + a11y bazasi
└── assets/                    # WebP rasmlar, SVG logolar, shriftlar
```

`_tokens.scss` va `_mixins.scss` Vite orqali har bir SCSS fayliga avtomatik ulanadi
(`vite.config.js` → `css.preprocessorOptions`), shuning uchun komponentlarda `@use` yozish shart emas.

---

## Responsive

Figmadagi uchta frame'ga mos breakpointlar:

| Versiya  | Figma frame | CSS diapazon      | Konteyner |
|----------|-------------|-------------------|-----------|
| Desktop  | 1440 px     | ≥ 1024 px         | 1280 px   |
| Planshet | 720 px      | 641 – 1023 px     | 656 px    |
| Mobil    | 390 px      | ≤ 640 px          | to'liq    |

---

## Assetlar

Barcha rasm va logolar Figma REST API orqali eksport qilingan, so'ng optimallashtirilgan:
fotolar → WebP, logolar → SVG (svgo bilan minifikatsiya) yoki alfa kanalli WebP.
Umumiy hajm **34.6 MB → ~600 KB** ga tushirilgan.

Manrope shrifti `woff2` variable format'da o'z serverimizda saqlanadi (24 KB latin + 15 KB latin-ext),
`font-display: swap` bilan — tashqi so'rovlarsiz.

---

## Deploy

Vercel uchun `vercel.json` tayyor: SPA rewrite, `assets/*` uchun `immutable` cache
va xavfsizlik header'lari (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).

```bash
npx vercel --prod
```
