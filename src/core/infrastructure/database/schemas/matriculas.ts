import { pgTable, text } from 'drizzle-orm/pg-core';
import { alunos } from './alunos';
import { cursos } from './cursos';

export const matriculas = pgTable('matriculas', {
  id:           text('id').primaryKey(),
  alunoId:      text('aluno_id').notNull().references(() => alunos.id),
  cursoId:      text('curso_id').notNull().references(() => cursos.id),
  codigo:       text('codigo').notNull().unique(), // ex: 20262010 01
  periodo:      text('periodo').notNull(),          // ex: 2026.2
  status:       text('status').notNull().default('ativa'), // ativa | trancada | concluida
  createdAt:    text('created_at').notNull(),
});