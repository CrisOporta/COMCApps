export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:5280' : 'https://api-comcapps.comcapps.com');

const TOKEN_KEY = 'comcapps_admin_access_token';
const REFRESH_KEY = 'comcapps_admin_refresh_token';
const USER_KEY = 'comcapps_admin_user';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
}

export interface MediaAssetDTO {
  id: number;
  entityType: string;
  entityId?: number | null;
  url: string;
  objectKey?: string | null;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  altText?: string | null;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface WithMedia<T> {
  item: T;
  featuredImageUrl?: string | null;
  media: MediaAssetDTO[];
}

export interface CmsPageBlockDTO {
  id?: number;
  blockType: string;
  label: string;
  configJson: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface CmsPageDTO {
  id: number;
  slug: string;
  title: string;
  metaDescription?: string | null;
  isSystemPage: boolean;
  isPublished: boolean;
  showInNavbar: boolean;
  blocks: CmsPageBlockDTO[];
}

export interface SiteSettingDTO {
  id?: number;
  companyName: string;
  legalName: string;
  tagline: string;
  shortDesc: string;
  email: string;
  localEmail: string;
  phonePrimary: string;
  whatsAppNumber: string;
  addressLine1: string;
  addressLine2: string;
  schedule: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  logoUrl: string;
  bannerUrl: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}

export interface TeamDepartmentDTO {
  id: number;
  name: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactSubmissionDTO {
  id: number;
  fullName: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service: string;
  budget?: string | null;
  message: string;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
}

export interface ApiEnvelope<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages?: string[];
  result?: T;
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(accessToken: string, refreshToken: string, user?: AdminUser) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  requireAuth = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAdminToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else if (requireAuth) {
    throw new Error('Sesión de administrador requerida.');
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && requireAuth) {
    const refresh = localStorage.getItem(REFRESH_KEY);
    if (refresh && token) {
      const refRes = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token, refreshToken: refresh }),
      });
      if (refRes.ok) {
        const refData = (await refRes.json()) as ApiEnvelope<{ accessToken: string; refreshToken: string }>;
        if (refData.isSuccess && refData.result) {
          saveAdminSession(refData.result.accessToken, refData.result.refreshToken);
          headers.set('Authorization', `Bearer ${refData.result.accessToken}`);
          const retry = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
          const retryJson = (await retry.json()) as ApiEnvelope<T>;
          if (!retry.ok || !retryJson.isSuccess) {
            throw new Error(retryJson.errorMessages?.[0] || 'Error en la solicitud.');
          }
          return retryJson.result as T;
        }
      }
    }
    clearAdminSession();
    throw new Error('Tu sesión ha expirado. Inicia sesión nuevamente.');
  }

  const data = (await res.json()) as ApiEnvelope<T>;
  if (!res.ok || !data.isSuccess) {
    throw new Error(data.errorMessages?.[0] || `Error HTTP ${res.status}`);
  }
  return data.result as T;
}

