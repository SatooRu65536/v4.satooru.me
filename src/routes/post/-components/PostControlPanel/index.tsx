import styles from './index.module.scss';
import { baseServerPostFn } from '@/lib/baseServerFn';
import { postsTable } from '@/db/schema';
import { useNavigate } from '@tanstack/react-router';
import { CheckCheckIcon, PenLineIcon, RotateCwIcon } from 'lucide-react';
import { EditPostSchema, PostSchema, postSchema } from '@/routes/post/-schemas/post';
import { eq } from 'drizzle-orm';
import { useMutation } from '@tanstack/react-query';

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
          thumbnail: validated.data.thumbnail,
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

const updatePost = baseServerPostFn
  .inputValidator((data: PostSchema & { postId: number }) => data)
  .handler(async ({ context, data }) => {
    const validated = postSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }

    const res = await context.r2.put(validated.data.title, validated.data.content);
    if (res == null) throw new Error('Failed to upload content to R2');

    try {
      await context.db
        .update(postsTable)
        .set({
          title: validated.data.title,
          category: validated.data.category,
          icons: validated.data.icons,
          thumbnail: validated.data.thumbnail,
          draft: validated.data.draft,
          key: res.key,
        })
        .where(eq(postsTable.id, data.postId))
        .run();

      const postRecord = await context.db.select().from(postsTable).where(eq(postsTable.id, data.postId)).get();
      if (!postRecord) throw new Error('Failed to update post record in database');

      return postRecord;
    } catch (error) {
      console.error(error);
      throw new Error('DBの更新に失敗しました');
    }
  });

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
      const category = post.category;
      const thumbnail = post.thumbnail;
      if (category == null) throw new Error('カテゴリーを選択してください');
      if (thumbnail == null) throw new Error('サムネイルを設定してください');

      const icons = category === 'product' ? post.icons : [];
      const res = await createPost({ data: { ...post, category, thumbnail, icons, draft } });
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
      const category = post.category;
      const thumbnail = post.thumbnail;
      if (category == null) throw new Error('カテゴリーを選択してください');
      if (thumbnail == null) throw new Error('サムネイルを設定してください');

      const icons = category === 'product' ? post.icons : [];
      await updatePost({ data: { ...post, category, thumbnail, icons, draft, postId } });
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

  return (
    <div className={styles.control_panel}>
      <button onClick={onReset} className={styles.reset} disabled={isPending}>
        <RotateCwIcon />
      </button>

      <button onClick={() => void onSave(true)} className={styles.draft} disabled={isPending}>
        <PenLineIcon />
        <span>Draft</span>
      </button>
      <button onClick={() => void onSave(false)} className={styles.ship} disabled={isPending}>
        <CheckCheckIcon />
        <span>Ship It!</span>
      </button>
    </div>
  );
}
