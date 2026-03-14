/* Marketio — main.js | Vanilla JS | < 10KB | Deferred */
(function () {
  'use strict';

  /* ---- NAV scroll behavior ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link ---- */
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (href !== '/' && path.startsWith(href))) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Counter animation ---- */
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var value = target * ease;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(function (el) {
      counterObs.observe(el);
    });
  }

  /* ---- Contact form submission (Web3Forms) ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      var data = new FormData(contactForm);
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            contactForm.innerHTML = '<div style="text-align:center;padding:40px 0"><p style="font-size:1.2rem;font-weight:700;color:#f15e18;margin-bottom:8px">Message sent ✓</p><p style="color:#888">We\'ll get back to you within 24 hours.</p></div>';
          } else {
            btn.textContent = orig;
            btn.disabled = false;
            alert('Something went wrong. Please email us at support@marketio.net');
          }
        })
        .catch(function () {
          btn.textContent = orig;
          btn.disabled = false;
          alert('Something went wrong. Please email us at support@marketio.net');
        });
    });
  }

  /* ---- Lazy load Calendly only on demo page ---- */
  var calendlyTarget = document.getElementById('calendly-embed');
  if (calendlyTarget) {
    var calendlyObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var s = document.createElement('script');
        s.src = 'https://assets.calendly.com/assets/external/widget.js';
        s.async = true;
        document.head.appendChild(s);
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(l);
        calendlyTarget.classList.add('calendly-inline-widget');
        calendlyTarget.dataset.url = 'https://calendly.com/marketio/demo';
        calendlyTarget.style.minHeight = '650px';
        calendlyObs.disconnect();
      }
    }, { threshold: 0.1 });
    calendlyObs.observe(calendlyTarget);
  }

})();
