import type { RouteObject } from 'react-router';

export const contactRoutes: RouteObject[] = [
  {
    path: '/contacto',
    lazy: async () => ({
      Component: (await import('./pages/ContactPage')).default,
    }),
  },
];
