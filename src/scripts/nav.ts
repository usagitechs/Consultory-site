/** Header behaviour: scrolled state, mobile menu, active section, scroll reveal. */

function initHeaderScroll(header: HTMLElement) {
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMobileNav(header: HTMLElement) {
  const toggle = header.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const nav = header.querySelector<HTMLElement>('[data-nav]');
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  const desktop = window.matchMedia('(min-width: 851px)');
  const onChange = (e: MediaQueryListEvent) => {
    if (e.matches) setOpen(false);
  };
  if (typeof desktop.addEventListener === 'function') desktop.addEventListener('change', onChange);
  else desktop.addListener(onChange); // Safari < 14
}

function initActiveSection() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]'));
  const sections = links
    .map((a) => document.getElementById(a.hash.slice(1)))
    .filter((s): s is HTMLElement => Boolean(s));
  if (!sections.length) return;

  const setActive = (id: string) =>
    links.forEach((a) => a.classList.toggle('is-active', a.hash === `#${id}`));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
  );
  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  items.forEach((el) => observer.observe(el));
}

const header = document.getElementById('header');
if (header) {
  initHeaderScroll(header);
  initMobileNav(header);
}
initActiveSection();
initReveal();

// Static build: keep the footer year current between deploys.
document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
