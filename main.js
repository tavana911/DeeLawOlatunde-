/* ═══════════════════════════════════════
   main.js — Olatunde Ononuga & Associates
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ══ NAVBAR SCROLL ══ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ══ MOBILE NAV TOGGLE ══ */
  const mobileNav = document.getElementById('mobileNav');
  const navToggler = document.getElementById('navToggler');

  if (navToggler && mobileNav) {
    navToggler.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      const expanded = mobileNav.classList.contains('open');
      navToggler.setAttribute('aria-expanded', expanded);
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('#mobileNav .nav-link-item').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      if (navToggler) navToggler.setAttribute('aria-expanded', 'false');
    });
  });

  /* ══ SMOOTH SCROLL FOR ANCHOR LINKS ══ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ══ SCROLL FADE-UP ANIMATIONS ══ */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ══ FAQ ACCORDION ══ */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleFAQ(btn);
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(btn);
      }
    });
  });

  function toggleFAQ(btn) {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').style.maxHeight = '0';
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  /* ══ CONTACT FORM VALIDATION ══ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    // Clear invalid state on input
    contactForm.querySelectorAll('.form-control-custom').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('invalid');
        const errEl = document.getElementById(input.id + '-error');
        if (errEl) errEl.style.display = 'none';
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = [
        {
          id: 'fname',
          check: function (v) { return v.trim().length >= 2; }
        },
        {
          id: 'femail',
          check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
        },
        {
          id: 'fcase',
          check: function (v) { return v !== ''; }
        },
        {
          id: 'fmessage',
          check: function (v) { return v.trim().length >= 10; }
        }
      ];

      var valid = true;

      fields.forEach(function (f) {
        const el = document.getElementById(f.id);
        const errEl = document.getElementById(f.id + '-error');
        if (!f.check(el.value)) {
          el.classList.add('invalid');
          if (errEl) errEl.style.display = 'block';
          valid = false;
        } else {
          el.classList.remove('invalid');
          if (errEl) errEl.style.display = 'none';
        }
      });

      if (valid) {
        const formWrap = document.getElementById('contactFormWrap');
        const formSuccess = document.getElementById('formSuccess');
        if (formWrap) formWrap.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('visible');
      }
    });
  }

});
