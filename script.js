/* =============================================
   VINTAGE STORYTELLING PORTFOLIO
   A. Mushi Dharun — script.js
   ============================================= */

(function () {
  'use strict';

  /* ── Cursor ── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth trailing cursor
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.10;
    trailY += (mouseY - trailY) * 0.10;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Cursor hover expansion
  const hoverTargets = document.querySelectorAll(
    'a, button, .nav-link, .interest-card, .fact-card, .swot-card, .future-card, .vintage-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorTrail.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorTrail.classList.remove('hovering');
    });
  });

  /* ── Dust Particles ── */
  const dustContainer = document.getElementById('dustParticles');
  if (dustContainer) {
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'dust-particle';
      const size   = Math.random() * 3 + 1;
      const left   = Math.random() * 100;
      const delay  = Math.random() * 15;
      const dur    = Math.random() * 18 + 12;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${dur}s;
        animation-delay: ${-delay}s;
        opacity: ${Math.random() * 0.4 + 0.1};
      `;
      dustContainer.appendChild(p);
    }
  }

  /* ── Navbar scroll state ── */
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-menu-open');
  });
  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-menu-open');
    });
  });

  /* ── Scroll Reveal ── */
  const revealItems = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ── Parallax on scroll ── */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Home parallax
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
      homeContent.style.transform = `translateY(${scrolled * 0.22}px)`;
      homeContent.style.opacity   = 1 - scrolled / 650;
    }

    // Paper textures subtle shift
    const papers = document.querySelectorAll('.paper-texture');
    papers.forEach((p, i) => {
      const section = p.closest('.section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const offset = -rect.top * 0.08;
      p.style.transform = `translateY(${offset}px)`;
    });
  });

  /* ── Smooth section entrance ── */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── SWOT card hover micro-animation ── */
  const swotCards = document.querySelectorAll('.swot-card');
  swotCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)';
    });
  });

  /* ── Thank You birds animation ── */
  const birdsPath = document.querySelectorAll('.birds-svg path');
  birdsPath.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transition = `opacity 0.4s ease ${i * 0.12}s`;
  });

  const tyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        birdsPath.forEach(p => { p.style.opacity = '1'; });
      }
    });
  }, { threshold: 0.3 });

  const tySection = document.getElementById('thankyou');
  if (tySection) tyObserver.observe(tySection);

  /* ── Progress / page indicator dots (optional subtle touch) ── */
  const progressDots = document.createElement('div');
  progressDots.className = 'page-dots';
  progressDots.innerHTML = `
    <style>
      .page-dots {
        position: fixed;
        right: 1.8rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 500;
      }
      .page-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        border: 1px solid rgba(26,26,26,0.4);
        background: transparent;
        cursor: pointer;
        transition: all 0.35s;
      }
      .page-dot.active {
        background: rgba(26,26,26,0.7);
        transform: scale(1.35);
      }
      .page-dot-dark {
        border-color: rgba(240,237,230,0.5);
      }
      .page-dot-dark.active {
        background: rgba(240,237,230,0.8);
      }
      @media (max-width: 768px) {
        .page-dots { display: none; }
      }
    </style>
  `;
  const sectionIds = ['home','about','interests','facts','swot','future','thankyou'];
  const darkSections = ['interests','swot'];

  sectionIds.forEach(id => {
    const dot = document.createElement('div');
    dot.className = 'page-dot';
    if (darkSections.includes(id)) dot.classList.add('page-dot-dark');
    dot.dataset.target = id;
    dot.addEventListener('click', () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
    progressDots.appendChild(dot);
  });
  document.body.appendChild(progressDots);

  // Update dot colors when on dark sections
  const dotUpdateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const allDots = document.querySelectorAll('.page-dot');
        allDots.forEach(d => {
          d.classList.remove('active');
          // Update light/dark based on current section
          if (darkSections.includes(id)) {
            d.classList.add('page-dot-dark');
          } else {
            d.classList.remove('page-dot-dark');
          }
        });
        const activeDot = document.querySelector(`.page-dot[data-target="${id}"]`);
        if (activeDot) activeDot.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => dotUpdateObserver.observe(s));

  /* ── Vintage typewriter shimmer on section titles ── */
  const titles = document.querySelectorAll('.section-title');
  titles.forEach(title => {
    title.addEventListener('mouseenter', function () {
      this.style.letterSpacing = '0.06em';
    });
    title.addEventListener('mouseleave', function () {
      this.style.letterSpacing = '';
    });
  });

  /* ── Init ── */
  console.log('%c✦ My Story — Beyond What You See', 'font-family: serif; font-size: 16px; font-style: italic;');
  console.log('%cBy A. Mushi Dharun', 'font-family: serif; font-size: 12px; color: #888;');

})();
