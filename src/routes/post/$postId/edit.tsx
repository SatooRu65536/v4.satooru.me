import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import PostMetadata from '../-components/PostMetadata';
import ControlPanel from '../-components/PostControlPanel';
import PostEditor from '@/components/common/PostEditor';
import { useEffect } from 'react';
import {
  postStore,
  resetPost,
  setCategory,
  setContent,
  setIcons,
  setInitialPost,
  setTitle,
  setThumbnail,
} from './-stores/post';
import { useStore } from '@tanstack/react-store';
import { getPostByPostId, paramsSchema } from '@/functions/getPostByPostId';

export const Route = createFileRoute('/post/$postId/edit')({
  loader: async ({ params }) => await getPostByPostId({ data: { postId: params.postId } }),
  component: RouteComponent,
  params: paramsSchema,
  ssr: false,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const originalPost = Route.useLoaderData();
  const post = useStore(postStore);

  useEffect(() => {
    setInitialPost(originalPost);
  }, []);

  return (
    <PageLayout fixed>
      <PostMetadata
        post={post}
        setTitle={setTitle}
        setCategory={setCategory}
        setIcons={setIcons}
        setThumbnail={setThumbnail}
      />
      <ControlPanel post={post} resetPost={resetPost} postId={postId} />
      <PostEditor markdown={post.content} onEdit={setContent} />
    </PageLayout>
  );
}
