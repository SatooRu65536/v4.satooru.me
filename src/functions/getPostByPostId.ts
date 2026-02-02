import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/functions/baseServerFn';
import { PostSchema, postSchema } from '@/schemas/post';
import { notFound } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export const getPostByPostId = baseServerGetFn
  .inputValidator(paramsSchema)
  .handler(async ({ context, data }): Promise<PostSchema> => {
    const contentRecord = await context.db.query.postsTable.findFirst({
      where: eq(postsTable.id, data.postId),
    });
    if (contentRecord == undefined) throw notFound();

    const content = await context.r2.get(contentRecord.key);
    if (content == null) throw notFound();

    const post = {
      ...contentRecord,
      content: await content.text(),
    };
    return postSchema.parse(post);
  });
