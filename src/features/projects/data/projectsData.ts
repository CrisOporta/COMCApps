export type ProjectCategory = 'Web & SaaS' | 'Apps Móviles' | 'IA & Datos' | 'Cloud & APIs';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  client: string;
  year: string;
  featured?: boolean;
  status: 'En producción' | 'Caso de éxito' | 'Escala activa';
  gradient: string;
  icon: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: ProjectMetric[];
  stack: string[];
  deliverables: string[];
}

export const PROJECT_CATEGORIES: Array<'Todos' | ProjectCategory> = [
  'Todos',
  'Web & SaaS',
  'Apps Móviles',
  'IA & Datos',
  'Cloud & APIs',
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'lexcloud-suite-notarial',
    title: 'LexCloud Suite Notarial',
    tagline: 'Plataforma integral web y móvil con IA para gestión notarial y protocolos digitales.',
    category: 'IA & Datos',
    client: 'Sector Legal & Notarial',
    year: '2026',
    featured: true,
    status: 'En producción',
    gradient: 'from-violet-600 via-indigo-600 to-slate-900',
    icon: 'gavel',
    summary:
      'Ecosistema digital completo que automatiza la lectura de documentos de identidad mediante OCR con IA, redacción asistida de instrumentos públicos, agenda de citas y mensajería segura en tiempo real.',
    challenge:
      'Los despachos jurídicos invertían horas redactando manualmente generales de ley, transcribiendo datos de cédulas y administrando protocolos en archivos dispersos propensos a errores.',
    solution:
      'Arquitectamos una plataforma multiplataforma (Web React 19 + App Flutter + API .NET 10) con visión computacional para extracción de cédulas, generador documental en papel sellado y notificaciones push en tiempo real.',
    results: [
      'Reducción del 78% en el tiempo de preparación de instrumentos notariales.',
      'Sincronización instantánea entre panel web y aplicación móvil iOS/Android.',
      'Bóveda documental encriptada con respaldo automático en S3.',
    ],
    metrics: [
      { label: 'Más rápido', value: '4.5x' },
      { label: 'Precisión OCR', value: '99.2%' },
      { label: 'Disponibilidad', value: '99.98%' },
    ],
    stack: ['React 19', 'Flutter', '.NET 10', 'PostgreSQL', 'OpenAI Vision', 'SignalR', 'AWS S3'],
    deliverables: ['Aplicación Web SaaS', 'App Móvil iOS & Android', 'Motor OCR con IA', 'API REST Versionada'],
  },
  {
    slug: 'fitcore-erp-multi-sucursal',
    title: 'FitCore POS & ERP',
    tagline: 'Sistema multi-tenant de punto de venta, membresías y tesorería para cadenas de gimnasios.',
    category: 'Apps Móviles',
    client: 'Cadena Fitness Regional',
    year: '2026',
    featured: true,
    status: 'Escala activa',
    gradient: 'from-emerald-600 via-teal-700 to-zinc-900',
    icon: 'fitness_center',
    summary:
      'Plataforma omnicanal para gestionar múltiples sucursales desde un solo panel: cobros con tickets térmicos, control de turnos de caja, inventario, conciliación bancaria y app móvil para administración.',
    challenge:
      'Los propietarios carecían de visibilidad en tiempo real sobre las ventas, vencimientos de membresías y cierres de caja entre distintas sucursales.',
    solution:
      'Desarrollamos un backend multi-tenant con roles granulares (Owner, Cashier, Trainer), app móvil Flutter con alertas push de vencimiento y un panel web con reportes financieros exportables en PDF.',
    results: [
      'Cero descuadres de caja gracias al flujo guiado de apertura y cierre por turno.',
      'Aumento del 34% en renovación puntual de membresías por recordatorios push.',
      'Control centralizado de más de 15 sucursales sin duplicar infraestructura.',
    ],
    metrics: [
      { label: 'Renovaciones', value: '+34%' },
      { label: 'Tiempo de cobro', value: '< 8s' },
      { label: 'Sucursales activas', value: '15+' },
    ],
    stack: ['Flutter', 'React', 'TypeScript', '.NET', 'SQL Server', 'Firebase FCM'],
    deliverables: ['App Móvil Administrativa', 'POS Web & Tickets Térmicos', 'Tesorería y Reportes PDF'],
  },
  {
    slug: 'comercioflow-omnicanal',
    title: 'ComercioFlow Omnicanal',
    tagline: 'ERP comercial modular con facturación electrónica, inventario inteligente y analítica.',
    category: 'Web & SaaS',
    client: 'Distribuidoras y Retail B2B',
    year: '2025',
    featured: true,
    status: 'Caso de éxito',
    gradient: 'from-blue-600 via-violet-700 to-zinc-900',
    icon: 'storefront',
    summary:
      'Suite ERP en la nube orientada a PYMEs en expansión: compras, bodegas, Kardex en tiempo real, cuentas por cobrar/pagar y dashboards ejecutivos con alertas predictivas de reposición.',
    challenge:
      'Hojas de cálculo desconectadas generaban quiebres de stock frecuentes y demoras de días para cerrar los reportes mensuales de ventas.',
    solution:
      'Creamos una aplicación web ultrarrápida con tablas virtualizadas, búsqueda global instantánea, permisos por módulo y generación automática de estados financieros.',
    results: [
      'Visibilidad consolidada de inventario en 8 bodegas en tiempo real.',
      'Reducción del 60% en quiebres de stock de productos de alta rotación.',
      'Cierres contables mensuales completados en horas en lugar de días.',
    ],
    metrics: [
      { label: 'Quiebres de stock', value: '-60%' },
      { label: 'Velocidad reportes', value: '10x' },
      { label: 'Usuarios concurrentes', value: '500+' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', '.NET Core', 'PostgreSQL', 'Redis'],
    deliverables: ['ERP Web Modular', 'Sistema de Facturación', 'Analítica Ejecutiva'],
  },
  {
    slug: 'edupulse-campus-digital',
    title: 'EduPulse Campus Digital',
    tagline: 'Portal académico para gestión docente, calificaciones, asistencia y comunicación familiar.',
    category: 'Web & SaaS',
    client: 'Instituciones Educativas',
    year: '2025',
    status: 'En producción',
    gradient: 'from-amber-600 via-orange-700 to-zinc-900',
    icon: 'school',
    summary:
      'Plataforma académica que unifica planificación docente, registro de asistencia, boletines digitales, control de aranceles y mensajería directa con estudiantes y padres.',
    challenge:
      'El proceso de consolidación de notas y emisión de boletines tomaba semanas y generaba cuellos de botella en dirección académica.',
    solution:
      'Implementamos un portal intuitivo con importación masiva, generación automática de constancias PDF y roles específicos para rectores, docentes y familias.',
    results: [
      'Emisión instantánea de más de 4,000 boletines académicos por ciclo.',
      'Adopción del 96% por parte del personal docente en el primer mes.',
      'Reducción drástica de llamadas administrativas por consultas de estado.',
    ],
    metrics: [
      { label: 'Estudiantes', value: '4,200+' },
      { label: 'Adopción docente', value: '96%' },
      { label: 'Ahorro operativo', value: '18h/sem' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    deliverables: ['Portal Docente', 'Portal Familiar', 'Motor de Boletines PDF'],
  },
  {
    slug: 'finbridge-api-gateway',
    title: 'FinBridge Payment Hub',
    tagline: 'Infraestructura de APIs y conciliación bancaria de alta disponibilidad para fintech.',
    category: 'Cloud & APIs',
    client: 'Servicios Financieros',
    year: '2025',
    status: 'Escala activa',
    gradient: 'from-cyan-600 via-sky-700 to-zinc-900',
    icon: 'hub',
    summary:
      'Gateway unificado de pagos, webhooks idempotentes y motor de conciliación automatizada capaz de procesar miles de transacciones por minuto con trazabilidad total.',
    challenge:
      'Integrar múltiples procesadores de pago con reglas dispares provocaba reintentos duplicados y conciliaciones manuales propensas a error.',
    solution:
      'Diseñamos una arquitectura orientada a eventos con colas resilientes, idempotencia estricta, firma criptográfica de webhooks y alertas en Grafana.',
    results: [
      'Cero cobros duplicados bajo picos de alta concurrencia.',
      'Latencia promedio de respuesta inferior a 65 ms en endpoints críticos.',
      'Auditoría completa en tiempo real de cada evento financiero.',
    ],
    metrics: [
      { label: 'Latencia P95', value: '62 ms' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Tx / mes', value: '1.2M+' },
    ],
    stack: ['.NET', 'Redis', 'RabbitMQ', 'PostgreSQL', 'Docker', 'AWS ECS'],
    deliverables: ['API Gateway', 'Motor de Webhooks', 'Observabilidad y Alertas'],
  },
  {
    slug: 'rutaexpress-logistica-mobile',
    title: 'RutaExpress Field App',
    tagline: 'App móvil con geolocalización en vivo, prueba de entrega digital y despacho inteligente.',
    category: 'Apps Móviles',
    client: 'Logística & Última Milla',
    year: '2026',
    status: 'En producción',
    gradient: 'from-rose-600 via-purple-700 to-zinc-900',
    icon: 'local_shipping',
    summary:
      'Aplicación móvil para repartidores con captura de firma en pantalla, fotografía verificada, trazado de rutas en mapa interactivo y notificación automática al cliente final.',
    challenge:
      'Falta de trazabilidad en entregas de última milla y alto porcentaje de envíos fallidos por direcciones imprecisas.',
    solution:
      'Construimos una app móvil ligera con mapas Leaflet/OpenStreetMap, captura offline de comprobantes y tablero central de monitoreo en tiempo real.',
    results: [
      'Incremento del 29% en entregas exitosas en el primer intento.',
      'Reducción del 45% en reclamos de soporte gracias al enlace de rastreo.',
      'Funcionamiento confiable incluso en zonas con conectividad intermitente.',
    ],
    metrics: [
      { label: 'Entregas 1er intento', value: '+29%' },
      { label: 'Reclamos soporte', value: '-45%' },
      { label: 'Rutas diarias', value: '320+' },
    ],
    stack: ['Flutter', 'Leaflet', '.NET API', 'SignalR', 'PostgreSQL'],
    deliverables: ['App de Repartidores', 'Torre de Control Web', 'Enlace de Rastreo Público'],
  },
];
