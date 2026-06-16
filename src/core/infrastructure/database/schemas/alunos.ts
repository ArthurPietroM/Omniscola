
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { institutions } from './institutions';

export const alunos = sqliteTable('alunos', {
  id:            text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  nome:          text('nome').notNull(),
  email:         text('email').notNull().unique(),
  matricula:     text('matricula').notNull().unique(),
});