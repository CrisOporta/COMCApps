import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { ArrowLeftIcon, ArrowRightIcon, MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { items: blogPosts, loading } = useBlogPosts();
  const [readProgress, setReadProgress] = useState(0);
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setReadProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading && !post) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 space-y-6 animate-pulse">
        <div className="h-48 rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="cm-surface p-10">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Artículo no encontrado
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            El artículo que buscas no existe o fue movido.
          </p>
          <Link to="/blog" className="mt-6 cm-action cm-action-primary">
            <ArrowLeftIcon /> Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      toast.success('Enlace del artículo copiado al portapapeles.');
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code).then(() => {
      toast.info('Fragmento de código copiado.');
    });
  };

  return (
    <div>
      {/* Barra sutil de progreso de lectura */}
      <div className="fixed top-16 left-0 right-0 z-40 h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full bg-violet-600 transition-all duration-100"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* ── Cabecera del artículo ────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline mb-6"
          >
            <ArrowLeftIcon className="size-3.5" />
            Volver al blog
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-600/10 px-3 py-1 font-semibold text-violet-700 dark:text-violet-300">
              {post.category}
            </span>
            <span className="text-zinc-400">{post.publishedAt}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-400">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/70 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                {post.author.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              <MaterialIcon name="share" className="text-[16px]" />
              Compartir enlace
            </button>
          </div>
        </div>
      </header>

      {/* ── Contenido con índice lateral (patrón DocumentationPage) ─── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block">
            <nav aria-label="Contenido del artículo" className="sticky top-24 space-y-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Contenido
              </p>
              {post.sections.map((section, idx) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-violet-50 hover:text-violet-600 dark:text-zinc-400 dark:hover:bg-violet-900/20 dark:hover:text-violet-400 transition-colors"
                >
                  <span className="text-zinc-400 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{section.heading}</span>
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-8">
            {post.featuredImageUrl && (
              <div className="cm-surface overflow-hidden">
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  className="w-full max-h-[420px] object-cover"
                />
                {post.gallery && post.gallery.length > 1 && (
                  <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {post.gallery.map(img => (
                      <a
                        key={img.id}
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 block"
                      >
                        <img
                          src={img.url}
                          alt={img.altText || post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {post.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 cm-surface p-6 sm:p-8"
              >
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {section.paragraphs.map(p => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {section.codeSnippet && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
                    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-[11px] text-zinc-400">
                      <span className="uppercase font-mono">{section.codeSnippet.lang}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(section.codeSnippet!.code)}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Copiar código
                      </button>
                    </div>
                    <pre className="p-4 text-xs sm:text-sm overflow-x-auto font-mono leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {section.callout && (
                  <div className="mt-5 rounded-xl border border-violet-200 dark:border-violet-800/60 bg-violet-50/80 dark:bg-violet-950/35 px-4 py-3.5 text-sm text-violet-900 dark:text-violet-200">
                    {section.callout}
                  </div>
                )}
              </section>
            ))}

            {/* Etiquetas */}
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Artículos relacionados */}
            <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                Sigue leyendo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(rel => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="group cm-surface p-5 hover:border-violet-300 dark:hover:border-violet-700 transition-all"
                  >
                    <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                      {rel.category} · {rel.readTime}
                    </span>
                    <h4 className="mt-1.5 text-sm font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {rel.title}
                    </h4>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-violet-600">
                      Leer artículo <ArrowRightIcon className="size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
