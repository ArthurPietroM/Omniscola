import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const institutions = pgTable('institutions', {
  id:        text('id').primaryKey(),
  nome:      text('nome').notNull(),
  slug:      text('slug').notNull().unique(),
  createdAt: text('created_at').notNull(),
});