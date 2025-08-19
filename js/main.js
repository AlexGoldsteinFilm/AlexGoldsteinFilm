// Minimal site JS: mobile nav only
(function () {
  const siteNav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (siteNav && toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.setAttribute('aria-expanded', String(!expanded));
      const list = siteNav.querySelector('ul');
      if (list) list.classList.toggle('open');
    });
  }
})();