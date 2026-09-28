# SyntaxLab Landing Rebuild — Design Spec

Tanggal: 2026-09-26
Status: menunggu review user
Repo: `D:\SyntaxLab\jasa-sistem-ta` (Next.js 16, branch `experiment/3d-hero`)

## 1. Goal

Bangun ulang landing page SyntaxLab (jasa pembuatan website & aplikasi custom)
dengan kualitas studio digital premium — bukan template generik. Reskin total
(warna, tipografi, layout, motion) + hero 3D konseptual baru + rombak seluruh
section mengikuti slice vertikal. Copy tetap Bahasa Indonesia, tone profesional
tapi approachable.

Kegagalan utama yang dihindari: kesan "AI slop" (gradient ungu-biru, ikon stok
rocket/lightbulb, glassmorphism, soft-shadow di mana-mana, gold+cream klise,
font default Poppins/Inter, center-align semua).

## 2. Keputusan yang terkunci (user-approved)

| Area | Keputusan |
|---|---|
| Stack | Tetap **Next.js 16** + React 19 + Tailwind v4 (tak migrasi ke Vite) |
| Base warna | Off-white `#FAFAF8` + navy `#0B1120` (teks & section gelap) |
| Signature | **Teal `#0D9488`** (bukan amber/gold) |
| Animasi | **GSAP + ScrollTrigger saja** — `framer-motion` di-uninstall |
| Hero 3D | **Grid partikel → struktur blok digital** (interaktif mouse + scroll) |
| Laptop 3D + ERP | Pindah dari Hero ke **section Karya/Portfolio** |
| Tipografi | **Bricolage Grotesque** (heading) + **Source Serif 4** (body) + JetBrains Mono (label) |
| Estruktur | Testimonials + FinalCta **tetap dipertahankan** (di luar struktur brief) |
| Eksekusi | Slice vertikal A: tiap slice = bangun ulang dari spec + verifikasi eslint/build |

## 3. Design system

### 3.1 Token warna (`globals.css` `@theme`)

Palet lama (paper/panel/line/gold/ink cream-based) **dihapus total**.

| Token | Value | Pemakaian |
|---|---|---|
| `--color-paper` | `#FAFAF8` | background halaman |
| `--color-surface` | `#FFFFFF` | kartu/panel terang |
| `--color-line` | `#E6E8EC` | border/garis (abu dingin, bukan krem) |
| `--color-ink` | `#0B1120` | teks utama + section gelap |
| `--color-navy-2` | `#131C2E` | panel di atas section gelap |
| `--color-teal` | `#0D9488` | aksen utama, CTA, highlight |
| `--color-teal-deep` | `#0A6E67` | hover/active teal |
| `--color-teal-soft` | `#E7F5F3` | tint background, badge |
| `--color-muted` | `#4A5565` | teks sekunder |
| `--color-faint` | `#8B93A1` | teks tersier/label |
| `--color-ok` | `#0D9488` | status (serupa teal) |

Aturan: `::selection` dan `:focus-visible` memakai teal. Tidak ada warna
ungu/gradien ungu-ke-biru di mana pun.

### 3.2 Tipografi (next/font, latin subset, bobot terbatas)

- **Bricolage Grotesque** → `--font-display` — heading. Bobot 600/700/800.
  Karakter: grotesk berkarakter (bukan Inter/Jakarta default).
- **Source Serif 4** → `--font-serif` — body text + aksen italic heading.
  Bobot 400/600 + italic 400. Body `1.0625–1.125rem`, leading longgar.
- **JetBrains Mono** → `--font-mono` — eyebrow/label section, angka, tag
  teknis. Bobot 500. Hanya untuk detail kecil, bukan body.

Skala heading (besar & berani, bukan medium semua):
- h1 hero: `clamp(3rem, 7.5vw, 6rem)`, weight 800, tracking `-0.03em`.
- h2 section: `clamp(2rem, 4.5vw, 3.5rem)`, weight 700, tracking `-0.02em`.
- Aksen italic serif teal pada 1 frasa kunci per heading besar (maks 1).

### 3.3 Layout

- Container `max-w-7xl` (56rem–80rem mengikuti section), padding mobile-first.
- **Grid asimetris**: hero 7/5, portfolio alternating 7/5, harga offset
  terangkat. Dilarang: semua section center-align.
- Whitespace besar yang disengaja: padding section `py-24 lg:py-36`.
- Tiap section punya: label mono (`01 / LAYANAN`) + garis rule tipis.
- Breakpoint: mobile-first — desain 360px dulu, `sm/md/lg` menambah kolom,
  bukan sekali skala turun.

### 3.4 Aturan anti-generik (wajib dipatuhi semua slice)

1. Tidak ada gradient ungu-biru / gradient mencolok generik.
2. Tidak ada ikon stok rocket/lightbulb/handshake; pakai garis/geometri
   sederhana atau angka mono.
