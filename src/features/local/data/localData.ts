export type LocalServiceCategory =
  | 'Soporte & Hardware'
  | 'Software & Web'
  | 'Papelería & Estudio'
  | 'Seguridad & Redes';

export interface LocalServiceItem {
  id: string;
  title: string;
  category: LocalServiceCategory;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  imageAlt: string;
  gallery?: string[];
  icon: string;
  turnaround: string;
  homeServiceAvailable: boolean;
  instantDelivery?: boolean;
  featured?: boolean;
  highlights: string[];
  idealFor: string;
}

export const LOCAL_SERVICE_CATEGORIES: readonly LocalServiceCategory[] = [
  'Soporte & Hardware',
  'Software & Web',
  'Papelería & Estudio',
  'Seguridad & Redes',
] as const;

export const LOCAL_BRANCH = {
  name: 'COMCApps · Centro Tecnológico y Servicios Locales',
  badge: 'Sucursal Física & Atención a Domicilio',
  heroImage:
    'https://images.pexels.com/photos/4705603/pexels-photo-4705603.jpeg?auto=compress&cs=tinysrgb&w=1400',
  addressLine1: 'Centro Comercial / Avenida Principal, Módulo COMCApps',
  addressLine2: 'Managua, Nicaragua (fácil acceso y parqueo disponible)',
  referenceNote: 'Atención presencial sin cita previa y cobertura técnica a domicilio en toda la ciudad.',
  phone: '+505 8800 1234',
  whatsappNumber: '50588001234',
  email: 'local@comcapps.com',
  hours: [
    { days: 'Lunes a Viernes', time: '8:00 AM – 6:00 PM' },
    { days: 'Sábados', time: '8:30 AM – 4:00 PM' },
    { days: 'Domingos', time: 'Emergencias a domicilio con cita previa' },
  ],
  paymentMethods: ['Efectivo', 'Transferencia Bancaria', 'Tarjeta de Crédito / Débito', 'Pago Móvil'],
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Managua,Nicaragua&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Managua+Nicaragua',
} as const;

