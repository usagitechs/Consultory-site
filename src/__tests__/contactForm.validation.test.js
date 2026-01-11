import { describe, it, expect, beforeAll } from 'vitest'

let validateName
let validateEmail
let validateMessage
let validateCompany
let validateService
let validateToken

beforeAll(async () => {
  // Preparamos el DOM que el modulo de contactForm espera encontrar
  document.body.innerHTML = `
    <div id="toast">
      <div class="toast__content">
        <div class="toast__icon__wrapper"></div>
        <div class="toast__message"></div>
      </div>
    </div>
    <div class="cf-turnstile"></div>
  `

  const module = await import('../contactForm')
  validateName = module.validateName
  validateEmail = module.validateEmail
  validateMessage = module.validateMessage
  validateCompany = module.validateCompany
  validateService = module.validateService
  validateToken = module.validateToken
})

describe('contactForm validations', () => {
  it('validateName aplica reglas de requerido y longitud', () => {
    expect(validateName('')).toBe('Por favor, ingresá tu nombre.')
    expect(validateName('A')).toBe('Nombre: longitud mínima de 2 caracteres.')

    const longName = 'A'.repeat(101)
    expect(validateName(longName)).toBe('Nombre: longitud máxima de 100 caracteres.')

    expect(validateName('Juan')).toBe('')
  })

  it('validateEmail valida requerido, formato y longitud maxima', () => {
    expect(validateEmail('')).toBe('Por favor, ingresá tu email.')
    expect(validateEmail('invalido')).toBe('Email inválido.')

    // Construimos un email con longitud total > 254 caracteres
    const tooLongLocal = 'a'.repeat(249) // 249 + 6 ('@x.com') = 255
    const tooLongEmail = `${tooLongLocal}@x.com`
    expect(validateEmail(tooLongEmail)).toBe('Email: longitud máxima de 254 caracteres.')

    expect(validateEmail('test@example.com')).toBe('')
  })

  it('validateMessage respeta minimo y maximo de longitud', () => {
    expect(validateMessage('')).toBe('Por favor, ingresá tu "mensaje".')
    expect(validateMessage('corto')).toBe('Mensaje: longitud mínima de 10 caracteres.')

    const tooLongMessage = 'a'.repeat(2001)
    expect(validateMessage(tooLongMessage)).toBe('Mensaje: longitud máxima de 2000 caracteres.')

    const okMessage = 'a'.repeat(50)
    expect(validateMessage(okMessage)).toBe('')
  })

  it('validateCompany limita longitud maxima', () => {
    const tooLongCompany = 'a'.repeat(101)
    expect(validateCompany(tooLongCompany)).toBe('Empresa : longitud máxima de 100 caracteres.')

    expect(validateCompany('Usagitech')).toBe('')
  })

  it('validateService limita longitud maxima', () => {
    const tooLongService = 'a'.repeat(51)
    expect(validateService(tooLongService)).toBe('Servicio inválido.')

    expect(validateService('desarrollo')).toBe('')
  })

  it('validateToken valida requerido y longitud maxima', () => {
    expect(validateToken('')).toBe('Por favor, confirmá que sos humano.')

    const tooLongToken = 'a'.repeat(2049)
    expect(validateToken(tooLongToken)).toBe('Token inválido.')

    expect(validateToken('token-valido')).toBe('')
  })
})
