# design.md — Design Document Landing Page SyntaxLab

**Versi:** 2.0 · **Tanggal:** 27 Sep 2026 · **Status:** Draft — menunggu review owner
**Pasangan:** `PRD.md` v2.0 · **Konteks produk:** `PRODUCT.md`

## Changelog v1.1 → v2.0

1. **Palet: emas/cream → teal + navy di atas paper** (sudah diimplementasi, kini didokumentasikan). Section terang & gelap bergantian menggantikan satu-surface terang.
2. **Tipografi: Plus Jakarta Sans + Instrument Serif → Geist (display & body) + JetBrains Mono (data/tag).** Satu sans, tanpa serif italic — permintaan "minimalis".
3. **Motion: framer-motion → GSAP + ScrollTrigger** (satu-satunya dependensi animasi).
4. **Backdrop Canvas "kontur" dihapus** — ambience cukup dari ritme terang/gelap + whitespace.
5. **Harga → Informasi** (PRD §6): satu harga "Mulai dari Rp500 ribu" + 6 alasan, editorial. Paket Rp750.000/Rp1.500.000 dihapus dari halaman (keputusan owner).
6. **Kontrak anti-AI diperketat** (§1) + checklist sweep per section (§1.1).

---

## 1. Kontrak Anti-AI & Prinsip

Setiap larangan mengikat; penyimpangan butuh alasan tertulis di changelog.

### Larangan

1. **Eyebrow label mono uppercase** ("01 / Layanan", "— Mulai proyek") — DIHAPUS. Section langsung H2. Berlaku untuk komponen `SectionLabel` **dan** label inline sejenis (Hero, FinalCta).
2. **Span teal di dalam heading** — DILARANG. Heading solid `ink` (terang) / `white` (gelap). Aksen teal hanya elemen fungsional: tombol, link, fokus, tag, garis aksen.
3. **All-caps ber-tracking lebar** (`tracking-[0.14em]`–`[0.2em]`) sebagai dekorasi — DIHAPUS di Testimonials, FAQ, FinalCta, Navbar, Footer, serta label hero/final-cta. Mono uppercase **diperbolehkan** hanya untuk data teknis pendek: tag teknologi, strip meta, angka proses, status badge.
4. **Angka urutan (01–04) netral** — bukan highlight teal.
5. **Animasi loop dekoratif** (ping, pulse, marquee) — DILARANG; gerak hanya menjawab aksi atau reveal masuk viewport.
6. **Tetap berlaku (v1.1):** gradien ungu-biru; glassmorphism non-fungsional; ikon generik lingkaran gradien; center-align semua section; emoji di body copy; blob/particle; glow pada semua card.
7. **Daftar berurutan tidak pakai kartu rounded seragam** — struktur informasi pakai baris hairline (berlaku untuk Alur & Informasi).

### Prinsip positif

1. Ritme terang/gelap + whitespace + hairline sebagai karakter utama.
2. Satu aksen teal, dipakai hemat dan fungsional.
3. Copy dari sudut pandang user; klaim generik dilarang.
4. Struktur = informasi: border/nomor hanya bila bermakna.

### 1.1 Checklist sweep per section (peta keputusan → file)

| # | Perubahan | File | Status |
|---|---|---|---|
| 1 | Ganti `Pricing` → `Info`: id `informasi`, harga "Mulai dari Rp500 ribu" + `priceNote` + 6 alasan (baris hairline bernomor netral) + CTA "Tanya harga via WhatsApp" (`site.wa`) | `content.js` (hapus `pricing`, tambah `info`), `sections/Pricing.jsx` → `Info.jsx`, `page.js` | ✅ |
| 2 | Nav: `{ href: "#harga", label: "Harga" }` → `{ href: "#informasi", label: "Informasi" }` | `content.js` | ✅ |
| 3 | Hapus komponen `SectionLabel` + semua pemakaian (01–06) | `ui/SectionLabel.jsx`, Services, Process, Pricing/Info, Portfolio, Testimonials, Faq | ✅ |
| 4 | Hapus `ui/StatusCard.jsx` (tak terpakai) + `animate-ping` pada status badge | `ui/StatusCard.jsx`, `Hero.jsx` | ✅ |
| 5 | Hapus label eyebrow inline mono uppercase di Hero & FinalCta | `Hero.jsx`, `FinalCta.jsx` | ✅ |
| 6 | Span teal di heading dihapus di SEMUA section: H1 `titleAccent`, Services "solusi", Process "drama", Portfolio "dipakai", Testimonials "klien", FAQ "diajukan", FinalCta `teal-soft` span; Navbar/Footer logo `Lab` tetap (itu wordmark) | masing-masing section | ✅ |
| 7 | Angka 01–04 (Services, Process, Portfolio) → netral: `text-faint` di terang, `text-white/40` di gelap | Services, Process, Portfolio | ✅ |
| 8 | Alur: 4 kartu rounded → 4 baris hairline (border antar baris) | `Process.jsx` | ✅ |
| 9 | Poster Hero "WE ARE YOUR SOLUTION" → kalimat biasa sentence-case ("Kami siap jadi solusimu.") | `content.js`, `Hero.jsx` | ✅ |
| 10 | Uppercase tracking lebar dekoratif → sentence-case: label "Rata-rata dari N ulasan", Footer headings "Jelajahi"/"Kontak" + meta bawah, kartu poster. Strip meta & tag teknologi = data, tetap mono uppercase (kontrak §3) | Testimonials, FinalCta, Footer, Hero | ✅ |
| 11 | Badge "Paling Populer" hilang (moot — kartu harga dihapus) | ikut `Pricing.jsx` | ✅ |

