"use client";

import { motion, useReducedMotion } from "framer-motion";

// Reveal restrained (design.md §6): hanya opacity + geser 12px, sekali.
// Jangan tambah stagger/scale di sini — stagger hanya di grid yg diizinkan.
export default function Reveal({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
