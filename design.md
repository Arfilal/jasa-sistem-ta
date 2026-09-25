# design.md — Design Document Redesign SyntaxLab

**Versi:** 1.0 · **Tanggal:** 25 Sep 2026 · **Status:** Draft — menunggu review owner
**Pasangan:** `PRD.md` (tujuan, scope, konten terkunci) · **Referensi kualitas:** Linear, Vercel, Raycast, Stripe (benchmark, bukan tiruan)

---

## 1. Prinsip & Anti-Slop Contract

Keputusan berikut mengikat implementasi. Setiap penyimpangan harus beralasan tertulis di PR.

1. **Satu elemen memorable, sisanya disiplin.** Yang boleh "berisik" hanya radar 3D + terminal di hero. Section lain: hairline, tipe, whitespace.
2. **Struktur = informasi, bukan dekorasi.** Border, nomor, label hanya jika memuat makna. Angka (`01–05`) hanya di Alur Pemesanan (sekuens asli) — tidak di section lain.
3. **Larangan eksplisit:** gradien ungu-biru; glassmorphism non-fungsional; ikon generik dalam lingkaran gradien; center-align di semua section; font template (Inter/Poppins/Geist); emoji di body; bento tanpa hierarki; blob/torus 3D generik; glow neon di semua card.
4. **Glow hanya di dua tempat:** CTA primer + kanvas radar. Card lain memakai hairline `#1D2532`, tanpa shadow.
5. **Copy dari sudut pandang user**, kalimat aktif, tanpa klaim generik ("solusi terbaik untuk kebutuhan Anda" dilarang).

> Catatan kejujuran terhadap brief: brief meminta label mono, dark+neon, dan scroll-reveal Framer Motion — sebagian beririsan dengan pola "AI tell". Kompromi yang diambil: label mono berbentuk `// komentar-terminal` (vernacular subjek, bukan eyebrow ALL-CAPS generik); reveal non-hero hanya opacity + gerak 12px (`once: true`); satu momen terorkestrasi hanya di hero. Lihat §6 dan §9.

---

## 2. Design System

### 2.1 Warna

Base: hitam kebiruan pekat. **Satu aksen** — oranye sinyal (`signal`), dipilih karena semantik radar/pin lokasi (subjek: geofencing & presensi lokasi), bukan karena "terlihat modern". Hijau hanya untuk status semantik "tersedia".

| Token | Hex | Pakai untuk |
|---|---|---|
| `void` | `#07090D` | background halaman |
| `panel` | `#0C1016` | card / terminal body |
| `panel-2` | `#10151D` | elemen raised (accordion, input) |
| `line` | `#1D2532` | hairline border semua card |
| `ink` | `#E9EEF5` | teks primer (kontras ±15:1) |
| `muted` | `#9AA3B2` | teks sekunder (kontras ±7:1) |
| `faint` | `#646E7E` | meta non-esensial saja; **dilarang untuk body** (kontras <4.5:1) |
| `signal` | `#FF5C1C` | CTA primer, sweep radar, state aktif, satu highlight per section |
| `signal-ink` | `#160900` | teks di atas `signal` |
| `ok` | `#34D399` | dot status "siap menerima proyek" + semantik sukses saja |
| `star` | `#FFC531` | rating (konten, bukan aksen brand) |
| Warna sintaks terminal | `#FF7AB2` `#7AB8FF` `#FFD866` `#7AE0A3` | highlight kode `status.js` (konten, tuning dari halaman lama) |

Rasio `signal` di atas `void` ≈ 7:1 — lolos AA untuk teks. Tidak ada warna kedua untuk CTA (tidak ada tombol "sekunder berwarna").

### 2.2 Tipografi — 2 family, peran tegas

- **Display + body: Space Grotesk** (400/500/700). Karakter teknikal-geometris, beda dari template; body 400/500 tetap terbaca di 16–17px.
- **Kode/label/data: JetBrains Mono** (400/500/600). Dipakai untuk: blok `status.js`, label section gaya `// karya-nyata`, angka harga, dan meta. **Bukan** eyebrow ALL-CAPS — label ditulis lowercase ala komentar kode.
- Keduanya via `next/font` (`display: swap`), tanpa dependensi font baru.

Skala (mobile-first, `clamp`): h1 `clamp(2.5rem, 6vw, 4.25rem)` / 700 / `-0.02em`; h2 `clamp(1.75rem, 3.5vw, 2.5rem)` / 700; h3 `1.25rem` / 600; body `1rem–1.0625rem` / `1.7` line-height; mono label `0.8125rem`. Panjang baris body < 80 karakter.

### 2.3 Spacing, radius, breakpoint, grid

