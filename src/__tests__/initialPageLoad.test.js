import { describe, it, expect, beforeAll, vi } from 'vitest'

let initInitialPageLoad

beforeAll(async () => {
  document.body.innerHTML = `
    <header id="header"></header>
    <nav>
      <a href="#inicio" class="nav__link">Inicio</a>
      <a href="#servicios" class="nav__link">Servicios</a>
    </nav>
    <section id="inicio"></section>
    <section id="servicios"></section>
  `
  window.scrollTo = vi.fn()
  const module = await import('../initialPageLoad')
  initInitialPageLoad = module.default
})

describe('initInitialPageLoad', () => {
  it('marca como activo el link de la seccion indicada en el hash de la URL', () => {
    vi.useFakeTimers()
    window.location.hash = '#servicios'

    initInitialPageLoad()
    vi.runAllTimers()

    const active = document.querySelector('.nav__link.active')
    expect(active).not.toBeNull()
    expect(active.getAttribute('href')).toBe('#servicios')
    expect(window.scrollTo).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
