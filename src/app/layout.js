import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "SyntaxLab - Pembuatan Sistem & Web Profesional",
  description:
    "Jasa pembuatan website, sistem informasi, dan tugas akhir. Kodingan rapi, bebas bug, dibimbing sampai paham.",
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
    <html lang="id" className={`${grotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen overflow-x-clip bg-void font-display text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
