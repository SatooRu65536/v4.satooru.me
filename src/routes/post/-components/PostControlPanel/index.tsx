import styles from './index.module.scss';
import { baseServerPostFn } from '@/lib/baseServerFn';
import { postsTable } from '@/db/schema';
import { useNavigate } from '@tanstack/react-router';
import { CheckCheckIcon, PenLineIcon, RotateCwIcon } from 'lucide-react';
import { EditPostSchema, PostSchema, postSchema } from '@/routes/post/-schemas/post';

const createPost = baseServerPostFn
  .inputValidator((data: PostSchema) => data)
  .handler(async ({ context, data }) => {
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const res = await context.r2.put(validated.data.title, validated.data.content);
    if (res == null) throw new Error('Failed to upload content to R2');

    try {
      const postRecord = await context.db
        .insert(postsTable)
        .values({
          title: validated.data.title,
          category: validated.data.category,
          icons: validated.data.icons,
          draft: validated.data.draft,
          key: res.key,
        })
        .returning()
        .get();
      if (!postRecord) throw new Error('Failed to create post record in database');

      return postRecord;
    } catch (error) {
      console.error(error);
      throw new Error('DBへ追加できませんでした');
    }
  });

interface ControlPanelProps {
  post: EditPostSchema;
  resetPost: () => void;
}

export default function ControlPanel({ post, resetPost }: ControlPanelProps) {
  const navigate = useNavigate();

  const onSave = async (draft: boolean) => {
    try {
      const category = post.category;
      if (category === null) throw new Error('カテゴリーを選択してください');

      const icons = category === 'product' ? post.icons : [];
      const res = await createPost({ data: { ...post, category, icons, draft } });

      await navigate({ to: '/post/$postId/edit', params: { postId: res.id.toString() } });
    } catch (error) {
      console.error('Error creating post:', error);
      if (error instanceof Error && error.message) {
        alert(`記事の作成に失敗しました: ${error.message}`);
        return;
      }
      alert('記事の作成に失敗しました');
    }
  };

  const onReset = () => {
    const isReset = confirm('リセットしますか？');
    if (isReset) resetPost();
  };

  return (
    <div className={styles.control_panel}>
      <button onClick={onReset} data-type="reset">
        <RotateCwIcon />
      </button>

      <button onClick={() => void onSave(true)} data-type="draft">
        <PenLineIcon />
        <span>Draft</span>
      </button>
      <button onClick={() => void onSave(false)} data-type="ship">
        <CheckCheckIcon />
        <span>Ship It!</span>
      </button>
    </div>
  );
}
