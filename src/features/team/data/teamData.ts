export type TeamDepartment =
  | 'Dirección'
  | 'Ingeniería'
  | 'Diseño UI/UX'
  | 'Cloud & DevOps'
  | 'QA & Producto';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  initials: string;
  avatarGradient: string;
  bio: string;
  specialty: string;
  experience: string;
  skills: string[];
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const TEAM_DEPARTMENTS: Array<'Todos' | TeamDepartment> = [
  'Todos',
  'Dirección',
  'Ingeniería',
  'Diseño UI/UX',
  'Cloud & DevOps',
  'QA & Producto',
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'cristian-oporta',
    name: 'Cristian Oporta',
    role: 'Founder & Lead Software Architect',
    department: 'Dirección',
    initials: 'CO',
    avatarGradient: 'from-violet-600 to-indigo-700',
    bio: 'Apasionado por diseñar ecosistemas digitales escalables que resuelven problemas reales. Lidera la visión tecnológica, arquitectura de sistemas y calidad de ingeniería en COMCApps.',
    specialty: 'Arquitectura Full-Stack, SaaS Multi-Tenant y Estrategia de Producto',
    experience: '8+ años',
    skills: ['.NET', 'React', 'Flutter', 'TypeScript', 'Cloud Architecture', 'IA Aplicada'],
    links: {
      github: 'https://github.com/comcapps',
      linkedin: 'https://linkedin.com/company/comcapps',
      email: 'cristian@comcapps.com',
    },
  },
  {
    id: 'valeria-mendoza',
    name: 'Valeria Mendoza',
    role: 'Head of Product Design (UI/UX)',
    department: 'Diseño UI/UX',
    initials: 'VM',
    avatarGradient: 'from-rose-500 to-violet-600',
    bio: 'Especialista en sistemas de diseño y experiencias limpias orientadas a productos B2B y apps móviles. Transforma flujos complejos en interfaces claras e intuitivas.',
    specialty: 'Design Systems, Investigación UX y Prototipado de Alta Fidelidad',
    experience: '6+ años',
    skills: ['Figma', 'Design Systems', 'UX Research', 'Accesibilidad WCAG', 'Tailwind'],
    links: {
      linkedin: 'https://linkedin.com/company/comcapps',
      email: 'valeria@comcapps.com',
    },
  },
  {
    id: 'diego-castillo',
    name: 'Diego Castillo',
    role: 'Senior Backend & Cloud Engineer',
    department: 'Cloud & DevOps',
    initials: 'DC',
    avatarGradient: 'from-sky-600 to-indigo-700',
    bio: 'Experto en APIs de alto rendimiento, bases de datos relacionales y despliegue automatizado en contenedores. Garantiza seguridad, observabilidad y 99.9% de disponibilidad.',
    specialty: 'Microservicios, Seguridad API, Docker y Pipelines CI/CD',
    experience: '7+ años',
    skills: ['C# / .NET', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'GitHub Actions'],
    links: {
      github: 'https://github.com/comcapps',
      linkedin: 'https://linkedin.com/company/comcapps',
    },
  },
  {
    id: 'sofia-ramirez',
    name: 'Sofía Ramírez',
    role: 'Senior Frontend Engineer',
    department: 'Ingeniería',
    initials: 'SR',
    avatarGradient: 'from-emerald-500 to-teal-700',
    bio: 'Enfocada en arquitectura frontend moderna, rendimiento extremo y micro-interacciones fluidas. Construye interfaces reactivas accesibles y mantenibles a largo plazo.',
    specialty: 'React 19, TypeScript Estricto y Performance Web',
    experience: '5+ años',
    skills: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Tailwind CSS', 'Playwright'],
    links: {
      github: 'https://github.com/comcapps',
      linkedin: 'https://linkedin.com/company/comcapps',
    },
  },
  {
    id: 'andres-gutierrez',
    name: 'Andrés Gutiérrez',
    role: 'Lead Mobile Engineer',
    department: 'Ingeniería',
    initials: 'AG',
    avatarGradient: 'from-amber-500 to-orange-600',
    bio: 'Construye aplicaciones móviles multiplataforma con sensación nativa, manejo de estado reactivo, notificaciones push y publicación certificada en App Store y Google Play.',
    specialty: 'Flutter, Riverpod, Integraciones Nativas y Publicación Móvil',
    experience: '5+ años',
    skills: ['Flutter', 'Dart', 'Firebase', 'RevenueCat', 'Android / iOS', 'SignalR'],
    links: {
      github: 'https://github.com/comcapps',
      linkedin: 'https://linkedin.com/company/comcapps',
    },
  },
  {
    id: 'camila-navarro',
    name: 'Camila Navarro',
    role: 'QA Automation & Product Manager',
    department: 'QA & Producto',
    initials: 'CN',
    avatarGradient: 'from-fuchsia-600 to-purple-700',
    bio: 'Asegura que cada sprint entregue valor tangible sin regresiones. Coordina ceremonias ágiles, pruebas end-to-end y comunicación transparente con cada cliente.',
    specialty: 'Gestión Ágil, QA Automatizado y Entrega Continua',
    experience: '6+ años',
    skills: ['Scrum', 'Playwright', 'Postman / OpenAPI', 'Product Discovery', 'Jira'],
    links: {
      linkedin: 'https://linkedin.com/company/comcapps',
      email: 'camila@comcapps.com',
    },
  },
];

