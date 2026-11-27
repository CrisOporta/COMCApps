import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { cmsApi, type ContactSubmissionDTO } from '@/shared/lib/cmsApi';
import { MaterialIcon } from '@/shared/components/ui/Icons';

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [messages, setMessages] = useState<ContactSubmissionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsApi
      .getDashboard()
      .then(data => {
        setCounts(data.counts);
        setMessages(data.recentMessages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Páginas CMS', value: counts.pages ?? 0, icon: 'view_quilt', to: '/admin/builder' },
    { label: 'Servicios Locales', value: counts.localServices ?? 0, icon: 'storefront', to: '/admin/local-services' },
    { label: 'Servicios Software', value: counts.softwareServices ?? 0, icon: 'code', to: '/admin/software-services' },
    { label: 'Proyectos', value: counts.projects ?? 0, icon: 'rocket_launch', to: '/admin/projects' },
    { label: 'Equipo', value: counts.teamMembers ?? 0, icon: 'group', to: '/admin/team' },
    { label: 'Artículos Blog', value: counts.blogPosts ?? 0, icon: 'article', to: '/admin/blog' },
    { label: 'Archivos en R2', value: counts.mediaAssets ?? 0, icon: 'photo_library', to: '/admin/media' },
    { label: 'Mensajes sin leer', value: counts.unreadMessages ?? 0, icon: 'mail', to: '/admin/messages' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Escritorio COMCApps</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Gestiona todas las vistas, registros, imágenes en Cloudflare R2 y cotizaciones desde un solo lugar.
          </p>
        </div>
        <Link to="/admin/builder" className="cm-action cm-action-primary text-xs">
          <MaterialIcon name="view_quilt" className="text-[16px]" />
          Abrir Constructor Drag & Drop
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Link
            key={c.label}
            to={c.to}
            className="cm-surface p-5 hover:border-violet-300 dark:hover:border-violet-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="size-10 rounded-xl bg-violet-50 dark:bg-violet-600/15 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <MaterialIcon name={c.icon} className="text-[20px]" />
              </span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                {loading ? '—' : c.value}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-zinc-600 dark:text-zinc-300 group-hover:text-violet-600">
              {c.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="cm-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">Últimas cotizaciones recibidas</h2>
          <Link to="/admin/messages" className="text-xs font-semibold text-violet-600 hover:underline">
            Ver todos →
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500">Aún no hay mensajes de contacto registrados.</p>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {messages.map(m => (
              <div key={m.id} className="py-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!m.isRead && <span className="size-2 rounded-full bg-violet-600" />}
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{m.fullName}</p>
                    <span className="text-xs text-zinc-400">· {m.service}</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">{m.message}</p>
                </div>
                <span className="text-[11px] text-zinc-400 shrink-0">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
