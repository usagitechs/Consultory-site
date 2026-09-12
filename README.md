# usagiteks.com

Sitio corporativo de **usagiteks**, consultora IT especializada en DevOps, arquitectura cloud en AWS y desarrollo de software. Single page estática, sin framework ni dependencias de runtime.

Producción: <https://usagiteks.com> (GitHub Pages, dominio propio).

## Stack

| Capa | Tecnología |
|---|---|
| Build / dev server | [Vite](https://vite.dev) 7 |
| Front | HTML5 + CSS3 (custom properties) + JavaScript ES modules, sin frameworks |
| Tests | [Vitest](https://vitest.dev) 4 + jsdom |
| Anti-spam del formulario | Cloudflare Turnstile |
| Backend del formulario | `POST https://api.usagiteks.com/contact` — repo `usagitechs/contact-api` (Go, AWS Lambda) |
| CI/CD | GitHub Actions → GitHub Pages |

## Desarrollo

Requiere Node.js 22 o superior (`.nvmrc` fija 24).

```bash
npm ci          # instalar dependencias
npm run dev     # http://localhost:5173
npm test        # tests en modo watch (npm test -- --run para una sola corrida)
npm run build   # genera dist/
npm run preview # sirve dist/ localmente
```

## Estructura

```
index.html                 Marcado completo del sitio (secciones + modales)
public/style.css           Estilos globales; tokens de diseño en :root
public/logo.png            Logo
src/main.js                Entry point: arranca app() al cargar el DOM
src/app.js                 Orquestador: inicializa cada módulo
src/<feature>/index.js     Un módulo por comportamiento (form, modales, scroll, FAQ...)
src/__tests__/             Tests unitarios (jsdom)
.github/workflows/ci.yml   CI en pull requests: test + build
.github/workflows/deploy.yml  Deploy a Pages en cada push a main
```

## Flujo de trabajo

1. Rama desde `main`, cambios, PR.
2. `CI` corre tests y build sobre la PR. `main` está protegida: solo se mergea con CI en verde y revisión.
3. Al mergear, `Deploy` vuelve a testear, construye y publica a GitHub Pages.

Las actions están pineadas por SHA de commit y Dependabot propone actualizaciones semanales de actions y dependencias.

## Formulario de contacto

La validación del front replica las reglas del backend (`contact-api`): nombre 2–100, email válido hasta 254, mensaje 10–2000, empresa hasta 100, servicio hasta 50, token de Turnstile obligatorio. Respuestas: `200` enviado, `400` JSON inválido, `422` validación/captcha, `500` interno.

## Documentación adicional

`DOCUMENTACION.md` es una referencia extendida generada al inicio del proyecto y contiene partes desactualizadas; ante cualquier diferencia manda el código y este README.
