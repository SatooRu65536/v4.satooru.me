import ToHtml from '@/components/common/ToHtml';
import { getPage, paramsSchema } from '@/functions/getPage';
import ContentLayout from '@/layouts/Content';
import PageLayout from '@/layouts/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$slug/')({
  params: paramsSchema,
  loader: async ({ params }) => await getPage({ data: params }),
  component: RouteComponent,
});

function RouteComponent() {
  const page = Route.useLoaderData();

  return (
    <PageLayout>
      <ContentLayout>
        <ToHtml content={page.content} />
      </ContentLayout>
    </PageLayout>
  );
}
