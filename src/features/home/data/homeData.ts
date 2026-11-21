export const WHY_COMCAPPS = [
  {
    icon: 'architecture',
    title: 'Arquitectura pensada para escalar',
    desc: 'No improvisamos parches. Diseñamos bases sólidas con tecnologías probadas para que tu producto crezca sin reescrituras costosas.',
    items: [
      'Código limpio con TypeScript y C# / Dart estricto',
      'APIs versionadas y listas para integraciones externas',
      'Soporte multi-tenant, roles granulares y auditoría',
      'Pruebas automatizadas y despliegues CI/CD',
    ],
  },
  {
    icon: 'design_services',
    title: 'Diseño que enamora y convierte',
    desc: 'Cada pantalla sigue principios de claridad visual, contraste impecable, modo claro/oscuro nativo y velocidad instantánea.',
    items: [
      'Design Systems consistentes entre web y móvil',
      'Micro-interacciones fluidas y accesibilidad real',
      'Experiencia responsive perfecta en cualquier pantalla',
      'Prototipos interactivos validados antes de programar',
    ],
  },
  {
    icon: 'speed',
    title: 'Entregas semanales con visibilidad total',
    desc: 'Olvídate de las cajas negras donde pagas meses sin ver avances. Trabajamos en sprints cortos con demos funcionales cada semana.',
    items: [
      'Entorno de pruebas (staging) actualizado continuamente',
      'Comunicación directa con arquitectos y líderes técnicos',
      'Estimaciones transparentes sin costos ocultos',
      'Documentación clara y propiedad 100% de tu código',
    ],
  },
  {
    icon: 'security',
    title: 'Seguridad y soporte post-lanzamiento',
    desc: 'Protegemos los datos de tu empresa con estándares modernos y te acompañamos cuando tu producto ya está generando valor.',
    items: [
      'Autenticación robusta (JWT con rotación, OAuth2)',
      'Backups automáticos y monitoreo de disponibilidad',
      'Publicación asistida en Google Play y App Store',
      'Planes de mantenimiento evolutivo y nuevas funciones',
    ],
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'COMCApps transformó nuestra operación manual en una plataforma web y móvil impecable. Redujimos el tiempo de preparación documental en más de un 75% desde el primer mes.',
    author: 'Lic. Roberto Morales',
    role: 'Socio Director · Bufete Legal & Notarial',
    initials: 'RM',
  },
  {
    quote:
      'Su nivel de ingeniería y diseño está a otro nivel. Nos entregaron un sistema multi-sucursal con app móvil que nuestros cajeros aprendieron a usar en 15 minutos.',
    author: 'Andrea Solís',
    role: 'Gerente General · Red Fitness Centroamérica',
    initials: 'AS',
  },
  {
    quote:
      'Más que proveedores, se sintieron parte de nuestro equipo. La transparencia en cada sprint y la estabilidad de la infraestructura nos permitió triplicar clientes sin fricción.',
    author: 'Carlos Espinoza',
    role: 'CTO · Distribuidora Comercial B2B',
    initials: 'CE',
  },
] as const;

export const HOME_FAQ = [
  {
    q: '¿Cuánto tiempo toma desarrollar un proyecto con COMCApps?',
    a: 'Depende del alcance: un MVP web o solución con IA suele lanzarse entre 4 y 6 semanas; una aplicación móvil completa o ecosistema SaaS entre 8 y 14 semanas. Desde la semana 2 ya ves avances navegables en un entorno de pruebas.',
  },
  {
    q: '¿El código fuente y la propiedad intelectual son 100% míos?',
    a: 'Sí, absolutamente. Al completar el proyecto todo el repositorio, infraestructura, diseños en Figma y documentación pertenecen íntegramente a tu empresa sin licencias ocultas ni ataduras.',
  },
  {
    q: '¿Trabajan solo con empresas grandes o también con startups y PYMEs?',
    a: 'Trabajamos con ambos. Nos adaptamos a startups que necesitan validar rápido un MVP impecable y a empresas consolidadas que buscan modernizar sistemas internos o lanzar nuevas líneas digitales.',
  },
  {
    q: '¿Qué pasa después de lanzar el software a producción?',
    a: 'Ofrecemos garantía técnica post-lanzamiento y planes opcionales de acompañamiento evolutivo que incluyen monitoreo 24/7, actualizaciones de seguridad, soporte para iOS/Android y desarrollo continuo de nuevas funcionalidades.',
  },
  {
    q: '¿Pueden integrarse con sistemas que ya utilizamos (ERP, pagos, WhatsApp, IA)?',
    a: 'Sí. Diseñamos APIs e integraciones a medida con pasarelas de pago, Stripe, RevenueCat, AWS S3, Firebase, OpenAI/Gemini, facturación electrónica y sistemas legacy existentes.',
  },
] as const;