Checklist dijalankan 27 Sep 2026; `npm run build` lolos, grep nol sisa (`SectionLabel|StatusCard|animate-ping|pricing|#harga`).

---

## 2. Design System

### 2.1 Warna (token `@theme` di `globals.css` — sumber kebenaran)

| Token | Hex | Pakai |
|---|---|---|
| paper | `#fafaf8` | bg halaman terang |
| surface | `#ffffff` | card di section terang |
| line | `#e6e8ec` | hairline |
| ink | `#0b1120` | teks primer + bg section gelap |
| navy-2 | `#131c2e` | permukaan gelap sekunder |
| teal | `#0d9488` | aksen fungsional di gelap (link, tag, garis) |
| teal-deep | `#0a6e67` | CTA solid, bg FinalCta, teks aksen di terang |
| teal-soft | `#e7f5f3` | isian lembut (kartu rata-rata, isian terang) |
| muted | `#4a5565` | teks sekunder terang |
| faint | `#6d7079` | meta non-esensial |
| ok | `#0d9488` | status "siap menerima proyek" |

**Ritme section:** terang = Hero, Alur, Informasi, Testimoni, FAQ · gelap (`bg-ink`) = Layanan, Karya, Footer · band teal full-bleed = Final CTA.

### 2.2 Tipografi

- **Geist** (`next/font`, varian terang+gelap) — display & body. `--font-serif` di-remap ke Geist; italic tidak dipakai.
- **JetBrains Mono** — data: tag, meta strip, angka proses, status.
- **Skala:** h1 `clamp(2.75rem, 6.5vw, 5.5rem)` / 800 / -0.03em · h2 `clamp(2rem, 4.5vw, 3.5rem)` / 700 / -0.02em · h3 18–20px / 700 · body 17px / 1.65 · mono 11–13px.
- Heading **sentence-case** — tanpa uppercase dekoratif. Angka statistik: `tabular-nums`.

### 2.3 Spacing, radius, grid

- Skala 4pt. Section `py-24 lg:py-36` (wrapper `Section`). Container `max-w-6xl`, wide `max-w-7xl`, gutter `px-6`.
- Radius: card 14px, dalam 10px; pill penuh hanya tag/badge kecil.
- Alignment kiri sebagai default; center hanya jika ada alasan (v2.0: FinalCta rata kiri).
- Mobile-first, breakpoint Tailwind default.

---

## 3. Ritme Layout

Urutan di `page.js`:

```
Navbar → Hero(terang) → Layanan(gelap) → Alur(terang) → Informasi(terang)
→ Karya(gelap)+statistik → Testimoni(terang) → FAQ(terang)
→ Final CTA(teal-deep) → Footer(gelap) → BackToTop
```

Gelap/terang bergantian memberi ritme tanpa dekorasi. Satu-satunya band berwarna full-bleed: Final CTA. Alur & Informasi bersebelahan terang — ritme bertahan karena hairline rows + whitespace besar.

---

## 4. Wireframe per Section (v2.0 — tanpa SectionLabel)

```
HERO (terang)
┌──────────────────────────────────────────────────┐
│ nav: SyntaxLab | Karya Layanan Informasi Alur FAQ | [Hubungi Kami] │
│ H1: Website & Aplikasi kustom, cepat & rapi (solid ink)           │
│ sub · [Konsultasi Gratis via WhatsApp] · catatan biaya             │
│ meta: ● Siap Menerima Proyek Baru · tech list (mono, data)        │
│ kanan: kartu poster — KALIMAT BIASA (bukan ALL-CAPS slogan) + meta │
└──────────────────────────────────────────────────┘

LAYANAN (gelap)   H2 solid + intro · 4 kolom border-top hairline,
                  nomor netral · meta strip bawah (data, mono)
ALUR (terang)     H2 · estimasi 14–30 hari pojok kanan ·
                  4 BARIS hairline (bukan kartu) · catatan biaya siklus
INFORMASI (terang) H2 · "Mulai dari Rp500 ribu" + priceNote ·
                  daftar 6 alasan bernomor netral (hairline rows) ·
                  [Tanya harga via WhatsApp]
KARYA (gelap)     H2 · 3 phone mockup (SS clip rapi) · nomor kartu netral ·
                  statistik 3 kolom
TESTIMONI (terang) H2 · quote besar + kartu rata-rata teal-soft + 2 quote ·
                  strip teknologi (data mono)
FAQ (terang)      H2 · accordion max-w-3xl, aria-expanded/region
FINAL CTA (teal)  H2 besar rata kiri (solid white) · [CTA inverse] · link IG
FOOTER (gelap)    3 kolom: brand · Jelajahi · Kontak (sentence-case)
```

