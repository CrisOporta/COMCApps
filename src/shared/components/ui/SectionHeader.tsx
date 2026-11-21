interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-600/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide mb-4">
        <span className="size-1.5 rounded-full bg-violet-500" aria-hidden="true" />
        {badge}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
