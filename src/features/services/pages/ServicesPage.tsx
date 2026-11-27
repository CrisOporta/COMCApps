import { Link } from 'react-router';
import { WORK_PROCESS } from '../data/servicesData';
import { useSoftwareServices } from '../hooks/useSoftwareServices';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { CtaBanner } from '@/features/home/components/CtaBanner';
import { Blob } from '@/shared/components/ui/Blob';
import { Reveal } from '@/shared/components/ui/Reveal';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';

const ENGAGEMENT_MODELS = [
  {
    badge: 'Alcance definido',
    title: 'Proyecto Llave en Mano',
    priceHint: 'Presupuesto cerrado',
    desc: 'Ideal para MVPs, aplicaciones corporativas y lanzamientos con requerimientos claros y fecha objetivo.',
    features: [
      'Cronograma y precio acordados desde el inicio',
      'Entregables verificables por hito',
      'Garantía de estabilidad post-lanzamiento',
    ],
  },
  {
    badge: 'Más popular',
    featured: true,
    title: 'Squad Dedicado COMCApps',
    priceHint: 'Retainer mensual flexible',
    desc: 'Un equipo multidisciplinario (Tech Lead, Frontend, Backend/Mobile y Diseño) evolucionando tu producto cada semana.',
    features: [
      'Priorización continua según tus metas de negocio',
      'Velocidad sostenida sin costos de reclutamiento',
      'Comunicación directa diaria por Slack / Teams',
    ],
  },
  {
    badge: 'Asesoría experta',
    title: 'Consultoría y Auditoría',
    priceHint: 'Por sprint o diagnóstico',
    desc: 'Evaluamos tu arquitectura, rendimiento, seguridad y UX para destrabar cuellos de botella en productos existentes.',
    features: [
      'Informe técnico accionable con prioridades claras',
      'Optimización de bases de datos, APIs y frontend',
      'Mentoría para tu equipo interno de desarrollo',
    ],
  },
];

export default function ServicesPage() {
  const { items: services } = useSoftwareServices();

  return (
    <div>
      {/* ── Hero de sección (estilo DocumentationPage de OptimizaLey) ── */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <Blob className="absolute -right-32 -top-32 size-96 bg-violet-100 dark:bg-violet-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.1]">
            Ingeniería de extremo a extremo para{' '}
            <span className="text-violet-600 dark:text-violet-400">productos digitales</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Combinamos estrategia, diseño de interfaces y desarrollo de alta calidad para entregarte software confiable que impulsa tus operaciones.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#estimador" className="cm-action cm-action-primary">
              Ir al estimador de costos
              <ArrowRightIcon />
            </a>
            <Link to="/proyectos" className="cm-action cm-action-secondary">
              Ver proyectos realizados
            </Link>
          </div>
        </div>
      </section>

      {/* ── Catálogo detallado de servicios ──────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="space-y-6">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 2) * 80}>
              <article
                id={service.slug}
                className="scroll-mt-24 cm-surface p-6 sm:p-8 transition-all hover:border-violet-200 dark:hover:border-violet-800/70"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3.5">
                      <div className="size-12 rounded-2xl bg-violet-100 dark:bg-violet-600/20 border border-violet-200 dark:border-violet-500/25 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                        <MaterialIcon name={service.icon} className="text-[24px]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                          {String(index + 1).padStart(2, '0')} · {service.timeline}
                        </span>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <p className="mt-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 px-4 py-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                      <strong className="font-semibold text-zinc-900 dark:text-white">
                        Ideal para:{' '}
                      </strong>
                      {service.idealFor}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.technologies.map(tech => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {service.gallery && service.gallery.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {service.gallery.map(img => (
                          <a
                            key={img.id}
                            href={img.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 block"
                          >
                            <img
                              src={img.url}
                              alt={img.altText || service.title}
                              loading="lazy"
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    {service.featuredImageUrl && (
                      <div className="h-44 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <img
                          src={service.featuredImageUrl}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                        Entregables clave
                      </p>
                      <ul className="space-y-2.5">
                        {service.deliverables.map(item => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                          >
                            <CheckIcon className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        Consultar por este servicio <ArrowRightIcon className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Estimador interactivo de proyectos ───────────────────────── */}
      <ProjectEstimator />

      {/* ── Modelos de contratación ──────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeader
            badge="Modalidades"
            title="Flexibilidad para adaptarnos a tu etapa"
            subtitle="Elige el modelo de colaboración que mejor encaje con tu presupuesto, velocidad y equipo interno."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((model, i) => (
            <Reveal key={model.title} delay={i * 100}>
              <div
                className={`relative rounded-3xl p-7 h-full flex flex-col ${
                  model.featured
                    ? 'border-2 border-violet-400 dark:border-violet-500/50 bg-white dark:bg-zinc-900 shadow-xl shadow-violet-100 dark:shadow-violet-950/30'
                    : 'cm-surface'
                }`}
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                    model.featured
                      ? 'bg-violet-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {model.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                  {model.title}
                </h3>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1">
                  {model.priceHint}
                </p>
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {model.desc}
                </p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {model.features.map(f => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300"
                    >
                      <CheckIcon className="size-4 text-violet-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contacto?servicio=${encodeURIComponent(model.title)}`}
                  className={`mt-7 w-full cm-action ${
                    model.featured ? 'cm-action-primary' : 'cm-action-secondary'
                  }`}
                >
                  Solicitar información
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mini resumen de proceso */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORK_PROCESS.map(step => (
            <div
              key={step.step}
              className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-5"
            >
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                Paso {step.step}
              </span>
              <h4 className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">
                {step.title}
              </h4>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
