# Usagitech - Documentacion Tecnica Completa

## Indice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Arquitectura del Proyecto](#2-arquitectura-del-proyecto)
3. [Stack Tecnologico](#3-stack-tecnologico)
4. [Estructura de Archivos](#4-estructura-de-archivos)
5. [Modulos JavaScript](#5-modulos-javascript)
6. [Sistema de Estilos CSS](#6-sistema-de-estilos-css)
7. [Componentes HTML](#7-componentes-html)
8. [Flujo de la Aplicacion](#8-flujo-de-la-aplicacion)
9. [Guia de Personalizacion](#9-guia-de-personalizacion)
10. [Deployment](#10-deployment)
11. [SEO y Performance](#11-seo-y-performance)
12. [Mantenimiento](#12-mantenimiento)

---

## 1. Resumen Ejecutivo

### Descripcion General

**Usagitech** es un sitio web corporativo SPA (Single Page Application) para una consultora IT boutique especializada en:

- DevOps y CI/CD
- Arquitectura Cloud (AWS, GCP, Azure)
- Desarrollo de Software
- Migraciones Cloud
- Soporte y Consultoria

### Caracteristicas Principales

| Caracteristica | Descripcion |
|----------------|-------------|
| **Tipo** | SPA (Single Page Application) |
| **Navegacion** | Smooth scroll sin recargas |
| **Tema** | Dark mode moderno |
| **Responsive** | Mobile, Tablet, Desktop |
| **Animaciones** | Scroll-triggered con Intersection Observer |
| **Modales** | 5 modales de servicios detallados |
| **Formulario** | Contacto con validacion |
| **Dependencias** | Zero (Vanilla JS) |

### Datos de la Empresa

```
Nombre: Usagitech
Tipo: Consultora IT Boutique
Fundadores:
  - Martin Aguirre (CTO) - Arquitectura Cloud y DevOps
  - Lucas Rodriguez (CEO) - Desarrollo Backend y Liderazgo

Contacto:
  Email: contacto@nexuscode.com
  Telefono: +54 11 1234-5678
  Horario: Lunes a Viernes, 9:00 - 18:00
```

---

## 2. Arquitectura del Proyecto

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         index.html                          │
│                    (Documento Principal)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      src/main.js                            │
│                    (Entry Point)                            │
│         ┌───────────────┴───────────────┐                   │
│         ▼                               ▼                   │
│   src/style.css                   src/app.js                │
│   (Estilos)                    (Orquestador)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MODULOS FUNCIONALES                      │
├─────────────────┬─────────────────┬─────────────────────────┤
│ contactForm     │ faqAccordion    │ handleBrowserBackForward│
│ headerMobile    │ headerScrollEffect│ initialPageLoad       │
│ keyboardNavegation│ modal         │ scrollAnimations        │
│ scrollNavegation│ sectionDetection│ statsCounter           │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### Patron de Diseno

El proyecto sigue un **patron modular** donde cada funcionalidad esta encapsulada en su propio modulo:

```javascript
// Patron usado en cada modulo
export default function initModuleName() {
    // Logica del modulo
}

// Orquestacion en app.js
import initModuleName from './moduleName';
export default function app() {
    initModuleName();
}
```

---

## 3. Stack Tecnologico

### Frontend

| Tecnologia | Version | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura semantica |
| CSS3 | - | Estilos con variables CSS |
| JavaScript | ES6+ | Logica de la aplicacion |
| Vite (Rolldown) | 7.2.5 | Bundler y dev server |

### Tipografia

```css
--font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Fuentes cargadas desde Google Fonts:**
- Plus Jakarta Sans (400, 500, 600, 700)
- JetBrains Mono (400, 500)

### Iconografia

Todos los iconos son **SVG inline** para mejor rendimiento y personalizacion.

---

## 4. Estructura de Archivos

```
usagitech-site/
│
├── .claude/                    # Configuracion de Claude Code
├── .git/                       # Repositorio Git
├── node_modules/               # Dependencias (instaladas con npm)
│
├── public/                     # Assets estaticos
│   ├── logo.png               # Logo de la empresa
│   └── .gitkeep               # Placeholder Git
│
├── src/                        # Codigo fuente
│   ├── main.js                # Entry point (26 lineas)
│   ├── app.js                 # Orquestador de modulos (26 lineas)
│   ├── style.css              # Estilos CSS (1768 lineas)
│   │
│   ├── contactForm/           # Modulo de formulario
│   │   └── index.js           # (82 lineas)
│   │
│   ├── faqAccordion/          # Modulo de acordeon FAQ
│   │   └── index.js           # (~30 lineas)
│   │
│   ├── handleBrowserBackForward/  # Navegacion del navegador
│   │   └── index.js           # (~20 lineas)
│   │
│   ├── headerMobile/          # Menu movil hamburguesa
│   │   └── index.js           # (~45 lineas)
│   │
│   ├── headerScrollEffect/    # Efecto del header al scroll
│   │   └── index.js           # (~20 lineas)
│   │
│   ├── initialPageLoad/       # Inicializacion de pagina
│   │   └── index.js           # (~45 lineas)
│   │
│   ├── keyboardNavegation/    # Navegacion por teclado
│   │   └── index.js           # (~30 lineas)
│   │
│   ├── modal/                 # Sistema de modales
│   │   └── index.js           # (50 lineas)
│   │
│   ├── scrollAnimations/      # Animaciones al scroll
│   │   └── index.js           # (60 lineas)
│   │
│   ├── scrollNavegation/      # Navegacion suave
│   │   └── index.js           # (52 lineas)
│   │
│   ├── sectionDetection/      # Deteccion de seccion activa
│   │   └── index.js           # (~45 lineas)
│   │
│   └── statsCounter/          # Contador animado
│       └── index.js           # (~40 lineas)
│
├── index.html                  # Pagina principal (1139 lineas)
├── package.json               # Configuracion npm
├── package-lock.json          # Lock de dependencias
├── README.md                  # Documentacion basica
├── DOCUMENTACION.md           # Este documento
└── .gitignore                 # Archivos ignorados por Git
```

### Metricas del Codigo

| Archivo | Lineas | Descripcion |
|---------|--------|-------------|
| index.html | 1139 | Estructura HTML completa |
| style.css | 1768 | Sistema de estilos |
| app.js | 26 | Orquestador |
| main.js | 26 | Entry point |
| **Total JS modulos** | ~450 | 11 modulos funcionales |

---

## 5. Modulos JavaScript

### 5.1 main.js - Entry Point

```javascript
import './style.css'
import app from './app.js'

document.addEventListener('DOMContentLoaded', () => {
    // Cacheo de elementos DOM
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    // ... mas elementos

    app() // Ejecuta todos los modulos
});
```

**Responsabilidades:**
- Importar estilos CSS
- Cachear elementos DOM comunes
- Ejecutar la funcion `app()` cuando el DOM esta listo

### 5.2 app.js - Orquestador

```javascript
import initFaqAccordion from './faqAccordion';
import initHandleBrowserBackForward from './handleBrowserBackForward';
import initHeaderMobile from './headerMobile';
import initHeaderScrollEffect from './headerScrollEffect';
import initInitialPageLoad from './initialPageLoad';
import initKeyBoardNavegation from './keyboardNavegation';
import initScrollAnimations from './scrollAnimations';
import { initModal } from './modal';
import initScrollNavegation from './scrollNavegation';
import initSectionDetection from './sectionDetection';
import initContactForm from './contactForm';

export default function app(){
    initFaqAccordion();
    initHandleBrowserBackForward();
    initHeaderMobile();
    initHeaderScrollEffect();
    initInitialPageLoad();
    initKeyBoardNavegation();
    initModal();
    initScrollAnimations();
    initScrollNavegation();
    initSectionDetection();
    initContactForm();
}
```

**Responsabilidades:**
- Importar todos los modulos
- Ejecutarlos en orden

### 5.3 Modulos Detallados

#### contactForm/index.js

**Funcionalidad:** Maneja el formulario de contacto con validacion y feedback visual.

```javascript
export default function initContactForm(){
    // Validacion de email con regex
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Toast de notificacion
    function showToast(message) {
        // Muestra mensaje por 4 segundos
    }

    // Submit handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Validacion
        // Simulacion de envio (1.5s)
        // Feedback al usuario
    });
}
```

**Caracteristicas:**
- Validacion de campos obligatorios
- Validacion de formato de email
- Estado de loading animado
- Toast de confirmacion
- Codigo preparado para integracion con API real

#### modal/index.js

**Funcionalidad:** Sistema de modales para mostrar detalles de servicios.

```javascript
function openModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquea scroll
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

export function initModal(){
    // Event listeners para triggers
    // Event listeners para overlay y boton cerrar
}
```

**Caracteristicas:**
- Apertura/cierre con animacion
- Bloqueo de scroll del body
- Cierre al hacer clic en overlay
- Cierre con boton X

#### scrollAnimations/index.js

**Funcionalidad:** Animaciones de entrada al hacer scroll usando Intersection Observer.

```javascript
export default function initScrollAnimations(){
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Observer para elementos generales
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer especial para contadores de stats
    const statsObserver = new IntersectionObserver(/* ... */);
}
```

**Elementos animados:**
- `.value-card`
- `.service-card`
- `.case-card`
- `.process__step`
- `.founder-card`
- `.tech__category`
- Contadores de estadisticas

#### scrollNavegation/index.js

**Funcionalidad:** Navegacion suave entre secciones.

```javascript
export function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    const headerOffset = header.offsetHeight; // 72px
    const offsetPosition = /* calculo de posicion */;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

export default function initScrollNavegation(){
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Scroll suave
            // Actualiza URL sin recargar
            history.pushState(null, null, href);
        });
    });
}
```

**Caracteristicas:**
- Scroll suave nativo
- Compensacion por altura del header
- Actualizacion de URL con History API
- Soporta `href="#seccion"` y `data-nav="seccion"`

#### headerScrollEffect/index.js

**Funcionalidad:** Cambia la apariencia del header al hacer scroll.

```javascript
export default function initHeaderScrollEffect(){
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
```

**Efecto visual:**
- `.header` -> Fondo transparente
- `.header.scrolled` -> Fondo solido con borde

#### headerMobile/index.js

**Funcionalidad:** Menu hamburguesa para dispositivos moviles.

```javascript
export default function initHeaderMobile(){
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cierra al hacer clic en link
    // Cierra con tecla Escape
}
```

#### sectionDetection/index.js

**Funcionalidad:** Detecta que seccion esta visible y actualiza el nav activo.

```javascript
export default function initSectionDetection(){
    // Usa requestAnimationFrame para throttling
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
}
```

#### faqAccordion/index.js

**Funcionalidad:** Acordeon para preguntas frecuentes.

```javascript
export default function initFaqAccordion(){
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            // Cierra otros items abiertos
            // Abre/cierra el item actual
            item.classList.toggle('active');
        });
    });
}
```

#### keyboardNavegation/index.js

**Funcionalidad:** Accesibilidad por teclado.

```javascript
export default function initKeyBoardNavegation(){
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            // Cierra menu movil
        }
    });

    // Tab trap dentro de modales
}
```

#### statsCounter/index.js

**Funcionalidad:** Animacion de conteo para estadisticas.

```javascript
export default function animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000;

    // Animacion con requestAnimationFrame
    function update() {
        // Incremento gradual
        element.textContent = prefix + current + suffix;
    }
}
```

**Estadisticas animadas:**
- 50 proyectos entregados
- 99.9% uptime promedio
- -70% tiempo de deploy
- +15 empresas confian

---

## 6. Sistema de Estilos CSS

### 6.1 Variables CSS (Custom Properties)

```css
:root {
    /* Colores */
    --color-bg: #0a0a0b;
    --color-bg-secondary: #111113;
    --color-bg-tertiary: #18181b;
    --color-surface: #1c1c1f;
    --color-surface-hover: #252528;
    --color-border: #27272a;
    --color-border-light: #3f3f46;

    --color-text: #fafafa;
    --color-text-secondary: #a1a1aa;
    --color-text-muted: #71717a;

    --color-primary: #10b981;        /* Verde esmeralda */
    --color-primary-hover: #059669;
    --color-primary-light: rgba(16, 185, 129, 0.1);

    --color-accent: #06b6d4;         /* Cyan */
    --color-accent-secondary: #8b5cf6; /* Violeta */

    --color-success: #22c55e;
    --color-warning: #f59e0b;
    --color-error: #ef4444;

    /* Tipografia */
    --font-sans: 'Plus Jakarta Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Espaciado */
    --space-xs: 0.25rem;   /* 4px */
    --space-sm: 0.5rem;    /* 8px */
    --space-md: 1rem;      /* 16px */
    --space-lg: 1.5rem;    /* 24px */
    --space-xl: 2rem;      /* 32px */
    --space-2xl: 3rem;     /* 48px */
    --space-3xl: 4rem;     /* 64px */
    --space-4xl: 6rem;     /* 96px */

    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;

    /* Sombras */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 40px rgba(16, 185, 129, 0.15);

    /* Transiciones */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;

    /* Layout */
    --container-max: 1200px;
    --container-padding: 1.5rem;
    --header-height: 72px;
}
```

### 6.2 Breakpoints Responsive

```css
/* Desktop: 1024px+ (default) */

