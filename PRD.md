# PRD — Redesign Total Landing Page SyntaxLab

**Versi:** 1.1 · **Tanggal:** 26 Sep 2026 · **Status:** Draft — menunggu review owner
**Repo:** `Arfilal/jasa-sistem-ta` (live: `syntaxlab.biz.id`) · **Stack:** Next.js 16 + React 19 + Tailwind CSS v4 (dipertahankan)

## Changelog v1.0 → v1.1

Keputusan owner 26 Sep 2026 — perubahan arah tema (bukan dari nol):

1. **Tema terang satu surface** (menggantikan dark-only): audiens campuran mahasiswa + UMKM/instansi awam teknis butuh kesan profesional & tepercaya, bukan niche hacker/terminal.
2. **Terminal `status.js` dihapus** → diganti status card elegan (badge + checklist layanan + baris garansi). Info sama persis, bentuk bukan kode.
3. **Tipografi identitas diganti**: Space Grotesk + JetBrains Mono → Plus Jakarta Sans + Instrument Serif italic (Opsi A, lihat `design.md` §2.2). Mono dihapus total; angka pakai `tabular-nums`.
4. **Aksen oranye → emas/brass** (`#C9A254`): radar sebagai alasan semantik sudah tidak ada; emas = hangat, premium, meyakinkan untuk klien bisnis.
5. **Three.js/WebGL dihapus** → background Canvas 2D "kontur topografi" (ambience, bukan atraksi). Alasan: lebih murah (tanpa dep, tanpa WebGL), cukup untuk efek yang diinginkan, aman untuk target Lighthouse.
6. §1, §3, §4, §5, §7, §8, §9 disesuaikan; **§6 tidak berubah makna** (satu baris bentuk-baru dicatat); urutan section, proof-early, anti-slop, dan alur kerja tetap.

---

## 1. Latar & Tujuan

Landing page saat ini (satu file `src/app/page.js` monolit, tanpa diferensiasi visual) terlihat seperti template generik dan tidak mencerminkan positioning jasa profesional. Redesign total bertujuan:

1. **Menaikkan konversi konsultasi WhatsApp** — pengunjung (mahasiswa TA & owner UMKM/instansi) paham tawaran dalam <10 detik dan menekan CTA.
2. **Membangun trust lewat bukti awal** — portfolio nyata ditampilkan sebelum harga ("proof early").
3. **Membangun kesan company profile premium** — terang, simpel, rapi, elegan; meyakinkan untuk klien bisnis yang awam teknis. Bukan "brand developer": tanpa terminal, tanpa label gaya kode, tanpa radar dashboard. Tetap bebas cliché AI (gradien ungu-biru, glassmorphism tanpa fungsi, ikon generik dalam lingkaran gradien, cream+terracotta generik).

## 2. Target User

| Persona | Ciri | Motivasi utama | Keraguan yang harus dijawab halaman |
|---|---|---|---|
| **Mahasiswa tingkat akhir (primer)** | Informatika/SI, kepepet deadline sidang, budget terbatas | "Sistemku jadi, bisa didemokan ke dosen, aku paham kodenya" | Apakah ini beneran bisa bikin sistem jalan? Apakah dibimbing sampai paham? Berapa harganya? |
| **Pemilik UMKM/instansi (sekunder, awam teknis)** | Butuh company profile / sistem kasir / inventori | "Vendor ini profesional dan bisa dipercaya" | Apakah hasilnya profesional? Bagaimana alur & pembayarannya? |

Keduanya datang dari link langsung/organik, mayoritas via **mobile**. Mereka tidak peduli preferensi tema — mereka peduli bukti, harga, dan cara pesan. Tema terang dipilih karena terasa terbuka & tepercaya bagi audiens non-teknis.

## 3. Goals & Success Metrics