---

## 5. Motion (GSAP)

- Dependensi animasi **hanya `gsap`** (+ ScrollTrigger). Registrasi client-only di `src/lib/gsap.js`.
- **Reveal:** hook `useReveal` — fade + y 24px, 0.7s `power2.out`, `once`, start `"top 85%"`. Guard `prefers-reduced-motion` via `gsap.matchMedia` — elemen tidak pernah disembunyikan oleh CSS.
- **Hero:** stagger sekali saat mount; poster 3D ikut kursor (rotateY ±12°, `gsap.quickTo` lerp), hanya `hover:hover + pointer:fine` dan tanpa reduced-motion.
- **FAQ accordion:** CSS `grid-template-rows: 0fr → 1fr` (tanpa JS). Scroll halus: `scroll-behavior: smooth` + mati saat reduced-motion.
- **Dilarang:** parallax, marquee, loop dekoratif, layout animation berat.

---

## 6. Komponen & Struktur File (target v2.0)

```
src/
  app/layout.js          # Geist + JetBrains_Mono, metadata, lang="id"
  app/page.js            # komposisi section (diurutkan di §3)
  app/globals.css        # token @theme teal/navy — sumber kebenaran warna
  lib/content.js         # satu sumber konten (site, hero, services,
                         #   process, info, portfolio, stats, testimonials,
                         #   faqs, nav, footer)
  lib/gsap.js            # registrasi ScrollTrigger (client-only)
  lib/useReveal.js       # reveal GSAP + reduced-motion guard
  components/ui/         # Section, Section?, CTAButton, Reveal, BackToTop, icons
  components/sections/   # Navbar, Hero, Services, Process, Info,
                         # Portfolio, Testimonials, Faq, FinalCta, Footer
```

**Dihapus:** `ui/SectionLabel.jsx` (eyebrow), `ui/StatusCard.jsx` (tak terpakai), `Pricing.jsx` → `Info.jsx`. Sudah tidak ada sejak v2.0: `three/`, terminal, backdrop canvas, framer-motion.

**Aturan:** tanpa string hardcoded di komponen (konten dari `content.js`); ikon SVG inline; tanpa `console.log`/import mati.

---

## 7. Copy

- H1 & sub, hero poster, harga, nav — semua dari `content.js`. Poster hero = kalimat biasa sentence-case.
- Harga tampil di halaman **hanya** "Mulai dari Rp500 ribu" (PRD §6) — angka paket lama tidak muncul lagi.
- Testimoni/FAQ: teks asli klien (termasuk emoji) dipertahankan apa adanya.
- Dilarang klaim generik ("solusi terbaik, profesional, terpercaya, inovatif").

---

## 8. Aksesibilitas & Performa

- **A11y:** landmark (`header/main/footer`), tepat satu `h1`, alt deskriptif pada 3 PNG portfolio, kontras (teal-deep di terang, teal-soft/putih di gelap), `focus-visible` teal 2px outline, FAQ `aria-expanded` + `role="region"`, canvas tidak ada (n/a), reduced-motion dihormati (CSS global + `gsap.matchMedia`).
- **Performa:** `next/image` + `sizes`; font `swap`; tanpa CLS; GSAP ringan (~compress); target Lighthouse per PRD §3; verifikasi `npm run build` bersih.

---

## 9. Self-Critique (v2.0)

- v1.1 (emas/terang/framer-motion) tidak pernah terimplementasi penuh; kenyataan di lapangan sudah teal + GSAP. Dokumen diluruskan ke realitas — dokumentasi mengikuti kode, bukan sebaliknya.
- **Risiko pola baru:** "template dark/light alternation" memang pola umum. Dicegah oleh keputusan paling membedakan dari template AI: **tanpa span teal di heading, tanpa eyebrow mono, angka netral, baris hairline** (§1) + whitespace besar + konten jujur.
- Monospace tetap ada karena memuat data nyata (tag, angka) — mono dekoratif sudah dihapus.
