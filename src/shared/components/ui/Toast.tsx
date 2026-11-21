import { useEffect, useState, useCallback } from 'react';
import { toast, type ToastItem } from '@/shared/lib/toast';

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notificaciones"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map(item => (
        <ToastCard key={item.id} item={item} onDismiss={() => toast.dismiss(item.id)} />
      ))}
    </aside>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss();
    }, 300);
  }, [onDismiss]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isPaused || isExiting) return;
    const duration = item.duration ?? 4500;
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [isPaused, isExiting, handleDismiss, item.duration]);

  const config = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      border: 'border-emerald-200 dark:border-emerald-800/60 shadow-emerald-950/5',
      badgeBg:
        'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/60',
      titleColor: 'text-emerald-900 dark:text-emerald-200',
      messageColor: 'text-emerald-800 dark:text-emerald-300',
      closeBtn:
        'text-emerald-600 hover:text-emerald-950 dark:text-emerald-400 dark:hover:text-emerald-100 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/50',
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      border: 'border-rose-200 dark:border-rose-800/60 shadow-rose-950/5',
      badgeBg:
        'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/60',
      titleColor: 'text-rose-900 dark:text-rose-200',
      messageColor: 'text-rose-800 dark:text-rose-300',
      closeBtn:
        'text-rose-600 hover:text-rose-950 dark:text-rose-400 dark:hover:text-rose-100 hover:bg-rose-100/70 dark:hover:bg-rose-900/50',
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      border: 'border-amber-200 dark:border-amber-800/60 shadow-amber-950/5',
      badgeBg:
        'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/60',
      titleColor: 'text-amber-900 dark:text-amber-200',
      messageColor: 'text-amber-800 dark:text-amber-300',
      closeBtn:
        'text-amber-600 hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-100 hover:bg-amber-100/70 dark:hover:bg-amber-900/50',
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-sky-50 dark:bg-sky-950/60',
      border: 'border-sky-200 dark:border-sky-800/60 shadow-sky-950/5',
      badgeBg:
        'bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/60',
      titleColor: 'text-sky-900 dark:text-sky-200',
      messageColor: 'text-sky-800 dark:text-sky-300',
      closeBtn:
        'text-sky-600 hover:text-sky-950 dark:text-sky-400 dark:hover:text-sky-100 hover:bg-sky-100/70 dark:hover:bg-sky-900/50',
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  }[item.type];

  return (
    <div
      role="status"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={[
        'pointer-events-auto relative overflow-hidden rounded-2xl border backdrop-blur-md',
        config.bg,
        'shadow-xl dark:shadow-2xl dark:shadow-black/60',
        'p-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        config.border,
        isExiting
          ? 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          : isMounted
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            'size-8 rounded-xl border flex items-center justify-center shrink-0',
            config.badgeBg,
          ].join(' ')}
        >
          {config.icon}
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <p className={['text-xs font-bold uppercase tracking-wider', config.titleColor].join(' ')}>
            {item.title}
          </p>
          <p className={['text-xs font-medium mt-0.5 leading-snug break-words', config.messageColor].join(' ')}>
            {item.message}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Cerrar notificación"
          className={['p-1 rounded-lg transition-colors shrink-0 cursor-pointer', config.closeBtn].join(' ')}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
