import type { RouteObject } from 'react-router';

export const blogRoutes: RouteObject[] = [
  {
    path: '/blog',
    lazy: async () => ({
      Component: (await import('./pages/BlogPage')).default,
    }),
  },
  {
    path: '/blog/:slug',
    lazy: async () => ({
      Component: (await import('./pages/BlogPostPage')).default,
    }),
  },
];
