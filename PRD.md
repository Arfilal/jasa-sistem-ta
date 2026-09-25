# PRD — Redesign Total Landing Page SyntaxLab

**Versi:** 1.0 · **Tanggal:** 25 Sep 2026 · **Status:** Draft — menunggu review owner
**Repo:** `Arfilal/jasa-sistem-ta` (live: `syntaxlab.biz.id`) · **Stack:** Next.js 16 + React 19 + Tailwind CSS v4 (dipertahankan)

---

## 1. Latar & Tujuan

Landing page saat ini (satu file `src/app/page.js` ±31KB, light/dark toggle, tanpa diferensiasi visual) terlihat seperti template generik dan tidak mencerminkan positioning "jasa dev profesional". Redesign total bertujuan:

1. **Menaikkan konversi konsultasi WhatsApp** — pengunjung (mahasiswa TA & owner UMKM) paham tawaran dalam <10 detik dan menekan CTA.
2. **Membangun trust lewat bukti awal** — portfolio nyata ditampilkan sebelum harga ("proof early").
3. **Membangun identitas developer-brand** — dark terminal aesthetic yang sengaja, bukan template; bebas dari cliché AI (gradien ungu-biru, glassmorphism tanpa fungsi, ikon generik dalam lingkaran gradien).

## 2. Target User

| Persona | Ciri | Motivasi utama | Keraguan yang harus dijawab halaman |
|---|---|---|---|
| **Mahasiswa tingkat akhir (primer)** | Informatika/SI, kepepet deadline sidang, budget terbatas | "Sistemku jadi, bisa didemokan ke dosen, aku paham kodenya" | Apakah ini beneran bisa bikin sistem jalan? Apakah dibimbing sampai paham? Berapa harganya? |
| **Pemilik UMKM/instansi (sekunder)** | Butuh company profile / sistem kasir / inventori, awam teknis | "Bisnisku kelihatan profesional, pengerjaan jelas" | Apakah hasilnya profesional? Bagaimana alur & pembayarannya? |

Keduanya datang dari link langsung/organik, mayoritas via **mobile**. Mereka tidak peduli preferensi tema — mereka peduli bukti, harga, dan cara pesan.

## 3. Goals & Success Metrics

| # | Metric | Target | Cara ukur |
|---|---|---|---|
| 1 | Lighthouse Performance (mobile) | ≥ 80 | `npm run build` + audit Chrome, dengan 3D aktif |
| 2 | Lighthouse Performance (desktop) | ≥ 90 | idem |
| 3 | Lighthouse Accessibility | ≥ 95 | idem (kontras, landmark, focus, `aria` FAQ/kanvas) |
| 4 | Paritas konten | 100% — semua data §6 tampil, makna tidak berubah | checklist manual saat review per section |
| 5 | Integritas aset & link | 3 PNG portfolio render, favicon tampil, link WA/IG/TikTok tepat | klik manual + `next build` tanpa 404 |
| 6 | Build bersih | `npm run build` sukses, tanpa error/warning baru, tanpa `console.log` | CI/Vercel + review |
| 7 | 3D tidak merusak UX low-end | fallback statis tampil & smooth di emulasi Moto G4 / `prefers-reduced-motion` | testing manual §9 |

## 4. Scope

### In-scope (P0 — wajib)

1. Hero + elemen 3D interaktif (three.js vanilla, lazy-loaded) + kartu terminal `status.js`.
2. Strip teknologi (6 item).
3. Portfolio "Karya Nyata Kami" — 3 proyek + 3 PNG existing via `next/image`.
4. Layanan (3 kartu), Harga (2 paket), Alur (5 langkah), Testimoni (3), FAQ (3), Final CTA + Footer.
5. Split `page.js` monolit menjadi komponen per section + `src/lib/content.js` sebagai satu sumber konten.
6. Design system: token warna, tipografi (Space Grotesk + JetBrains Mono via `next/font`), spacing, motion.
7. Dark-only: hapus toggle & seluruh varian `dark:` (kunci keputusan owner 25 Sep 2026).

### In-scope (P1 — pelengkap)

