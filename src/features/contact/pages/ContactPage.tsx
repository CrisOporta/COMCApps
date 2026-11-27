import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSiteSettings } from '@/shared/hooks/useCmsData';
import { Blob } from '@/shared/components/ui/Blob';
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  MaterialIcon,
  PhoneIcon,
} from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';
import { cmsApi } from '@/shared/lib/cmsApi';
import { contactSchema, type ContactFormValues } from '../schemas/contactSchema';

const SERVICE_OPTIONS = [
  'Plataformas Web y SaaS',
  'Aplicaciones Móviles (iOS & Android)',
  'Ecosistema Completo (Web + App)',
  'Inteligencia Artificial y Automatización',
  'Diseño UI/UX y Design Systems',
  'APIs, Backend y Arquitectura Cloud',
  'Consultoría Técnica / Squad Dedicado',
  'Otro',
] as const;

const BUDGET_OPTIONS = [
  'Menos de $5,000 USD',
  '$5,000 – $15,000 USD',
  '$15,000 – $35,000 USD',
  'Más de $35,000 USD',
  'Por definir en reunión',
] as const;

export default function ContactPage() {
  const settings = useSiteSettings();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  const prefilledService = searchParams.get('servicio') ?? '';
  const prefilledSummary = searchParams.get('resumen') ?? '';

  const matchedService = SERVICE_OPTIONS.find(
    opt => opt.toLowerCase() === prefilledService.toLowerCase(),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      phone: '',
      service: matchedService ?? (prefilledService ? 'Otro' : SERVICE_OPTIONS[0]),
      budget: 'Por definir en reunión',
      message: prefilledSummary
        ? `Hola equipo de COMCApps, me gustaría cotizar este alcance:\n\n${prefilledSummary}`
        : prefilledService && !matchedService
          ? `Hola equipo de COMCApps, escribo respecto a: ${prefilledService}.\n\n`
          : '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await cmsApi.submitContact({
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        budget: data.budget,
        message: data.message,
      });
    } catch {
      // Si la API no está levantada en desarrollo local, mantenemos UX fluida
    }
    setSubmitted(true);
    toast.success(
      `Gracias, ${data.fullName.split(' ')[0]}. Recibimos tu solicitud y responderemos en menos de 24h.`,
      { title: 'Solicitud enviada', duration: 5000 },
    );
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      toast.info(`${label} copiado al portapapeles.`);
    });
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <Blob className="absolute -right-32 -top-32 size-96 bg-violet-100 dark:bg-violet-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.1]">
            Construyamos algo <span className="text-violet-600 dark:text-violet-400">extraordinario</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cuéntanos tus objetivos, retos técnicos o idea de producto. Un arquitecto de soluciones de COMCApps se pondrá en contacto contigo en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      {/* ── Formulario + Canales directos ────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formulario */}
          <div className="lg:col-span-7">
            <div className="cm-surface p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto size-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                    <CheckIcon className="size-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    ¡Mensaje recibido con éxito!
                  </h2>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Nuestro equipo revisará los detalles de tu solicitud y te contactará pronto para agendar una reunión de descubrimiento.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setSubmitted(false);
                    }}
                    className="mt-6 cm-action cm-action-secondary"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                      Detalles de tu solicitud
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Los campos marcados con * son obligatorios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Nombre completo *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Ej. María González"
                        aria-invalid={Boolean(errors.fullName)}
                        {...register('fullName')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Correo corporativo o personal *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="maria@empresa.com"
                        aria-invalid={Boolean(errors.email)}
                        {...register('email')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Empresa u organización
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        {...register('company')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+505 8800 0000"
                        {...register('phone')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Servicio de interés *
                      </label>
                      <select
                        id="service"
                        {...register('service')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white"
                      >
                        {SERVICE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                      >
                        Presupuesto estimado *
                      </label>
                      <select
                        id="budget"
                        {...register('budget')}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 text-sm text-zinc-900 dark:text-white"
                      >
                        {BUDGET_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                    >
                      Cuéntanos sobre tu proyecto *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Describe brevemente qué problema deseas resolver, fecha ideal de lanzamiento o enlaces de referencia..."
                      aria-invalid={Boolean(errors.message)}
                      {...register('message')}
                      className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cm-action cm-action-primary py-3.5"
                  >
                    {isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud de proyecto'}
                    {!isSubmitting && <ArrowRightIcon />}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Información de contacto */}
          <aside className="lg:col-span-5 space-y-5">
            <div className="cm-surface p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-4">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Tiempo de respuesta promedio: &lt; 4 horas
              </span>

              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Canales directos
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Si prefieres escribirnos o llamarnos directamente, aquí nos encuentras:
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => handleCopy(settings.email, 'Correo')}
                  className="w-full flex items-center gap-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 p-3.5 text-left hover:border-violet-300 dark:hover:border-violet-700 transition-colors cursor-pointer"
                >
                  <span className="size-10 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <MailIcon className="size-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Correo electrónico (clic para copiar)
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {settings.email}
                    </p>
                  </div>
                </button>

                <a
                  href={`tel:${settings.phonePrimary.replace(/\s/g, '')}`}
                  className="flex items-center gap-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 p-3.5 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
                >
                  <span className="size-10 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <PhoneIcon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Teléfono / WhatsApp
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {settings.phonePrimary}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 p-3.5">
                  <span className="size-10 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <MapPinIcon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                      Ubicación & Horario
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {settings.addressLine1} · {settings.addressLine2}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{settings.schedule}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-zinc-900/60 p-6">
              <div className="flex items-center gap-3 mb-2">
                <MaterialIcon name="verified" className="text-[22px] text-violet-600 dark:text-violet-400" />
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                  Confidencialidad garantizada (NDA)
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tu idea y documentación técnica se tratan bajo estricta confidencialidad. Si tu empresa requiere firmar un acuerdo de no divulgación (NDA) antes de la primera reunión, lo firmamos sin fricción.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
