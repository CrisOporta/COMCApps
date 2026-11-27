import { useEffect, useState } from 'react';
import { cmsApi, type ContactSubmissionDTO } from '@/shared/lib/cmsApi';
import { MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactSubmissionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setMessages(await cmsApi.getContacts());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error cargando mensajes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    cmsApi
      .getContacts()
      .then(data => {
        if (active) setMessages(data);
      })
      .catch(err => {
        if (active) toast.error(err instanceof Error ? err.message : 'Error cargando mensajes.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Mensajes y Cotizaciones</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Solicitudes recibidas desde el formulario de contacto de COMCApps.
        </p>
      </div>

      {loading ? (
        <div className="cm-surface p-10 text-center text-sm text-zinc-500">Cargando bandeja...</div>
      ) : messages.length === 0 ? (
        <div className="cm-surface p-10 text-center text-sm text-zinc-500">No hay mensajes recibidos aún.</div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div
              key={m.id}
              className={`cm-surface p-5 ${!m.isRead ? 'border-violet-400 dark:border-violet-600' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{m.fullName}</h3>
                    <span className="rounded-full bg-violet-100 dark:bg-violet-600/20 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 dark:text-violet-300">
                      {m.service}
                    </span>
                    {m.isResolved && (
                      <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        Atendido
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {m.email} {m.phone ? `· ${m.phone}` : ''} {m.company ? `· ${m.company}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await cmsApi.toggleContactResolved(m.id);
                      await load();
                    }}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold hover:border-emerald-500 cursor-pointer"
                  >
                    {m.isResolved ? 'Reabrir' : 'Marcar atendido'}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await cmsApi.deleteContact(m.id);
                      toast.info('Mensaje eliminado.');
                      await load();
                    }}
                    className="rounded-xl p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    <MaterialIcon name="delete" className="text-[16px]" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
