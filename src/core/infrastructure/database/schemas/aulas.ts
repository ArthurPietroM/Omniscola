import { pgTable, text } from 'drizzle-orm/pg-core';
import { turmas } from './turmas';

export const aulas = pgTable('aulas', {
  id:      text('id').primaryKey(),
  turmaId: text('turma_id').notNull().references(() => turmas.id),
  data:    text('data').notNull(),
  topico:  text('topico'),
});