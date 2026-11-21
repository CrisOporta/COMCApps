export interface ServiceItem {
  id: string;
  slug: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  accent?: boolean;
  deliverables: string[];
  technologies: string[];
  timeline: string;
  idealFor: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-saas',
    slug: 'desarrollo-web-saas',
    icon: 'web',
    title: 'Plataformas Web y SaaS',
    shortDesc:
      'Aplicaciones web de alto rendimiento, portales corporativos y plataformas multi-tenant listas para escalar a miles de usuarios.',
    fullDesc:
      'Construimos aplicaciones web modernas con arquitecturas limpias, experiencia ultra rápida y diseño adaptable. Desde MVPs ágiles hasta sistemas SaaS multi-empresa con facturación, roles granulares y analítica en tiempo real.',
    accent: true,
    deliverables: [
      'Arquitectura Frontend en React 19 + TypeScript + Tailwind',
      'Paneles administrativos y dashboards interactivos',
      'Control de acceso multi-tenant, roles y permisos',
      'Optimización SEO técnico, accesibilidad y Core Web Vitals',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'PostgreSQL'],
    timeline: '4 – 12 semanas',
    idealFor: 'Startups, plataformas B2B y empresas digitalizando su operación central.',
  },
  {
    id: 'mobile-apps',
    slug: 'aplicaciones-moviles',
    icon: 'smartphone',
    title: 'Aplicaciones Móviles (iOS & Android)',
    shortDesc:
      'Apps nativas y multiplataforma fluidas con notificaciones push, biometría, mapas, pagos in-app y sincronización offline.',
    fullDesc:
      'Diseñamos y publicamos aplicaciones móviles de grado comercial para App Store y Google Play. Priorizamos la fluidez a 60/120 fps, seguridad en el dispositivo y una integración impecable con tu backend.',
    deliverables: [
      'Desarrollo multiplataforma en Flutter o React Native',
      'Notificaciones push (FCM / APNs) y tiempo real (SignalR / WebSockets)',
      'Pagos integrados, suscripciones (RevenueCat / Stripe) y biometría',
      'Publicación completa y mantenimiento en Google Play y App Store',
    ],
    technologies: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase', 'RevenueCat'],
    timeline: '6 – 14 semanas',
    idealFor: 'Productos orientados a consumidores, fuerzas de ventas y ecosistemas SaaS.',
  },
  {
    id: 'backend-cloud',
    slug: 'arquitectura-backend-cloud',
    icon: 'cloud_done',
    title: 'APIs, Backend y Arquitectura Cloud',
    shortDesc:
      'Microservicios, APIs REST/GraphQL de alta disponibilidad, bases de datos resilientes y despliegue automatizado CI/CD.',
    fullDesc:
      'Diseñamos el núcleo tecnológico que sostiene tu negocio: APIs versionadas, seguras y observables, preparadas para picos de tráfico sin caídas y con costos cloud optimizados.',
    deliverables: [
      'APIs empresariales en .NET, Node.js o Python con documentación OpenAPI',
      'Seguridad avanzada: JWT con rotación, OAuth2, rate limiting y auditoría',
      'Infraestructura como código, Docker, Kubernetes y pipelines CI/CD',
      'Monitoreo, backups automatizados y recuperación ante desastres',
    ],
    technologies: ['.NET 10', 'C#', 'Node.js', 'Docker', 'AWS / Azure', 'Redis'],
    timeline: '3 – 10 semanas',
    idealFor: 'Empresas que necesitan modernizar sistemas legacy o escalar infraestructura.',
  },
  {
    id: 'ai-automation',
    slug: 'inteligencia-artificial-automatizacion',
    icon: 'auto_awesome',
    title: 'Inteligencia Artificial y Automatización',
    shortDesc:
      'Asistentes inteligentes, procesamiento OCR de documentos, generación automatizada y flujos predictivos integrados a tu operación.',
    fullDesc:
      'Llevamos la IA de la teoría a producción con retorno de inversión medible: extracción inteligente de documentos, asistentes con contexto empresarial (RAG) y automatización de procesos repetitivos.',
    accent: true,
    deliverables: [
      'Agentes conversacionales y búsqueda semántica sobre documentos (RAG)',
      'Extracción automática de datos con Visión Computacional y OCR',
      'Generación inteligente de reportes, contratos y documentos',
      'Integración segura con OpenAI, Gemini y modelos locales',
    ],
    technologies: ['Python', 'OpenAI API', 'Gemini API', 'LangChain', 'OCR Vision', 'Vector DB'],
    timeline: '3 – 8 semanas',
    idealFor: 'Despachos, fintechs, logística y operaciones con alto volumen documental.',
  },
  {
    id: 'ui-ux-design',
    slug: 'diseno-ui-ux-sistemas',
    icon: 'palette',
    title: 'Diseño UI/UX y Design Systems',
    shortDesc:
      'Interfaces claras, elegantes y centradas en la conversión. Prototipos interactivos y bibliotecas de componentes reutilizables.',
    fullDesc:
      'Cada píxel tiene propósito. Investigamos a tus usuarios, diseñamos flujos sin fricción y entregamos Design Systems documentados con soporte nativo para modo claro y oscuro.',
    deliverables: [
      'Investigación UX, arquitectura de información y user flows',
      'Prototipos interactivos en alta fidelidad listos para validar',
      'Design Systems escalables en Figma + tokens listos para código',
      'Auditorías de usabilidad y rediseño de productos existentes',
    ],
    technologies: ['Figma', 'Design Tokens', 'Prototyping', 'WCAG AA', 'Tailwind CSS'],
    timeline: '2 – 6 semanas',
    idealFor: 'Equipos que buscan elevar la percepción visual y retención de su producto.',
  },
  {
    id: 'devops-support',
    slug: 'consultoria-soporte-evolutivo',
    icon: 'verified_user',
    title: 'Consultoría Técnica y Equipo Dedicado',
    shortDesc:
      'Auditorías de código, rescate de proyectos, optimización de rendimiento y squads dedicados que se integran a tu equipo.',
    fullDesc:
      'Te acompañamos más allá del lanzamiento. Proveemos células ágiles de ingeniería para evolucionar tu producto de manera continua, resolver cuellos de botella y garantizar estabilidad 24/7.',
    deliverables: [
      'Auditoría de arquitectura, seguridad y deuda técnica',
      'Squads dedicados (Full-Stack, Mobile, QA y Tech Lead)',
      'SLAs de soporte productivo, monitoreo y respuesta rápida',
      'Capacitación técnica y transferencia de conocimiento',
    ],
    technologies: ['Scrum / Kanban', 'GitHub Actions', 'Playwright', 'Sentry', 'Grafana'],
    timeline: 'Continuo / Retainer mensual',
    idealFor: 'Empresas en crecimiento que necesitan capacidad de ingeniería confiable.',
  },
];

