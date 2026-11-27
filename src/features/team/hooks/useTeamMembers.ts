import { useEffect, useState } from 'react';
import {
  useCmsCollection,
  parseJsonArray,
  getInitials,
  type CmsMediaAttachment,
} from '@/shared/hooks/useCmsData';
import { cmsApi, type TeamDepartmentDTO, type WithMedia } from '@/shared/lib/cmsApi';
import { TEAM_DEPARTMENTS, TEAM_MEMBERS, type TeamMember } from '../data/teamData';

interface ApiTeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  experience?: string | null;
  specialty?: string | null;
  bio: string;
  skillsJson: string;
  email?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  websiteUrl?: string | null;
  isPublished: boolean;
}

export interface TeamSocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  website?: string;
  email?: string;
}

export type LiveTeamMember = Omit<TeamMember, 'department' | 'links'> &
  CmsMediaAttachment & {
    department: string;
    links: TeamSocialLinks;
  };

const AVATAR_GRADIENTS = [
  'from-violet-600 to-indigo-700',
  'from-emerald-500 to-teal-700',
  'from-sky-600 to-indigo-700',
  'from-rose-500 to-violet-600',
  'from-amber-500 to-orange-600',
  'from-fuchsia-600 to-purple-700',
];

function mapTeamMember(entry: WithMedia<ApiTeamMember>, idx: number): LiveTeamMember {
  const m = entry.item;
  const skills = parseJsonArray<string>(m.skillsJson);
  return {
    id: String(m.id),
    name: m.name,
    role: m.role,
    department: (m.department || 'Ingeniería').trim(),
    initials: getInitials(m.name),
    avatarGradient: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
    bio: m.bio,
    specialty: m.specialty?.trim() || skills.slice(0, 3).join(', ') || m.role,
    experience: m.experience?.trim() || '',
    skills,
    links: {
      github: m.githubUrl?.trim() || undefined,
      linkedin: m.linkedinUrl?.trim() || undefined,
      facebook: m.facebookUrl?.trim() || undefined,
      instagram: m.instagramUrl?.trim() || undefined,
      x: m.xUrl?.trim() || undefined,
      website: m.websiteUrl?.trim() || undefined,
      email: m.email?.trim() || undefined,
    },
    featuredImageUrl: entry.featuredImageUrl,
    gallery: entry.media ?? [],
  };
}

export function useTeamMembers() {
  return useCmsCollection<ApiTeamMember, LiveTeamMember>('team', TEAM_MEMBERS, mapTeamMember);
}

const DEPT_CACHE_KEY = 'comcapps_cms_cache_v1_team_departments';
const DEFAULT_DEPT_NAMES = TEAM_DEPARTMENTS.filter(d => d !== 'Todos');

function readCachedDepts(): TeamDepartmentDTO[] | null {
  try {
    const raw = localStorage.getItem(DEPT_CACHE_KEY);
    return raw ? (JSON.parse(raw) as TeamDepartmentDTO[]) : null;
  } catch {
    return null;
  }
}

export function useTeamDepartments(): { departments: string[]; loading: boolean } {
  const [items, setItems] = useState<TeamDepartmentDTO[] | null>(() => readCachedDepts());
  const [loading, setLoading] = useState(() => readCachedDepts() === null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    cmsApi
      .getTeamDepartments()
      .then(list => {
        try {
          localStorage.setItem(DEPT_CACHE_KEY, JSON.stringify(list));
        } catch {
          // ignore
        }
        if (active) {
          setItems(list);
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
  }, []);

  if (items !== null) {
    return {
      departments: ['Todos', ...items.filter(d => d.isActive).map(d => d.name)],
      loading: false,
    };
  }

  if (loading && !failed) {
    return { departments: ['Todos'], loading: true };
  }

  return { departments: ['Todos', ...DEFAULT_DEPT_NAMES], loading: false };
}
