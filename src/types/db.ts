import { pagesTable, postsTable } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const postTableSchema = createSelectSchema(postsTable);
export type PostTable = z.infer<typeof postTableSchema>;

export const pageTableSchema = createSelectSchema(pagesTable);
export type PageTable = z.infer<typeof pageTableSchema>;
