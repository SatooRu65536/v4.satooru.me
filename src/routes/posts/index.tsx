import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout>
      <div>Hello "/(theme)/posts/"!</div>
    </PageLayout>
  );
}
