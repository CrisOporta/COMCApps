import { COMPANY } from '@/shared/config/company';

interface BrandLogoProps {
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ showName = true, size = 'md' }: BrandLogoProps) {
  const iconSize = size === 'sm' ? 'size-7' : size === 'lg' ? 'size-10' : 'size-8';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <img
        src="/logo.png"
        alt={COMPANY.name}
        className={`${iconSize} rounded-xl object-contain shrink-0`}
      />
      {showName && (
        <span className={`${textSize} font-bold tracking-tight text-zinc-900 dark:text-white`}>
          COMC<span className="text-violet-600 dark:text-violet-400">Apps</span>
        </span>
      )}
      {!showName && <span className="sr-only">{COMPANY.name}</span>}
    </span>
  );
}
