import { CATEGORIES, Category } from '@/consts/categories';
import { AdditionalData } from '@/schemas/post';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const createdAt = () =>
  integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date());
const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date());

export const postsTable = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  key: text('key').notNull().unique(),
  category: text('category', { enum: CATEGORIES }).notNull().$type<Category>(),
  data: text('data', { mode: 'json' }).notNull().default('{}').$type<AdditionalData>(),
  draft: integer('draft', { mode: 'boolean' }).notNull().default(false).$type<boolean>(),
  thumbnail: text('thumbnail').notNull().$type<string>(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  deleted: integer('deleted', { mode: 'boolean' }).notNull().default(false).$type<boolean>(),
});

export const pagesTable = sqliteTable('pages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  key: text('key').notNull().unique(),
  draft: integer('draft', { mode: 'boolean' }).notNull().default(false).$type<boolean>(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
