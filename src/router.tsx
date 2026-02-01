import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { env } from 'cloudflare:workers';
import { getDb } from './lib/db';

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      db: getDb(env.db),
    },
  });

  return router;
};
