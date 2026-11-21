import type { RouteObject } from 'react-router';

export const teamRoutes: RouteObject[] = [
  {
    path: '/equipo',
    lazy: async () => ({
      Component: (await import('./pages/TeamPage')).default,
    }),
  },
];
