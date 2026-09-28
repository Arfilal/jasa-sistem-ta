# PRODUCT.md — SyntaxLab Landing Page

**Produk:** Landing page satu halaman untuk SyntaxLab — jasa pembuatan website, sistem informasi, aplikasi kustom, dan tugas akhir.
**Repo:** `Arfilal/jasa-sistem-ta` · **Live:** `syntaxlab.biz.id`
**Stack:** Next.js 16 (App Router) + React 19 + Tailwind v4, JavaScript (bukan TS), GSAP untuk motion.
**Konten:** satu sumber `src/lib/content.js` — komponen tidak boleh hardcode string (harga, link, nama).

## Tujuan

1. Konversi konsultasi WhatsApp — CTA utama `https://wa.me/6281392684232`.
2. Bukti dulu, klaim kemudian — portfolio di atas harga (proof early).
3. Kesan studio kecil yang rapi, jujur, dan bisa dipercaya — bukan agency besar, bukan template.

## Audiens

- **Primer:** mahasiswa tingkat akhir — deadline kepepet, budget terbatas, butuh sistem yang jalan + dibimbing sampai paham.
- **Sekunder:** UMKM/instansi awam teknis — butuh vendor profesional dengan harga dan alur yang jelas.

## Posisi & Nada Bicara

- Janji inti: "kodingan rapi, bebas bug, dibimbing sampai paham".
- Jujur soal harga, waktu, dan batasan (garansi revisi, estimasi 14–30 hari).
- Bahasa Indonesia santai-profesional, kalimat pendek, tanpa klaim generik.

## Identitas Visual

- Palet: teal `#0d9488` / teal-deep `#0a6e67` di atas paper `#fafaf8` + ink `#0b1120`; section gelap/terang bergantian. Tanpa emas, tanpa gradien ungu-biru.
- Tipografi: Geist (display & body) + JetBrains Mono (data/tag).
- Karakter: editorial-technical — hairline, angka, whitespace. Bukan "brand developer" (tanpa terminal/gaya kode), bukan template AI.

## Kontrak Anti-AI (mengikat semua section)

Detail lengkap di `design.md` §1. Ringkas: tanpa eyebrow label mono uppercase; heading solid tanpa span teal; tanpa all-caps ber-tracking lebar; angka urutan netral; Alur pakai baris hairline (bukan kartu rounded); tanpa animasi loop dekoratif (ping/pulse); tanpa gradien ungu-biru, glassmorphism non-fungsional, ikon lingkaran gradien.

## Batas (Out of Scope)

Tanpa CMS/blog/i18n/halaman tambahan, tanpa dark-mode toggle, tanpa backend/auth/analytics, tanpa migrasi TypeScript.
