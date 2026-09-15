// Progressive enhancement for explicitly static marketing pages. Navigation and
// content remain available without JavaScript; contacto retains React hydration.
(() => {
  const header = document.querySelector('.site-header');
  const credit = document.querySelector('.footer-credit');
  const order = document.querySelector('.floating-order');
  let ticking = false;
  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  if (credit && order && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      order.classList.toggle('is-hidden', entry.isIntersecting);
      order.setAttribute('aria-hidden', String(entry.isIntersecting));
      if (entry.isIntersecting) order.setAttribute('tabindex', '-1');
      else order.removeAttribute('tabindex');
    }, { rootMargin: '0px 0px 90px 0px', threshold: 0 }).observe(credit);
  }
})();
