import { useEffect, useState, type FormEvent } from 'react';
import {
  cmsApi,
  type MediaAssetDTO,
  type TeamDepartmentDTO,
  type WithMedia,
} from '@/shared/lib/cmsApi';
import { EntityMediaManager } from '../components/EntityMediaManager';
import { TeamDepartmentsManager } from '../components/TeamDepartmentsManager';
import { CloseIcon, MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

export type AdminCollectionType =
  | 'local-services'
  | 'software-services'
  | 'projects'
  | 'team'
  | 'blog';

interface FieldSpec {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox' | 'number' | 'tags';
  placeholder?: string;
  required?: boolean;
}

interface CollectionConfig {
  title: string;
  subtitle: string;
  entityType: string;
  titleField: string;
  subtitleField: string;
  fields: FieldSpec[];
  defaults: Record<string, unknown>;
}

const COLLECTION_CONFIGS: Record<AdminCollectionType, CollectionConfig> = {
  'local-services': {
    title: 'Servicios Locales (Sucursal Física)',
    subtitle: 'Administra los servicios presenciales, sus múltiples fotos en R2 y su imagen destacada.',
    entityType: 'local-service',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'title', label: 'Título del servicio', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', placeholder: 'se-genera-automatico' },
      { name: 'category', label: 'Categoría', type: 'text', placeholder: 'Soporte & Hardware | Software & Web | Papelería & Estudio | Seguridad & Redes' },
      { name: 'icon', label: 'Icono Material', type: 'text', placeholder: 'computer, print, videocam, lan...' },
      { name: 'turnaround', label: 'Tiempo de entrega', type: 'text', placeholder: 'Mismo día · 24h' },
      { name: 'shortDesc', label: 'Descripción corta (Card)', type: 'textarea', required: true },
      { name: 'fullDesc', label: 'Descripción completa', type: 'textarea' },
      { name: 'idealFor', label: 'Ideal para', type: 'text' },
      { name: 'homeServiceAvailable', label: 'Disponible a domicilio', type: 'checkbox' },
      { name: 'instantDelivery', label: 'Entrega al instante', type: 'checkbox' },
      { name: 'isPublished', label: 'Publicado', type: 'checkbox' },
    ],
    defaults: {
      title: '',
      slug: '',
      category: 'Soporte & Hardware',
      icon: 'computer',
      turnaround: 'Mismo día',
      shortDesc: '',
      fullDesc: '',
      idealFor: '',
      highlightsJson: '[]',
      homeServiceAvailable: true,
      instantDelivery: false,
      featured: false,
      displayOrder: 0,
      isPublished: true,
    },
  },
  'software-services': {
    title: 'Servicios Digitales y Software',
    subtitle: 'Gestiona tu portafolio de ingeniería de software y sus galerías de imágenes.',
    entityType: 'software-service',
    titleField: 'title',
    subtitleField: 'timeline',
    fields: [
      { name: 'title', label: 'Título', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'icon', label: 'Icono Material', type: 'text', placeholder: 'code, smartphone, cloud...' },
      { name: 'timeline', label: 'Tiempo estimado', type: 'text', placeholder: '4 – 8 semanas' },
      { name: 'shortDesc', label: 'Descripción corta', type: 'textarea', required: true },
      { name: 'fullDesc', label: 'Descripción detallada', type: 'textarea' },
      { name: 'idealFor', label: 'Ideal para', type: 'text' },
      { name: 'accent', label: 'Destacar tarjeta', type: 'checkbox' },
      { name: 'isPublished', label: 'Publicado', type: 'checkbox' },
    ],
    defaults: {
      title: '',
      slug: '',
      icon: 'code',
      timeline: '4 – 8 semanas',
      shortDesc: '',
      fullDesc: '',
      idealFor: '',
      deliverablesJson: '[]',
      technologiesJson: '[]',
      accent: false,
      displayOrder: 0,
      isPublished: true,
    },
  },
  projects: {
    title: 'Portafolio de Proyectos',
    subtitle: 'Sube capturas múltiples de cada proyecto y marca la portada destacada.',
    entityType: 'project',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'title', label: 'Nombre del proyecto', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'tagline', label: 'Subtítulo breve', type: 'text' },
      { name: 'category', label: 'Categoría', type: 'text', placeholder: 'SaaS & Web | Apps Móviles | IA' },
      { name: 'clientName', label: 'Cliente / Industria', type: 'text' },
      { name: 'year', label: 'Año', type: 'text', placeholder: '2026' },
      { name: 'liveUrl', label: 'URL en vivo (opcional)', type: 'text' },
      { name: 'summary', label: 'Resumen', type: 'textarea', required: true },
      { name: 'challenge', label: 'El reto', type: 'textarea' },
      { name: 'solution', label: 'La solución', type: 'textarea' },
      { name: 'isFeatured', label: 'Proyecto destacado', type: 'checkbox' },
      { name: 'isPublished', label: 'Publicado', type: 'checkbox' },
    ],
    defaults: {
      title: '',
      slug: '',
      tagline: '',
      category: 'SaaS & Web',
      clientName: '',
      year: '2026',
      icon: 'rocket_launch',
      summary: '',
      challenge: '',
      solution: '',
      stackJson: '[]',
      metricsJson: '[]',
      liveUrl: '',
      isFeatured: false,
      displayOrder: 0,
      isPublished: true,
    },
  },
  team: {
    title: 'Equipo COMCApps',
    subtitle: 'Gestiona perfiles del equipo, tecnologías, redes sociales y fotos destacadas.',
    entityType: 'team-member',
    titleField: 'name',
    subtitleField: 'role',
    fields: [
      { name: 'name', label: 'Nombre completo', type: 'text', required: true },
      { name: 'role', label: 'Cargo', type: 'text', required: true },
      { name: 'department', label: 'Departamento', type: 'text', placeholder: 'Ingeniería, Diseño, Soporte' },
      { name: 'experience', label: 'Experiencia', type: 'text', placeholder: 'Ej. 4+ años' },
      { name: 'specialty', label: 'Especialidad', type: 'text', placeholder: 'Ej. Arquitectura .NET, Full-Stack y Cloud' },
      { name: 'email', label: 'Correo electrónico', type: 'text', placeholder: 'nombre@comcapps.com' },
      { name: 'bio', label: 'Biografía', type: 'textarea' },
      { name: 'skillsJson', label: 'Tecnologías y habilidades (separadas por coma)', type: 'tags', placeholder: 'C#, .NET 10, React, TypeScript, Flutter, AWS' },
      { name: 'githubUrl', label: 'GitHub (URL)', type: 'text', placeholder: 'https://github.com/usuario' },
      { name: 'linkedinUrl', label: 'LinkedIn (URL)', type: 'text', placeholder: 'https://linkedin.com/in/usuario' },
      { name: 'facebookUrl', label: 'Facebook (URL)', type: 'text', placeholder: 'https://facebook.com/usuario' },
      { name: 'instagramUrl', label: 'Instagram (URL)', type: 'text', placeholder: 'https://instagram.com/usuario' },
      { name: 'xUrl', label: 'X / Twitter (URL)', type: 'text', placeholder: 'https://x.com/usuario' },
      { name: 'websiteUrl', label: 'Sitio Web / Portafolio (URL)', type: 'text', placeholder: 'https://tusitio.com' },
      { name: 'isPublished', label: 'Publicado', type: 'checkbox' },
    ],
    defaults: {
      name: '',
      role: '',
      department: 'Ingeniería',
      experience: '',
      specialty: '',
      bio: '',
      skillsJson: '[]',
      email: '',
      linkedinUrl: '',
      githubUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      xUrl: '',
      websiteUrl: '',
      displayOrder: 0,
      isPublished: true,
    },
  },
  blog: {
    title: 'Blog y Artículos',
    subtitle: 'Publica artículos técnicos con múltiples imágenes y portada destacada.',
    entityType: 'blog-post',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { name: 'title', label: 'Título del artículo', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'category', label: 'Categoría', type: 'text', placeholder: 'Arquitectura, IA, Negocios' },
      { name: 'authorName', label: 'Autor', type: 'text' },
      { name: 'readTime', label: 'Tiempo de lectura', type: 'text', placeholder: '5 min lectura' },
      { name: 'excerpt', label: 'Extracto (Card)', type: 'textarea', required: true },
      { name: 'contentMarkdown', label: 'Contenido completo', type: 'textarea' },
      { name: 'isPublished', label: 'Publicado', type: 'checkbox' },
    ],
    defaults: {
      title: '',
      slug: '',
      category: 'Arquitectura',
      authorName: 'Cristian Oporta',
      readTime: '6 min lectura',
      excerpt: '',
      contentMarkdown: '',
      tagsJson: '[]',
      publishedAt: new Date().toISOString(),
      isPublished: true,
    },
  },
};

