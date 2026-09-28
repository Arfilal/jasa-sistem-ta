# PRD — Landing Page SyntaxLab (redesain total)

**Versi:** 2.0 · **Tanggal:** 27 Sep 2026 · **Status:** Draft
**Repo:** `Arfilal/jasa-sistem-ta` (live: `syntaxlab.biz.id`) · **Stack:** Next.js 16 + React 19 + Tailwind v4 + GSAP (JavaScript, tanpa TS)
**Pasangan:** `design.md` v2.0 · `PRODUCT.md`

## Changelog v1.1 → v2.0

1. **Dokumen diluruskan ke realitas implementasi:** palet teal/navy di atas paper + section gelap/terang bergantian (bukan emas/terang); Geist + JetBrains Mono (bukan Plus Jakarta Sans + Instrument Serif); GSAP + ScrollTrigger (bukan framer-motion); backdrop canvas dihapus.
2. **Section "Estimasi Harga" → "Informasi":** satu harga **"Mulai dari Rp500 ribu"** + `priceNote` + 6 alasan (framing perusahaan/UMKM, tanpa konteks mahasiswa/TA) + CTA "Tanya harga via WhatsApp". Dua paket lama (Rp750.000 / Rp1.500.000) dihapus dari halaman — keputusan owner. Nav "Harga" → "Informasi" (`#informasi`).
3. **Konsep anti-AI diperketat** (design.md §1): hapus eyebrow label mono uppercase (termasuk komponen `SectionLabel`), hapus span teal di heading, hapus all-caps ber-tracking lebar, angka urutan netral, Alur & Informasi pakai baris hairline (bukan kartu rounded), poster Hero jadi kalimat biasa, hapus animasi ping/loop dekoratif, badge "Paling Populer" dihapus.
4. **Hapus komponen mati:** `ui/SectionLabel.jsx`, `ui/StatusCard.jsx`.

---

## 1. Latar & Tujuan

Landing page satu halaman sebagai satu-satunya etalase digital SyntaxLab. Tujuan:

1. **Konversi konsultasi WhatsApp** — CTA utama `https://wa.me/6281392684232` di Hero, Final Cta, Footer, Informasi.
2. **Bukti dulu, klaim kemudian** — portfolio (3 karya + screenshot nyata) tampil sebelum harga.
3. **Kesan studio kecil yang jujur & rapi** — harga, waktu, dan batasan disebut terbuka; halaman terlihat dibuat, bukan template.

## 2. Target User

| | Primer | Sekunder |
|---|---|---|
| Siapa | Mahasiswa tingkat akhir (TA/skripsi) | UMKM / instansi awam teknis |
| Kebutuhan | Sistem/web yang jalan + dibimbing sampai paham | Website/aplikasi bisnis yang profesional |
| Kecemasan | Deadline kepepet, bug, harga mahal | Vendor abal-abal, harga tak jelas, komunikasi lambat |
| Sinyal di halaman | Estimasi 14–30 hari, garansi revisi, "dibimbing sampai paham" | Harga "Mulai dari Rp500 ribu", alur pemesanan jelas, karya nyata |

## 3. Goals & Metrics

| Goal | Metrik |
|---|---|
| Konversi WA | Klik CTA `wa.me` jadi kanal utama (tanpa analytics — observasi manual) |
| Kepercayaan | 3 karya + 3 testimoni + statistik tampil sebelum harga |
| Paritas konten | Semua teks/angka/link = `content.js` §6 — nol string hardcoded |
| Kualitas | `npm run build` bersih; nol `console.log`/import mati; Lighthouse a11y/perf ≥ 90 |
| Anti-template | Lulus checklist design.md §1 (tanpa eyebrow/span teal/all-caps/ping) |

## 4. Scope

**P0 (wajib):**
- Dokumen v2.0 (PRODUCT.md, design.md, PRD.md) — ini.
- **Rencana A:** `content.js` hapus `pricing` → tambah `info`; `Pricing.jsx` → `Info.jsx` (id `informasi`); nav `#informasi`; swap di `page.js`.
- **Rencana B:** sweep anti-AI per checklist design.md §1.1 (§11 baris).
- Verifikasi: `npm run build` + screenshot per section.

**P1 (nice-to-have):** copy polish, micro-interaction hover, pembersihan aset tak terpakai.

**Out of scope:** migrasi TypeScript, CMS/blog/i18n/halaman tambahan, dark-mode toggle, backend/auth/analytics, framer-motion/three.js/backdrop canvas (sudah dibuang), pertanyaan harga paket lama (sudah dihapus dari halaman).

## 5. Struktur Section (page.js)

| # | Section | Latar | Posisi |
|---|---|---|---|
| 0 | Navbar | transparan → sticky | fixed atas |
| 1 | Hero | terang | H1 + poster + meta |
| 2 | Layanan | gelap `bg-ink` | 4 kolom hairline |
| 3 | Alur | terang | 4 baris hairline + estimasi |
| 4 | **Informasi (baru)** | terang | harga + 6 alasan + CTA WA |
| 5 | Karya | gelap `bg-ink` | 3 phone mockup + statistik |
| 6 | Testimoni | terang | quote besar + kartu rata-rata + 2 quote |
| 7 | FAQ | terang | accordion 3 item |
| 8 | Final CTA | `bg-teal-deep` | H2 + CTA inverse + IG |
| 9 | Footer | gelap `bg-ink` | 3 kolom |
| — | BackToTop | — | tombol muncul saat scroll |