@media (max-width: 1024px) {
    /* Tablet y pantallas medianas */
}

@media (max-width: 768px) {
    /* Mobile */
    :root {
        --container-padding: 1rem;
    }
}

@media (max-width: 480px) {
    /* Mobile pequeno */
}
```

### 6.3 Componentes CSS Principales

#### Header

```css
.header {
    position: fixed;
    height: var(--header-height);
    background: rgba(10, 10, 11, 0.8);
    backdrop-filter: blur(12px);
}

.header.scrolled {
    border-color: var(--color-border);
    background: rgba(10, 10, 11, 0.95);
}
```

#### Botones

```css
.btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: all var(--transition-fast);
}

.btn--primary {
    background: var(--color-primary);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.btn--secondary {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
}
```

#### Cards

```css
.service-card {
    padding: var(--space-xl);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
}

.service-card:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-glow);
}
```

#### Animaciones

```css
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}
```

---

## 7. Componentes HTML

### 7.1 Estructura General

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags, fonts, styles -->
</head>
<body>
    <header class="header">
        <!-- Logo + Navegacion -->
    </header>

    <main>
        <section class="hero" id="inicio">...</section>
        <section class="value-props">...</section>
        <section class="services" id="servicios">...</section>
        <section class="stats">...</section>
        <section class="tech">...</section>
        <section class="about" id="nosotros">...</section>
        <section class="process" id="proceso">...</section>
        <section class="cases" id="casos">...</section>
        <section class="cta-section">...</section>
        <section class="contact" id="contacto">...</section>
        <section class="faq">...</section>
    </main>

    <footer class="footer">...</footer>

    <!-- Modales -->
    <div class="modal" id="modal-desarrollo">...</div>
    <div class="modal" id="modal-devops">...</div>
    <div class="modal" id="modal-cloud">...</div>
    <div class="modal" id="modal-migraciones">...</div>
    <div class="modal" id="modal-soporte">...</div>

    <!-- Toast -->
    <div class="toast" id="toast">...</div>

    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 7.2 Secciones del Sitio

| # | Seccion | ID | Descripcion |
|---|---------|-----|-------------|
| 1 | Hero | `inicio` | Banner principal con CTA |
| 2 | Value Props | - | 3 propuestas de valor |
| 3 | Servicios | `servicios` | 5 servicios con modales |
| 4 | Stats | - | Metricas animadas |
| 5 | Tech Stack | - | Tecnologias dominadas |
| 6 | Nosotros | `nosotros` | Historia y fundadores |
| 7 | Proceso | `proceso` | Timeline de 4 fases |
| 8 | Casos de Exito | `casos` | 3 case studies |
| 9 | CTA | - | Llamada a la accion |
| 10 | Contacto | `contacto` | Formulario y datos |
| 11 | FAQ | - | 4 preguntas frecuentes |
| 12 | Footer | - | Links y copyright |

### 7.3 Servicios Ofrecidos

| Servicio | Modal ID | Tecnologias |
|----------|----------|-------------|
| Desarrollo de Software | `modal-desarrollo` | React, Next.js, Vue, Node.js, NestJS, .NET |
| DevOps & CI/CD | `modal-devops` | GitHub Actions, GitLab CI, Terraform, Docker |
| Arquitectura Cloud | `modal-cloud` | AWS (EC2, ECS, Lambda, RDS, etc.) |
| Migraciones | `modal-migraciones` | On-premise a Cloud, entre providers |
| Soporte & Consultoria | `modal-soporte` | CTO as a Service, mentoring |

### 7.4 Formulario de Contacto

```html
<form class="contact__form" id="contactForm">
    <div class="form__group">
        <label for="name">Nombre *</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div class="form__group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div class="form__group">
        <label for="company">Empresa</label>
        <input type="text" id="company" name="company">
    </div>
    <div class="form__group">
        <label for="service">Tipo de servicio</label>
        <select id="service" name="service">
            <option value="">Seleccionar...</option>
            <option value="desarrollo">Desarrollo de Software</option>
            <option value="devops">DevOps & CI/CD</option>
            <option value="cloud">Arquitectura Cloud</option>
            <option value="migraciones">Migraciones</option>
            <option value="soporte">Soporte & Consultoria</option>
            <option value="otro">Otro</option>
        </select>
    </div>
    <div class="form__group">
        <label for="message">Mensaje *</label>
        <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit" class="btn btn--primary btn--full">
        Enviar mensaje
    </button>
