import { postSchema, CreatePostSchema } from '@/schemas/post';
import { baseServerPostFn } from './baseServerFn';
import { postsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updatePost = baseServerPostFn
  .inputValidator((data: CreatePostSchema & { postId: number }) => data)
  .handler(async ({ context, data }) => {
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    try {
      await context.db
        .update(postsTable)
        .set({
          title: validated.data.title,
          category: validated.data.category,
          previewText: validated.data.content.slice(0, 200),
          thumbnail: validated.data.thumbnail,
          draft: validated.data.draft,
        })
        .where(eq(postsTable.id, data.postId))
        .run();

      const postRecord = await context.db.select().from(postsTable).where(eq(postsTable.id, data.postId)).get();
      if (!postRecord) throw new Error('Failed to update post record in database');

      const res = await context.r2.put(postRecord.key, validated.data.content);
      if (res == null) throw new Error('Failed to upload content to R2');

      return postRecord;
    } catch (error) {
      console.error(error);
      throw new Error('更新に失敗しました');
    }
  });