8. Micro-interactions + scroll-reveal (framer-motion, restrained — lihat `design.md` §6).
9. Copywriting polish persuasif (makna & angka dikunci §6).
10. Hapus aset template tak terpakai (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`).

### Out-of-scope (eksplisit tidak dikerjakan)

- Migrasi TypeScript, CMS/blog, i18n, halaman tambahan, analytics/event tracking.
- Spline atau model 3D eksternal; R3F/Drei (keputusan: overhead tidak sepadan untuk satu objek hero).
- Light mode, auth, backend, perubahan harga/fitur bisnis.

## 5. Struktur Section & Prioritas

Urutan final (keputusan owner: **proof early** — mahasiswa/UMKM skeptis perlu validasi "ini beneran jalan" sebelum peduli harga):

| Urutan | Section | Prioritas | Alasan posisi |
|---|---|---|---|
| 1 | Navbar (logo, status dot, CTA WA) | P0 | orientasi + CTA selalu terlihat |
| 2 | Hero (headline, CTA, 3D radar + terminal) | P0 | <10 detik paham tawaran; satu momen visual memorable |
| 3 | Strip teknologi | P0 | kredibilitas cepat, murah secara vertikal |
| 4 | **Portfolio (naik ke atas)** | P0 | bukti sebelum klaim — menjawab keraguan utama |
| 5 | Layanan & Keahlian | P0 | mengkategorikan kebutuhan pengunjung |
| 6 | Estimasi Harga | P0 | angka setelah bukti → terasa wajar |
| 7 | Alur Pemesanan | P0 | menurunkan friksi ("bagaimana cara pesan?") |
| 8 | Testimoni | P1 | penguat sosial menjelang keputusan |
| 9 | FAQ | P1 | menangani objeksi terakhir (instalasi, source code, revisi) |
| 10 | Final CTA + Footer | P0 | CTA kedua setelah semua objeksi terjawab |

Detail layout tiap section ada di `design.md` §4. Perubahan urutan vs halaman lama didokumentasikan di sana.

## 6. Inventaris Konten Terkunci (makna tidak boleh berubah)

- **Hero:** headline "Solusi Pembuatan Website & Aplikasi Kustom — Adaptif, Cepat, & Profesional"; CTA "Konsultasi Gratis via WhatsApp" → `https://wa.me/6281392684232` (tab baru, `rel noopener`).
- **Terminal `status.js`:** status "Siap Menerima Proyek Baru"; layanan ["Sistem Informasi", "Web Bisnis & UMKM", "Aplikasi Kustom", "Tugas Akhir & Skripsi"]; `garansi: true`; kualitas "100% Bebas Bug".
- **Teknologi:** Next.js & React, Laravel, Node.js, MySQL, Tailwind CSS, Flutter.
- **Layanan:** Sistem Informasi (manajemen, kasir, inventori, portal kampus/sekolah); SPK & Algoritma (SPK, Data Mining, algoritma skripsi); Web Profil & Bisnis.
- **Harga:** Skripsi/Tugas Akhir mulai Rp 750.000; Web Bisnis/Company Profile mulai Rp 1.500.000.
- **Portfolio:** (1) Presensi Mobile PMI Kab. Cilacap — Geofencing & Haversine — `/presensi-pmi.png`; (2) Presensi Siswa SMAN 2 Cilacap — multi-role, cetak Excel — `/presensi-smanda.png`; (3) Sipta mobile pengelola TA — `/kelola-tugas-akhir-mobile.png`. Tag teknologi dipertahankan. Path gambar **tidak berubah**.
- **Alur:** Konsultasi → DP 40% → Proses & Demo → Serah Terima (+source code) → Estimasi 14–30 hari kerja.
- **Testimoni:** Aulia.P (5★), Arfilal.F (4★), Revano.A (4,5★) + teks & status "Mahasiswa Teknik Informatika" (teks asli dipertahankan apa adanya).
- **FAQ:** instalasi remote sampai jalan; source code 100% milik klien setelah pelunasan; garansi revisi minor 3×, major berbayar.
- **Footer:** © 2026 SyntaxLab; Instagram `https://instagram.com/syntaxlab_official`; TikTok `https://tiktok.com/@syntax.lab5`; favicon `/favicon.png`.

## 7. Asumsi Teknis & Constraint

1. Tetap JavaScript (`.js`, `jsconfig.json`) — tidak ada migrasi TS tanpa permintaan.
2. Tailwind v4 (sintaks `@theme` + CSS vars untuk token).
3. Dependensi baru **hanya** `three` + `framer-motion`. Font via `next/font` (tanpa dep).
4. Gambar portfolio via `next/image` (`sizes` responsif, `alt` deskriptif); path `/public` tidak berubah.
5. 3D dimuat via `next/dynamic` (`ssr: false`); tidak dirender saat `pointer: coarse`, `prefers-reduced-motion`, WebGL gagal, atau tab disembunyikan.
6. Mobile-first; 3D didegrade ke SVG statis di mobile (lihat `design.md` §5).
7. Komentar singkat wajib di setup 3D dan bagian kompleks lain.

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| three.js memberatkan mobile/low-end | lazy-load + gate `pointer`/`reduced-motion` + fallback SVG; budget <60 draw calls, tanpa postprocessing |
| framer-motion terasa "template fade-up di mana-mana" | motion spec restrained di `design.md` §6 (satu momen hero + reveal opacity-only) |
| Copy polish mengubah makna harga/fitur | §6 dikunci; review per section membandingkan dengan halaman live |
| Dark-only mengejutkan pengguna lama | halaman lama memakai dark sebagai default juga; tidak ada data preferensi light — diterima owner |

## 9. Acceptance Criteria (definisi selesai)

- [ ] `npm run build` sukses; tidak ada `console.log`, import tak terpakai.
- [ ] Semua 9 section tampil sesuai urutan §5 di mobile/tablet/desktop tanpa overflow horizontal.
- [ ] 3 gambar portfolio + favicon tampil (path existing, via `next/image`).
- [ ] Link WA/IG/TikTok persis seperti §6; CTA membuka tab baru dengan `rel="noopener noreferrer"`.
- [ ] Angka (harga, DP 40%, 14–30 hari, revisi 3×) sama dengan halaman live.
- [ ] Skor Lighthouse memenuhi §3 (diukur setelah build produksi).
- [ ] FAQ bisa dibuka via keyboard (`Enter`/`Space`), `aria-expanded` benar; kanvas 3D `aria-hidden`.
- [ ] Fallback statis tampil saat WebGL/`reduced-motion`/mobile (verifikasi manual).
- [ ] Review owner per section selesai; temuan FAIL kembali ke implementasi (maksimal 2 putaran per section sebelum eskalasi).

## 10. Fase Kerja

1. **Dokumen** (sekarang): `PRD.md` + `design.md` → review owner.
2. **Setup**: clone repo ke lokal, install `three` + `framer-motion`, token + font + layout base.
3. **Implementasi per section** sesuai urutan §5 (satu section = satu review).
4. **Pass akhir**: a11y + performa + `npm run build` → review final → merge/deploy.
