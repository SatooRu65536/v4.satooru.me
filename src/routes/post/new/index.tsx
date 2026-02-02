import MarkdownEditor from '@/components/common/MarkdownEditor';
import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import {
  postStore,
  resetPost,
  setCategory,
  setContent,
  setProductIcons,
  setInitialPost,
  setThumbnail,
  setTitle,
  setProductTag,
} from './-stores/post';
import { useStore } from '@tanstack/react-store';
import ControlPanel from '../-components/PostControlPanel';
import PostMetadata from '../-components/PostMetadata';
import { useEffect } from 'react';

export const Route = createFileRoute('/post/new/')({
  component: RouteComponent,
});

function RouteComponent() {
  const post = useStore(postStore);

  useEffect(() => {
    setInitialPost();
  }, []);

  return (
    <PageLayout fixed>
      <PostMetadata
        post={post}
        setTitle={setTitle}
        setCategory={setCategory}
        setIcons={setProductIcons}
        setProductTag={setProductTag}
        setThumbnail={setThumbnail}
      />
      <ControlPanel post={post} resetPost={resetPost} />
      <MarkdownEditor markdown={post.content} onEdit={setContent} />
    </PageLayout>
  );
}
