import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
    <html lang="id" className={`${jakarta.variable} ${instrument.variable}`}>
      <body className="min-h-screen overflow-x-clip bg-paper font-display text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
