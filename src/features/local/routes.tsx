import type { RouteObject } from 'react-router';

export const localRoutes: RouteObject[] = [
  {
    path: '/local',
    lazy: async () => ({
      Component: (await import('./pages/LocalServicesPage')).default,
    }),
  },
];
