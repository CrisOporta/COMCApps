import { useRef, useState } from 'react';
import { cmsApi, type MediaAssetDTO } from '@/shared/lib/cmsApi';
import { MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

interface EntityMediaManagerProps {
  entityType: string;
  entityId: number;
  media: MediaAssetDTO[];
  onChange: (updated: MediaAssetDTO[]) => void;
}

export function EntityMediaManager({
  entityType,
  entityId,
  media,
  onChange,
}: EntityMediaManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const reloadMedia = async () => {
    const fresh = await cmsApi.getEntityMedia(entityType, entityId);
    onChange(fresh);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) {
      toast.error('Selecciona archivos de imagen válidos (PNG, JPG, WebP).');
      return;
    }

    setUploading(true);
    try {
      await cmsApi.uploadMediaFiles(files, entityType, entityId, media.length === 0);
      await reloadMedia();
      toast.success(
        `${files.length} ${files.length === 1 ? 'imagen subida' : 'imágenes subidas'} al bucket R2 (comcapps).`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al subir imágenes.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAttachUrl = async () => {
    if (!externalUrl.trim()) return;
    setUploading(true);
    try {
      await cmsApi.attachMediaUrl(externalUrl.trim(), entityType, entityId, media.length === 0);
      setExternalUrl('');
      await reloadMedia();
      toast.success('Imagen externa vinculada a la galería.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo vincular la URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleSetFeatured = async (mediaId: number) => {
    try {
      await cmsApi.setFeaturedMedia(mediaId);
      await reloadMedia();
      toast.success('Imagen destacada actualizada (aparecerá en la card principal).');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al marcar como destacada.');
    }
  };

  const handleDelete = async (mediaId: number) => {
    try {
      await cmsApi.deleteMedia(mediaId);
      await reloadMedia();
      toast.info('Imagen eliminada del registro y del bucket.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar la imagen.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Galería de Imágenes (Bucket R2: comcapps)
          </h4>
          <p className="text-[11px] text-zinc-400">
            Sube varias imágenes y pulsa la estrella para elegir la imagen destacada de la card.
          </p>
        </div>
        <span className="rounded-full bg-violet-100 dark:bg-violet-600/20 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 dark:text-violet-300">
          {media.length} {media.length === 1 ? 'imagen' : 'imágenes'}
        </span>
      </div>

      {/* Zona Drag & Drop de subida múltiple */}
      <div
        onDragOver={e => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          void handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-5 text-center transition-colors cursor-pointer ${
          dragOver
            ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30'
            : 'border-zinc-200 dark:border-zinc-700 hover:border-violet-400 bg-zinc-50/70 dark:bg-zinc-950/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => void handleFiles(e.target.files)}
        />
        <MaterialIcon
          name={uploading ? 'hourglass_top' : 'cloud_upload'}
          className="text-[28px] text-violet-600 dark:text-violet-400"
        />
        <p className="mt-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
          {uploading
            ? 'Subiendo imágenes al bucket R2 comcapps...'
            : 'Arrastra aquí varias imágenes o haz clic para seleccionar'}
        </p>
        <p className="text-[11px] text-zinc-400 mt-0.5">PNG, JPG, WebP · Subida múltiple habilitada</p>
      </div>

      {/* O pegar URL externa */}
      <div className="flex gap-2">
        <input
          type="url"
          value={externalUrl}
          onChange={e => setExternalUrl(e.target.value)}
          placeholder="O pega una URL de imagen externa (https://...)"
          className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-900 dark:text-white"
        />
        <button
          type="button"
          disabled={uploading || !externalUrl.trim()}
          onClick={() => void handleAttachUrl()}
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-violet-600 hover:text-white hover:border-violet-600 px-3.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
        >
          Añadir URL
        </button>
      </div>

      {/* Grid de imágenes existentes */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map(img => (
            <div
              key={img.id}
              className={`group relative rounded-xl overflow-hidden border transition-all ${
                img.isFeatured
                  ? 'border-violet-500 ring-2 ring-violet-500/30'
                  : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || img.fileName}
                className="w-full h-28 object-cover bg-zinc-100 dark:bg-zinc-800"
              />

              {img.isFeatured && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  <MaterialIcon name="star" className="text-[12px]" />
                  Destacada
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={() => void handleSetFeatured(img.id)}
                  title="Marcar como imagen destacada en la card"
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-colors cursor-pointer ${
                    img.isFeatured
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-white/20 text-white hover:bg-amber-400 hover:text-zinc-950'
                  }`}
                >
                  <MaterialIcon name="star" className="text-[13px]" />
                  {img.isFeatured ? 'Principal' : 'Destacar'}
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(img.id)}
                  title="Eliminar imagen"
                  className="rounded-lg bg-rose-600/90 hover:bg-rose-600 p-1 text-white cursor-pointer"
                >
                  <MaterialIcon name="delete" className="text-[14px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
