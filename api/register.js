/**
 * ICT WEEK 2026 — ro'yxatdan o'tish formasi.
 *
 * Vercel serverless funksiyasi. Ma'lumotni Google Sheets'ga (Apps Script
 * webhook orqali) yozadi va ixtiyoriy ravishda Telegram'ga xabar yuboradi.
 * Maxfiy URL va tokenlar shu yerda qoladi — brauzerga chiqmaydi.
 *
 * Kerakli muhit o'zgaruvchilari (Vercel → Settings → Environment Variables):
 *   SHEETS_WEBHOOK_URL   — Google Apps Script veb-ilova URL'i (majburiy)
 *   TELEGRAM_BOT_TOKEN   — ixtiyoriy
 *   TELEGRAM_CHAT_ID     — ixtiyoriy
 */

const FIELDS = {
  fullName: 'Full name',
  email: 'Email',
  company: 'Company',
  category: 'I am attending as',
  country: 'Country',
  phone: 'Phone number',
  position: 'Position',
  tracks: 'Event tracks',
  source: 'How did you hear about us',
  focalPoint: 'Focal point in IT Park',
}

const REQUIRED = ['fullName', 'email', 'company', 'category', 'country', 'phone', 'position', 'tracks', 'source']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_LEN = 300

const clean = (v) => String(v ?? '').trim().slice(0, MAX_LEN)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Honeypot: odam ko'rmaydigan maydon to'ldirilgan bo'lsa — bot.
  // Botga xato qaytarmaymiz, shunchaki jim "ok" deymiz.
  if (clean(body.website)) return res.status(200).json({ ok: true })

  const data = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, clean(body[k])]))

  const missing = REQUIRED.filter((k) => !data[k])
  if (missing.length) return res.status(400).json({ error: 'missing_fields', fields: missing })
  if (!EMAIL_RE.test(data.email)) return res.status(400).json({ error: 'invalid_email' })
  if (body.consent !== true) return res.status(400).json({ error: 'consent_required' })

  const record = {
    ...data,
    submittedAt: new Date().toISOString(),
    source_ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? '',
  }

  const webhook = process.env.SHEETS_WEBHOOK_URL
  if (!webhook) {
    // Hali sozlanmagan — ariza yo'qolmasligi uchun logga yozamiz
    console.warn('SHEETS_WEBHOOK_URL sozlanmagan. Ariza:', JSON.stringify(record))
    return res.status(200).json({ ok: true, stored: false })
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)

    // Apps Script ichki xatoda ham HTTP 200 qaytaradi — javob tanasini
    // ham tekshirish shart, aks holda nosozlik sezilmay qoladi.
    const text = await r.text()
    let payload
    try {
      payload = JSON.parse(text)
    } catch {
      throw new Error(`JSON emas: ${text.slice(0, 200)}`)
    }
    if (!payload.ok) throw new Error(`Apps Script: ${payload.error || 'noma\'lum xato'}`)
  } catch (err) {
    console.error('Google Sheets xatosi:', err, JSON.stringify(record))
    return res.status(502).json({ error: 'storage_failed' })
  }

  notifyTelegram(record)

  return res.status(200).json({ ok: true, stored: true })
}

function safeParse(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}

/** Telegram xabari — yuborilmasa ham ariza allaqachon saqlangan bo'ladi */
function notifyTelegram(r) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return

  const text =
    `🎟 <b>Yangi ro'yxatdan o'tish</b>\n\n` +
    Object.entries(FIELDS)
      .filter(([k]) => r[k])
      .map(([k, label]) => `<b>${label}:</b> ${escapeHtml(r[k])}`)
      .join('\n')

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML' }),
  }).catch((err) => console.error('Telegram xatosi:', err))
}

const escapeHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
