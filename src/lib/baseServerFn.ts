import { createMiddleware, createServerFn } from '@tanstack/react-start';
import { getDb } from './db';
import { env } from 'cloudflare:workers';

const dbMiddleware = createMiddleware().server(async ({ next }) => {
  return next({
    context: {
      db: getDb(env.d1),
      r2: env.r2,
    },
  });
});

export const baseServerFn = createServerFn().middleware([dbMiddleware]);
