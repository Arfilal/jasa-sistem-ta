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
          <a id="kontak" href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300">
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

      {/* PORTFOLIO: Hanya menampilkan 1 karya nyata (Sistem Presensi PMI Putri) */}
      <section className="py-20 bg-white dark:bg-slate-900 px-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Karya Nyata Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10">Proyek sistem tugas akhir yang sukses kami bangun dari nol.</p>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition text-left flex flex-col">
              <div className="h-80 bg-slate-200 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                <img
                  src="/presensi-pmi.png"
                  alt="Sistem Presensi PMI Cilacap"
                  className="h-full w-auto object-contain rounded-lg shadow-sm border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white">Sistem Presensi Mobile (PMI Kab. Cilacap)</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Aplikasi presensi khusus untuk karyawan dan relawan PMI. Menggunakan sistem validasi lokasi berbasis <strong>Geofencing</strong> serta perhitungan radius menggunakan rumus algoritma <strong>Haversine</strong> agar absensi akurat di titik koordinat yang ditentukan.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">Mobile App</span>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full">Geofencing</span>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full">Haversine Algorithm</span>
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

      {/* TESTIMONI: Difokuskan pada ulasan asli Aulia Putri */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900 px-4 transition-colors duration-300">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-white">Apa Kata Klien Kami?</h2>
            
            <div className="bg-white/10 dark:bg-black/25 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-left shadow-lg">
              <div className="flex text-yellow-400 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <p className="text-white text-base md:text-lg italic mb-6 leading-relaxed">
                "Pengerjaan sistem mobile-nya sangat cepat dan profesional, hanya membutuhkan waktu beberapa hari dalam pengerjaannya. GPS tracking geofencing dan haversine-nya berfungsi sempurna saat diuji coba!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-lg mr-4">P</div>
                <div>
                  <h5 className="text-white font-bold text-base">Aulia Putri</h5>
                  <p className="text-white/80 text-sm">Mahasiswa Teknik Informatika (Pemilik TA)</p>
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
          
          {/* Tautan Media Sosial */}
          <div className="flex items-center space-x-6 text-sm">
            <a href="https://instagram.com/syntaxlab_official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram (@syntaxlab)
            </a>
            <a href="https://tiktok.com/@syntax.lab5" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              TikTok (@syntaxlab)
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}