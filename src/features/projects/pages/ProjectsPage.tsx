import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from '../data/projectsData';
import { CtaBanner } from '@/features/home/components/CtaBanner';
import { Blob } from '@/shared/components/ui/Blob';
import { Reveal } from '@/shared/components/ui/Reveal';
import { ArrowRightIcon, MaterialIcon, SearchIcon } from '@/shared/components/ui/Icons';

export default function ProjectsPage() {
  const [category, setCategory] = useState<'Todos' | ProjectCategory>('Todos');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PROJECTS.filter(project => {
      const matchesCat = category === 'Todos' || project.category === category;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.stack.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [category, search]);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <Blob className="absolute -right-32 -top-32 size-96 bg-violet-100 dark:bg-violet-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:border-violet-500/30 dark:bg-violet-600/10 dark:text-violet-300">
            Portafolio & Casos de Estudio
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.1]">
            Software real en <span className="text-violet-600 dark:text-violet-400">producción</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Explora soluciones diseñadas y construidas por COMCApps. Cada proyecto combina diseño cuidado, arquitectura escalable y resultados medibles.
          </p>
        </div>
      </section>

      {/* ── Filtros y buscador ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-950/40'
                    : 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <SearchIcon className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filtrar por nombre o stack..."
              aria-label="Filtrar proyectos"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-10 pr-4 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="cm-surface p-12 text-center">
            <p className="text-base font-semibold text-zinc-900 dark:text-white">
              No encontramos proyectos con esos filtros
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Prueba con otra categoría o limpia el campo de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('Todos');
                setSearch('');
              }}
              className="mt-5 cm-action cm-action-secondary"
            >
              Mostrar todos los proyectos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="group cm-surface overflow-hidden flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div
                    className={`relative h-44 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/15 backdrop-blur-xs border border-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {project.category}
                      </span>
                      <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] font-semibold text-white/90">
                        {project.status} · {project.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shrink-0">
                        <MaterialIcon name={project.icon} className="text-[26px]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-white/75 truncate">{project.client}</p>
                        <h2 className="text-lg font-bold text-white truncate">{project.title}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {project.summary}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-100 dark:border-zinc-800 p-3 text-center">
                      {project.metrics.map(m => (
                        <div key={m.label}>
                          <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
                            {m.value}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                      <span>Ver caso de estudio completo</span>
                      <ArrowRightIcon className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBanner
        title="¿Quieres un resultado similar para tu empresa?"
        subtitle="Cuéntanos sobre tu industria y objetivos. Te mostraremos cómo podemos diseñar una arquitectura a tu medida."
      />
    </div>
  );
}
