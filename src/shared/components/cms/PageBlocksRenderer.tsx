import { Link } from 'react-router';
import type { CmsPageBlockDTO } from '@/shared/lib/cmsApi';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';

interface PageBlocksRendererProps {
  blocks: CmsPageBlockDTO[];
}

function safeParse(json: string): Record<string, unknown> {
  try {
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function PageBlocksRenderer({ blocks }: PageBlocksRendererProps) {
  const visibleBlocks = blocks
    .filter(b => b.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (visibleBlocks.length === 0) return null;

  return (
    <div className="space-y-0">
      {visibleBlocks.map((block, idx) => {
        const cfg = safeParse(block.configJson);

        switch (block.blockType) {
          case 'Hero':
            return (
              <section
                key={block.id ?? `blk-${idx}`}
                className="relative overflow-hidden border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-violet-50 via-white to-white dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950"
              >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                      {(cfg.title as string) || 'Título del bloque Hero'}
                    </h2>
                    <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      {(cfg.subtitle as string) || ''}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {typeof cfg.ctaText === 'string' && cfg.ctaText && (
                        <Link to={(cfg.ctaUrl as string) || '/contacto'} className="cm-action cm-action-primary">
                          {cfg.ctaText}
                          <ArrowRightIcon />
                        </Link>
                      )}
                      {typeof cfg.secondaryCtaText === 'string' && cfg.secondaryCtaText && (
                        <Link to={(cfg.secondaryCtaUrl as string) || '/local'} className="cm-action cm-action-secondary">
                          {cfg.secondaryCtaText}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xl bg-zinc-900">
                      <img
                        src={(cfg.imageUrl as string) || '/banner.png'}
                        alt={(cfg.title as string) || 'COMCApps'}
                        className="w-full h-64 sm:h-72 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'StatsBar': {
            const items = Array.isArray(cfg.items)
              ? (cfg.items as Array<{ value: string; label: string }>)
              : [];
            return (
              <section
                key={block.id ?? `blk-${idx}`}
                className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40"
              >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {items.map((st, i) => (
                    <div key={i}>
                      <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{st.value}</p>
                      <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{st.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'FeatureGrid': {
            const features = Array.isArray(cfg.items)
              ? (cfg.items as Array<{ icon?: string; title: string; desc: string }>)
              : [];
            return (
              <section key={block.id ?? `blk-${idx}`} className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                    {(cfg.title as string) || 'Características'}
                  </h2>
                  {typeof cfg.subtitle === 'string' && cfg.subtitle && (
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{cfg.subtitle}</p>
                  )}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {features.map((f, i) => (
                    <div key={i} className="cm-surface p-6">
                      <div className="size-10 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
                        <MaterialIcon name={f.icon || 'check_circle'} className="text-[20px]" />
                      </div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">{f.title}</h3>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'SplitContent': {
            const bullets = Array.isArray(cfg.bullets) ? (cfg.bullets as string[]) : [];
            const imageLeft = Boolean(cfg.imageLeft);
            return (
              <section key={block.id ?? `blk-${idx}`} className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
                      <img
                        src={(cfg.imageUrl as string) || '/banner.png'}
                        alt={(cfg.title as string) || 'Sección'}
                        className="w-full h-72 sm:h-80 object-cover"
                      />
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                      {(cfg.title as string) || 'Sección destacada'}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {(cfg.body as string) || ''}
                    </p>
                    {bullets.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <CheckIcon className="size-4 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          case 'ImageGallery': {
            const images = Array.isArray(cfg.images) ? (cfg.images as string[]) : [];
            return (
              <section key={block.id ?? `blk-${idx}`} className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {(cfg.title as string) || 'Galería'}
                </h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((url, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-56">
                      <img src={url} alt={`Galería ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case 'CtaBanner':
            return (
              <section
                key={block.id ?? `blk-${idx}`}
                className="bg-gradient-to-br from-violet-600 to-violet-900 text-white"
              >
                <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    {(cfg.title as string) || '¿Listo para comenzar?'}
                  </h2>
                  <p className="mt-3 text-violet-100/90 max-w-2xl mx-auto">
                    {(cfg.subtitle as string) || ''}
                  </p>
                  <div className="mt-7">
                    <Link
                      to={(cfg.buttonUrl as string) || '/contacto'}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-violet-700 hover:bg-zinc-100 px-7 py-3 text-sm font-semibold shadow-lg"
                    >
                      {(cfg.buttonText as string) || 'Contactar'}
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </section>
            );

          case 'RichText':
          default:
            return (
              <section key={block.id ?? `blk-${idx}`} className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                {typeof cfg.title === 'string' && cfg.title && (
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{cfg.title}</h2>
                )}
                <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {(cfg.body as string) || ''}
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