export const COMPANY_VALUES = [
  {
    icon: 'precision_manufacturing',
    title: 'Ingeniería sin atajos',
    desc: 'Escribimos código limpio, tipado estricto y arquitecturas desacopladas pensadas para mantenerse y crecer durante años.',
  },
  {
    icon: 'visibility',
    title: 'Transparencia radical',
    desc: 'Acceso a avances reales cada semana, tableros compartidos y comunicación directa con las personas que construyen tu software.',
  },
  {
    icon: 'bolt',
    title: 'Obsesión por el detalle',
    desc: 'Desde el tiempo de respuesta de una consulta SQL hasta una micro-transición de 200ms en pantalla: todo cuenta.',
  },
  {
    icon: 'handshake',
    title: 'Socios de largo plazo',
    desc: 'No entregamos un repositorio y desaparecemos. Medimos nuestro éxito por el impacto real que el software genera en tu negocio.',
  },
] as const;

export const COMPANY_MILESTONES = [
  {
    year: '2021',
    title: 'Nacimiento de COMCApps',
    desc: 'Iniciamos desarrollando soluciones web a medida y consultoría técnica para comercios y profesionales independientes.',
  },
  {
    year: '2023',
    title: 'Expansión a ecosistemas móviles y SaaS',
    desc: 'Consolidamos nuestra práctica de Flutter + .NET + React, lanzando plataformas multi-sucursal en producción.',
  },
  {
    year: '2025',
    title: 'Laboratorio de IA Aplicada',
    desc: 'Incorporamos visión computacional, OCR documental y automatización inteligente en productos legales y empresariales.',
  },
  {
    year: '2026',
    title: 'Escala regional y clientes internacionales',
    desc: 'Más de 45 proyectos entregados con arquitecturas cloud de alta disponibilidad operando en Latinoamérica y EE. UU.',
  },
] as const;

export const OPEN_ROLES = [
  {
    title: 'Senior Full-Stack Engineer (.NET + React)',
    modality: '100% Remoto · Tiempo completo',
    department: 'Ingeniería',
    desc: 'Buscamos a alguien apasionado por TypeScript estricto, arquitecturas limpias y APIs escalables.',
  },
  {
    title: 'Flutter Mobile Developer',
    modality: '100% Remoto · Tiempo completo',
    department: 'Móvil',
    desc: 'Experiencia construyendo apps con Riverpod, notificaciones push, mapas y despliegue a tiendas.',
  },
  {
    title: 'Product Designer (UI/UX)',
    modality: 'Híbrido / Remoto · Tiempo completo',
    department: 'Diseño',
    desc: 'Capacidad para construir Design Systems modernos, prototipos interactivos y productos centrados en el usuario.',
  },
] as const;
