import { useEffect, useState } from 'react';
import { cmsApi, type CmsPageBlockDTO, type CmsPageDTO } from '@/shared/lib/cmsApi';
import { PageBlocksRenderer } from '@/shared/components/cms/PageBlocksRenderer';
import { MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

interface BlockTemplate {
  blockType: string;
  label: string;
  icon: string;
  desc: string;
  defaultConfig: Record<string, unknown>;
}

const BLOCK_LIBRARY: BlockTemplate[] = [
  {
    blockType: 'Hero',
    label: 'Hero con Banner',
    icon: 'view_carousel',
    desc: 'Encabezado principal con título, botones e imagen.',
    defaultConfig: {
      badge: 'COMCApps',
      title: 'Impulsa tu empresa con tecnología real',
      subtitle: 'Personaliza este texto desde el inspector derecho del constructor.',
      imageUrl: '/banner.png',
      ctaText: 'Solicitar cotización',
      ctaUrl: '/contacto',
      secondaryCtaText: 'Ver servicios',
      secondaryCtaUrl: '/local',
    },
  },
  {
    blockType: 'SplitContent',
    label: 'Imagen + Texto',
    icon: 'view_sidebar',
    desc: 'Columna de imagen junto a texto y lista de puntos.',
    defaultConfig: {
      title: 'Soluciones a la medida de tu comercio',
      body: 'Describe tus beneficios, promociones o servicios destacados.',
      imageUrl: '/banner.png',
      imageLeft: false,
      bullets: ['Atención rápida y garantizada', 'Soporte presencial y remoto'],
    },
  },
  {
    blockType: 'FeatureGrid',
    label: 'Cuadrícula de Cards',
    icon: 'grid_view',
    desc: 'Tarjetas de beneficios o servicios en 3 columnas.',
    defaultConfig: {
      title: '¿Por qué elegir COMCApps?',
      subtitle: 'Calidad técnica, rapidez y garantía.',
      items: [
        { icon: 'bolt', title: 'Entrega ágil', desc: 'Resultados visibles desde el primer día.' },
        { icon: 'verified', title: 'Garantía escrita', desc: 'Respaldo en cada trabajo.' },
        { icon: 'support_agent', title: 'Soporte directo', desc: 'Atención cercana en local o a domicilio.' },
      ],
    },
  },
  {
    blockType: 'StatsBar',
    label: 'Barra de Métricas',
    icon: 'bar_chart',
    desc: 'Cifras destacadas en 4 columnas.',
    defaultConfig: {
      items: [
        { value: '45+', label: 'Proyectos lanzados' },
        { value: '12+', label: 'Servicios físicos' },
        { value: '99.9%', label: 'Estabilidad' },
        { value: '100%', label: 'Garantía' },
      ],
    },
  },
  {
    blockType: 'ImageGallery',
    label: 'Galería de Fotos',
    icon: 'collections',
    desc: 'Muestra múltiples fotos de tu trabajo o sucursal.',
    defaultConfig: {
      title: 'Galería COMCApps',
      images: ['/banner.png'],
    },
  },
  {
    blockType: 'RichText',
    label: 'Texto Libre',
    icon: 'notes',
    desc: 'Sección editorial con título y párrafos.',
    defaultConfig: {
      title: 'Nuestra historia y compromiso',
      body: 'Escribe aquí cualquier contenido informativo para tus clientes.',
    },
  },
  {
    blockType: 'CtaBanner',
    label: 'Banner CTA',
    icon: 'campaign',
    desc: 'Llamado a la acción en color Índigo COMCApps.',
    defaultConfig: {
      badge: 'Contáctanos hoy',
      title: '¿Listo para trabajar con nosotros?',
      subtitle: 'Escríbenos y te responderemos en minutos.',
      buttonText: 'Ir a contacto',
      buttonUrl: '/contacto',
    },
  },
];

export default function AdminPageBuilderPage() {
  const [pages, setPages] = useState<CmsPageDTO[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [blocks, setBlocks] = useState<CmsPageBlockDTO[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState<'split' | 'full'>('split');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Drag & Drop state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [draggedTemplate, setDraggedTemplate] = useState<BlockTemplate | null>(null);

  // Nueva página
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [creatingPage, setCreatingPage] = useState(false);

  const loadPages = async (keepId?: number) => {
    try {
      const list = await cmsApi.getPages(true);
      setPages(list);
      const target = list.find(p => p.id === (keepId ?? selectedPageId)) ?? list[0];
      if (target) {
        setSelectedPageId(target.id);
        setBlocks([...target.blocks].sort((a, b) => a.displayOrder - b.displayOrder));
        setSelectedIdx(target.blocks.length > 0 ? 0 : null);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudieron cargar las páginas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    cmsApi
      .getPages(true)
      .then(list => {
        if (!active) return;
        setPages(list);
        const first = list[0];
        if (first) {
          setSelectedPageId(first.id);
          setBlocks([...first.blocks].sort((a, b) => a.displayOrder - b.displayOrder));
          setSelectedIdx(first.blocks.length > 0 ? 0 : null);
        }
      })
      .catch(err => {
        if (active) toast.error(err instanceof Error ? err.message : 'No se pudieron cargar las páginas.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const currentPage = pages.find(p => p.id === selectedPageId) ?? null;

  const selectPage = (page: CmsPageDTO) => {
    setSelectedPageId(page.id);
    setBlocks([...page.blocks].sort((a, b) => a.displayOrder - b.displayOrder));
    setSelectedIdx(page.blocks.length > 0 ? 0 : null);
    setPreviewMode('split');
  };

  const addBlockFromTemplate = (tpl: BlockTemplate, insertAt?: number) => {
    const newBlock: CmsPageBlockDTO = {
      blockType: tpl.blockType,
      label: tpl.label,
      configJson: JSON.stringify(tpl.defaultConfig, null, 2),
      displayOrder: insertAt ?? blocks.length,
      isVisible: true,
    };
    const next = [...blocks];
    if (insertAt !== undefined && insertAt >= 0 && insertAt <= next.length) {
      next.splice(insertAt, 0, newBlock);
    } else {
      next.push(newBlock);
    }
    const reordered = next.map((b, i) => ({ ...b, displayOrder: i }));
    setBlocks(reordered);
    setSelectedIdx(insertAt !== undefined ? insertAt : reordered.length - 1);
  };

  const moveBlock = (from: number, to: number) => {
    if (from === to || to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setBlocks(next.map((b, i) => ({ ...b, displayOrder: i })));
    setSelectedIdx(to);
  };

  const removeBlock = (idx: number) => {
    const next = blocks.filter((_, i) => i !== idx).map((b, i) => ({ ...b, displayOrder: i }));
    setBlocks(next);
    setSelectedIdx(next.length > 0 ? Math.min(idx, next.length - 1) : null);
  };

  const updateSelectedConfig = (updater: (cfg: Record<string, unknown>) => Record<string, unknown>) => {
    if (selectedIdx === null || !blocks[selectedIdx]) return;
    const current = blocks[selectedIdx];
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(current.configJson) as Record<string, unknown>;
    } catch {
      parsed = {};
    }
    const updatedCfg = updater(parsed);
    const next = [...blocks];
    next[selectedIdx] = { ...current, configJson: JSON.stringify(updatedCfg, null, 2) };
    setBlocks(next);
  };

  const handleUploadBlockImage = async (file: File | undefined, field: 'imageUrl' | 'gallery') => {
    if (!file) return;
    try {
      const uploaded = await cmsApi.uploadMediaFiles([file], 'page-block', selectedPageId ?? undefined, false);
      const url = uploaded[0]?.url;
      if (!url) return;
      if (field === 'imageUrl') {
        updateSelectedConfig(cfg => ({ ...cfg, imageUrl: url }));
      } else {
        updateSelectedConfig(cfg => ({
          ...cfg,
          images: [...(Array.isArray(cfg.images) ? (cfg.images as string[]) : []), url],
        }));
      }
      toast.success('Imagen subida a R2 (comcapps) y aplicada al bloque.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error subiendo imagen.');
    }
  };

  const handleSaveBlocks = async () => {
    if (!currentPage) return;
    setSaving(true);
    try {
      const saved = await cmsApi.savePageBlocks(currentPage.id, blocks);
      setPages(prev => prev.map(p => (p.id === saved.id ? saved : p)));
      setBlocks(saved.blocks);
      toast.success(`Diseño de «${currentPage.title}» guardado y publicado.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar bloques.');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) return;
    setCreatingPage(true);
    try {
      const slug = (newPageSlug.trim() || newPageTitle.trim())
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const created = await cmsApi.createPage({
        title: newPageTitle.trim(),
        slug,
        isPublished: true,
        showInNavbar: true,
      });
      setNewPageTitle('');
      setNewPageSlug('');
      toast.success(`Página /p/${created.slug} creada.`);
      await loadPages(created.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo crear la página.');
    } finally {
      setCreatingPage(false);
    }
  };

  const selectedBlock = selectedIdx !== null ? blocks[selectedIdx] : null;
  let selectedConfig: Record<string, unknown> = {};
  if (selectedBlock) {
    try {
      selectedConfig = JSON.parse(selectedBlock.configJson) as Record<string, unknown>;
    } catch {
      selectedConfig = {};
    }
  }

  return (
    <div className="space-y-5">
      {/* Header de acciones del Page Builder */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MaterialIcon name="view_quilt" className="text-violet-600 dark:text-violet-400" />
            Constructor Visual (Arrastrar y Soltar)
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Arrastra bloques desde la izquierda al lienzo, reordénalos soltando encima y personaliza textos e imágenes en vivo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedPageId ?? ''}
            onChange={e => {
              const found = pages.find(p => p.id === Number(e.target.value));
              if (found) selectPage(found);
            }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-xs font-semibold text-zinc-800 dark:text-white min-w-[190px]"
          >
            {pages.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.isSystemPage ? `/${p.slug === 'home' ? '' : p.slug}` : `/p/${p.slug}`})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setPreviewMode(v => (v === 'full' ? 'split' : 'full'))}
            className="cm-action cm-action-secondary text-xs h-10"
          >
            <MaterialIcon name={previewMode === 'full' ? 'edit' : 'fullscreen'} className="text-[16px]" />
            {previewMode === 'full' ? 'Volver al editor' : 'Vista previa completa'}
          </button>

          <button
            type="button"
            disabled={saving || !currentPage}
            onClick={() => void handleSaveBlocks()}
            className="cm-action cm-action-primary text-xs h-10"
          >
            <MaterialIcon name="save" className="text-[16px]" />
            {saving ? 'Guardando...' : 'Publicar diseño'}
          </button>
        </div>
      </div>

      {/* Crear nueva página personalizada */}
      <div className="cm-surface p-4 flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Nueva página personalizada:</span>
        <input
          type="text"
          value={newPageTitle}
          onChange={e => setNewPageTitle(e.target.value)}
          placeholder="Ej: Promociones de Navidad"
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 text-xs min-w-[200px]"
        />
        <input
          type="text"
          value={newPageSlug}
          onChange={e => setNewPageSlug(e.target.value)}
          placeholder="slug-opcional (ej: promociones)"
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 text-xs min-w-[180px]"
        />
        <button
          type="button"
          disabled={creatingPage || !newPageTitle.trim()}
          onClick={() => void handleCreatePage()}
          className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-xs font-semibold cursor-pointer disabled:opacity-50"
        >
          + Crear página
        </button>
        {currentPage && !currentPage.isSystemPage && (
          <a
            href={`/p/${currentPage.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
          >
            Abrir /p/{currentPage.slug} ↗
          </a>
        )}
      </div>

      {loading ? (
        <div className="cm-surface p-12 text-center text-sm text-zinc-500">Cargando constructor...</div>
      ) : previewMode === 'full' ? (
        <div className="cm-surface overflow-hidden">
          <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              Vista previa en tiempo real — {currentPage?.title} ({blocks.filter(b => b.isVisible).length} bloques visibles)
            </span>
            <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-0.5">
              {(
                [
                  { id: 'desktop', icon: 'desktop_windows', label: 'Escritorio' },
                  { id: 'tablet', icon: 'tablet_mac', label: 'Tablet' },
                  { id: 'mobile', icon: 'smartphone', label: 'Móvil' },
                ] as const
              ).map(vp => (
                <button
                  key={vp.id}
                  type="button"
                  onClick={() => setViewport(vp.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                    viewport === vp.id
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <MaterialIcon name={vp.icon} className="text-[14px]" />
                  {vp.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-zinc-100/60 dark:bg-zinc-950 p-4 overflow-x-auto">
            <div
              className={`mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                viewport === 'mobile' ? 'max-w-[390px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
              }`}
            >
              {blocks.filter(b => b.isVisible).length === 0 ? (
                <div className="p-16 text-center text-sm text-zinc-400">
                  No hay bloques visibles todavía. Agrega bloques desde el editor para verlos aquí.
                </div>
              ) : (
                <PageBlocksRenderer blocks={blocks} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 1. Paleta izquierda de bloques arrastrables */}
          <div className="lg:col-span-3 cm-surface p-4 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Bloques disponibles
            </h2>
            <p className="text-[11px] text-zinc-500">
              Arrastra un bloque al centro o haz clic para añadirlo.
            </p>
            <div className="space-y-2 pt-1">
              {BLOCK_LIBRARY.map(tpl => (
                <div
                  key={tpl.blockType}
                  draggable
                  onDragStart={() => setDraggedTemplate(tpl)}
                  onDragEnd={() => setDraggedTemplate(null)}
                  onClick={() => addBlockFromTemplate(tpl)}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 hover:border-violet-400 hover:bg-violet-50/60 dark:hover:bg-violet-950/30 p-3 cursor-grab active:cursor-grabbing transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-8 rounded-lg bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <MaterialIcon name={tpl.icon} className="text-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">{tpl.label}</p>
                      <p className="text-[11px] text-zinc-500 truncate">{tpl.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Lienzo central Drag & Drop */}
          <div
            className="lg:col-span-5 cm-surface p-4 min-h-[460px] space-y-3"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (draggedTemplate) {
                addBlockFromTemplate(draggedTemplate);
                setDraggedTemplate(null);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Lienzo de Página ({blocks.length} bloques)
              </h2>
              <span className="text-[11px] text-zinc-400">Arrastra para reordenar</span>
            </div>

            {blocks.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center">
                <MaterialIcon name="add_box" className="text-[36px] text-zinc-400" />
                <p className="mt-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  Arrastra aquí tu primer bloque o haz clic en la paleta izquierda
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {blocks.map((block, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <div
                      key={`${block.blockType}-${idx}`}
                      draggable
                      onDragStart={() => setDragIndex(idx)}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (draggedTemplate) {
                          addBlockFromTemplate(draggedTemplate, idx);
                          setDraggedTemplate(null);
                        } else if (dragIndex !== null && dragIndex !== idx) {
                          moveBlock(dragIndex, idx);
                        }
                        setDragIndex(null);
                      }}
                      onClick={() => setSelectedIdx(idx)}
                      className={`rounded-2xl border p-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/30 ring-2 ring-violet-500/20'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300'
                      } ${!block.isVisible ? 'opacity-55' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MaterialIcon name="drag_indicator" className="text-[18px] text-zinc-400 cursor-grab" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                              #{idx + 1} · {block.blockType}
                            </span>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                              {block.label}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, idx - 1)}
                            disabled={idx === 0}
                            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30 cursor-pointer"
                            title="Subir"
                          >
                            <MaterialIcon name="arrow_upward" className="text-[15px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, idx + 1)}
                            disabled={idx === blocks.length - 1}
                            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30 cursor-pointer"
                            title="Bajar"
                          >
                            <MaterialIcon name="arrow_downward" className="text-[15px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...blocks];
                              next[idx] = { ...block, isVisible: !block.isVisible };
                              setBlocks(next);
                            }}
                            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                            title={block.isVisible ? 'Ocultar bloque' : 'Mostrar bloque'}
                          >
                            <MaterialIcon
                              name={block.isVisible ? 'visibility' : 'visibility_off'}
                              className="text-[15px]"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(idx)}
                            className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 cursor-pointer"
                            title="Eliminar bloque"
                          >
                            <MaterialIcon name="delete" className="text-[15px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Inspector derecho de propiedades del bloque seleccionado */}
          <div className="lg:col-span-4 cm-surface p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Inspector de Propiedades
            </h2>

            {!selectedBlock || selectedIdx === null ? (
              <p className="text-xs text-zinc-500">
                Selecciona un bloque en el lienzo central para editar sus textos, botones e imágenes.
              </p>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                    Nombre interno del bloque
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.label}
                    onChange={e => {
                      const next = [...blocks];
                      next[selectedIdx] = { ...selectedBlock, label: e.target.value };
                      setBlocks(next);
                    }}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                  />
                </div>

                {'badge' in selectedConfig && (
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Etiqueta (Badge)</label>
                    <input
                      type="text"
                      value={(selectedConfig.badge as string) ?? ''}
                      onChange={e => updateSelectedConfig(c => ({ ...c, badge: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                    />
                  </div>
                )}

                {'title' in selectedConfig && (
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Título</label>
                    <input
                      type="text"
                      value={(selectedConfig.title as string) ?? ''}
                      onChange={e => updateSelectedConfig(c => ({ ...c, title: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                    />
                  </div>
                )}

                {'subtitle' in selectedConfig && (
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Subtítulo</label>
                    <textarea
                      rows={3}
                      value={(selectedConfig.subtitle as string) ?? ''}
                      onChange={e => updateSelectedConfig(c => ({ ...c, subtitle: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-xs"
                    />
                  </div>
                )}

                {'body' in selectedConfig && (
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Contenido</label>
                    <textarea
                      rows={4}
                      value={(selectedConfig.body as string) ?? ''}
                      onChange={e => updateSelectedConfig(c => ({ ...c, body: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-xs"
                    />
                  </div>
                )}

                {'imageUrl' in selectedConfig && (
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold text-zinc-500">Imagen del bloque (R2 comcapps)</label>
                    <input
                      type="text"
                      value={(selectedConfig.imageUrl as string) ?? ''}
                      onChange={e => updateSelectedConfig(c => ({ ...c, imageUrl: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300 cursor-pointer">
                      <MaterialIcon name="cloud_upload" className="text-[15px]" />
                      Subir imagen al bucket R2
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => void handleUploadBlockImage(e.target.files?.[0], 'imageUrl')}
                      />
                    </label>
                  </div>
                )}

                {'ctaText' in selectedConfig && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Texto botón</label>
                      <input
                        type="text"
                        value={(selectedConfig.ctaText as string) ?? ''}
                        onChange={e => updateSelectedConfig(c => ({ ...c, ctaText: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Enlace</label>
                      <input
                        type="text"
                        value={(selectedConfig.ctaUrl as string) ?? ''}
                        onChange={e => updateSelectedConfig(c => ({ ...c, ctaUrl: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                      />
                    </div>
                  </div>
                )}

                {'buttonText' in selectedConfig && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Texto botón</label>
                      <input
                        type="text"
                        value={(selectedConfig.buttonText as string) ?? ''}
                        onChange={e => updateSelectedConfig(c => ({ ...c, buttonText: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 mb-1">Enlace</label>
                      <input
                        type="text"
                        value={(selectedConfig.buttonUrl as string) ?? ''}
                        onChange={e => updateSelectedConfig(c => ({ ...c, buttonUrl: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 text-xs"
                      />
                    </div>
                  </div>
                )}

                {selectedBlock.blockType === 'ImageGallery' && (
                  <div>
                    <label className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300 cursor-pointer">
                      <MaterialIcon name="add_photo_alternate" className="text-[15px]" />
                      Añadir foto a la galería (R2)
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => void handleUploadBlockImage(e.target.files?.[0], 'gallery')}
                      />
                    </label>
                  </div>
                )}

                {/* Editor JSON avanzado para control total de listas/items */}
                <details className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <summary className="text-[11px] font-semibold text-zinc-500 cursor-pointer">
                    Configuración avanzada (JSON)
                  </summary>
                  <textarea
                    rows={6}
                    value={selectedBlock.configJson}
                    onChange={e => {
                      const next = [...blocks];
                      next[selectedIdx] = { ...selectedBlock, configJson: e.target.value };
                      setBlocks(next);
                    }}
                    className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 p-2 font-mono text-[11px]"
                  />
                </details>
              </div>
            )}
          </div>
        </div>

        {/* 4. Previsualizador en vivo integrado debajo del editor */}
        <div className="cm-surface overflow-hidden">
          <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              Previsualizador en vivo — {currentPage?.title} ({blocks.filter(b => b.isVisible).length} bloques visibles)
            </span>
            <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-0.5">
              {(
                [
                  { id: 'desktop', icon: 'desktop_windows', label: 'Escritorio' },
                  { id: 'tablet', icon: 'tablet_mac', label: 'Tablet' },
                  { id: 'mobile', icon: 'smartphone', label: 'Móvil' },
                ] as const
              ).map(vp => (
                <button
                  key={vp.id}
                  type="button"
                  onClick={() => setViewport(vp.id)}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                    viewport === vp.id
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <MaterialIcon name={vp.icon} className="text-[14px]" />
                  {vp.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-zinc-100/60 dark:bg-zinc-950 p-4 overflow-x-auto">
            <div
              className={`mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                viewport === 'mobile' ? 'max-w-[390px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'w-full'
              }`}
            >
              {blocks.filter(b => b.isVisible).length === 0 ? (
                <div className="p-12 text-center text-xs text-zinc-400">
                  Arrastra o agrega un bloque arriba para ver cómo queda tu página en tiempo real.
                </div>
              ) : (
                <PageBlocksRenderer blocks={blocks} />
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