| # | Metric | Target | Cara ukur |
|---|---|---|---|
| 1 | Lighthouse Performance (mobile) | ≥ 80 | `npm run build` + audit Chrome, dengan canvas aktif |
| 2 | Lighthouse Performance (desktop) | ≥ 90 | idem |
| 3 | Lighthouse Accessibility | ≥ 95 | idem (kontras di atas terang, landmark, focus, `aria` FAQ/canvas) |
| 4 | Paritas konten | 100% — semua data §6 tampil, makna tidak berubah | checklist manual saat review per section |
| 5 | Integritas aset & link | 3 PNG portfolio render, favicon tampil, link WA/IG/TikTok tepat | klik manual + `next build` tanpa 404 |
| 6 | Build bersih | `npm run build` sukses, tanpa error/warning baru, tanpa `console.log` | CI/Vercel + review |
| 7 | Canvas tidak merusak UX low-end | 1 frame statis & diam saat `prefers-reduced-motion`; pause saat offscreen/hidden; smooth di emulasi Moto G4 | testing manual §9 |

## 4. Scope

### In-scope (P0 — wajib)

1. Hero + background Canvas 2D "kontur" (ambience ringan) + status card elegan (pengganti terminal).
2. Strip teknologi (6 item).
3. Portfolio "Karya Nyata Kami" — 3 proyek + 3 PNG existing via `next/image`.
4. Layanan (3 kartu), Harga (2 paket), Alur (5 langkah), Testimoni (3), FAQ (3), Final CTA + Footer.
5. Split `page.js` monolit menjadi komponen per section + `src/lib/content.js` sebagai satu sumber konten.
6. Design system v1.1: token terang, tipografi (Plus Jakarta Sans + Instrument Serif via `next/font`), spacing, motion.
7. Tema terang satu surface: tanpa toggle, tanpa varian tema ganda (satu surface seperti sebelumnya — hanya dibalik dari gelap ke terang).

### In-scope (P1 — pelengkap)

8. Micro-interactions + scroll-reveal (framer-motion, restrained — lihat `design.md` §6).
9. Copywriting polish persuasif (makna & angka dikunci §6).
10. Hapus aset template tak terpakai + uninstall `three` (tidak lagi dipakai).

### Out-of-scope (eksplisit tidak dikerjakan)

- Migrasi TypeScript, CMS/blog, i18n, halaman tambahan, analytics/event tracking.
- Three.js/WebGL, Spline, R3F/Drei untuk efek apapun di halaman ini.
- Dark mode / toggle tema, auth, backend, perubahan harga/fitur bisnis.

## 5. Struktur Section & Prioritas

Urutan final (keputusan owner: **proof early** — tetap, tidak berubah di v1.1):

| Urutan | Section | Prioritas | Alasan posisi |
|---|---|---|---|
| 1 | Navbar (logo, status badge, CTA WA) | P0 | orientasi + CTA selalu terlihat |
| 2 | Hero (headline, CTA, status card, backdrop kontur) | P0 | <10 detik paham tawaran; elegan-restraint sebagai kesan pertama |
| 3 | Strip teknologi | P0 | kredibilitas cepat, murah secara vertikal |
| 4 | **Portfolio (naik ke atas)** | P0 | bukti sebelum klaim — menjawab keraguan utama |
| 5 | Layanan & Keahlian | P0 | mengkategorikan kebutuhan pengunjung |
| 6 | Estimasi Harga | P0 | angka setelah bukti → terasa wajar |
| 7 | Alur Pemesanan | P0 | menurunkan friksi ("bagaimana cara pesan?") |
| 8 | Testimoni | P1 | penguat sosial menjelang keputusan |
| 9 | FAQ | P1 | menangani objeksi terakhir (instalasi, source code, revisi) |
| 10 | Final CTA + Footer | P0 | CTA kedua setelah semua objeksi terjawab |

Detail layout tiap section ada di `design.md` §4.

## 6. Inventaris Konten Terkunci (makna tidak boleh berubah)

