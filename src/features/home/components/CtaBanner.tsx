import { Link } from 'react-router';
import { Reveal } from '@/shared/components/ui/Reveal';
import { ArrowRightIcon } from '@/shared/components/ui/Icons';

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
}

export function CtaBanner({
  title = '¿Listo para llevar tu próximo producto digital a producción?',
  subtitle = 'Cuéntanos qué necesitas construir. En menos de 24 horas hábiles coordinamos una sesión técnica sin compromiso para definir arquitectura, tiempos e inversión.',
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-violet-900 dark:from-violet-700 dark:to-violet-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-24 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {title}
          </h2>
          <p className="mt-5 text-violet-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-zinc-50 active:bg-zinc-100 px-7 py-3.5 text-sm font-semibold text-violet-700 transition-all shadow-lg shadow-violet-950/30"
            >
              Agendar reunión técnica
              <ArrowRightIcon className="size-4 text-violet-600" />
            </Link>
            <Link
              to="/servicios#estimador"
              className="inline-flex items-center gap-2 rounded-full border border-violet-300/50 hover:border-white/80 hover:bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all"
            >
              Usar estimador de costos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
