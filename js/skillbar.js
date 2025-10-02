// === Skill bars: fill when the section is visible ===
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.about-skills .skill-bar__fill');
  if (!fills.length) return;

  // start collapsed so the CSS transition is visible
  fills.forEach(el => (el.style.width = '0%'));

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const pct = parseInt(el.dataset.progress || '0', 10);
      el.style.width = pct + '%';
      obs.unobserve(el); // animate once
    });
  }, { threshold: 0.35 });

  fills.forEach(el => io.observe(el));
});

