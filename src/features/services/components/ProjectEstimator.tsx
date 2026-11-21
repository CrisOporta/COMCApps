import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ESTIMATOR_ADDONS, ESTIMATOR_PROJECT_TYPES } from '../data/servicesData';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';

export function ProjectEstimator() {
  const navigate = useNavigate();
  const [selectedTypeId, setSelectedTypeId] = useState<string>(ESTIMATOR_PROJECT_TYPES[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['uiux']);
  const [priority, setPriority] = useState<'standard' | 'fast'>('standard');

  const selectedType =
    ESTIMATOR_PROJECT_TYPES.find(t => t.id === selectedTypeId) ?? ESTIMATOR_PROJECT_TYPES[0];

  const addonsTotalUsd = selectedAddons.reduce((sum, id) => {
    const found = ESTIMATOR_ADDONS.find(a => a.id === id);
    return sum + (found?.usd ?? 0);
  }, 0);

  const addonsTotalWeeks = selectedAddons.reduce((sum, id) => {
    const found = ESTIMATOR_ADDONS.find(a => a.id === id);
    return sum + (found?.weeks ?? 0);
  }, 0);

  const multiplier = priority === 'fast' ? 1.25 : 1;
  const minUsd = Math.round((selectedType.baseUsd + addonsTotalUsd) * multiplier);
  const maxUsd = Math.round(minUsd * 1.35);

  const rawWeeks = selectedType.baseWeeks + addonsTotalWeeks;
  const estWeeks = priority === 'fast' ? Math.max(3, Math.round(rawWeeks * 0.75)) : rawWeeks;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleRequestQuote = () => {
    const addonLabels = ESTIMATOR_ADDONS.filter(a => selectedAddons.includes(a.id)).map(
      a => a.label,
    );
    const summary = [
      `Tipo: ${selectedType.label}`,
      `Velocidad: ${priority === 'fast' ? 'Entrega acelerada' : 'Ritmo estándar'}`,
      `Extras: ${addonLabels.length > 0 ? addonLabels.join(', ') : 'Ninguno'}`,
      `Estimación referencial: $${minUsd.toLocaleString()} - $${maxUsd.toLocaleString()} USD (~${estWeeks} semanas)`,
    ].join('\n');

    const params = new URLSearchParams({
      servicio: selectedType.label,
      resumen: summary,
    });
    navigate(`/contacto?${params.toString()}`);
  };

  return (
    <section
      id="estimador"
      className="scroll-mt-24 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800/60"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-600/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide mb-4">
            <MaterialIcon name="calculate" className="text-[14px]" />
            Estimador Interactivo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Calcula el alcance estimado de tu proyecto
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Selecciona el tipo de solución y los módulos clave para obtener un rango orientativo de inversión y tiempo de entrega.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="cm-surface p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                1. ¿Qué deseas construir?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_PROJECT_TYPES.map(type => {
                  const active = selectedTypeId === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/40 ring-1 ring-violet-500/30'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                          {type.label}
                        </span>
                        <span
                          className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                            active
                              ? 'border-violet-600 bg-violet-600 text-white'
                              : 'border-zinc-300 dark:border-zinc-700'
                          }`}
                        >
                          {active && <CheckIcon className="size-2.5" />}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="cm-surface p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                2. Capacidades adicionales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ESTIMATOR_ADDONS.map(addon => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                        checked
                          ? 'border-violet-400 dark:border-violet-500/60 bg-violet-50/50 dark:bg-violet-950/30'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className={`mt-0.5 size-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                          checked
                            ? 'bg-violet-600 border-violet-600 text-white'
                            : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950'
                        }`}
                      >
                        {checked && <CheckIcon className="size-3" />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                          {addon.label}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          +{addon.weeks} sem · +${addon.usd.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="cm-surface p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                3. Ritmo de entrega
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPriority('standard')}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    priority === 'standard'
                      ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/40'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">Estándar</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Equilibrio óptimo entre presupuesto, calidad y tiempo de lanzamiento.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('fast')}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    priority === 'fast'
                      ? 'border-violet-500 bg-violet-50/70 dark:bg-violet-950/40'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    Acelerado (Squad ampliado)
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Recorta ~25% el calendario asignando más ingenieros en paralelo.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Resumen dinámico pegajoso */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border-2 border-violet-300 dark:border-violet-500/40 bg-white dark:bg-zinc-900 p-7 sm:p-8 shadow-xl shadow-violet-100 dark:shadow-violet-950/30">
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="rounded-full bg-violet-600 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wide">
                  Estimación en vivo
                </span>
                <span className="text-xs font-semibold text-zinc-400">Referencial USD</span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Inversión estimada
              </p>
              <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
                ${minUsd.toLocaleString()} – ${maxUsd.toLocaleString()}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 p-4">
                <div>
                  <p className="text-[11px] text-zinc-400">Tiempo estimado</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    ~{estWeeks} semanas
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400">Módulos extras</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {selectedAddons.length} seleccionados
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                <p className="font-semibold text-zinc-900 dark:text-white">Incluye siempre:</p>
                {[
                  'Arquitectura escalable y código 100% de tu propiedad',
                  'Demos semanales en entorno de pruebas',
                  'QA, despliegue productivo y documentación técnica',
                ].map(inc => (
                  <div key={inc} className="flex items-center gap-2">
                    <CheckIcon className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRequestQuote}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 py-3.5 text-sm font-semibold text-white transition-all shadow-md shadow-violet-200 dark:shadow-violet-950/40 cursor-pointer"
              >
                Solicitar propuesta formal
                <ArrowRightIcon />
              </button>

              <p className="mt-3 text-center text-[11px] text-zinc-400">
                Sin compromiso · Ajustamos el presupuesto tras una breve reunión técnica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