export const LOCAL_SERVICES: LocalServiceItem[] = [
  {
    id: 'reparacion-computadoras',
    title: 'Reparación y Mantenimiento de Computadoras',
    category: 'Soporte & Hardware',
    shortDesc:
      'Diagnóstico preciso, limpieza interna, cambio de pasta térmica, actualización a SSD/RAM y reparación de laptops y PC de escritorio.',
    fullDesc:
      'Devolvemos la velocidad y estabilidad a tus equipos. Realizamos mantenimiento preventivo y correctivo para laptops y computadoras de escritorio, eliminación de virus, cambio de pantallas, teclados, baterías, fuentes de poder y optimización completa con discos SSD.',
    imageUrl:
      'https://images.pexels.com/photos/7639370/pexels-photo-7639370.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Técnico reparando placa base y componentes internos de una computadora portátil',
    icon: 'computer',
    turnaround: 'Mismo día · 24h',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Limpieza profunda y cambio de pasta térmica',
      'Actualización a disco SSD y ampliación de RAM',
      'Reparación de fallas de encendido, pantalla y bisagras',
      'Respaldo seguro de tus archivos antes de intervenir',
    ],
    idealFor: 'Estudiantes, profesionales, hogares y oficinas con equipos lentos o dañados.',
  },
  {
    id: 'reparacion-impresoras',
    title: 'Reparación de Impresoras',
    category: 'Soporte & Hardware',
    shortDesc:
      'Mantenimiento y reparación de impresoras de tinta continua, inyección, láser y multifuncionales (Epson, Canon, HP, Brother).',
    fullDesc:
      'Solucionamos atascos de papel, cabezales tapados, errores de almohadillas, fallas de escáner, problemas de conectividad Wi-Fi y reemplazo de rodillos o piezas de desgaste para que tu impresora vuelva a imprimir con nitidez profesional.',
    imageUrl:
      'https://images.pexels.com/photos/17235421/pexels-photo-17235421.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Impresora multifuncional moderna en mantenimiento técnico',
    icon: 'print',
    turnaround: '24 – 48 horas',
    homeServiceAvailable: true,
    highlights: [
      'Destape y alineación de cabezales de impresión',
      'Reseteo y cambio de almohadillas en sistemas EcoTank',
      'Limpieza de rodillos, sensores y corrección de atascos',
      'Configuración en red local y Wi-Fi para varios equipos',
    ],
    idealFor: 'Negocios, oficinas contables, colegios y usuarios con impresoras multifuncionales.',
  },
  {
    id: 'sistemas-operativos-activados',
    title: 'Instalación de Sistemas Operativos Activados',
    category: 'Software & Web',
    shortDesc:
      'Formateo limpio e instalación de Windows 11, Windows 10 o Linux completamente activado, con drivers oficiales y programas esenciales.',
    fullDesc:
      'Instalamos tu sistema operativo desde cero sin perder tus documentos importantes. Incluye activación permanente, controladores oficiales de audio/video/red, antivirus, navegadores, compresores y optimización del arranque.',
    imageUrl:
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Computadora portátil configurada con sistema operativo limpio y optimizado',
    icon: 'desktop_windows',
    turnaround: '1 – 2 horas',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Windows 11 / Windows 10 Pro activado y actualizado',
      'Respaldo previo de documentos, fotos y descargas',
      'Instalación completa de drivers oficiales y utilidades',
      'Optimización de rendimiento para equipos nuevos y antiguos',
    ],
    idealFor: 'Equipos lentos, infectados por virus, recién comprados o con errores de sistema.',
  },
  {
    id: 'instalacion-office-activado',
    title: 'Instalación de Office Activado',
    category: 'Software & Web',
    shortDesc:
      'Suite completa de Microsoft Office (Word, Excel, PowerPoint, Outlook, Publisher y Access) instalada y activada lista para trabajar.',
    fullDesc:
      'Dejamos instalada, configurada y activada la versión ideal de Microsoft Office para tu equipo, sin avisos molestos de licencia vencida y lista para tus tareas escolares, universitarias o empresariales.',
    imageUrl:
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Laptop abierta trabajando con hojas de cálculo, gráficos y documentos de Office',
    icon: 'description',
    turnaround: '20 – 30 minutos',
    homeServiceAvailable: true,
    instantDelivery: true,
    highlights: [
      'Word, Excel, PowerPoint y Outlook activados',
      'Compatible con Windows 10, Windows 11 y macOS',
      'Activación estable sin caducidad ni errores de banner',
      'Configuración de idioma español o inglés a elección',
    ],
    idealFor: 'Universitarios, contadores, emprendedores y personal administrativo.',
  },
  {
    id: 'paginas-web-comercios',
    title: 'Creación de Páginas Web para Comercios',
    category: 'Software & Web',
    shortDesc:
      'Sitios web modernos, catálogos en línea y tiendas digitales diseñadas para atraer clientes locales y recibir pedidos por WhatsApp.',
    fullDesc:
      'Construimos la presencia digital de tu negocio con diseño profesional adaptado a celulares, botón directo de WhatsApp, ubicación en Google Maps, catálogo de productos y optimización para aparecer en Google.',
    imageUrl:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Diseño de página web moderna para comercio en computadora portátil',
    icon: 'language',
    turnaround: '5 – 10 días',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Diseño responsive rápido en celular, tablet y PC',
      'Integración directa con WhatsApp y Google Maps',
      'Catálogo de productos/servicios fácil de actualizar',
      'Dominio, correo corporativo y certificado SSL incluidos',
    ],
    idealFor: 'Tiendas, restaurantes, clínicas, ferreterías, hoteles y profesionales independientes.',
  },
  {
    id: 'sistemas-de-negocios',
    title: 'Diferentes Tipos de Sistemas de Negocios',
    category: 'Software & Web',
    shortDesc:
      'Sistemas de facturación e inventario (POS), control de préstamos, gimnasios, bufetes, clínicas y soluciones hechas a tu medida.',
    fullDesc:
      'Implementamos software probado para controlar tus ventas, caja, inventario, clientes, créditos y reportes desde tu computadora o celular. Te instalamos el sistema, configuramos tu impresora térmica y capacitamos a tu personal.',
    imageUrl:
      'https://images.pexels.com/photos/5239804/pexels-photo-5239804.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Punto de venta moderno procesando facturación y control comercial en tienda',
    icon: 'point_of_sale',
    turnaround: 'Instalación en 24 – 72h',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Sistemas POS de Facturación e Inventario (FactuCore)',
      'Sistemas para Financieras y Prestamistas (PrestaCore)',
      'Control de Gimnasios, Clínicas y Bufetes (GymExpress / OptimizaLey)',
      'Instalación presencial, configuración de tickets y capacitación',
    ],
    idealFor: 'Pulperías, farmacias, ferreterías, distribuidoras, prestamistas y pymes.',
  },
  {
    id: 'transcripcion-documentos',
    title: 'Transcripción de Documentos',
    category: 'Papelería & Estudio',
    shortDesc:
      'Digitación profesional, corrección de estilo, formato académico (APA) y maquetación limpia de cartas, currículums, actas y tesis.',
    fullDesc:
      'Convertimos tus documentos manuscritos, escaneados, PDFs o audios en archivos Word o PDF impecables, con ortografía cuidada, tablas ordenadas y formato listo para entregar o imprimir.',
    imageUrl:
      'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Persona digitando y transcribiendo documentos profesionales en teclado',
    icon: 'keyboard',
    turnaround: 'Mismo día · Según volumen',
    homeServiceAvailable: false,
    instantDelivery: true,
    highlights: [
      'Currículums modernos, cartas formales y constancias',
      'Trabajos universitarios, monografías y normas APA',
      'Transcripción de documentos legales, actas y formularios',
      'Entrega en archivo editable Word, PDF e impreso',
    ],
    idealFor: 'Estudiantes, abogados, docentes y personas que necesitan trámites escritos.',
  },
  {
    id: 'impresion-fotocopiado',
    title: 'Impresión y Fotocopiado',
    category: 'Papelería & Estudio',
    shortDesc:
      'Impresiones nítidas en blanco y negro o full color desde USB, correo o WhatsApp, escaneo de alta resolución y fotocopiado al instante.',
    fullDesc:
      'Servicio ágil de impresión en papel bond, opalina, papel fotográfico y cartulina. Envía tus archivos directamente por WhatsApp al llegar a nuestra sucursal y recíbelos impresos en cuestión de minutos.',
    imageUrl:
      'https://images.pexels.com/photos/3791246/pexels-photo-3791246.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Equipo de impresión y fotocopiado rápido en operación',
    icon: 'local_printshop',
    turnaround: 'Al instante (5 min)',
    homeServiceAvailable: false,
    instantDelivery: true,
    highlights: [
      'Impresión láser y tinta HD en blanco/negro y full color',
      'Recepción directa de archivos por WhatsApp, correo o USB',
      'Escaneo a PDF de alta definición y copias ampliadas/reducidas',
      'Descuentos especiales por volumen para tesis y folletos',
    ],
    idealFor: 'Trámites rápidos, estudiantes, oficinas y presentaciones ejecutivas.',
  },
  {
    id: 'foto-tamano-carnet',
    title: 'Foto Tamaño Carnet',
    category: 'Papelería & Estudio',
    shortDesc:
      'Fotografía profesional tamaño carnet, pasaporte o visa con iluminación de estudio, retoque natural y entrega impresa y digital al instante.',
    fullDesc:
      'Toma fotográfica con iluminación uniforme, recorte reglamentario exacto para cédula, pasaporte, visa americana, licencia, currículum o carnet estudiantil, impresa en papel fotográfico brillante de alta durabilidad.',
    imageUrl:
      'https://images.pexels.com/photos/30332804/pexels-photo-30332804.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Estudio fotográfico profesional con iluminación y fondo para fotos tamaño carnet',
    icon: 'photo_camera',
    turnaround: '5 – 10 minutos',
    homeServiceAvailable: false,
    instantDelivery: true,
    highlights: [
      'Medidas oficiales: Carnet, Pasaporte, Visa y Currículum',
      'Fondo blanco, celeste o azul según requisito del trámite',
      'Retoque sutil de iluminación y entrega en papel fotográfico',
      'Incluye versión digital enviada a tu WhatsApp o correo',
    ],
    idealFor: 'Trámites migratorios, licencias, matrículas, empleos y documentos oficiales.',
  },
  {
    id: 'camaras-de-seguridad',
    title: 'Instalación de Cámaras de Seguridad (CCTV)',
    category: 'Seguridad & Redes',
    shortDesc:
      'Sistemas de videovigilancia HD/4K para casas y negocios con visión nocturna, grabación continua y monitoreo en vivo desde tu celular.',
    fullDesc:
      'Protege tu familia, bodega o comercio las 24 horas. Diseñamos el plano de cobertura, instalamos cámaras analógicas HD o IP (Hikvision, Dahua, EZVIZ), cableado oculto/protegido, grabador DVR/NVR y app móvil lista para ver en tiempo real.',
    imageUrl:
      'https://images.pexels.com/photos/30546987/pexels-photo-30546987.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Cámara de seguridad CCTV instalada en muro exterior para videovigilancia',
    icon: 'videocam',
    turnaround: 'Instalación en 1 día',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Cámaras interior y exterior resistentes a lluvia con visión nocturna',
      'Visualización en vivo y alertas de movimiento en tu celular',
      'Instalación prolija con canaletas, tubería y respaldo eléctrico',
      'Mantenimiento y ampliación de sistemas de cámaras existentes',
    ],
    idealFor: 'Residencias, tiendas, bodegas, oficinas, farmacias y fincas.',
  },
  {
    id: 'redes-area-local',
    title: 'Instalación de Redes de Área Local (LAN)',
    category: 'Seguridad & Redes',
    shortDesc:
      'Cableado estructurado Cat6, configuración de switches, routers, repetidores Wi-Fi Mesh y carpetas/impresoras compartidas en oficina.',
    fullDesc:
      'Elimina las caídas de internet y las zonas sin señal. Instalamos redes cableadas e inalámbricas ordenadas y certificadas para oficinas, cibercafés, comercios y casas de dos plantas con máxima estabilidad.',
    imageUrl:
      'https://images.unsplash.com/photo-1698668975271-2ba9a323be6b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cables Ethernet organizados y conectados a un switch de red profesional',
    icon: 'lan',
    turnaround: '1 – 2 días',
    homeServiceAvailable: true,
    highlights: [
      'Tendido y ponchado profesional de cable UTP Cat5e / Cat6',
      'Instalación de racks, patch panels, switches y Access Points',
      'Ampliación de cobertura Wi-Fi sin cortes en toda la propiedad',
      'Configuración de impresoras y archivos compartidos en red',
    ],
    idealFor: 'Oficinas, comercios con múltiples cajas, escuelas y viviendas amplias.',
  },
  {
    id: 'servicio-a-domicilio',
    title: 'Servicio Técnico a Domicilio',
    category: 'Soporte & Hardware',
    shortDesc:
      'Vamos hasta tu casa, oficina o negocio para reparar computadoras, instalar sistemas, configurar impresoras, redes y cámaras sin que muevas tus equipos.',
    fullDesc:
      '¿No puedes desconectar tu equipo o necesitas asistencia urgente en tu negocio? Nuestro técnico certificado llega puntualmente con herramientas, repuestos y software listo para resolver tu problema en el sitio.',
    imageUrl:
      'https://images.pexels.com/photos/7639374/pexels-photo-7639374.jpeg?auto=compress&cs=tinysrgb&w=900',
    imageAlt: 'Técnico especializado realizando mantenimiento y soporte de laptop a domicilio',
    icon: 'home_repair_service',
    turnaround: 'Visita el mismo día',
    homeServiceAvailable: true,
    featured: true,
    highlights: [
      'Cobertura rápida en residencias, oficinas y locales comerciales',
      'Reparación de PC, formateo, Office, impresoras y Wi-Fi en sitio',
      'Evaluación gratuita en sitio para proyectos de cámaras y redes',
      'Soporte técnico recurrente para empresas (iguala mensual)',
    ],
    idealFor: 'Empresas ocupadas, comercios en horario laboral y personas que prefieren comodidad en casa.',
  },
];

