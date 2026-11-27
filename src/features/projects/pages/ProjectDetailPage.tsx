import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useProjects } from '../hooks/useProjects';
import { CtaBanner } from '@/features/home/components/CtaBanner';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { items: projects, loading } = useProjects();
  const project = projects.find(p => p.slug === slug);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (loading && !project) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 space-y-6 animate-pulse">
        <div className="h-56 rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-40 rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="cm-surface p-10">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Proyecto no encontrado
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            El caso de estudio que buscas no existe o fue movido.
          </p>
          <Link to="/proyectos" className="mt-6 cm-action cm-action-primary">
            <ArrowLeftIcon /> Volver al portafolio
          </Link>
        </div>
      </div>
    );
  }

  const related = projects.filter(p => p.slug !== project.slug).slice(0, 2);
  const gallery = project.gallery ?? [];
  const mainPhoto = activePhoto || project.featuredImageUrl || gallery[0]?.url || null;

  return (
    <div>
      {/* ── Hero del proyecto ────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} text-white`}>
        {project.featuredImageUrl && (
          <>
            <img
              src={project.featuredImageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/60 to-zinc-950/40" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-22">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeftIcon className="size-3.5" />
            Todos los proyectos
          </Link>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-semibold">
                  {project.category}
                </span>
                <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold">
                  {project.status} · {project.year}
                </span>
                <span className="text-xs text-white/80">{project.client}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="size-16 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center shrink-0">
              <MaterialIcon name={project.icon} className="text-[36px]" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map(m => (
              <div
                key={m.label}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5"
              >
                <p className="text-3xl font-extrabold">{m.value}</p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wide font-semibold">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cuerpo del caso de estudio ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {mainPhoto && (
              <div className="cm-surface overflow-hidden">
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  <img
                    src={mainPhoto}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {gallery.length > 1 && (
                  <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 overflow-x-auto">
                    {gallery.map(img => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActivePhoto(img.url)}
                        className={`h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          mainPhoto === img.url
                            ? 'border-violet-600'
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.altText || project.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="cm-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
                <span className="size-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <MaterialIcon name="flag" className="text-[18px]" />
                </span>
                El desafío
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="cm-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
                <span className="size-8 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <MaterialIcon name="architecture" className="text-[18px]" />
                </span>
                La solución de COMCApps
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div className="cm-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
                <span className="size-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MaterialIcon name="trending_up" className="text-[18px]" />
                </span>
                Resultados obtenidos
              </h2>
              <ul className="mt-4 space-y-3">
                {project.results.map(res => (
                  <li
                    key={res}
                    className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckIcon className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="cm-surface p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Stack tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="cm-surface p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Entregables
              </h3>
              <ul className="space-y-2.5">
                {project.deliverables.map(del => (
                  <li
                    key={del}
                    className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="size-1.5 rounded-full bg-violet-500 shrink-0" />
                    {del}
                  </li>
                ))}
              </ul>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full cm-action cm-action-secondary"
                >
                  <MaterialIcon name="open_in_new" className="text-[16px]" />
                  Ver sitio en vivo
                </a>
              )}

              <Link
                to={`/contacto?servicio=${encodeURIComponent(`Proyecto similar a ${project.title}`)}`}
                className="mt-3 w-full cm-action cm-action-primary"
              >
                Construir algo similar
                <ArrowRightIcon />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Otros casos de estudio ─────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-zinc-100 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
            Otros casos de estudio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map(rel => (
              <Link
                key={rel.slug}
                to={`/proyectos/${rel.slug}`}
                className="group cm-surface p-6 flex items-center justify-between gap-4 hover:border-violet-300 dark:hover:border-violet-700 transition-all"
              >
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                    {rel.category} · {rel.year}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {rel.tagline}
                  </p>
                </div>
                <ArrowRightIcon className="size-5 text-zinc-400 group-hover:text-violet-600 shrink-0 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
