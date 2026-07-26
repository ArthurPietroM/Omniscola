import { pgTable, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const sessions = pgTable('sessions', {
  id:        text('id').primaryKey(),
  userId:    text('user_id').notNull().references(() => users.id),
  token:     text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
});