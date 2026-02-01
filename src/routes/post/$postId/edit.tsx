import { postsTable } from '@/db/schema';
import PageLayout from '@/layouts/Page';
import { baseServerGetFn } from '@/lib/baseServerFn';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import PostMetadata from '../-components/PostMetadata';
import ControlPanel from '../-components/PostControlPanel';
import PostEditor from '@/components/common/PostEditor';
import { useEffect } from 'react';
import { postStore, resetPost, setCategory, setContent, setIcons, setInitialPost, setTitle } from './-stores/post';
import { Post } from '@/types/post';
import { useStore } from '@tanstack/react-store';

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
      ...contentRecord,
      content: await content.text(),
    };
  });

export const Route = createFileRoute('/post/$postId/edit')({
  loader: async ({ params }) => await getPostByPostId({ data: { postId: params.postId } }),
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const originalPost = Route.useLoaderData();
  const post = useStore(postStore);

  useEffect(() => {
    setInitialPost(originalPost);
  }, []);

  return (
    <PageLayout fixed>
      <PostMetadata post={post} setTitle={setTitle} setCategory={setCategory} setIcons={setIcons} />
      <ControlPanel post={post} resetPost={resetPost} />
      <PostEditor markdown={post.content} onEdit={setContent} />
    </PageLayout>
  );
}
