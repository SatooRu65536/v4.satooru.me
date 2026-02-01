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
  category: text('category').notNull(),
  icons: text('icons', { mode: 'json' }).notNull().default('[]').$type<string[]>(),
  draft: integer('draft', { mode: 'boolean' }).default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
  deleted: integer('deleted', { mode: 'boolean' }).default(false),
});
