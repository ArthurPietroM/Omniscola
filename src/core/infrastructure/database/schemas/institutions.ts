import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const institutions = sqliteTable('institutions', {
  id:        text('id').primaryKey(),
  nome:      text('nome').notNull(),
  slug:      text('slug').notNull().unique(),
  createdAt: text('created_at').notNull(),
});