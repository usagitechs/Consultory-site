# usagiteks.com

Sitio corporativo de **usagiteks**, consultora IT especializada en DevOps, arquitectura cloud multi-proveedor (AWS, Azure, GCP, OCI) y desarrollo de software. Sitio estático trilingüe (español, inglés, portugués) con tema claro/oscuro.

Producción: <https://usagiteks.com> · `/en/` · `/pt/` (GitHub Pages, dominio propio).

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) 7, salida estática, i18n routing nativo |
| Estilos | CSS puro con design tokens en `src/styles/global.css` (`:root` oscuro, `[data-theme=light]` claro) |
| Scripts | TypeScript vanilla (`src/scripts/`), sin framework de UI |
| i18n | Un diccionario por sección en `src/i18n/sections/*.ts`, mismas claves en `es`/`en`/`pt` (verificado por test) |
| SEO | Una URL por idioma con `hreflang`, canonical, Open Graph y sitemap (`@astrojs/sitemap`) |
| Tests | [Vitest](https://vitest.dev) 4 + jsdom |
| Anti-spam | Cloudflare Turnstile |
| Backend del formulario | `POST https://api.usagiteks.com/contact` (repo privado `usagitechs/contact-api`, Go + AWS Lambda). Configurable con `PUBLIC_CONTACT_API` |
| Paquetes | pnpm con lockfile congelado, scripts de instalación bloqueados y cuarentena de 24 h para versiones nuevas |
| CI/CD | GitHub Actions → GitHub Pages, actions pineadas por SHA, Dependabot semanal |

## Arquitectura

Diagrama interactivo en [`docs/arquitectura.html`](docs/arquitectura.html) (fuente: `docs/arquitectura.archify.json`, generado con Archify): entrega continua, sitio estático y camino del formulario de contacto.

## Desarrollo

Requiere Node.js 22 o superior (`.nvmrc` fija 24) y **pnpm** (`corepack enable` lo instala en la versión fijada en `package.json`).

```bash
pnpm install       # dependencias (respeta pnpm-lock.yaml)
pnpm dev           # http://localhost:4321
pnpm test -- --run # tests (sin --run queda en modo watch)
pnpm build         # genera dist/
pnpm preview       # sirve dist/
```

Por qué pnpm: `node_modules` estricto (sin dependencias fantasma), ningún paquete ejecuta scripts de instalación salvo que esté en `onlyBuiltDependencies`, y `minimumReleaseAge` evita instalar versiones publicadas hace menos de 24 h.

## Estructura

```
astro.config.mjs            site, i18n (es por defecto sin prefijo; /en/, /pt/), sitemap
src/pages/                  index.astro, en/index.astro, pt/index.astro → <Landing lang=... />
src/components/Landing.astro  Orden de secciones
src/layouts/Base.astro      <head> (meta por idioma, hreflang, OG, fuentes), bootstrap del tema, Turnstile, header y footer
src/components/             Header, Hero, StackStrip, Services, Process, About, Contact, Footer
src/i18n/                   config.ts (locales), utils.ts (rutas), sections/*.ts (textos)
src/data/                   site.ts (contacto, stack), founders.ts (perfiles)
src/scripts/                theme.ts, nav.ts, contact-form.ts
src/styles/global.css       Tokens y estilos base
src/__tests__/              i18n (claves completas), validación del formulario
public/                     logo, favicon, og.png, CNAME
```

## Cómo agregar o cambiar textos

Cada sección tiene su diccionario en `src/i18n/sections/`. Agregá la clave en los tres idiomas; el test `i18n.test.ts` falla si falta alguna. Los perfiles de los fundadores (nombre, skills, LinkedIn) están en `src/data/founders.ts`; el link a LinkedIn aparece solo si la URL no está vacía.

## Flujo de trabajo

1. Rama desde `main`, cambios, PR.
2. `CI` corre tests y build sobre la PR. `main` está protegida por un ruleset: solo se mergea con el check `build` en verde.
3. Al mergear, `Deploy` vuelve a testear, construye y publica a GitHub Pages.

## Formulario de contacto

Dos proveedores, elegidos en build según las variables de entorno (ver `.env.example`):

| Proveedor | Cuándo | Cómo |
|---|---|---|
| **EmailJS** | Si `PUBLIC_EMAILJS_PUBLIC_KEY`, `PUBLIC_EMAILJS_SERVICE_ID` y `PUBLIC_EMAILJS_TEMPLATE_ID` están seteadas | El navegador envía por EmailJS; sin backend. Anti-spam: honeypot + rate limit del SDK. En Actions salen de las *repository variables* `EMAILJS_*` |
| **API** | Si falta alguna | `POST` al endpoint de `contact-api` con token de Turnstile verificado en el servidor |

La plantilla de EmailJS recibe `name`, `email`, `company`, `service`, `message`, `lang`, `page` y `time`.

La validación del front replica las reglas del backend: nombre 2–100, email válido hasta 254, mensaje 10–2000, empresa hasta 100, servicio hasta 50, token de Turnstile obligatorio. Si el envío falla, el sitio muestra el email de contacto como alternativa.
