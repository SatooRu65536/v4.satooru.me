import { postSchema, PostSchema } from '@/schemas/post';
import { baseServerPostFn } from './baseServerFn';
import { postsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updatePost = baseServerPostFn
  .inputValidator((data: PostSchema & { postId: number }) => data)
  .handler(async ({ context, data }) => {
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const res = await context.r2.put(validated.data.title, validated.data.content);
    if (res == null) throw new Error('Failed to upload content to R2');

    try {
      await context.db
        .update(postsTable)
        .set({
          title: validated.data.title,
          category: validated.data.category,
          icons: validated.data.icons,
          thumbnail: validated.data.thumbnail,
          draft: validated.data.draft,
          key: res.key,
        })
        .where(eq(postsTable.id, data.postId))
        .run();

      const postRecord = await context.db.select().from(postsTable).where(eq(postsTable.id, data.postId)).get();
      if (!postRecord) throw new Error('Failed to update post record in database');

      return postRecord;
    } catch (error) {
      console.error(error);
      throw new Error('DBの更新に失敗しました');
    }
  });
