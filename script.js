// Intersection Observer for reveal animations
(() => {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(el => el.classList.add("reveal-visible"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();