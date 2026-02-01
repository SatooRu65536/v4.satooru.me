import PostEditor from '@/components/common/PostEditor';
import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import { markdownStore, setMarkdown } from './-store/md';
import { useStore } from '@tanstack/react-store';

export const Route = createFileRoute('/post/new/')({
  component: RouteComponent,
});

function RouteComponent() {
  const markdown = useStore(markdownStore);

  return (
    <PageLayout fixed>
      <PostEditor markdown={markdown} onEdit={setMarkdown} />
    </PageLayout>
  );
}
