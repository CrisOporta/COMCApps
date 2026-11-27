import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { cmsApi, getAdminToken } from '@/shared/lib/cmsApi';
import { BrandLogo } from '@/shared/components/ui/BrandLogo';
import { ArrowRightIcon, MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

export default function HiddenLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@comcapps.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getAdminToken()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await cmsApi.login(email, password);
      toast.success('Bienvenido al panel administrador de COMCApps.');
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfb] dark:bg-[#030303] px-4 py-12">
      <div className="w-full max-w-md cm-surface overflow-hidden">
        <div className="relative h-32 bg-zinc-950 overflow-hidden">
          <img
            src="/banner.png"
            alt="COMCApps Admin"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-3 left-6 flex items-center gap-2 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/90 px-2.5 py-0.5 text-[11px] font-semibold">
              <MaterialIcon name="shield" className="text-[14px]" />
              Acceso Privado CMS
            </span>
          </div>
        </div>

        <div className="p-7">
          <div className="mb-6">
            <BrandLogo size="lg" />
            <h1 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
              Administración del Sitio
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Inicia sesión con tu cuenta de administrador para personalizar vistas, servicios y medios.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-rose-200 dark:border-rose-800/70 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2.5 text-xs font-medium text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Correo de administrador
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@comcapps.com"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cm-action cm-action-primary mt-2"
            >
              {loading ? 'Verificando acceso...' : 'Entrar al Panel CMS'}
              {!loading && <ArrowRightIcon />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
