// Mobile nav for separate subnav
(function () {
  const subnav = document.querySelector('.site-subnav');
  const toggle = document.querySelector('.menu-toggle');
  if (subnav && toggle) {
    toggle.addEventListener('click', () => {
      const expanded = subnav.getAttribute('aria-expanded') === 'true';
      subnav.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }
})();