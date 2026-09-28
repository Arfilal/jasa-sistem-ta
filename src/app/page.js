import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import Info from "@/components/sections/Info";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

// Komposisi saja — seluruh konten & logika tinggal di section masing-masing.
// Urutan: hero → layanan (gelap) → manfaat → informasi → karya + statistik
// (gelap) → testimoni → FAQ → CTA → footer.
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="atas">
        <Hero />
        <Services />
        <Benefits />
        <Info />
        <Portfolio />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
