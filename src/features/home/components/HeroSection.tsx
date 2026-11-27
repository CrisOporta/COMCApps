import { useState } from 'react';
import { Link } from 'react-router';
import { COMPANY } from '@/shared/config/company';
import { useSiteSettings } from '@/shared/hooks/useCmsData';
import { Blob } from '@/shared/components/ui/Blob';
import { ArrowRightIcon, CheckIcon, MaterialIcon } from '@/shared/components/ui/Icons';

const PREVIEW_TABS = [
  {
    id: 'saas',
    label: 'Web & SaaS',
    icon: 'web',
    status: 'Deploy v2.8 · Producción',
    latency: '42 ms',
    uptime: '99.98%',
    headline: 'Plataforma Multi-Tenant Activa',
    lines: [
      { key: 'Stack', val: 'React 19 · TypeScript · .NET 10' },
      { key: 'Seguridad', val: 'JWT Rotation + RBAC Granular' },
      { key: 'Rendimiento', val: 'Lighthouse 99 / 100 · Edge CDN' },
    ],
    highlights: ['Paneles en tiempo real', 'Exportación PDF y reportes', 'Escala horizontal automática'],
  },
  {
    id: 'mobile',
    label: 'Apps Móviles',
    icon: 'smartphone',
    status: 'iOS & Android · 60 FPS',
    latency: 'Push FCM',
    uptime: '4.9 ★',
    headline: 'Experiencia Nativa Unificada',
    lines: [
      { key: 'Stack', val: 'Flutter · Riverpod · Firebase' },
      { key: 'Notificaciones', val: 'Push segmentadas + Tiempo real' },
      { key: 'Distribución', val: 'Google Play & Apple App Store' },
    ],
    highlights: ['Biometría y pagos in-app', 'Mapas y geolocalización', 'Sincronización inteligente'],
  },
  {
    id: 'ai',
    label: 'IA & Automatización',
    icon: 'auto_awesome',
    status: 'Pipeline OCR + LLM',
    latency: '1.2 s',
    uptime: '99.2% acc',
    headline: 'Automatización Documental Inteligente',
    lines: [
      { key: 'Motor', val: 'Vision OCR + Modelos Generativos' },
      { key: 'Validación', val: 'Esquemas estrictos + Human-in-loop' },
      { key: 'Impacto', val: '-78% tiempo operativo manual' },
    ],
    highlights: ['Lectura de cédulas y facturas', 'Asistentes con contexto (RAG)', 'Generación de documentos'],
  },
] as const;

export function HeroSection() {
  const settings = useSiteSettings();
  const [activeTab, setActiveTab] = useState<(typeof PREVIEW_TABS)[number]['id']>('saas');
  const current = PREVIEW_TABS.find(t => t.id === activeTab) ?? PREVIEW_TABS[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-white dark:from-violet-950/35 dark:via-zinc-950 dark:to-zinc-950">
      <Blob className="absolute -top-40 -right-40 size-[580px] bg-violet-100 dark:bg-violet-900/20" />
      <Blob className="absolute top-64 -left-24 size-[420px] bg-violet-50 dark:bg-violet-900/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Columna izquierda: copy principal */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              Construimos software{' '}
              <span className="text-violet-600 dark:text-violet-400">
                preciso, elegante y escalable.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              En <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{settings.companyName}</strong>{' '}
              {settings.shortDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-lg shadow-violet-200 dark:shadow-violet-950/50"
              >
                Iniciar un proyecto
                <ArrowRightIcon />
              </Link>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
              >
                Explorar portafolio
              </Link>
              <Link
                to="/servicios#estimador"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Estimar proyecto →
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-200/70 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {COMPANY.metrics.map(m => (
                <div key={m.label}>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: panel interactivo de capacidades */}
          <div className="lg:col-span-5">
            <div className="cm-surface overflow-hidden">
              {/* Banner oficial COMCApps */}
              <div className="relative h-36 sm:h-40 overflow-hidden bg-zinc-950">
                <img
                  src={settings.bannerUrl || '/banner.png'}
                  alt={`Banner oficial de ${settings.companyName}`}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/90 bg-zinc-950/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                    comcapps://architecture
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-zinc-950/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>

              {/* Selector de especialidad */}
              <div className="flex gap-1 border-b border-zinc-100 dark:border-zinc-800 p-2 bg-white dark:bg-zinc-900">
                {PREVIEW_TABS.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-violet-600 text-white shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <MaterialIcon name={tab.icon} className="text-[16px]" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Contenido dinámico */}
              <div className="p-5 sm:p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      {current.status}
                    </span>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                      {current.headline}
                    </h2>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {current.uptime}
                    </p>
                    <p className="text-[11px] text-zinc-400">{current.latency}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 p-3.5 space-y-2.5 font-mono text-xs">
                  {current.lines.map(line => (
                    <div key={line.key} className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400">{line.key}:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium text-right">
                        {line.val}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2">
                  {current.highlights.map(item => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      <span className="size-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckIcon className="size-2.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
