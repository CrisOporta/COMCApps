import { useEffect, useState, type FormEvent } from 'react';
import { cmsApi, type TeamDepartmentDTO } from '@/shared/lib/cmsApi';
import { MaterialIcon } from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

interface Props {
  onChange?: (departments: TeamDepartmentDTO[]) => void;
}

export function TeamDepartmentsManager({ onChange }: Props) {
  const [departments, setDepartments] = useState<TeamDepartmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editOrder, setEditOrder] = useState(0);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const load = async () => {
    try {
      const list = await cmsApi.getTeamDepartments();
      setDepartments(list);
      onChange?.(list);
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    cmsApi
      .getTeamDepartments()
      .then(list => {
        if (active) {
          setDepartments(list);
          onChange?.(list);
        }
      })
      .catch(() => {
        // silencioso
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    setCreating(true);
    try {
      await cmsApi.createTeamDepartment({
        name: trimmed,
        displayOrder: departments.length,
        isActive: true,
      });
      setNewName('');
      toast.success(`Etiqueta «${trimmed}» creada.`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo crear la etiqueta.');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (dept: TeamDepartmentDTO) => {
    setEditingId(dept.id);
    setEditName(dept.name);
    setEditOrder(dept.displayOrder);
  };

  const handleUpdate = async (dept: TeamDepartmentDTO) => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    try {
      await cmsApi.updateTeamDepartment(dept.id, {
        name: trimmed,
        displayOrder: editOrder,
        isActive: dept.isActive,
      });
      setEditingId(null);
      toast.success('Etiqueta actualizada.');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo actualizar.');
    }
  };

  const handleToggleActive = async (dept: TeamDepartmentDTO) => {
    try {
      await cmsApi.updateTeamDepartment(dept.id, {
        name: dept.name,
        displayOrder: dept.displayOrder,
        isActive: !dept.isActive,
      });
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const handleDelete = async (dept: TeamDepartmentDTO) => {
    if (!window.confirm(`¿Eliminar la etiqueta «${dept.name}»?`)) return;
    try {
      await cmsApi.deleteTeamDepartment(dept.id);
      toast.info(`Etiqueta «${dept.name}» eliminada.`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo eliminar.');
    }
  };

  const handleDropDept = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const prev = departments;
    const next = [...departments];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const reordered = next.map((d, idx) => ({ ...d, displayOrder: idx }));
    setDepartments(reordered);
    onChange?.(reordered);
    try {
      await cmsApi.reorderCollection(
        'team-departments',
        reordered.map(d => d.id),
      );
      toast.success('Orden de etiquetas guardado.');
    } catch (err) {
      setDepartments(prev);
      onChange?.(prev);
      toast.error(err instanceof Error ? err.message : 'No se pudo guardar el orden.');
    }
  };

  return (
    <div className="cm-surface p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MaterialIcon name="label" className="text-[18px] text-violet-600 dark:text-violet-400" />
            Etiquetas / Departamentos de /equipo
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Gestiona las pestañas de filtro que aparecen junto a «Todos» en la página pública del equipo.
          </p>
        </div>

        <form onSubmit={handleCreate} className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Nueva etiqueta (ej. Soporte Técnico)"
            className="w-56 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs text-zinc-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={creating || !newName.trim()}
            className="cm-action cm-action-primary text-xs py-1.5 px-3.5 disabled:opacity-50"
          >
            <MaterialIcon name="add" className="text-[16px]" />
            Agregar
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-xs text-zinc-400">Cargando etiquetas...</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
            Todos <span className="text-[10px] opacity-70">(fijo)</span>
          </span>

          {departments.map((dept, idx) =>
            editingId === dept.id ? (
              <div
                key={dept.id}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400 bg-white dark:bg-zinc-950 px-2 py-1"
              >
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-32 text-xs bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                  autoFocus
                />
                <input
                  type="number"
                  value={editOrder}
                  onChange={e => setEditOrder(Number(e.target.value))}
                  title="Orden"
                  className="w-12 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 text-center"
                />
                <button
                  type="button"
                  onClick={() => void handleUpdate(dept)}
                  className="rounded-lg bg-violet-600 text-white px-2 py-0.5 text-[11px] font-semibold cursor-pointer"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 text-[11px] cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div
                key={dept.id}
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
                  if (dragIdx !== null) void handleDropDept(dragIdx, idx);
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                onDragEnd={() => {
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all cursor-grab active:cursor-grabbing ${
                  dept.isActive
                    ? 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200'
                    : 'border-zinc-200/60 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950 text-zinc-400 line-through'
                } ${dragIdx === idx ? 'opacity-50' : ''} ${
                  dragOverIdx === idx && dragIdx !== idx ? 'ring-2 ring-violet-500 border-violet-400' : ''
                }`}
              >
                <MaterialIcon name="drag_indicator" className="text-[13px] text-zinc-400" />
                <span>{dept.name}</span>
                <button
                  type="button"
                  onClick={() => startEdit(dept)}
                  title="Editar etiqueta"
                  className="text-zinc-400 hover:text-violet-600 cursor-pointer"
                >
                  <MaterialIcon name="edit" className="text-[14px]" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleToggleActive(dept)}
                  title={dept.isActive ? 'Ocultar en /equipo' : 'Mostrar en /equipo'}
                  className="text-zinc-400 hover:text-amber-500 cursor-pointer"
                >
                  <MaterialIcon name={dept.isActive ? 'visibility' : 'visibility_off'} className="text-[14px]" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(dept)}
                  title="Eliminar etiqueta"
                  className="text-zinc-400 hover:text-rose-500 cursor-pointer"
                >
                  <MaterialIcon name="close" className="text-[14px]" />
                </button>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
