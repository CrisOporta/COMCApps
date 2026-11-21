import { Link } from 'react-router';
import { COMPANY } from '@/shared/config/company';
import { ArrowLeftIcon } from '@/shared/components/ui/Icons';

const SECTIONS = [
  {
    title: '1. Alcance del sitio web',
    body: `Este sitio presenta los servicios de ingeniería de software, portafolio, equipo y artículos técnicos de ${COMPANY.name}. Las estimaciones mostradas en el cotizador interactivo son referenciales y no constituyen un contrato vinculante hasta firmar una propuesta formal.`,
  },
  {
    title: '2. Propiedad intelectual',
    body: `Los diseños, marcas, textos, ilustraciones y código fuente de este sitio son propiedad de ${COMPANY.legalName}. En proyectos contratados por clientes, la titularidad del código entregado se rige por el contrato de servicios correspondiente.`,
  },
  {
    title: '3. Limitación de responsabilidad',
    body: 'Aunque mantenemos el contenido técnico actualizado y verificado, los artículos publicados en el blog tienen carácter informativo y educativo.',
  },
  {
    title: '4. Contacto',
    body: `Para cualquier duda legal o comercial puedes escribirnos a ${COMPANY.email}.`,
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline mb-6"
      >
        <ArrowLeftIcon className="size-3.5" /> Volver al inicio
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
        Términos de Uso
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
