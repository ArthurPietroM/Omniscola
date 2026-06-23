import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { turmas } from './turmas';

export const professorTurmas = sqliteTable('professor_turmas', {
  id:          text('id').primaryKey(),
  professorId: text('professor_id').notNull().references(() => users.id),
  turmaId:     text('turma_id').notNull().references(() => turmas.id),
});