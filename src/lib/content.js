// Satu-satunya sumber konten landing page.
// Aturan: komponen TIDAK boleh meng-hardcode string konten (harga, link,
// nama) — semuanya dibaca dari file ini. Makna & angka dikunci PRD §6.

export const site = {
  name: "SyntaxLab",
  wa: "https://wa.me/6281392684232",
  waLabel: "Konsultasi Gratis via WhatsApp",
  waNote: "Respon < 1x24 jam · Tanpa komitmen",
  instagram: "https://instagram.com/syntaxlab_official",
  tiktok: "https://tiktok.com/@syntax.lab5",
  copyright: "© 2026 SyntaxLab. Semua hak cipta dilindungi.",
};

export const hero = {
  titleA: "Sistem yang",
  titleAccent: "benar-benar dipakai,",
  titleB: "bukan cuma dikerjakan",
  sub: "Company profile, sistem informasi, sampai aplikasi tugas akhir, dibangun dari nol dengan kode yang rapi, dan kamu dibimbing sampai paham cara kerjanya, bukan cuma terima jadi.",
  poster: "Kami adalah solusi Anda.",
  posterMeta: "Web · Aplikasi · Sistem Informasi",
};

// Info status (pengganti terminal v1.0): isi identik, bentuk kartu elegan.
export const status = {
  badge: "Siap Menerima Proyek Baru",
  guarantee: "Garansi revisi · 100% bebas bug",
};

// Urutan nav = urutan section di halaman.
export const nav = [
  { href: "#layanan", label: "Layanan" },
  { href: "#manfaat", label: "Manfaat" },
  { href: "#informasi", label: "Harga" },
  { href: "#karya", label: "Portofolio" },
  { href: "#faq", label: "FAQ" },
];

// Layanan — 4 jenis sistem yang dikerjakan (section gelap).
export const services = [
  {
    title: "Sistem Informasi & Manajemen",
    desc: "Otomatisasi operasional bisnis dan instansi. Pembangunan sistem kasir, manajemen inventaris, hingga portal kampus atau sekolah yang terintegrasi untuk meningkatkan efisiensi operasional.",
  },
  {
    title: "Website Bisnis & Company Profile",
    desc: "Fondasi digital yang kredibel. Pembuatan website responsif dan elegan yang berfungsi sebagai etalase digital untuk membangun kepercayaan pasar dan meningkatkan citra bisnis.",
  },
  {
    title: "Pengembangan Aplikasi Kustom",
    desc: "Solusi teknologi berstandar industri. Pengembangan aplikasi mobile maupun web yang dirancang khusus mengikuti alur kerja spesifik kebutuhan bisnis atau organisasi Anda.",
  },
  {
    title: "Implementasi Sistem Akademis",
    desc: "Penerapan riset menjadi sistem fungsional. Pengembangan Sistem Pendukung Keputusan (SPK), Data Mining, atau algoritma spesifik untuk kebutuhan Tugas Akhir/Skripsi dengan kode yang terstruktur.",
  },
];

// Manfaat — 4 alasan kenapa sistem digital penting (section terang).
export const benefits = [
  {
    title: "Kredibilitas & Kepercayaan (Untuk Bisnis & UMKM)",
    desc: "Calon pelanggan menilai profesionalismemu dari kehadiran online. Website company profile yang rapi dan responsif menunjukkan bisnismu bisa dipercaya.",
  },
  {
    title: "Efisiensi Operasional 24/7 (Untuk Instansi & Bisnis)",
    desc: "Proses manual lambat dan gampang salah. Sistem informasi atau aplikasi kustom bikin penjualan, inventaris, dan alur kerja instansi jalan otomatis, 24 jam.",
  },
  {
    title: "Mengubah Data Menjadi Keputusan (Untuk Skripsi & Riset)",
    desc: "Kamu bisa mengumpulkan, mengolah, dan menganalisis data langsung dari sistem. Dari Data Mining sampai Sistem Pendukung Keputusan (SPK), metode di skripsi diuji dengan data nyata.",
  },
  {
    title: "Daya Saing & Skalabilitas Masa Depan",
    desc: "Tanpa sistem yang terstruktur, bisnis makin lambat saat datanya makin banyak. Sistem yang dirancang khusus bisa ikut tumbuh seiring bisnismu berkembang.",
  },
];

