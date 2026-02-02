import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { Post } from '@/types/post';
import { and, desc, eq } from 'drizzle-orm';

export const getRecentPosts = baseServerGetFn.handler(async ({ context }): Promise<Post[]> => {
  const postRecords = await context.db.query.postsTable.findMany({
    orderBy: desc(postsTable.createdAt),
    where: and(eq(postsTable.draft, false), eq(postsTable.deleted, false)),
    limit: 3,
  });

  const posts: (Post | null)[] = await Promise.all(
    postRecords.map(async (postRecord) => {
      const obj = await context.r2.get(postRecord.key);

      if (obj == null) return null;
      return { ...postRecord, content: await obj.text() } satisfies Post;
    }),
  );

  return posts.filter((post): post is Post => post != null);
});
