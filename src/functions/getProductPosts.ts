import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { PostTable } from '@/types/db';
import { and, desc, eq } from 'drizzle-orm';

export const getProductPosts = baseServerGetFn.handler(async ({ context }): Promise<PostTable[]> => {
  const postRecords = await context.db.query.postsTable.findMany({
    orderBy: desc(postsTable.createdAt),
    where: and(eq(postsTable.draft, false), eq(postsTable.deleted, false), eq(postsTable.category, 'product')),
  });

  return postRecords;
});
