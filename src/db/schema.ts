import { PostId, PostKey, PostTitle } from '@/types/brand';
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
  id: integer('id').primaryKey({ autoIncrement: true }).$type<PostId>(),
  title: text('title').notNull().$type<PostTitle>(),
  key: text('key').notNull().unique().$type<PostKey>(),
  icons: text('icons', { mode: 'json' }).notNull().default('[]').$type<string[]>(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
