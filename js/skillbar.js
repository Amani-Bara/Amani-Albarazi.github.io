const skillbar = () => {
  const skillBars = document.querySelectorAll(".skill");
  skillBars.forEach((skillBar) => {
    const fill = skillBar.querySelector(".skill-bar__fill");
    const percentage = skillBar.querySelector(".skill-percent");
    const progress = parseInt(fill.getAttribute("data-progress"), 10);
    fill.style.width = `${progress}%`;

    let counter = 0;
    const interval = setInterval(() => {
      if (counter <= progress) {
        percentage.textContent = `${counter}%`;
        counter++;
      } else {
        clearInterval(interval);
      }
    }, 1500 / progress);
  });
};
export default skillbar;




// === Skill bars: fill when the section is visible ===
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.about-skills .skill-bar__fill');
  if (!fills.length) return;

  // start collapsed so the CSS transition runs
  fills.forEach(el => { el.style.width = '0%'; });

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

// === Scrollspy: highlight nav link for the section in view ===
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-list .nav-link');

  const byId = id => Array.from(links).find(a => a.getAttribute('href') === '#' + id);

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
    threshold: 0.5,                  // 50% of section must be visible
    rootMargin: '-80px 0px 0px 0px'  // adjust for your header height
  });

  sections.forEach(s => io.observe(s));
});

// === Sticky header class toggle (optional) ===
document.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 20) header.classList.add('header-sticky');
  else header.classList.remove('header-sticky');
}, { passive: true });

