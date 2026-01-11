# CLAUDE.md - Contexto del Proyecto Usagitech

Este archivo proporciona contexto para Claude AI al trabajar con este repositorio.

---

## Descripcion del Proyecto

**Usagitech** es un sitio web corporativo SPA (Single Page Application) para una consultora IT boutique.

### Tipo de Proyecto
- Website estatico con JavaScript vanilla
- Sin frameworks (React, Vue, etc.)
- Bundler: Vite (Rolldown)
- Arquitectura modular

### Proposito
Landing page profesional para captar clientes de servicios IT:
- DevOps y CI/CD
- Arquitectura Cloud (AWS, GCP, Azure)
- Desarrollo de Software
- Migraciones Cloud
- Consultoria Tecnica

---

## Arquitectura

### Entry Point
```
index.html -> src/main.js -> src/app.js -> [modulos]
```

### Patron de Modulos
Cada funcionalidad esta en su propia carpeta con un `index.js` que exporta una funcion de inicializacion:

```javascript
// src/nombreModulo/index.js
export default function initNombreModulo() {
    // logica
}
```

El orquestador `src/app.js` importa y ejecuta todos los modulos.

### Modulos Existentes

| Modulo | Responsabilidad |
|--------|-----------------|
| `contactForm` | Validacion y envio del formulario de contacto |
| `faqAccordion` | Toggle de preguntas frecuentes |
| `handleBrowserBackForward` | Navegacion con botones del browser |
| `headerMobile` | Menu hamburguesa para mobile |
| `headerScrollEffect` | Cambio de estilo del header al scroll |
| `initialPageLoad` | Manejo de hash en URL al cargar |
| `keyboardNavegation` | Escape para cerrar modales |
| `modal` | Apertura/cierre de modales de servicios |
| `scrollAnimations` | Animaciones con IntersectionObserver |
| `scrollNavegation` | Scroll suave entre secciones |
| `sectionDetection` | Deteccion de seccion visible |
| `statsCounter` | Animacion de contadores numericos |

---

## Stack Tecnico

- **Bundler**: Vite (Rolldown) 7.2.5
- **JavaScript**: ES6+ vanilla (ES Modules)
- **CSS**: CSS3 con variables custom
- **HTML**: Semantico
- **Fonts**: Google Fonts (Plus Jakarta Sans, JetBrains Mono)
- **Icons**: SVG inline

---

## Comandos

```bash
npm install     # Instalar dependencias
npm run dev     # Servidor de desarrollo (localhost:5173)
npm run build   # Build de produccion
npm run preview # Preview del build
```

---

## Archivos Clave

| Archivo | Descripcion |
|---------|-------------|
| `index.html` | Pagina principal (~1139 lineas) |
| `src/main.js` | Entry point, importa CSS y ejecuta app() |
| `src/app.js` | Orquestador de modulos |
| `src/style.css` | Estilos globales (~1768 lineas) |
| `package.json` | Configuracion npm |

---

## Variables CSS Importantes

```css
/* Colores principales */
--color-primary: #10b981;      /* Verde esmeralda */
--color-accent: #06b6d4;       /* Cyan */
--color-bg: #0a0a0b;           /* Fondo oscuro */
--color-text: #fafafa;         /* Texto claro */

/* Layout */
--header-height: 72px;
--container-max: 1200px;

/* Breakpoints (en media queries) */
/* Desktop: 1024px+ */
/* Tablet: 768px - 1024px */
/* Mobile: < 768px */
```

---

## Convenciones de Codigo

### JavaScript
- ES6+ con ES Modules
- Funciones de inicializacion prefijadas con `init`
- camelCase para variables y funciones
- Cada modulo en carpeta propia con `index.js`

### CSS
- BEM para clases (`.block__element--modifier`)
- Variables CSS en `:root`
- Mobile-first responsive design

### HTML
- IDs para secciones navegables (`#servicios`, `#contacto`)
- `data-*` attributes para comportamiento JS
- Clases BEM para estilos

---

## Secciones del Sitio

1. **Hero** (`#inicio`) - Banner principal
2. **Value Props** - Propuestas de valor
3. **Servicios** (`#servicios`) - 5 servicios con modales
4. **Stats** - Metricas animadas
5. **Tech Stack** - Tecnologias
6. **Nosotros** (`#nosotros`) - Historia y fundadores
7. **Proceso** (`#proceso`) - Timeline
8. **Casos de Exito** (`#casos`) - Case studies
9. **CTA** - Llamada a la accion
10. **Contacto** (`#contacto`) - Formulario
11. **FAQ** - Preguntas frecuentes
12. **Footer** - Links

---

## Modales de Servicios

Los modales estan al final de `index.html`:

- `#modal-desarrollo` - Desarrollo de Software
- `#modal-devops` - DevOps & CI/CD
- `#modal-cloud` - Arquitectura Cloud
- `#modal-migraciones` - Migraciones
- `#modal-soporte` - Soporte & Consultoria

Activados con `data-modal="nombre"` en botones.

---

## Formulario de Contacto

- Campos: name, email, company (opcional), service (select), message
- Validacion client-side en `src/contactForm/index.js`
- Actualmente simula envio (1.5s delay)
- Preparado para conectar con API real

---

## Consideraciones al Modificar

### Agregar nuevo modulo
1. Crear `src/nuevoModulo/index.js`
2. Exportar funcion `initNuevoModulo`
3. Importar en `src/app.js`
4. Llamar en funcion `app()`

### Agregar nuevo servicio
1. Duplicar `.service-card` en `index.html`
2. Crear modal `#modal-nuevoservicio`
3. Agregar `data-modal="nuevoservicio"` al boton

### Cambiar colores
- Modificar variables en `src/style.css` seccion `:root`

### Cambiar contenido
- Editar directamente en `index.html`

---

## Estado del Repositorio

```
Branch: main
Ultimo trabajo: Modularizacion de JS
Pendiente: Conectar formulario a API real
```

---

## Notas para Claude

- El proyecto NO usa frameworks (React, Vue, etc.)
- Todo el JS es vanilla con ES Modules
- Los estilos usan variables CSS (no SASS/LESS)
- Vite solo se usa para desarrollo y bundling
- El formulario actualmente simula el envio
- Las animaciones usan IntersectionObserver nativo
- El sitio es completamente responsive

### Al crear nuevos modulos
- Seguir el patron de carpeta con `index.js`
- Exportar funcion de inicializacion
- Registrar en `app.js`

### Al modificar estilos
- Usar las variables CSS existentes
- Seguir convencion BEM
- Considerar responsive (mobile-first)

### Al agregar secciones
- Agregar ID si debe ser navegable
- Incluir en nav si corresponde
- Agregar animaciones scroll si es card/elemento visual
