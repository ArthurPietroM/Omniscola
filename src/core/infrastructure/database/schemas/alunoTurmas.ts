import { pgTable, text } from 'drizzle-orm/pg-core';
import { alunos } from './alunos';
import { turmas } from './turmas';

export const alunoTurmas = pgTable('aluno_turmas', {
  id:      text('id').primaryKey(),
  alunoId: text('aluno_id').notNull().references(() => alunos.id),
  turmaId: text('turma_id').notNull().references(() => turmas.id),
  status:  text('status').notNull().default('ativo'),
});