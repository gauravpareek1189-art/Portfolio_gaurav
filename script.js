// ============================================================
// MEDHAVI SINGH RATHORE — PORTFOLIO INTERACTIONS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 500);
  });
  // fallback in case load event already fired
  setTimeout(() => loader.classList.add('hide'), 1800);

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById('glow');
  let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
  let curX = glowX, curY = glowY;

  window.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
  });

  function animateGlow(){
    curX += (glowX - curX) * 0.08;
    curY += (glowY - curY) * 0.08;
    glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Project filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          void card.offsetWidth; // reflow to restart animation
          card.style.animation = 'fadeInUp .6s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Smooth in-page nav (mobile menu + desktop) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

/* Keyframe injected for filter fade-in */
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes fadeInUp{ from{ opacity:0; transform: translateY(16px);} to{ opacity:1; transform: translateY(0);} }`;
document.head.appendChild(styleTag);
