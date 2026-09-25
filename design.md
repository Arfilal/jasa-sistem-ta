# design.md — Design Document Redesign SyntaxLab

**Versi:** 1.1 · **Tanggal:** 26 Sep 2026 · **Status:** Draft — menunggu review owner
**Pasangan:** `PRD.md` v1.1 · **Referensi kualitas:** Stripe, Linear, Vercel, Raycast (benchmark, bukan tiruan)

## Changelog v1.0 → v1.1

1. **Arah tema: developer-terminal → company profile premium terang.** Satu surface terang (tanpa toggle). Alasan: audiens campuran termasuk UMKM/instansi awam teknis yang butuh kesan profesional & tepercaya.
2. **Terminal `status.js` dihapus** → status card (badge + checklist 2 kolom + baris garansi). §4, §7.
3. **Tipografi Opsi A sebagai default** (keputusan owner): Plus Jakarta Sans + Instrument Serif italic; JetBrains Mono dihapus; angka pakai `tabular-nums`. Opsi B/C didokumentasikan sebagai alternatif yang ditolak beserta alasannya. §2.2.
4. **Aksen oranye → emas/brass** (`#C9A254` grafis / `#7A5F1E` teks). Alasan: semantik radar sudah tidak ada; emas = hangat, premium, meyakinkan untuk klien bisnis. §2.1.
5. **§5 ditulis ulang: Canvas 2D "kontur topografi"** menggantikan radar Three.js (di-uninstall). Ambience restrained, budget performa eksplisit, guard reduced-motion/offscreen. §7, §9 menyesuaikan.
6. **Label `// komentar` → eyebrow sentence-case + hairline emas.** §2.2/§4.
7. Tidak berubah: urutan section + proof-early, konten terkunci PRD §6, motion restrained, seluruh larangan anti-slop (§1 berlaku penuh).

---

## 1. Prinsip & Anti-Slop Contract

Keputusan berikut mengikat implementasi. Setiap penyimpangan harus beralasan tertulis di PR.

1. **Satu elemen memorable, sisanya disiplin.** Yang boleh berkarakter hanya headline (serif italic aksen) + backdrop kontur yang nyaris tak terlihat bergerak. Section lain: hairline, tipe, whitespace.
2. **Struktur = informasi, bukan dekorasi.** Border, nomor, label hanya jika memuat makna. Angka (`01–05`) hanya di Alur Pemesanan (sekuens asli) — tidak di section lain.
3. **Larangan eksplisit:** gradien ungu-biru; glassmorphism non-fungsional; ikon generik dalam lingkaran gradien; center-align di semua section; font template (Inter/Poppins/Geist); emoji di body; bento tanpa hierarki; blob/particle field generik; glow neon di semua card; **khusus tema terang:** pola cream + terracotta generik (aksen dipakai hemat sesuai §2.1, bukan sebagai warna blok besar).
4. **Emas hanya di empat tempat:** CTA primer, marker kontur, eyebrow rule, satu highlight per section. Card lain memakai hairline `#E4DED2`, tanpa shadow (satu shadow lembut diizinkan untuk status card & kartu fitur portfolio).
5. **Copy dari sudut pandang user**, kalimat aktif, tanpa klaim generik ("solusi terbaik untuk kebutuhan Anda" dilarang).

> Kompromi brief-vs-skill (dipertahankan dari v1.0, disesuaikan): brief meminta scroll-reveal Framer Motion — dibatasi reveal opacity-only + satu momen hero (§6). Eyebrow kecil diminta netral: sentence-case + hairline, bukan ALL-CAPS generik, bukan gaya kode.

---

## 2. Design System

### 2.1 Warna — terang premium satu surface

Base: paper hangat terang; teks ink pekat. **Satu aksen** — emas brass, dipakai hemat (aturan §1.4). Dua kadar emas karena satu hex tidak lolos AA untuk teks di atas terang sekaligus tampil mewah sebagai grafis.

