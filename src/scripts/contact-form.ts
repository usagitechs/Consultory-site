/**
 * Contact form: validation + submit wiring.
 * Validation rules mirror the Go backend (see contactForm section of AGENTS notes):
 * name required 2–100, email required (regex) max 254, message required 10–2000,
 * token required max 2048, company max 100, service max 50.
 *
 * `validate*` functions are pure so they can be unit tested without a DOM.
 * All DOM wiring is guarded behind `if (!form) return` so importing this module
 * in a test environment without a #contactForm element is a no-op.
 */

import type contactDict from '../i18n/sections/contact';

declare global {
  interface Window {
    turnstileToken: string | null;
    turnstile?: { reset: (container?: string | HTMLElement) => void };
  }
}

/** Runtime copy: the whole contact dictionary for the page's language (serialized by Contact.astro). */
export type Messages = (typeof contactDict)['es'];

type MaybeString = string | undefined | null;

const len = (value: MaybeString): number => (value ?? '').length;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name: MaybeString, m: Messages): string {
  if (!name) return m.errorNameRequired;

  const nameLen = len(name);
  if (nameLen < 2) return m.errorNameMin;
  if (nameLen > 100) return m.errorNameMax;

  return '';
}

export function validateEmail(email: MaybeString, m: Messages): string {
  if (!email) return m.errorEmailRequired;

  if (!EMAIL_RE.test(email)) return m.errorEmailInvalid;
  if (len(email) > 254) return m.errorEmailMax;

  return '';
}

export function validateMessage(message: MaybeString, m: Messages): string {
  if (!message) return m.errorMessageRequired;

  const messageLen = len(message);
  if (messageLen < 10) return m.errorMessageMin;
  if (messageLen > 2000) return m.errorMessageMax;

  return '';
}

export function validateToken(token: MaybeString, m: Messages): string {
  if (!token) return m.errorTokenRequired;
  if (len(token) > 2048) return m.errorTokenInvalid;

  return '';
}

export function validateCompany(company: MaybeString, m: Messages): string {
  if (len(company) > 100) return m.errorCompanyMax;

  return '';
}

export function validateService(service: MaybeString, m: Messages): string {
  if (len(service) > 50) return m.errorServiceInvalid;

  return '';
}

type ToastStatus = 'success' | 'warning' | 'danger';

const TOAST_ICONS: Record<ToastStatus, string> = {
  success:
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  warning:
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  danger:
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
};

const SPINNER_ICON =
  '<svg class="contact__spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"></circle></svg>';

function readMessages(): Messages | null {
  const el = document.getElementById('contactI18n');
  if (!el || !el.textContent) return null;

  try {
    return JSON.parse(el.textContent) as Messages;
  } catch {
    return null;
  }
}

/** Browser-side send through EmailJS. Template variables: name, email, company, service, message, lang, page, time. */
async function sendWithEmailJs(form: HTMLFormElement, data: Record<string, string>): Promise<void> {
  const { emailjsKey, emailjsService, emailjsTemplate } = form.dataset;
  if (!emailjsKey || !emailjsService || !emailjsTemplate) {
    throw new Error('EmailJS is not configured');
  }
  // Loaded on demand so the 'api' build never ships the SDK. No client-side limitRate: it stamps
  // localStorage before the request, so a retry after a network failure would be refused locally.
  const { default: emailjs } = await import('@emailjs/browser');
  emailjs.init({ publicKey: emailjsKey, blockHeadless: true });
  await emailjs.send(emailjsService, emailjsTemplate, {
    name: data.name,
    email: data.email,
    company: data.company || '-',
    service: data.service || '-',
    message: data.message,
    lang: form.dataset.lang ?? '',
    // Origin + path only: query strings and hashes are attacker-controlled and would land verbatim in the email.
    page: window.location.origin + window.location.pathname,
    time: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
  });
}

