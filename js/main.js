"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ once: true });
  form();
  skillbar();

  // ====== NAVIGATION SCRIPT (new) ======
  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");
  const navLinks = document.querySelectorAll(".nav-list .nav-link");
  const header = document.querySelector("#header");
  const hero = document.querySelector("#home");
  const goToTop = document.querySelector("#goToTop");

  if (nav && navBtn && navBtnImg) {
    navBtn.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      navBtnImg.src = opened ? "img/icons/close.svg" : "img/icons/open.svg";
      navBtn.setAttribute("aria-expanded", opened ? "true" : "false");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          navBtnImg.src = "img/icons/open.svg";
          navBtn.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target)) {
        nav.classList.remove("open");
        navBtnImg.src = "img/icons/open.svg";
        navBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        navBtnImg.src = "img/icons/open.svg";
        navBtn.setAttribute("aria-expanded", "false");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        navBtnImg.src = "img/icons/open.svg";
        navBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (!header || !hero) return;
    const triggerHeight = hero.offsetHeight - 170;
    const past = window.scrollY > triggerHeight;

    header.classList.toggle("header-sticky", past);
    if (goToTop) goToTop.classList.toggle("reveal", past);
  });

  const sections = document.querySelectorAll("section[id]");
  const allNavLinks = document.querySelectorAll("header nav a");

  window.addEventListener("scroll", () => {
    const top = window.scrollY;
    sections.forEach((sec) => {
      const offset = sec.offsetTop - 170;
      const height = sec.offsetHeight;
      const id = sec.id;

      if (top >= offset && top < offset + height) {
        allNavLinks.forEach((a) => a.classList.remove("active"));
        const current = document.querySelector(`header nav a[href*="${id}"]`);
        if (current) current.classList.add("active");
      }
    });
  });
});
