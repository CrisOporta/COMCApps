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
      <span
        className={`${iconSize} rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-sm shadow-violet-600/25 shrink-0`}
        aria-hidden="true"
      >
        <svg className="size-4/6" viewBox="0 0 64 64" fill="none">
          <path
            d="M22 20L11 32L22 44"
            stroke="white"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 20L53 32L42 44"
            stroke="white"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36.5 16L27.5 48"
            stroke="#c7d2fe"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showName && (
        <span className={`${textSize} font-bold tracking-tight text-zinc-900 dark:text-white`}>
          COMC<span className="text-violet-600 dark:text-violet-400">Apps</span>
        </span>
      )}
      {!showName && <span className="sr-only">{COMPANY.name}</span>}
    </span>
  );
}