type GenericEntity = Record<string, unknown> & { id: number };

export default function AdminCollectionPage({ collection }: { collection: AdminCollectionType }) {
  const cfg = COLLECTION_CONFIGS[collection];
  const [records, setRecords] = useState<WithMedia<GenericEntity>[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formState, setFormState] = useState<Record<string, unknown>>(cfg.defaults);
  const [editingMedia, setEditingMedia] = useState<MediaAssetDTO[]>([]);
  const [saving, setSaving] = useState(false);
  const [teamDepartments, setTeamDepartments] = useState<TeamDepartmentDTO[]>([]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const loadRecords = async () => {
    try {
      const data = await cmsApi.listCollection<GenericEntity>(collection);
      setRecords(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error cargando registros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    cmsApi
      .listCollection<GenericEntity>(collection)
      .then(data => {
        if (active) setRecords(data);
      })
      .catch(err => {
        if (active) toast.error(err instanceof Error ? err.message : 'Error cargando registros.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [collection]);

  const openNew = () => {
    setEditingId(null);
    setFormState({ ...cfg.defaults });
    setEditingMedia([]);
    setModalOpen(true);
  };

  const openEdit = (rec: WithMedia<GenericEntity>) => {
    setEditingId(rec.item.id);
    setFormState({ ...cfg.defaults, ...rec.item });
    setEditingMedia(rec.media);
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId === null) {
        const created = await cmsApi.createItem<GenericEntity>(collection, formState);
        setEditingId(created.item.id);
        setEditingMedia(created.media);
        toast.success('Registro creado. Ya puedes subir múltiples imágenes y elegir la destacada.');
      } else {
        await cmsApi.updateItem<GenericEntity>(collection, editingId, formState);
        toast.success('Cambios guardados correctamente.');
      }
      await loadRecords();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error guardando registro.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar este registro permanentemente?')) return;
    try {
      await cmsApi.deleteItem(collection, id);
      toast.info('Registro eliminado.');
      await loadRecords();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo eliminar.');
    }
  };

  const handleDropReorder = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const prev = records;
    const next = [...records];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setRecords(next);
    try {
      await cmsApi.reorderCollection(
        collection,
        next.map(r => r.item.id),
      );
      toast.success('Orden guardado.');
    } catch (err) {
      setRecords(prev);
      toast.error(err instanceof Error ? err.message : 'No se pudo guardar el nuevo orden.');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{cfg.title}</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{cfg.subtitle}</p>
        </div>
        <button type="button" onClick={openNew} className="cm-action cm-action-primary text-xs">
          <MaterialIcon name="add" className="text-[18px]" />
          Nuevo registro
        </button>
      </div>

      {collection === 'team' && <TeamDepartmentsManager onChange={setTeamDepartments} />}

      {loading ? (
        <div className="cm-surface p-10 text-center text-sm text-zinc-500">Cargando registros...</div>
      ) : records.length === 0 ? (
        <div className="cm-surface p-12 text-center">
          <p className="text-sm text-zinc-500">Aún no hay registros en esta sección.</p>
          <button type="button" onClick={openNew} className="mt-4 cm-action cm-action-primary text-xs">
            Crear el primero
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <MaterialIcon name="drag_indicator" className="text-[15px]" />
            Arrastra y suelta las tarjetas para cambiar el orden en que aparecen en la web.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {records.map((rec, idx) => (
              <div
                key={rec.item.id}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragOver={e => {
                  e.preventDefault();
                  if (dragOverIdx !== idx) setDragOverIdx(idx);
                }}
                onDragLeave={() => {
                  if (dragOverIdx === idx) setDragOverIdx(null);
                }}
                onDrop={e => {
                  e.preventDefault();
                  if (dragIdx !== null) {
                    void handleDropReorder(dragIdx, idx);
                  }
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => {
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                className={`cm-surface overflow-hidden flex flex-col cursor-grab active:cursor-grabbing transition-all ${
                  dragIdx === idx ? 'opacity-50 scale-[0.98]' : ''
                } ${
                  dragOverIdx === idx && dragIdx !== idx
                    ? 'ring-2 ring-violet-500 border-violet-400'
                    : ''
                }`}
              >
                <div className="relative h-40 bg-zinc-100 dark:bg-zinc-800">
                  {rec.featuredImageUrl ? (
                    <img
                      src={rec.featuredImageUrl}
                      alt={String(rec.item[cfg.titleField] ?? '')}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                      <MaterialIcon name="image" className="text-[32px]" />
                    </div>
                  )}
                  <span
                    title="Arrastra para reordenar"
                    className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-zinc-950/75 text-white px-2 py-0.5 text-[11px] font-semibold"
                  >
                    <MaterialIcon name="drag_indicator" className="text-[14px]" />
                    #{idx + 1}
                  </span>
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-zinc-950/75 text-white px-2.5 py-0.5 text-[11px] font-semibold">
                    {rec.media.length} {rec.media.length === 1 ? 'foto' : 'fotos'}
                  </span>
                </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                  {String(rec.item[cfg.subtitleField] ?? '')}
                </p>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5 line-clamp-2">
                  {String(rec.item[cfg.titleField] ?? '')}
                </h3>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(rec)}
                    className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white py-2 text-xs font-semibold cursor-pointer"
                  >
                    Editar y Fotos
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(rec.item.id)}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-rose-400 hover:text-rose-500 p-2 text-zinc-500 cursor-pointer"
                    title="Eliminar"
                  >
                    <MaterialIcon name="delete" className="text-[17px]" />
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Editor + Galería Multi-Imagen R2 */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/60 backdrop-blur-xs p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto cm-surface p-6 space-y-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                {editingId === null ? `Nuevo en ${cfg.title}` : `Editar registro #${editingId}`}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cfg.fields.map(field => {
                  if (field.type === 'checkbox') {
                    return (
                      <label
                        key={field.name}
                        className="flex items-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(formState[field.name])}
                          onChange={e =>
                            setFormState(prev => ({ ...prev, [field.name]: e.target.checked }))
                          }
                          className="accent-violet-600 size-4"
                        />
                        {field.label}
                      </label>
                    );
                  }

                  if (field.type === 'tags') {
                    let parsedTags: string[] = [];
                    try {
                      const raw = formState[field.name];
                      if (typeof raw === 'string' && raw.trim().startsWith('[')) {
                        const arr = JSON.parse(raw);
                        if (Array.isArray(arr)) parsedTags = arr.map(String);
                      }
                    } catch {
                      parsedTags = [];
                    }
                    const textValue = parsedTags.join(', ');
                    return (
                      <div key={field.name} className="sm:col-span-2 space-y-2">
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          defaultValue={textValue}
                          key={`${editingId ?? 'new'}-${field.name}`}
                          onBlur={e => {
                            const tags = e.target.value
                              .split(',')
                              .map(t => t.trim())
                              .filter(Boolean);
                            setFormState(prev => ({ ...prev, [field.name]: JSON.stringify(tags) }));
                          }}
                          onChange={e => {
                            const tags = e.target.value
                              .split(',')
                              .map(t => t.trim())
                              .filter(Boolean);
                            setFormState(prev => ({ ...prev, [field.name]: JSON.stringify(tags) }));
                          }}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-900 dark:text-white"
                        />
                        {parsedTags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {parsedTags.map(tag => (
                              <span
                                key={tag}
                                className="rounded-md bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 px-2 py-0.5 text-[11px] font-medium text-violet-700 dark:text-violet-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (field.type === 'textarea') {
                    return (
                      <div key={field.name} className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                          {field.label}
                        </label>
                        <textarea
                          rows={3}
                          required={field.required}
                          value={String(formState[field.name] ?? '')}
                          onChange={e =>
                            setFormState(prev => ({ ...prev, [field.name]: e.target.value }))
                          }
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-xs text-zinc-900 dark:text-white"
                        />
                      </div>
                    );
                  }

                  if (collection === 'team' && field.name === 'department' && teamDepartments.length > 0) {
                    const currentVal = String(formState[field.name] ?? '');
                    const deptNames = teamDepartments.map(d => d.name);
                    const hasCurrent = !currentVal || deptNames.includes(currentVal);
                    return (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                          {field.label}
                        </label>
                        <select
                          value={currentVal}
                          onChange={e =>
                            setFormState(prev => ({ ...prev, [field.name]: e.target.value }))
                          }
                          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-900 dark:text-white"
                        >
                          {!hasCurrent && <option value={currentVal}>{currentVal}</option>}
                          {teamDepartments.map(d => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={String(formState[field.name] ?? '')}
                        onChange={e =>
                          setFormState(prev => ({
                            ...prev,
                            [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-900 dark:text-white"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="cm-action cm-action-secondary text-xs"
                >
                  Cerrar
                </button>
                <button type="submit" disabled={saving} className="cm-action cm-action-primary text-xs">
                  {saving ? 'Guardando...' : editingId === null ? 'Crear y habilitar fotos' : 'Guardar cambios'}
                </button>
              </div>
            </form>

            {/* Galería Multi-Imagen R2 del registro */}
            <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800">
              {editingId !== null ? (
                <EntityMediaManager
                  entityType={cfg.entityType}
                  entityId={editingId}
                  media={editingMedia}
                  onChange={updated => {
                    setEditingMedia(updated);
                    void loadRecords();
                  }}
                />
              ) : (
                <p className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3.5 border border-zinc-200 dark:border-zinc-800">
                  💡 Primero haz clic en <strong>«Crear y habilitar fotos»</strong> para subir múltiples imágenes al bucket R2 <code>comcapps</code> y marcar la imagen destacada.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
