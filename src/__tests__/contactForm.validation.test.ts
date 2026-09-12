import { describe, it, expect, beforeAll } from 'vitest';
import contactDict from '../i18n/sections/contact';
import type { Messages } from '../scripts/contact-form';

let validateName: (value: string | undefined | null, m: Messages) => string;
let validateEmail: (value: string | undefined | null, m: Messages) => string;
let validateMessage: (value: string | undefined | null, m: Messages) => string;
let validateCompany: (value: string | undefined | null, m: Messages) => string;
let validateService: (value: string | undefined | null, m: Messages) => string;
let validateToken: (value: string | undefined | null, m: Messages) => string;

const messages = contactDict.es;

beforeAll(async () => {
  // The module wires a real #contactForm on load; without one it's a no-op,
  // so the DOM here only needs to satisfy that guard (i.e. not provide one).
  document.body.innerHTML = `
    <div id="toast">
      <div class="toast__content">
        <span class="toast__icon"></span>
        <span class="toast__message"></span>
      </div>
    </div>
  `;

  const mod = await import('../scripts/contact-form');
  validateName = mod.validateName;
  validateEmail = mod.validateEmail;
  validateMessage = mod.validateMessage;
  validateCompany = mod.validateCompany;
  validateService = mod.validateService;
  validateToken = mod.validateToken;
});

describe('contactForm validations', () => {
  it('validateName aplica reglas de requerido y longitud', () => {
    expect(validateName('', messages)).toBe(messages.errorNameRequired);
    expect(validateName('A', messages)).toBe(messages.errorNameMin);

    const longName = 'A'.repeat(101);
    expect(validateName(longName, messages)).toBe(messages.errorNameMax);

    expect(validateName('Juan', messages)).toBe('');
  });

  it('validateEmail valida requerido, formato y longitud maxima', () => {
    expect(validateEmail('', messages)).toBe(messages.errorEmailRequired);
    expect(validateEmail('invalido', messages)).toBe(messages.errorEmailInvalid);

    // Construimos un email con longitud total > 254 caracteres
    const tooLongLocal = 'a'.repeat(249); // 249 + 6 ('@x.com') = 255
    const tooLongEmail = `${tooLongLocal}@x.com`;
    expect(validateEmail(tooLongEmail, messages)).toBe(messages.errorEmailMax);

    expect(validateEmail('test@example.com', messages)).toBe('');
  });

  it('validateMessage respeta minimo y maximo de longitud', () => {
    expect(validateMessage('', messages)).toBe(messages.errorMessageRequired);
    expect(validateMessage('corto', messages)).toBe(messages.errorMessageMin);

    const tooLongMessage = 'a'.repeat(2001);
    expect(validateMessage(tooLongMessage, messages)).toBe(messages.errorMessageMax);

    const okMessage = 'a'.repeat(50);
    expect(validateMessage(okMessage, messages)).toBe('');
  });

  it('validateCompany limita longitud maxima', () => {
    const tooLongCompany = 'a'.repeat(101);
    expect(validateCompany(tooLongCompany, messages)).toBe(messages.errorCompanyMax);

    expect(validateCompany('Usagitech', messages)).toBe('');
  });

  it('validateService limita longitud maxima', () => {
    const tooLongService = 'a'.repeat(51);
    expect(validateService(tooLongService, messages)).toBe(messages.errorServiceInvalid);

    expect(validateService('desarrollo', messages)).toBe('');
  });

  it('validateToken valida requerido y longitud maxima', () => {
    expect(validateToken('', messages)).toBe(messages.errorTokenRequired);

    const tooLongToken = 'a'.repeat(2049);
    expect(validateToken(tooLongToken, messages)).toBe(messages.errorTokenInvalid);

    expect(validateToken('token-valido', messages)).toBe('');
  });
});
