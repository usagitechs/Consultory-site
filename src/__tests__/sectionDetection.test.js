import { describe, it, expect, beforeAll } from 'vitest'

let updateActiveNavLink

beforeAll(async () => {
  // Preparamos el DOM antes de importar el modulo para que las querySelectorAll iniciales lo vean
  document.body.innerHTML = `
    <header id="header"></header>
    <nav>
      <a href="#inicio" class="nav__link">Inicio</a>
      <a href="#servicios" class="nav__link">Servicios</a>
      <a href="#contacto" class="nav__link">Contacto</a>
    </nav>
  `

  const module = await import('../sectionDetection')
  updateActiveNavLink = module.updateActiveNavLink
})

describe('updateActiveNavLink', () => {
  it('marca como activa solo la seccion indicada', () => {
    updateActiveNavLink('servicios')

    const links = Array.from(document.querySelectorAll('.nav__link'))
    const activeLinks = links.filter((link) => link.classList.contains('active'))

    expect(activeLinks).toHaveLength(1)
    expect(activeLinks[0].getAttribute('href')).toBe('#servicios')
  })
})
