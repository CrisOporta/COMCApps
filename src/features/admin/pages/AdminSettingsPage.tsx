import { useEffect, useState, type FormEvent } from 'react';
import { cmsApi, type SiteSettingDTO } from '@/shared/lib/cmsApi';
import { toast } from '@/shared/lib/toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingDTO | null>(null);
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPwd, setChangingPwd] = useState(false);

  useEffect(() => {
    cmsApi
      .getSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await cmsApi.updateSettings(settings);
      setSettings(updated);
      toast.success('Ajustes del sitio guardados.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error guardando ajustes.');
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e: FormEvent) => {
    e.preventDefault();
    setChangingPwd(true);
    try {
      await cmsApi.changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Contraseña de administrador actualizada.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo cambiar la contraseña.');
    } finally {
      setChangingPwd(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Ajustes del Sitio</h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Actualiza los datos de COMCApps, teléfonos, WhatsApp, dirección física, horarios y enlaces de Google Maps.
        </p>
      </div>

      {settings && (
        <form onSubmit={handleSave} className="cm-surface p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                ['companyName', 'Nombre comercial'],
                ['legalName', 'Razón social'],
                ['tagline', 'Eslogan'],
                ['email', 'Correo principal'],
                ['localEmail', 'Correo sucursal local'],
                ['phonePrimary', 'Teléfono principal'],
                ['whatsAppNumber', 'Número WhatsApp (sin +)'],
                ['schedule', 'Horarios de atención'],
                ['addressLine1', 'Dirección línea 1'],
                ['addressLine2', 'Dirección línea 2'],
                ['mapsEmbedUrl', 'URL Embed de Google Maps'],
                ['mapsDirectionsUrl', 'URL Cómo Llegar (Google Maps)'],
                ['facebookUrl', 'Facebook URL'],
                ['instagramUrl', 'Instagram URL'],
                ['linkedinUrl', 'LinkedIn URL'],
                ['githubUrl', 'GitHub URL'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={String(settings[key] ?? '')}
                  onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={saving} className="cm-action cm-action-primary text-xs">
              {saving ? 'Guardando...' : 'Guardar ajustes globales'}
            </button>
          </div>
        </form>
      )}

      <form onSubmit={handlePassword} className="cm-surface p-6 space-y-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white">Seguridad del Administrador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
              Contraseña actual
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={changingPwd} className="cm-action cm-action-secondary text-xs">
            {changingPwd ? 'Actualizando...' : 'Cambiar contraseña'}
          </button>
        </div>
      </form>
    </div>
  );
}