</form>
```

---

## 8. Flujo de la Aplicacion

### 8.1 Inicializacion

```
1. Navegador carga index.html
   │
   ▼
2. Vite sirve /src/main.js
   │
   ▼
3. main.js importa style.css (hot reload en dev)
   │
   ▼
4. main.js importa app.js
   │
   ▼
5. DOMContentLoaded -> app() se ejecuta
   │
   ▼
6. app() inicializa 11 modulos en orden
```

### 8.2 Flujo de Navegacion

```
Usuario hace clic en link "#servicios"
        │
        ▼
initScrollNavegation captura el click
        │
        ▼
smoothScrollTo('servicios') calcula posicion
        │
        ▼
Ajusta por header height (72px)
        │
        ▼
window.scrollTo({ behavior: 'smooth' })
        │
        ▼
history.pushState() actualiza URL
        │
        ▼
initSectionDetection actualiza nav activo
```

### 8.3 Flujo de Modal

```
Usuario hace clic en "Mas informacion"
        │
        ▼
initModal captura [data-modal="servicio"]
        │
        ▼
openModal('servicio') busca #modal-servicio
        │
        ▼
Agrega clase .active al modal
        │
        ▼
body.style.overflow = 'hidden'
        │
        ▼
Usuario puede:
├── Clic en overlay -> closeModal()
├── Clic en boton X -> closeModal()
├── Tecla Escape -> closeAllModals()
└── Clic en "Solicitar presupuesto" -> navega a contacto
```

### 8.4 Flujo de Formulario

```
Usuario completa formulario y hace submit
        │
        ▼
