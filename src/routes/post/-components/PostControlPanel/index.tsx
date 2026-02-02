import { useNavigate } from '@tanstack/react-router';
import { EditPostSchema } from '@/schemas/post';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/functions/createPost';
import { updatePost } from '@/functions/updatePost';
import ContentControlPanel from '@/components/common/ContentControlPanel';

interface ControlPanelProps {
  postId?: number;
  post: EditPostSchema;
  resetPost: () => void;
}

export default function ControlPanel({ postId, post, resetPost }: ControlPanelProps) {
  const navigate = useNavigate();
  const { mutateAsync: onSave, isPending } = useMutation({
    mutationFn: async (draft: boolean) => {
      if (postId) await update(draft, postId);
      else await create(draft);
    },
  });

  const create = async (draft: boolean) => {
    try {
      const thumbnail = post.thumbnail;
      if (thumbnail == null) throw new Error('サムネイルを設定してください');
      if (post.category == null) throw new Error('カテゴリーを選択してください');

      const res = await createPost({ data: { ...post, thumbnail, draft } });
      resetPost();
      await navigate({ to: '/post/$postId', params: { postId: res.id } });
    } catch (error) {
      console.error('Error creating post:', error);
      if (error instanceof Error && error.message) {
        alert(`記事の作成に失敗しました: ${error.message}`);
        return;
      }
      alert('記事の作成に失敗しました');
    }
  };

  const update = async (draft: boolean, postId: number) => {
    try {
      const thumbnail = post.thumbnail;
      if (post.category == null) throw new Error('カテゴリーを選択してください');
      if (thumbnail == null) throw new Error('サムネイルを設定してください');

      await updatePost({ data: { ...post, thumbnail, draft, postId } });
      resetPost();
      await navigate({ to: '/post/$postId', params: { postId } });
    } catch (error) {
      console.error('Error updating post:', error);
      if (error instanceof Error && error.message) {
        alert(`記事の更新に失敗しました: ${error.message}`);
        return;
      }
      alert('記事の更新に失敗しました');
    }
  };

  const onReset = () => {
    const isReset = confirm('リセットしますか？');
    if (isReset) resetPost();
  };

  return <ContentControlPanel onSave={onSave} onReset={onReset} isPending={isPending} />;
}
