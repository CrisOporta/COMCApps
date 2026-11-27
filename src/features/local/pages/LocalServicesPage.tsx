import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  HOME_SERVICE_STEPS,
  LOCAL_BRANCH,
  LOCAL_FAQ,
  LOCAL_GUARANTEES,
  LOCAL_SERVICES,
  LOCAL_SERVICE_CATEGORIES,
  type LocalServiceCategory,
  type LocalServiceItem,
} from '../data/localData';
import type { WithMedia } from '@/shared/lib/cmsApi';
import { parseJsonArray, useCmsCollection, useSiteSettings } from '@/shared/hooks/useCmsData';
import { Blob } from '@/shared/components/ui/Blob';
import { Reveal } from '@/shared/components/ui/Reveal';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import {
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  MaterialIcon,
  PhoneIcon,
  SearchIcon,
} from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

function buildWhatsAppUrl(whatsappNumber: string, serviceTitle?: string): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || LOCAL_BRANCH.whatsappNumber;
  const text = serviceTitle
    ? `Hola equipo de COMCApps, me interesa solicitar información o cotizar el servicio: ${serviceTitle}.`
    : 'Hola equipo de COMCApps, quisiera consultar sobre los servicios de su sucursal local / a domicilio.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

interface ApiLocalService {
  id: number;
  slug: string;
  title: string;
  category: LocalServiceCategory;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  turnaround: string;
  homeServiceAvailable: boolean;
  instantDelivery: boolean;
  featured: boolean;
  highlightsJson: string;
  idealFor: string;
}

function mapLocalService({ item, featuredImageUrl, media }: WithMedia<ApiLocalService>): LocalServiceItem {
  const fallback = LOCAL_SERVICES.find(s => s.id === item.slug);
  const parsedHighlights = parseJsonArray<string>(item.highlightsJson);
  const highlights = parsedHighlights.length > 0 ? parsedHighlights : (fallback?.highlights ?? []);
  const gallery = media.map(m => m.url);
  return {
    id: item.slug,
    title: item.title,
    category: item.category,
    shortDesc: item.shortDesc,
    fullDesc: item.fullDesc || item.shortDesc,
    imageUrl: featuredImageUrl || fallback?.imageUrl || '/banner.png',
    imageAlt: item.title,
    gallery: gallery.length > 0 ? gallery : undefined,
    icon: item.icon || 'computer',
    turnaround: item.turnaround || 'Mismo día',
    homeServiceAvailable: item.homeServiceAvailable,
    instantDelivery: item.instantDelivery,
    featured: item.featured,
    highlights,
    idealFor: item.idealFor || fallback?.idealFor || '',
  };
}

