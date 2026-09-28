import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ponytail: satu font sans (Geist) untuk display & body — permintaan "minimalis";
// italic tidak dipakai sama sekali, jadi tidak di-load. `font-serif` di komponen
// tetap ada, cuma variabelnya di-remap ke Geist di globals.css.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SyntaxLab - Pembuatan Sistem & Web Profesional",
  description:
    "Jasa pembuatan website, sistem informasi, dan tugas akhir. Rapi, bebas bug, dibimbing sampai paham.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "SyntaxLab - Pembuatan Sistem & Web Profesional",
    description:
      "Jasa pembuatan website, sistem informasi, dan tugas akhir untuk mahasiswa & UMKM.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen overflow-x-clip bg-paper font-serif text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
