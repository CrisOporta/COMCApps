import {
  useCmsCollection,
  parseJsonArray,
  getInitials,
  formatShortDate,
  parseMarkdownToSections,
  type CmsMediaAttachment,
} from '@/shared/hooks/useCmsData';
import type { WithMedia } from '@/shared/lib/cmsApi';
import { BLOG_POSTS, type BlogCategory, type BlogPost } from '../data/blogData';

interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  contentMarkdown: string;
  authorName: string;
  readTime: string;
  tagsJson: string;
  publishedAt: string;
  isPublished: boolean;
}

export type LiveBlogPost = BlogPost & CmsMediaAttachment;

const GRADIENTS = [
  'from-violet-600 to-indigo-800',
  'from-emerald-600 to-teal-800',
  'from-purple-600 to-rose-700',
  'from-sky-600 to-blue-800',
  'from-zinc-700 to-zinc-950',
];

function normalizeCategory(cat: string): BlogCategory {
  if (
    cat === 'Arquitectura' ||
    cat === 'Desarrollo Web' ||
    cat === 'Móvil' ||
    cat === 'Inteligencia Artificial' ||
    cat === 'DevOps'
  ) {
    return cat;
  }
  const lower = cat.toLowerCase();
  if (lower.includes('web')) return 'Desarrollo Web';
  if (lower.includes('móvil') || lower.includes('movil')) return 'Móvil';
  if (lower.includes('ia') || lower.includes('inteligencia')) return 'Inteligencia Artificial';
  if (lower.includes('devops') || lower.includes('cloud')) return 'DevOps';
  return 'Arquitectura';
}

function mapBlogPost(entry: WithMedia<ApiBlogPost>, idx: number): LiveBlogPost {
  const b = entry.item;
  const sections = parseMarkdownToSections(b.contentMarkdown);
  return {
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: normalizeCategory(b.category || 'Arquitectura'),
    publishedAt: formatShortDate(b.publishedAt),
    readTime: b.readTime || '5 min de lectura',
    featured: idx === 0,
    author: {
      name: b.authorName || 'Cristian Oporta',
      role: 'COMCApps Engineering',
      initials: getInitials(b.authorName || 'Cristian Oporta'),
    },
    gradient: GRADIENTS[idx % GRADIENTS.length],
    tags: parseJsonArray<string>(b.tagsJson),
    sections:
      sections.length > 0
        ? sections
        : [
            {
              id: 'resumen',
              heading: b.title,
              paragraphs: [b.excerpt || b.contentMarkdown],
            },
          ],
    featuredImageUrl: entry.featuredImageUrl,
    gallery: entry.media ?? [],
  };
}

export function useBlogPosts() {
  return useCmsCollection<ApiBlogPost, LiveBlogPost>('blog', BLOG_POSTS, mapBlogPost);
}
