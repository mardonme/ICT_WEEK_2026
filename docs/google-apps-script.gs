/**
 * ICT WEEK 2026 — ro'yxatdan o'tish arizalarini Google Sheets'ga yozadi.
 *
 * O'RNATISH:
 *  1. Google Sheets'da yangi jadval yarating
 *  2. Extensions → Apps Script
 *  3. Shu kodni to'liq nusxalab qo'ying (avvalgisini o'chiring)
 *  4. Deploy → New deployment → gear ⚙ → Web app
 *       Execute as:      Me
 *       Who has access:  Anyone
 *  5. Chiqqan URL'ni nusxalang (https://script.google.com/macros/s/.../exec)
 *  6. Vercel → Settings → Environment Variables →
 *       SHEETS_WEBHOOK_URL = o'sha URL
 *  7. Vercel'da qayta deploy qiling
 */

const SHEET_NAME = 'Registrations'

const COLUMNS = [
  ['submittedAt', 'Vaqt'],
  ['fullName', 'Ism familiya'],
  ['email', 'Email'],
  ['company', 'Kompaniya'],
  ['position', 'Lavozim'],
  ['category', 'Kim sifatida'],
  ['country', 'Davlat'],
  ['phone', 'Telefon'],
  ['tracks', "Yo'nalish"],
  ['source', 'Qayerdan bildi'],
  ['focalPoint', 'IT Park vakili'],
  ['source_ip', 'IP'],
]

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = getSheet()
    sheet.appendRow(
      COLUMNS.map(([key]) =>
        key === 'submittedAt' ? new Date(data.submittedAt || Date.now()) : data[key] || ''
      )
    )
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    const headers = COLUMNS.map(([, label]) => label)
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.autoResizeColumns(1, headers.length)
  }
  return sheet
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}
