import { pagesTable } from '@/db/schema';
import { baseServerPostFn } from '@/functions/baseServerFn';
import { getPageKey } from '@/utils/r2key';
import { z } from 'zod';

export const pageSchema = z.object({
  slug: z.string(),
  content: z.string(),
  draft: z.boolean(),
});
export type PageSchema = z.infer<typeof pageSchema>;

export const createPage = baseServerPostFn.inputValidator(pageSchema).handler(async ({ context, data }) => {
  const key = getPageKey(data.slug);

  const pageRecords = await context.db
    .insert(pagesTable)
    .values({
      slug: data.slug,
      key,
    })
    .returning();
  if (pageRecords.length === 0) throw new Error('Failed to create page');
  const pageRecord = pageRecords[0];

  const content = await context.r2.put(key, data.content);
  if (content == null) throw new Error('Failed to upload content');

  return pageRecord;
});
