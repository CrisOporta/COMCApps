import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { BLOG_CATEGORIES, BLOG_POSTS, type BlogCategory } from '../data/blogData';
import { CtaBanner } from '@/features/home/components/CtaBanner';
import { Blob } from '@/shared/components/ui/Blob';
import { Reveal } from '@/shared/components/ui/Reveal';
import { ArrowRightIcon, SearchIcon } from '@/shared/components/ui/Icons';

export default function BlogPage() {
  const [category, setCategory] = useState<'Todos' | BlogCategory>('Todos');
  const [search, setSearch] = useState('');

  const featured = BLOG_POSTS.find(p => p.featured) ?? BLOG_POSTS[0];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BLOG_POSTS.filter(post => {
      const matchesCat = category === 'Todos' || post.category === category;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q))
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
            Blog de Ingeniería
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.1]">
            Artículos, guías y{' '}
            <span className="text-violet-600 dark:text-violet-400">arquitectura real</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Compartimos lo que aprendemos construyendo aplicaciones web, móviles, cloud e IA para producción.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* ── Artículo destacado ──────────────────────────────────────── */}
        {category === 'Todos' && !search.trim() && (
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group mb-12 block overflow-hidden rounded-3xl border border-violet-200 dark:border-violet-500/30 bg-gradient-to-br from-violet-50/80 via-white to-white dark:from-violet-950/35 dark:via-zinc-900 dark:to-zinc-900 p-6 sm:p-10 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
                <span className="rounded-full bg-violet-600 px-3 py-1 font-bold text-white uppercase tracking-wide">
                  Destacado
                </span>
                <span className="rounded-full bg-violet-100 dark:bg-violet-600/20 px-3 py-1 font-semibold text-violet-700 dark:text-violet-300">
                  {featured.category}
                </span>
                <span className="text-zinc-400">
                  {featured.publishedAt} · {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors max-w-3xl leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="size-9 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                    {featured.author.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {featured.author.name}
                    </p>
                    <p className="text-xs text-zinc-400">{featured.author.role}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
                  Leer artículo completo
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* ── Filtros + Buscador ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map(cat => (
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
              placeholder="Buscar artículos o etiquetas..."
              aria-label="Buscar en el blog"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-10 pr-4 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* ── Grid de artículos ───────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="cm-surface p-12 text-center">
            <p className="text-base font-semibold text-zinc-900 dark:text-white">
              No hay artículos que coincidan con tu búsqueda
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('Todos');
                setSearch('');
              }}
              className="mt-4 cm-action cm-action-secondary"
            >
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
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

                    <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {post.author.name}
                      </span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBanner
        title="¿Tienes un reto técnico en mente?"
        subtitle="Nuestro equipo de arquitectura puede ayudarte a diseñar la mejor solución para tu negocio."
      />
    </div>
  );
}
