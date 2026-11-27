import { createBrowserRouter, RouterProvider } from 'react-router';
import { homeRoutes } from '@/features/home/routes';
import { servicesRoutes } from '@/features/services/routes';
import { localRoutes } from '@/features/local/routes';
import { projectsRoutes } from '@/features/projects/routes';
import { teamRoutes } from '@/features/team/routes';
import { blogRoutes } from '@/features/blog/routes';
import { contactRoutes } from '@/features/contact/routes';
import { adminRoutes } from '@/features/admin/routes';
import { RouteErrorPage } from './RouteErrorPage';
import { RouteTitleWatcher } from './RouteTitleWatcher';

const router = createBrowserRouter([
  {
    element: <RouteTitleWatcher />,
    hydrateFallbackElement: (
      <div
        className="flex min-h-screen items-center justify-center bg-[#fbfbfb] text-sm text-zinc-500 dark:bg-[#030303] dark:text-zinc-400"
        role="status"
      >
        Cargando COMCApps…
      </div>
    ),
    errorElement: <RouteErrorPage />,
    children: [
      ...adminRoutes,
      {
        lazy: async () => ({
          Component: (await import('./layouts/MainLayout')).default,
        }),
        children: [
          ...homeRoutes,
          ...servicesRoutes,
          ...localRoutes,
          ...projectsRoutes,
          ...teamRoutes,
          ...blogRoutes,
          ...contactRoutes,
          {
            path: '/p/:slug',
            lazy: async () => ({
              Component: (await import('@/pages/CustomCmsPage')).default,
            }),
          },
          {
            path: '/privacidad',
            lazy: async () => ({
              Component: (await import('@/pages/PrivacyPage')).default,
            }),
          },
          {
            path: '/terminos',
            lazy: async () => ({
              Component: (await import('@/pages/TermsPage')).default,
            }),
          },
          {
            path: '*',
            lazy: async () => ({
              Component: (await import('@/pages/NotFoundPage')).default,
            }),
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
