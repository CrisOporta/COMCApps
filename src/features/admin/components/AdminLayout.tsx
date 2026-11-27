import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { cmsApi, getAdminToken, getAdminUser } from '@/shared/lib/cmsApi';
import { BrandLogo } from '@/shared/components/ui/BrandLogo';
import { CloseIcon, ExternalLinkIcon, MaterialIcon, MenuIcon } from '@/shared/components/ui/Icons';
import { useTheme } from '@/shared/hooks/useTheme';
import { toast } from '@/shared/lib/toast';

const SIDEBAR_ITEMS = [
  { to: '/admin', label: 'Escritorio', icon: 'dashboard', end: true },
  { to: '/admin/builder', label: 'Constructor Visual', icon: 'view_quilt', end: false },
  { to: '/admin/local-services', label: 'Servicios Locales', icon: 'storefront', end: false },
  { to: '/admin/software-services', label: 'Servicios Software', icon: 'code', end: false },
  { to: '/admin/projects', label: 'Proyectos', icon: 'rocket_launch', end: false },
  { to: '/admin/team', label: 'Equipo', icon: 'group', end: false },
  { to: '/admin/blog', label: 'Blog', icon: 'article', end: false },
  { to: '/admin/media', label: 'Medios (R2)', icon: 'photo_library', end: false },
  { to: '/admin/messages', label: 'Mensajes', icon: 'mail', end: false },
  { to: '/admin/settings', label: 'Ajustes del Sitio', icon: 'settings', end: false },
] as const;

export default function AdminLayout() {
  const navigate = useNavigate();
  const { toggle, isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getAdminUser();

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (!getAdminToken()) return null;

  const handleLogout = async () => {
    await cmsApi.logout();
    toast.info('Sesión cerrada correctamente.');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#f6f7f9] dark:bg-[#050507] text-zinc-800 dark:text-zinc-200">
      {/* Sidebar estilo WordPress moderno (fijo a la altura de la pantalla) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-zinc-950 text-zinc-200 border-r border-zinc-800 flex flex-col shrink-0 transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-800/80">
          <Link to="/admin" className="flex items-center gap-2">
            <img src="/logo.png" alt="COMCApps" className="size-8 rounded-lg object-contain" />
            <div>
              <span className="text-sm font-bold text-white block leading-none">COMCApps CMS</span>
              <span className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">
                Admin Studio
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-zinc-400 hover:text-white cursor-pointer"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {SIDEBAR_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-950/50'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`
              }
            >
              <MaterialIcon name={item.icon} className="text-[19px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="size-8 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 flex items-center justify-center text-xs font-bold">
              {user?.firstName?.[0] ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName ?? 'Administrador'}</p>
              <p className="text-[11px] text-zinc-400 truncate">{user?.email ?? 'admin@comcapps.com'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-rose-950/60 hover:border-rose-800/60 hover:text-rose-200 px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
          >
            <MaterialIcon name="logout" className="text-[16px]" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Backdrop móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden inline-flex items-center justify-center size-9 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 cursor-pointer"
            >
              <MenuIcon className="size-4" />
            </button>
            <div className="lg:hidden">
              <BrandLogo size="sm" />
            </div>
            <span className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <span className="size-2 rounded-full bg-emerald-500" />
              Conectado a PostgreSQL (COMCApps) & Cloudflare R2 (comcapps)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 cursor-pointer"
            >
              {isDark ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 hover:bg-violet-700 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors"
            >
              Ver sitio público
              <ExternalLinkIcon className="size-3.5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
