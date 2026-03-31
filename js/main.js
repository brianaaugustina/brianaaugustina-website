// Dynamic date rendering
document.addEventListener('DOMContentLoaded', function () {
  var dateEls = document.querySelectorAll('.js-date');
  var now = new Date();
  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var formatted = 'Today is ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
  dateEls.forEach(function (el) {
    el.textContent = formatted;
  });

  // Mobile nav toggle
  var hamburger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.mobile-nav-overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-triggered reveals (100ms delay before init)
  setTimeout(function () {
    var revealSelector = '.hero, .section-label, .work-entry, .press-entry, .value-item, .portfolio-card, .page-title, .bio p, .origin-story p, .world-text p';
    var elements = document.querySelectorAll(revealSelector);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(function (el) { observer.observe(el); });

    // Fallback: reveal elements already in viewport on load
    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, 100);
});
