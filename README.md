# Usagitech - Website Corporativo IT

Website SPA profesional para consultora IT boutique especializada en DevOps, Cloud y Desarrollo de Software.

## Inicio Rapido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para produccion
npm run build

# Preview del build
npm run preview
```

El sitio estara disponible en `http://localhost:5173`

---

## Stack Tecnologico

| Tecnologia | Version | Uso |
|------------|---------|-----|
| Vite (Rolldown) | 7.2.5 | Bundler y dev server |
| JavaScript | ES6+ | Vanilla JS modular |
| CSS3 | - | Variables CSS, Flexbox, Grid |
| HTML5 | - | Semantico |

**Sin frameworks ni dependencias de runtime** - Solo Vite como dev dependency.

---

## Estructura del Proyecto

```
usagitech-site/
├── public/                     # Assets estaticos
│   └── logo.png               # Logo de la empresa
│
├── src/                        # Codigo fuente
│   ├── main.js                # Entry point
│   ├── app.js                 # Orquestador de modulos
│   ├── style.css              # Estilos globales (1768 lineas)
│   │
│   ├── contactForm/           # Formulario de contacto
│   ├── faqAccordion/          # Acordeon FAQ
│   ├── handleBrowserBackForward/ # Navegacion del browser
│   ├── headerMobile/          # Menu hamburguesa
│   ├── headerScrollEffect/    # Efecto header al scroll
│   ├── initialPageLoad/       # Carga inicial
│   ├── keyboardNavegation/    # Accesibilidad teclado
│   ├── modal/                 # Sistema de modales
│   ├── scrollAnimations/      # Animaciones al scroll
│   ├── scrollNavegation/      # Navegacion suave
│   ├── sectionDetection/      # Deteccion seccion activa
│   └── statsCounter/          # Contador animado
│
├── index.html                  # Pagina principal
├── package.json               # Configuracion npm
├── CLAUDE.md                  # Contexto para Claude AI
└── README.md                  # Este archivo
```

---

## Variables CSS

### Colores

```css
:root {
    /* Fondos */
    --color-bg: #0a0a0b;              /* Fondo principal */
    --color-bg-secondary: #111113;    /* Fondo secundario */
    --color-surface: #1c1c1f;         /* Superficies (cards) */

    /* Bordes */
    --color-border: #27272a;          /* Borde normal */
    --color-border-light: #3f3f46;    /* Borde hover */

    /* Texto */
    --color-text: #fafafa;            /* Texto principal */
    --color-text-secondary: #a1a1aa;  /* Texto secundario */
    --color-text-muted: #71717a;      /* Texto apagado */

    /* Marca */
    --color-primary: #10b981;         /* Verde principal */
    --color-primary-hover: #059669;   /* Verde hover */
    --color-accent: #06b6d4;          /* Cyan de acento */

    /* Estados */
    --color-success: #22c55e;         /* Exito */
    --color-warning: #f59e0b;         /* Advertencia */
    --color-error: #ef4444;           /* Error */
}
```

### Espaciado

```css
:root {
    --space-xs: 0.25rem;    /* 4px */
    --space-sm: 0.5rem;     /* 8px */
    --space-md: 1rem;       /* 16px */
    --space-lg: 1.5rem;     /* 24px */
    --space-xl: 2rem;       /* 32px */
    --space-2xl: 3rem;      /* 48px */
    --space-3xl: 4rem;      /* 64px */
    --space-4xl: 6rem;      /* 96px */
}
```

### Tipografia

```css
:root {
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Layout

```css
:root {
    --container-max: 1200px;
    --container-padding: 1.5rem;
    --header-height: 72px;
}
```

### Transiciones

```css
:root {
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
}
```

### Border Radius

```css
:root {
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;
}
```

---

## Modulos JavaScript

### Arquitectura

Cada modulo exporta una funcion de inicializacion que se ejecuta al cargar el DOM:

```javascript
// src/moduleName/index.js
export default function initModuleName() {
    // Logica del modulo
}

