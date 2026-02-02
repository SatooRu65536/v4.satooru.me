import styles from './index.module.scss';
import Button from '@/components/common/Button';
import ToHtml from '@/components/common/ToHtml';
import { getPage, paramsSchema } from '@/functions/getPage';
import { useKeyboardShortcut } from '@/hools/useKeyboardShortcut';
import ContentLayout from '@/layouts/Content';
import PageLayout from '@/layouts/Page';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PencilLineIcon } from 'lucide-react';

export const Route = createFileRoute('/$slug/')({
  params: paramsSchema,
  loader: async ({ params }) => await getPage({ data: params }),
  component: RouteComponent,
});

function RouteComponent() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  const onEdit = () => {
    void navigate({ to: '/$slug/edit', params: { slug } });
  };

  useKeyboardShortcut({ onEdit });

  return (
    <PageLayout>
      <ContentLayout>
        <div className={styles.buttons}>
          <Button icon={<PencilLineIcon />} onClick={onEdit} />
        </div>
        <ToHtml content={page.content} />
      </ContentLayout>
    </PageLayout>
  );
}
