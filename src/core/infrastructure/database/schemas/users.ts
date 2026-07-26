import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { institutions } from './institutions';

export const users = pgTable('users', {
  id:           text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  nome:         text('nome').notNull(),
  email:        text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role:         text('role').notNull().default('professor'),
  ativo:        boolean('ativo').notNull().default(true),
  createdAt:    text('created_at').notNull(),
});