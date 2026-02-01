import PostEditor from '@/components/common/PostEditor';
import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/post/new/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [markdown, setMarkdown] = useState('');

  return (
    <PageLayout fixed>
      <PostEditor markdown={markdown} onEdit={setMarkdown} />
    </PageLayout>
  );
}
