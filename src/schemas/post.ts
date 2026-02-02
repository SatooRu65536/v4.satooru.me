import { ICON_KEYS } from '@/components/common/Icon';
import { CATEGORIES } from '@/consts/categories';
import { postTableSchema } from '@/types/db';
import { z } from 'zod';

// === Additional Data Schemas ===

export const productAdditionalDataSchema = z.object({
  icons: z
    .array(z.string()) // 一旦文字列として受け取る
    .transform((arr) => arr.filter((icon) => ICON_KEYS.includes(icon))),
  tag: z.string(),
});
export type ProductAdditionalData = z.infer<typeof productAdditionalDataSchema>;

export const noneProductAdditionalDataSchema = z.object({});
export type NoneProductAdditionalData = z.infer<typeof noneProductAdditionalDataSchema>;

export const additionalDataSchema = z.union([productAdditionalDataSchema, noneProductAdditionalDataSchema]);
export type AdditionalData = z.infer<typeof additionalDataSchema>;

// === Post Schemas ===

const basePostSchema = postTableSchema.extend({
  title: z.string().min(1, 'タイトルを入力してください'),
  content: z.string().min(1, 'コンテンツを入力してください'),
  thumbnail: z.url('サムネイルのURLが不正です'),
  draft: z.boolean(),
});
export const productPostSchema = basePostSchema.extend({
  category: z.literal('product'),
  data: productAdditionalDataSchema,
});
export const kajilabPostSchema = basePostSchema.extend({
  category: z.literal('kajilab'),
  data: noneProductAdditionalDataSchema,
});
export const privatePostSchema = basePostSchema.extend({
  category: z.literal('private'),
  data: noneProductAdditionalDataSchema,
});
export const reportPostSchema = basePostSchema.extend({
  category: z.literal('report'),
  data: noneProductAdditionalDataSchema,
});

export const postSchema = z.union([productPostSchema, kajilabPostSchema, privatePostSchema, reportPostSchema]);
export type PostSchema = z.infer<typeof postSchema>;

// === Edit Post Schemas ===

const editBasePostSchema = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.url('サムネイルのURLが不正です').optional(),
});
export const editNoneSelectedPostSchema = editBasePostSchema.extend({
  category: z.null(),
  data: noneProductAdditionalDataSchema,
});
export const editProductPostSchema = editBasePostSchema.extend({
  category: z.literal('product'),
  data: productAdditionalDataSchema,
});
export const editPrivatePostSchema = editBasePostSchema.extend({
  category: z.literal('private'),
  data: noneProductAdditionalDataSchema,
});
export const editKajilabPostSchema = editBasePostSchema.extend({
  category: z.literal('kajilab'),
  data: noneProductAdditionalDataSchema,
});
export const editReportPostSchema = editBasePostSchema.extend({
  category: z.literal('report'),
  data: noneProductAdditionalDataSchema,
});
export const editPostSchema = z.union([
  editNoneSelectedPostSchema,
  editProductPostSchema,
  editPrivatePostSchema,
  editKajilabPostSchema,
  editReportPostSchema,
]);
export type EditPostSchema = z.infer<typeof editPostSchema>;

// === Create Post Schema ===
const createBasePostSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  content: z.string().min(1, 'コンテンツを入力してください'),
  thumbnail: z.url('サムネイルのURLが不正です'),
  draft: z.boolean(),
});
export const createProductPostSchema = createBasePostSchema.extend({
  category: z.literal('product'),
  data: productAdditionalDataSchema,
});
export const createKajilabPostSchema = createBasePostSchema.extend({
  category: z.literal('kajilab'),
  data: noneProductAdditionalDataSchema,
});
export const createPrivatePostSchema = createBasePostSchema.extend({
  category: z.literal('private'),
  data: noneProductAdditionalDataSchema,
});
export const createReportPostSchema = createBasePostSchema.extend({
  category: z.literal('report'),
  data: noneProductAdditionalDataSchema,
});

export const createPostSchema = z.union([
  createProductPostSchema,
  createKajilabPostSchema,
  createPrivatePostSchema,
  createReportPostSchema,
]);
export type CreatePostSchema = z.infer<typeof createPostSchema>;
