import { Link } from 'react-router';
import { ArrowLeftIcon } from '@/shared/components/ui/Icons';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <div className="cm-surface p-10">
        <span className="inline-flex rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-600/10 px-3.5 py-1 text-xs font-bold text-violet-700 dark:text-violet-300">
          404
        </span>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
          Página no encontrada
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          La ruta que intentas visitar no existe o cambió de dirección.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="cm-action cm-action-primary">
            <ArrowLeftIcon />
            Volver al inicio
          </Link>
          <Link to="/contacto" className="cm-action cm-action-secondary">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
