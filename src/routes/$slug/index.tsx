import ToHtml from '@/components/common/ToHtml';
import { getPage, paramsSchema } from '@/functions/getPage';
import { useKeyboardShortcut } from '@/hools/useKeyboardShortcut';
import ContentLayout from '@/layouts/Content';
import PageLayout from '@/layouts/Page';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/$slug/')({
  params: paramsSchema,
  loader: async ({ params }) => await getPage({ data: params }),
  component: RouteComponent,
});

function RouteComponent() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  useKeyboardShortcut({
    onEdit: () => void navigate({ to: '/$slug/edit', params: { slug } }),
  });

  return (
    <PageLayout>
      <ContentLayout>
        <ToHtml content={page.content} />
      </ContentLayout>
    </PageLayout>
  );
}
