import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const sessions = sqliteTable('sessions', {
  id:        text('id').primaryKey(),
  userId:    text('user_id').notNull().references(() => users.id),
  token:     text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
});