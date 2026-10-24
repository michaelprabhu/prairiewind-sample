(function () {
  // Only opt into hidden-until-revealed styles when JS is running,
  // so content is always visible if this file fails to load.
  document.documentElement.classList.add('js');

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });

  // Fallback: never leave anything hidden for long.
  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }, 2500);
})();
