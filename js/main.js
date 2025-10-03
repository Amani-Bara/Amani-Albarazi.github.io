
"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  form();
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  //Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };
});


// Mobile nav toggle
(function () {
  const nav = document.getElementById('nav');
  const btn = document.getElementById('nav-btn');
  const img = document.getElementById('nav-btn-img');
  if (!nav || !btn || !img) return;

  const openIcon  = 'img/icons/open.svg';
  const closeIcon = 'img/icons/close.svg';

  const setOpen = (isOpen) => {
    nav.classList.toggle('open', isOpen);
    img.src = isOpen ? closeIcon : openIcon;
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Close nav when clicking a link
  document.querySelectorAll('.nav-list .nav-link').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  // Auto-close when resizing to >900px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && nav.classList.contains('open')) {
      setOpen(false);
    }
  });
})();
                          
