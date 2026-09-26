"use client";

import { useEffect, useState } from "react";

// ponytail: scroll listener pasif + CSS transition, tanpa lib animasi.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-xl text-ink shadow-sm transition-all duration-300 hover:-translate-y-px hover:border-gold active:translate-y-0 active:scale-95 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