export default function LocalServicesPage() {
  const settings = useSiteSettings();
  const { items: servicesList, loading: loadingServices } = useCmsCollection<ApiLocalService, LocalServiceItem>(
    'local-services',
    LOCAL_SERVICES,
    mapLocalService,
  );
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | LocalServiceCategory>('Todos');
  const [search, setSearch] = useState('');
  const [onlyHomeService, setOnlyHomeService] = useState(false);
  const [activeService, setActiveService] = useState<LocalServiceItem | null>(null);
  const [activePhotoUrl, setActivePhotoUrl] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredServices = useMemo(() => {
    const q = search.trim().toLowerCase();
    return servicesList.filter(item => {
      if (selectedCategory !== 'Todos' && item.category !== selectedCategory) return false;
      if (onlyHomeService && !item.homeServiceAvailable) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.fullDesc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.highlights.some(h => h.toLowerCase().includes(q))
      );
    });
  }, [servicesList, selectedCategory, search, onlyHomeService]);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      toast.info(`${label} copiado al portapapeles.`);
    });
  };

  return (
    <div>
      {/* ── Hero visual con foto real del centro físico ──────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <Blob className="absolute -right-32 -top-32 size-96 bg-violet-100 dark:bg-violet-900/20" />
        <Blob className="absolute -left-24 bottom-0 size-72 bg-indigo-100/70 dark:bg-indigo-950/30" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
                Centro de Soluciones Tecnológicas:{' '}
                <span className="text-violet-600 dark:text-violet-400">
                  soporte especializado, infraestructura y sistemas para tu negocio
                </span>
              </h1>

              <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                En nuestra sede física de <strong className="text-zinc-900 dark:text-white">COMCApps</strong> integramos
                ingeniería y atención presencial: diagnóstico y mantenimiento de computadoras e impresoras, implementación de
                sistemas operativos y Office activados, redes LAN, videovigilancia CCTV, páginas web, software empresarial y
                servicios digitales — en sucursal o{' '}
                <strong className="text-zinc-900 dark:text-white">directamente a domicilio</strong>.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#catalogo-local" className="cm-action cm-action-primary">
                  Explorar los 12 servicios
                  <ArrowRightIcon />
                </a>
                <a
                  href={buildWhatsAppUrl(settings.whatsAppNumber, 'Servicio Técnico a Domicilio')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cm-action cm-action-secondary"
                >
                  <MaterialIcon name="home_repair_service" className="text-[18px] text-violet-600 dark:text-violet-400" />
                  Pedir técnico a domicilio
                </a>
                <a
                  href="#ubicacion"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  <MapPinIcon className="size-4" />
                  Ver mapa y horarios
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/70 dark:border-zinc-800/80">
                <div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">12+</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Soluciones presenciales</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">360°</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Hardware, redes y software</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">Mismo día</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Asistencia a domicilio</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">100%</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Soporte garantizado</p>
                </div>
              </div>
            </div>

            {/* Tarjeta fotográfica del taller/sucursal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-violet-950/10 dark:shadow-black/50 bg-zinc-900">
                <img
                  src={LOCAL_BRANCH.heroImage}
                  alt="Centro técnico físico de COMCApps"
                  className="w-full h-[320px] sm:h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/25 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    Atención Presencial Activa
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-600/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                    <MaterialIcon name="verified" className="text-[14px]" />
                    Técnicos Certificados
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 border border-zinc-200/80 dark:border-zinc-700/80">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <MapPinIcon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                        Visítanos hoy
                      </p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {settings.addressLine1 || LOCAL_BRANCH.addressLine1}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                        {settings.schedule || 'Lun – Vie: 8:00 AM – 6:00 PM · Sáb: 8:30 AM – 4:00 PM'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Garantías rápidas ────────────────────────────────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/70 bg-zinc-50/70 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOCAL_GUARANTEES.map((g, idx) => (
              <Reveal key={g.title} delay={idx * 60}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-4 h-full">
                  <div className="size-10 rounded-xl bg-violet-50 dark:bg-violet-600/15 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <MaterialIcon name={g.icon} className="text-[20px]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white">{g.title}</h2>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catálogo completo de los 12 servicios físicos con fotos reales ── */}
      <section id="catalogo-local" className="scroll-mt-20 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <Reveal>
          <SectionHeader
            badge="Catálogo de Servicios en Físico"
            title="Todo lo que hacemos en nuestro local y a domicilio"
            subtitle="Filtra por área o busca el servicio que necesitas. Cada trabajo cuenta con atención personalizada, transparencia y garantía COMCApps."
          />
        </Reveal>

        {/* Controles interactivos de filtro y búsqueda */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['Todos', ...LOCAL_SERVICE_CATEGORIES] as const).map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-violet-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-950/40'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <label className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyHomeService}
                onChange={e => setOnlyHomeService(e.target.checked)}
                className="accent-violet-600 size-3.5 rounded"
              />
              Solo con servicio a domicilio
            </label>

            <div className="relative min-w-[230px]">
              <SearchIcon className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar: impresora, carnet, CCTV..."
                className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 pl-10 pr-4 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Grid de tarjetas fotográficas */}
        {loadingServices ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="cm-surface overflow-hidden h-[380px] animate-pulse bg-zinc-100/70 dark:bg-zinc-900/60"
              />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="mt-10 cm-surface p-12 text-center">
            <MaterialIcon name="search_off" className="text-[40px] text-zinc-400" />
            <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">
              No encontramos servicios con ese filtro
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Prueba limpiando la búsqueda o seleccionando «Todos».
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearch('');
                setOnlyHomeService(false);
              }}
              className="mt-4 cm-action cm-action-secondary text-xs"
            >
              Ver los 12 servicios
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 70}>
                <article
                  id={service.id}
                  className="group scroll-mt-24 cm-surface overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/10 dark:hover:shadow-black/50 hover:border-violet-200 dark:hover:border-violet-800/70"
                >
                  {/* Fotografía real del servicio */}
                  <div className="relative h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-transparent" />

                    {/* Badges superiores */}
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5">
                      <span className="rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
                        {service.category}
                      </span>
                      {service.homeServiceAvailable ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
                          <MaterialIcon name="home_repair_service" className="text-[13px]" />
                          A domicilio
                        </span>
                      ) : service.instantDelivery ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
                          <MaterialIcon name="bolt" className="text-[13px]" />
                          Al instante
                        </span>
                      ) : null}
                    </div>

                    {/* Icono y tiempo estimado sobre la foto */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/95">
                        <MaterialIcon name="schedule" className="text-[15px] text-violet-300" />
                        {service.turnaround}
                      </span>
                      <div className="size-9 rounded-xl bg-white/95 dark:bg-zinc-900/95 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-md">
                        <MaterialIcon name={service.icon} className="text-[20px]" />
                      </div>
                    </div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="mt-4 space-y-1.5 flex-1">
                      {service.highlights.slice(0, 3).map(h => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300"
                        >
                          <CheckIcon className="size-3.5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveService(service)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/70 hover:border-violet-300 dark:hover:border-violet-700 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                      >
                        Ver detalles
                      </button>
                      <Link
                        to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-violet-600 hover:bg-violet-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
                      >
                        Solicitar
                        <ArrowRightIcon className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Sección Destacada: Servicio Técnico a Domicilio ──────────── */}
      <section className="border-y border-zinc-100 dark:border-zinc-800/70 bg-gradient-to-br from-violet-600 to-indigo-900 dark:from-violet-800 dark:to-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  ¿No puedes traer tu equipo? Llegamos hasta tu casa u oficina
                </h2>
                <p className="mt-4 text-sm sm:text-base text-violet-100/90 leading-relaxed">
                  Nuestro servicio a domicilio cubre mantenimiento de PC, instalación de Windows y Office activados,
                  configuración de impresoras, cableado de red LAN, sistemas POS e instalación completa de cámaras de seguridad.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppUrl(settings.whatsAppNumber, 'Solicitud de Servicio Técnico a Domicilio')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-zinc-50 px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg shadow-violet-950/30 transition-all"
                  >
                    Agendar visita por WhatsApp
                    <ExternalLinkIcon className="size-4" />
                  </a>
                  <Link
                    to="/contacto?servicio=Servicio%20T%C3%A9cnico%20a%20Domicilio"
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all"
                  >
                    Formulario de visita
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HOME_SERVICE_STEPS.map((step, i) => (
                <Reveal key={step.step} delay={i * 90}>
                  <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest text-violet-200">
                        PASO {step.step}
                      </span>
                      <div className="size-9 rounded-xl bg-white/15 flex items-center justify-center text-white">
                        <MaterialIcon name={step.icon} className="text-[20px]" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-xs text-violet-100/85 leading-relaxed flex-1">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ubicación Física, Mapa Interactivo y Horarios ────────────── */}
      <section id="ubicacion" className="scroll-mt-20 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <Reveal>
          <SectionHeader
            badge="Ubicación y Horarios"
            title="Visítanos en nuestra sucursal local"
            subtitle="Atendemos sin cita previa para impresiones, fotos tamaño carnet, diagnósticos rápidos e instalaciones. También puedes agendar tu visita o retiro."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Información del local */}
          <div className="lg:col-span-5 cm-surface p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Dirección física
                </p>
                <p className="mt-1.5 text-base font-bold text-zinc-900 dark:text-white">
                  {settings.addressLine1 || LOCAL_BRANCH.addressLine1}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {settings.addressLine2 || LOCAL_BRANCH.addressLine2}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${settings.addressLine1 || LOCAL_BRANCH.addressLine1}, ${settings.addressLine2 || LOCAL_BRANCH.addressLine2}`,
                      'Dirección',
                    )
                  }
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                >
                  <MaterialIcon name="content_copy" className="text-[14px]" />
                  Copiar dirección
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2.5">
                  Horarios de atención
                </p>
                <ul className="space-y-2 text-sm">
                  {LOCAL_BRANCH.hours.map(h => (
                    <li key={h.days} className="flex items-center justify-between gap-2">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{h.days}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm text-right">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Contacto directo de sucursal
                </p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${(settings.phonePrimary || LOCAL_BRANCH.phone).replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    <PhoneIcon className="size-4 text-violet-600 dark:text-violet-400" />
                    {settings.phonePrimary || LOCAL_BRANCH.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(settings.phonePrimary || LOCAL_BRANCH.phone, 'Teléfono')}
                    className="text-xs font-semibold text-zinc-400 hover:text-violet-600 cursor-pointer"
                  >
                    Copiar
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${settings.localEmail || LOCAL_BRANCH.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    <MailIcon className="size-4 text-violet-600 dark:text-violet-400" />
                    {settings.localEmail || LOCAL_BRANCH.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(settings.localEmail || LOCAL_BRANCH.email, 'Correo')}
                    className="text-xs font-semibold text-zinc-400 hover:text-violet-600 cursor-pointer"
                  >
                    Copiar
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                  Métodos de pago en local
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {LOCAL_BRANCH.paymentMethods.map(m => (
                    <span
                      key={m}
                      className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={settings.mapsDirectionsUrl || LOCAL_BRANCH.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 cm-action cm-action-primary text-xs"
              >
                <MapPinIcon className="size-4" />
                Cómo llegar en Maps
              </a>
              <a
                href={buildWhatsAppUrl(settings.whatsAppNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 cm-action cm-action-secondary text-xs"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Mapa embebido */}
          <div className="lg:col-span-7 cm-surface overflow-hidden min-h-[380px] flex flex-col">
            <iframe
              title="Mapa de ubicación física COMCApps"
              src={settings.mapsEmbedUrl || LOCAL_BRANCH.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 min-h-[380px] border-0"
            />
          </div>
        </div>
      </section>

      {/* ── Preguntas Frecuentes del Centro Local ────────────────────── */}
      <section className="border-t border-zinc-100 dark:border-zinc-800/70 bg-[#fbfbfb] dark:bg-[#050507]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <Reveal>
            <SectionHeader
              badge="Preguntas Frecuentes"
              title="Dudas comunes sobre nuestros servicios presenciales"
              subtitle="Respuestas claras sobre tiempos de entrega, activación de software, fotos carnet, impresiones por WhatsApp y visitas a domicilio."
              align="center"
            />
          </Reveal>

          <div className="mt-10 space-y-3">
            {LOCAL_FAQ.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <MaterialIcon
                      name={isOpen ? 'expand_less' : 'expand_more'}
                      className="text-[22px] text-violet-600 dark:text-violet-400 shrink-0"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modal de detalle rápido del servicio seleccionado ─────────── */}
      {activeService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeService.title}
          onClick={() => setActiveService(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 shrink-0">
              <img
                src={activePhotoUrl || activeService.imageUrl}
                alt={activeService.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
              <button
                type="button"
                onClick={() => {
                  setActiveService(null);
                  setActivePhotoUrl(null);
                }}
                aria-label="Cerrar detalle"
                className="absolute top-4 right-4 size-9 rounded-full bg-zinc-950/70 text-white hover:bg-zinc-950 flex items-center justify-center cursor-pointer"
              >
                <CloseIcon className="size-4" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="rounded-full bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">
                    {activeService.category}
                  </span>
                  <span className="rounded-full bg-white/15 backdrop-blur-md px-3 py-0.5 text-xs font-medium text-white">
                    Tiempo estimado: {activeService.turnaround}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {activeService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {activeService.gallery && activeService.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeService.gallery.map((url, idx) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setActivePhotoUrl(url)}
                      className={`shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        (activePhotoUrl || activeService.imageUrl) === url
                          ? 'border-violet-600 ring-2 ring-violet-500/30'
                          : 'border-zinc-200 dark:border-zinc-700 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Foto ${idx + 1}`} className="w-16 h-12 object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {activeService.fullDesc}
              </p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2.5">
                  ¿Qué incluye este servicio?
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.highlights.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 p-3 text-xs text-zinc-700 dark:text-zinc-200"
                    >
                      <CheckIcon className="size-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="rounded-xl border border-violet-200/70 dark:border-violet-800/60 bg-violet-50/70 dark:bg-violet-950/30 px-4 py-3 text-xs text-violet-900 dark:text-violet-200">
                <strong className="font-semibold">Ideal para: </strong>
                {activeService.idealFor}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(settings.whatsAppNumber, activeService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 cm-action cm-action-primary text-xs sm:text-sm"
                >
                  Cotizar por WhatsApp
                  <ExternalLinkIcon className="size-4" />
                </a>
                <Link
                  to={`/contacto?servicio=${encodeURIComponent(activeService.title)}`}
                  onClick={() => setActiveService(null)}
                  className="flex-1 cm-action cm-action-secondary text-xs sm:text-sm"
                >
                  Solicitar en formulario
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
