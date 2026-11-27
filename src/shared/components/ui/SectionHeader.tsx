interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