| Token | Hex | Pakai untuk |
|---|---|---|
| `paper` | `#FAF8F4` | background halaman |
| `panel` | `#FFFFFF` | card |
| `panel-2` | `#F3EFE6` | elemen raised (accordion, media portfolio) |
| `line` | `#E4DED2` | hairline border semua card |
| `ink` | `#1A1D21` | teks primer (kontras ±15:1) |
| `muted` | `#5C6470` | teks sekunder (kontras ±7:1) |
| `faint` | `#8A8F98` | meta non-esensial saja; **dilarang untuk body** |
| `gold` | `#C9A254` | grafis: CTA primer (dgn teks ink), marker kontur, eyebrow rule, satu highlight per section |
| `gold-deep` | `#7A5F1E` | teks aksen di atas terang (kontras ±5.5:1, lolos AA) |
| `ok` | `#1E9E6A` | dot status "siap menerima proyek" + semantik sukses saja (versi gelap agar kontras di terang) |
| `star` | `#9C6D00` | rating (konten, digelapkan agar terbaca di terang) |

CTA primer: bg `gold` + teks `ink` (kontras ±6.5:1). Tidak ada warna kedua untuk CTA.

### 2.2 Tipografi — Opsi A (default, keputusan owner)

**Opsi A — Plus Jakarta Sans + Instrument Serif italic (DIPILIH).**
Headline + body: Plus Jakarta Sans (500/600/700) — dirancang desainer Indonesia (relevansi audiens), geometris-humanis, sangat terbaca, profesional tanpa techy. Aksen: Instrument Serif italic (400) hanya untuk 1 frasa kunci per headline — sentuhan editorial premium. Angka harga: `font-variant-numeric: tabular-nums` (presisi tanpa font mono).

**Opsi B — DITOLAK: Fraunces (headline) + Instrument Sans (body).**
Alasan penolakan: terlalu formal/korporat-tua untuk audiens yang separuhnya mahasiswa; serif penuh di headline panjang Indonesia melelahkan dibaca di mobile.

**Opsi C — DITOLAK: DM Serif Display + DM Sans.**
Alasan penolakan: kohesif tapi aman-generik; DM Serif terlalu sering dipakai template premium sehingga gagal uji "terasa dibuat dengan sengaja".

Keduanya via `next/font` (`display: swap`), tanpa dependensi font baru.

Skala (mobile-first, `clamp`): h1 `clamp(2.5rem, 6vw, 4rem)` / 700 / `-0.02em` (frasa aksen serif italic 400); h2 `clamp(1.75rem, 3.5vw, 2.5rem)` / 700; h3 `1.25rem` / 600; body `1rem–1.0625rem` / `1.7`; eyebrow `0.8125rem` sentence-case. Panjang baris body < 80 karakter.

**Eyebrow section (pengganti `// komentar`):** sans 13px, `gold-deep`, sentence-case, diawali hairline emas 24px — contoh: `— Karya nyata`. Netral-profesional, bukan gaya kode, bukan ALL-CAPS template.

### 2.3 Spacing, radius, breakpoint, grid

- Skala 4pt: `4/8/12/16/24/32/48/64/96/128/160`. Section: `py-24` mobile / `py-32` desktop.
- Container `max-w-6xl` (gutter `px-6`); portfolio `max-w-7xl` (satu pengecualian: gambar butuh napas).
- Radius: card `14px`, elemen dalam `10px`, tombol `10px`. Satu radius, konsisten.
- Breakpoint Tailwind default; grid 12 kolom desktop, 1 kolom mobile. Alignment default **kiri**; center hanya final CTA.

---

## 3. Ritme Layout (anti-monoton)

Urutan section sesuai PRD §5. Yang berubah di v1.1 hanya Hero; sisanya tetap dengan `signal` → `gold`:

