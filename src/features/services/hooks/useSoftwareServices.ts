import { useCmsCollection, parseJsonArray, type CmsMediaAttachment } from '@/shared/hooks/useCmsData';
import type { WithMedia } from '@/shared/lib/cmsApi';
import { SERVICES, type ServiceItem } from '../data/servicesData';

interface ApiSoftwareService {
  id: number;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  timeline: string;
  idealFor: string;
  deliverablesJson: string;
  technologiesJson: string;
  accent: boolean;
  isPublished: boolean;
}

export type LiveServiceItem = ServiceItem & CmsMediaAttachment;

function mapSoftwareService(entry: WithMedia<ApiSoftwareService>): LiveServiceItem {
  const s = entry.item;
  return {
    id: String(s.id),
    slug: s.slug,
    icon: s.icon || 'code',
    title: s.title,
    shortDesc: s.shortDesc,
    fullDesc: s.fullDesc || s.shortDesc,
    accent: s.accent,
    deliverables: parseJsonArray<string>(s.deliverablesJson),
    technologies: parseJsonArray<string>(s.technologiesJson),
    timeline: s.timeline || '4 – 8 semanas',
    idealFor: s.idealFor || 'Empresas y comercios en crecimiento.',
    featuredImageUrl: entry.featuredImageUrl,
    gallery: entry.media ?? [],
  };
}

export function useSoftwareServices() {
  return useCmsCollection<ApiSoftwareService, LiveServiceItem>(
    'software-services',
    SERVICES,
    mapSoftwareService,
  );
}
