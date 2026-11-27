import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { cmsApi, type CmsPageDTO } from '@/shared/lib/cmsApi';
import { PageBlocksRenderer } from '@/shared/components/cms/PageBlocksRenderer';

export default function CustomCmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<CmsPageDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    cmsApi
      .getPageBySlug(slug)
      .then(setPage)
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-sm text-zinc-500">
        Cargando vista personalizada...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Página no encontrada</h1>
        <p className="text-sm text-zinc-500">Esta vista no existe o aún no está publicada.</p>
        <Link to="/" className="cm-action cm-action-primary text-xs">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return <PageBlocksRenderer blocks={page.blocks} />;
}