Nav: Karya · Layanan · **Informasi** · Alur · FAQ · [Hubungi Kami].

## 6. Inventaris Konten Terkunci (sumber: `src/lib/content.js`)

| Section | Konten (angka/teks/fakta tidak boleh berubah) |
|---|---|
| Hero | H1 `titleA/titleAccent/titleB`: **"Website & Aplikasi kustom, cepat & rapi"** · sub "Bikin sistem yang beneran jalan — rapi, bebas bug, dibimbing sampai paham." · CTA **"Konsultasi Gratis via WhatsApp"** → `site.wa` · catatan "Gratis konsultasi & estimasi" · status "● Siap Menerima Proyek Baru" · tech: **5** item (Next.js, Laravel, Node.js, MySQL, Flutter) · poster: **kalimat biasa** (bukan "WE ARE YOUR SOLUTION") + meta "Web · Aplikasi · Sistem Informasi" |
| Layanan | 4 kartu (angka, judul, tag, deskripsi) + meta strip bawah (garansi 3× revisi, stack, "Kode rapi bebas bug") |
| Alur | 5 tahap (S1–S4 + "Siklus bersifat berulang…") + estimasi 14–30 hari + catatan "Biaya dibayar dua tahap: DP 40% di muka…" |
| **Informasi (baru)** | `price`: **"Mulai dari Rp500 ribu"** · `priceNote`: "Lingkup fitur menentukan angka akhir — patokan mulai dari Rp500 ribu, dikunci hitam-putih saat konsultasi." · **6 alasan** (framing perusahaan/UMKM, tanpa konteks mahasiswa/TA): patokan harga di depan · bayar bertahap DP 40% · bayar sesuai lingkup fitur · source code milik klien setelah lunas · garansi revisi 3× · estimasi waktu jelas 14–30 hari · CTA **"Tanya harga via WhatsApp"** → `site.wa` |
| Karya | 3 proyek (judul, path gambar, deskripsi, tags) + statistik (nilai + label) |
| Testimoni | 3 testimoni (teks asli, termasuk emoji — dipertahankan) + label "Rata-rata dari 3 ulasan" + strip teknologi |
| FAQ | 3 pertanyaan + jawaban (teks asli) |
| Final Cta | H2 + sub + CTA + link Instagram |
| Footer | brand · kolom "Jelajahi" (nav) · kolom "Kontak" (WA/Instagram/TikTok/email) · baris bawah "© 2026 SyntaxLab" |

**Catatan harga:** kata "Rp750.000" dan "Rp1.500.000" tidak boleh muncul di mana pun di halaman; satu-satunya angka harga = "Mulai dari Rp500 ribu".

## 7. Asumsi Teknis

- Motion: hanya GSAP + ScrollTrigger (`lib/gsap.js`, `lib/useReveal.js`), guard `prefers-reduced-motion`.
- Font: `next/font` Geist + JetBrains_Mono (layout.js) — `font-serif` di-remap ke Geist.
- Gambar: `next/image`, 3 PNG mockup + 1 PNG frame iPhone; screenshot clip dengan `overflow-hidden` + `borderRadius "14% / 6.4%"`.
- Konten: `content.js` = satu-sumber; link WA `6281392684232` dipertahankan persis.
- Nol dependensi baru untuk Rencana A/B — murni edit komponen/konten.

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Penghapusan dua paket harga menurunkan kejelasan biaya | "Mulai dari Rp500 ribu" + `priceNote` + 6 alasan; detail lewat CTA WA (harga dikunci saat konsultasi) |
| Section Informasi framing UMKM sementara persona primer mahasiswa | Harga "mulai dari" berlaku umum; layanan & FAQ tetap menyebut TA; angka §6 tidak diubah di luar `info` |
| Sweep anti-AI bikin halaman terasa datar | Ritme gelap/terang + whitespace + hairline + aksen teal fungsional (design.md §1) |
| Hapus `SectionLabel` meninggalkan sisa teks nyangkut | Verifikasi grep: nol `SectionLabel`, `animate-ping`, `text-teal">` di heading; build + review visual per section |

## 9. Acceptance Criteria

1. `npm run build` sukses; nol `console.log`, nol import mati.
2. `ui/SectionLabel.jsx` dan `ui/StatusCard.jsx` tidak ada; `Pricing.jsx` sudah jadi `Info.jsx`; `page.js` mengimpor urutan §5; nav menunjuk `#informasi`.
3. Checklist design.md §1.1 (11 baris) terpenuhi — review visual per section: heading solid, tanpa eyebrow, angka netral, Alur/Informasi baris hairline, poster kalimat biasa, tanpa ping.
4. Seluruh angka/teks/link §6 identik dengan `content.js`; "Mulai dari Rp500 ribu" satu-satunya angka harga.
5. `prefers-reduced-motion` dihormati; FAQ punya `aria-expanded`/`region`; satu `h1`; alt 3 PNG deskriptif.
6. Review owner atas ketiga dokumen + hasil visual = disetujui.

## 10. Fase Kerja

1. **Dokumen v2.0** (PRODUCT.md, design.md, PRD.md) → review owner. ← sekarang
2. **Rencana A** — `content.js` + `Info.jsx` + nav + `page.js`.
3. **Rencana B** — sweep anti-AI per checklist design.md §1.1.
4. **Verifikasi** — `npm run build`, grep sweep, screenshot per section → review owner.
