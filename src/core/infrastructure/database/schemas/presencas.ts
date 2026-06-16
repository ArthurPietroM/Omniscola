import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { aulas } from './aulas';
import { alunos } from './alunos';

export const presencas = sqliteTable('presencas', {
  id:      text('id').primaryKey(),
  aulaId:  text('aula_id').notNull().references(() => aulas.id),
  alunoId: text('aluno_id').notNull().references(() => alunos.id),
  status:  text('status').notNull().default('ausente'), // presente | ausente | justificado
});