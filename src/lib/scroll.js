// Klik link nav section: scroll halus ke target, URL tetap "/" (tanpa hash).
// preventDefault hanya saat JS aktif — tanpa JS, anchor tetap berfungsi.
export function onNavClick(event, href) {
  event.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", "/");
}
