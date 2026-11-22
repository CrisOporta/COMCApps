import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { COMPANY } from '@/shared/config/company';
import { useTheme } from '@/shared/hooks/useTheme';
import { BrandLogo } from '@/shared/components/ui/BrandLogo';
import {
  ArrowRightIcon,
  CloseIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MoonIcon,
  PhoneIcon,
  SearchIcon,
  SunIcon,
} from '@/shared/components/ui/Icons';
import { QuickSearchModal } from './QuickSearchModal';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Servicios', end: false },
  { to: '/local', label: 'Local', end: false },
  { to: '/proyectos', label: 'Proyectos', end: false },
  { to: '/equipo', label: 'Equipo', end: false },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/contacto', label: 'Contacto', end: false },
] as const;

export default function MainLayout() {
  const { toggle, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      {/* ── Navbar sticky glassmorphism (estilo OptimizaLey) ─────────── */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <BrandLogo />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-50 text-violet-700 dark:bg-violet-600/15 dark:text-violet-300 font-semibold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar en el sitio"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all h-9 cursor-pointer"
            >
              <SearchIcon className="size-3.5" />
              <span className="hidden lg:inline">Buscar</span>
              <kbd className="hidden lg:inline rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all h-9 cursor-pointer"
            >
              {isDark ? (
                <>
                  <SunIcon className="size-3.5" />
                  <span className="hidden sm:inline">Claro</span>
                </>
              ) : (
                <>
                  <MoonIcon className="size-3.5" />
                  <span className="hidden sm:inline">Oscuro</span>
                </>
              )}
            </button>

            <Link
              to="/contacto"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 px-4 py-2 text-xs font-semibold text-white transition-colors shadow-sm shadow-violet-200 dark:shadow-violet-950/40 h-9"
            >
              Cotizar proyecto
              <ArrowRightIcon className="size-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 size-9 text-zinc-600 dark:text-zinc-300 cursor-pointer"
            >
              {mobileMenuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ───────────────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 shadow-lg">
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-violet-50 text-violet-700 dark:bg-violet-600/15 dark:text-violet-300 font-semibold'
                        : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 py-2.5 text-sm font-semibold text-white"
              >
                Iniciar un proyecto
                <ArrowRightIcon className="size-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ── Main Route View ──────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer corporativo (patrón OptimizaLey) ─────────────────── */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800/80 bg-[#fbfbfb] dark:bg-[#030303]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <BrandLogo />
              </Link>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {COMPANY.shortDesc}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponibles para nuevos proyectos
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                Empresa
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/servicios" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Servicios y Capacidades
                  </Link>
                </li>
                <li>
                  <Link to="/local" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Sucursal Local y Servicios Físicos
                  </Link>
                </li>
                <li>
                  <Link to="/proyectos" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Portafolio de Proyectos
                  </Link>
                </li>
                <li>
                  <Link to="/equipo" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Equipo y Cultura
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Blog de Ingeniería
                  </Link>
                </li>
                <li>
                  <Link to="/servicios#estimador" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Estimador de Proyectos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                Contacto
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <MailIcon className="size-4 shrink-0" />
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY.phonePrimary.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    <PhoneIcon className="size-4 shrink-0" />
                    {COMPANY.phonePrimary}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-zinc-500 dark:text-zinc-400">
                  <MapPinIcon className="size-4 shrink-0 mt-0.5" />
                  <span>{COMPANY.location}</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                Legal y Redes
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/privacidad" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link to="/terminos" className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Términos de Uso
                  </Link>
                </li>
                <li>
                  <a
                    href={COMPANY.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-200/70 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Ingeniería de software con estándar de excelencia · {COMPANY.name}
            </p>
          </div>
        </div>
      </footer>

      <QuickSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