export const cmsApi = {
  // Auth (solo Admin)
  login: async (email: string, password: string) => {
    const res = await request<{ accessToken: string; refreshToken: string; user: AdminUser }>(
      '/api/v1/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    );
    saveAdminSession(res.accessToken, res.refreshToken, res.user);
    return res;
  },
  logout: async () => {
    const accessToken = getAdminToken();
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (accessToken && refreshToken) {
      try {
        await request('/api/v1/auth/revoke', {
          method: 'POST',
          body: JSON.stringify({ accessToken, refreshToken }),
        }, true);
      } catch {
        // Ignorar error de red al cerrar sesión
      }
    }
    clearAdminSession();
  },
  changePassword: (currentPassword: string, newPassword: string) =>
    request('/api/v1/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }, true),

  // Dashboard & Settings
  getDashboard: () =>
    request<{
      counts: Record<string, number>;
      recentMessages: ContactSubmissionDTO[];
    }>('/api/v1/cms/dashboard', {}, true),

  getSettings: () => request<SiteSettingDTO | null>('/api/v1/cms/settings'),
  updateSettings: (dto: SiteSettingDTO) =>
    request<SiteSettingDTO>('/api/v1/cms/settings', {
      method: 'PUT',
      body: JSON.stringify(dto),
    }, true),

  // Pages & Drag-and-Drop Builder
  getPages: (includeUnpublished = true) =>
    request<CmsPageDTO[]>(`/api/v1/pages?includeUnpublished=${includeUnpublished}`),
  getPageBySlug: (slug: string) => request<CmsPageDTO>(`/api/v1/pages/slug/${encodeURIComponent(slug)}`),
  createPage: (dto: { slug: string; title: string; metaDescription?: string; isPublished: boolean; showInNavbar: boolean }) =>
    request<CmsPageDTO>('/api/v1/pages', { method: 'POST', body: JSON.stringify(dto) }, true),
  updatePage: (id: number, dto: { slug: string; title: string; metaDescription?: string; isPublished: boolean; showInNavbar: boolean }) =>
    request<CmsPageDTO>(`/api/v1/pages/${id}`, { method: 'PUT', body: JSON.stringify(dto) }, true),
  savePageBlocks: (pageId: number, blocks: CmsPageBlockDTO[]) =>
    request<CmsPageDTO>(`/api/v1/pages/${pageId}/blocks`, {
      method: 'PUT',
      body: JSON.stringify({ blocks }),
    }, true),
  deletePage: (id: number) => request(`/api/v1/pages/${id}`, { method: 'DELETE' }, true),

  // Media / Cloudflare R2 (bucket: comcapps)
  getMediaLibrary: (entityType?: string) =>
    request<MediaAssetDTO[]>(
      `/api/v1/media${entityType ? `?entityType=${encodeURIComponent(entityType)}` : ''}`,
      {},
      true,
    ),
  getEntityMedia: (entityType: string, entityId: number) =>
    request<MediaAssetDTO[]>(`/api/v1/media/entity/${encodeURIComponent(entityType)}/${entityId}`),
  uploadMediaFiles: (files: File[], entityType: string, entityId?: number, firstAsFeatured = false) => {
    const fd = new FormData();
    files.forEach(f => fd.append('files', f));
    fd.append('entityType', entityType);
    if (entityId !== undefined) fd.append('entityId', String(entityId));
    fd.append('firstAsFeatured', String(firstAsFeatured));
    return request<MediaAssetDTO[]>('/api/v1/media/upload', { method: 'POST', body: fd }, true);
  },
  attachMediaUrl: (url: string, entityType: string, entityId?: number, isFeatured = false, altText?: string) =>
    request<MediaAssetDTO>('/api/v1/media/attach-url', {
      method: 'POST',
      body: JSON.stringify({ url, entityType, entityId, isFeatured, altText }),
    }, true),
  setFeaturedMedia: (mediaId: number) =>
    request<MediaAssetDTO>(`/api/v1/media/${mediaId}/featured`, { method: 'PATCH' }, true),
  deleteMedia: (mediaId: number) =>
    request(`/api/v1/media/${mediaId}`, { method: 'DELETE' }, true),

  // Generic CRUD para colecciones CMS (local-services, software-services, projects, team, blog)
  listCollection: <T>(collection: string) =>
    request<WithMedia<T>[]>(`/api/v1/cms/${collection}`),
  createItem: <T>(collection: string, payload: Record<string, unknown>) =>
    request<WithMedia<T>>(`/api/v1/cms/${collection}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, true),
  updateItem: <T>(collection: string, id: number, payload: Record<string, unknown>) =>
    request<WithMedia<T>>(`/api/v1/cms/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, true),
  deleteItem: (collection: string, id: number) =>
    request(`/api/v1/cms/${collection}/${id}`, { method: 'DELETE' }, true),
  reorderCollection: (collection: string, orderedIds: number[]) =>
    request<{ reordered: boolean; count: number }>(`/api/v1/cms/${collection}/reorder`, {
      method: 'PATCH',
      body: JSON.stringify({ orderedIds }),
    }, true),

  // Departamentos / Etiquetas de Equipo
  getTeamDepartments: () => request<TeamDepartmentDTO[]>('/api/v1/cms/team-departments'),
  createTeamDepartment: (payload: { name: string; displayOrder: number; isActive: boolean }) =>
    request<TeamDepartmentDTO>('/api/v1/cms/team-departments', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, true),
  updateTeamDepartment: (id: number, payload: { name: string; displayOrder: number; isActive: boolean }) =>
    request<TeamDepartmentDTO>(`/api/v1/cms/team-departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, true),
  deleteTeamDepartment: (id: number) =>
    request(`/api/v1/cms/team-departments/${id}`, { method: 'DELETE' }, true),

  // Contact Messages
  submitContact: (payload: {
    fullName: string;
    email: string;
    company?: string;
    phone?: string;
    service: string;
    budget?: string;
    message: string;
  }) =>
    request('/api/v1/cms/contact', { method: 'POST', body: JSON.stringify(payload) }),
  getContacts: () => request<ContactSubmissionDTO[]>('/api/v1/cms/contact', {}, true),
  markContactRead: (id: number) =>
    request<ContactSubmissionDTO>(`/api/v1/cms/contact/${id}/read`, { method: 'PATCH' }, true),
  toggleContactResolved: (id: number) =>
    request<ContactSubmissionDTO>(`/api/v1/cms/contact/${id}/resolved`, { method: 'PATCH' }, true),
  deleteContact: (id: number) =>
    request(`/api/v1/cms/contact/${id}`, { method: 'DELETE' }, true),
};
