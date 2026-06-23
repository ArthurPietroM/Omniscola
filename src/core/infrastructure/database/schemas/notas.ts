import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { turmas } from './turmas';
import { alunos } from './alunos';
import { disciplinas } from './disciplinas'; // Importando o novo schema

export const notas = sqliteTable('notas', {
  id:           text('id').primaryKey(),
  turmaId:      text('turma_id').notNull().references(() => turmas.id),
  alunoId:      text('aluno_id').notNull().references(() => alunos.id),
  disciplinaId: text('disciplina_id').notNull().references(() => disciplinas.id), // Nova coluna adicionada
  avaliacao:    text('avaliacao').notNull(), // ex: "Prova 1", "Trabalho Final"
  valor:        real('valor').notNull(),     // número decimal, ex: 8.5
});