initContactForm captura el submit
        │
        ▼
Valida campos obligatorios
        │
        ├── Error -> showToast("Campos incompletos")
        │
        ▼
Valida formato de email
        │
        ├── Error -> showToast("Email invalido")
        │
        ▼
Muestra estado loading (1.5s simulado)
        │
        ▼
Reset formulario
        │
        ▼
showToast("Mensaje enviado!")
        │
        ▼
Toast se oculta despues de 4 segundos
```

---

## 9. Guia de Personalizacion

### 9.1 Cambiar Nombre de Empresa

**Archivos a modificar:** `index.html`

Buscar y reemplazar:
- `Usagitech` → Tu nombre de empresa
- `usagitech.com` → Tu dominio
- Meta tags (title, description, og:*)

### 9.2 Cambiar Colores

**Archivo:** `src/style.css`

```css
:root {
    /* Cambiar color primario */
    --color-primary: #10b981;        /* Verde actual */
    --color-primary-hover: #059669;
    --color-primary-light: rgba(16, 185, 129, 0.1);

    /* Cambiar color de acento */
    --color-accent: #06b6d4;         /* Cyan actual */
}
```

### 9.3 Cambiar Fundadores

**Archivo:** `index.html`, seccion `.about__founders`

```html
<div class="founder-card">
    <div class="founder-card__avatar">
        <span>XX</span>  <!-- Iniciales -->
    </div>
    <div class="founder-card__info">
        <h4 class="founder-card__name">Nombre Completo</h4>
        <span class="founder-card__role">Co-fundador & Rol</span>
        <p class="founder-card__bio">
            Descripcion breve...
        </p>
    </div>
