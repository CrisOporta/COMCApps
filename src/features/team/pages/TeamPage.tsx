import { useState } from 'react';
import { Link } from 'react-router';
import {
  COMPANY_MILESTONES,
  COMPANY_VALUES,
  OPEN_ROLES,
} from '../data/teamData';
import {
  useTeamDepartments,
  useTeamMembers,
  type LiveTeamMember,
} from '../hooks/useTeamMembers';
import { CtaBanner } from '@/features/home/components/CtaBanner';
import { Blob } from '@/shared/components/ui/Blob';
import { Reveal } from '@/shared/components/ui/Reveal';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import {
  ArrowRightIcon,
  CloseIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MaterialIcon,
  XSocialIcon,
} from '@/shared/components/ui/Icons';
import { toast } from '@/shared/lib/toast';

function ensureHttpUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function MemberSocialLinks({
  member,
  onCopyEmail,
  compact = false,
}: {
  member: LiveTeamMember;
  onCopyEmail: (email: string) => void;
  compact?: boolean;
}) {
  const items = [
    { key: 'github', label: 'GitHub', url: member.links.github, icon: <GithubIcon className="size-3.5" /> },
    { key: 'linkedin', label: 'LinkedIn', url: member.links.linkedin, icon: <LinkedinIcon className="size-3.5" /> },
    { key: 'facebook', label: 'Facebook', url: member.links.facebook, icon: <FacebookIcon className="size-3.5" /> },
    { key: 'instagram', label: 'Instagram', url: member.links.instagram, icon: <InstagramIcon className="size-3.5" /> },
    { key: 'x', label: 'X', url: member.links.x, icon: <XSocialIcon className="size-3.5" /> },
    { key: 'website', label: 'Web', url: member.links.website, icon: <GlobeIcon className="size-3.5" /> },
  ].filter(i => Boolean(i.url));

  if (items.length === 0 && !member.links.email) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map(item => (
        <a
          key={item.key}
          href={ensureHttpUrl(item.url!)}
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.label} de ${member.name}`}
          aria-label={`${item.label} de ${member.name}`}
          className={
            compact
              ? 'inline-flex items-center justify-center size-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors'
              : 'inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors'
          }
        >
          {item.icon}
          {!compact && <span>{item.label}</span>}
        </a>
      ))}
      {member.links.email && (
        <button
          type="button"
          onClick={() => onCopyEmail(member.links.email!)}
          title={`Copiar correo: ${member.links.email}`}
          aria-label={`Copiar correo de ${member.name}`}
          className={
            compact
              ? 'inline-flex items-center justify-center size-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer'
              : 'inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer'
          }
        >
          <MailIcon className="size-3.5" />
          {!compact && <span>Correo</span>}
        </button>
      )}
    </div>
  );
}

export default function TeamPage() {
  const { items: teamMembers, loading: loadingMembers } = useTeamMembers();
  const { departments } = useTeamDepartments();
  const [department, setDepartment] = useState<string>('Todos');
  const [selectedMember, setSelectedMember] = useState<LiveTeamMember | null>(null);

  const visibleMembers =
    department === 'Todos'
      ? teamMembers
      : teamMembers.filter(m => m.department.toLowerCase() === department.toLowerCase());

  const handleCopyEmail = (email: string) => {
    navigator.clipboard?.writeText(email).then(() => {
      toast.success(`Correo ${email} copiado al portapapeles.`);
    });
  };

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-violet-50 via-white to-white dark:border-zinc-800 dark:from-violet-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <Blob className="absolute -right-32 -top-32 size-96 bg-violet-100 dark:bg-violet-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.1]">
            Las personas detrás de cada{' '}
            <span className="text-violet-600 dark:text-violet-400">línea de código</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Somos un equipo compacto y senior de arquitectos, diseñadores e ingenieros obsesionados con entregar software limpio, rápido y humano.
          </p>
        </div>
      </section>

      {/* ── Directorio del equipo con filtro por departamento ────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {departments.map(dep => (
            <button
              key={dep}
              type="button"
              onClick={() => setDepartment(dep)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                department === dep
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-950/40'
                  : 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700'
              }`}
            >
              {dep}
            </button>
          ))}
        </div>

        {loadingMembers ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="cm-surface h-64 animate-pulse bg-zinc-100/70 dark:bg-zinc-900/60" />
            ))}
          </div>
        ) : visibleMembers.length === 0 ? (
          <div className="cm-surface p-10 text-center">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              No hay miembros registrados en «{department}».
            </p>
            <button
              type="button"
              onClick={() => setDepartment('Todos')}
              className="mt-4 cm-action cm-action-secondary text-xs"
            >
              Ver todo el equipo
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMembers.map((member, i) => (
            <Reveal key={member.id} delay={(i % 3) * 80}>
              <article
                id={member.id}
                className="scroll-mt-24 cm-surface p-6 h-full flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-violet-200 dark:hover:border-violet-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {member.featuredImageUrl ? (
                      <img
                        src={member.featuredImageUrl}
                        alt={member.name}
                        loading="lazy"
                        className="size-14 rounded-2xl object-cover shadow-sm shrink-0 border border-zinc-200 dark:border-zinc-800"
                      />
                    ) : (
                      <div
                        className={`size-14 rounded-2xl bg-gradient-to-br ${member.avatarGradient} flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0`}
                      >
                        {member.initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                        {member.name}
                      </h2>
                      <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                        {member.role}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                        {member.department}
                        {member.experience ? ` · ${member.experience}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                  {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                  >
                    Ver perfil completo →
                  </button>
                  <MemberSocialLinks member={member} onCopyEmail={handleCopyEmail} compact />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        )}
      </section>

      {/* ── Valores de ingeniería ────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <Reveal>
            <SectionHeader
              badge="Principios"
              title="Nuestra cultura de ingeniería"
              subtitle="Cuatro valores no negociables que guían cada arquitectura, diseño y conversación con nuestros clientes."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPANY_VALUES.map((val, i) => (
              <Reveal key={val.title} delay={i * 90}>
                <div className="cm-surface p-6 h-full">
                  <div className="size-11 rounded-xl bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
                    <MaterialIcon name={val.icon} />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{val.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Historia / Timeline ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 border-b border-zinc-100 dark:border-zinc-800/60">
        <Reveal>
          <SectionHeader
            badge="Trayectoria"
            title="Nuestra evolución"
            subtitle="Crecimiento constante enfocado en dominar tecnologías modernas y generar impacto real."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPANY_MILESTONES.map((item, i) => (
            <Reveal key={item.year} delay={i * 100}>
              <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 h-full">
                <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">
                  {item.year}
                </span>
                <h3 className="mt-4 font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Vacantes / Únete al equipo ───────────────────────────────── */}
      <section id="carreras" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <Reveal>
          <SectionHeader
            badge="Carreras"
            title="¿Te apasiona crear software extraordinario?"
            subtitle="Siempre estamos atentos a talento curioso, autónomo y con ojo clínico para la calidad."
          />
        </Reveal>

        <div className="mt-10 space-y-4 max-w-4xl mx-auto">
          {OPEN_ROLES.map(role => (
            <div
              key={role.title}
              className="cm-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-50 dark:bg-violet-600/15 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 dark:text-violet-300">
                    {role.department}
                  </span>
                  <span className="text-xs text-zinc-400">{role.modality}</span>
                </div>
                <h3 className="mt-2 text-base font-bold text-zinc-900 dark:text-white">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{role.desc}</p>
              </div>
              <Link
                to={`/contacto?servicio=${encodeURIComponent(`Postulación: ${role.title}`)}`}
                className="cm-action cm-action-secondary shrink-0"
              >
                Postularme
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />

      {/* ── Modal de perfil de miembro ───────────────────────────────── */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/55 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Perfil de ${selectedMember.name}`}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {selectedMember.featuredImageUrl ? (
                  <img
                    src={selectedMember.featuredImageUrl}
                    alt={selectedMember.name}
                    className="size-16 rounded-2xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-800"
                  />
                ) : (
                  <div
                    className={`size-16 rounded-2xl bg-gradient-to-br ${selectedMember.avatarGradient} flex items-center justify-center text-white font-bold text-xl shrink-0`}
                  >
                    {selectedMember.initials}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {selectedMember.name}
                  </h2>
                  <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {selectedMember.department}
                    {selectedMember.experience ? ` · ${selectedMember.experience} de experiencia` : ''}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Cerrar modal"
                className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Especialidad
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {selectedMember.specialty}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Biografía
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>
              {selectedMember.skills.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Tecnologías y habilidades
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map(skill => (
                      <span
                        key={skill}
                        className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <MemberSocialLinks member={selectedMember} onCopyEmail={handleCopyEmail} />
              <Link
                to="/contacto"
                onClick={() => setSelectedMember(null)}
                className="cm-action cm-action-primary text-xs ml-auto"
              >
                Contactar al equipo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
