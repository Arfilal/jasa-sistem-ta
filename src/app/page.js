import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TechStrip from "@/components/sections/TechStrip";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

// Komposisi saja — seluruh konten & logika tinggal di section masing-masing.
// Urutan: proof early (portfolio sebelum harga), sesuai PRD §5.
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="atas">
        <Hero />
        <TechStrip />
        <Portfolio />
        <Services />
        <Pricing />
        <Process />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
