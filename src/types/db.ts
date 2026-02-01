import { postsTable } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const postTableSchema = createSelectSchema(postsTable);
export type PostTable = z.infer<typeof postTableSchema>;
