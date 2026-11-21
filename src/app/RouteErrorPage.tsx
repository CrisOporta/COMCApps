import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { BrandLogo } from '@/shared/components/ui/BrandLogo';

export function RouteErrorPage() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = isRouteErrorResponse(error)
    ? error.statusText || 'Ha ocurrido un error inesperado.'
    : error instanceof Error
      ? error.message
      : 'No pudimos cargar esta sección.';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfbfb] dark:bg-[#030303] px-4 text-center">
      <div className="mb-8">
        <BrandLogo size="lg" />
      </div>
      <div className="cm-surface max-w-md w-full p-8">
        <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          Error {status}
        </span>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
          Algo salió mal
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {message}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="cm-action cm-action-primary">
            Volver al inicio
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cm-action cm-action-secondary"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}