- Skala 4pt: `4/8/12/16/24/32/48/64/96/128/160`. Section: `py-24` mobile / `py-32 desktop`; jeda antar-section mengikuti ritme, bukan divider di mana-mana.
- Container `max-w-6xl` (gutter `px-6`); portfolio memakai `max-w-7xl` (satu pengecualian, beralasan: gambar butuh napas).
- Radius: card `12px`, elemen dalam `10px`, tombol `10px` (engineered, bukan pil generik). Satu radius, konsisten.
- Breakpoint Tailwind default (`sm/md/lg/xl`); grid 12 kolom di desktop, 1 kolom mobile. Alignment default **kiri**; center hanya hero-eyebrow dan final CTA.

---

## 3. Ritme Layout (anti-monoton)

Urutan section sesuai PRD §5. Variasi ritme yang direncanakan:

- **Hero:** asimetris 7:5 — kiri headline + CTA + terminal, kanan kanvas radar (mobile: susun vertikal, radar jadi backdrop setinggi ~320px di belakang terminal).
- **Tech strip:** satu baris mono horizontal (wrap), tanpa card — murah vertikal.
- **Portfolio:** kartu fitur besar #1 (horizontal, gambar kiri) + dua kartu offset di bawahnya (satu naik `-mt-8` di desktop) — hierarki ukuran = prioritas, bukan bento tempel.
- **Layanan:** 3 kolom dengan kolom tengah di-highlight hairline `signal` (prioritas: Sistem Informasi = revenue utama).
- **Harga:** 2 kolom tak simetris (5:7) — paket Skripsi (volume) vs Bisnis (nilai); satu highlight.
- **Alur:** timeline horizontal 5 node dengan konektor garis (desktop) → vertikal mobile. Satu-satunya tempat bernomor.
- **Testimoni:** 3 kartu tak sama tinggi dibiarkan (masonry-ish via grid), rating mono `★★★★★` sebagai teks.
- **FAQ:** satu kolom `max-w-3xl`, kiri.
- **Final CTA:** satu-satunya section center-align — penutup yang disengaja, bukan kebiasaan.

---

## 4. Wireframe per Section

```
HERO (asimetris 7:5)
+----------------------------------------------------------+
| nav: logo kiri | dot "● siap" + [Konsultasi] kanan       |
|                                                            |
| // jasa-pembuatan-sistem          [ RADAR 3D (kanan) ]    |
| H1 kiri (2 baris, "Adaptif…"     [ sweep + ring + node]  |
| sub 2 kalimat                                              |
| [Konsultasi Gratis via WA]  + mikro "respon < 1x24 jam"   |
| +------------------------+                                 |
| | ● ● ●  status.js       |                                 |
| | const SyntaxLab = {...}|                                 |
| +------------------------+                                 |
+----------------------------------------------------------+

PORTFOLIO (1 fitur + 2 offset)
+----------------------------------------------------------+
| // karya-nyata                                             |
| H2 "Sistem yang sudah jalan di lapangan"                   |
| +--------------------------------+-----------------------+ |
| | gambar PMI (lebar)           | H3 + deskripsi + tag    | |
| +------------------------------+-------------------------+ |
|   +----------------+   +----------------+                  |
|   | Smanda         |   | Sipta (naik)   |  <- offset -mt-8 |
|   +----------------+   +----------------+                  |

ALUR (timeline bernomor — satu-satunya)
 (1)Konsultasi —— (2)DP 40% —— (3)Proses&Demo —— (4)Serah terima
                    +-- (5) Estimasi 14–30 hari (kartu blended)
```

Section lain mengikuti pola: label `// nama-section` + H2 kiri + konten (detail di implementasi). Navbar: fixed, `void/80` + blur **fungsional** (keterbacaan saat scroll) — satu-satunya blur yang diizinkan.

---

## 5. Spesifikasi Elemen 3D — "Geofence Radar"

**File:** `src/components/three/HeroScene.jsx` ("use client", komentar arsitektur wajib). **Library:** `three` saja. Muat via `next/dynamic` (`ssr:false`) dari Hero.

**Konsep visual (engineered, bukan blob):** replika abstrak cara kerja produk unggulan — pin lokasi dalam radius geofence.
Scene: (a) grid koordinat 40×40 (`GridHelper`, warna `line`, fade oleh fog `void`); (b) 3 ring radar (`RingGeometry`, opacity dianimasikan scale + fade berjenjang); (c) 1 wedge sweep berputar (opacity rendah, additive); (d) 5–7 node (octahedron kecil, `signal` + putih) mengorbit di radius berbeda; (e) garis orbit statis (`LineLoop`); (f) 1 pin lokasi di tengah (octahedron memanjang + ring pulsing); (g) debu partikel `Points` ±300, drift lambat. Tanpa tekstur, tanpa postprocessing, geometri dishare.

