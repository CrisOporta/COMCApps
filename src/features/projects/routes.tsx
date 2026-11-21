import type { RouteObject } from 'react-router';

export const projectsRoutes: RouteObject[] = [
  {
    path: '/proyectos',
    lazy: async () => ({
      Component: (await import('./pages/ProjectsPage')).default,
    }),
  },
  {
    path: '/proyectos/:slug',
    lazy: async () => ({
      Component: (await import('./pages/ProjectDetailPage')).default,
    }),
  },
];
