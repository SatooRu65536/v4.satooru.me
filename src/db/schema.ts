import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const createdAt = () =>
  integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date());
const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date());

export const contentsTable = sqliteTable('contents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
