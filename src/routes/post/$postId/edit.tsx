import { postsTable } from '@/db/schema';
import { baseServerGetFn } from '@/lib/baseServerFn';
import { Post } from '@/types/post';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

const getPostByPostId = baseServerGetFn
  .inputValidator(paramsSchema)
  .handler(async ({ context, data }): Promise<Post> => {
    const contentRecord = await context.db.query.postsTable.findFirst({
      where: eq(postsTable.id, data.postId),
    });
    if (contentRecord == undefined) throw notFound();

    const content = await context.r2.get(contentRecord.key);
    if (content == null) throw notFound();

    return {
      id: contentRecord.id,
      title: contentRecord.title,
      content: await content.text(),
      createdAt: contentRecord.createdAt.toISOString(),
      updatedAt: contentRecord.updatedAt.toISOString(),
    };
  });

export const Route = createFileRoute('/post/$postId/edit')({
  loader: () => getPostByPostId,
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const post: Post = Route.useLoaderData();

  return <div>{JSON.stringify(post)}</div>;
}
