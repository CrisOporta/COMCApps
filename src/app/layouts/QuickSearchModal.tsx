import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { SERVICES } from '@/features/services/data/servicesData';
import { LOCAL_SERVICES } from '@/features/local/data/localData';
import { PROJECTS } from '@/features/projects/data/projectsData';
import { BLOG_POSTS } from '@/features/blog/data/blogData';
import { TEAM_MEMBERS } from '@/features/team/data/teamData';
import { CloseIcon, MaterialIcon, SearchIcon } from '@/shared/components/ui/Icons';

interface QuickSearchModalProps {
  open: boolean;
  onClose: () => void;
}

interface SearchEntry {
  id: string;
  group: 'Servicios' | 'Local' | 'Proyectos' | 'Blog' | 'Equipo' | 'Navegación';
  title: string;
  subtitle: string;
  to: string;
  icon: string;
}

export function QuickSearchModal({ open, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allEntries = useMemo<SearchEntry[]>(() => {
    return [
      {
        id: 'nav-home',
        group: 'Navegación',
        title: 'Inicio',
        subtitle: 'Resumen general de COMCApps',
        to: '/',
        icon: 'home',
      },
      {
        id: 'nav-estimator',
        group: 'Navegación',
        title: 'Estimador de Proyectos',
        subtitle: 'Calcula tiempo y alcance estimado al instante',
        to: '/servicios#estimador',
        icon: 'calculate',
      },
      {
        id: 'nav-contact',
        group: 'Navegación',
        title: 'Solicitar Cotización / Contacto',
        subtitle: 'Habla con un arquitecto de soluciones',
        to: '/contacto',
        icon: 'mail',
      },
      {
        id: 'nav-local',
        group: 'Navegación',
        title: 'Sucursal Local y Servicios Físicos',
        subtitle: 'Reparación de PC, impresoras, Windows/Office, fotos carnet, CCTV y redes',
        to: '/local',
        icon: 'storefront',
      },
      ...LOCAL_SERVICES.map(item => ({
        id: `local-${item.id}`,
        group: 'Local' as const,
        title: item.title,
        subtitle: `${item.category} · ${item.shortDesc}`,
        to: `/local#${item.id}`,
        icon: item.icon,
      })),
      ...SERVICES.map(s => ({
        id: `srv-${s.id}`,
        group: 'Servicios' as const,
        title: s.title,
        subtitle: s.shortDesc,
        to: `/servicios#${s.id}`,
        icon: s.icon,
      })),
      ...PROJECTS.map(p => ({
        id: `prj-${p.slug}`,
        group: 'Proyectos' as const,
        title: p.title,
        subtitle: `${p.category} · ${p.tagline}`,
        to: `/proyectos/${p.slug}`,
        icon: p.icon,
      })),
      ...BLOG_POSTS.map(b => ({
        id: `blog-${b.slug}`,
        group: 'Blog' as const,
        title: b.title,
        subtitle: `${b.category} · ${b.readTime}`,
        to: `/blog/${b.slug}`,
        icon: 'article',
      })),
      ...TEAM_MEMBERS.map(m => ({
        id: `team-${m.id}`,
        group: 'Equipo' as const,
        title: m.name,
        subtitle: `${m.role} · ${m.department}`,
        to: `/equipo#${m.id}`,
        icon: 'person',
      })),
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allEntries.slice(0, 8);
    return allEntries
      .filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [allEntries, query]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  if (!open) return null;

  const safeActiveIdx = activeIdx >= results.length ? 0 : activeIdx;

  const handleSelect = (entry: SearchEntry) => {
    onClose();
    setQuery('');
    navigate(entry.to);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => (results.length === 0 ? 0 : (i + 1) % results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => (results.length === 0 ? 0 : (i - 1 + results.length) % results.length));
    } else if (e.key === 'Enter' && results[safeActiveIdx]) {
      e.preventDefault();
      handleSelect(results[safeActiveIdx]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-zinc-950/50 backdrop-blur-xs p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda rápida en COMCApps"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 px-4 py-3">
          <SearchIcon className="size-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Buscar servicios, proyectos, artículos o equipo..."
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 !border-0 !h-auto !min-h-0 py-1"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar buscador"
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No encontramos resultados para «{query}».
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((entry, idx) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => handleSelect(entry)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                      idx === safeActiveIdx
                        ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-violet-100'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span
                      className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${
                        idx === safeActiveIdx
                          ? 'bg-violet-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      <MaterialIcon name={entry.icon} className="text-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">{entry.title}</span>
                        <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 shrink-0">
                          {entry.group}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {entry.subtitle}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 px-4 py-2 text-[11px] text-zinc-400">
          <span>Usa ↑ ↓ para navegar y Enter para abrir</span>
          <span>ESC para cerrar</span>
        </div>
      </div>
    </div>
  );
}
