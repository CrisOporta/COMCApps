import { useEffect, useState } from 'react';
import { cmsApi, type MediaAssetDTO } from '@/shared/lib/cmsApi';
import { MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAssetDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try {
      setAssets(await cmsApi.getMediaLibrary());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error cargando biblioteca R2.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    cmsApi
      .getMediaLibrary()
      .then(data => {
        if (active) setAssets(data);
      })
      .catch(err => {
        if (active) toast.error(err instanceof Error ? err.message : 'Error cargando biblioteca R2.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      await cmsApi.uploadMediaFiles(Array.from(files), 'library');
      toast.success('Imágenes subidas al bucket R2 comcapps.');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al subir archivos.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Biblioteca de Medios (R2: comcapps)</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Todas las imágenes subidas a Cloudflare R2. Copia cualquier URL para usarla en bloques o registros.
          </p>
        </div>

        <label className="cm-action cm-action-primary text-xs">
          <MaterialIcon name="cloud_upload" className="text-[17px]" />
          {uploading ? 'Subiendo...' : 'Subir imágenes a R2'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => void handleUpload(e.target.files)}
          />
        </label>
      </div>

      {loading ? (
        <div className="cm-surface p-10 text-center text-sm text-zinc-500">Cargando medios...</div>
      ) : assets.length === 0 ? (
        <div className="cm-surface p-10 text-center text-sm text-zinc-500">No hay archivos en la biblioteca aún.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map(a => (
            <div key={a.id} className="cm-surface overflow-hidden flex flex-col">
              <div className="relative h-36 bg-zinc-100 dark:bg-zinc-800">
                <img src={a.url} alt={a.altText || a.fileName} className="w-full h-full object-cover" />
                {a.isFeatured && (
                  <span className="absolute top-2 left-2 rounded-full bg-violet-600 text-white px-2 py-0.5 text-[10px] font-bold">
                    Destacada
                  </span>
                )}
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{a.fileName}</p>
                <p className="text-[10px] uppercase tracking-wide text-zinc-400">{a.entityType}</p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(a.url);
                      toast.info('URL copiada al portapapeles.');
                    }}
                    className="flex-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-violet-600 hover:text-white py-1.5 text-[11px] font-semibold cursor-pointer transition-colors"
                  >
                    Copiar URL
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await cmsApi.deleteMedia(a.id);
                      toast.info('Archivo eliminado.');
                      await load();
                    }}
                    className="rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 p-1.5 cursor-pointer"
                  >
                    <MaterialIcon name="delete" className="text-[15px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