</div>
```

### 9.4 Agregar/Modificar Servicios

1. En la seccion `#servicios`, duplicar o modificar `.service-card`
2. Crear/modificar modal correspondiente `#modal-[servicio]`
3. Agregar trigger `data-modal="servicio"` al boton

### 9.5 Configurar Formulario para Produccion

**Opcion A: Formspree**

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

**Opcion B: API propia**

En `src/contactForm/index.js`:

```javascript
const response = await fetch('https://tu-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

---

## 10. Deployment

### 10.1 Scripts npm

```bash
# Desarrollo (hot reload)
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview
```

### 10.2 Opcion 1: AWS S3 + CloudFront

```bash
# Crear bucket
aws s3 mb s3://usagitech-site --region us-east-1

# Habilitar hosting estatico
aws s3 website s3://usagitech-site \
  --index-document index.html \
  --error-document index.html

# Subir archivos
aws s3 sync dist/ s3://usagitech-site \
  --cache-control "max-age=31536000"

# Crear distribucion CloudFront para HTTPS
```

### 10.3 Opcion 2: GitHub Pages

1. Crear repositorio en GitHub
2. `git push origin main`
3. Settings -> Pages -> Source: main branch
4. Acceder en `https://usuario.github.io/repo`

### 10.4 Opcion 3: Vercel / Netlify

