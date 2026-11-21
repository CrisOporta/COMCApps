export type BlogCategory =
  | 'Arquitectura'
  | 'Desarrollo Web'
  | 'Móvil'
  | 'Inteligencia Artificial'
  | 'DevOps';

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  codeSnippet?: {
    lang: string;
    code: string;
  };
  callout?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  gradient: string;
  tags: string[];
  sections: BlogSection[];
}

export const BLOG_CATEGORIES: Array<'Todos' | BlogCategory> = [
  'Todos',
  'Arquitectura',
  'Desarrollo Web',
  'Móvil',
  'Inteligencia Artificial',
  'DevOps',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'arquitectura-feature-sliced-react-19-typescript',
    title: 'Arquitectura limpia en React 19 y TypeScript para aplicaciones SaaS escalables',
    excerpt:
      'Cómo estructuramos nuestros frontends en COMCApps con fronteras estrictas por dominio, lazy routing y cero deuda técnica desde el primer commit.',
    category: 'Desarrollo Web',
    publishedAt: '12 Nov 2026',
    readTime: '6 min de lectura',
    featured: true,
    author: {
      name: 'Cristian Oporta',
      role: 'Founder & Lead Architect',
      initials: 'CO',
    },
    gradient: 'from-violet-600 to-indigo-800',
    tags: ['React 19', 'TypeScript', 'Arquitectura', 'ESLint'],
    sections: [
      {
        id: 'por-que-importa',
        heading: 'Por qué las carpetas por tipo de archivo dejan de escalar',
        paragraphs: [
          'Cuando un proyecto supera las 15 pantallas, agrupar todo en carpetas genéricas como /components, /hooks y /services genera acoplamiento silencioso. Un cambio en un módulo termina afectando tres dominios distintos.',
          'En COMCApps adoptamos una arquitectura orientada a features: cada capacidad del negocio vive encapsulada en src/features/<dominio>, mientras que src/shared contiene exclusivamente infraestructura transversal.',
        ],
      },
      {
        id: 'reglas-automaticas',
        heading: 'Hacer cumplir las fronteras con ESLint',
        paragraphs: [
          'La disciplina arquitectónica no debe depender únicamente de revisiones manuales. Configuramos reglas de no-restricted-imports en ESLint para garantizar que la capa shared jamás importe de features y que los servicios permanezcan independientes de React.',
        ],
        codeSnippet: {
          lang: 'ts',
          code: `{
  files: ['src/shared/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['@/features/**', '@/app/**'],
        message: 'Shared no debe depender de features ni app.'
      }]
    }]
  }
}`,
        },
        callout:
          'Tip COMCApps: combina TypeScript estricto (verbatimModuleSyntax + noUnusedLocals) con lazy loading por ruta para mantener el bundle inicial por debajo de los 90 KB comprimidos.',
      },
      {
        id: 'resultados',
        heading: 'Impacto en la velocidad del equipo',
        paragraphs: [
          'Los nuevos ingenieros se integran en días porque cada módulo es predecible: rutas, datos, esquemas Zod, componentes y páginas siguen exactamente la misma convención en todo el repositorio.',
        ],
      },
    ],
  },
  {
    slug: 'notificaciones-push-resilientes-flutter-dotnet',
    title: 'Notificaciones push confiables con Flutter, Firebase Messaging y .NET 10',
    excerpt:
      'Patrones probados en producción para sincronizar tokens FCM, gestionar permisos en Android 13+ e iOS y evitar notificaciones perdidas.',
    category: 'Móvil',
    publishedAt: '04 Nov 2026',
    readTime: '7 min de lectura',
    author: {
      name: 'Andrés Gutiérrez',
      role: 'Lead Mobile Engineer',
      initials: 'AG',
    },
    gradient: 'from-emerald-600 to-teal-800',
    tags: ['Flutter', 'FCM', '.NET 10', 'Mobile'],
    sections: [
      {
        id: 'ciclo-token',
        heading: 'El ciclo de vida real de un token FCM',
        paragraphs: [
          'Uno de los errores más frecuentes en apps móviles es registrar el token FCM solo en el login inicial. Los tokens rotan al reinstalar la app, restaurar backups o tras períodos largos de inactividad.',
          'La solución robusta consiste en exponer un endpoint idempotente de refresh-token que acepte tanto el token previo como el nuevo, reasignando el dispositivo al usuario autenticado y limpiando registros obsoletos.',
        ],
      },
      {
        id: 'control-usuario',
        heading: 'Dar control explícito desde el perfil',
        paragraphs: [
          'Permitir que el usuario active o desactive las notificaciones desde su perfil —sincronizado con los permisos nativos del sistema operativo y el desregistro en backend— mejora la confianza y evita desinstalaciones.',
        ],
        callout:
          'Recuerda escuchar AppLifecycleState.resumed para reflejar inmediatamente si el usuario activó los permisos desde los ajustes del teléfono.',
      },
    ],
  },
  {
    slug: 'ocr-inteligente-documentos-ia-produccion',
    title: 'Cómo llevar OCR y extracción documental con IA a producción sin sorpresas',
    excerpt:
      'Lecciones aprendidas construyendo pipelines híbridos de recorte interactivo, visión computacional y validación humana asistida.',
    category: 'Inteligencia Artificial',
    publishedAt: '26 Oct 2026',
    readTime: '5 min de lectura',
    author: {
      name: 'Cristian Oporta',
      role: 'Founder & Lead Architect',
      initials: 'CO',
    },
    gradient: 'from-purple-600 to-rose-700',
    tags: ['IA', 'OCR', 'Visión Computacional', 'UX'],
    sections: [
      {
        id: 'calidad-imagen',
        heading: 'El 70% de la precisión ocurre antes de llamar al modelo',
        paragraphs: [
          'Enviar fotografías con sombras, perspectiva inclinada o baja iluminación encarece los tokens y dispara errores de lectura. Incluir un paso ligero de recorte y mejora de contraste en el cliente eleva drásticamente la tasa de acierto.',
        ],
      },
      {
        id: 'human-in-the-loop',
        heading: 'Diseño Human-in-the-Loop para datos críticos',
        paragraphs: [
          'En sectores regulados como el legal o financiero, la IA debe acelerar en un 90% la captura, pero siempre presentando un formulario limpio donde el profesional valida y confirma los campos antes de persistirlos.',
        ],
        callout:
          'Valida cada respuesta del modelo con esquemas estrictos (JSON Schema / Zod) para evitar datos malformados en tu base de datos.',
      },
    ],
  },
  {
    slug: 'diseno-multi-tenant-seguro-saas',
    title: 'Guía práctica para diseñar sistemas SaaS Multi-Tenant seguros desde el día uno',
    excerpt:
      'Aislamiento de datos, filtros globales en ORM, control de roles granulares y cómo evitar filtraciones entre clientes corporativos.',
    category: 'Arquitectura',
    publishedAt: '15 Oct 2026',
    readTime: '8 min de lectura',
    author: {
      name: 'Diego Castillo',
      role: 'Senior Backend & Cloud Engineer',
      initials: 'DC',
    },
    gradient: 'from-sky-600 to-blue-800',
    tags: ['SaaS', 'Multi-Tenant', 'Seguridad', 'PostgreSQL'],
    sections: [
      {
        id: 'estrategias-aislamiento',
        heading: 'Base de datos compartida vs. esquemas dedicados',
        paragraphs: [
          'Para la mayoría de productos SaaS B2B, una base de datos compartida con columna TenantId indexada y Query Filters globales ofrece el mejor equilibrio entre costo operativo, migraciones simples y seguridad.',
        ],
      },
      {
        id: 'defensa-en-profundidad',
        heading: 'Defensa en profundidad en cada petición',
        paragraphs: [
          'El identificador de empresa nunca debe confiarse únicamente al payload del cliente: debe derivarse del token JWT firmado y validarse en middleware antes de ejecutar cualquier regla de negocio.',
        ],
      },
    ],
  },
  {
    slug: 'pipelines-cicd-cero-tiempo-inactividad-docker',
    title: 'Despliegues sin tiempo de inactividad con Docker, GitHub Actions y healthchecks',
    excerpt:
      'Cómo automatizamos pruebas, builds determinísticos y despliegues seguros para liberar nuevas versiones varias veces por semana sin interrumpir usuarios.',
    category: 'DevOps',
    publishedAt: '02 Oct 2026',
    readTime: '5 min de lectura',
    author: {
      name: 'Diego Castillo',
      role: 'Senior Backend & Cloud Engineer',
      initials: 'DC',
    },
    gradient: 'from-zinc-700 to-zinc-950',
    tags: ['Docker', 'CI/CD', 'DevOps', 'Cloud'],
    sections: [
      {
        id: 'builds-reproducibles',
        heading: 'Builds reproducibles y verificación automática',
        paragraphs: [
          'Cada pull request ejecuta lint, verificación de tipos estricta, pruebas unitarias y build de producción. Si algo falla en el pipeline, nunca llega a producción.',
        ],
      },
      {
        id: 'healthchecks',
        heading: 'Healthchecks y rollback en segundos',
        paragraphs: [
          'Al combinar imágenes inmutables versionadas por commit SHA con endpoints /health que verifican base de datos y caché, cualquier despliegue anómalo se detiene antes de recibir tráfico real.',
        ],
      },
    ],
  },
];
