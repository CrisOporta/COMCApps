# COMCApps — Sitio Web Corporativo

Frontend corporativo de **COMCApps**, construido siguiendo el mismo patrón arquitectónico, convenciones de código y sistema visual de `OptimizaLey.Web`.

## Stack Tecnológico
- **React 19** + **TypeScript (estricto)** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`) + **Preline UI v5**
- **React Router v8** con carga perezosa (*lazy routes*) y barra de progreso **NProgress**
- **React Hook Form** + **Zod** para validación de formularios
- **Modo Claro / Oscuro / Sistema** sin parpadeo inicial

## Estructura del Proyecto
```text
src/
├── app/                 # Shell de aplicación, enrutador, layout principal y buscador Ctrl+K
├── features/
│   ├── home/            # Landing principal con preview interactivo, marquee, casos y FAQ
│   ├── services/        # Servicios detallados, modalidades y estimador interactivo de proyectos
│   ├── projects/        # Portafolio filtrable y páginas de caso de estudio (/proyectos/:slug)
│   ├── team/            # Directorio de equipo por área, valores, historia y vacantes
│   ├── blog/            # Blog técnico con categorías, buscador y lector con índice (/blog/:slug)
│   └── contact/         # Formulario de contacto validado con Zod + canales directos
├── pages/               # Páginas legales (Privacidad, Términos) y 404
└── shared/              # Infraestructura compartida (config/company.ts, hooks, toast, UI base)
```

## Personalizar datos reales
Toda la información editable está centralizada y tipada en:
- `src/shared/config/company.ts` — Datos de la empresa, contacto, redes y métricas.
- `src/features/services/data/servicesData.ts` — Servicios, stack y parámetros del estimador.
- `src/features/projects/data/projectsData.ts` — Proyectos y casos de estudio.
- `src/features/team/data/teamData.ts` — Miembros del equipo, valores, hitos y vacantes.
- `src/features/blog/data/blogData.ts` — Artículos del blog técnico.
- `src/index.css` (`@theme`) — Paleta de color de marca en un único bloque.

## Comandos
```bash
pnpm install
pnpm dev       # Servidor de desarrollo en http://localhost:3000
pnpm lint      # ESLint estricto (0 warnings)
pnpm build     # Verificación TypeScript + build de producción
pnpm check     # Ejecuta lint + build
```