function init(): void {
  const formEl = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!formEl) return;
  // Non-null alias: narrowing does not flow into the hoisted helper functions below.
  const form: HTMLFormElement = formEl;

  const messages = readMessages();
  if (!messages) return;

  const toast = document.getElementById('toast');
  const toastIcon = toast?.querySelector<HTMLElement>('.toast__icon') ?? null;
  const toastMessage = toast?.querySelector<HTMLElement>('.toast__message') ?? null;
  const fallback = document.getElementById('contactFallback');
  const serviceSelect = form.querySelector<HTMLSelectElement>('[name="service"]');
  const turnstileWrapper = form.querySelector<HTMLElement>('.cf-turnstile');

  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  function showToast(status: ToastStatus, message: string): void {
    if (!toast) return;

    if (toastIcon) toastIcon.innerHTML = TOAST_ICONS[status];
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.remove('toast--success', 'toast--warning', 'toast--danger');
    toast.classList.add(`toast--${status}`);
    toast.hidden = false;

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4000);
  }

  function showFallback(): void {
    fallback?.removeAttribute('hidden');
  }

  function hideFallback(): void {
    fallback?.setAttribute('hidden', '');
  }


  /** Ties an error to its field (WCAG 3.3.1): aria-invalid + aria-describedby + inline text, plus the toast. */
  function setFieldError(name: string, message: string): void {
    const field = form.querySelector<HTMLElement>(`[name="${name}"]`);
    const node = document.getElementById(`contact-${name}-error`);
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      if (node) field.setAttribute('aria-describedby', node.id);
      field.focus();
    }
    if (node) {
      node.textContent = message;
      node.removeAttribute('hidden');
    }
    showToast('warning', message);
  }

  function clearFieldError(el: HTMLElement): void {
    el.removeAttribute('aria-invalid');
    el.removeAttribute('aria-describedby');
    const name = el.getAttribute('name');
    const node = name ? document.getElementById(`contact-${name}-error`) : null;
    if (node) {
      node.textContent = '';
      node.setAttribute('hidden', '');
    }
  }

  form.addEventListener('input', (event) => {
    const el = event.target as HTMLElement | null;
    if (el?.getAttribute('aria-invalid') === 'true') clearFieldError(el);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.querySelector('button[type="submit"][aria-busy="true"]')) return;
    form.querySelectorAll<HTMLElement>('[aria-invalid="true"]').forEach(clearFieldError);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const nameError = validateName(data.name, messages);
    if (nameError) {
      setFieldError('name', nameError);
      return;
    }

    const emailError = validateEmail(data.email, messages);
    if (emailError) {
      setFieldError('email', emailError);
      return;
    }

    const messageError = validateMessage(data.message, messages);
    if (messageError) {
      setFieldError('message', messageError);
      return;
    }

    const companyError = validateCompany(data.company, messages);
    if (companyError) {
      setFieldError('company', companyError);
      return;
    }

    const serviceError = validateService(data.service, messages);
    if (serviceError) {
      setFieldError('service', serviceError);
      return;
    }

    const provider = form.dataset.provider === 'emailjs' ? 'emailjs' : 'api';

    // Honeypot: a filled hidden field means a bot. Pretend success and drop it.
    if ((data.website ?? '').trim() !== '') {
      showToast('success', messages.toastSuccess);
      form.reset();
      return;
    }

    if (provider === 'api') {
      const tokenError = validateToken(window.turnstileToken, messages);
      if (tokenError) {
        showToast('warning', tokenError);
        turnstileWrapper?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const originalHtml = submitBtn?.innerHTML ?? '';
    if (submitBtn) {
      // aria-disabled + aria-busy keep the button focusable and announce the state; `disabled` would drop focus.
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = `${SPINNER_ICON}${messages.sendingLabel}`;
    }

    try {
      if (provider === 'emailjs') {
        await sendWithEmailJs(form, data);
        showToast('success', messages.toastSuccess);
        form.reset();
        hideFallback();
        return;
      }

      const response = await fetch(form.dataset.api ?? '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          token: window.turnstileToken,
          company: data.company,
          theme: data.service,
        }),
      });

      if (response.ok) {
        showToast('success', messages.toastSuccess);
        form.reset();
        hideFallback();
      } else if (response.status >= 500) {
        showToast('danger', messages.toastInternalError);
        showFallback();
      } else {
        showToast('danger', messages.toastGenericError);
        showFallback();
      }
    } catch {
      showToast('danger', messages.toastGenericError);
      showFallback();
    } finally {
      if (provider === 'api') {
        // Turnstile tokens are single-use: ask for a fresh one before the next submit.
        window.turnstileToken = null;
        window.turnstile?.reset();
      }
      if (submitBtn) {
        submitBtn.removeAttribute('aria-disabled');
        submitBtn.removeAttribute('aria-busy');
        submitBtn.innerHTML = originalHtml;
      }
    }
  });

  // Service cards elsewhere on the page can preselect the contact form's service field.
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const trigger = target?.closest<HTMLElement>('[data-service]');
    if (!trigger || !serviceSelect) return;

    const value = trigger.getAttribute('data-service');
    if (!value) return;

    serviceSelect.value = value;
    serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

init();