- **Hero (BARU):** backdrop kontur full-bleed di belakang; konten kiri: eyebrow, H1 (dengan frasa serif italic), sub, CTA + mikro-note, lalu status card (badge + checklist 2 kolom + garansi). Mobile: susun vertikal, backdrop menipis (opacity dikurangi).
- **Tech strip:** satu baris horizontal (wrap) item sans + penanda kotak emas kecil, tanpa card.
- **Portfolio:** kartu fitur besar #1 (horizontal, gambar kiri) + dua kartu offset (satu turun di desktop) — hierarki = prioritas.
- **Layanan:** 3 kolom; kolom tengah highlight hairline `gold` (Sistem Informasi = revenue utama). Penanda tiap layanan: hairline emas 24px + judul (bukan ikon, bukan marker kode).
- **Harga:** 2 kolom tak simetris (5:7); angka harga `tabular-nums`, paket Bisnis highlight emas.
- **Alur:** timeline bernomor satu-satunya (horizontal → vertikal).
- **Testimoni:** grid 3, rating `★★★★★` teks warna `star`.
- **FAQ:** satu kolom `max-w-3xl`, kiri.
- **Final CTA:** satu-satunya center-align.

---

## 4. Wireframe per Section

```
HERO (backdrop kontur full-bleed, konten kiri)
+----------------------------------------------------------+
| nav: logo kiri | badge "● siap" + [Konsultasi] kanan     |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| eyebrow — jasa pembuatan sistem         (kontur di        |
| H1: Solusi Pembuatan ... *Adaptif,*      belakang,       |
|     Cepat, & Profesional (serif italic)  nyaris diam)     |
| sub 2 kalimat                                              |
| [Konsultasi Gratis via WA]  mikro "respon < 1x24 jam"     |
| +------------------------------------------------------+  |
| | ● Siap Menerima Proyek Baru                          |  |
| | ✓ Sistem Informasi      ✓ Web Bisnis & UMKM          |  |
| | ✓ Aplikasi Kustom       ✓ Tugas Akhir & Skripsi      |  |
| | Garansi revisi · 100% bebas bug                      |  |
| +------------------------------------------------------+  |
+----------------------------------------------------------+

PORTFOLIO & ALUR: sama seperti v1.0 (label kini eyebrow baru).
```

Section lain: eyebrow + H2 kiri + konten. Navbar: fixed, `paper/85` + blur **fungsional** — satu-satunya blur yang diizinkan.

---

## 5. Spesifikasi Background — "Kontur Topografi" (Canvas 2D)

**File:** `src/components/background/ContourBackdrop.jsx` ("use client"). **Library:** tidak ada (Canvas 2D murni). Mount client-only pola rAF-upgrade pasca-hydration (pelajaran insiden v1.0); render pertama = `<div>` kosong bergradasi statis agar HTML server ≡ client.

**Konsep visual (engineered, restrained):** peta kontur pudar — relevan ke bisnis (pemetaan/geofencing) tanpa gaya radar militer. Lapisan: (a) ±36 garis kontur (bezier halus bertingkat, stroke `#D8D0BE` 1px, opacity 0.5) digeser horizontal ultra-lambat (12px per 10 detik, loop mulus); (b) 1 marker emas (crosshair 18px + ring pulse tunggal 6s, opacity ≤0.25) di sepertiga kanan; (c) vignette paper menipis ke tepi. Tidak ada partikel, tidak ada blob, tidak ada glow.

**Behavior & budget:** satu `rAF`; DPR clamp ≤1.5; garis di-prerender sekali ke offscreen canvas lalu di-blit geser (tidak dihitung ulang per frame); pause saat offscreen (`IntersectionObserver`) / tab hidden; `prefers-reduced-motion` → 1 frame statis, tanpa loop. Estimasi biaya: <1% CPU desktop, 0 JS tambahan di bundle (di luar kode komponen ±80 baris). Canvas `aria-hidden="true"`, `pointer-events: none`.

---

## 6. Motion Spec (framer-motion — restrained, tetap)

