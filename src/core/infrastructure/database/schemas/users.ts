import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { institutions } from './institutions';

export const users = sqliteTable('users', {
  id:            text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  nome:          text('nome').notNull(),
  email:         text('email').notNull().unique(),
  passwordHash:  text('password_hash').notNull(),
  role:          text('role').notNull().default('professor'),
  createdAt:     text('created_at').notNull(),
});