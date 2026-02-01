import { ICON_KEYS } from '@/components/common/Icon';
import { CATEGORIES } from '@/consts/categories';
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  content: z.string().min(1, 'コンテンツを入力してください'),
  category: z.enum(CATEGORIES, 'カテゴリーが不正です'),
  icons: z.enum(ICON_KEYS, 'アイコンが不正です').array(),
  draft: z.boolean(),
});
export type PostSchema = z.infer<typeof postSchema>;

export const editPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  icons: z.enum(ICON_KEYS, 'アイコンが不正です').array(),
  category: z.enum(CATEGORIES).nullable(),
});
export type EditPostSchema = z.infer<typeof editPostSchema>;
