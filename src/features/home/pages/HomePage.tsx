import { useState } from 'react';
import { Link } from 'react-router';
import { TECH_STACK, WORK_PROCESS } from '@/features/services/data/servicesData';
import { useCmsPage } from '@/shared/hooks/useCmsData';
import { PageBlocksRenderer } from '@/shared/components/cms/PageBlocksRenderer';
import { HOME_FAQ, TESTIMONIALS, WHY_COMCAPPS } from '../data/homeData';
import { Reveal } from '@/shared/components/ui/Reveal';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';
import { HeroSection } from '../components/HeroSection';
import { CtaBanner } from '../components/CtaBanner';

const SEEDED_HOME_LABELS = new Set([
  'Banner Destacado COMCApps',
  'Indicadores de Confianza',
  'Llamado a la Acción',
]);

const EXPLORE_AREAS = [
  {
    to: '/servicios',
    icon: 'code',
    title: 'Ingeniería de Software',
    desc: 'Plataformas web SaaS, apps móviles iOS/Android, APIs cloud e Inteligencia Artificial a medida.',
    cta: 'Ver servicios y estimador',
    accent: true,
  },
  {
    to: '/local',
    icon: 'storefront',
    title: 'Centro Tecnológico Local',
    desc: 'Reparación de PC e impresoras, Windows/Office, redes LAN, cámaras CCTV, sistemas POS y atención a domicilio.',
    cta: 'Explorar sucursal local',
    accent: true,
  },
  {
    to: '/proyectos',
    icon: 'rocket_launch',
    title: 'Portafolio de Proyectos',
    desc: 'Casos de estudio reales en producción, arquitecturas implementadas y resultados medibles.',
    cta: 'Ver portafolio',
    accent: false,
  },
  {
    to: '/equipo',
    icon: 'group',
    title: 'Nuestro Equipo',
    desc: 'Conoce a los arquitectos, ingenieros y especialistas detrás de cada solución de COMCApps.',
    cta: 'Conocer al equipo',
    accent: false,
  },
  {
    to: '/blog',
    icon: 'article',
    title: 'Blog de Ingeniería',
    desc: 'Artículos técnicos, guías de arquitectura, patrones de desarrollo y aprendizajes reales.',
    cta: 'Leer artículos',
    accent: false,
  },
  {
    to: '/contacto',
    icon: 'mail',
    title: 'Cotizaciones y Asesoría',
    desc: 'Cuéntanos qué necesitas construir o resolver y coordinamos una propuesta clara en menos de 24h.',
    cta: 'Iniciar conversación',
    accent: false,
  },
] as const;

export default function HomePage() {
  const { blocks: homeBlocks } = useCmsPage('home');
  const extraBuilderBlocks = homeBlocks.filter(b => !SEEDED_HOME_LABELS.has(b.label));

  return (
    <div>
      {/* ── Hero interactivo ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Banda continua de Stack Tecnológico ─────────────────────── */}
      <section className="border-y border-zinc-100 dark:border-zinc-800/70 bg-zinc-50/70 dark:bg-zinc-900/30 py-6 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-3">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Tecnologías con las que construimos soluciones de clase mundial
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="animate-marquee gap-3 px-4">
            {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs shrink-0"
              >
                <span className="size-1.5 rounded-full bg-violet-500" />
                <span>{tech.name}</span>
                <span className="text-[10px] font-normal text-zinc-400">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accesos directos a cada sección del sitio ───────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              title="Todo el ecosistema COMCApps, organizado para ti"
              subtitle="Explora directamente el área que necesitas: ingeniería de software, sucursal física, casos de estudio, equipo o recursos técnicos."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPLORE_AREAS.map((area, i) => (
              <Reveal key={area.to} delay={(i % 3) * 80}>
                <Link
                  to={area.to}
                  className={`group flex flex-col h-full rounded-2xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    area.accent
                      ? 'border-violet-200 dark:border-violet-500/30 bg-gradient-to-br from-violet-50/70 to-white dark:from-violet-950/30 dark:to-zinc-900/50'
                      : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50'
                  }`}
                >
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      area.accent
                        ? 'bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                    }`}
                  >
                    <MaterialIcon name={area.icon} />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                    {area.desc}
                  </p>
                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                    <span>{area.cta}</span>
                    <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por qué COMCApps ────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              title="Lo que cambia cuando construyes con COMCApps"
              subtitle="Combinamos rigor de ingeniería, diseño de producto moderno y acompañamiento transparente de principio a fin."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WHY_COMCAPPS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 100}>
                <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-2xl bg-violet-100 dark:bg-violet-600/20 border border-violet-200 dark:border-violet-500/25 flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400">
                      <MaterialIcon name={item.icon} className="text-[24px]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {item.items.map(bullet => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300"
                          >
                            <CheckIcon className="size-4 text-emerald-500 shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo trabajamos (4 pasos) ───────────────────────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              title="De la idea al despliegue en 4 pasos claros"
              subtitle="Un proceso ágil, medible y sin fricción para que siempre sepas en qué etapa está tu software."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORK_PROCESS.map((s, i) => (
              <Reveal key={s.step} delay={i * 110}>
                <div className="relative flex flex-col items-start gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 h-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-violet-600 text-white font-bold text-sm shrink-0">
                      {s.step}
                    </div>
                    <span className="text-zinc-300 dark:text-zinc-700">
                      <MaterialIcon name={s.icon} className="text-[24px]" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonios ─────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              title="Lo que dicen quienes confían en COMCApps"
              subtitle="Construimos relaciones a largo plazo basadas en resultados medibles y software confiable."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 100}>
                <figure className="cm-surface p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-4" aria-label="5 de 5 estrellas">
                      {'★★★★★'}
                    </div>
                    <blockquote className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      “{t.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                    <span className="size-9 rounded-full bg-violet-100 dark:bg-violet-600/20 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {t.author}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              title="Preguntas frecuentes"
              subtitle="Resolvemos las dudas más comunes antes de iniciar un proyecto de software."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 divide-y divide-zinc-100 dark:divide-zinc-800">
              {HOME_FAQ.map(item => (
                <FaqAccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bloques personalizados añadidos desde el Constructor Visual ── */}
      {extraBuilderBlocks.length > 0 && <PageBlocksRenderer blocks={extraBuilderBlocks} />}

      {/* ── CTA Final ───────────────────────────────────────────────── */}
      <CtaBanner />
    </div>
  );
}

function FaqAccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-zinc-900 dark:text-white cursor-pointer"
      >
        <span>{q}</span>
        <svg
          className={`size-4 text-zinc-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-violet-600 dark:text-violet-400' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <p className="pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{a}</p>
      )}
    </div>
  );
}
