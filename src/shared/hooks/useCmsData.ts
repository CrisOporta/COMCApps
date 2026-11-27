import { useEffect, useState } from 'react';
import {
  cmsApi,
  type CmsPageBlockDTO,
  type CmsPageDTO,
  type MediaAssetDTO,
  type SiteSettingDTO,
  type WithMedia,
} from '@/shared/lib/cmsApi';
import { COMPANY } from '@/shared/config/company';

export interface CmsMediaAttachment {
  featuredImageUrl?: string | null;
  gallery?: MediaAssetDTO[];
}

export const DEFAULT_SITE_SETTINGS: SiteSettingDTO = {
  companyName: COMPANY.name,
  legalName: COMPANY.legalName,
  tagline: COMPANY.tagline,
  shortDesc: COMPANY.shortDesc,
  email: COMPANY.email,
  localEmail: 'local@comcapps.com',
  phonePrimary: COMPANY.phonePrimary,
  whatsAppNumber: '50588001234',
  addressLine1: 'Centro Comercial / Avenida Principal, Módulo COMCApps',
  addressLine2: 'Managua, Nicaragua',
  schedule: 'Lunes a Viernes · 8:00 AM – 6:00 PM | Sábados · 8:30 AM – 4:00 PM',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Managua,Nicaragua&output=embed',
  mapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Managua+Nicaragua',
  logoUrl: '/logo.png',
  bannerUrl: '/banner.png',
  githubUrl: COMPANY.socials.github,
  linkedinUrl: COMPANY.socials.linkedin,
  facebookUrl: '',
  instagramUrl: COMPANY.socials.instagram,
};

const STORAGE_PREFIX = 'comcapps_cms_cache_v1_';

function readStorageCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorageCache<T>(key: string, value: T) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Ignorar cuota de almacenamiento llena
  }
}

let cachedSettings: SiteSettingDTO | null = readStorageCache<SiteSettingDTO>('settings');
let settingsPromise: Promise<SiteSettingDTO> | null = null;

export function useSiteSettings(): SiteSettingDTO {
  const [settings, setSettings] = useState<SiteSettingDTO>(cachedSettings ?? DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let active = true;
    if (!settingsPromise) {
      settingsPromise = cmsApi
        .getSettings()
        .then(res => {
          if (!res) return DEFAULT_SITE_SETTINGS;
          const merged: SiteSettingDTO = {
            ...DEFAULT_SITE_SETTINGS,
            ...res,
            companyName: res.companyName || DEFAULT_SITE_SETTINGS.companyName,
            logoUrl: res.logoUrl || DEFAULT_SITE_SETTINGS.logoUrl,
            bannerUrl: res.bannerUrl || DEFAULT_SITE_SETTINGS.bannerUrl,
          };
          cachedSettings = merged;
          writeStorageCache('settings', merged);
          return merged;
        })
        .catch(() => cachedSettings ?? DEFAULT_SITE_SETTINGS);
    }

    settingsPromise.then(data => {
      if (active) setSettings(data);
    });

    return () => {
      active = false;
    };
  }, []);

  return settings;
}

let cachedNavbarPages: CmsPageDTO[] | null = readStorageCache<CmsPageDTO[]>('navbar_pages');
let navbarPagesPromise: Promise<CmsPageDTO[]> | null = null;

export function useNavbarCmsPages(): CmsPageDTO[] {
  const [pages, setPages] = useState<CmsPageDTO[]>(cachedNavbarPages ?? []);

  useEffect(() => {
    let active = true;
    if (!navbarPagesPromise) {
      navbarPagesPromise = cmsApi
        .getPages(false)
        .then(list => {
          const custom = list.filter(p => !p.isSystemPage && p.isPublished && p.showInNavbar);
          cachedNavbarPages = custom;
          writeStorageCache('navbar_pages', custom);
          return custom;
        })
        .catch(() => cachedNavbarPages ?? []);
    }

    navbarPagesPromise.then(data => {
      if (active) setPages(data);
    });

    return () => {
      active = false;
    };
  }, []);

  return pages;
}

const pageCache = new Map<string, CmsPageDTO | null>();

export function useCmsPage(slug: string): {
  page: CmsPageDTO | null;
  blocks: CmsPageBlockDTO[];
  loaded: boolean;
} {
  const [page, setPage] = useState<CmsPageDTO | null>(
    () => pageCache.get(slug) ?? readStorageCache<CmsPageDTO>(`page_${slug}`),
  );
  const [loaded, setLoaded] = useState(() => pageCache.has(slug));

  useEffect(() => {
    let active = true;
    cmsApi
      .getPageBySlug(slug)
      .then(res => {
        pageCache.set(slug, res);
        writeStorageCache(`page_${slug}`, res);
        if (active) {
          setPage(res);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const blocks = (page?.blocks ?? [])
    .filter(b => b.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return { page, blocks, loaded };
}

const collectionCache = new Map<string, WithMedia<unknown>[]>();

export function useCmsCollection<TApi, TView>(
  collection: string,
  fallback: TView[],
  mapper: (entry: WithMedia<TApi>, index: number) => TView,
): { items: TView[]; isFromApi: boolean; loading: boolean } {
  const [raw, setRaw] = useState<WithMedia<TApi>[] | null>(() => {
    const inMem = collectionCache.get(collection) as WithMedia<TApi>[] | undefined;
    if (inMem) return inMem;
    const fromStorage = readStorageCache<WithMedia<TApi>[]>(`col_${collection}`);
    if (fromStorage) {
      collectionCache.set(collection, fromStorage as WithMedia<unknown>[]);
      return fromStorage;
    }
    return null;
  });
  const [loading, setLoading] = useState(() => !collectionCache.has(collection));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    cmsApi
      .listCollection<TApi>(collection)
      .then(list => {
        collectionCache.set(collection, list as WithMedia<unknown>[]);
        writeStorageCache(`col_${collection}`, list);
        if (active) {
          setRaw(list);
          setFailed(false);
        }
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [collection]);

  if (raw !== null) {
    return {
      items: raw.map((entry, idx) => mapper(entry, idx)),
      isFromApi: true,
      loading: false,
    };
  }

  // Mientras carga por primera vez (sin caché previa de BD), NO mostramos datos estáticos falsos
  if (loading && !failed) {
    return { items: [], isFromApi: false, loading: true };
  }

  return { items: fallback, isFromApi: false, loading: false };
}

export function parseJsonArray<T = string>(raw?: string | null, fallback: T[] = []): T[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CA';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function formatShortDate(isoOrText?: string | null): string {
  if (!isoOrText) return '';
  const d = new Date(isoOrText);
  if (Number.isNaN(d.getTime())) return isoOrText;
  return d.toLocaleDateString('es-NI', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function parseMarkdownToSections(markdown: string): Array<{
  id: string;
  heading: string;
  paragraphs: string[];
}> {
  const text = (markdown || '').trim();
  if (!text) return [];
  const chunks = text.split(/\n(?=##\s+)/);
  return chunks.map((chunk, idx) => {
    const lines = chunk.split('\n');
    let heading = `Sección ${idx + 1}`;
    let bodyLines = lines;
    if (lines[0]?.startsWith('##')) {
      heading = lines[0].replace(/^#+\s*/, '').trim();
      bodyLines = lines.slice(1);
    }
    const paragraphs = bodyLines
      .join('\n')
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean);
    const id =
      heading
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || `sec-${idx + 1}`;
    return { id, heading, paragraphs };
  });
}
