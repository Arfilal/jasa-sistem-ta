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
  label: "// jasa-pembuatan-sistem",
  titleA: "Solusi Pembuatan Website & Aplikasi Kustom",
  titleB: "Adaptif, Cepat, & Profesional",
  sub: "Jasa pengembangan software, company profile, sistem informasi, hingga tugas akhir. Kodingan rapi, bebas bug, dan dibimbing sampai paham.",
};

// Baris terminal: [teks, classWarna]. Kelas memakai token di globals.css.
export const terminalLines = [
  [
    ["const ", "text-kw"],
    ["SyntaxLab ", "text-var"],
    ["= {", "text-muted"],
  ],
  [
    ["  status: ", "text-muted"],
    ['"Siap Menerima Proyek Baru"', "text-str"],
    [",", "text-muted"],
  ],
  [
    ["  layanan: [", "text-muted"],
    ['"Sistem Informasi"', "text-str"],
    [", ", "text-muted"],
    ['"Web Bisnis & UMKM"', "text-str"],
    [", ", "text-muted"],
    ['"Aplikasi Kustom"', "text-str"],
    [", ", "text-muted"],
    ['"Tugas Akhir & Skripsi"', "text-str"],
    ["],", "text-muted"],
  ],
  [
    ["  garansi: ", "text-muted"],
    ["true", "text-kw"],
    [",", "text-muted"],
  ],
  [
    ["  kualitas: ", "text-muted"],
    ['"100% Bebas Bug"', "text-str"],
  ],
  [
    ["};", "text-muted"],
  ],
  [
    ["// Hubungi kami untuk konsultasi lebih lanjut!", "text-faint"],
  ],
  [
    ["// Proses pengerjaan cepat dan kodingan mudah dipahami.", "text-faint"],
  ],
];

export const tech = [
  "Next.js & React",
  "Laravel",
  "Node.js",
  "MySQL",
  "Tailwind CSS",
  "Flutter",
];

export const services = [
  {
    marker: ">_",
    title: "Sistem Informasi",
    desc: "Pembuatan sistem manajemen, kasir, inventori, dan portal web kampus atau sekolah.",
    highlight: true,
  },
  {
    marker: "//",
    title: "SPK & Algoritma",
    desc: "Implementasi Sistem Pendukung Keputusan, Data Mining, atau algoritma skripsi spesifik.",
    highlight: false,
  },
  {
    marker: "[]",
    title: "Web Profil & Bisnis",
    desc: "Website company profile yang responsif, cepat, dan elegan untuk meningkatkan kredibilitas.",
    highlight: false,
  },
];

export const pricing = [
  {
    label: "// skripsi",
    title: "Paket Skripsi / Tugas Akhir",
    price: "Rp 750.000",
    prefix: "Mulai dari",
    desc: "Cocok untuk mahasiswa tingkat akhir yang butuh sistem siap sidang lengkap dengan bimbingan.",
    featured: false,
  },
  {
    label: "// bisnis",
    title: "Paket Web Bisnis / Company Profile",
    price: "Rp 1.500.000",
    prefix: "Mulai dari",
    desc: "Cocok untuk UMKM, instansi, atau perusahaan yang ingin memperluas jangkauan digital.",
    featured: true,
  },
];

// descBold: frasa yang dirender tebal (penekanan visual saja, teks sama).
export const portfolio = [
  {
    img: "/presensi-pmi.png",
    alt: "Tangkapan layar aplikasi Sistem Presensi Mobile PMI Kabupaten Cilacap",
    title: "Sistem Presensi Mobile (PMI Kab. Cilacap)",
    desc: "Aplikasi presensi khusus karyawan dan relawan PMI berbasis Geofencing dan perhitungan radius menggunakan rumus Haversine agar absensi akurat.",
    descBold: ["Geofencing", "Haversine"],
    tags: ["Mobile App", "Geofencing", "Haversine"],
  },
  {
    img: "/presensi-smanda.png",
    alt: "Tangkapan layar Sistem Presensi Siswa SMAN 2 Cilacap",
    title: "Sistem Presensi Siswa (SMAN 2 Cilacap)",
    desc: "Platform web & mobile terintegrasi untuk absensi siswa dengan Geofencing & foto real-time. Dilengkapi multi-role (Wali Kelas, Kesiswaan, Operator) & cetak Excel otomatis.",
    descBold: ["Geofencing", "cetak Excel otomatis"],
    tags: ["PHP & Laravel", "Web Responsive", "Multi-Role"],
  },
  {
    img: "/kelola-tugas-akhir-mobile.png",
    alt: "Tangkapan layar aplikasi Sipta pengelola tugas akhir mobile",
    title: "Sipta - Pengelolaan Tugas Akhir Mobile",
    desc: "Aplikasi pengelolaan progress tugas akhir berbasis mobile untuk dosen dan mahasiswa dalam skala jurusan. Membantu tracking proposal, pembimbing, hingga seminar.",
    descBold: ["dosen dan mahasiswa", "tracking proposal, pembimbing, hingga seminar"],
    tags: ["Mobile App", "Skala Jurusan", "Push Notif"],
  },
];

export const process = [
  {
    title: "Konsultasi",
    desc: "Diskusikan fitur yang dibutuhkan dan kesepakatan harga sistem.",
  },
  {
    title: "DP Masuk",
    desc: "Pembayaran uang muka minimal 40% untuk memulai koding.",
  },
  {
    title: "Proses & Demo",
    desc: "Pengerjaan sistem disertai update progres dan demo hasil.",
  },
  {
    title: "Serah Terima",
    desc: "Pelunasan sisa biaya dan penyerahan source code lengkap.",
  },
  {
    title: "Estimasi Waktu",
    desc: "14 - 30 hari kerja tergantung tingkat kesulitan sistem.",
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
    q: "Apakah dibantu proses instalasi ke laptop?",
    a: "Tentu! Kami akan membantu proses instalasi sistem ke laptop kamu via remote (Google Meet / AnyDesk) sampai sistem benar-benar bisa berjalan dan siap didemokan ke dosen.",
  },
  {
    q: "Apakah source code sepenuhnya diberikan?",
    a: "Ya, 100% source code (termasuk database) akan menjadi milik kamu dan akan diserahkan setelah proses pelunasan selesai.",
  },
  {
    q: "Apakah mendapat garansi revisi?",
    a: "Kami memberikan garansi gratis revisi minor (perbaikan bug, ubah warna/teks) maksimal 3 kali. Untuk revisi major (penambahan fitur baru atau ubah alur) akan dikenakan biaya tambahan sesuai kesepakatan.",
  },
];