3. Tidak ada glassmorphism berlebih (blur hanya di navbar, fungsional).
4. Tidak ada soft drop-shadow di semua elemen — kontras via border & warna.
5. Tidak ada font Poppins/Inter.
6. Semua string konten dari `src/lib/content.js` (aturan lama tetap berlaku).

## 4. Motion (GSAP)

- Deps: `gsap` (termasuk ScrollTrigger). Hapus `framer-motion`.
- `src/lib/gsap.js`: `gsap.registerPlugin(ScrollTrigger)` sekali, ekspor gsap.
- Hook `useReveal` / util `reveal()` memakai `gsap.matchMedia()` dengan
  `(prefers-reduced-motion: no-preference)` — saat reduce: elemen tampil
  statis tanpa animasi (opacity 1 dari awal, jangan pernah disembunyikan).
- Pola yang dipakai (jangan lebih):
  1. **Reveal**: fade+`y:24` → 0, `once: true`, stagger kecil.
  2. **Scrub**: garis progress Alur kerja diikat `scrollTrigger scrub`.
  3. **Hero intro**: teks hero sekali saat mount (bukan scroll).
- Semua `ScrollTrigger` di-cleanup saat unmount (`ctx.revert()`).
- `html { scroll-behavior: smooth }` dipertahankan; anchor `scroll-mt`
  disesuaikan tinggi navbar.

## 5. Arsitektur & file per slice

```
src/lib/gsap.js                    [baru] register + ekspor gsap/ScrollTrigger
src/lib/useReveal.js               [baru] hook reveal GSAP + reduced-motion
src/components/ui/Reveal.jsx       [tulis ulang] wrapper reveal GSAP
src/components/background/BlockGrid.jsx [baru] scene hero partikel→blok
src/components/sections/Hero.jsx   [tulis ulang] split + BlockGrid
src/components/sections/Navbar.jsx [tulis ulang] teal + mobile menu
src/components/sections/Portfolio.jsx [tulis ulang] laptop 3D + frame browser
src/components/sections/Services.jsx  [tulis ulang] 4 kartu
src/components/sections/Process.jsx   [tulis ulang] timeline scrub
src/components/sections/Pricing.jsx   [tulis ulang] navy featured
src/components/sections/Testimonials.jsx [tulis ulang] gaya baru
src/components/sections/Faq.jsx       [tulis ulang] accordion aria
src/components/sections/FinalCta.jsx  [tulis ulang] gaya baru
src/components/sections/Footer.jsx    [tulis ulang] navy
src/components/background/ContourBackdrop.jsx [hapus]
src/components/background/GoldDust.jsx        [hapus]
src/lib/content.js                 [edit] layanan 4 item sesuai brief
src/app/globals.css                [tulis ulang token + type scale]
src/app/layout.js                  [edit] ganti next/font
package.json                       [edit] +gsap, -framer-motion
```

Pertahanan: `LaptopModel.jsx`, `erpScreen.js`, `Section.jsx`, `CTAButton.jsx`,
`StatusCard.jsx`, `icons.jsx`, `BackToTop.jsx`, `SectionLabel.jsx` (di-reskin
sesuai token baru, tidak dihapus).

## 6. Spec per seksi

### 6.1 Navbar
- Sticky, `bg-paper/85 backdrop-blur-md`, border bawah `line` (blur tetap
  satu-satunya yang diizinkan, fungsional).
- Logo `Syntax` (ink) + `Lab` (teal), weight 800 Bricolage.
- Menu: Karya, Layanan, Harga, Alur, FAQ → teks `muted` hover `ink`.
- CTA "Hubungi Kami": solid `teal`, teks putih, radius kecil, hover
  `teal-deep`. Tanpa translate-y dramatis.
- **Mobile (<md)**: hamburger button (ikon 2 garis, aria-expanded) → panel
  dropdown sederhana di bawah navbar (bukan overlay penuh), link + CTA.

### 6.2 Hero
- Grid asimetris `lg:grid-cols-[7fr_5fr]`, kiri konten, kanan canvas.
- Urutan kiri: eyebrow mono (`JASA PEMBUATAN SISTEM`, dengan rule teal) →
  h1 raksasa Bricolage dengan aksen Source Serif italic teal pada "Adaptif,
  Cepat" → sub (Source Serif, `muted`, max ~52ch) → CTA WhatsApp (solid teal)
  + catatan respon → badge status "Siap menerima proyek baru" (dot teal
  berdenyut pelan, mati saat reduced-motion).
