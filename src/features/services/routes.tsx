import type { RouteObject } from 'react-router';

export const servicesRoutes: RouteObject[] = [
  {
    path: '/servicios',
    lazy: async () => ({
      Component: (await import('./pages/ServicesPage')).default,
    }),
  },
];
