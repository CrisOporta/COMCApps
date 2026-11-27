import { useCmsCollection, parseJsonArray, type CmsMediaAttachment } from '@/shared/hooks/useCmsData';
import type { WithMedia } from '@/shared/lib/cmsApi';
import {
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
  type ProjectMetric,
} from '../data/projectsData';

interface ApiProjectItem {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  clientName: string;
  year: string;
  icon: string;
  summary: string;
  challenge: string;
  solution: string;
  stackJson: string;
  metricsJson: string;
  liveUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export type LiveProjectItem = ProjectItem &
  CmsMediaAttachment & {
    liveUrl?: string | null;
  };

const GRADIENTS = [
  'from-violet-600 via-indigo-600 to-slate-900',
  'from-emerald-600 via-teal-700 to-zinc-900',
  'from-blue-600 via-violet-700 to-zinc-900',
  'from-cyan-600 via-sky-700 to-zinc-900',
  'from-amber-600 via-orange-700 to-zinc-900',
  'from-rose-600 via-purple-700 to-zinc-900',
];

function normalizeCategory(cat: string): ProjectCategory {
  if (cat === 'Web & SaaS' || cat === 'Apps Móviles' || cat === 'IA & Datos' || cat === 'Cloud & APIs') {
    return cat;
  }
  const lower = cat.toLowerCase();
  if (lower.includes('móvil') || lower.includes('movil') || lower.includes('app')) return 'Apps Móviles';
  if (lower.includes('ia') || lower.includes('ai') || lower.includes('dato')) return 'IA & Datos';
  if (lower.includes('cloud') || lower.includes('api')) return 'Cloud & APIs';
  return 'Web & SaaS';
}

function mapProject(entry: WithMedia<ApiProjectItem>, idx: number): LiveProjectItem {
  const p = entry.item;
  const metrics = parseJsonArray<ProjectMetric>(p.metricsJson);
  const stack = parseJsonArray<string>(p.stackJson);
  return {
    slug: p.slug,
    title: p.title,
    tagline: p.tagline || p.summary,
    category: normalizeCategory(p.category || 'Web & SaaS'),
    client: p.clientName || 'Cliente COMCApps',
    year: p.year || '2026',
    featured: p.isFeatured,
    status: p.isFeatured ? 'En producción' : 'Caso de éxito',
    gradient: GRADIENTS[idx % GRADIENTS.length],
    icon: p.icon || 'rocket_launch',
    summary: p.summary,
    challenge: p.challenge || p.summary,
    solution: p.solution || p.summary,
    results:
      metrics.length > 0
        ? metrics.map(m => `${m.label}: ${m.value}`)
        : ['Solución implementada y operando en producción con soporte COMCApps.'],
    metrics:
      metrics.length > 0
        ? metrics
        : [
            { label: 'Disponibilidad', value: '99.9%' },
            { label: 'Entrega', value: p.year || '2026' },
            { label: 'Stack', value: `${stack.length || 4}+ tech` },
          ],
    stack,
    deliverables: stack.length > 0 ? stack.slice(0, 4) : ['Plataforma Productiva'],
    liveUrl: p.liveUrl,
    featuredImageUrl: entry.featuredImageUrl,
    gallery: entry.media ?? [],
  };
}

export function useProjects() {
  return useCmsCollection<ApiProjectItem, LiveProjectItem>('projects', PROJECTS, mapProject);
}