- **Satu momen terorkestrasi (hero, saat load):** backdrop fade-in → H1 → CTA → status card (stagger ringan). Itu saja. (Efek mengetik terminal dihapus bersama terminalnya.)
- **Reveal section lain:** `whileInView` + `once:true` + `margin:-80px`; hanya opacity 0→1, y 12px, 0.5s `easeOut`. Stagger (`0.08s`) hanya di grid Portfolio & Alur.
- **Menjawab aksi (bebas):** hover CTA (`-1px`, shadow emas menguat), `active:scale-[.98]`; accordion FAQ via `AnimatePresence`; hover kartu portfolio (gambar scale `1.03`, 0.4s).
- **Dilarang:** parallax multi-layer, marquee, animasi loop selain kontur/marker, `layout` animation berat.
- `useReducedMotion()`: matikan semua kecuali perubahan opacity instan; canvas ikut diam (§5).

---

## 7. Komponen Reusable & Struktur File

```
src/
  app/layout.js          # font Plus Jakarta Sans + Instrument Serif, metadata, lang="id", terang
  app/page.js            # komposisi section saja (< 60 baris)
  app/globals.css        # token @theme (paper/gold/…) + base styles + tabular-nums util
  lib/content.js         # SATU sumber: WA, harga, alur, testimoni, FAQ, sosmed, portfolio, status
  components/ui/         # Section, SectionLabel (eyebrow+rule), CTAButton, StatusCard, Reveal
  components/sections/   # Navbar, Hero, TechStrip, Portfolio, Services, Pricing,
                         # Process, Testimonials, Faq, FinalCta, Footer
  components/background/ # ContourBackdrop.jsx (Canvas 2D, tanpa dep)
```

Dihapus dari v1.0: `components/three/` (HeroScene, RadarFallback), `ui/Terminal.jsx`, `terminalLines` di content (diganti objek `status`: badge, services[4], guarantee), token `signal/kw/var/str/codegreen` + font mono.

Aturan: tidak ada string konten di komponen — semua dari `lib/content.js`. Ikon (WA/IG/TikTok/cek) SVG inline custom; layanan memakai hairline emas struktural, bukan ikon lingkaran.

---

## 8. Copy Polish (makna dikunci PRD §6)

- H1 tetap; frasa serif italic dipilih dari klaim yang sudah ada ("Adaptif, Cepat, & Profesional") — bukan klaim baru.
- Status card memakai kata-kata §6 apa adanya ("Siap Menerima Proyek Baru", 4 nama layanan, garansi, "100% bebas bug" dalam kalimat natural).
- Mikro-copy CTA: "Respon < 1×24 jam · Tanpa komitmen".
- Testimoni & FAQ: teks asli apa adanya (termasuk typo/emoji klien = autentik).

---

## 9. Aksesibilitas & Performa Checklist

A11y: landmark, satu `h1`, `alt` deskriptif 3 PNG, kontras token terang §2.1 (teks aksen selalu `gold-deep`, bukan `gold`), `focus-visible` outline `gold-deep`, FAQ keyboard + `aria-expanded`, canvas `aria-hidden` + `pointer-events:none`, hormati `reduced-motion`.
Performa: `next/image` + `sizes`; font `swap`; canvas tanpa dep + budget §5; tanpa CLS; target Lighthouse PRD §3; verifikasi `three` hilang dari bundle (`npm run build` + cek output).

---

## 10. Self-Critique (two-pass review, v1.1)

- v1.0 → v1.1: terminal + radar + mono + oranye dihapus karena melayani persona yang salah (developer, bukan pembeli). Setiap penghapusan diganti realisasi yang menjawab brief baru — bukan sekadar dibuang: info status → status card; semantik lokasi → kontur; presisi mono → tabular-nums.
- Risiko pola baru: cream+terracotta generik. **Dicegah:** emas hanya 4 titik (§1.4), paper hangat + ink pekat + hairline presisi sebagai pembeda dari template cream.
- Benchmark dipertajam untuk tema terang: **Stripe** (kejelasan harga + terang premium), **Linear** (restraint + satu aksen), **Vercel** (presisi geometris), **Raycast** (kepadatan efisien). Diambil standarnya, bukan gayanya.