- **BlockGrid (kanan)**: Three.js scene partikel grid yang **terbentuk menjadi
  struktur blok** (kubus-kubus bertumpuk abstrak = "blok bangunan digital").
  Spesifikasi:
  - ~2–4rb partikel (Points, 1 draw call) + wireframe blok tipis; warna:
    partikel ink/navy, garis blok teal, di atas latar transparan/soft.
  - Reaksi mouse: parallax kamera ringan + repulsion lembut partikel terdekat.
  - Reaksi scroll: kamera/rotasi bergeser halus mengikuti progress hero.
  - Performa: `dynamic ssr:false`, DPR ≤ 2, `IntersectionObserver` pause,
    dispose penuh, geometri sederhana.
  - Reduced-motion: render 1 frame statis (komposisi terbentuk), tanpa loop.
  - Fallback: WebGL gagal / device murah → CSS dot-grid statis + blok wireframe
    SVG/CSS (tetap terlihat disengaja, bukan kosong).
- Intro teks hero via GSAP (sekali, saat mount).

### 6.3 Karya / Portfolio
- Laptop 3D + ERP (sudah ada, guard lengkap) jadi **showcase unggulan**,
  dimuat lazy; tutup terbuka mengikuti scroll section (dipertahankan).
- 2 proyek berikutnya: **frame device custom ala browser** — chrome digambar
  CSS (3 titik, URL bar monospace), screenshot proyek di dalamnya, tag mono.
- Layout alternating asimetris (teks kiri/gambar kanan, dst.), reveal GSAP.
- Konten tetap `portfolio[]` dari `content.js`.

### 6.4 Layanan
- 4 kartu (grid 2x2 desktop, 1 kolom mobile): **Sistem Informasi, Web Bisnis
  & UMKM, Aplikasi Kustom, Tugas Akhir & Skripsi** — `content.js` disesuaikan
  (deskripsi dipertahankan/diadaptasi, angka tak diubah).
- Kartu: surface putih, border `line`, nomor mono besar (`01`), judul
  Bricolage, desc serif `muted`.
- Hover micro-interaction: border → teal, nomor → teal, translate `-4px`
  (tanpa soft-shadow blur).

### 6.5 Alur kerja
- Desktop: **timeline horizontal** 5 langkah dari `process[]` (Konsultasi →
  DP Masuk → Proses & Demo → Serah Terima → Estimasi Waktu; urutan &
  makna konten tidak diubah) + garis progress yang **di-scrub
  ScrollTrigger** saat section di-scroll.
- Mobile: vertikal, garis progress vertikal.
- Estimasi waktu tetap langkah ke-5 (bagian dari `process[]`).

### 6.6 Harga
- 2 kartu, asimetris: paket featured (**Paket Web Bisnis**, `featured:true`)
  = **card navy `#0B1120` teks putih + badge teal "Paling Populer"**,
  terangkat (`lg:-translate-y-4` / border 2px teal). Kartu reguler surface
  putih border `line`.
- Angka harga: Bricolage besar + `tabular-nums`. CTA per kartu.

### 6.7 Testimonials (dipertahankan)
- Gaya baru sesuai token: quote serif besar, nama mono, tanpa bintang gold
  (bila ada rating, gunakan teal/netral; `--color-star` lama dihapus).

### 6.8 FAQ
- Accordion: `button` + `aria-expanded` + region; ikon chevron kecil
  (rotate saat buka), animasi height singkat via GSAP atau CSS. Bukan +
  raksasa center-align.

### 6.9 Final CTA + Footer
- FinalCta: section navy full-bleed, headline besar, CTA teal.
- Footer: navy `#0B1120`, teks `#AAB2C0`-ish, kolom: kontak WA, sosial
  (Instagram/TikTok dari `content.js`), copyright. Rule tipis pemisah.

## 7. Performa (wajib tiap slice)

- Three.js hanya di chunk `dynamic` + `ssr:false`; tak ada import three di
  bundle awal.
- DPR ≤ 2, pause saat offscreen/hidden, dispose penuh saat unmount.
- `prefers-reduced-motion`: GSAP via matchMedia; scene 3D frame statis.
- Gambar portfolio: tetap lokal `/public`, gunakan `next/image` bila tidak
  merusak layout (minimal: `loading="lazy"` + dimensi eksplisit).
- Target: build sukses, LCP hero teks (bukan canvas), 60fps device menengah.

## 8. QA / acceptance criteria

Per slice:
1. `npx eslint <file terkait>` bersih.
2. `npm run build` sukses, route `/` static.
3. QC visual user via screenshot (tool screenshot agent masih mati).

Akhir (semua slice selesai):
1. Responsif 360 / 768 / 1440 — mobile-first, tanpa overflow.
2. Keyboard: focus visible teal, nav & accordion ter-operasi keyboard.
3. Reduced-motion: tanpa animasi/loop, konten tetap tampil.
4. Audit anti-generik: cek daftar §3.4 satu per satu + `/impeccable critique`
   (atau pemeriksaan manual setara bila skill tak tersedia).
5. Tidak ada string konten hardcode di komponen (cek `content.js`).

## 9. Out of scope

- Migrasi Vite/vanilla, CMS, halaman selain `/`, i18n.
- Mengubah harga/angka/PRD §6 (makna konten dikunci).
- Menambah dep animasi lain selain GSAP; library UI baru; icon pack stok.