export const HOME_SERVICE_STEPS = [
  {
    step: '01',
    icon: 'chat',
    title: 'Escríbenos o llama',
    desc: 'Indícanos qué servicio necesitas (PC, impresora, Windows, Office, cámaras o red) y tu ubicación.',
  },
  {
    step: '02',
    icon: 'schedule',
    title: 'Confirmamos hora y costo',
    desc: 'Te damos un presupuesto transparente antes de salir y coordinamos la visita el mismo día.',
  },
  {
    step: '03',
    icon: 'verified',
    title: 'Solucionamos con garantía',
    desc: 'Nuestro técnico llega equipado, resuelve el problema frente a ti y te entrega comprobante con garantía.',
  },
] as const;

export const LOCAL_GUARANTEES = [
  {
    icon: 'bolt',
    title: 'Atención ágil',
    desc: 'Impresiones y fotos carnet en minutos; software y mantenimiento el mismo día.',
  },
  {
    icon: 'verified_user',
    title: 'Garantía real',
    desc: 'Respaldo escrito en reparaciones, instalaciones de software, cámaras y cableado.',
  },
  {
    icon: 'lock',
    title: 'Privacidad de tus datos',
    desc: 'Cuidamos tus documentos, fotos y bases de datos con estricta confidencialidad.',
  },
  {
    icon: 'local_shipping',
    title: 'Vamos hasta donde estés',
    desc: 'Servicio técnico a domicilio para hogares, oficinas y negocios locales.',
  },
] as const;

