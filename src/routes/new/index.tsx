import styles from './index.module.scss';
import MarkdownEditor from '@/components/common/MarkdownEditor';
import PageLayout from '@/layouts/Page';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useStore } from '@tanstack/react-store';
import { pageStore, resetPageStore, setContent, setSlug } from './-stores/page';
import PageSettings from '../post/new/-components/PageSettings';
import ContentControlPanel from '@/components/common/ContentControlPanel';
import { useMutation } from '@tanstack/react-query';
import { createPage } from '@/functions/createPage';

export const Route = createFileRoute('/new/')({
  component: RouteComponent,
});

function RouteComponent() {
  const page = useStore(pageStore);
  const navigate = useNavigate();

  const { mutateAsync: onSave, isPending } = useMutation({
    mutationFn: async (draft: boolean) => {
      if (page.slug === '') throw new Error('slug を入力してください');
      if (page.content === '') throw new Error('content を入力してください');

      return await createPage({ data: { ...page, draft } });
    },
    onError: (error) => {
      alert(`ページの作成に失敗しました: ${error}`);
    },
    onSuccess: async (pageRes) => {
      resetPageStore();
      await navigate({ to: '/$slug', params: { slug: pageRes.slug } });
    },
  });

  return (
    <PageLayout fixed>
      <div className={styles.editor}>
        <PageSettings slug={page.slug} setSlug={setSlug} />
        <ContentControlPanel onSave={onSave} onReset={resetPageStore} isPending={isPending} />
        <MarkdownEditor markdown={page.content} onEdit={setContent} />
      </div>
    </PageLayout>
  );
}