1. Conectar repositorio
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automatico con cada push

---

## 11. SEO y Performance

### 11.1 Meta Tags Incluidos

```html
<meta name="description" content="Consultora IT especializada...">
<meta name="keywords" content="consultora IT, DevOps, AWS...">
<meta name="author" content="Usagitech">

<meta property="og:title" content="Usagitech | Consultora IT">
<meta property="og:description" content="Transformamos tu infraestructura...">
<meta property="og:type" content="website">
<meta property="og:url" content="https://usagitech.com">
```

### 11.2 Mejoras Recomendadas

- [ ] Agregar `sitemap.xml`
- [ ] Agregar `robots.txt`
- [ ] Configurar Google Search Console
- [ ] Agregar schema.org markup
- [ ] Agregar Open Graph image

### 11.3 Performance

**Ya implementado:**
- Vanilla JS (sin frameworks pesados)
- CSS variables (sin preprocesadores)
- Intersection Observer (lazy animations)
- requestAnimationFrame throttling
- SVG inline (no HTTP requests extra)
- Fonts preconnect

**Lighthouse esperado:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 90+

---

## 12. Mantenimiento

### 12.1 Agregar Nuevo Modulo

1. Crear carpeta en `src/nuevoModulo/`
2. Crear `index.js` con funcion de inicializacion:

```javascript
export default function initNuevoModulo() {
    // Tu codigo aqui
}
```

3. Importar en `app.js`:

```javascript
import initNuevoModulo from './nuevoModulo';

export default function app() {
    // ... otros modulos
    initNuevoModulo();
}
```

### 12.2 Estado del Repositorio

```
Branch: main
Ultimo commit: add init of contactForm

Commits recientes:
- ccb5a6e: add init of contactForm
- 09694fc: add new logo
- a2c2776: modularize it into different files all the base
- accede9: delete zip of proyect
- 69e8dc0: add vite and modify the struct of folders
```

### 12.3 Dependencias

```json
{
  "devDependencies": {
    "vite": "npm:rolldown-vite@7.2.5"
  }
}
```

**Actualizar dependencias:**

```bash
npm update
npm audit fix
```

---

## Apendice: Referencia Rapida

### Comandos Utiles

```bash
# Iniciar desarrollo
npm run dev

# Construir para produccion
npm run build

# Ver build local
npm run preview

# Instalar dependencias
npm install
```

### Clases CSS Importantes

| Clase | Uso |
|-------|-----|
| `.container` | Wrapper centrado max-1200px |
| `.section` | Padding vertical para secciones |
| `.section__header` | Header centrado de seccion |
| `.btn` | Estilo base de boton |
| `.btn--primary` | Boton verde principal |
| `.btn--secondary` | Boton con borde |
| `.animate-on-scroll` | Animacion fade-in al scroll |
| `.visible` | Estado visible de animacion |
| `.active` | Estado activo (nav, modal, faq) |

### Elementos con ID

| ID | Elemento |
|----|----------|
| `header` | Header fijo |
| `nav` | Navegacion |
| `navToggle` | Boton hamburguesa |
| `inicio` | Seccion hero |
| `servicios` | Seccion servicios |
| `nosotros` | Seccion about |
| `proceso` | Seccion proceso |
| `casos` | Seccion casos de exito |
| `contacto` | Seccion contacto |
| `contactForm` | Formulario de contacto |
| `toast` | Notificacion toast |
| `modal-*` | Modales de servicios |

---

**Documentacion generada para Usagitech** | Enero 2026

*Este documento cubre todos los aspectos tecnicos del proyecto. Para dudas o actualizaciones, consultar el repositorio Git.*
