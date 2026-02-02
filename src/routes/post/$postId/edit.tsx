import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import PostMetadata from '../-components/PostMetadata';
import ControlPanel from '../-components/PostControlPanel';
import MarkdownEditor from '@/components/common/MarkdownEditor';
import { useEffect } from 'react';
import {
  postStore,
  resetPost,
  setCategory,
  setContent,
  setInitialPost,
  setTitle,
  setThumbnail,
  setProductIcons,
  setProductTag,
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
        setIcons={setProductIcons}
        setThumbnail={setThumbnail}
        setProductTag={setProductTag}
      />
      <ControlPanel post={post} resetPost={resetPost} postId={postId} />
      <MarkdownEditor markdown={post.content} onEdit={setContent} />
    </PageLayout>
  );
}
