import { useState } from 'react';
import { Link } from 'react-router';
import { SERVICES, TECH_STACK, WORK_PROCESS } from '@/features/services/data/servicesData';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '@/features/projects/data/projectsData';
import { TEAM_MEMBERS } from '@/features/team/data/teamData';
import { BLOG_POSTS } from '@/features/blog/data/blogData';
import { HOME_FAQ, TESTIMONIALS, WHY_COMCAPPS } from '../data/homeData';
import { Reveal } from '@/shared/components/ui/Reveal';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';
import { HeroSection } from '../components/HeroSection';
import { CtaBanner } from '../components/CtaBanner';

export default function HomePage() {
  const [projectFilter, setProjectFilter] = useState<'Todos' | ProjectCategory>('Todos');

  const filteredProjects =
    projectFilter === 'Todos'
      ? PROJECTS.slice(0, 6)
      : PROJECTS.filter(p => p.category === projectFilter);

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

      {/* ── Servicios ────────────────────────────────────────────────── */}
      <section id="servicios" className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Servicios"
              title="Todo lo que tu empresa necesita para innovar"
              subtitle="Cubrimos el ciclo completo del producto digital: desde estrategia y diseño UI/UX hasta ingeniería web, móvil, cloud e inteligencia artificial."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 90}>
                <Link
                  to={`/servicios#${service.id}`}
                  className={`group flex flex-col h-full rounded-2xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    service.accent
                      ? 'border-violet-200 dark:border-violet-500/30 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-zinc-900/50'
                      : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50'
                  }`}
                >
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      service.accent
                        ? 'bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                    }`}
                  >
                    <MaterialIcon name={service.icon} />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                    {service.shortDesc}
                  </p>
                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                    <span>{service.timeline}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Ver detalle <ArrowRightIcon className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/servicios" className="cm-action cm-action-secondary">
              Explorar servicios y estimador interactivo
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Portafolio / Proyectos destacados con filtro dinámico ───── */}
      <section id="proyectos" className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Portafolio"
              title="Proyectos que impulsan negocios reales"
              subtitle="Casos de éxito representativos de plataformas web, apps móviles, APIs críticas y soluciones con IA diseñadas por COMCApps."
            />
          </Reveal>

          {/* Filtros rápidos */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setProjectFilter(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  projectFilter === cat
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-950/40'
                    : 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 90}>
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="group cm-surface overflow-hidden flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className={`relative h-40 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/15 backdrop-blur-xs border border-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {project.category}
                      </span>
                      <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] font-semibold text-white/90">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white">
                        <MaterialIcon name={project.icon} className="text-[24px]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-white/75 truncate">{project.client}</p>
                        <h3 className="text-base font-bold text-white truncate">{project.title}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {project.tagline}
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-100 dark:border-zinc-800 p-2.5 text-center">
                      {project.metrics.map(m => (
                        <div key={m.label}>
                          <p className="text-xs font-bold text-violet-600 dark:text-violet-400">
                            {m.value}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/proyectos" className="cm-action cm-action-primary">
              Ver todos los casos de estudio
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Por qué COMCApps (BenefitCards estilo OptimizaLey) ──────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Diferenciador"
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

      {/* ── Cómo trabajamos (4 pasos estilo OptimizaLey) ────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Metodología"
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

      {/* ── Equipo destacado ────────────────────────────────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Nuestro Equipo"
              title="Talento multidisciplinario apasionado por el código"
              subtitle="Arquitectos de software, diseñadores de producto e ingenieros móviles trabajando codo a codo contigo."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_MEMBERS.slice(0, 3).map((member, i) => (
              <Reveal key={member.id} delay={i * 100}>
                <div className="cm-surface p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`size-13 rounded-2xl bg-gradient-to-br ${member.avatarGradient} flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0`}
                    >
                      {member.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-zinc-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-violet-600 dark:text-violet-400 truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 4).map(skill => (
                      <span
                        key={skill}
                        className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/equipo" className="cm-action cm-action-secondary">
              Conocer a todo el equipo y cultura
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonios ─────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Testimonios"
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

      {/* ── Blog preview ────────────────────────────────────────────── */}
      <section className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="Blog Técnico"
              title="Ideas, arquitectura y aprendizajes de ingeniería"
              subtitle="Compartimos patrones reales de desarrollo web, móvil, cloud e inteligencia artificial que aplicamos cada día."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group cm-surface overflow-hidden flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className={`h-2.5 bg-gradient-to-r ${post.gradient}`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="rounded-full bg-violet-50 dark:bg-violet-600/15 px-2.5 py-0.5 font-semibold text-violet-700 dark:text-violet-300">
                        {post.category}
                      </span>
                      <span className="text-zinc-400">{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                      <span className="font-medium text-zinc-600 dark:text-zinc-300">
                        {post.author.name}
                      </span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/blog" className="cm-action cm-action-secondary">
              Leer todos los artículos
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeader
              badge="FAQ"
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
