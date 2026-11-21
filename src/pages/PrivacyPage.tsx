import { Link } from 'react-router';
import { COMPANY } from '@/shared/config/company';
import { ArrowLeftIcon } from '@/shared/components/ui/Icons';

const SECTIONS = [
  {
    title: '1. Información que recopilamos',
    body: `Cuando nos contactas a través del sitio web de ${COMPANY.name} podemos recopilar tu nombre, correo electrónico, empresa, teléfono y los detalles que compartas voluntariamente sobre tu proyecto.`,
  },
  {
    title: '2. Uso de la información',
    body: 'Utilizamos tus datos exclusivamente para responder tus consultas, preparar propuestas técnicas, coordinar reuniones y brindar soporte a nuestros clientes. Nunca vendemos ni cedemos tus datos a terceros con fines comerciales.',
  },
  {
    title: '3. Seguridad y confidencialidad',
    body: 'Aplicamos controles técnicos y organizativos modernos para proteger la información recibida. Todos los requerimientos de proyecto se manejan de manera confidencial.',
  },
  {
    title: '4. Derechos y contacto',
    body: `Puedes solicitar la actualización o eliminación de tus datos en cualquier momento escribiendo a ${COMPANY.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline mb-6"
      >
        <ArrowLeftIcon className="size-3.5" /> Volver al inicio
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
        Política de Privacidad
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        Última actualización: {new Date().getFullYear()} · {COMPANY.legalName}
      </p>

      <div className="mt-8 space-y-5">
        {SECTIONS.map(sec => (
          <section key={sec.title} className="cm-surface p-6">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">{sec.title}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {sec.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
