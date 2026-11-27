import type { RouteObject } from 'react-router';
import AdminCollectionPage from './pages/AdminCollectionPage';

export const adminRoutes: RouteObject[] = [
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/HiddenLoginPage')).default,
    }),
  },
  {
    path: '/admin',
    lazy: async () => ({
      Component: (await import('./components/AdminLayout')).default,
    }),
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/AdminDashboardPage')).default,
        }),
      },
      {
        path: 'builder',
        lazy: async () => ({
          Component: (await import('./pages/AdminPageBuilderPage')).default,
        }),
      },
      {
        path: 'local-services',
        element: <AdminCollectionPage collection="local-services" />,
      },
      {
        path: 'software-services',
        element: <AdminCollectionPage collection="software-services" />,
      },
      {
        path: 'projects',
        element: <AdminCollectionPage collection="projects" />,
      },
      {
        path: 'team',
        element: <AdminCollectionPage collection="team" />,
      },
      {
        path: 'blog',
        element: <AdminCollectionPage collection="blog" />,
      },
      {
        path: 'media',
        lazy: async () => ({
          Component: (await import('./pages/AdminMediaPage')).default,
        }),
      },
      {
        path: 'messages',
        lazy: async () => ({
          Component: (await import('./pages/AdminMessagesPage')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/AdminSettingsPage')).default,
        }),
      },
    ],
  },
];