**Behavior:** rotasi idle lambat; parallax mouse (lerp, ±0.4 rad, hanya `pointer:fine`); opacity canvas di-fade smooth mengikuti scroll (IntersectionObserver) + `rAF` pause saat offscreen/hidden; kamera z≈14 miring ~0.35 rad.

**Budget & fallback:** DPR clamp ≤1.75; <60 draw calls; tidak render sebelum `WebGL` terbukti bisa. Fallback bila `pointer:coarse`, `prefers-reduced-motion`, atau WebGL gagal: **SVG statis inline** (ring konsentris + sweep + pin, ±2KB) di atas gradien `void→panel`. Canvas `aria-hidden="true"`.

---

## 6. Motion Spec (framer-motion — restrained)

- **Satu momen terorkestrasi (hero, saat load):** canvas fade-in → H1 → CTA → terminal mengetik 3 baris pertama `status.js`. Itu saja.
- **Reveal section lain:** `whileInView` + `once:true` + `margin:-80px`; hanya opacity 0→1, y 12px, 0.5s `easeOut`. Stagger (`0.08s`) hanya di grid Portfolio & Alur.
- **Menjawab aksi (bebas):** hover CTA (`-1px` + glow `signal` menguat), `active:scale-[.98]`; accordion FAQ via `AnimatePresence` (height auto); hover kartu portfolio (gambar scale `1.03`, 0.4s).
- **Dilarang:** parallax multi-layer, marquee, animasi loop selain radar/terminal, `layout` animation berat.
- `useReducedMotion()`: matikan semua kecuali perubahan opacity instan.

**Menggantikan** `Reveal` (IntersectionObserver) dan toggle dark di `page.js` lama.

---

## 7. Komponen Reusable & Struktur File

```
src/
  app/layout.js        # font Space Grotesk + JetBrains Mono, metadata, lang="id", dark-only
  app/page.js          # komposisi section saja (< 60 baris)
  app/globals.css      # token @theme + base styles
  lib/content.js       # SATU sumber: WA, harga, alur, testimoni, FAQ, sosmed, portfolio
  components/ui/       # Section, SectionLabel (// mono), CTAButton, Terminal, Reveal
  components/sections/ # Navbar, Hero, TechStrip, Portfolio, Services, Pricing,
                       # Process, Testimonials, Faq, FinalCta, Footer
  components/three/    # HeroScene.jsx + RadarFallback (SVG inline)
```

Aturan: tidak ada string konten (harga/link/nama) di komponen — semua dari `lib/content.js`. Ikon (WA/IG/TikTok/cek) sebagai SVG inline custom di `components/ui/icons.jsx` — dilarang ikon library generik sebagai "feature icon"; layanan memakai penanda mono (`>_` / `//` / `[ ]`) bukan ikon lingkaran.

---

## 8. Copy Polish (makna dikunci PRD §6)

- H1 tetap; sub-hero ditulis ulang tanpa template ("…dibimbing sampai paham" dipertahankan sebagai diferensiator).
- Mikro-copy CTA: "Respon < 1×24 jam · Tanpa komitmen" (klaim layanan yang sudah implisit, bukan janji baru).
- Harga: angka + "mulai dari" tidak berubah; deskripsi paket dipadatkan, tetap menyebut segmen (mahasiswa / UMKM).
- Testimoni & FAQ: teks asli dipertahankan apa adanya (termasuk typo/emoji klien = autentik).

---

## 9. Aksesibilitas & Performa Checklist

A11y: landmark (`nav/main/section aria-labelledby/footer`), satu `h1`, `alt` deskriptif 3 PNG, kontras §2.1, `focus-visible` outline `signal`, FAQ keyboard + `aria-expanded`, canvas `aria-hidden`, hormati `reduced-motion`.
Performa: `next/image` + `sizes` untuk 3 PNG; font `swap`; 3D `dynamic` + gate §5; placeholder aspek tetap (tanpa CLS); hapus SVG template; target Lighthouse sesuai PRD §3.

---

## 10. Self-Critique (two-pass review)

- Awalnya: aksen lime + eyebrow caps + bento portfolio. **Direvisi:** aksen → oranye sinyal (semantik radar/lokasi, milik subjek); label → `// mono lowercase` (vernacular terminal); portfolio → 1 fitur + 2 offset (hierarki = prioritas).
- Brief mengalahkan skill di: dark+neon, reveal FM, angka alur — ketiganya dibatasi (§1.4, §6) agar tidak menjadi template.
- Benchmark: **Linear** (dark restrained + satu aksen + proof-first), **Vercel** (presisi geometris, label mono), **Raycast** (kepadatan efisien, terminal sebagai UI), **Stripe** (kejelasan harga). Diambil standarnya, bukan gayanya.
