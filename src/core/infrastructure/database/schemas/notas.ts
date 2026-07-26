import { pgTable, text, real } from 'drizzle-orm/pg-core';
import { turmas } from './turmas';
import { alunos } from './alunos';

export const notas = pgTable('notas', {
  id:        text('id').primaryKey(),
  turmaId:   text('turma_id').notNull().references(() => turmas.id),
  alunoId:   text('aluno_id').notNull().references(() => alunos.id),
  avaliacao: text('avaliacao').notNull(),
  valor:     real('valor').notNull(),
});