// src/app.js
import initModuleName from './moduleName';
export default function app() {
    initModuleName();
}
```

### Lista de Modulos

| Modulo | Archivo | Descripcion |
|--------|---------|-------------|
| **contactForm** | `src/contactForm/index.js` | Validacion y envio del formulario |
| **faqAccordion** | `src/faqAccordion/index.js` | Acordeon de preguntas frecuentes |
| **handleBrowserBackForward** | `src/handleBrowserBackForward/index.js` | Manejo de botones atras/adelante |
| **headerMobile** | `src/headerMobile/index.js` | Menu hamburguesa responsive |
| **headerScrollEffect** | `src/headerScrollEffect/index.js` | Efecto del header al scroll |
| **initialPageLoad** | `src/initialPageLoad/index.js` | Navegacion inicial por hash |
| **keyboardNavegation** | `src/keyboardNavegation/index.js` | Escape para cerrar modales |
| **modal** | `src/modal/index.js` | Sistema de modales |
| **scrollAnimations** | `src/scrollAnimations/index.js` | Animaciones con IntersectionObserver |
| **scrollNavegation** | `src/scrollNavegation/index.js` | Scroll suave entre secciones |
| **sectionDetection** | `src/sectionDetection/index.js` | Deteccion de seccion activa |
| **statsCounter** | `src/statsCounter/index.js` | Animacion de contadores |

---

## Secciones del Sitio

| Seccion | ID | Descripcion |
|---------|-----|-------------|
| Hero | `#inicio` | Banner principal con CTAs |
| Value Props | - | 3 propuestas de valor |
| Servicios | `#servicios` | 5 servicios con modales |
| Stats | - | 4 metricas animadas |
| Tech Stack | - | Tecnologias por categoria |
| Nosotros | `#nosotros` | Historia y fundadores |
| Proceso | `#proceso` | Timeline de 4 fases |
| Casos de Exito | `#casos` | 3 case studies |
| CTA | - | Llamada a la accion |
| Contacto | `#contacto` | Formulario y datos |
| FAQ | - | 4 preguntas frecuentes |
| Footer | - | Links y copyright |

---

## Personalizacion

### Cambiar Colores

Editar variables en `src/style.css`:

```css
:root {
    --color-primary: #TU_COLOR;
    --color-accent: #TU_ACENTO;
}
```

### Cambiar Nombre de Empresa

Buscar y reemplazar en `index.html`:
- `Usagitech` -> Tu empresa
- `usagitech.com` -> Tu dominio
- Actualizar meta tags

### Cambiar Fundadores

En `index.html`, seccion `.about__founders`:

```html
<div class="founder-card">
    <div class="founder-card__avatar">
        <span>XX</span>  <!-- Iniciales -->
    </div>
    <div class="founder-card__info">
        <h4>Nombre</h4>
        <span>Rol</span>
        <p>Bio...</p>
    </div>
</div>
```

### Agregar Servicios

1. Agregar `.service-card` en seccion `#servicios`
2. Crear modal `#modal-nombre` al final del body
3. Agregar `data-modal="nombre"` al boton

### Conectar Formulario

**Formspree:**
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

**API propia:**
```javascript
// En src/contactForm/index.js
const response = await fetch('TU_API', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

---

## Responsive Design

| Breakpoint | Dispositivo |
|------------|-------------|
| 1024px+ | Desktop |
| 768px - 1024px | Tablet |
| < 768px | Mobile |
| < 480px | Mobile pequeno |

---

## Deployment

### GitHub Pages

```bash
npm run build
# Push carpeta dist/ a rama gh-pages
```

### Vercel / Netlify

1. Conectar repositorio
2. Build command: `npm run build`
3. Output: `dist`

### AWS S3

```bash
npm run build
aws s3 sync dist/ s3://tu-bucket
```

---

## SEO

### Meta Tags Incluidos

- `title`, `description`, `keywords`
- Open Graph (og:title, og:description, og:type, og:url)
- Favicon

### Mejoras Pendientes

- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Schema.org markup
- [ ] og:image

---

## Accesibilidad

- Navegacion por teclado
- Tab trap en modales
- Escape cierra modales/menu
- Estructura de headings correcta
- HTML semantico

---

## Performance

- Vanilla JS (0 dependencias runtime)
- Intersection Observer (lazy animations)
- requestAnimationFrame throttling
- SVG inline
- CSS variables

---

## Licencia

Libre para uso comercial. Personalizar y usar como quieras.

---

**Desarrollado para Usagitech** | 2025