- **Hero:** headline "Solusi Pembuatan Website & Aplikasi Kustom — Adaptif, Cepat, & Profesional"; CTA "Konsultasi Gratis via WhatsApp" → `https://wa.me/6281392684232` (tab baru, `rel noopener`).
- **Info status (bentuk baru di v1.1, isi sama):** status "Siap Menerima Proyek Baru"; layanan ["Sistem Informasi", "Web Bisnis & UMKM", "Aplikasi Kustom", "Tugas Akhir & Skripsi"]; garansi; kualitas "100% Bebas Bug". Disajikan sebagai badge + checklist + baris garansi — bukan blok kode.
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
3. Dependensi animasi/interaksi **hanya** `framer-motion`. Canvas 2D = API browser murni (tanpa dep). Font via `next/font` (tanpa dep). `three` di-uninstall.
4. Gambar portfolio via `next/image` (`sizes` responsif, `alt` deskriptif); path `/public` tidak berubah.
5. Canvas dimuat client-only (pola rAF-upgrade pasca-hydration, pelajaran insiden v1.0); render 1 frame statis + diam saat `prefers-reduced-motion`; pause `rAF` saat offscreen/tab hidden; DPR clamp ≤1.5.
6. Mobile-first; backdrop tetap halus & murah di perangkat low-end (lihat budget `design.md` §5).
7. Komentar singkat wajib di setup canvas dan bagian kompleks lain.

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Canvas 2D membebani mobile/low-end | tanpa dep & tanpa WebGL; ±40 stroke statis digeser (bukan dihitung ulang); DPR ≤1.5; pause offscreen/hidden; target Lighthouse §3 |
| Tema terang terasa generik (cream+terracotta template) | emas dipakai hemat (CTA, marker, eyebrow rule); paper hangat + ink pekat + hairline presisi — lihat `design.md` §2.1 |
| framer-motion terasa "template fade-up di mana-mana" | motion spec restrained di `design.md` §6 (satu momen hero + reveal opacity-only) |
| Copy polish mengubah makna harga/fitur | §6 dikunci; review per section membandingkan dengan halaman live |
| Penghapusan terminal mengecewakan pengunjung teknis lama | info yang sama tetap tampil (badge + checklist); audiens primer/sekunder di §2 tidak mengandalkan estetika kode |

## 9. Acceptance Criteria (definisi selesai)

- [ ] `npm run build` sukses; tidak ada `console.log`, import tak terpakai; `three` tidak ada di bundle.
- [ ] Semua 9 section tampil sesuai urutan §5 di mobile/tablet/desktop tanpa overflow horizontal.
- [ ] 3 gambar portfolio + favicon tampil (path existing, via `next/image`).
- [ ] Link WA/IG/TikTok persis seperti §6; CTA membuka tab baru dengan `rel="noopener noreferrer"`.
- [ ] Angka (harga, DP 40%, 14–30 hari, revisi 3×) sama dengan halaman live.
- [ ] Skor Lighthouse memenuhi §3 (diukur setelah build produksi).
- [ ] FAQ bisa dibuka via keyboard (`Enter`/`Space`), `aria-expanded` benar; canvas `aria-hidden`, diam saat reduced-motion.
- [ ] Tidak ada hydration error (konsol bersih saat hard refresh).
- [ ] Review owner per section selesai; temuan FAIL kembali ke implementasi (maksimal 2 putaran per section sebelum eskalasi).

## 10. Fase Kerja

1. **Dokumen v1.1** (sekarang): revisi `PRD.md` + `design.md` → review owner.
2. **Rework implementasi** mengikuti v1.1 section per section (uninstall `three`, token terang, font baru, status card, backdrop canvas, hapus terminal/radar).
3. **Pass akhir**: a11y + performa + `npm run build` → review final → merge/deploy (tanpa push tanpa perintah eksplisit).