export const LOCAL_FAQ = [
  {
    q: '¿Cuánto tiempo tarda tomarse e imprimir una foto tamaño carnet?',
    a: 'Entre 5 y 10 minutos. Realizamos la toma con iluminación profesional, ajustamos el fondo y las medidas exactas de tu trámite y te entregamos tus fotos impresas más la copia digital por WhatsApp.',
  },
  {
    q: '¿La instalación de Windows y Office queda activada de forma estable?',
    a: 'Sí. Realizamos instalación limpia con activación estable, controladores oficiales y pruebas completas antes de entregarte el equipo, además de respaldar previamente tus archivos personales.',
  },
  {
    q: '¿Puedo enviar mis archivos por WhatsApp para imprimirlos rápido?',
    a: '¡Claro! Puedes enviarnos tus PDFs o documentos de Word por WhatsApp antes de pasar por el local para que solo llegues a retirarlos sin hacer fila.',
  },
  {
    q: '¿Las cámaras de seguridad se pueden ver en vivo desde el teléfono?',
    a: 'Sí. Configuramos el grabador y la aplicación móvil en tu celular (Android y iPhone) para que veas tus cámaras en tiempo real, recibas alertas y revises grabaciones desde cualquier lugar.',
  },
  {
    q: '¿Cómo solicito el servicio técnico a domicilio?',
    a: 'Solo haz clic en cualquier botón de WhatsApp o en "Solicitar técnico a domicilio", compártenos tu dirección aproximada y el problema de tu equipo. Coordinamos la visita el mismo día.',
  },
] as const;
