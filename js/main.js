// === Scrollspy: highlight nav link for the section in view ===
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-list .nav-link');

  const byId = id =>
    Array.from(links).find(a => a.getAttribute('href') === '#' + id);

  const spy = entries => {
    entries.forEach(entry => {
      const link = byId(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  };

  const io = new IntersectionObserver(spy, {
    root: null,
    threshold: 0.5,              // 50% of section must be visible
    rootMargin: '-90px 0px 0px'  // adjust for your fixed header height
  });

  sections.forEach(s => io.observe(s));
});

// === Sticky header toggle ===
document.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 20) header.classList.add('header-sticky');
  else header.classList.remove('header-sticky');
}, { passive: true });