export const TECH_STACK = [
  { name: 'React 19', category: 'Frontend' },
  { name: 'TypeScript', category: 'Lenguaje' },
  { name: 'Flutter', category: 'Móvil' },
  { name: '.NET 10', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python & IA', category: 'AI / Data' },
  { name: 'Tailwind CSS', category: 'UI System' },
  { name: 'PostgreSQL', category: 'Base de datos' },
  { name: 'SQL Server', category: 'Base de datos' },
  { name: 'Docker', category: 'Cloud' },
  { name: 'AWS & Azure', category: 'Infraestructura' },
  { name: 'Firebase', category: 'Móvil / Push' },
  { name: 'SignalR', category: 'Tiempo real' },
  { name: 'Figma', category: 'Diseño UI/UX' },
] as const;

export const WORK_PROCESS = [
  {
    step: '01',
    icon: 'explore',
    title: 'Descubrimiento y Estrategia',
    desc: 'Entendemos tu modelo de negocio, mapeamos usuarios clave y definimos un roadmap claro con entregables, arquitectura y métricas de éxito.',
  },
  {
    step: '02',
    icon: 'draw',
    title: 'Diseño UI/UX y Prototipado',
    desc: 'Creamos wireframes y prototipos navegables en alta fidelidad para validar cada flujo antes de escribir una sola línea de código productivo.',
  },
  {
    step: '03',
    icon: 'terminal',
    title: 'Ingeniería en Sprints Ágiles',
    desc: 'Desarrollamos en iteraciones semanales con demos reales, pruebas automatizadas, revisión de código y visibilidad constante del progreso.',
  },
  {
    step: '04',
    icon: 'rocket_launch',
    title: 'Lanzamiento y Evolución',
    desc: 'Desplegamos en producción con monitoreo, CI/CD, tiendas móviles configuradas y acompañamiento continuo para escalar nuevas funciones.',
  },
] as const;

export interface EstimatorOption {
  id: string;
  label: string;
  desc: string;
  baseWeeks: number;
  baseUsd: number;
}

export const ESTIMATOR_PROJECT_TYPES: EstimatorOption[] = [
  {
    id: 'web-saas',
    label: 'Plataforma Web / SaaS',
    desc: 'Dashboard, roles, API y base de datos en la nube',
    baseWeeks: 6,
    baseUsd: 4500,
  },
  {
    id: 'mobile-app',
    label: 'App Móvil (iOS + Android)',
    desc: 'App nativa multiplataforma lista para tiendas',
    baseWeeks: 8,
    baseUsd: 6000,
  },
  {
    id: 'ecosystem',
    label: 'Ecosistema Completo (Web + App)',
    desc: 'Panel web, aplicación móvil y backend unificado',
    baseWeeks: 12,
    baseUsd: 9500,
  },
  {
    id: 'ai-solution',
    label: 'Solución con IA / Automatización',
    desc: 'OCR, asistentes inteligentes o automatización documental',
    baseWeeks: 5,
    baseUsd: 3800,
  },
];

export const ESTIMATOR_ADDONS = [
  { id: 'uiux', label: 'Diseño UI/UX & Design System completo', weeks: 2, usd: 1200 },
  { id: 'payments', label: 'Pasarela de pagos / Suscripciones', weeks: 1, usd: 900 },
  { id: 'ai', label: 'Módulo de Inteligencia Artificial / OCR', weeks: 2, usd: 1800 },
  { id: 'realtime', label: 'Chat / Notificaciones push en tiempo real', weeks: 2, usd: 1400 },
  { id: 'multitenant', label: 'Arquitectura Multi-sucursal / Multi-tenant', weeks: 2, usd: 1600 },
  { id: 'analytics', label: 'Reportes avanzados y exportación PDF/Excel', weeks: 1, usd: 800 },
] as const;
