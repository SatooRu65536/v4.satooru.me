import { PER_PAGE } from '@/const/setting';
import { CATEGORIES } from '@/consts/categories';
import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { PostTable } from '@/types/db';
import { and, desc, eq, count } from 'drizzle-orm';
import z from 'zod';

const paramsSchema = z.object({
  category: z.enum([...CATEGORIES, 'all']).default('all'),
  page: z.number().min(1).default(1),
});

interface GetPostsResult {
  posts: PostTable[];
  count: number;
}

export const getPosts = baseServerGetFn
  .inputValidator(paramsSchema)
  .handler(async ({ context, data }): Promise<GetPostsResult> => {
    const where =
      data.category === 'all'
        ? and(eq(postsTable.draft, false), eq(postsTable.deleted, false))
        : and(eq(postsTable.draft, false), eq(postsTable.deleted, false), eq(postsTable.category, data.category));

    const postRecords = await context.db.query.postsTable.findMany({
      orderBy: desc(postsTable.createdAt),
      where,
      limit: PER_PAGE,
      offset: (data.page - 1) * PER_PAGE,
    });

    const postCountRes = await context.db.select({ count: count() }).from(postsTable).where(where);
    if (postCountRes.length === 0) throw new Error('Failed to get post count');

    const postCount = postCountRes[0];

    return { posts: postRecords, count: postCount.count };
  });
