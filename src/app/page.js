"use client";
import { useState, useEffect, useRef } from "react";

// 1. Komponen Pembungkus untuk Efek Animasi Scroll
function Reveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

// 2. Komponen Khusus FAQ (Accordion)
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-colors overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-bold text-lg text-slate-900 dark:text-white">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out px-6 ${
          isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

// 3. Halaman Utama
export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-sans selection:bg-blue-200 transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-600 tracking-tighter">
            Syntax<span className="text-slate-800 dark:text-white transition-colors duration-300">Lab</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>

            <a href="#kontak" className="px-5 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-md font-semibold hover:bg-slate-800 dark:hover:bg-blue-700 transition shadow-sm">
              Hubungi Kami
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-28"></div>

      {/* Hero Section */}
      <Reveal>
        <section className="flex flex-col items-center justify-center text-center pb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight transition-colors duration-300">
            Solusi Pembuatan Website & Aplikasi Kustom <br/> <span className="text-blue-600">Adaptif, Cepat, & Profesional</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-10 transition-colors duration-300">
            Jasa pengembangan software, company profile, sistem informasi, hingga tugas akhir. Kodingan rapi, bebas bug, dan dibimbing sampai paham.
          </p>
          <a id="kontak" href="https://wa.me/6281392684232" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-blue-500 transition-all duration-300 inline-flex items-center gap-3">
            {/* Ikon WhatsApp SVG */}
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Konsultasi Gratis via WhatsApp
          </a>

          {/* Terminal Code Window */}
          <div className="mt-16 w-full max-w-3xl mx-auto bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800 text-left">
            <div className="flex items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-400">status.js</div>
            </div>
            <div className="p-6 text-sm md:text-base font-mono overflow-x-auto leading-relaxed text-slate-300">
              <p><span className="text-pink-500">const</span> <span className="text-blue-400">SyntaxLab</span> = {'{'}</p>
              <p className="pl-6">status: <span className="text-yellow-300">"Siap Menerima Proyek Baru"</span>,</p>
              <p className="pl-6">layanan: [<span className="text-yellow-300">"Sistem Informasi"</span>, <span className="text-yellow-300">"Web Bisnis & UMKM"</span>, <span className="text-yellow-300">"Aplikasi Kustom"</span>, <span className="text-yellow-300">"Tugas Akhir & Skripsi"</span>],</p>
              <p className="pl-6">garansi: <span className="text-pink-500">true</span>,</p>
              <p className="pl-6">kualitas: <span className="text-yellow-300">"100% Bebas Bug"</span></p>
              <p>{'}'};</p>
              <br/>
              <p className="text-slate-500">{'// Hubungi kami untuk konsultasi lebih lanjut!'}</p>
              <p className="text-slate-500">{'// Proses pengerjaan cepat dan kodingan mudah dipahami.'}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Tech Stack Section */}
      <Reveal>
        <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto text-center px-4">
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest">Teknologi yang Kami Kuasai</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">Next.js & React</span>
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">Laravel</span>
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">Node.js</span>
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">MySQL</span>
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">Tailwind CSS</span>
              <span className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-300 transition-colors">Flutter</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Layanan Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Layanan & Keahlian Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3 text-blue-600">Sistem Informasi</h3>
                <p className="text-slate-600 dark:text-slate-400">Pembuatan sistem manajemen, kasir, inventori, dan portal web kampus atau sekolah.</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3 text-blue-600">SPK & Algoritma</h3>
                <p className="text-slate-600 dark:text-slate-400">Implementasi Sistem Pendukung Keputusan, Data Mining, atau algoritma skripsi spesifik.</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3 text-blue-600">Web Profil & Bisnis</h3>
                <p className="text-slate-600 dark:text-slate-400">Website company profile yang responsif, cepat, dan elegan untuk meningkatkan kredibilitas.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pricing/Estimasi Harga Section */}
      <section className="py-20 bg-white dark:bg-slate-800 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Estimasi Harga Paket</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-blue-600">Paket Skripsi / Tugas Akhir</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Mulai dari Rp 750.000</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Cocok untuk mahasiswa tingkat akhir yang butuh sistem siap sidang lengkap dengan bimbingan.</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-blue-600">Paket Web Bisnis / Company Profile</h3>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Mulai dari Rp 1.500.000</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Cocok untuk UMKM, instansi, atau perusahaan yang ingin memperluas jangkauan digital.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Karya Nyata Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12">Proyek sistem tugas akhir dan aplikasi nyata yang sukses kami bangun dari nol.</p>
            
            {/* Grid 3 Kolom Sejajar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              
              {/* Portofolio 1: Presensi PMI */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col justify-between p-6">
                <div>
                  <div className="h-48 bg-slate-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-slate-700">
                    <img src="/presensi-pmi.png" alt="Sistem Presensi PMI" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Sistem Presensi Mobile (PMI Kab. Cilacap)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Aplikasi presensi khusus karyawan dan relawan PMI berbasis <strong>Geofencing</strong> dan perhitungan radius menggunakan rumus <strong>Haversine</strong> agar absensi akurat.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">Mobile App</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-full">Geofencing</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">Haversine</span>
                </div>
              </div>

              {/* Portofolio 2: Presensi SMAN 2 Cilacap */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col justify-between p-6">
                <div>
                  <div className="h-48 bg-slate-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-slate-700">
                    <img src="/presensi-smanda.png" alt="Presensi SMAN 2 Cilacap" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Sistem Presensi Siswa (SMAN 2 Cilacap)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Platform web & mobile terintegrasi untuk absensi siswa dengan <strong>Geofencing</strong> & foto real-time. Dilengkapi multi-role (Wali Kelas, Kesiswaan, Operator) & cetak Excel otomatis.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">PHP & Laravel</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">Web Responsive</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full">Multi-Role</span>
                </div>
              </div>

              {/* Portofolio 3: Sipta - Kelola Tugas Akhir */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col justify-between p-6">
                <div>
                  <div className="h-48 bg-slate-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-slate-700">
                    <img src="/kelola-tugas-akhir-mobile.png" alt="Sipta - Kelola Tugas Akhir" className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Sipta - Pengelolaan Tugas Akhir Mobile</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Aplikasi pengelolaan progress tugas akhir berbasis mobile untuk dosen dan mahasiswa dalam skala jurusan. Membantu tracking proposal, pembimbing, hingga seminar.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-full">Mobile App</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full">Skala Jurusan</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">push notifikasi realtime</span>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 px-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Alur Pemesanan</h2>
            
            {/* Baris 1: Berisi 3 Card di atas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-colors shadow-sm">
                <div className="text-slate-100 dark:text-slate-700 font-black text-6xl absolute -top-2 -right-2 opacity-60">1</div>
                <h4 className="font-bold text-lg mb-2 relative z-10 text-slate-900 dark:text-white">Konsultasi</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 relative z-10">Diskusikan fitur yang dibutuhkan dan kesepakatan harga sistem.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-colors shadow-sm">
                <div className="text-slate-100 dark:text-slate-700 font-black text-6xl absolute -top-2 -right-2 opacity-60">2</div>
                <h4 className="font-bold text-lg mb-2 relative z-10 text-slate-900 dark:text-white">DP Masuk</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 relative z-10">Pembayaran uang muka minimal 40% untuk memulai koding.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-colors shadow-sm">
                <div className="text-slate-100 dark:text-slate-700 font-black text-6xl absolute -top-2 -right-2 opacity-60">3</div>
                <h4 className="font-bold text-lg mb-2 relative z-10 text-slate-900 dark:text-white">Proses & Demo</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 relative z-10">Pengerjaan sistem disertai update progres dan demo hasil.</p>
              </div>
            </div>

            {/* Baris 2: Berisi 2 Card di bawah (diatur agar otomatis rata tengah) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-colors shadow-sm">
                <div className="text-slate-100 dark:text-slate-700 font-black text-6xl absolute -top-2 -right-2 opacity-60">4</div>
                <h4 className="font-bold text-lg mb-2 relative z-10 text-slate-900 dark:text-white">Serah Terima</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 relative z-10">Pelunasan sisa biaya dan penyerahan source code lengkap.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-colors shadow-sm flex flex-col justify-center">
                <div className="text-slate-100 dark:text-slate-700 font-black text-6xl absolute -top-2 -right-2 opacity-60">5</div>
                <h4 className="font-bold text-lg mb-1 relative z-10 text-slate-900 dark:text-white">⏱️ Estimasi Waktu</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 relative z-10 font-medium">14 - 30 hari kerja tergantung tingkat kesulitan sistem.</p>
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* Testimoni Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-950 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">Apa Kata Klien Kami?</h2>
            
            {/* Grid 3 Kolom untuk Testimoni */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              
              {/* Testimoni 1: Aulia Putri (5 Bintang Penuh) */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-300 mb-3">{"★".repeat(5)}</div>
                  <p className="text-white text-sm italic leading-relaxed mb-6">
                    "Pengerjaan sistem mobile-nya sangat cepat dan profesional, hanya membutuhkan waktu beberapa hari dalam pengerjaannya. GPS tracking geofencing dan haversine-nya berfungsi sempurna!"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-sm">P</div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Aulia Putri</h4>
                    <p className="text-[11px] text-blue-200">Mahasiswa Teknik Informatika</p>
                  </div>
                </div>
              </div>

              {/* Testimoni 2: Arfilal Faiznadi (4 Bintang) */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-300 mb-3">
                    {"★".repeat(4)}<span className="text-white/40">★</span>
                  </div>
                  <p className="text-white text-sm italic leading-relaxed mb-6">
                    "Mantap banget bikin sistem presensi Smanda di sini! Fitur absen geofencing lancar, rekap wali kelas & kesiswaan rapi tinggal cetak Excel, dan dibimbing sampai paham buat sidang."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-sm">A</div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Arfilal Faiznadi</h4>
                    <p className="text-[11px] text-blue-200">Mahasiswa Teknik Informatika</p>
                  </div>
                </div>
              </div>

              {/* Testimoni 3: Revano Augustofa (4.5 Bintang / 4 Penuh + 1 Setengah) */}
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-300 mb-3 relative">
                    {"★".repeat(4)}
                    <span className="relative inline-block text-white/40">
                      ★
                      <span className="absolute top-0 left-0 overflow-hidden text-yellow-300 w-[50%]">★</span>
                    </span>
                  </div>
                  <p className="text-white text-sm italic leading-relaxed mb-6">
                    "Hasilnya kurang lebih bagus, untuk semua fiturnya berfungsi dengan semestinya.. overall oke 👍🏽"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-sm">R</div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Revano Augustofa</h4>
                    <p className="text-[11px] text-blue-200">Mahasiswa Teknik Informatika</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-slate-900 dark:text-white">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <div className="space-y-4">
              
              <FaqItem 
                question="Apakah dibantu proses instalasi ke laptop?" 
                answer="Tentu! Kami akan membantu proses instalasi sistem ke laptop kamu via remote (Google Meet / AnyDesk) sampai sistem benar-benar bisa berjalan dan siap didemokan ke dosen." 
              />
              <FaqItem 
                question="Apakah source code sepenuhnya diberikan?" 
                answer="Ya, 100% source code (termasuk database) akan menjadi milik kamu dan akan diserahkan setelah proses pelunasan selesai." 
              />
              <FaqItem 
                question="Apakah mendapat garansi revisi?" 
                answer="Kami memberikan garansi gratis revisi minor (perbaikan bug, ubah warna/teks) maksimal 3 kali. Untuk revisi major (penambahan fitur baru atau ubah alur) akan dikenakan biaya tambahan sesuai kesepakatan." 
              />

            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 text-center transition-colors duration-300 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 SyntaxLab. Semua hak cipta dilindungi.</p>
          
          {/* Tautan Media Sosial dengan Ikon */}
          <div className="flex items-center space-x-6 text-sm">
            {/* Instagram */}
            <a href="https://instagram.com/syntaxlab_official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/@syntax.lab5" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}