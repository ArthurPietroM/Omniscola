import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { institutions } from './institutions';

export const turmas = sqliteTable('turmas', {
  id:            text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  nome:          text('nome').notNull(),
  codigo:        text('codigo').notNull().unique(),
  periodo:       text('periodo').notNull(), // ex: "2025.1"
  status:        text('status').notNull().default('ativa'), // ativa | encerrada
});