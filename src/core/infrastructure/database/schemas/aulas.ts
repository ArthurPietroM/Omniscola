import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { turmas } from './turmas';

export const aulas = sqliteTable('aulas', {
  id:      text('id').primaryKey(),
  turmaId: text('turma_id').notNull().references(() => turmas.id),
  data:    text('data').notNull(), // ex: "2025-03-15"
  topico:  text('topico'),        // opcional — assunto da aula
});