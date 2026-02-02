import styles from './index.module.scss';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import Thumbnail from '@/components/common/Thumbnail';
import ToHtml from '@/components/common/ToHtml';
import PageLayout from '@/layouts/Page';
import { getPostByPostId, paramsSchema } from '@/functions/getPostByPostId';
import ContentLayout from '@/layouts/Content';
import { useKeyboardShortcut } from '@/hools/useKeyboardShortcut';
import Button from '@/components/common/Button';
import { PencilLine } from 'lucide-react';

export const Route = createFileRoute('/post/$postId/')({
  loader: async ({ params }) => await getPostByPostId({ data: { postId: params.postId } }),
  component: RouteComponent,
  params: paramsSchema,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  useKeyboardShortcut({
    onEdit: () => void navigate({ to: '/post/$postId/edit', params: { postId } }),
  });

  return (
    <PageLayout>
      <ContentLayout className={styles.post_container}>
        <h1 className={styles.title}>
          <span>{post.title}</span>
          <Button icon={<PencilLine />} />
        </h1>
        <p className={styles.postedat}>{dayjs(post.createdAt).format('YYYY年MM月DD日')}</p>

        <Thumbnail alt="thumbnail" height="300px" src={post.thumbnail} />
        <ToHtml className={styles.content} content={post.content} />
      </ContentLayout>
    </PageLayout>
  );
}
