/** Theme toggle. The initial theme is applied by an inline script in Base.astro before first paint. */
const STORAGE_KEY = 'usagiteks-theme';
type Theme = 'dark' | 'light';

function current(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
  });
}

export function initTheme() {
  apply(current());
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next: Theme = current() === 'light' ? 'dark' : 'light';
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable: theme still applies for this page */
      }
    });
  });
}

initTheme();
