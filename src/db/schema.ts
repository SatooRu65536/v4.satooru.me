import { IconKey } from '@/components/common/Icon';
import { CATEGORIES, Category } from '@/consts/categories';
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
  icons: text('icons', { mode: 'json' }).notNull().default('[]').$type<IconKey[]>(),
  draft: integer('draft', { mode: 'boolean' }).notNull().default(false).$type<boolean>(),
  thumbnail: text('thumbnail').notNull().$type<string>(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  deleted: integer('deleted', { mode: 'boolean' }).notNull().default(false).$type<boolean>(),
});
