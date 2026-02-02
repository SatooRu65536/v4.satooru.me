import { postSchema, PostSchema } from '@/schemas/post';
import { baseServerPostFn } from './baseServerFn';
import { postsTable } from '@/db/schema';
import { getPostKey } from '@/utils/post';

export const createPost = baseServerPostFn
  .inputValidator((data: PostSchema) => data)
  .handler(async ({ context, data }) => {
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const postKey = getPostKey();
    const res = await context.r2.put(postKey, validated.data.content);
    if (res == null) throw new Error('Failed to upload content to R2');

    try {
      const postRecord = await context.db
        .insert(postsTable)
        .values({
          title: validated.data.title,
          category: validated.data.category,
          icons: validated.data.icons,
          thumbnail: validated.data.thumbnail,
          draft: validated.data.draft,
          key: res.key,
        })
        .returning()
        .get();
      if (!postRecord) throw new Error('Failed to create post record in database');

      return postRecord;
    } catch (error) {
      console.error(error);
      throw new Error('DBへ追加できませんでした');
    }
  });
