import styles from './index.module.scss';
import { baseServerGetFn } from '@/lib/baseServerFn';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { Post } from '@/types/post';
import { postsTable } from '@/db/schema';
import dayjs from 'dayjs';
import Thumbnail from '@/components/common/Thumbnail';
import ToHtml from '@/components/common/ToHtml';
import PageLayout from '@/layouts/Page';

export const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export const getPostByPostId = baseServerGetFn
  .inputValidator(paramsSchema)
  .handler(async ({ context, data }): Promise<Post> => {
    const contentRecord = await context.db.query.postsTable.findFirst({
      where: eq(postsTable.id, data.postId),
    });
    if (contentRecord == undefined) throw notFound();

    const content = await context.r2.get(contentRecord.key);
    if (content == null) throw notFound();

    return {
      ...contentRecord,
      content: await content.text(),
    };
  });

export const Route = createFileRoute('/post/$postId/')({
  loader: async ({ params }) => await getPostByPostId({ data: { postId: params.postId } }),
  component: RouteComponent,
  params: paramsSchema,
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <PageLayout>
      <div className={styles.post_container}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.postedat}>{dayjs(post.updatedAt).format('YYYY年MM月DD日')}</p>

        <Thumbnail alt="thumbnail" height="300px" src={post.thumbnail} />
        <ToHtml className={styles.content} content={post.content} />
      </div>
    </PageLayout>
  );
}