// Section Harga (gantikan kartu harga — keputusan owner 27 Sep 2026).
// Harga paket lama (Rp750.000 / Rp1.500.000) dihapus dari halaman.
export const info = {
  title: "Investasi digital yang transparan",
  sub: "Tidak ada biaya tersembunyi. Semua yang kami kerjakan, harganya jelas sejak awal.",
  price: "Mulai dari Rp500.000",
  priceNote:
    "Tarif akhir menyesuaikan fitur yang kamu butuh. Angkanya kita kunci bersama sebelum pengerjaan dimulai.",
  cta: "Tanya harga via WhatsApp",
};

// descBold: frasa yang dirender tebal (penekanan visual saja, teks sama).
export const portfolio = [
  {
    img: "/presensi-pmi.png",
    url: "/presensi-pmi",
    alt: "Tangkapan layar aplikasi Sistem Presensi Mobile PMI Kabupaten Cilacap",
    title: "Sistem Presensi Mobile (PMI Kab. Cilacap)",
    desc: "Aplikasi presensi khusus karyawan dan relawan PMI berbasis Geofencing dan perhitungan radius menggunakan rumus Haversine agar absensi akurat.",
    descBold: ["Geofencing", "Haversine"],
    tags: ["Mobile App", "Geofencing", "Haversine"],
  },
  {
    img: "/presensi-smanda.png",
    url: "/presensi-smanda",
    alt: "Tangkapan layar Sistem Presensi Siswa SMAN 2 Cilacap",
    title: "Sistem Presensi Siswa (SMAN 2 Cilacap)",
    desc: "Platform web & mobile terintegrasi untuk absensi siswa dengan Geofencing & foto real-time. Dilengkapi multi-role (Wali Kelas, Kesiswaan, Operator) & cetak Excel otomatis.",
    descBold: ["Geofencing", "cetak Excel otomatis"],
    tags: ["PHP & Laravel", "Web Responsive", "Multi-Role"],
  },
  {
    img: "/kelola-tugas-akhir-mobile.png",
    url: "/sipta-ta",
    alt: "Tangkapan layar aplikasi Sipta pengelola tugas akhir mobile",
    title: "Sipta - Pengelolaan Tugas Akhir Mobile",
    desc: "Aplikasi pengelolaan progress tugas akhir berbasis mobile untuk dosen dan mahasiswa dalam skala jurusan. Membantu tracking proposal, pembimbing, hingga seminar.",
    descBold: ["dosen dan mahasiswa", "tracking proposal, pembimbing, hingga seminar"],
    tags: ["Mobile App", "Skala Jurusan", "Push Notif"],
  },
];

export const testimonials = [
  {
    stars: 5,
    text: "Pengerjaan sistem mobile-nya sangat cepat dan profesional, hanya membutuhkan waktu beberapa hari dalam pengerjaannya. GPS tracking geofencing dan haversine-nya berfungsi sempurna!",
    name: "Aulia.P",
    role: "Mahasiswa Teknik Informatika",
    initial: "P",
  },
  {
    stars: 4,
    text: "Mantap banget bikin sistem presensi Smanda di sini! Fitur absen geofencing lancar, rekap wali kelas & kesiswaan rapi tinggal cetak Excel, dan dibimbing sampai paham buat sidang.",
    name: "Arfilal.F",
    role: "Mahasiswa Teknik Informatika",
    initial: "A",
  },
  {
    stars: 4.5,
    text: "Hasilnya kurang lebih bagus, untuk semua fiturnya berfungsi dengan semestinya.. overall oke 👍🏽",
    name: "Revano.A",
    role: "Mahasiswa Teknik Informatika",
    initial: "R",
  },
];

export const faqs = [
  {
    q: "Apakah proses instalasi sistem dibantu?",
    a: "Ya. Tim kami akan memandu proses instalasi sistem hingga beroperasi optimal melalui sesi remote (Google Meet / AnyDesk), sehingga siap untuk presentasi atau implementasi langsung.",
  },
  {
    q: "Apakah source code sepenuhnya diserahkan?",
    a: "Ya, 100% kepemilikan source code dan struktur database akan diserahkan sepenuhnya kepada Anda setelah proses pembayaran diselesaikan.",
  },
  {
    q: "Apakah terdapat garansi revisi?",
    a: "Kami menyediakan garansi revisi minor (seperti penyesuaian tampilan atau perbaikan bug) maksimal 3 kali. Penambahan fitur baru atau perubakan alur utama (major) akan dikenakan biaya terpisah yang disepakati di awal.",
  },
];
