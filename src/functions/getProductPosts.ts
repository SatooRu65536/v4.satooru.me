import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { productAdditionalDataSchema } from '@/schemas/post';
import { ProductPost } from '@/types/post';
import { and, desc, eq } from 'drizzle-orm';

export const getProductPosts = baseServerGetFn.handler(async ({ context }): Promise<ProductPost[]> => {
  const postRecords = await context.db.query.postsTable.findMany({
    orderBy: desc(postsTable.createdAt),
    where: and(eq(postsTable.draft, false), eq(postsTable.deleted, false), eq(postsTable.category, 'product')),
  });

  const productPosts: ProductPost[] = postRecords
    .map((post) => {
      const dataRes = productAdditionalDataSchema.safeParse(post.data);

      if (!dataRes.success) {
        console.error('Failed to parse product additional data:', dataRes.error);
        return null;
      }

      return { ...post, data: dataRes.data } satisfies ProductPost;
    })
    .filter((post): post is ProductPost => post !== null);

  return productPosts;
});
