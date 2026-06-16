import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { alunos } from './alunos';
import { turmas } from './turmas';

export const alunoTurmas = sqliteTable('aluno_turmas', {
  id:      text('id').primaryKey(),
  alunoId: text('aluno_id').notNull().references(() => alunos.id),
  turmaId: text('turma_id').notNull().references(() => turmas.id),
  status:  text('status').notNull().default('ativo'), // ativo | trancado | concluido
});